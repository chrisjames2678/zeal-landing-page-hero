"use client"

import Image from "next/image"
import Link from "next/link"
import { Check } from "lucide-react"
import type { Trip } from "@/lib/trips"
import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useFormspree } from "@/hooks/use-formspree"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const inclusions = [
  "Workshops & Experiences",
  "Accommodation",
  "Local Transport",
  "Trip Leader",
  "Additional Adventures",
  "24/7 Support",
]

interface TripDetailProps {
  trip: Trip
}

export function TripDetail({ trip }: TripDetailProps) {
  const containerRef = useScrollReveal()
  const { status, handleSubmit } = useFormspree()
  const isEarlyAccess = trip.status === "Early Access"

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

        <div className="relative z-10 px-[5vw] pb-12 md:pb-16 max-w-[800px]">
          {/* Category badge */}
          <span className="inline-block rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[0.7rem] font-semibold text-zeal-white tracking-wide mb-4">
            {trip.category}
          </span>

          {/* Status badge */}
          <div className="mb-4">
            <span
              className={`inline-block rounded-full px-3 py-1 text-[0.65rem] font-semibold tracking-wide ${
                isEarlyAccess
                  ? "bg-zeal-accent text-zeal-white"
                  : "bg-white/15 backdrop-blur-sm text-zeal-white"
              }`}
            >
              {trip.status}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-zeal-white leading-tight">
            {trip.title}
          </h1>
          <p className="text-[0.95rem] text-white/60 mt-3">
            {trip.location} &middot; {trip.duration}
          </p>
          <div className="mt-6">
            <Link
              href="#trip-cta"
              className="inline-flex items-center rounded-full bg-zeal-accent px-6 py-3 text-[0.85rem] font-semibold text-zeal-white tracking-wide transition-all hover:bg-zeal-accent-hover hover:-translate-y-0.5 hover:shadow-lg"
            >
              {isEarlyAccess
                ? "Get Early Access \u2192"
                : "Notify Me When This Launches"}
            </Link>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-zeal-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1300px] px-[5vw]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            {/* Description */}
            <div className="reveal">
              <SectionTag>Overview</SectionTag>
              <div className="mt-6 flex flex-col gap-5">
                {trip.longDescription.split("\n\n").map((paragraph, i) => (
                  <p
                    key={i}
                    className="text-[0.9rem] text-zeal-mid leading-[1.7]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Sticky summary card */}
            <div className="reveal">
              <div className="lg:sticky lg:top-24 bg-zeal-white rounded-xl border border-black/[0.06] p-6">
                <h3 className="font-serif text-xl font-light text-zeal-black mb-6">
                  Trip Details
                </h3>
                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex justify-between items-center py-2 border-b border-black/[0.06]">
                    <span className="text-[0.8rem] text-zeal-mid font-medium">
                      Duration
                    </span>
                    <span className="text-[0.85rem] font-semibold text-zeal-black">
                      {trip.duration}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-black/[0.06]">
                    <span className="text-[0.8rem] text-zeal-mid font-medium">
                      Group Size
                    </span>
                    <span className="text-[0.85rem] font-semibold text-zeal-black">
                      10-14
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-black/[0.06]">
                    <span className="text-[0.8rem] text-zeal-mid font-medium">
                      Category
                    </span>
                    <span className="text-[0.85rem] font-semibold text-zeal-black">
                      {trip.category}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-black/[0.06]">
                    <span className="text-[0.8rem] text-zeal-mid font-medium">
                      Status
                    </span>
                    <span
                      className={`text-[0.85rem] font-semibold ${
                        isEarlyAccess
                          ? "text-zeal-accent"
                          : "text-zeal-mid"
                      }`}
                    >
                      {trip.status}
                    </span>
                  </div>
                </div>

                {/* What's included */}
                <h4 className="text-[0.8rem] font-semibold text-zeal-black mb-3 uppercase tracking-wide">
                  {"What's Included"}
                </h4>
                <ul className="flex flex-col gap-2 mb-6">
                  {inclusions.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-[0.8rem] text-zeal-mid"
                    >
                      <Check className="w-3.5 h-3.5 text-zeal-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="#trip-cta"
                  className="w-full inline-flex items-center justify-center rounded-full bg-zeal-accent px-6 py-3 text-[0.85rem] font-semibold text-zeal-white tracking-wide transition-all hover:bg-zeal-accent-hover hover:-translate-y-0.5 hover:shadow-lg"
                >
                  {isEarlyAccess
                    ? "Get Early Access \u2192"
                    : "Notify Me"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Itinerary (only for Early Access trips) */}
      {trip.itinerary && trip.itinerary.length > 0 && (
        <section className="bg-zeal-dark py-16 md:py-24">
          <div className="mx-auto max-w-[900px] px-[5vw]">
            <div className="text-center mb-12 reveal">
              <SectionTag>Sample Itinerary</SectionTag>
              <h2 className="font-serif text-3xl md:text-4xl font-light text-zeal-white mt-4 leading-tight">
                Day by day
              </h2>
            </div>

            <Accordion type="single" collapsible className="reveal">
              {trip.itinerary.map((day, i) => (
                <AccordionItem
                  key={i}
                  value={`day-${i}`}
                  className="border-white/10"
                >
                  <AccordionTrigger className="text-left py-5 hover:no-underline group">
                    <div className="flex items-baseline gap-4">
                      <span className="text-zeal-accent text-[0.75rem] font-semibold tracking-wide uppercase shrink-0">
                        {day.day}
                      </span>
                      <span className="font-serif text-lg font-light text-zeal-white group-hover:text-zeal-accent transition-colors">
                        {day.title}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-[0.85rem] text-white/50 leading-relaxed pb-5 pl-[calc(3.5rem)]">
                    {day.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* What's Included grid */}
      <section className="bg-zeal-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-[5vw]">
          <div className="text-center mb-12 reveal">
            <SectionTag>{"What's Included"}</SectionTag>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-zeal-black mt-4 leading-tight">
              Everything you need
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal">
            {[
              {
                title: "Workshops & Experiences",
                desc: "All structured sessions, tastings, field visits, and hands-on activities.",
              },
              {
                title: "Accommodation",
                desc: "Comfort-focused, well-located places chosen for quality and character.",
              },
              {
                title: "Local Transport",
                desc: "All transport between scheduled locations during the trip.",
              },
              {
                title: "Trip Leader",
                desc: "A dedicated host who manages logistics and adds context throughout.",
              },
              {
                title: "Additional Adventures",
                desc: "Extra activities tied to the theme and destination.",
              },
              {
                title: "24/7 Support",
                desc: "Clear communication before arrival and round-the-clock support.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-3 py-4 border-b border-black/[0.06]"
              >
                <Check className="w-4 h-4 text-zeal-accent mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-[0.85rem] font-semibold text-zeal-black">
                    {item.title}
                  </h4>
                  <p className="text-[0.8rem] text-zeal-mid mt-0.5">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trip CTA */}
      <section
        id="trip-cta"
        className="relative py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute inset-0">
          <Image src={trip.image} alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-zeal-black/85" />
        </div>

        <div className="relative z-10 mx-auto max-w-[640px] px-[5vw] text-center reveal">
          <SectionTag>
            {isEarlyAccess ? "Early Access" : "Get Notified"}
          </SectionTag>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-zeal-white mt-4 leading-tight text-balance">
            {isEarlyAccess
              ? `Join Early Access for ${trip.title}`
              : `Notify me when ${trip.title} launches`}
          </h2>
          <p className="text-[0.9rem] text-white/55 leading-relaxed mt-4">
            {isEarlyAccess
              ? "Get priority booking, introductory pricing, and the chance to shape this trip."
              : "Be the first to know when dates and pricing are announced."}
          </p>

          {status === "success" ? (
            <p className="mt-8 text-[0.95rem] font-medium text-zeal-accent">
              {"Thanks! We'll be in touch."}
            </p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto"
              >
                <input
                  type="hidden"
                  name="_subject"
                  value={
                    isEarlyAccess
                      ? "Early Access Signup"
                      : `Notify Me - ${trip.title}`
                  }
                />
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
                  {status === "submitting"
                    ? "Sending..."
                    : isEarlyAccess
                    ? "Join"
                    : "Notify Me"}
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
