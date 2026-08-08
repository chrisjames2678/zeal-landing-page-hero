export function Marquee() {
  const items = [
    "6-8 Day Immersions",
    "10-14 Per Group",
    "Expert-Led Experiences",
    "Topic-First Travel",
    "All Workshops & Activities Included",
    "Accommodation & Local Transport Included",
  ]

  const content = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span>{item}</span>
      <span className="text-zeal-accent text-[0.5rem]">{"\u25CF"}</span>
    </span>
  ))

  return (
    <section className="bg-zeal-dark py-4 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap gap-6">
        <div className="flex items-center gap-6 uppercase text-[0.75rem] tracking-[0.12em] font-medium text-white/40 shrink-0">
          {content}
        </div>
        <div className="flex items-center gap-6 uppercase text-[0.75rem] tracking-[0.12em] font-medium text-white/40 shrink-0">
          {content}
        </div>
      </div>
    </section>
  )
}
