import Image from "next/image"
import { urlFor } from "@/lib/sanity/image"
import type { SanityMediaItem } from "@/lib/sanity/types"

// A vimeo "share" link looks like https://vimeo.com/123456789
// (sometimes https://vimeo.com/video/123456789). The embeddable player URL
// needs just the numeric ID: https://player.vimeo.com/video/123456789
function vimeoEmbedUrl(vimeoUrl: string): string | null {
  const match = vimeoUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? `https://player.vimeo.com/video/${match[1]}` : null
}

interface MediaItemProps {
  item: SanityMediaItem
  sizes?: string
  priority?: boolean
}

// Renders one mediaItem — either an uploaded image or a Vimeo embed.
// Expects its parent element to be `position: relative` with a defined
// size; this fills that space (matches how the hero/gallery boxes work).
export function MediaItem({ item, sizes, priority }: MediaItemProps) {
  if (item.mediaType === "video" && item.vimeoUrl) {
    const embedUrl = vimeoEmbedUrl(item.vimeoUrl)
    if (!embedUrl) return null
    return (
      <iframe
        src={embedUrl}
        title={item.alt || "Trip video"}
        allow="autoplay; fullscreen; picture-in-picture"
        className="absolute inset-0 h-full w-full border-0"
      />
    )
  }

  if (item.mediaType === "image" && item.image) {
    return (
      <Image
        src={urlFor(item.image).width(1600).url()}
        alt={item.alt || ""}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    )
  }

  return null
}
