'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { routes, type Locale } from '@/lib/routes'

const ARRONDISSEMENTS = [3, 4, 6, 7, 8, 9, 11, 15, 16, 17]

const headings: Record<Locale, { others: string; all: string }> = {
  en: {
    others: 'Interior designers in other Paris arrondissements',
    all: 'Interior designer by Paris arrondissement',
  },
  fr: {
    others: "Architectes d'intérieur dans les autres arrondissements",
    all: "Architecte d'intérieur par arrondissement de Paris",
  },
  it: {
    others: "Architetti d'interni negli altri arrondissement di Parigi",
    all: "Architetto d'interni per arrondissement di Parigi",
  },
  de: {
    others: 'Innenarchitekten in anderen Pariser Arrondissements',
    all: 'Innenarchitekt nach Pariser Arrondissement',
  },
  es: {
    others: 'Diseñadores de interiores en otros distritos de París',
    all: 'Diseñador de interiores por distrito de París',
  },
}

/**
 * Internal-link hub for the arrondissement cluster. On an arrondissement page,
 * pass `current` to link the other nine; on the parent service page, omit it to
 * link all ten. URLs come from routes.ts (locale-correct) and the anchor text
 * from the ServicesPage messages so each link carries the local keyword.
 */
export function ArrondissementLinks({ current }: { current?: number }) {
  const t = useTranslations('ServicesPage')
  const params = useParams()
  const locale = ((params?.locale as string) || 'en') as Locale
  const heading = current
    ? (headings[locale] ?? headings.en).others
    : (headings[locale] ?? headings.en).all

  const items = ARRONDISSEMENTS.filter((n) => n !== current).map((n) => {
    const localized = routes[
      `architecteInterieurParis${n}` as keyof typeof routes
    ] as Partial<Record<Locale, string>>
    return {
      n,
      href: localized[locale] ?? localized.en!,
      label: t(`services.paris${n}.title`).replace(/\s*\.\s*$/, ''),
    }
  })

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          {heading}
        </h2>
        <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.n}>
              <Link
                href={item.href}
                className="inline-flex items-center text-sm text-neutral-600 transition hover:text-neutral-950"
              >
                {item.label} →
              </Link>
            </li>
          ))}
        </ul>
      </FadeIn>
    </Container>
  )
}
