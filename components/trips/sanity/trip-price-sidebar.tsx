import Link from "next/link"
import { getPriceDisplay, getSeasonOrDatesDisplay } from "@/lib/sanity/trip-display"
import type { SanityTrip } from "@/lib/sanity/types"

interface TripPriceSidebarProps {
  trip: SanityTrip
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function FactRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between text-[14px] text-zeal-mid">
      <span>{label}</span>
      <b className="font-medium text-zeal-black">{value}</b>
    </div>
  )
}

export function TripPriceSidebar({ trip }: TripPriceSidebarProps) {
  const price = getPriceDisplay(trip)
  const days = trip.duration?.days
  const nights = trip.duration?.nights
  const groupSize =
    trip.groupSize?.min && trip.groupSize?.max
      ? `${trip.groupSize.min}–${trip.groupSize.max} guests`
      : null

  return (
    <div className="reveal rounded-[14px] border border-black/[0.06] bg-zeal-white p-6">
      {days && (
        <div className="mb-0.5 text-[13px] text-zeal-mid">{days} days from</div>
      )}
      {price ? (
        <div className="font-serif text-[32px] font-medium text-zeal-black">
          {price.amount}
          <sup className="ml-0.5 text-[14px] font-medium text-zeal-mid">pp</sup>
        </div>
      ) : (
        <div className="font-serif text-[22px] font-medium text-zeal-mid">
          Price coming soon
        </div>
      )}

      {(days || nights || groupSize || trip.physicalLevel) && (
        <div className="my-[18px] flex flex-col gap-2.5 border-y border-black/[0.06] py-4">
          {days && nights && (
            <FactRow label="Duration" value={`${days} days / ${nights} nights`} />
          )}
          {groupSize && <FactRow label="Group size" value={groupSize} />}
          {trip.physicalLevel && (
            <FactRow label="Pace" value={capitalize(trip.physicalLevel)} />
          )}
          <FactRow label="Next departure" value={getSeasonOrDatesDisplay(trip)} />
        </div>
      )}

      <Link
        href={`/enquire?trip=${trip.slug}`}
        className="block rounded-[9px] bg-zeal-accent px-[18px] py-3.5 text-center text-[15px] font-bold text-zeal-white transition-colors hover:bg-zeal-accent-hover"
      >
        Enquire about this trip
      </Link>
      {trip.faq && trip.faq.length > 0 && (
        <Link
          href="#faq"
          className="mt-2.5 block rounded-[9px] border border-black/[0.06] px-[18px] py-[11px] text-center text-[14px] font-medium text-zeal-black"
        >
          Read the FAQs
        </Link>
      )}
    </div>
  )
}
