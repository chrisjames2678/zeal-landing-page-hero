import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { trips, getTripBySlug } from "@/lib/trips"
import { TripDetail } from "@/components/trips/trip-detail"
import { SanityTripDetail } from "@/components/trips/sanity/sanity-trip-detail"
import { getSanityTripBySlug } from "@/lib/sanity/trips"

export function generateStaticParams() {
  // Static trip slugs are known ahead of time. Sanity-backed trip slugs
  // (like "colombia-coffee") aren't listed here — Next.js fetches those
  // on demand the first time someone visits, since dynamicParams defaults
  // to true. That also means an empty/unreachable Sanity dataset never
  // breaks the build.
  return trips.map((trip) => ({ slug: trip.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const sanityTrip = await getSanityTripBySlug(slug)
  if (sanityTrip) {
    return {
      title: sanityTrip.metaTitle || `${sanityTrip.tripName} — Zeal Travel`,
      description: sanityTrip.metaDescription || sanityTrip.oneLineSummary || undefined,
    }
  }

  const trip = getTripBySlug(slug)
  if (!trip) return { title: "Trip Not Found" }

  return {
    title: `${trip.title} — Zeal Travel`,
    description: trip.description,
  }
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Try Sanity first. If nothing's there, fall back to the older
  // hardcoded trips so the existing static pages keep working untouched.
  const sanityTrip = await getSanityTripBySlug(slug)
  if (sanityTrip) return <SanityTripDetail trip={sanityTrip} />

  const trip = getTripBySlug(slug)
  if (!trip) notFound()

  return <TripDetail trip={trip} />
}
