"use client"

import Link from "next/link"
import { SectionTag } from "@/components/section-tag"

export function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-zeal-black">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <iframe
          src="https://player.vimeo.com/video/1153729244?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[56.25vw] min-h-screen min-w-[177.78vh]"
          allow="autoplay; fullscreen"
          title="Zeal Travel background video"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full px-[5vw] md:px-[5vw] pb-16 md:pb-20 max-w-[900px]">
        <SectionTag>Beyond Sightseeing</SectionTag>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-zeal-white mt-5 leading-[1.1] text-balance">
          Small group adventures for the{" "}
          <em>passionately curious</em>
        </h1>
        <p className="text-[0.95rem] md:text-base text-white/55 leading-relaxed mt-5 max-w-[580px]">
          Immersive trips built around a topic you care about. The destination is
          chosen because it{"'"}s where the subject lives at its highest level.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-8">
          <Link
            href="/#early-access"
            className="inline-flex items-center rounded-full bg-zeal-accent px-6 py-3 text-[0.85rem] font-semibold text-zeal-white tracking-wide transition-all hover:bg-zeal-accent-hover hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get Early Access &rarr;
          </Link>
          <Link
            href="/trips"
            className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-[0.85rem] font-medium text-zeal-white tracking-wide transition-all hover:border-white/60 hover:bg-white/5"
          >
            View Trips
          </Link>
        </div>
      </div>
    </section>
  )
}
