import type { Trip } from "./trips"
import { urlFor } from "./sanity/image"
import type { SanityTripSummary } from "./sanity/types"

// The shape a listing card actually needs — a subset of the static `Trip`
// type, so a Sanity trip doesn't need to fabricate fields (like
// longDescription) it doesn't have.
export interface ListingTrip {
  slug: string
  title: string
  location: string
  duration: string
  category: string
  status: string
  description: string
  image: string
}

export function staticTripToListingTrip(trip: Trip): ListingTrip {
  return {
    slug: trip.slug,
    title: trip.title,
    location: trip.location,
    duration: trip.duration,
    category: trip.category,
    status: trip.status,
    description: trip.description,
    image: trip.image,
  }
}

// Sanity trips don't carry the `internal.status` (live / coming soon) field
// on the frontend — it's deliberately never queried. A trip that's been
// fully entered and published in Sanity is, by this business's current
// process, exactly the kind of trip that's ready to feature — so it's
// shown the same way the static data shows its "Early Access" trips.
export function sanityTripToListingTrip(trip: SanityTripSummary): ListingTrip {
  const image =
    trip.heroMedia?.mediaType === "image" && trip.heroMedia.image
      ? urlFor(trip.heroMedia.image).width(900).height(1200).url()
      : "/images/trips-hero.jpg"

  const duration =
    trip.duration?.days && trip.duration?.nights
      ? `${trip.duration.days} days`
      : ""

  return {
    slug: trip.slug,
    title: trip.tripName,
    location: trip.country ?? "",
    duration,
    category: trip.category,
    status: "Early Access",
    description: trip.oneLineSummary ?? "",
    image,
  }
}
