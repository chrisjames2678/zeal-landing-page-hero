import type { Metadata } from "next"
import { TripsContent } from "@/components/trips/trips-content"

export const metadata: Metadata = {
  title: "All Trips — Zeal Travel",
  description:
    "Browse immersive small-group adventures across food, wellness, technology, and more.",
}

export default function TripsPage() {
  return <TripsContent />
}
