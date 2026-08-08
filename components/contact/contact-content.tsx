"use client"

import { Mail, MapPin, Clock } from "lucide-react"
import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useFormspree } from "@/hooks/use-formspree"

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@zealtravel.co",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "London, UK",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "We typically respond within 24 hours",
  },
]

export function ContactContent() {
  const containerRef = useScrollReveal()
  const { status, handleSubmit } = useFormspree()

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-end bg-zeal-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-zeal-black/40 to-zeal-dark" />
        <div className="relative z-10 px-[5vw] pb-12 md:pb-16 max-w-[800px]">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-zeal-white leading-tight">
            Contact Us
          </h1>
          <p className="text-[0.95rem] text-white/50 leading-relaxed mt-4 max-w-[560px]">
            Questions, ideas, or just want to talk travel.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="bg-zeal-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1100px] px-[5vw]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            {/* Form */}
            <div className="reveal">
              <SectionTag>Send a Message</SectionTag>

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
                    <input type="hidden" name="_subject" value="Contact Form" />
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
                        className="w-full rounded-lg border border-black/10 bg-zeal-white px-4 py-3 text-[0.85rem] text-zeal-black placeholder:text-zeal-mid/50 focus:outline-none focus:border-zeal-accent transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-[0.8rem] font-medium text-zeal-black mb-1.5"
                      >
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full rounded-lg border border-black/10 bg-zeal-white px-4 py-3 text-[0.85rem] text-zeal-black focus:outline-none focus:border-zeal-accent transition-colors"
                      >
                        <option>General enquiry</option>
                        <option>Trip question</option>
                        <option>Topic suggestion</option>
                        <option>Press</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-[0.8rem] font-medium text-zeal-black mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full rounded-lg border border-black/10 bg-zeal-white px-4 py-3 text-[0.85rem] text-zeal-black placeholder:text-zeal-mid/50 focus:outline-none focus:border-zeal-accent transition-colors resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="self-start rounded-full bg-zeal-accent px-6 py-3 text-[0.85rem] font-semibold text-zeal-white tracking-wide transition-all hover:bg-zeal-accent-hover hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {status === "submitting" ? "Sending..." : "Send Message"}
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

            {/* Contact info */}
            <div className="reveal">
              <div className="lg:sticky lg:top-24 bg-zeal-white rounded-xl border border-black/[0.06] p-6">
                <h3 className="font-serif text-xl font-light text-zeal-black mb-6">
                  Direct Contact
                </h3>
                <div className="flex flex-col gap-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zeal-accent/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-4 h-4 text-zeal-accent" />
                      </div>
                      <div>
                        <p className="text-[0.75rem] font-semibold text-zeal-mid uppercase tracking-wide">
                          {info.label}
                        </p>
                        <p className="text-[0.85rem] text-zeal-black mt-0.5">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
