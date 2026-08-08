import type { Metadata } from "next"
import { HowItWorksContent } from "@/components/how-it-works/how-it-works-content"

export const metadata: Metadata = {
  title: "How It Works — Zeal Travel",
  description:
    "We don't start with a destination. We start with a subject. Learn how Zeal designs immersive travel experiences.",
}

export default function HowItWorksPage() {
  return <HowItWorksContent />
}
