'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { type Locale } from '@/lib/routes'
import {
  SITE_BASE,
  arrondissementCrumbs,
  arrondissementPostalCode,
} from '@/lib/arrondissementBreadcrumb'

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
 * Emits FAQPage + BreadcrumbList + Service JSON-LD for an arrondissement service
 * page, sourced from the SAME message keys the page already renders (so the
 * schema always matches the visible, localized content). Client component:
 * renders into the SSR HTML like the rest of the page.
 */
export function ArrondissementSchema({
  namespace,
  arrondissement,
  faqCount = 4,
}: Props) {
  const t = useTranslations(namespace)
  const params = useParams()
  const locale = ((params?.locale as string) || 'en') as Locale

  const crumbs = arrondissementCrumbs(locale, arrondissement)
  const pagePath = crumbs[crumbs.length - 1]?.path
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
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_BASE}${crumb.path}`,
    })),
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: plain(t('title')),
    serviceType: 'Interior design',
    description: plain(t('intro')),
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: SITE_BASE,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `Paris ${arrondissement}e`,
      address: {
        '@type': 'PostalAddress',
        postalCode: arrondissementPostalCode(arrondissement),
        addressLocality: 'Paris',
        addressCountry: 'FR',
      },
    },
    url: `${SITE_BASE}${pagePath}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([faqPage, breadcrumbs, service]),
      }}
    />
  )
}
