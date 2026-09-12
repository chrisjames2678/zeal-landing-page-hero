import Link from "next/link"

const tripLinks = [
  { href: "/trips/pizza", label: "Zeal: Pizza" },
  { href: "/trips/colombia-coffee", label: "Zeal: Colombia Coffee" },
  { href: "/trips/wellness", label: "Zeal: Wellness" },
  { href: "/trips/tech", label: "Zeal: Tech & Innovation" },
  { href: "/trips/wine", label: "Zeal: Wine" },
  { href: "/trips/surf", label: "Zeal: Surf" },
]

const companyLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
  { href: "/trips", label: "Trips" },
]

const legalLinks = [
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
  { href: "#", label: "Cookie Policy" },
]

export function Footer() {
  return (
    <footer className="bg-zeal-black text-white/50">
      <div className="mx-auto max-w-[1300px] px-[5vw] py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-serif text-2xl font-bold text-zeal-white"
            >
              Zeal
            </Link>
            <p className="mt-4 text-[0.85rem] leading-relaxed max-w-[280px]">
              Immersive small-group travel built around the subjects you care
              about most. Go deep, not wide.
            </p>
          </div>

          {/* Trips */}
          <div>
            <h4 className="text-zeal-white text-[0.85rem] font-semibold tracking-wide mb-4">
              Trips
            </h4>
            <ul className="flex flex-col gap-2.5">
              {tripLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.85rem] hover:text-zeal-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-zeal-white text-[0.85rem] font-semibold tracking-wide mb-4">
              Company
            </h4>
            <ul className="flex flex-col gap-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.85rem] hover:text-zeal-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-zeal-white text-[0.85rem] font-semibold tracking-wide mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[0.85rem] hover:text-zeal-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[0.8rem]">
            &copy; {new Date().getFullYear()} Zeal Travel. All rights reserved.
          </p>
          <p className="text-[0.8rem]">London, UK</p>
        </div>
      </div>
    </footer>
  )
}
