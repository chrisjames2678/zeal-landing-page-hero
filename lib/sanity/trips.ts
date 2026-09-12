import { sanityClient } from "./client"
import { tripBySlugQuery, allTripsQuery } from "./queries"
import type { SanityTrip, SanityTripSummary } from "./types"

// Fetches one trip by slug. Returns null (never throws) if the trip doesn't
// exist or Sanity is unreachable, so callers can safely fall back to
// "not found" or to the older static trip data.
export async function getSanityTripBySlug(slug: string): Promise<SanityTrip | null> {
  try {
    const trip = await sanityClient.fetch<SanityTrip | null>(
      tripBySlugQuery,
      { slug },
      { next: { revalidate: 60 } }
    )
    return trip ?? null
  } catch (err) {
    console.error("Sanity fetch failed for trip slug:", slug, err)
    return null
  }
}

// Fetches all trips for the listing page. Returns an empty list (never
// throws) on any error.
export async function getAllSanityTrips(): Promise<SanityTripSummary[]> {
  try {
    const trips = await sanityClient.fetch<SanityTripSummary[]>(
      allTripsQuery,
      {},
      { next: { revalidate: 60 } }
    )
    return trips ?? []
  } catch (err) {
    console.error("Sanity fetch failed for all trips:", err)
    return []
  }
}
