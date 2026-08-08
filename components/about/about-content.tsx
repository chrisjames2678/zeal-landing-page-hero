"use client"

import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useFormspree } from "@/hooks/use-formspree"

const principles = [
  {
    title: "Depth Over Breadth",
    description:
      "One subject, done properly, is worth more than ten things done superficially.",
  },
  {
    title: "Access Over Luxury",
    description:
      "The best experiences come from getting behind the scenes, not from thread counts.",
  },
  {
    title: "Curiosity Is the Point",
    description:
      "We exist for people who want to understand things, not just see them.",
  },
]

export function AboutContent() {
  const containerRef = useScrollReveal()
  const { status, handleSubmit } = useFormspree()

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-end bg-zeal-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-zeal-black/40 to-zeal-dark" />
        <div className="relative z-10 px-[5vw] pb-12 md:pb-16 max-w-[800px]">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-zeal-white leading-tight">
            About Zeal
          </h1>
          <p className="text-[0.95rem] text-white/50 leading-relaxed mt-4 max-w-[560px]">
            We believe the best travel starts with a reason.
          </p>
        </div>
      </section>

      {/* The Story */}
      <section className="bg-zeal-cream py-16 md:py-24">
        <div className="mx-auto max-w-[700px] px-[5vw]">
          <div className="reveal">
            <SectionTag>Our Story</SectionTag>
            <div className="mt-6 flex flex-col gap-5">
              <p className="text-[0.9rem] text-zeal-mid leading-[1.7]">
                Zeal was born from a simple observation: the most meaningful
                travel experiences aren{"'"}t about where you go — they{"'"}re about
                why you go.
              </p>
              <p className="text-[0.9rem] text-zeal-mid leading-[1.7]">
                We noticed that the best trips we{"'"}d ever taken had one thing in
                common. They were built around a genuine interest. A week
                learning to make pasta from the people who invented it. A few
                days on a coffee farm understanding how the thing you drink every
                morning actually gets made. These weren{"'"}t holidays in the
                traditional sense. They were immersions — and they changed how we
                saw the world.
              </p>
              <p className="text-[0.9rem] text-zeal-mid leading-[1.7]">
                So we built a company around that idea. Zeal designs small-group
                travel experiences that start with a topic, not a destination.
                The destination is chosen because it{"'"}s where the subject lives
                at its highest level. And every trip is structured to build real
                understanding — through workshops, field visits, expert access,
                and time spent with the people who do this for a living.
              </p>
              <p className="text-[0.9rem] text-zeal-mid leading-[1.7]">
                We{"'"}re not trying to replace holidays. We{"'"}re building something
                for the moments when you want more than sightseeing. When you
                want to go deep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe */}
      <section className="bg-zeal-cream py-4 md:py-8">
        <div className="mx-auto max-w-[1100px] px-[5vw] pb-16 md:pb-24">
          <div className="text-center mb-12 reveal">
            <SectionTag>What We Believe</SectionTag>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-zeal-black mt-4 leading-tight text-balance">
              Our principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="reveal bg-zeal-white rounded-xl border border-black/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <h3 className="font-serif text-xl font-light text-zeal-black mb-3">
                  {p.title}
                </h3>
                <p className="text-[0.85rem] text-zeal-mid leading-relaxed">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-zeal-dark py-16 md:py-24">
        <div className="mx-auto max-w-[700px] px-[5vw] text-center reveal">
          <SectionTag>Say Hello</SectionTag>
          <h2 className="font-serif text-3xl md:text-4xl font-light text-zeal-white mt-4 leading-tight">
            Get in touch
          </h2>
          <p className="text-[0.9rem] text-white/50 leading-relaxed mt-4">
            Whether you have a question about a specific trip, want to suggest a
            topic, or just want to say hello — we{"'"}d love to hear from you.
          </p>
          <p className="text-[0.9rem] text-zeal-accent mt-4">
            hello@zealtravel.co
          </p>

          {status === "success" ? (
            <p className="mt-8 text-[0.95rem] font-medium text-zeal-accent">
              {"Thanks! We'll be in touch."}
            </p>
          ) : (
            <>
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-4 max-w-[500px] mx-auto text-left"
              >
                <input type="hidden" name="_subject" value="Contact Form" />
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-[0.85rem] text-zeal-white placeholder:text-white/30 focus:outline-none focus:border-zeal-accent transition-colors"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-[0.85rem] text-zeal-white placeholder:text-white/30 focus:outline-none focus:border-zeal-accent transition-colors"
                  required
                />
                <textarea
                  rows={5}
                  name="message"
                  placeholder="Message"
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-[0.85rem] text-zeal-white placeholder:text-white/30 focus:outline-none focus:border-zeal-accent transition-colors resize-none"
                />
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
      </section>
    </div>
  )
}
