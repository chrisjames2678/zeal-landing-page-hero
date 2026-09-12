import { PortableText, type PortableTextComponents } from "@portabletext/react"
import type { PortableTextBlock } from "sanity"

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-[14.5px] leading-[1.7] text-zeal-mid">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-1.5 pl-[18px] text-[14.5px] leading-[1.6] text-zeal-mid">
        {children}
      </ul>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-zeal-black">{children}</strong>
    ),
  },
}

interface TripPortableTextProps {
  value: PortableTextBlock[] | null | undefined
}

export function TripPortableText({ value }: TripPortableTextProps) {
  if (!value || value.length === 0) return null
  return (
    <div className="flex flex-col gap-3">
      <PortableText value={value} components={components} />
    </div>
  )
}

// Some fields (e.g. "what you do") were written as one semicolon-separated
// sentence rather than using Studio's bullet-list formatting. This renders
// real Studio bullet lists as-is, but auto-splits a plain semicolon-joined
// paragraph into a bullet list too — so the content doesn't need to be
// re-entered in Studio just to get bullets.
export function TripPortableTextAutoBullets({ value }: TripPortableTextProps) {
  if (!value || value.length === 0) return null

  const hasRealListFormatting = value.some(
    (block) => block._type === "block" && "listItem" in block && block.listItem
  )
  if (hasRealListFormatting) {
    return <TripPortableText value={value} />
  }

  const bullets = value.flatMap((block) => {
    if (block._type !== "block") return []
    const text = (block.children ?? [])
      .map((child) => ("text" in child ? child.text : ""))
      .join("")
    return text
      .split(";")
      .map((part) => part.trim().replace(/\.$/, ""))
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  })

  if (bullets.length <= 1) {
    return <TripPortableText value={value} />
  }

  return (
    <ul className="list-disc space-y-1.5 pl-[18px] text-[14.5px] leading-[1.6] text-zeal-mid">
      {bullets.map((bullet, i) => (
        <li key={i}>{bullet}</li>
      ))}
    </ul>
  )
}
