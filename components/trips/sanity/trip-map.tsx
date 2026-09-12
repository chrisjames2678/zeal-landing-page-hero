"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

export interface TripMapStop {
  name: string
  region?: string | null
  lat: number
  lng: number
}

interface TripMapProps {
  stops: TripMapStop[]
}

export function TripMap({ stops }: TripMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || stops.length === 0) return

    // React (Strict Mode, in dev) can run this effect, clean it up, and run
    // it again before the async imports below resolve. Without this guard,
    // the first run's now-stale callback still fires afterward and tries to
    // call L.map() on a container the second run already initialized —
    // Leaflet throws "Map container is already initialized" for that.
    let cancelled = false
    let map: import("leaflet").Map | undefined
    let onResize: (() => void) | undefined
    let onOrientation: (() => void) | undefined
    let onVeilTap: (() => void) | undefined
    const veilEl = veilRef.current

    // Leaflet reads `window` as soon as it's imported, so it can only be
    // loaded here — inside an effect, which only ever runs in the browser.
    Promise.all([import("leaflet"), import("leaflet-polylinedecorator")]).then(
      ([leafletModule]) => {
        if (cancelled || !containerRef.current) return
        // Defensive fallback: if this container somehow already has a live
        // Leaflet instance attached (the exact race this guard is for),
        // don't try to initialize a second one on top of it.
        if ((containerRef.current as any)._leaflet_id) return
        const L = leafletModule.default as any

        const isTouch =
          "ontouchstart" in window || navigator.maxTouchPoints > 0

        map = L.map(containerRef.current, {
          scrollWheelZoom: false,
          zoomControl: false,
          dragging: !isTouch,
          tap: !isTouch,
        }).setView([stops[0].lat, stops[0].lng], 7)

        // Esri's "Light Gray Canvas" basemap — free, no API key, and much
        // simpler/quieter than plain OpenStreetMap tiles (which are busy
        // with building/road colour-coding that fights the route line and
        // labels). Two layers, as Esri intends: a plain grey base, plus a
        // reference layer on top for place-name/boundary labels.
        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
          { attribution: "Tiles &copy; Esri", maxZoom: 16 }
        ).addTo(map)
        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
          { maxZoom: 16 }
        ).addTo(map)

        L.control.zoom({ position: "bottomright" }).addTo(map)

        const latlngs: [number, number][] = stops.map((s) => [s.lat, s.lng])
        const routeLine = L.polyline(latlngs, {
          color: "#e85d26",
          weight: 4,
          opacity: 1,
          lineCap: "round",
        }).addTo(map)

        // Directional arrows along the route.
        L.polylineDecorator(routeLine, {
          patterns: [
            {
              offset: "6%",
              repeat: "11%",
              symbol: L.Symbol.arrowHead({
                pixelSize: 9,
                polygon: true,
                pathOptions: { stroke: false, fillOpacity: 1, color: "#e85d26" },
              }),
            },
          ],
        }).addTo(map)

        // One marker per stop, in order.
        stops.forEach((s, i) => {
          const icon = L.divIcon({
            className: "",
            html: `<div class="flex h-11 w-11 items-center justify-center"><div class="h-3.5 w-3.5 rounded-full border-[3px] border-white ${
              i === 0
                ? "bg-zeal-black shadow-[0_0_0_1px_#0a0a0a]"
                : "bg-zeal-accent shadow-[0_0_0_1px_#e85d26]"
            }"></div></div>`,
            iconSize: [44, 44],
            iconAnchor: [22, 22],
          })
          L.marker([s.lat, s.lng], { icon })
            .addTo(map)
            .bindPopup(
              `<b class="block font-serif text-[14px] text-zeal-black">${s.name}</b>${
                s.region ? `<span class="text-zeal-mid">${s.region}</span>` : ""
              }`
            )
        })

        map.fitBounds(latlngs, { padding: [30, 30] })

        // Touch devices: a single tap on a veil enables map dragging, so an
        // ordinary swipe scrolls the page instead of getting trapped by the map.
        if (isTouch && veilEl) {
          onVeilTap = () => {
            map!.dragging.enable()
            ;(map as any).tap && (map as any).tap.enable()
            veilEl.classList.add("opacity-0", "pointer-events-none")
          }
          veilEl.addEventListener("click", onVeilTap)
        } else if (veilEl) {
          veilEl.remove()
        }

        // Keep the map correctly sized AND correctly zoomed/centered through
        // resizes and orientation changes. invalidateSize() alone only fixes
        // rendering for the new container size — it doesn't recompute zoom,
        // so re-running fitBounds() after it keeps the whole route visible.
        let resizeTimer: ReturnType<typeof setTimeout>
        onResize = () => {
          clearTimeout(resizeTimer)
          resizeTimer = setTimeout(() => {
            map!.invalidateSize()
            map!.fitBounds(latlngs, { padding: [30, 30] })
          }, 150)
        }
        onOrientation = () => {
          setTimeout(() => {
            map!.invalidateSize()
            map!.fitBounds(latlngs, { padding: [30, 30] })
          }, 250)
        }
        window.addEventListener("resize", onResize)
        window.addEventListener("orientationchange", onOrientation)
      }
    )

    return () => {
      cancelled = true
      if (onResize) window.removeEventListener("resize", onResize)
      if (onOrientation) window.removeEventListener("orientationchange", onOrientation)
      if (onVeilTap && veilEl) veilEl.removeEventListener("click", onVeilTap)
      if (map) map.remove()
    }
  }, [stops])

  if (stops.length === 0) return null

  return (
    <div className="relative isolate h-[360px] overflow-hidden rounded-[14px] border border-black/[0.06]">
      <div ref={containerRef} className="h-full w-full" />
      <div
        ref={veilRef}
        className="absolute inset-0 z-[1000] flex items-center justify-center rounded-[14px] bg-zeal-black/30 text-[14px] font-semibold text-white transition-opacity duration-300"
      >
        Tap to explore the map
      </div>
    </div>
  )
}
