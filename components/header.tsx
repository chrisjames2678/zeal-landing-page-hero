"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative w-full">
      <div className="flex w-full items-center justify-between px-6 md:px-12 lg:px-16 py-0">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image 
            src="/images/zeal-logo.png" 
            alt="Zeal" 
            width={180} 
            height={60} 
            className="h-14 w-auto md:h-32" 
            priority
            quality={90}
          />
        </Link>

        <div className="flex items-center gap-6 md:gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:gap-8 lg:flex">
            <Link href="#how-it-works" className="font-medium text-white transition-opacity hover:opacity-80 text-lg">
              How it works
            </Link>
            <Link href="#trips" className="font-medium text-white transition-opacity hover:opacity-80 text-lg">
              Trips
            </Link>
            <Link href="#contact" className="font-medium text-white transition-opacity hover:opacity-80 text-lg">
              Contact us
            </Link>
          </nav>

          {/* CTA Buttons - Desktop */}
          <div className="hidden items-center gap-3 sm:flex">
            <Button
              variant="outline"
              className="border-2 border-white bg-transparent font-medium text-white transition-all hover:bg-white/15 text-lg"
            >
              Chat with us
            </Button>
            <Button className="bg-gradient-to-r from-[#963CFF] via-[#E840FF] to-[#FF6B2B] font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg text-lg">
              Early access
            </Button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center p-2 text-white lg:hidden"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute left-0 right-0 top-full z-50 bg-[#222222]/95 backdrop-blur-sm lg:hidden">
          <nav className="flex flex-col px-6 py-6">
            <Link
              href="#how-it-works"
              className="border-b border-white/10 py-4 font-medium text-white transition-opacity hover:opacity-80 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="#trips"
              className="border-b border-white/10 py-4 font-medium text-white transition-opacity hover:opacity-80 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Trips
            </Link>
            <Link
              href="#contact"
              className="border-b border-white/10 py-4 font-medium text-white transition-opacity hover:opacity-80 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact us
            </Link>

            {/* Mobile CTA Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full border-2 border-white bg-transparent font-medium text-white transition-all hover:bg-white/15 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Chat with us
              </Button>
              <Button
                className="w-full bg-gradient-to-r from-[#963CFF] via-[#E840FF] to-[#FF6B2B] font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Early access
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
