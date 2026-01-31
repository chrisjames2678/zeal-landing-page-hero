import Image from "next/image"

const features = [
  {
    title: "Beyond Sightseeing",
    description:
      "Our trips are based around themes, not destinations, such as food & drink, mind & body, or business & innovation.",
    image: "/images/cookingclass.jpg",
  },
  {
    title: "Full Immersion",
    description:
      "You live and breathe the topic throughout the trip. The itinerary and included activities are designed to gully immerse you in the world of your chosen topic.",
    image: "/images/full-immersion.jpg",
  },
  {
    title: "Like-Minded Company",
    description:
      "Small groups made up of people who share the same interest. Easy conversations, shared curiosity, and a natural sense of belonging.",
    image: "/images/like-minded.jpg",
  },
  {
    title: "Feed Your Curiosity",
    description:
      "Finally give time to the thing you've always wanted to understand. You return knowing more, seeing more, and feeling closer to the subject.",
    image: "/images/feed-curiosity.jpg",
  },
]

export function WhyZealSection() {
  return (
    <section className="bg-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="font-heading text-center text-4xl md:text-5xl lg:text-6xl mb-16 md:mb-20 font-bold">
          <span className="bg-gradient-to-r from-zeal-purple via-zeal-pink to-zeal-orange bg-clip-text text-transparent">
            Why Zeal?
          </span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group flex flex-col">
              {/* Image */}
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl mb-6">
                <Image
                  src={feature.image || "/placeholder.svg"}
                  alt={feature.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  quality={80}
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-zeal-purple/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Text content */}
              <h3 className="font-heading text-xl md:text-2xl text-zeal-black mb-3">{feature.title}</h3>
              <p className="text-sm md:text-base text-[#555555] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
