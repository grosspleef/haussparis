import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { type Locale, servicesSlugs, localeToServiceSlug, type ServiceKey } from './routes'

// Mapping from serviceKey to translation namespace
const serviceKeyToNamespace: Record<ServiceKey, string> = {
  renovation: 'RenovationService',
  decoration: 'DecorationService',
  furnishing: 'FurnishingService',
  homeStaging: 'HomeStagingService',
  kitchenBathroom: 'KitchenBathroomService',
  customLayout: 'CustomLayoutService',
  lightingDesign: 'LightingDesignService',
  exteriorDesign: 'OutdoorDesignService',
  officeDesign: 'WorkplaceDesignService',
  commercialDesign: 'CommercialDesignService',
  architecteInterieurParis: 'ArchitecteInterieurParisService',
  decorateurInterieurParis: 'DecoratorParisService',
  architecteInterieurParis3: 'ArchitecteParis3Service',
  architecteInterieurParis4: 'ArchitecteParis4Service',
  architecteInterieurParis6: 'ArchitecteParis6Service',
  architecteInterieurParis7: 'ArchitecteParis7Service',
  architecteInterieurParis8: 'ArchitecteParis8Service',
  architecteInterieurParis9: 'ArchitecteParis9Service',
  architecteInterieurParis11: 'ArchitecteParis11Service',
  architecteInterieurParis15: 'ArchitecteParis15Service',
  architecteInterieurParis16: 'ArchitecteParis16Service',
  architecteInterieurParis17: 'ArchitecteParis17Service',
}

export async function generateServiceMetadata(
  localeParam: string,
  serviceKey: ServiceKey
): Promise<Metadata> {
  const locale = localeParam as Locale
  const namespace = serviceKeyToNamespace[serviceKey]
  const t = await getTranslations({ locale, namespace })

  const serviceSlug = localeToServiceSlug[locale][serviceKey]
  const servicesSlug = servicesSlugs[locale]

  return {
    title: t('metadata.title'),
    description: t('metadata.description'),
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
