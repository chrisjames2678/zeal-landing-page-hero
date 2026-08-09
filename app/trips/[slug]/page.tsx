import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { trips, getTripBySlug } from "@/lib/trips"
import { getAllSanityTripSlugs, getSanityTripBySlug } from "@/lib/sanity/queries"
import { TripDetail } from "@/components/trips/trip-detail"
import { TripDetailSanity } from "@/components/trips/trip-detail-sanity"

export async function generateStaticParams() {
  const sanitySlugs = await getAllSanityTripSlugs()
  const staticSlugs = trips.map((trip) => trip.slug)
  const slugs = new Set([...sanitySlugs, ...staticSlugs])
  return Array.from(slugs).map((slug) => ({ slug }))
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
      description: sanityTrip.metaDescription || sanityTrip.oneLineSummary,
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

  // Sanity first — falls back to the static lib/trips.ts entries so trips
  // that don't exist in Sanity yet (everything but Colombia Coffee, for now)
  // keep working exactly as before.
  const sanityTrip = await getSanityTripBySlug(slug)
  if (sanityTrip) {
    return <TripDetailSanity trip={sanityTrip} />
  }

  const trip = getTripBySlug(slug)
  if (!trip) notFound()

  return <TripDetail trip={trip} />
}
