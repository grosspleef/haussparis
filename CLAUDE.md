# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Hauss Paris is a multilingual interior design agency website built with Next.js 15 (App Router), React 19, and TypeScript. The main application is located in the `studio-ts/` directory.

## Commands

All commands should be run from the `studio-ts/` directory:

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

> ⚠️ **`npm run dev` is currently broken** (Next 15.5.10 Webpack dev): it throws `Cannot read properties of undefined (reading 'call')` while rendering the `CookieConsent` client component in the root layout. **Production is unaffected** — `npm run build` + `npm run start` work fine. To test locally, build and start (the consent banner + Pixel/GA only load on a production build with the `NEXT_PUBLIC_*` env vars set). Turbopack is not an option (MDX loader isn't serializable); likely fixed by bumping Next.

## Architecture

### Internationalization (i18n)

- **5 locales**: en (default), fr, de, es, it
- **Routing**: Dynamic `[locale]` prefix in App Router (`/src/app/[locale]/`)
- **Translations**: JSON files in `/src/messages/{locale}.json` (2,300-2,850 lines each)
- **Library**: next-intl with middleware-based routing (`/src/middleware.ts`)
- **Service URLs are localized**: e.g., `/en/services/`, `/es/servicios/`, `/it/servizi/`, `/de/dienstleistungen/`

### Content System

- **MDX-based content** for blog articles and service pages
- **MDX config** in `next.config.mjs` with auto-layout wrapping for blog/case studies
- **Content relationships** managed in `/src/lib/content-relationships.ts`
- **Route definitions** with all service slugs per locale in `/src/lib/routes.ts`

### Key Directories

- `/src/app/[locale]/` - All page routes (171 directories)
- `/src/components/` - 41 React components
- `/src/lib/` - Utility functions (routes, metadata, MDX helpers)
- `/src/messages/` - Translation JSON files
- `/src/styles/` - Tailwind CSS, typography, base styles

### Important Components

- `RootLayout.tsx` - Main layout with header/navigation (header CTA = "Start a project")
- `LanguageSelector.tsx` - Locale switching
- `ProjectFunnel.tsx` - "Start a project" lead-qualification funnel (4 click-driven steps: project → property → location & timing → contact), the primary conversion path
- `StartProjectButton.tsx` - Locale-aware CTA that links to the funnel; registered in `MDXComponents.tsx` so blog/service content can use it without imports
- `ContactForm.tsx` - Simple contact form (secondary; for general inquiries)
- `ProcessSections.tsx` - Home page process sections
- `Footer.tsx` - Site footer with navigation
- `CookieConsent.tsx` - RGPD consent banner in the root layout; **gates `GoogleAnalytics.tsx` + `MetaPixel.tsx`** so no tracker loads before explicit consent (see Analytics section)

### Funnel & routing notes

- The funnel lives at localized `/start` routes (`startSlugs` in `/src/lib/routes.ts`): `/en/start`, `/fr/demarrer`, `/it/inizia`, `/de/projekt-starten`, `/es/empezar`
- Positioning is **connector/network**: Hauss matches clients with selected interior architects (not a single in-house agency) — copy should reflect this
- Project-initiation CTAs across the site point to the funnel; genuine contact links (footer, FAQ, funnel sidebar) still point to the contact form
- The `/start` page intro is in `StartProjectPage.tsx` (`title`/`intro`/`reassurance` keys under `ProjectFunnel.page` in messages) — tuned for paid (Meta Ads) traffic: connector wording ("architects we've already worked with") + a reassurance row (free · no commitment · 2 min · proven architects). The intro should match the fields the funnel actually collects (project + property), not style/budget

### Copy & discourse rules (aligned site-wide 2026-06)

Applies to **all** marketing/legal copy in every locale (funnel, blog MDX, service pages, ToS, transactional emails). Established when the whole site was reconciled with the real matching process:

- **No numeric turnaround promises** — never "48h"/"24h"/"sous 48h"/"within 48h"/"in 48 hours". Use qualitative wording: "dans les plus brefs délais", "rapidement", "en quelques jours". (Construction/works durations in months/weeks are fine — they're not response-time promises. The `stats.response` service-page badges were removed for this reason.)
- **Flexible architect count** — "un ou plusieurs / one or more / einen oder mehrere / uno o varios / uno o più". Never a rigid "2-3" **nor** "un seul / only one". (Existing "1 à 3"/"1 à 2" consultation ranges are already fine.)
- **style/budget** are legitimate matching criteria in process descriptions (gathered at the consultation) and in the ToS — but they stay **out of the `/start` funnel copy**, which only collects project + property + location.
- When reviewing copy, grep for `48`, `24-48`, and `2-3 (architect|profil)` across `*.json`/`*.mdx`/`*.tsx`.

### API

- `POST /api/contact` - Handles both the contact form and the project funnel (the funnel sends `source: 'funnel'`, which adds structured project fields to the emails and makes the free-text message optional)
- Resend email service; sends bilingual email confirmations (FR/EN); CSRF origin check allows `*.vercel.app` only when `VERCEL_ENV=preview`
- Requires `RESEND_API_KEY` (Vercel env); the sender domain `haussparis.com` must stay verified in Resend (free tier = 1 domain)

### Analytics, tracking & consent (RGPD)

- **Consent-gated**: `CookieConsent.tsx` (rendered in `[locale]/layout.tsx`) shows an RGPD banner and stores the choice in `localStorage` under `hauss-consent`. `GoogleAnalytics.tsx` and `MetaPixel.tsx` render **only after the user accepts** — nothing loads before consent. All three are client components (`'use client'`).
- **Meta Pixel**: gated on `NEXT_PUBLIC_META_PIXEL_ID` (build-time inlined → must be set before the build). The funnel fires a `Lead` conversion event on successful submit via `trackMetaEvent` in `@/lib/metaPixel.ts`. ⚠️ In Meta's **French** UI, the standard `Lead` event is displayed as **"Prospect"**.
- **Facebook domain verification**: `FACEBOOK_DOMAIN_VERIFICATION` env (read at runtime in `generateMetadata`) injects the `facebook-domain-verification` meta tag.
- **Google Analytics**: gated on `NEXT_PUBLIC_GA_MEASUREMENT_ID` (note: `.env.example` mislabels this var as `NEXT_PUBLIC_GA_ID`).
- ⚠️ **CSP gotcha**: the `Content-Security-Policy` header in `next.config.mjs` must whitelist every third-party script/endpoint, otherwise it is **silently blocked**. This already broke the Meta Pixel (fixed: `script-src` allows `connect.facebook.net`; `connect-src` allows `www.facebook.com` + `connect.facebook.net`). **Add any new tracking/embed domain here.**

### Styling

- Tailwind CSS v4 with PostCSS
- Framer Motion for animations
- Custom typography in `/src/styles/typography.css`

## Path Alias

`@/*` maps to `./src/*` (configured in tsconfig.json)

## Notes

- Built on Tailwind Plus commercial template
- No test framework configured
- Images processed via Sharp and recma-import-images plugin
