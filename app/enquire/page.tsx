import type { Metadata } from "next"
import { Suspense } from "react"
import { EnquireContent } from "@/components/enquire/enquire-content"
import { trips as staticTrips } from "@/lib/trips"
import { getAllSanityTrips } from "@/lib/sanity/trips"

export const metadata: Metadata = {
  title: "Register Your Interest — Zeal Travel",
  description:
    "Tell us which trips you're interested in and we'll be in touch.",
}

export interface EnquireTrip {
  slug: string
  title: string
}

// Server component: combines Sanity trips with the still-static "coming
// soon" ones (same source the /trips listing uses) so this checklist always
// includes every trip being considered, not just the ones fully built out
// in Sanity yet — new trips need no changes here once they're in Sanity.
export default async function EnquirePage() {
  const sanityTrips = await getAllSanityTrips()

  const trips: EnquireTrip[] = [
    ...staticTrips.map((trip) => ({ slug: trip.slug, title: trip.title })),
    ...sanityTrips.map((trip) => ({ slug: trip.slug, title: trip.tripName })),
  ]

  return (
    <Suspense>
      <EnquireContent trips={trips} />
    </Suspense>
  )
}
