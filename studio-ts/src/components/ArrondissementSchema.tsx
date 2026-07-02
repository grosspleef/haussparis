'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { routes, type Locale } from '@/lib/routes'

// Absolute base for schema URLs. Mirrors metadataBase in the root layout.
const BASE = 'https://www.haussparis.com'

const servicesIndexPath: Record<Locale, string> = {
  en: '/en/services',
  fr: '/fr/services',
  it: '/it/servizi',
  de: '/de/dienstleistungen',
  es: '/es/servicios',
}

const breadcrumbLabels: Record<
  Locale,
  { home: string; services: string; main: string }
> = {
  en: { home: 'Home', services: 'Services', main: 'Interior Designer Paris' },
  fr: { home: 'Accueil', services: 'Services', main: "Architecte d'intérieur Paris" },
  it: { home: 'Home', services: 'Servizi', main: "Architetto d'interni Parigi" },
  de: { home: 'Startseite', services: 'Leistungen', main: 'Innenarchitekt Paris' },
  es: { home: 'Inicio', services: 'Servicios', main: 'Diseñador de interiores París' },
}

// Schema text must be plain: strip any inline HTML the copy might carry.
function plain(value: string): string {
  return value.replace(/<[^>]*>/g, '').trim()
}

type Props = {
  /** next-intl namespace of the page, e.g. "ArchitecteParis16Service". */
  namespace: string
  /** Arrondissement number, e.g. 16. */
  arrondissement: number
  /** How many faq.qN entries the page renders (default 4). */
  faqCount?: number
}

/**
 * Emits FAQPage + BreadcrumbList JSON-LD for an arrondissement service page,
 * sourced from the SAME message keys the page already renders (so the schema
 * always matches the visible, localized content). Client component: renders
 * into the SSR HTML like the rest of the page.
 */
export function ArrondissementSchema({
  namespace,
  arrondissement,
  faqCount = 4,
}: Props) {
  const t = useTranslations(namespace)
  const params = useParams()
  const locale = ((params?.locale as string) || 'en') as Locale

  const routeKey = `architecteInterieurParis${arrondissement}` as keyof typeof routes
  const pagePath = routes[routeKey]?.[locale] ?? routes[routeKey]?.en
  const mainPath =
    routes.architecteInterieurParis[locale] ?? routes.architecteInterieurParis.en
  const labels = breadcrumbLabels[locale] ?? breadcrumbLabels.en

  if (!pagePath) return null

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Array.from({ length: faqCount }, (_, i) => i + 1).map((n) => ({
      '@type': 'Question',
      name: plain(t(`faq.q${n}.question`)),
      acceptedAnswer: {
        '@type': 'Answer',
        text: plain(t(`faq.q${n}.answer`)),
      },
    })),
  }

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: labels.home, item: `${BASE}/${locale}` },
      {
        '@type': 'ListItem',
        position: 2,
        name: labels.services,
        item: `${BASE}${servicesIndexPath[locale]}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: labels.main,
        item: `${BASE}${mainPath}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: plain(t('title')),
        item: `${BASE}${pagePath}`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify([faqPage, breadcrumbs]) }}
    />
  )
}
