"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { PortableText, type PortableTextComponents } from "@portabletext/react"
import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useFormspree } from "@/hooks/use-formspree"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import type { SanityItineraryDay, SanityStop, SanityTrip } from "@/lib/sanity/types"

const RouteMap = dynamic(
  () => import("@/components/trips/route-map").then((m) => m.RouteMap),
  { ssr: false },
)

interface TripDetailSanityProps {
  trip: SanityTrip
}

const CURRENCY_SYMBOLS: Record<string, string> = { GBP: "£", USD: "$", EUR: "€" }

const EXPERIENCE_TAG_LABELS: Record<string, string> = {
  immersive: "Immersive",
  "hands-on": "Hands-on / active",
  "expert-led": "Expert-led",
  "small-group": "Small-group",
  "privileged-access": "Privileged access",
  "at-source": "At-source / origin",
  "skill-building": "Skill-building",
}

const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[0.9rem] text-zeal-mid leading-[1.7]">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="flex flex-col gap-1.5 pl-5 text-[0.9rem] text-zeal-mid list-disc">
        {children}
      </ul>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-zeal-black">{children}</strong>
    ),
  },
}

function formatMoney(amount?: number, currency?: string) {
  if (amount == null) return undefined
  const symbol = currency ? (CURRENCY_SYMBOLS[currency] ?? `${currency} `) : ""
  return `${symbol}${amount.toLocaleString()}`
}

function capitalize(value?: string) {
  if (!value) return undefined
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function nextDeparture(trip: SanityTrip) {
  const upcoming = trip.departures?.find((d) => d.startDate)
  if (upcoming?.startDate) {
    return new Date(upcoming.startDate).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    })
  }
  return trip.season
}

// The schema has no explicit link between an itinerary day and a destination
// stop, so we infer transfer legs: whenever a day's accommodation differs
// from the previous day's, that day's travelTime is the leg into the new
// stop. Well-defined for well-formed itineraries; degrades gracefully
// (skipped in the map) if a travelTime is missing.
function deriveTransferLegs(itinerary: SanityItineraryDay[] = []) {
  const legs: { duration: string }[] = []
  for (let i = 1; i < itinerary.length; i++) {
    const prev = itinerary[i - 1]
    const day = itinerary[i]
    if (day.accommodation && day.accommodation !== prev.accommodation && day.travelTime) {
      legs.push({ duration: day.travelTime })
    }
  }
  return legs
}

export function TripDetailSanity({ trip }: TripDetailSanityProps) {
  const containerRef = useScrollReveal()
  const { status, handleSubmit } = useFormspree()

  const mapStops = (trip.destination?.stops ?? []).filter(
    (s) => s.lat != null && s.lng != null,
  ) as (SanityStop & { lat: number; lng: number })[]
  const mapLegs = deriveTransferLegs(trip.itinerary)

  const places = trip.destination?.specificPlaces ?? []
  const heroCaptions = [
    places[0] ?? trip.tripName,
    places[1] ?? trip.subject,
    places[2] ?? trip.destination?.country,
  ].filter((c): c is string => Boolean(c))

  const durationLabel =
    trip.duration?.days != null
      ? `${trip.duration.days} day${trip.duration.days === 1 ? "" : "s"}${
          trip.duration.nights != null ? ` / ${trip.duration.nights} nights` : ""
        }`
      : undefined

  return (
    <div ref={containerRef} className="bg-zeal-cream">
      <div className="mx-auto max-w-[1200px] px-[5vw] pt-8">
        {/* Crumbs */}
        <p className="text-[0.8rem] text-zeal-mid">
          <Link href="/" className="hover:text-zeal-accent transition-colors">
            Home
          </Link>
          <span className="mx-2">&rsaquo;</span>
          <Link href="/trips" className="hover:text-zeal-accent transition-colors">
            Trips
          </Link>
          {trip.destination?.country && (
            <>
              <span className="mx-2">&rsaquo;</span>
              <span>{trip.destination.country}</span>
            </>
          )}
        </p>

        {/* Hero photo grid (placeholders — schema has no image field yet) */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-2.5 md:h-[420px]">
          <div className="reveal relative flex h-[170px] md:h-full items-end overflow-hidden rounded-2xl bg-gradient-to-br from-zeal-off-white to-zeal-light">
            {heroCaptions[0] && (
              <span className="m-2.5 rounded-md bg-zeal-cream/80 px-3 py-2 text-[0.7rem] text-zeal-mid">
                Photo — {heroCaptions[0]}
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-2.5">
            {[heroCaptions[1], heroCaptions[2]].map((caption, i) => (
              <div
                key={i}
                className="reveal relative flex h-[170px] md:h-full items-end overflow-hidden rounded-2xl bg-gradient-to-br from-zeal-off-white to-zeal-light"
              >
                {caption && (
                  <span className="m-2.5 rounded-md bg-zeal-cream/80 px-3 py-2 text-[0.7rem] text-zeal-mid">
                    Photo — {caption}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Title row */}
        <div className="reveal mt-7">
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.11em] text-zeal-accent">
            {[trip.category, trip.subject].filter(Boolean).join(" · ")}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-light text-zeal-black leading-tight mt-2 max-w-[640px]">
            {trip.tripName}
          </h1>
          {trip.oneLineSummary && (
            <p className="max-w-[620px] text-[1.05rem] text-zeal-mid mt-4 leading-[1.6]">
              {trip.oneLineSummary}
            </p>
          )}
          {trip.experienceTags && trip.experienceTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {trip.experienceTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zeal-moss-tint px-3 py-1.5 text-[0.72rem] font-medium text-zeal-moss"
                >
                  {EXPERIENCE_TAG_LABELS[tag] ?? tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content + sticky sidebar */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 items-start">
          <div className="flex flex-col gap-16">
            {/* Trip highlights */}
            {trip.tripHighlights && trip.tripHighlights.length > 0 && (
              <section className="reveal">
                <h2 className="font-serif text-2xl font-light text-zeal-black mb-6">
                  Trip highlights
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-3.5">
                  {trip.tripHighlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-[0.9rem] text-zeal-black">
                      <span className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-zeal-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* The Zeal edge */}
            {(trip.whoYouLearnFrom?.length ||
              trip.privilegedAccess?.length ||
              trip.whatYouDo?.length ||
              trip.whatYoullLeaveAbleToDo) && (
              <section className="reveal">
                <h2 className="font-serif text-2xl font-light text-zeal-black mb-1.5">
                  The Zeal edge
                </h2>
                <p className="text-[0.85rem] text-zeal-mid mb-6 max-w-[640px]">
                  What separates this from an ordinary sightseeing tour.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  {trip.whoYouLearnFrom && trip.whoYouLearnFrom.length > 0 && (
                    <div className="rounded-2xl border border-black/[0.06] bg-zeal-white p-6">
                      <h3 className="font-semibold text-[0.95rem] text-zeal-black mb-3">
                        Who you learn from
                      </h3>
                      <ul className="flex flex-col gap-3">
                        {trip.whoYouLearnFrom.map((expert, i) => (
                          <li key={i} className="text-[0.85rem]">
                            <span className="block font-semibold text-zeal-black">
                              {expert.name}
                            </span>
                            <span className="text-zeal-mid">{expert.credentials}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {trip.privilegedAccess && trip.privilegedAccess.length > 0 && (
                    <div className="rounded-2xl border border-black/[0.06] bg-zeal-white p-6">
                      <h3 className="font-semibold text-[0.95rem] text-zeal-black mb-3">
                        Privileged access
                      </h3>
                      <PortableText value={trip.privilegedAccess} components={ptComponents} />
                    </div>
                  )}
                  {trip.whatYouDo && trip.whatYouDo.length > 0 && (
                    <div className="rounded-2xl border border-black/[0.06] bg-zeal-white p-6">
                      <h3 className="font-semibold text-[0.95rem] text-zeal-black mb-3">
                        What you do
                      </h3>
                      <PortableText value={trip.whatYouDo} components={ptComponents} />
                    </div>
                  )}
                  {(trip.whatYoullLeaveAbleToDo || trip.skillsAndTechniques?.length) && (
                    <div className="rounded-2xl border border-black/[0.06] bg-zeal-white p-6">
                      <h3 className="font-semibold text-[0.95rem] text-zeal-black mb-3">
                        What you&rsquo;ll leave able to do
                      </h3>
                      {trip.whatYoullLeaveAbleToDo && (
                        <p className="text-[0.9rem] text-zeal-mid leading-[1.7]">
                          {trip.whatYoullLeaveAbleToDo}
                        </p>
                      )}
                      {trip.skillsAndTechniques && trip.skillsAndTechniques.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {trip.skillsAndTechniques.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full bg-zeal-accent/10 px-2.5 py-1 text-[0.72rem] text-zeal-accent-hover"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Notable data points */}
            {trip.notableDataPoints && trip.notableDataPoints.length > 0 && (
              <section className="reveal">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px overflow-hidden rounded-2xl border border-black/[0.06] bg-black/[0.06]">
                  {trip.notableDataPoints.map((point, i) => (
                    <div key={i} className="bg-zeal-white p-5">
                      <p className="font-serif text-[0.9rem] font-semibold text-zeal-black leading-[1.25]">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Route map */}
            {mapStops.length > 1 && (
              <section className="reveal">
                <h2 className="font-serif text-2xl font-light text-zeal-black mb-1.5">
                  Where you&rsquo;ll go
                </h2>
                <p className="text-[0.85rem] text-zeal-mid mb-6 max-w-[640px]">
                  {mapStops.map((s) => s.name).join(" → ")}, in order.
                </p>
                <RouteMap
                  stops={mapStops.map((s) => ({
                    name: s.name ?? "",
                    region: s.region,
                    lat: s.lat,
                    lng: s.lng,
                  }))}
                  legs={mapLegs}
                />
              </section>
            )}

            {/* Itinerary */}
            {trip.itinerary && trip.itinerary.length > 0 && (
              <section className="reveal">
                <h2 className="font-serif text-2xl font-light text-zeal-black mb-1.5">
                  Your itinerary
                </h2>
                {durationLabel && (
                  <p className="text-[0.85rem] text-zeal-mid mb-6 max-w-[640px]">
                    {durationLabel}
                    {trip.destination?.stops?.length
                      ? `, ${trip.destination.stops[0]?.name} to ${
                          trip.destination.stops[trip.destination.stops.length - 1]?.name
                        }.`
                      : "."}
                  </p>
                )}
                <div>
                  {trip.itinerary.map((day, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[56px_1fr] gap-5 py-6 border-t border-black/[0.06] ${
                        i === trip.itinerary!.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div className="font-serif text-2xl font-semibold text-zeal-accent">
                        {String(day.dayNumber).padStart(2, "0")}
                      </div>
                      <div>
                        {day.title && (
                          <h4 className="text-[1.05rem] font-semibold text-zeal-black mb-2.5">
                            {day.title}
                          </h4>
                        )}
                        {day.whatHappens && day.whatHappens.length > 0 && (
                          <div className="mb-3.5">
                            <PortableText value={day.whatHappens} components={ptComponents} />
                          </div>
                        )}
                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-[0.8rem] text-zeal-mid">
                          {day.accommodation && (
                            <div className="flex gap-1.5 items-center">
                              <span className="font-mono text-[0.65rem] uppercase tracking-wide opacity-75">
                                Stay
                              </span>
                              {day.accommodation}
                            </div>
                          )}
                          {day.meals && day.meals.length > 0 && (
                            <div className="flex gap-1.5 items-center">
                              <span className="font-mono text-[0.65rem] uppercase tracking-wide opacity-75">
                                Meals
                              </span>
                              <span className="flex gap-1">
                                {day.meals.map((meal, mi) => (
                                  <span
                                    key={mi}
                                    className="flex h-[18px] w-[18px] items-center justify-center rounded font-mono text-[0.65rem] font-semibold bg-zeal-moss-tint text-zeal-moss"
                                  >
                                    {meal}
                                  </span>
                                ))}
                              </span>
                            </div>
                          )}
                          {day.travelTime && (
                            <div className="flex gap-1.5 items-center">
                              <span className="font-mono text-[0.65rem] uppercase tracking-wide opacity-75">
                                Travel
                              </span>
                              {day.travelTime}
                            </div>
                          )}
                        </div>
                        {day.optionalExtras && day.optionalExtras.length > 0 && (
                          <div className="inline-block mt-2.5 rounded-md bg-zeal-accent/10 px-2.5 py-1.5 text-[0.75rem] text-zeal-accent-hover">
                            Optional: {day.optionalExtras.join(", ")}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* How this compares */}
            {trip.howThisCompares && trip.howThisCompares.length > 0 && (
              <section className="reveal">
                <h2 className="font-serif text-2xl font-light text-zeal-black mb-1.5">
                  How this compares
                </h2>
                {trip.comparedTo && (
                  <p className="text-[0.85rem] text-zeal-mid mb-6 max-w-[640px]">
                    Against {trip.comparedTo}.
                  </p>
                )}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full border-collapse text-[0.9rem]">
                    <thead>
                      <tr>
                        <th className="border-b border-zeal-black text-left py-3 px-4 font-mono text-[0.7rem] uppercase tracking-wide text-zeal-mid font-medium">
                          Typical tour
                        </th>
                        <th className="border-b border-zeal-black text-left py-3 px-4 font-mono text-[0.7rem] uppercase tracking-wide text-zeal-mid font-medium">
                          This Zeal trip
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {trip.howThisCompares.map((row, i) => (
                        <tr key={i}>
                          <td className="border-b border-black/[0.06] py-3 px-4 align-top">
                            {row.typicalTour}
                          </td>
                          <td className="border-b border-black/[0.06] py-3 px-4 align-top font-medium text-zeal-moss">
                            {row.zealTrip}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* Stacked cards below sm — same data, mobile-friendly */}
                <div className="sm:hidden flex flex-col gap-3">
                  {trip.howThisCompares.map((row, i) => (
                    <div
                      key={i}
                      className="rounded-xl border border-black/[0.06] bg-zeal-white p-4 text-[0.9rem]"
                    >
                      <p className="font-mono text-[0.65rem] uppercase tracking-wide text-zeal-mid mb-1">
                        Typical tour
                      </p>
                      <p className="mb-3">{row.typicalTour}</p>
                      <p className="font-mono text-[0.65rem] uppercase tracking-wide text-zeal-mid mb-1">
                        This Zeal trip
                      </p>
                      <p className="font-medium text-zeal-moss">{row.zealTrip}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* What's included */}
            {(trip.inclusions?.length || trip.exclusions?.length) && (
              <section className="reveal">
                <h2 className="font-serif text-2xl font-light text-zeal-black mb-6">
                  What&rsquo;s included
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                  {trip.inclusions && trip.inclusions.length > 0 && (
                    <ul className="flex flex-col">
                      {trip.inclusions.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 py-2.5 border-b border-black/[0.06] text-[0.9rem] last:border-b-0"
                        >
                          <span className="font-semibold text-zeal-moss">&#10003;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                  {trip.exclusions && trip.exclusions.length > 0 && (
                    <ul className="flex flex-col">
                      {trip.exclusions.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-2.5 py-2.5 border-b border-black/[0.06] text-[0.9rem] text-zeal-mid last:border-b-0"
                        >
                          <span className="font-semibold">&ndash;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            )}

            {/* Good to know */}
            <section className="reveal">
              <h2 className="font-serif text-2xl font-light text-zeal-black mb-6">
                Good to know
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 overflow-hidden rounded-2xl border border-black/[0.06]">
                {[
                  trip.groupSize?.min != null && trip.groupSize.max != null
                    ? ["Group size", `${trip.groupSize.min}–${trip.groupSize.max} guests`]
                    : null,
                  trip.physicalLevel ? ["Physical level", capitalize(trip.physicalLevel)] : null,
                  trip.whoItsFor ? ["Who it's for", trip.whoItsFor] : null,
                  trip.whoItsNotFor ? ["Not for", trip.whoItsNotFor] : null,
                  nextDeparture(trip) ? ["Season", nextDeparture(trip)] : null,
                  trip.accommodationComfort
                    ? ["Accommodation", capitalize(trip.accommodationComfort) + " comfort"]
                    : null,
                  trip.startPoint ? ["Start point", trip.startPoint] : null,
                  trip.endPoint ? ["End point", trip.endPoint] : null,
                  trip.arrivalAirport ? ["Arrival airport", trip.arrivalAirport] : null,
                  trip.departureAirport ? ["Departure airport", trip.departureAirport] : null,
                ]
                  .filter((cell): cell is [string, string] => cell != null)
                  .map(([label, value], i) => (
                    <div
                      key={i}
                      className={`border-b border-black/[0.06] p-5 ${
                        i % 2 === 0 ? "sm:border-r sm:border-black/[0.06]" : ""
                      }`}
                    >
                      <p className="font-mono text-[0.7rem] uppercase tracking-wide text-zeal-mid mb-1">
                        {label}
                      </p>
                      <p className="text-[0.9rem] font-medium text-zeal-black">{value}</p>
                    </div>
                  ))}
              </div>
            </section>

            {/* FAQ */}
            {trip.faq && trip.faq.length > 0 && (
              <section id="faq" className="reveal">
                <h2 className="font-serif text-2xl font-light text-zeal-black mb-6">
                  Adventure FAQs
                </h2>
                <Accordion type="single" collapsible>
                  {trip.faq.map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-black/[0.06]">
                      <AccordionTrigger className="text-left text-[0.95rem] font-semibold text-zeal-black hover:no-underline">
                        <span>
                          {item.question}
                          {item.type === "trip-specific" && (
                            <span className="ml-2.5 rounded bg-zeal-accent/10 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-zeal-accent-hover align-middle">
                              Trip-specific
                            </span>
                          )}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent>
                        {item.answer && item.answer.length > 0 && (
                          <PortableText value={item.answer} components={ptComponents} />
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            )}
          </div>

          {/* Sticky price / booking sidebar */}
          <div className="reveal lg:sticky lg:top-24">
            <div className="rounded-2xl border border-black/[0.06] bg-zeal-white p-6">
              {durationLabel && (
                <p className="text-[0.8rem] text-zeal-mid mb-0.5">{durationLabel} from</p>
              )}
              {trip.priceFrom?.amount != null && (
                <p className="font-serif text-3xl font-semibold text-zeal-black">
                  {formatMoney(trip.priceFrom.amount, trip.priceFrom.currency)}
                  <sup className="ml-1 text-sm font-medium text-zeal-mid">pp</sup>
                </p>
              )}
              <p className="text-[0.75rem] text-zeal-mid mt-1">
                Indicative &mdash; final pricing tbc
              </p>

              <div className="flex flex-col gap-2.5 my-4.5 py-4 border-t border-b border-black/[0.06] text-[0.85rem]">
                {durationLabel && (
                  <div className="flex justify-between text-zeal-mid">
                    <span>Duration</span>
                    <span className="font-medium text-zeal-black">{durationLabel}</span>
                  </div>
                )}
                {trip.groupSize?.min != null && trip.groupSize.max != null && (
                  <div className="flex justify-between text-zeal-mid">
                    <span>Group size</span>
                    <span className="font-medium text-zeal-black">
                      {trip.groupSize.min}&ndash;{trip.groupSize.max} guests
                    </span>
                  </div>
                )}
                {trip.physicalLevel && (
                  <div className="flex justify-between text-zeal-mid">
                    <span>Pace</span>
                    <span className="font-medium text-zeal-black">
                      {capitalize(trip.physicalLevel)}
                    </span>
                  </div>
                )}
                {nextDeparture(trip) && (
                  <div className="flex justify-between text-zeal-mid">
                    <span>Next departure</span>
                    <span className="font-medium text-zeal-black">{nextDeparture(trip)}</span>
                  </div>
                )}
              </div>

              <Link
                href="#enquire"
                className="block w-full rounded-lg bg-zeal-accent px-4 py-3.5 text-center text-[0.9rem] font-bold text-zeal-white transition-colors hover:bg-zeal-accent-hover"
              >
                Enquire about this trip
              </Link>
              {trip.faq && trip.faq.length > 0 && (
                <Link
                  href="#faq"
                  className="mt-2.5 block w-full rounded-lg border border-black/[0.06] px-4 py-2.5 text-center text-[0.85rem] font-medium text-zeal-black transition-colors hover:border-zeal-accent"
                >
                  Read the FAQs
                </Link>
              )}
              <p className="mt-3 text-center text-[0.75rem] text-zeal-mid">
                Small group &middot; Expert-led &middot; No hidden extras
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enquire */}
      <section id="enquire" className="mt-20 py-16 md:py-24 bg-zeal-black">
        <div className="reveal mx-auto max-w-[640px] px-[5vw] text-center">
          <SectionTag>Enquire</SectionTag>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-zeal-white mt-4 leading-tight text-balance">
            Enquire about {trip.tripName}
          </h2>
          <p className="text-[0.9rem] text-white/55 leading-relaxed mt-4">
            Tell us your email and we&rsquo;ll be in touch with availability and pricing.
          </p>

          {status === "success" ? (
            <p className="mt-8 text-[0.95rem] font-medium text-zeal-accent">
              Thanks! We&rsquo;ll be in touch.
            </p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto"
              >
                <input type="hidden" name="_subject" value={`Enquiry - ${trip.tripName}`} />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[0.85rem] text-zeal-white placeholder:text-white/30 focus:outline-none focus:border-zeal-accent transition-colors"
                  required
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-full bg-zeal-accent px-6 py-3 text-[0.85rem] font-semibold text-zeal-white tracking-wide transition-all hover:bg-zeal-accent-hover hover:-translate-y-0.5 hover:shadow-lg shrink-0 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {status === "submitting" ? "Sending..." : "Enquire"}
                </button>
              </form>
              {status === "error" && (
                <p className="mt-3 text-[0.8rem] text-red-400">
                  Something went wrong. Please try again.
                </p>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
