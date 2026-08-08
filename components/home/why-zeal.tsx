"use client"

import Image from "next/image"
import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const reasons = [
  {
    title: "Topic-First",
    description:
      "Every trip starts with a subject, not a pin on a map. The destination is chosen because it's where the subject is done best.",
  },
  {
    title: "Expert Access",
    description:
      "Workshops with practitioners, time behind closed doors, conversations with the people who do this for a living.",
  },
  {
    title: "Like-Minded Groups",
    description:
      "10-14 people who share your curiosity. The conversation starts before the trip does.",
  },
  {
    title: "Real Outcomes",
    description:
      "You leave with vocabulary, literacy, and a point of view on the subject. Not just memories and a photo album.",
  },
]

export function WhyZeal() {
  const containerRef = useScrollReveal()

  return (
    <section className="bg-[#111] py-20 md:py-28" ref={containerRef}>
      <div className="mx-auto max-w-[1300px] px-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="reveal">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/images/why-zeal.jpg"
                alt="Travelers engaged in a hands-on workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="reveal">
            <SectionTag>Why Zeal</SectionTag>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-zeal-white mt-4 leading-tight text-balance">
              Not a tour. <em>An immersion.</em>
            </h2>

            <div className="mt-10 flex flex-col">
              {reasons.map((reason, i) => (
                <div
                  key={reason.title}
                  className={`py-5 ${
                    i !== reasons.length - 1
                      ? "border-b border-white/10"
                      : ""
                  }`}
                >
                  <h3 className="text-[0.95rem] font-semibold text-zeal-white mb-1.5">
                    {reason.title}
                  </h3>
                  <p className="text-[0.85rem] text-white/50 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
