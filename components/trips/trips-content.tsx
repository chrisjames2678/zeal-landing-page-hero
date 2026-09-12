"use client"

import { useState } from "react"
import Image from "next/image"
import { categories } from "@/lib/trips"
import type { ListingTrip } from "@/lib/trips-listing"
import { TripCard } from "@/components/trip-card"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const statusFilters = ["All", "Early Access", "Coming Soon"]

interface TripsContentProps {
  trips: ListingTrip[]
}

export function TripsContent({ trips }: TripsContentProps) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [activeStatus, setActiveStatus] = useState("All")
  const containerRef = useScrollReveal()

  const filteredTrips = trips.filter((trip) => {
    const categoryMatch =
      activeCategory === "All" || trip.category === activeCategory
    const statusMatch =
      activeStatus === "All" ||
      (activeStatus === "Early Access" && trip.status === "Early Access") ||
      (activeStatus === "Coming Soon" && trip.status === "Coming 2027")
    return categoryMatch && statusMatch
  })

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end bg-zeal-dark overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/trips-hero.jpg"
            alt=""
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zeal-dark via-zeal-dark/60 to-transparent" />
        </div>
        <div className="relative z-10 px-[5vw] pb-12 md:pb-16 max-w-[800px]">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-zeal-white leading-tight">
            All Trips
          </h1>
          <p className="text-[0.95rem] text-white/50 leading-relaxed mt-4 max-w-[560px]">
            Immersive small-group adventures across food, wellness, technology,
            and more.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section className="sticky top-[72px] z-40 bg-zeal-cream/95 backdrop-blur-md border-b border-black/[0.06]">
        <div className="mx-auto max-w-[1300px] px-[5vw] py-4">
          <div className="flex flex-wrap gap-2">
            {/* Category filters */}
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-[0.75rem] font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-zeal-accent text-zeal-white"
                    : "bg-transparent border border-black/10 text-zeal-mid hover:border-black/30"
                }`}
              >
                {cat}
              </button>
            ))}

            <span className="w-px h-8 bg-black/10 mx-1 self-center" />

            {/* Status filters */}
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`rounded-full px-4 py-2 text-[0.75rem] font-semibold tracking-wide transition-all ${
                  activeStatus === status
                    ? "bg-zeal-accent text-zeal-white"
                    : "bg-transparent border border-black/10 text-zeal-mid hover:border-black/30"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Trip grid */}
      <section className="bg-zeal-cream py-12 md:py-16">
        <div className="mx-auto max-w-[1300px] px-[5vw]">
          {filteredTrips.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrips.map((trip, i) => (
                <div
                  key={trip.slug}
                  className="reveal"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <TripCard trip={trip} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-zeal-mid text-[0.95rem]">
                No trips match your current filters. Try adjusting your
                selection.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
