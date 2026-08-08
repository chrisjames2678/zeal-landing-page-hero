"use client"

import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const inclusions = [
  {
    title: "Workshops & Experiences",
    description:
      "All structured sessions, tastings, field visits, and hands-on activities included in the itinerary.",
  },
  {
    title: "Accommodation",
    description:
      "Comfort-focused, well-located places chosen for quality and character. Not hostels, not flashy resorts.",
  },
  {
    title: "Local Transport",
    description:
      "All transport between scheduled locations during the trip. You don't need to figure anything out.",
  },
  {
    title: "Trip Leader",
    description:
      "A dedicated host who manages logistics, keeps things moving, and adds context throughout.",
  },
  {
    title: "Additional Adventures",
    description:
      "Extra activities tied to the theme and destination, woven into the itinerary for texture and variety.",
  },
  {
    title: "24/7 Support",
    description:
      "Clear communication before arrival and round-the-clock support while you're on the ground.",
  },
]

export function WhatsIncluded() {
  const containerRef = useScrollReveal()

  return (
    <section className="bg-zeal-cream py-20 md:py-28" ref={containerRef}>
      <div className="mx-auto max-w-[1300px] px-[5vw]">
        {/* Intro */}
        <div className="text-center max-w-[700px] mx-auto mb-16 reveal">
          <SectionTag>{"What's Included"}</SectionTag>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.8rem] font-light text-zeal-black mt-4 leading-tight text-balance">
            Everything you need, <em>nothing you don{"'"}t</em>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inclusions.map((item, i) => (
            <div
              key={item.title}
              className="reveal bg-zeal-white rounded-xl border border-black/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="w-10 h-10 rounded-lg bg-zeal-accent/10 flex items-center justify-center mb-4">
                <span className="text-zeal-accent text-sm font-bold">
                  {"\u25C6"}
                </span>
              </div>
              <h3 className="text-[0.95rem] font-semibold text-zeal-black mb-2">
                {item.title}
              </h3>
              <p className="text-[0.85rem] text-zeal-mid leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
