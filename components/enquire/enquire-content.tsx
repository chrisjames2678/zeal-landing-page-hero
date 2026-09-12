"use client"

import { useSearchParams } from "next/navigation"
import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useFormspree } from "@/hooks/use-formspree"
import type { EnquireTrip } from "@/app/enquire/page"

interface EnquireContentProps {
  trips: EnquireTrip[]
}

export function EnquireContent({ trips }: EnquireContentProps) {
  const containerRef = useScrollReveal()
  const { status, handleSubmit } = useFormspree()
  const searchParams = useSearchParams()
  const preselectedSlug = searchParams.get("trip")

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-end bg-zeal-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-zeal-black/40 to-zeal-dark" />
        <div className="relative z-10 px-[5vw] pb-12 md:pb-16 max-w-[800px]">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-zeal-white leading-tight">
            Register Your Interest
          </h1>
          <p className="text-[0.95rem] text-white/50 leading-relaxed mt-4 max-w-[560px]">
            Tell us which trips you&rsquo;re interested in, and we&rsquo;ll be
            in touch.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="bg-zeal-cream py-16 md:py-24">
        <div className="mx-auto max-w-[640px] px-[5vw]">
          <div className="reveal">
            <SectionTag>Register Interest</SectionTag>

            {status === "success" ? (
              <p className="mt-6 text-[0.95rem] font-medium text-zeal-accent">
                {"Thanks! We'll be in touch."}
              </p>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit}
                  className="mt-6 flex flex-col gap-4"
                >
                  <input
                    type="hidden"
                    name="_subject"
                    value="Trip Interest Registration"
                  />

                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[0.8rem] font-medium text-zeal-black mb-1.5"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full rounded-lg border border-black/10 bg-zeal-white px-4 py-3 text-[0.85rem] text-zeal-black placeholder:text-zeal-mid/50 focus:outline-none focus:border-zeal-accent transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[0.8rem] font-medium text-zeal-black mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-black/10 bg-zeal-white px-4 py-3 text-[0.85rem] text-zeal-black placeholder:text-zeal-mid/50 focus:outline-none focus:border-zeal-accent transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <span className="block text-[0.8rem] font-medium text-zeal-black mb-1.5">
                      Which trips are you interested in?
                    </span>
                    <div className="flex flex-col gap-2">
                      {trips.map((trip) => (
                        <label
                          key={trip.slug}
                          className="flex items-center gap-2.5 rounded-lg border border-black/10 bg-zeal-white px-4 py-3 text-[0.85rem] text-zeal-black cursor-pointer hover:border-zeal-accent/40 transition-colors"
                        >
                          <input
                            type="checkbox"
                            name="trips"
                            value={trip.title}
                            defaultChecked={trip.slug === preselectedSlug}
                            className="h-4 w-4 rounded border-black/20 accent-zeal-accent"
                          />
                          {trip.title}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="self-start rounded-full bg-zeal-accent px-6 py-3 text-[0.85rem] font-semibold text-zeal-white tracking-wide transition-all hover:bg-zeal-accent-hover hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:pointer-events-none"
                  >
                    {status === "submitting" ? "Sending..." : "Submit"}
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
        </div>
      </section>
    </div>
  )
}
