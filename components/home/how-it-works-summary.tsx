"use client"

import Link from "next/link"
import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const steps = [
  {
    num: "01",
    title: "Pick Your Topic",
    description:
      "Choose the subject that fascinates you — food, coffee, wellness, technology, wine, and more to come.",
  },
  {
    num: "02",
    title: "We Go to the Source",
    description:
      "The destination is chosen because it's where the topic is practised at its highest level. Naples for pizza. Colombia for coffee.",
  },
  {
    num: "03",
    title: "Total Immersion",
    description:
      "6-8 days of workshops, field visits, expert sessions, and hands-on experiences. You live and breathe the subject.",
  },
  {
    num: "04",
    title: "Return Changed",
    description:
      "You come back with new knowledge, real perspective, and connections that last. Not just photos.",
  },
]

export function HowItWorksSummary() {
  const containerRef = useScrollReveal()

  return (
    <section className="bg-zeal-cream py-20 md:py-28" ref={containerRef}>
      <div className="mx-auto max-w-[1300px] px-[5vw] md:px-[5vw]">
        {/* Intro */}
        <div className="text-center max-w-[700px] mx-auto mb-16 reveal">
          <SectionTag>How Zeal Works</SectionTag>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-[2.8rem] font-light text-zeal-black mt-4 leading-tight text-balance">
            Travel built around <em>what you love</em>
          </h2>
          <p className="text-[0.9rem] text-zeal-mid leading-relaxed mt-4">
            Every Zeal trip starts with a subject, not a destination. We find
            the place where your interest is practised at the highest level in
            the world — and build an immersive experience around it.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="reveal bg-zeal-white rounded-xl border border-black/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <span className="font-serif text-5xl font-light text-zeal-accent/20">
                {step.num}
              </span>
              <h3 className="font-sans text-base font-semibold text-zeal-black mt-3 mb-2">
                {step.title}
              </h3>
              <p className="text-[0.85rem] text-zeal-mid leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Link */}
        <div className="text-center mt-12 reveal">
          <Link
            href="/how-it-works"
            className="text-[0.85rem] font-medium text-zeal-accent hover:text-zeal-accent-hover transition-colors"
          >
            Learn more about how Zeal works &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
