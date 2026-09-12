import { getSeasonOrDatesDisplay } from "@/lib/sanity/trip-display"
import type { SanityTrip } from "@/lib/sanity/types"

interface TripFactsGridProps {
  trip: SanityTrip
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function FactCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-b border-r border-black/[0.06] p-4 [&:nth-child(2n)]:border-r-0 min-[641px]:p-5">
      <div className="mb-1 text-[11px] uppercase tracking-[0.04em] text-zeal-mid">
        {label}
      </div>
      <div className="text-[14.5px] font-medium text-zeal-black">{value}</div>
    </div>
  )
}

export function TripFactsGrid({ trip }: TripFactsGridProps) {
  const groupSize =
    trip.groupSize?.min && trip.groupSize?.max
      ? `${trip.groupSize.min}–${trip.groupSize.max} guests`
      : (trip.groupSize?.min ?? trip.groupSize?.max)
        ? `${trip.groupSize.min ?? trip.groupSize.max} guests`
        : null

  const facts: { label: string; value: React.ReactNode }[] = [
    groupSize && { label: "Group size", value: groupSize },
    trip.physicalLevel && {
      label: "Physical level",
      value: capitalize(trip.physicalLevel),
    },
    trip.whoItsFor && { label: "Who it's for", value: trip.whoItsFor },
    trip.whoItsNotFor && { label: "Not for", value: trip.whoItsNotFor },
    { label: "Season", value: getSeasonOrDatesDisplay(trip) },
    trip.accommodationComfort && {
      label: "Accommodation",
      value: capitalize(trip.accommodationComfort),
    },
    trip.startPoint && { label: "Start point", value: trip.startPoint },
    trip.endPoint && { label: "End point", value: trip.endPoint },
    trip.arrivalAirport && {
      label: "Arrival airport",
      value: trip.arrivalAirport,
    },
    trip.departureAirport && {
      label: "Departure airport",
      value: trip.departureAirport,
    },
  ].filter((f): f is { label: string; value: React.ReactNode } => Boolean(f))

  if (facts.length === 0) return null

  return (
    <section className="reveal mt-16">
      <h2 className="font-serif text-[27px] font-medium text-zeal-black">
        Good to know
      </h2>
      <div className="mt-6 grid grid-cols-1 overflow-hidden rounded-[14px] border border-black/[0.06] min-[641px]:grid-cols-2">
        {facts.map((fact, i) => (
          <FactCell key={i} label={fact.label} value={fact.value} />
        ))}
      </div>
    </section>
  )
}
