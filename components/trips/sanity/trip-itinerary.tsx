import { TripPortableText } from "./portable-text"
import type { SanityTrip } from "@/lib/sanity/types"

interface TripItineraryProps {
  trip: SanityTrip
}

function MetaItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10.5px] uppercase tracking-[0.05em] text-zeal-mid/75">
        {label}
      </span>
      {children}
    </div>
  )
}

export function TripItinerary({ trip }: TripItineraryProps) {
  const days = trip.itinerary ?? []
  if (days.length === 0) return null

  const nights = trip.duration?.nights
  const tripDays = trip.duration?.days
  const country = trip.destination?.country

  return (
    <section className="reveal mt-16">
      <h2 className="font-serif text-[27px] font-medium text-zeal-black">
        Your itinerary
      </h2>
      {(tripDays || nights || country) && (
        <p className="mb-1.5 mt-1.5 max-w-[640px] text-[15px] text-zeal-mid">
          {[
            tripDays && nights
              ? `${tripDays} days / ${nights} nights`
              : tripDays
                ? `${tripDays} days`
                : null,
            country,
          ]
            .filter(Boolean)
            .join(", ")}
        </p>
      )}

      <div>
        {days
          .slice()
          .sort((a, b) => a.dayNumber - b.dayNumber)
          .map((day) => (
            <div
              key={day.dayNumber}
              className="grid grid-cols-[48px_1fr] gap-4 border-t border-black/[0.06] py-6 last:border-b min-[901px]:grid-cols-[64px_1fr] min-[901px]:gap-5"
            >
              <div className="font-serif text-[22px] font-medium text-zeal-accent min-[901px]:text-[26px]">
                {String(day.dayNumber).padStart(2, "0")}
              </div>
              <div>
                {day.title && (
                  <h4 className="mb-2.5 text-[18px] font-semibold text-zeal-black">
                    {day.title}
                  </h4>
                )}
                {day.whatHappens && (
                  <div className="mb-3.5">
                    <TripPortableText value={day.whatHappens} />
                  </div>
                )}
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-zeal-mid">
                  {day.accommodation && (
                    <MetaItem label="Stay">{day.accommodation}</MetaItem>
                  )}
                  {day.meals && day.meals.length > 0 && (
                    <MetaItem label="Meals">
                      <span className="flex gap-1">
                        {day.meals.map((meal, i) => (
                          <span
                            key={i}
                            className="flex h-[18px] w-[18px] items-center justify-center rounded bg-zeal-accent/10 text-[10.5px] font-semibold text-zeal-accent-hover"
                          >
                            {meal}
                          </span>
                        ))}
                      </span>
                    </MetaItem>
                  )}
                  {day.travelTime && (
                    <MetaItem label="Travel">{day.travelTime}</MetaItem>
                  )}
                </div>
                {day.inclusions && day.inclusions.length > 0 && (
                  <ul className="mt-2.5 flex flex-col gap-1">
                    {day.inclusions.map((item, i) => (
                      <li key={i} className="flex gap-2 text-[13px] text-zeal-mid">
                        <span className="font-semibold text-zeal-accent">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {day.optionalExtras && day.optionalExtras.length > 0 && (
                  <div className="mt-2.5 inline-block rounded-md bg-zeal-accent/10 px-2.5 py-1.5 text-[13px] text-zeal-accent-hover">
                    Optional: {day.optionalExtras.join(", ")}
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}
