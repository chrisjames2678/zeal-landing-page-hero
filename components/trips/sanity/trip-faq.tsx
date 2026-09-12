import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { TripPortableText } from "./portable-text"
import type { SanityTrip } from "@/lib/sanity/types"

interface TripFaqProps {
  trip: SanityTrip
}

export function TripFaq({ trip }: TripFaqProps) {
  const faqs = trip.faq ?? []
  if (faqs.length === 0) return null

  return (
    <section id="faq" className="reveal mt-16 scroll-mt-24">
      <h2 className="font-serif text-[27px] font-medium text-zeal-black">
        FAQs
      </h2>
      <Accordion type="single" collapsible defaultValue="faq-0" className="mt-4">
        {faqs.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-black/[0.06]">
            <AccordionTrigger className="py-4 text-left text-[15.5px] font-semibold text-zeal-black hover:no-underline">
              <span className="flex flex-1 items-center gap-2.5">
                {item.question}
                {item.type === "trip-specific" && (
                  <span className="rounded-md bg-zeal-accent/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.04em] text-zeal-accent-hover">
                    Trip-specific
                  </span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <TripPortableText value={item.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
