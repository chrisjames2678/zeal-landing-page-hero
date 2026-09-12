import type { SanityTrip } from "@/lib/sanity/types"

interface TripStatStripProps {
  trip: SanityTrip
}

export function TripStatStrip({ trip }: TripStatStripProps) {
  const stats = trip.notableDataPoints ?? []
  if (stats.length === 0) return null

  return (
    <section className="reveal mt-16">
      {/* flex + grow (not a fixed-column grid) so tiles always stretch to
          fill the full row width, whether that's one row or two — no
          ragged partial row left over. */}
      <div className="flex flex-wrap gap-2">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="flex-[1_1_200px] rounded-[10px] border border-black/[0.06] bg-zeal-white p-5"
          >
            <div className="font-serif text-[15px] font-medium leading-[1.25] text-zeal-black">
              {stat}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
