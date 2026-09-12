export interface Trip {
  slug: string
  title: string
  location: string
  duration: string
  category: string
  status: "Early Access" | "Coming 2027"
  description: string
  longDescription: string
  image: string
  itinerary?: { day: string; title: string; description: string }[]
}

export const trips: Trip[] = [
  {
    slug: "pizza",
    title: "Zeal: Pizza",
    location: "Naples, Italy",
    duration: "7 days",
    category: "Food & Craft",
    status: "Early Access",
    description:
      "From dough to oven to the culture behind the craft. Learn from the pizzaioli who've been doing this for generations.",
    longDescription: `Naples is where pizza was born — and where it's still made with more passion, precision, and tradition than anywhere else on earth. This isn't a cooking class holiday. It's a full immersion into the craft, culture, and community behind Neapolitan pizza.

Over seven days, you'll work alongside master pizzaioli in century-old pizzerias, visit the flour mills and mozzarella producers who supply them, and understand why the simplest food in the world is also one of the hardest to get right. You'll eat pizza that most tourists never find, learn the science behind dough fermentation, and see firsthand how Naples' history, geography, and identity are baked into every single pie.

You'll return home not just knowing how to make better pizza — but understanding why it matters.`,
    image: "/images/trips/pizza.jpg",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Welcome",
        description:
          "Settle into Naples. Evening walk through the historic centre. Welcome dinner at a traditional trattoria. Group introductions.",
      },
      {
        day: "Day 2",
        title: "The Dough",
        description:
          "Morning workshop on dough preparation and fermentation science. Visit a local flour mill. Afternoon pizza tasting across three historic pizzerias.",
      },
      {
        day: "Day 3",
        title: "The Ingredients",
        description:
          "Visit a mozzarella di bufala producer outside Naples. Tomato San Marzano farms. Lunch with a local family.",
      },
      {
        day: "Day 4",
        title: "The Craft",
        description:
          "Full-day workshop in a working pizzeria. Learn technique from a master pizzaiolo. Make and bake your own Neapolitan pizza.",
      },
      {
        day: "Day 5",
        title: "The Culture",
        description:
          "Explore Naples' food markets and street food scene. Visit Spaccanapoli. Evening cooking session with a local chef (not pizza — broader Neapolitan cuisine).",
      },
      {
        day: "Day 6",
        title: "The Coast",
        description:
          "Day trip to the Amalfi Coast. Lunch at a cliffside restaurant. Free afternoon to explore.",
      },
      {
        day: "Day 7",
        title: "Farewell",
        description:
          "Morning recap session and Q&A. Final group lunch. Departures.",
      },
    ],
  },
  {
    slug: "wellness",
    title: "Zeal: Wellness",
    location: "Thailand",
    duration: "7 days",
    category: "Mind & Body",
    status: "Coming 2027",
    description:
      "Beyond the spa. A structured journey into movement, breath, and ancient practice with real practitioners.",
    longDescription: `Thailand has been a centre for healing, movement, and spiritual practice for centuries. This trip goes beyond the surface of wellness tourism to explore the real traditions — and the modern practitioners keeping them alive.

Over seven days, you'll train with Muay Thai coaches, learn from traditional Thai medicine practitioners, practice breathwork and meditation with lineage holders, and experience the intersection of ancient knowledge and contemporary wellness science. This is structured, progressive, and physical — not a spa holiday.

You'll return with a genuine understanding of practices that most people only experience in diluted, commercialised form.`,
    image: "/images/trips/wellness.jpg",
  },
  {
    slug: "tech",
    title: "Zeal: Tech & Innovation",
    location: "Shenzhen, China",
    duration: "6 days",
    category: "Business & Innovation",
    status: "Coming 2027",
    description:
      "Inside the world's hardware capital. Maker spaces, factory floors, and the founders building the future.",
    longDescription: `Shenzhen went from a fishing village to the world's hardware capital in four decades. It's where ideas become physical products faster than anywhere else on earth. This trip takes you inside that ecosystem.

Over six days, you'll visit maker spaces where prototypes are built in hours, tour factory floors where consumer electronics are assembled at scale, meet the founders of hardware startups, and understand the supply chain dynamics that make Shenzhen unique. You'll see the Huaqiangbei electronics markets, visit innovation labs, and hear directly from the engineers and entrepreneurs driving China's tech future.

You'll return with a completely new perspective on how the physical world of technology actually works.`,
    image: "/images/trips/tech.jpg",
  },
  {
    slug: "wine",
    title: "Zeal: Wine",
    location: "Destination TBA",
    duration: "7 days",
    category: "Food & Craft",
    status: "Coming 2027",
    description:
      "Terroir, technique, and taste. Go deep into winemaking with the people who shape every bottle.",
    longDescription: `Great wine is the product of soil, climate, time, and human decisions made across generations. This trip takes you inside the winemaking process — from vine to bottle — in one of the world's most celebrated wine regions.

Over seven days, you'll walk vineyards with the people who tend them, learn the science of fermentation and ageing, taste wines guided by sommeliers, and understand why terroir matters more than marketing. You'll visit estates that don't open to the public, meet winemakers who've dedicated their lives to a single varietal, and develop a vocabulary that transforms how you taste.

Destination and dates to be announced. Register your interest to be notified first.`,
    image: "/images/trips/wine.jpg",
  },
  {
    slug: "surf",
    title: "Zeal: Surf",
    location: "Destination TBA",
    duration: "7 days",
    category: "Active & Outdoors",
    status: "Coming 2027",
    description:
      "Ocean culture, wave science, and board shaping. For those who want to understand surfing, not just try it.",
    longDescription: `Surfing is more than a sport. It's oceanography, board design, coastal culture, and a way of reading the natural world. This trip takes you inside all of it.

Over seven days, you'll learn to read swells, understand wave mechanics, shape a board with a master shaper, surf with experienced local guides, and explore the coastal culture and community that grows up around great breaks. Whether you're a beginner or intermediate, the focus is on understanding surfing as a discipline and a culture — not just catching waves.

Destination and dates to be announced. Register your interest to be notified first.`,
    image: "/images/trips/surf.jpg",
  },
]

export function getTripBySlug(slug: string): Trip | undefined {
  return trips.find((trip) => trip.slug === slug)
}

export const categories = [
  "All",
  "Food & Craft",
  "Mind & Body",
  "Business & Innovation",
  "Active & Outdoors",
]

export const statuses = ["All", "Early Access", "Coming Soon"]
