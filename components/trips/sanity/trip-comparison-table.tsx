import type { SanityTrip } from "@/lib/sanity/types"

interface TripComparisonTableProps {
  trip: SanityTrip
}

// Below 640px this collapses from a table into stacked cards — each cell
// grows a small label (from its data-label attribute) above the value.
const cellBase =
  "border-b border-black/[0.06] py-3 px-4 align-top max-[639px]:block max-[639px]:border-none max-[639px]:p-0 max-[639px]:py-1.5 max-[639px]:before:block max-[639px]:before:text-[11px] max-[639px]:before:uppercase max-[639px]:before:tracking-[0.05em] max-[639px]:before:text-zeal-mid max-[639px]:before:content-[attr(data-label)]"

export function TripComparisonTable({ trip }: TripComparisonTableProps) {
  const rows = trip.howThisCompares ?? []
  if (rows.length === 0) return null

  return (
    <section className="reveal mt-16">
      <h2 className="font-serif text-[27px] font-medium text-zeal-black">
        How this compares
      </h2>
      {trip.comparedTo && (
        <p className="mb-6 mt-1.5 max-w-[640px] text-[15px] text-zeal-mid">
          Against {trip.comparedTo}.
        </p>
      )}

      <table className="w-full border-collapse text-[14.5px] max-[639px]:block">
        <thead className="max-[639px]:hidden">
          <tr>
            <th className="border-b border-zeal-black px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.05em] text-zeal-mid">
              Typical tour
            </th>
            <th className="border-b border-zeal-black px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.05em] text-zeal-mid">
              This Zeal trip
            </th>
          </tr>
        </thead>
        <tbody className="max-[639px]:block">
          {rows.map((row, i) => (
            <tr
              key={i}
              className="max-[639px]:mb-3 max-[639px]:block max-[639px]:rounded-[10px] max-[639px]:border max-[639px]:border-black/[0.06] max-[639px]:bg-zeal-white max-[639px]:p-4"
            >
              <td data-label="Typical tour" className={cellBase}>
                {row.typicalTour}
              </td>
              <td
                data-label="This Zeal trip"
                className={`${cellBase} font-medium text-zeal-accent-hover`}
              >
                {row.zealTrip}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
