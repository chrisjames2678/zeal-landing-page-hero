import { sanityClient } from "./client"
import type { SanityTrip, SanityTripSlug } from "./types"

// `internal` is never selected here, and `aspect` is deliberately dropped from
// howThisCompares — both are internal-only per the schema, and the strongest
// guarantee they never leak to the frontend is to never query them at all.
const TRIP_BY_SLUG_QUERY = /* groq */ `
*[_type == "trip" && slug.current == $slug][0]{
  _id,
  tripName,
  subject,
  category,
  experienceTags,
  destination{
    country,
    stops[]{name, region, lat, lng},
    specificPlaces,
  },
  whyThisDestination,
  oneLineSummary,
  "slug": slug.current,

  whoYouLearnFrom[]{name, credentials},
  privilegedAccess,
  whatYouDo,
  whatYoullLeaveAbleToDo,
  skillsAndTechniques,

  duration{days, nights},
  groupSize{min, max},
  whoItsFor,
  whoItsNotFor,
  physicalLevel,
  accommodationComfort,
  priceFrom{amount, currency},
  singleSupplement{amount, currency},
  departures[]{startDate, endDate},
  season,
  whyThisSeason,
  startPoint,
  endPoint,
  arrivalAirport,
  departureAirport,
  inclusions,
  exclusions,
  optionalExtras[]{name, price},

  itinerary[]{
    dayNumber,
    title,
    whatHappens,
    accommodation,
    meals,
    travelTime,
    inclusions,
    optionalExtras,
  },

  tripHighlights,
  heroFeel,
  notableDataPoints,
  comparedTo,
  howThisCompares[]{typicalTour, zealTrip},

  faq[]{question, answer, type},

  overallRating,
  guestQuotes[]{quote, name},

  metaTitle,
  metaDescription,
  lastReviewed,
}
`

const TRIP_SLUGS_QUERY = /* groq */ `
*[_type == "trip" && defined(slug.current)]{
  "slug": slug.current
}
`

// Both helpers resolve to "nothing found" rather than throwing on failure —
// the trip detail route falls back to the static lib/trips.ts data source,
// and a Sanity outage shouldn't be able to take the page down.

export async function getSanityTripBySlug(slug: string): Promise<SanityTrip | null> {
  try {
    const trip = await sanityClient.fetch<SanityTrip | null>(
      TRIP_BY_SLUG_QUERY,
      { slug },
      { next: { revalidate: 3600 } },
    )
    return trip ?? null
  } catch (error) {
    console.error(`Failed to fetch Sanity trip for slug "${slug}":`, error)
    return null
  }
}

export async function getAllSanityTripSlugs(): Promise<string[]> {
  try {
    const slugs = await sanityClient.fetch<SanityTripSlug[]>(
      TRIP_SLUGS_QUERY,
      {},
      { next: { revalidate: 3600 } },
    )
    return slugs.map((s) => s.slug)
  } catch (error) {
    console.error("Failed to fetch Sanity trip slugs:", error)
    return []
  }
}
