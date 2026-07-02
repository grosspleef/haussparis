import { routes, type Locale } from '@/lib/routes'

// Absolute base for schema URLs. Mirrors metadataBase in the root layout.
export const SITE_BASE = 'https://www.haussparis.com'

const servicesIndexPath: Record<Locale, string> = {
  en: '/en/services',
  fr: '/fr/services',
  it: '/it/servizi',
  de: '/de/dienstleistungen',
  es: '/es/servicios',
}

const labels: Record<Locale, { home: string; services: string; main: string }> = {
  en: { home: 'Home', services: 'Services', main: 'Interior Designer Paris' },
  fr: { home: 'Accueil', services: 'Services', main: "Architecte d'intérieur Paris" },
  it: { home: 'Home', services: 'Servizi', main: "Architetto d'interni Parigi" },
  de: { home: 'Startseite', services: 'Leistungen', main: 'Innenarchitekt Paris' },
  es: { home: 'Inicio', services: 'Servicios', main: 'Diseñador de interiores París' },
}

export type Crumb = { name: string; path: string }

/**
 * Breadcrumb trail for an arrondissement page: Home > Services > Interior
 * Designer Paris > Paris N. Paths are locale-prefixed and relative (use
 * directly in <Link href>); prefix with SITE_BASE for JSON-LD `item` URLs.
 * Single source of truth so the visible breadcrumb and the BreadcrumbList
 * schema never drift. The leaf is a short "Paris N" label (breadcrumbs use
 * short labels, not the full page title).
 */
export function arrondissementCrumbs(locale: Locale, arrondissement: number): Crumb[] {
  const label = labels[locale] ?? labels.en
  const localized = routes[
    `architecteInterieurParis${arrondissement}` as keyof typeof routes
  ] as Partial<Record<Locale, string>>
  const pagePath = localized[locale] ?? localized.en ?? ''
  const mainPath =
    routes.architecteInterieurParis[locale] ?? routes.architecteInterieurParis.en ?? ''
  return [
    { name: label.home, path: `/${locale}` },
    { name: label.services, path: servicesIndexPath[locale] ?? servicesIndexPath.en },
    { name: label.main, path: mainPath },
    { name: `Paris ${arrondissement}`, path: pagePath },
  ]
}

/** Postal code for a Paris arrondissement, e.g. 16 -> "75016". */
export function arrondissementPostalCode(arrondissement: number): string {
  return `750${String(arrondissement).padStart(2, '0')}`
}
