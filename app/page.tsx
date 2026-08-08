import { Hero } from "@/components/home/hero"
import { Marquee } from "@/components/home/marquee"
import { HowItWorksSummary } from "@/components/home/how-it-works-summary"
import { TripsGrid } from "@/components/home/trips-grid"
import { WhyZeal } from "@/components/home/why-zeal"
import { WhatsIncluded } from "@/components/home/whats-included"
import { EarlyAccessCTA } from "@/components/home/early-access-cta"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <HowItWorksSummary />
      <TripsGrid />
      <WhyZeal />
      <WhatsIncluded />
      <EarlyAccessCTA />
    </>
  )
}
