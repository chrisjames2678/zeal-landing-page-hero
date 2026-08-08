import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { trips, getTripBySlug } from "@/lib/trips"
import { TripDetail } from "@/components/trips/trip-detail"

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
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
  const trip = getTripBySlug(slug)
  if (!trip) notFound()

  return <TripDetail trip={trip} />
}
