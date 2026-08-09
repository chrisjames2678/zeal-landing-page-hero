"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
// Side-effect import: patches the shared `leaflet` module instance with
// `L.polylineDecorator` / `L.Symbol.arrowHead`. No published type declarations.
import "leaflet-polylinedecorator"

export interface RouteMapStop {
  name: string
  region?: string
  lat: number
  lng: number
}

export interface RouteMapLeg {
  duration: string
}

interface RouteMapProps {
  stops: RouteMapStop[]
  legs: RouteMapLeg[]
}

const carSvg = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E85D26" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 17h14M5 17a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm14 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM3 17V11l2-5h10l3 5v6"/></svg>`

export function RouteMap({ stops, legs }: RouteMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)
  const [isTouch, setIsTouch] = useState(false)
  const [veilDismissed, setVeilDismissed] = useState(false)

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0)
  }, [])

  useEffect(() => {
    if (!containerRef.current || stops.length === 0) return

    // `tap` isn't in @types/leaflet's MapOptions, but Leaflet supports it at
    // runtime (disables the legacy touch tap handler on touch devices, since
    // dragging is also disabled until the touch veil is dismissed).
    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
      zoomControl: false,
      dragging: !isTouch,
      tap: !isTouch,
    } as L.MapOptions).setView([stops[0].lat, stops[0].lng], 7)
    mapRef.current = map

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      maxZoom: 18,
    }).addTo(map)
    L.control.zoom({ position: "bottomright" }).addTo(map)

    const latlngs: [number, number][] = stops.map((s) => [s.lat, s.lng])
    const routeLine = L.polyline(latlngs, {
      color: "#E85D26",
      weight: 2.5,
      dashArray: "1,7",
      lineCap: "round",
    }).addTo(map)

    const leafletWithDecorator = L as unknown as {
      polylineDecorator: (
        line: L.Polyline,
        options: { patterns: unknown[] },
      ) => L.Layer
      Symbol: { arrowHead: (options: Record<string, unknown>) => unknown }
    }
    leafletWithDecorator
      .polylineDecorator(routeLine, {
        patterns: [
          {
            offset: "6%",
            repeat: "11%",
            symbol: leafletWithDecorator.Symbol.arrowHead({
              pixelSize: 9,
              polygon: true,
              pathOptions: { stroke: false, fillOpacity: 1, color: "#E85D26" },
            }),
          },
        ],
      })
      .addTo(map)

    legs.forEach((leg, i) => {
      const from = stops[i]
      const to = stops[i + 1]
      if (!from || !to) return
      const midLat = (from.lat + to.lat) / 2
      const midLng = (from.lng + to.lng) / 2
      const badge = L.divIcon({
        className: "",
        html: `<div class="transfer-badge">${carSvg}${leg.duration} by road</div>`,
      })
      L.marker([midLat, midLng], { icon: badge, interactive: false }).addTo(map)
    })

    stops.forEach((s, i) => {
      const icon = L.divIcon({
        className: "",
        html: `<div class="stop-pin-hit"><div class="stop-pin${i === 0 ? " start" : ""}"></div></div>`,
        iconSize: [44, 44],
        iconAnchor: [22, 22],
      })
      L.marker([s.lat, s.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${s.name}</b>${s.region ? `<br>${s.region}` : ""}`)
    })

    map.fitBounds(latlngs, { padding: [30, 30] })

    // invalidateSize() alone only fixes rendering for the new container size —
    // it doesn't recalculate zoom, so a route that fit at one width can end up
    // wider than a narrower container and get clipped at the edges. Re-running
    // fitBounds() after invalidateSize() fixes this properly.
    let resizeTimer: ReturnType<typeof setTimeout>
    const refit = (delay: number) => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        map.invalidateSize()
        map.fitBounds(latlngs, { padding: [30, 30] })
      }, delay)
    }
    const handleResize = () => refit(150)
    const handleOrientationChange = () => refit(250)
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", handleOrientationChange)

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", handleOrientationChange)
      map.remove()
      mapRef.current = null
    }
  }, [stops, legs, isTouch])

  return (
    <div className="relative h-[360px] overflow-hidden rounded-2xl border border-black/[0.06]">
      <div ref={containerRef} className="h-full w-full" />
      {isTouch && !veilDismissed && (
        <button
          type="button"
          onClick={() => {
            const map = mapRef.current
            map?.dragging.enable()
            ;(map as unknown as { tap?: { enable: () => void } })?.tap?.enable()
            setVeilDismissed(true)
          }}
          className="absolute inset-0 z-[1000] flex items-center justify-center rounded-2xl bg-zeal-black/28 text-[0.85rem] font-semibold text-zeal-white transition-opacity"
        >
          Tap to explore the map
        </button>
      )}
    </div>
  )
}
