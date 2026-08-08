"use client"

import Image from "next/image"
import { SectionTag } from "@/components/section-tag"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const conceptBlocks = [
  {
    tag: "The Concept",
    title: "Topic-First Travel",
    body: "Most travel companies start with a destination and bolt on activities. Zeal works the other way around. We start with a subject — pizza, coffee, wellness, technology — and then choose the destination based on where that subject is done at the highest level in the world. Naples wasn't chosen because it's a beautiful Italian city (although it is). It was chosen because it's where pizza was invented and where it's still made with more craft, tradition, and care than anywhere else. This changes everything about how the trip is designed, who leads it, and what you experience.",
    image: "/images/topic-first.jpg",
    imageAlt: "Artisan hands working with fresh dough",
    imageLeft: true,
  },
  {
    tag: "The Experience",
    title: "Structured Immersion",
    body: "A Zeal trip isn't a highlight reel. It's a structured, progressive experience designed to build genuine understanding over 6-8 days. Each day has a focus. Workshops with real practitioners. Field visits to producers and makers. Tastings, sessions, and conversations that build on each other. By the end, you don't just have memories — you have a vocabulary, a framework, and a perspective you didn't have before. Think of it less like a holiday and more like the best week of learning you've ever had — in the most incredible setting.",
    image: "/images/structured-immersion.jpg",
    imageAlt: "Travelers in a coffee roastery",
    imageLeft: false,
  },
  {
    tag: "The People",
    title: "Small Groups, Shared Curiosity",
    body: "Every Zeal trip runs with 10-14 guests. Small enough that everyone knows each other by name. Large enough for varied conversation. And because everyone on the trip chose the same subject, there's an immediate, natural connection. You're not making small talk with strangers about where you're from. You're debating dough hydration, or comparing single-origin roast profiles, or geeking out about hardware supply chains. The group chemistry happens automatically because the interest is shared from the start.",
    image: "/images/small-groups.jpg",
    imageAlt: "Small group of travelers sharing a meal together",
    imageLeft: true,
  },
]

const faqs = [
  {
    q: "Is this a tour?",
    a: "Not in the traditional sense. Zeal trips are immersive experiences built around a specific subject. There's a structured itinerary with workshops, field visits, and expert sessions — but the goal is understanding and depth, not ticking off sights.",
  },
  {
    q: "Do I need experience in the topic?",
    a: "No. Our trips are designed for curious people, not experts. You don't need to know how to make pizza or grow coffee. You just need to be genuinely interested in going deep.",
  },
  {
    q: "What's the group size?",
    a: "10 to 14 people per trip. Small enough to be personal, large enough for variety.",
  },
  {
    q: "What's the age range?",
    a: "Most of our guests are between 35 and 50, but there's no age restriction. The common thread is curiosity, not demographics.",
  },
  {
    q: "Are flights included?",
    a: "No. You book your own flights. We provide detailed arrival and departure guidance so you know exactly where to be and when.",
  },
  {
    q: "What's not included?",
    a: "Flights, travel insurance, personal expenses, and any meals or activities not specified in the itinerary. Everything else is covered.",
  },
  {
    q: "Can I come solo?",
    a: "Absolutely. Many of our guests travel solo. The small group format and shared interest make it easy to connect.",
  },
  {
    q: "What about dietary requirements?",
    a: "We accommodate all dietary needs. Let us know when you sign up and we'll make sure everything is sorted.",
  },
  {
    q: "How fit do I need to be?",
    a: "Our trips don't require special fitness. There may be walking, standing in workshops, or early mornings, but nothing physically demanding unless the trip is specifically active (like Surf).",
  },
  {
    q: "What's Early Access?",
    a: "Early Access gives you priority booking on our first departures, introductory pricing, and the opportunity to give feedback that shapes future trips.",
  },
]

export function HowItWorksContent() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] flex items-end bg-zeal-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-zeal-black/40 to-zeal-dark" />
        <div className="relative z-10 px-[5vw] pb-12 md:pb-16 max-w-[800px]">
          <h1 className="font-serif text-4xl md:text-5xl font-light text-zeal-white leading-tight">
            How Zeal Works
          </h1>
          <p className="text-[0.95rem] text-white/50 leading-relaxed mt-4 max-w-[560px]">
            We don{"'"}t start with a destination. We start with a subject.
          </p>
        </div>
      </section>

      {/* Concept blocks */}
      <section className="bg-zeal-cream py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-[5vw]">
          <div className="flex flex-col gap-20 md:gap-28">
            {conceptBlocks.map((block, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center reveal ${
                  block.imageLeft ? "" : "lg:[&>*:first-child]:order-2"
                }`}
                style={{ transitionDelay: `${i * 0.15}s` }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                  <Image
                    src={block.image}
                    alt={block.imageAlt}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text */}
                <div>
                  <SectionTag>{block.tag}</SectionTag>
                  <h2 className="font-serif text-2xl md:text-3xl font-light text-zeal-black mt-4 leading-tight">
                    {block.title}
                  </h2>
                  <p className="text-[0.9rem] text-zeal-mid leading-[1.7] mt-5">
                    {block.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-zeal-dark py-16 md:py-24">
        <div className="mx-auto max-w-[800px] px-[5vw]">
          <div className="text-center mb-12 reveal">
            <SectionTag>FAQ</SectionTag>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-zeal-white mt-4 leading-tight">
              Common questions
            </h2>
          </div>

          <Accordion type="single" collapsible className="reveal">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border-white/10"
              >
                <AccordionTrigger className="text-left py-5 hover:no-underline group">
                  <span className="font-sans text-[0.95rem] font-medium text-zeal-white group-hover:text-zeal-accent transition-colors">
                    {faq.q}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="text-[0.85rem] text-white/50 leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  )
}
