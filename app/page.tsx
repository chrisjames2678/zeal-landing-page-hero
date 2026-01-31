import { HeroSection } from "@/components/hero-section"
import { WhyZealSection } from "@/components/why-zeal-section"
import { WhatsIncludedSection } from "@/components/whats-included-section"
import { TripsSection } from "@/components/trips-section"
import { SignupSection } from "@/components/signup-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhyZealSection />
      <WhatsIncludedSection />
      <TripsSection />
      <SignupSection />
      <Footer />
    </main>
  )
}
