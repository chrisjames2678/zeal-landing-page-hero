"use client"

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { MediaItem } from "./media-item"
import type { SanityMediaItem } from "@/lib/sanity/types"

interface TripGalleryLightboxProps {
  items: SanityMediaItem[]
  open: boolean
  onOpenChange: (open: boolean) => void
  startIndex: number
}

// Controlled modal — the parent decides when it's open and which photo to
// start on (so several thumbnails can all open the same lightbox at their
// own index). `key={startIndex}` forces the carousel to remount with the
// right starting slide each time it's reopened at a different index.
export function TripGalleryLightbox({
  items,
  open,
  onOpenChange,
  startIndex,
}: TripGalleryLightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        overlayClassName="bg-black/95 backdrop-blur-md"
        className="max-w-[95vw] border-none bg-transparent p-0 shadow-none sm:max-w-[92vw] [&>button]:text-white [&>button]:opacity-80 [&>button]:hover:opacity-100"
      >
        <DialogTitle className="sr-only">Trip gallery</DialogTitle>
        <Carousel key={startIndex} opts={{ startIndex, loop: true }}>
          <CarouselContent className="ml-0">
            {items.map((item, i) => (
              <CarouselItem key={i} className="flex items-center justify-center pl-0">
                <div className="relative aspect-[4/3] max-h-[80vh] w-full max-w-[1000px]">
                  {/* All slides load immediately (not lazily) — otherwise
                      swiping to a not-yet-loaded slide briefly shows the
                      dimmed page behind the lightbox through the gap. */}
                  <MediaItem item={item} sizes="92vw" priority />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 border-none bg-white/90 sm:left-4" />
          <CarouselNext className="right-2 border-none bg-white/90 sm:right-4" />
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}
