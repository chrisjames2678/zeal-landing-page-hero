import Link from "next/link"
import { TripHeroGallery } from "./trip-hero-gallery"
import type { SanityTrip } from "@/lib/sanity/types"

// Matches the schema's experienceTags option list (studio/schemaTypes/trip.ts)
// — Sanity stores the short `value`, this maps it back to the readable label.
const EXPERIENCE_TAG_LABELS: Record<string, string> = {
  immersive: "Immersive",
  "hands-on": "Hands-on / active",
  "expert-led": "Expert-led",
  "small-group": "Small-group",
  "privileged-access": "Behind-the-scenes / privileged access",
  "at-source": "At-source / origin",
  "skill-building": "Learning / skill-building",
}

interface TripHeroProps {
  trip: SanityTrip
}

export function TripHero({ trip }: TripHeroProps) {
  const country = trip.destination?.country

  return (
    <div className="hero-wrap mx-auto max-w-[1120px] px-[10px] min-[901px]:px-7">
      {/* Breadcrumbs */}
      <p className="mt-4 text-[13px] text-zeal-mid">
        <Link href="/" className="hover:text-zeal-accent-hover">
          Home
        </Link>
        <span className="mx-1.5">›</span>
        <Link href="/trips" className="hover:text-zeal-accent-hover">
          Destinations
        </Link>
        {country && (
          <>
            <span className="mx-1.5">›</span>
            <span>{country}</span>
          </>
        )}
      </p>

      {/* Photo grid — clicking any tile opens the full gallery lightbox */}
      <TripHeroGallery heroMedia={trip.heroMedia} gallery={trip.gallery} />

      {/* Title row */}
      <div className="mt-[26px] flex flex-wrap items-start justify-between gap-10">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-zeal-accent-hover">
            {[trip.category, trip.subject].filter(Boolean).join(" · ")}
          </p>
          <h1 className="mt-2 max-w-[640px] font-serif text-[32px] font-medium leading-[1.12] text-zeal-black min-[901px]:text-[42px]">
            {trip.tripName}
          </h1>
          {trip.oneLineSummary && (
            <p className="mt-4 max-w-[620px] text-[17px] leading-[1.55] text-zeal-mid">
              {trip.oneLineSummary}
            </p>
          )}
          {trip.experienceTags && trip.experienceTags.length > 0 && (
            <div className="mt-[14px] flex flex-wrap gap-2">
              {trip.experienceTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-black/[0.06] bg-zeal-accent/10 px-3 py-1.5 text-[11.5px] font-medium tracking-[0.03em] text-zeal-accent-hover"
                >
                  {EXPERIENCE_TAG_LABELS[tag] ?? tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
