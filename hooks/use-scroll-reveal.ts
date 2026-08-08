"use client"

import { useEffect, useRef } from "react"

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = el.querySelectorAll(".reveal")
    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  return ref
}
