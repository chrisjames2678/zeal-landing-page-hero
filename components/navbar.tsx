"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { X, Menu } from "lucide-react"

const navLinks = [
  { href: "/trips", label: "Trips" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
]

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-zeal-black">
        <div className="mx-auto flex items-center justify-between px-[5vw] py-5">
          <Link
            href="/"
            className="font-serif text-4xl font-bold text-zeal-white tracking-tight"
          >
            Zeal
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[0.85rem] font-medium tracking-wide transition-colors ${
                  pathname === link.href
                    ? "text-zeal-white"
                    : "text-white/60 hover:text-zeal-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#early-access"
              className="inline-flex items-center rounded-full bg-zeal-accent px-5 py-2.5 text-[0.85rem] font-semibold text-zeal-white tracking-wide transition-all hover:bg-zeal-accent-hover hover:-translate-y-0.5 hover:shadow-lg"
            >
              Early Access
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-zeal-white"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-zeal-black transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between px-[6vw] py-5">
          <Link
            href="/"
            className="font-serif text-4xl font-bold text-zeal-white"
            onClick={() => setMobileOpen(false)}
          >
            Zeal
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-zeal-white"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col items-start px-[6vw] pt-12 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-[1.8rem] font-light text-zeal-white hover:text-zeal-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#early-access"
            onClick={() => setMobileOpen(false)}
            className="mt-8 inline-flex items-center rounded-full bg-zeal-accent px-6 py-3 text-[0.9rem] font-semibold text-zeal-white tracking-wide transition-all hover:bg-zeal-accent-hover"
          >
            Early Access
          </Link>
        </div>
      </div>
    </>
  )
}
