// Minimal local shape — avoids depending on @portabletext/types directly (it's
// only a transitive dep of @portabletext/react). The <PortableText> component
// is generic over its value type, so this structural shape is enough.
export interface PortableTextBlock {
  _type: string
  _key?: string
  [key: string]: unknown
}

export interface SanityStop {
  name?: string
  region?: string
  lat?: number
  lng?: number
}

export interface SanityExpert {
  name?: string
  credentials?: string
}

export interface SanityDeparture {
  startDate?: string
  endDate?: string
}

export interface SanityOptionalExtra {
  name?: string
  price?: string
}

export interface SanityItineraryDay {
  dayNumber: number
  title?: string
  whatHappens?: PortableTextBlock[]
  accommodation?: string
  meals?: string[]
  travelTime?: string
  inclusions?: string[]
  optionalExtras?: string[]
}

export interface SanityComparisonRow {
  typicalTour?: string
  zealTrip?: string
}

export interface SanityFaqItem {
  question?: string
  answer?: PortableTextBlock[]
  type?: "standard" | "trip-specific"
}

export interface SanityGuestQuote {
  quote?: string
  name?: string
}

export interface SanityTrip {
  _id: string
  tripName: string
  subject?: string
  category?: string
  experienceTags?: string[]
  destination?: {
    country?: string
    stops?: SanityStop[]
    specificPlaces?: string[]
  }
  whyThisDestination?: PortableTextBlock[]
  oneLineSummary?: string
  slug: string

  whoYouLearnFrom?: SanityExpert[]
  privilegedAccess?: PortableTextBlock[]
  whatYouDo?: PortableTextBlock[]
  whatYoullLeaveAbleToDo?: string
  skillsAndTechniques?: string[]

  duration?: { days?: number; nights?: number }
  groupSize?: { min?: number; max?: number }
  whoItsFor?: string
  whoItsNotFor?: string
  physicalLevel?: "easy" | "moderate" | "challenging"
  accommodationComfort?: "basic" | "standard" | "upgraded"
  priceFrom?: { amount?: number; currency?: string }
  singleSupplement?: { amount?: number; currency?: string }
  departures?: SanityDeparture[]
  season?: string
  whyThisSeason?: string
  startPoint?: string
  endPoint?: string
  arrivalAirport?: string
  departureAirport?: string
  inclusions?: string[]
  exclusions?: string[]
  optionalExtras?: SanityOptionalExtra[]

  itinerary?: SanityItineraryDay[]

  tripHighlights?: string[]
  heroFeel?: string
  notableDataPoints?: string[]
  comparedTo?: string
  // Note: `aspect` is deliberately excluded — never queried, never rendered.
  howThisCompares?: SanityComparisonRow[]

  faq?: SanityFaqItem[]

  overallRating?: number
  guestQuotes?: SanityGuestQuote[]

  metaTitle?: string
  metaDescription?: string
  lastReviewed?: string
}

export interface SanityTripSlug {
  slug: string
}
