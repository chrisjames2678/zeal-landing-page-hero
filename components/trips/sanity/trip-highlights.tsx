import type { SanityTrip } from "@/lib/sanity/types"

interface TripHighlightsProps {
  trip: SanityTrip
}

// Plain bullets, per instruction — no tags or labels on these.
export function TripHighlights({ trip }: TripHighlightsProps) {
  const highlights = trip.tripHighlights ?? []
  if (highlights.length === 0) return null

  return (
    <section className="reveal mt-16">
      <h2 className="font-serif text-[27px] font-medium text-zeal-black">
        Trip highlights
      </h2>
      <ul className="mt-6 grid grid-cols-1 gap-x-7 gap-y-3.5 min-[901px]:grid-cols-2">
        {highlights.map((highlight, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] text-zeal-black">
            <span className="mt-2 h-[7px] w-[7px] flex-none rounded-full bg-zeal-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
