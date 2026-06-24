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

### Funnel & routing notes

- The funnel lives at localized `/start` routes (`startSlugs` in `/src/lib/routes.ts`): `/en/start`, `/fr/demarrer`, `/it/inizia`, `/de/projekt-starten`, `/es/empezar`
- Positioning is **connector/network**: Hauss matches clients with selected interior architects (not a single in-house agency) — copy should reflect this
- Project-initiation CTAs across the site point to the funnel; genuine contact links (footer, FAQ, funnel sidebar) still point to the contact form

### API

- `POST /api/contact` - Handles both the contact form and the project funnel (the funnel sends `source: 'funnel'`, which adds structured project fields to the emails and makes the free-text message optional)
- Resend email service; sends bilingual email confirmations (FR/EN); CSRF origin check allows `*.vercel.app` only when `VERCEL_ENV=preview`
- Requires `RESEND_API_KEY` (Vercel env); the sender domain `haussparis.com` must stay verified in Resend (free tier = 1 domain)

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
