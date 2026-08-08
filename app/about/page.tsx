import type { Metadata } from "next"
import { AboutContent } from "@/components/about/about-content"

export const metadata: Metadata = {
  title: "About — Zeal Travel",
  description:
    "We believe the best travel starts with a reason. Learn about Zeal's mission and philosophy.",
}

export default function AboutPage() {
  return <AboutContent />
}
