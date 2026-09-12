"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { TripHero } from "./trip-hero"
import { TripHighlights } from "./trip-highlights"
import { TripEdgeGrid } from "./trip-edge-grid"
import { TripStatStrip } from "./trip-stat-strip"
import { TripMapSection } from "./trip-map-section"
import { TripItinerary } from "./trip-itinerary"
import { TripComparisonTable } from "./trip-comparison-table"
import { TripInclusions } from "./trip-inclusions"
import { TripFactsGrid } from "./trip-facts-grid"
import { TripFaq } from "./trip-faq"
import { TripPriceSidebar } from "./trip-price-sidebar"
import type { SanityTrip } from "@/lib/sanity/types"

interface SanityTripDetailProps {
  trip: SanityTrip
}

// Orchestrator for the Sanity-driven trip detail page. Sections are added
// here one at a time, in the same order as design-reference/zeal-product-page-mockup.html.
export function SanityTripDetail({ trip }: SanityTripDetailProps) {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef} className="bg-zeal-cream pb-20">
      {/* The site navbar is fixed and ~80px tall — this just clears it. */}
      <div className="h-[80px]" />
      <TripHero trip={trip} />

      <div className="mx-auto max-w-[1120px] px-[10px] min-[901px]:px-7">
        <div className="mt-10 grid grid-cols-1 items-start gap-8 min-[901px]:grid-cols-[1fr_340px] min-[901px]:gap-12">
          {/* Main content stays first in markup — at desktop width this is
              what places it in the wide (1fr) column, sidebar in the narrow
              (340px) one, since neither has an explicit grid-column. */}
          <div className="min-w-0">
            <TripHighlights trip={trip} />
            <TripEdgeGrid trip={trip} />
            <TripStatStrip trip={trip} />
            <TripMapSection trip={trip} />
            <TripItinerary trip={trip} />
            <TripComparisonTable trip={trip} />
            <TripInclusions trip={trip} />
            <TripFactsGrid trip={trip} />
            <TripFaq trip={trip} />
          </div>

          {/* order-first pulls the sidebar above the content on mobile/tablet;
              min-[901px]:order-none drops that override on desktop, where it
              falls back to normal (second-in-markup) placement and stickiness. */}
          <div className="order-first min-w-0 min-[901px]:order-none min-[901px]:sticky min-[901px]:top-[96px]">
            <TripPriceSidebar trip={trip} />
          </div>
        </div>
      </div>
    </div>
  )
}
