// GROQ queries for the "trip" document type.
//
// HARD RULE, enforced by how these queries are written (not just a comment):
// every field below is named explicitly. Nothing under `internal` is ever
// listed, and `howThisCompares[]` only asks for `typicalTour` and `zealTrip`
// — never `aspect`. Because GROQ only returns fields you ask for by name,
// there is no way for those fields to leak into the response by accident.

// One trip, by its URL slug — everything the trip detail page needs.
export const tripBySlugQuery = `
*[_type == "trip" && slug.current == $slug][0]{
  tripName,
  subject,
  category,
  experienceTags,
  destination{
    country,
    stops[]{name, region, lat, lng},
    specificPlaces
  },
  heroMedia{mediaType, image, vimeoUrl, alt},
  gallery[]{mediaType, image, vimeoUrl, alt},
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
    optionalExtras
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
  lastReviewed
}
`

// All trips — just enough fields for a listing card (name, link, one-liner,
// hero image/video, category, plus country/duration for the card's
// "location · duration" line). Ordered by trip name.
export const allTripsQuery = `
*[_type == "trip" && defined(slug.current)] | order(tripName asc){
  tripName,
  "slug": slug.current,
  oneLineSummary,
  heroMedia{mediaType, image, vimeoUrl, alt},
  category,
  "country": destination.country,
  duration{days, nights}
}
`
