import type { SanityTrip } from "@/lib/sanity/types"

interface TripInclusionsProps {
  trip: SanityTrip
}

export function TripInclusions({ trip }: TripInclusionsProps) {
  const inclusions = trip.inclusions ?? []
  const exclusions = trip.exclusions ?? []
  if (inclusions.length === 0 && exclusions.length === 0) return null

  return (
    <section className="reveal mt-16">
      <h2 className="font-serif text-[27px] font-medium text-zeal-black">
        What&rsquo;s included
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-7 min-[901px]:grid-cols-2">
        {inclusions.length > 0 && (
          <ul>
            {inclusions.map((item, i) => (
              <li
                key={i}
                className="flex gap-2.5 border-b border-black/[0.06] py-2.5 text-[14.5px] text-zeal-black last:border-none"
              >
                <span className="font-semibold text-zeal-accent">✓</span>
                {item}
              </li>
            ))}
          </ul>
        )}
        {exclusions.length > 0 && (
          <ul>
            {exclusions.map((item, i) => (
              <li
                key={i}
                className="flex gap-2.5 border-b border-black/[0.06] py-2.5 text-[14.5px] text-zeal-mid last:border-none"
              >
                <span className="font-semibold text-zeal-mid">–</span>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
