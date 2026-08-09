# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing/landing site for **Zeal Travel** (immersive small-group travel trips). Next.js App Router site built with v0 and shadcn/ui, plus a separate, not-yet-connected Sanity Studio for future CMS-driven content.

## Repo layout — two independent projects

This is **not** a pnpm workspace linking the two halves — root `pnpm-workspace.yaml` only sets `allowBuilds`, it doesn't list `packages`. Each half has its own lockfile and must be installed separately.

- **Root** (`/`) — the Next.js site. This is what deploys as the live site.
- **`studio/`** — a standalone Sanity Studio (its own `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`). Run all Sanity commands from inside `studio/`.

## Commands

Root app:
```
pnpm install
pnpm dev      # next dev
pnpm build    # next build
pnpm start    # next start
pnpm lint     # eslint .
```

Sanity Studio (run from `studio/`):
```
cd studio
pnpm install
pnpm dev      # sanity dev — local Studio at localhost
pnpm build    # sanity build
pnpm deploy   # sanity deploy — publishes hosted Studio
```

There is no test suite/framework configured in either project.

## Important: trip content lives in two places, only one is live

- `lib/trips.ts` is a **hardcoded static array** (`trips: Trip[]`) — this is the actual source of truth for everything the live site renders (`/trips`, `/trips/[slug]`, the homepage trips grid). The `Trip` interface here is intentionally simple (title, location, duration, description, optional itinerary).
- `studio/schemaTypes/trip.ts` defines a much richer Sanity `trip` document schema (SEO/AI-citation-oriented fields: FAQ, highlights, "who you learn from", comparison tables, an `internal` group that must never be published/queried, etc.).
- **Nothing in `app/`, `components/`, `lib/`, or `hooks/` imports `@sanity/client` or queries Sanity** — the Studio schema is not wired to the frontend yet. If you're asked to add/edit trip content today, edit `lib/trips.ts`. If you're asked to wire up Sanity, you'll need to add a Sanity client and adapt `lib/trips.ts` consumers (`app/trips/page.tsx`, `app/trips/[slug]/page.tsx`, `components/home/trips-grid.tsx`) to fetch from it instead — the two `Trip` shapes do not match and would need a mapping layer.
- Do not assume the Studio's `internal` field group is ever safe to expose to the frontend if/when the integration happens — its schema comments explicitly forbid that.

## Architecture (root app)

- **App Router**, pages under `app/`: `/` (home), `/trips`, `/trips/[slug]`, `/how-it-works`, `/about`, `/contact`. Each route's `page.tsx` is a thin shell that renders a matching content component (e.g. `app/about/page.tsx` → `components/about/about-content.tsx`, `app/trips/[slug]/page.tsx` → `components/trips/trip-detail.tsx`).
- Home page (`app/page.tsx`) is a straight composition of section components from `components/home/*` (`Hero`, `Marquee`, `HowItWorksSummary`, `TripsGrid`, `WhyZeal`, `WhatsIncluded`, `EarlyAccessCTA`) — add/reorder sections there rather than embedding section markup in `page.tsx`.
- `components/ui/` is shadcn/ui (`new-york` style, see `components.json`) — generated primitives; prefer composing with them over hand-rolling new base components. Aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks` (see `tsconfig.json` `paths` and `components.json`).
- **Tailwind v4** — there is no `tailwind.config.js`; theme tokens (colors, fonts, radii) are defined directly in `app/globals.css` via `:root` CSS custom properties and the `@theme inline` block. Brand colors are exposed both as shadcn semantic tokens (`--background`, `--primary`, etc.) and as explicit `--color-zeal-*` tokens (e.g. `zeal-black`, `zeal-cream`, `zeal-accent`) — prefer the `zeal-*` utility classes for on-brand styling, matching existing components.
- Fonts: DM Sans (`--font-dm-sans`, sans) and Fraunces (`--font-fraunces`, serif) loaded via `next/font/google` in `app/layout.tsx` and applied as CSS variables on `<html>`.
- Scroll-reveal animations use `hooks/use-scroll-reveal.ts` (`IntersectionObserver` + a `.reveal` → `.visible` class toggle) — the ref goes on a container, and elements to animate get the `reveal` class.
- The contact form posts directly to a hardcoded Formspree endpoint via `hooks/use-formspree.ts` — there is no backend API route involved.
- `next.config.mjs` sets `typescript.ignoreBuildErrors: true` and `images.unoptimized: true` — `next build` will succeed even with type errors, and `next/image` does no optimization. Don't rely on the build to catch type errors; check with `tsc`/editor feedback directly if it matters.
