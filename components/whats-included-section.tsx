"use client"

import Image from "next/image"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const inclusions = [
  {
    title: "Classes, Workshops & Experiences",
    description: "All structured sessions, tastings, visits, and activities included in the itinerary.",
    image: "/images/classes-workshops.jpg",
  },
  {
    title: "Accommodation",
    description: "Comfort-focused, well-located places chosen for quality and character.",
    image: "/images/accommodation.jpg",
  },
  {
    title: "Local Transport",
    description: "All transport between scheduled locations during the trip.",
    image: "/images/local-transport.jpg",
  },
  {
    title: "Trip Leader",
    description: "A host who manages logistics, keeps things moving, and adds context along the way.",
    image: "/images/trip-leader.jpg",
  },
  {
    title: "Additional Adventures",
    description: "Extra activities tied to the theme or destination, built into the itinerary.",
    image: "/images/additional-adventures.jpg",
  },
  {
    title: "24/7 Support",
    description: "Clear communication before arrival and round-the-clock support while on the trip.",
    image: "/images/support.jpg",
  },
]

export function WhatsIncludedSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.querySelector("div")?.offsetWidth || 300
      const scrollAmount = direction === "left" ? -cardWidth - 24 : cardWidth + 24
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <section className="bg-[#F8F8F8] py-20 md:py-28 lg:py-32 overflow-hidden">
      {/* Title in standard container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-4xl md:text-5xl lg:text-6xl mb-16 md:mb-20 font-bold">
          <span className="bg-gradient-to-r from-zeal-purple via-zeal-pink to-zeal-orange bg-clip-text text-transparent">
            What's Included
          </span>
        </h2>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-zeal-black" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-zeal-black" />
          </button>

          <div className="relative">
            {/* Gradient fade overlay - positioned inside the clipped container */}
            <div
              className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 md:w-40 lg:w-48 z-10"
              style={{
                background: "linear-gradient(to right, transparent, #F8F8F8)",
              }}
            />

            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory pr-32 md:pr-40 lg:pr-48"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {inclusions.map((item, index) => (
                <div
                  key={index}
                  className="group relative shrink-0 w-[280px] sm:w-[300px] md:w-[320px] aspect-[3/4] rounded-2xl overflow-hidden snap-start"
                >
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={80}
                    loading="lazy"
                    sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 320px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zeal-black via-zeal-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl md:text-2xl text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/80 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-zeal-purple via-zeal-pink to-zeal-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
