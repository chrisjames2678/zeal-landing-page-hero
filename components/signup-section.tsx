"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

export function SignupSection() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const benefits = [
    "Experience a Zeal trip at a significant discount",
    "Have the opportunity to shape future experiences",
    "Offer feedback and receive discounts on future travel",
  ]

  return (
    <section className="bg-[#2D3E50] py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-white">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Sign up and join one of our pilot experiences
            </h2>

            <p className="text-white/80 text-lg mb-6">Subscribe and be eligible to join one of our first departures:</p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-r from-[#963CFF] to-[#E840FF] flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-white" />
                  </span>
                  <span className="text-white/90">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Sign Up Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#963CFF] via-[#E840FF] to-[#FF6B2B] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
                <p className="text-white/50 text-sm">
                  By signing up you agree to our Terms and Conditions & Privacy Policy.
                </p>
              </form>
            ) : (
              <div className="bg-white/10 border border-white/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#963CFF] to-[#E840FF] flex items-center justify-center">
                    <Check className="w-5 h-5 text-white" />
                  </span>
                  <span className="text-white font-semibold text-lg">You&apos;re on the list!</span>
                </div>
                <p className="text-white/80">
                  Thanks for signing up. We&apos;ll be in touch soon with details about our pilot experiences.
                </p>
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/signup-hero.jpg"
                alt="Group of travelers enjoying an immersive experience together"
                fill
                className="object-cover"
                quality={85}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
