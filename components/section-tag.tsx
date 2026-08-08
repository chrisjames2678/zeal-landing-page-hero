interface SectionTagProps {
  children: React.ReactNode
  light?: boolean
}

export function SectionTag({ children, light }: SectionTagProps) {
  return (
    <span
      className={`inline-flex items-center gap-3 text-[0.7rem] font-semibold uppercase tracking-[0.15em] ${
        light ? "text-zeal-accent" : "text-zeal-accent"
      }`}
    >
      <span className="inline-block w-8 h-px bg-zeal-accent" />
      {children}
    </span>
  )
}
