import type { Image, PortableTextBlock } from "sanity"

export interface SanityMediaItem {
  mediaType: "image" | "video"
  image?: Image | null
  vimeoUrl?: string | null
  alt?: string | null
}

export interface SanityStop {
  name: string
  region?: string | null
  lat?: number | null
  lng?: number | null
}

export interface SanityExpert {
  name: string
  credentials?: string | null
}

export interface SanityMoneyAmount {
  amount?: number | null
  currency?: "GBP" | "USD" | "EUR" | null
}

export interface SanityDeparture {
  startDate?: string | null
  endDate?: string | null
}

export interface SanityOptionalExtra {
  name: string
  price?: string | null
}

export interface SanityItineraryDay {
  dayNumber: number
  title?: string | null
  whatHappens?: PortableTextBlock[] | null
  accommodation?: string | null
  meals?: string[] | null
  travelTime?: string | null
  inclusions?: string[] | null
  optionalExtras?: string[] | null
}

export interface SanityComparisonRow {
  typicalTour?: string | null
  zealTrip?: string | null
}

export interface SanityFaqItem {
  question: string
  answer?: PortableTextBlock[] | null
  type?: "standard" | "trip-specific" | null
}

export interface SanityGuestQuote {
  quote?: string | null
  name?: string | null
}

export interface SanityTrip {
  tripName: string
  subject: string
  category: string
  experienceTags?: string[] | null
  destination?: {
    country?: string | null
    stops?: SanityStop[] | null
    specificPlaces?: string[] | null
  } | null
  heroMedia?: SanityMediaItem | null
  gallery?: SanityMediaItem[] | null
  whyThisDestination?: PortableTextBlock[] | null
  oneLineSummary?: string | null
  slug: string
  whoYouLearnFrom?: SanityExpert[] | null
  privilegedAccess?: PortableTextBlock[] | null
  whatYouDo?: PortableTextBlock[] | null
  whatYoullLeaveAbleToDo?: string | null
  skillsAndTechniques?: string[] | null
  duration?: { days?: number | null; nights?: number | null } | null
  groupSize?: { min?: number | null; max?: number | null } | null
  whoItsFor?: string | null
  whoItsNotFor?: string | null
  physicalLevel?: "easy" | "moderate" | "challenging" | null
  accommodationComfort?: "basic" | "standard" | "upgraded" | null
  priceFrom?: SanityMoneyAmount | null
  singleSupplement?: SanityMoneyAmount | null
  departures?: SanityDeparture[] | null
  season?: string | null
  whyThisSeason?: string | null
  startPoint?: string | null
  endPoint?: string | null
  arrivalAirport?: string | null
  departureAirport?: string | null
  inclusions?: string[] | null
  exclusions?: string[] | null
  optionalExtras?: SanityOptionalExtra[] | null
  itinerary?: SanityItineraryDay[] | null
  tripHighlights?: string[] | null
  heroFeel?: string | null
  notableDataPoints?: string[] | null
  comparedTo?: string | null
  howThisCompares?: SanityComparisonRow[] | null
  faq?: SanityFaqItem[] | null
  overallRating?: number | null
  guestQuotes?: SanityGuestQuote[] | null
  metaTitle?: string | null
  metaDescription?: string | null
  lastReviewed?: string | null
}

export interface SanityTripSummary {
  tripName: string
  slug: string
  oneLineSummary?: string | null
  heroMedia?: SanityMediaItem | null
  category: string
  country?: string | null
  duration?: { days?: number | null; nights?: number | null } | null
}
