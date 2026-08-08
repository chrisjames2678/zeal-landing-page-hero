"use client"

import Image from "next/image"
import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useFormspree } from "@/hooks/use-formspree"
import { Check } from "lucide-react"

const perks = ["Priority booking", "Launch pricing", "Shape future trips"]

export function EarlyAccessCTA() {
  const containerRef = useScrollReveal()
  const { status, handleSubmit } = useFormspree()

  return (
    <section id="early-access" className="relative py-20 md:py-28" ref={containerRef}>
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/cta-bg.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-zeal-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[640px] px-[5vw] text-center reveal">
        <SectionTag>Early Access</SectionTag>
        <h2 className="font-serif text-3xl md:text-4xl font-light text-zeal-white mt-4 leading-tight text-balance">
          Be first to <em>go deep</em>
        </h2>
        <p className="text-[0.9rem] text-white/55 leading-relaxed mt-4">
          Join Early Access for priority booking on our first departures,
          introductory pricing, and the chance to shape future trips.
        </p>

        {status === "success" ? (
          <p className="mt-8 text-[0.95rem] font-medium text-zeal-accent">
            {"Thanks! We'll be in touch."}
          </p>
        ) : (
          <>
            {/* Email form */}
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto"
            >
              <input type="hidden" name="_subject" value="Early Access Signup" />
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
                {status === "submitting" ? "Sending..." : "Join"}
              </button>
            </form>

            {status === "error" && (
              <p className="mt-3 text-[0.8rem] text-red-400">
                Something went wrong. Please try again.
              </p>
            )}
          </>
        )}

        {/* Perks */}
        <div className="flex flex-wrap justify-center gap-6 mt-6">
          {perks.map((perk) => (
            <span
              key={perk}
              className="flex items-center gap-2 text-[0.8rem] text-white/50"
            >
              <Check className="w-4 h-4 text-zeal-accent" />
              {perk}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
