import { Car } from "lucide-react"
import { TripMap } from "./trip-map"
import type { SanityItineraryDay, SanityTrip } from "@/lib/sanity/types"

interface TripMapSectionProps {
  trip: SanityTrip
}

// The itinerary's travel notes are full sentences ("~7 hours to region +
// ~50 min to hotel"). This pulls out just the first approximate duration
// ("~7 hours") for the short list under the map; the full sentence still
// shows in the itinerary section below. Falls back to the original text if
// nothing duration-shaped is found, rather than showing nothing.
function extractDuration(text: string): string {
  const match = text.match(/~?\d+(?:\.\d+)?\s*(?:min(?:ute)?s?|hours?|hrs?)/i)
  return match ? match[0].trim() : text
}

// Best-effort match of itinerary days to map legs: there's no schema field
// for "how long between stop A and stop B", so we watch for the day where
// the overnight accommodation changes and use that day's travel note as the
// note for the leg that just ended. Confirmed against the Colombia Coffee
// trip: the 3 accommodation changes line up exactly with its 3 real legs.
function deriveLegs(
  itinerary: SanityItineraryDay[] | null | undefined,
  legCount: number
): { travelTime: string }[] {
  if (legCount <= 0 || !itinerary) return []

  const sorted = [...itinerary].sort((a, b) => a.dayNumber - b.dayNumber)
  const legs: { travelTime: string }[] = []
  let prevAccommodation: string | null = null

  for (const day of sorted) {
    const accommodation = day.accommodation?.trim()
    if (
      accommodation &&
      prevAccommodation !== null &&
      accommodation !== prevAccommodation &&
      day.travelTime
    ) {
      legs.push({ travelTime: extractDuration(day.travelTime) })
      if (legs.length >= legCount) break
    }
    if (accommodation) prevAccommodation = accommodation
  }

  return legs
}

export function TripMapSection({ trip }: TripMapSectionProps) {
  const stops = (trip.destination?.stops ?? []).filter(
    (s): s is typeof s & { lat: number; lng: number } =>
      typeof s.lat === "number" && typeof s.lng === "number"
  )
  if (stops.length === 0) return null

  const legs = deriveLegs(trip.itinerary, stops.length - 1)

  return (
    <section className="reveal mt-16">
      <h2 className="font-serif text-[27px] font-medium text-zeal-black">
        Where you&rsquo;ll go
      </h2>
      <p className="mb-6 mt-1.5 max-w-[640px] text-[15px] text-zeal-mid">
        {stops.map((s) => s.name).join(" to ")}, in order.
      </p>
      <TripMap stops={stops} />
      {/* Transfer times as a plain list rather than on-map badges — real
          leg lengths vary too much (90 min next to 7 hours here) for any
          on-map placement to reliably clear both the line and the pins. */}
      {legs.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5">
          {legs.map((leg, i) => (
            <li
              key={i}
              className="flex items-center gap-1.5 text-[13px] text-zeal-mid"
            >
              <Car className="h-3.5 w-3.5 text-zeal-accent" />
              {stops[i].name} → {stops[i + 1].name}: {leg.travelTime}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
