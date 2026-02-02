import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { type Locale, servicesSlugs, localeToServiceSlug, type ServiceKey } from './routes'

export async function generateServiceMetadata(
  localeParam: string,
  serviceKey: ServiceKey
): Promise<Metadata> {
  const locale = localeParam as Locale
  const t = await getTranslations({ locale, namespace: 'Services' })

  const serviceSlug = localeToServiceSlug[locale][serviceKey]
  const servicesSlug = servicesSlugs[locale]

  return {
    title: t(`${serviceKey}.title`),
    description: t(`${serviceKey}.description`),
    alternates: {
      canonical: `/${locale}/${servicesSlug}/${serviceSlug}`,
      languages: {
        en: `/en/services/${localeToServiceSlug.en[serviceKey]}`,
        fr: `/fr/services/${localeToServiceSlug.fr[serviceKey]}`,
        it: `/it/servizi/${localeToServiceSlug.it[serviceKey]}`,
        de: `/de/dienstleistungen/${localeToServiceSlug.de[serviceKey]}`,
        es: `/es/servicios/${localeToServiceSlug.es[serviceKey]}`,
      },
    },
  }
}

export function getServiceKeyFromSlug(slug: string, localeParam: string): ServiceKey | null {
  const locale = localeParam as Locale
  const slugMap = localeToServiceSlug[locale]
  for (const [key, value] of Object.entries(slugMap)) {
    if (value === slug) {
      return key as ServiceKey
    }
  }
  return null
}
