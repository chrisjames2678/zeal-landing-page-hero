"use client"

import { Header } from "./header"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [opacity, setOpacity] = useState(1)

  useEffect(() => {
    // Load Vimeo Player API
    const script = document.createElement("script")
    script.src = "https://player.vimeo.com/api/player.js"
    script.async = true
    document.body.appendChild(script)

    script.onload = () => {
      if (iframeRef.current && window.Vimeo) {
        const player = new window.Vimeo.Player(iframeRef.current)

        player.on("timeupdate", (data: { seconds: number; duration: number }) => {
          const timeRemaining = data.duration - data.seconds
          if (timeRemaining <= 0.8) {
            setOpacity(timeRemaining / 0.8)
          } else if (data.seconds <= 0.5) {
            setOpacity(Math.min(1, data.seconds / 0.5 + 0.4))
          } else {
            setOpacity(1)
          }
        })
      }
    }

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 h-full w-full transition-opacity duration-200" style={{ opacity }}>
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1153729244?background=1&autoplay=1&loop=1&muted=1&quality=1080p"
          className="absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2"
          allow="autoplay; fullscreen"
          title="Background video"
        />
      </div>

      {/* Dark Gradient Overlay for legibility (per style guide: 35-50% opacity) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />

        {/* Hero Content */}
        <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
          <h1 className="font-heading text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Travel by Passion  
          </h1>
          <p className="mt-6 max-w-2xl text-white/90 font-medium text-3xl">
            Fully immersive small-group adventures, designed around a theme, topic, or interest          
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#963CFF] via-[#E840FF] to-[#FF6B2B] px-8 font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg text-xl"
            >
              Early Access
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-transparent px-8 font-medium text-white transition-all hover:bg-white/15 text-xl"
            >
              Browse Trips
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
