"use client"

import Link from "next/link"
import { SectionTag } from "@/components/section-tag"
import { TripCard } from "@/components/trip-card"
import { trips } from "@/lib/trips"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function TripsGrid() {
  const containerRef = useScrollReveal()

  return (
    <section className="bg-zeal-dark py-20 md:py-28" ref={containerRef}>
      <div className="mx-auto max-w-[1300px] px-[5vw]">
        {/* Intro */}
        <div className="text-center max-w-[700px] mx-auto mb-16 reveal">
          <SectionTag>Upcoming Trips</SectionTag>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.8rem] font-light text-zeal-white mt-4 leading-tight text-balance">
            Find your <em>immersion</em>
          </h2>
          <p className="text-[0.9rem] text-white/50 leading-relaxed mt-4">
            Each trip is built around a single subject and takes place where that
            subject is done at its best. Choose the one that speaks to you.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip, i) => (
            <div
              key={trip.slug}
              className="reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <TripCard trip={trip} />
            </div>
          ))}
        </div>

        {/* Link */}
        <div className="text-center mt-12 reveal">
          <Link
            href="/trips"
            className="text-[0.85rem] font-medium text-zeal-accent hover:text-zeal-accent-hover transition-colors"
          >
            View all trips &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
