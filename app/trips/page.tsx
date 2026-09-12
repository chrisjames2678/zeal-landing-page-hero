import type { Metadata } from "next"
import { TripsContent } from "@/components/trips/trips-content"
import { trips as staticTrips } from "@/lib/trips"
import {
  staticTripToListingTrip,
  sanityTripToListingTrip,
} from "@/lib/trips-listing"
import { getAllSanityTrips } from "@/lib/sanity/trips"

export const metadata: Metadata = {
  title: "All Trips — Zeal Travel",
  description:
    "Browse immersive small-group adventures across food, wellness, technology, and more.",
}

// Server component: fetches Sanity trips at request/build time so they're
// present in the initial HTML (same server-rendered approach as the trip
// detail page), then hands the combined list to the client-side filter UI.
export default async function TripsPage() {
  const sanityTrips = await getAllSanityTrips()

  const trips = [
    ...staticTrips.map(staticTripToListingTrip),
    ...sanityTrips.map(sanityTripToListingTrip),
  ]

  return <TripsContent trips={trips} />
}
