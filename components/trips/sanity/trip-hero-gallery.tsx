"use client"

import { useState } from "react"
import { MediaItem } from "./media-item"
import { TripGalleryLightbox } from "./trip-gallery-lightbox"
import type { SanityMediaItem } from "@/lib/sanity/types"

interface TripHeroGalleryProps {
  heroMedia?: SanityMediaItem | null
  gallery?: SanityMediaItem[] | null
}

export function TripHeroGallery({ heroMedia, gallery }: TripHeroGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const allMedia = [heroMedia, ...(gallery ?? [])].filter(
    (item): item is SanityMediaItem => Boolean(item)
  )
  const galleryPreview = (gallery ?? []).slice(0, 2)
  const remainingCount = allMedia.length - 3

  return (
    <>
      <div className="mt-[18px] grid grid-cols-1 gap-[10px] min-[901px]:h-[420px] min-[901px]:grid-cols-[1.6fr_1fr]">
        <button
          type="button"
          onClick={() => allMedia.length > 0 && setLightboxIndex(0)}
          className="relative h-[170px] overflow-hidden rounded-[14px] bg-zeal-off-white text-left min-[901px]:h-full"
        >
          {heroMedia && (
            <MediaItem
              item={heroMedia}
              sizes="(min-width: 901px) 60vw, 100vw"
              priority
            />
          )}
        </button>
        <div className="grid grid-cols-2 gap-[10px] min-[901px]:grid-cols-1 min-[901px]:grid-rows-2">
          {galleryPreview.map((item, i) => {
            const mediaIndex = i + 1
            const isLastTile = i === galleryPreview.length - 1
            return (
              <button
                type="button"
                key={i}
                onClick={() => setLightboxIndex(mediaIndex)}
                className="relative h-[170px] overflow-hidden rounded-[14px] bg-zeal-off-white text-left min-[901px]:h-full"
              >
                <MediaItem item={item} sizes="(min-width: 901px) 30vw, 50vw" />
                {isLastTile && remainingCount > 0 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-[14px] font-semibold text-white">
                    +{remainingCount} more
                  </div>
                )}
              </button>
            )
          })}
        </div>
      </div>

      <TripGalleryLightbox
        items={allMedia}
        open={lightboxIndex !== null}
        onOpenChange={(open) => !open && setLightboxIndex(null)}
        startIndex={lightboxIndex ?? 0}
      />
    </>
  )
}
