"use client"

import Link from "next/link"
import Image from "next/image"
import type { ListingTrip } from "@/lib/trips-listing"

interface TripCardProps {
  trip: ListingTrip
}

export function TripCard({ trip }: TripCardProps) {
  return (
    <Link
      href={`/trips/${trip.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden rounded-xl"
    >
      <Image
        src={trip.image}
        alt={trip.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Category badge */}
      <div className="absolute top-4 left-4">
        <span className="inline-block rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-[0.7rem] font-semibold text-zeal-white tracking-wide">
          {trip.category}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Status badge */}
        <span
          className={`inline-block rounded-full px-3 py-1 text-[0.65rem] font-semibold tracking-wide mb-3 ${
            trip.status === "Early Access"
              ? "bg-zeal-accent text-zeal-white"
              : "bg-white/15 backdrop-blur-sm text-zeal-white"
          }`}
        >
          {trip.status}
        </span>

        <h3 className="font-serif text-xl font-light text-zeal-white mb-1">
          {trip.title}
        </h3>
        <p className="text-[0.8rem] text-white/60 mb-0">
          {trip.location} &middot; {trip.duration}
        </p>

        {/* Hover reveal description. Animates the grid row from 0fr to 1fr
            (rather than guessing a max-height in px) so it collapses to
            truly zero height at rest and always grows to fully reveal the
            complete text on hover, however long it is — no truncation,
            no risk of it overflowing the card either way. */}
        <div className="grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
          <p className="mt-3 overflow-hidden text-[0.8rem] text-white/50 leading-relaxed opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            {trip.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
