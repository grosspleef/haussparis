'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { routes } from '@/lib/routes'
import {
  getServicesForArticle,
  serviceMetadataTranslationKeys,
  type ServiceKey,
} from '@/lib/content-relationships'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 6" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 3 18 .5v2H0v1h18v2L24 3Z"
      />
    </svg>
  )
}

interface ServiceCardProps {
  serviceKey: ServiceKey
  locale: string
}

function ServiceCard({ serviceKey, locale }: ServiceCardProps) {
  const t = useTranslations()
  const tRelated = useTranslations('RelatedServices')

  const serviceRoutes = routes[serviceKey]
  if (!serviceRoutes) return null

  const href = serviceRoutes[locale as keyof typeof serviceRoutes] || serviceRoutes.en

  const translationKeys = serviceMetadataTranslationKeys[serviceKey]
  if (!translationKeys) return null

  // Get service name and description from translations
  const name = t(translationKeys.nameKey)
  // Truncate description to 2-3 lines (roughly 120 chars)
  const fullDescription = t(translationKeys.descriptionKey)
  const description =
    fullDescription.length > 120
      ? fullDescription.slice(0, 117) + '...'
      : fullDescription

  return (
    <article className="relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-8 transition hover:border-neutral-300 hover:bg-neutral-50">
      <h3 className="font-display text-lg font-semibold text-neutral-950">
        {name}
      </h3>
      <p className="mt-4 text-sm text-neutral-600 line-clamp-3">{description}</p>
      <Link
        href={href}
        className="mt-6 flex items-center gap-x-3 text-sm font-semibold text-neutral-950 transition hover:text-neutral-700"
      >
        {tRelated('cta')}
        <ArrowIcon className="h-1.5 w-6 flex-none fill-current" />
        <span className="absolute inset-0" />
      </Link>
    </article>
  )
}

interface RelatedServicesProps {
  articleSlug: string
  className?: string
}

export function RelatedServices({ articleSlug, className = '' }: RelatedServicesProps) {
  const params = useParams()
  const locale = (params?.locale as string) || 'fr'
  const t = useTranslations('RelatedServices')

  const serviceKeys = getServicesForArticle(articleSlug)

  if (serviceKeys.length === 0) return null

  return (
    <div className={`bg-neutral-50 py-24 sm:py-32 ${className}`}>
      <SectionIntro title={t('title')} smaller>
        <p>{t('subtitle')}</p>
      </SectionIntro>

      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {serviceKeys.slice(0, 3).map((serviceKey) => (
            <FadeIn key={serviceKey}>
              <ServiceCard serviceKey={serviceKey} locale={locale} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  )
}
