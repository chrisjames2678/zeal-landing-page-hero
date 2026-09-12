import type { SanityTrip } from "./types"

// Shared "coming soon" logic for anything date/price related — per the
// standing rule: a published trip always renders, but unconfirmed pricing
// or dates show a plain "coming soon" state, never an error or a blank.

export function formatDepartureDate(dateStr: string): string {
  const date = new Date(`${dateStr}T00:00:00`)
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function getSeasonOrDatesDisplay(
  trip: Pick<SanityTrip, "departures" | "season">
): string {
  const firstConfirmed = (trip.departures ?? []).find((d) => d.startDate)
  if (firstConfirmed?.startDate) {
    const start = formatDepartureDate(firstConfirmed.startDate)
    const end = firstConfirmed.endDate
      ? formatDepartureDate(firstConfirmed.endDate)
      : null
    return end ? `${start} – ${end}` : start
  }
  if (trip.season) return trip.season
  return "Coming soon"
}

export function getPriceDisplay(
  trip: Pick<SanityTrip, "priceFrom">
): { amount: string; currency: string } | null {
  const amount = trip.priceFrom?.amount
  const currency = trip.priceFrom?.currency
  if (typeof amount !== "number" || !currency) return null
  const symbol = { GBP: "£", USD: "$", EUR: "€" }[currency] ?? ""
  return { amount: `${symbol}${amount.toLocaleString("en-US")}`, currency }
}
