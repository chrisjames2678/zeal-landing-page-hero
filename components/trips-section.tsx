"use client"

import Image from "next/image"

const trips = [
  {
    title: "Zeal: Pizza",
    location: "Naples, Italy",
    image: "/images/trip-pizza.jpg",
  },
  {
    title: "Zeal: Coffee",
    location: "Colombia",
    image: "/images/trip-coffee.jpg",
  },
  {
    title: "Zeal: Wellness",
    location: "Thailand",
    image: "/images/trip-wellness.jpg",
  },
  {
    title: "Zeal: Tech & Innovation",
    location: "Shenzhen, China",
    image: "/images/trip-tech.jpg",
  },
]

export function TripsSection() {
  return (
    <section id="trips" className="bg-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-center text-4xl md:text-5xl lg:text-6xl mb-4 font-bold bg-gradient-to-r from-zeal-purple via-zeal-pink to-zeal-orange bg-clip-text text-transparent">
          Trips
        </h2>
        <p className="text-center text-zeal-mid-grey text-lg md:text-xl mb-16 md:mb-20 max-w-2xl mx-auto font-sans">
          Ready to join one of our fully immersive small group adventures?
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trips.map((trip, index) => (
            <div
              key={index}
              className="group relative rounded-lg overflow-hidden cursor-pointer bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
            >
              {/* Background Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={trip.image || "/placeholder.svg"}
                  alt={trip.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  quality={80}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Content overlaid on image */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  {/* Location Tag */}
                  <span className="text-white/80 text-sm font-sans mb-1 tracking-wide uppercase">{trip.location}</span>

                  {/* Title */}
                  <h3 className="font-heading text-xl md:text-2xl text-white font-bold">{trip.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
