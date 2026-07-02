'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { type Metadata } from 'next'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { MainServices } from '@/components/MainServices'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import { routes, type Locale } from '@/lib/routes'

const availableLocales: Locale[] = ['en', 'fr', 'it', 'de', 'es']
const localeUrls: Partial<Record<Locale, string>> = {
  en: '/en/services',
  fr: '/fr/services',
  it: '/it/servizi',
  de: '/de/dienstleistungen',
  es: '/es/servicios',
}

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

export default function Services() {
  const t = useTranslations('ServicesPage')
  const params = useParams()
  const locale = (params?.locale as string) || 'fr'

  // Arrondissement pages resolve through routes.ts (the source of truth) so
  // every locale gets its correct localized, locale-prefixed URL. The former
  // inline map sent it/de/es to the English slug, which broke those links.
  const arrondissementRoutes: Record<string, keyof typeof routes> = {
    paris3: 'architecteInterieurParis3',
    paris4: 'architecteInterieurParis4',
    paris6: 'architecteInterieurParis6',
    paris7: 'architecteInterieurParis7',
    paris8: 'architecteInterieurParis8',
    paris9: 'architecteInterieurParis9',
    paris11: 'architecteInterieurParis11',
    paris15: 'architecteInterieurParis15',
    paris16: 'architecteInterieurParis16',
    paris17: 'architecteInterieurParis17',
  }

  // Determine service URLs based on locale
  const getServiceUrl = (service: string) => {
    const routeKey = arrondissementRoutes[service]
    if (routeKey) {
      const localized = routes[routeKey] as Partial<Record<Locale, string>>
      return localized[locale as Locale] || localized.en!
    }
    const urls: Record<string, { fr: string; en: string; it: string; de?: string; es?: string }> = {
      renovation: { fr: '/services/renovation', en: '/services/renovation', it: '/servizi/ristrutturazione' },
      customLayout: { fr: '/services/amenagement-sur-mesure', en: '/services/custom-layout', it: '/servizi/progettazione-su-misura' },
      decoration: { fr: '/services/decoration', en: '/services/decoration', it: '/servizi/decorazione' },
      furnishing: { fr: '/services/ameublement', en: '/services/furnishing', it: '/servizi/arredamento' },
      homeStaging: { fr: '/services/home-staging', en: '/services/home-staging', it: '/servizi/home-staging' },
      workplace: { fr: '/services/espaces-professionnels', en: '/services/workplace-design', it: '/servizi/design-uffici' },
      kitchenBathroom: { fr: '/services/cuisine-salle-de-bain', en: '/services/kitchen-bathroom', it: '/servizi/cucina-bagno' },
      commercial: { fr: '/services/design-commercial', en: '/services/commercial-design', it: '/servizi/design-commerciale' },
      lighting: { fr: '/services/design-luminaire', en: '/services/lighting-design', it: '/servizi/design-illuminazione' },
      outdoor: { fr: '/services/design-exterieur', en: '/services/outdoor-design', it: '/servizi/design-esterni' },
      interiorDesignerParis: { fr: '/services/architecte-interieur-paris', en: '/services/interior-designer-paris', it: '/servizi/architetto-interni-parigi', de: '/dienstleistungen/innenarchitekt-paris', es: '/servicios/disenador-interiores-paris' },
      interiorDecoratorParis: { fr: '/services/decorateur-interieur-paris', en: '/services/interior-decorator-paris', it: '/services/interior-decorator-paris', de: '/services/interior-decorator-paris', es: '/services/interior-decorator-paris' },
    }
    const url = urls[service][locale as 'fr' | 'en' | 'it' | 'de' | 'es']
    // Fallback to English if translation not available for DE/ES
    return url || urls[service]['en']
  }

  const services = [
    {
      title: t('services.renovation.title'),
      description: t('services.renovation.description'),
      href: getServiceUrl('renovation'),
    },
    {
      title: t('services.customLayout.title'),
      description: t('services.customLayout.description'),
      href: getServiceUrl('customLayout'),
    },
    {
      title: t('services.decoration.title'),
      description: t('services.decoration.description'),
      href: getServiceUrl('decoration'),
    },
    {
      title: t('services.furnishing.title'),
      description: t('services.furnishing.description'),
      href: getServiceUrl('furnishing'),
    },
    {
      title: t('services.homeStaging.title'),
      description: t('services.homeStaging.description'),
      href: getServiceUrl('homeStaging'),
    },
    {
      title: t('services.workplace.title'),
      description: t('services.workplace.description'),
      href: getServiceUrl('workplace'),
    },
    {
      title: t('services.kitchenBathroom.title'),
      description: t('services.kitchenBathroom.description'),
      href: getServiceUrl('kitchenBathroom'),
    },
    {
      title: t('services.commercial.title'),
      description: t('services.commercial.description'),
      href: getServiceUrl('commercial'),
    },
    {
      title: t('services.lighting.title'),
      description: t('services.lighting.description'),
      href: getServiceUrl('lighting'),
    },
    {
      title: t('services.outdoor.title'),
      description: t('services.outdoor.description'),
      href: getServiceUrl('outdoor'),
    },
    {
      title: t('services.interiorDesignerParis.title'),
      description: t('services.interiorDesignerParis.description'),
      href: getServiceUrl('interiorDesignerParis'),
    },
    {
      title: t('services.interiorDecoratorParis.title'),
      description: t('services.interiorDecoratorParis.description'),
      href: getServiceUrl('interiorDecoratorParis'),
    },
    {
      title: t('services.paris16.title'),
      description: t('services.paris16.description'),
      href: getServiceUrl('paris16'),
    },
    {
      title: t('services.paris7.title'),
      description: t('services.paris7.description'),
      href: getServiceUrl('paris7'),
    },
    {
      title: t('services.paris8.title'),
      description: t('services.paris8.description'),
      href: getServiceUrl('paris8'),
    },
    {
      title: t('services.paris6.title'),
      description: t('services.paris6.description'),
      href: getServiceUrl('paris6'),
    },
    {
      title: t('services.paris17.title'),
      description: t('services.paris17.description'),
      href: getServiceUrl('paris17'),
    },
    {
      title: t('services.paris15.title'),
      description: t('services.paris15.description'),
      href: getServiceUrl('paris15'),
    },
    {
      title: t('services.paris9.title'),
      description: t('services.paris9.description'),
      href: getServiceUrl('paris9'),
    },
    {
      title: t('services.paris11.title'),
      description: t('services.paris11.description'),
      href: getServiceUrl('paris11'),
    },
    {
      title: t('services.paris4.title'),
      description: t('services.paris4.description'),
      href: getServiceUrl('paris4'),
    },
    {
      title: t('services.paris3.title'),
      description: t('services.paris3.description'),
      href: getServiceUrl('paris3'),
    },
  ]

  return (
    <AvailableLocalesProvider availableLocales={availableLocales} localeUrls={localeUrls}>
    <RootLayout>
      <PageIntro
        eyebrow={t('eyebrow')}
        title={t('title')}
      >
        <p>{t('intro')}</p>
      </PageIntro>

      <MainServices />

      <Container className="mt-40">
        <FadeIn>
          <h2 className="font-display text-2xl font-semibold text-neutral-950 mb-10">
            {t('exhaustiveList')}
          </h2>
        </FadeIn>
        <div className="relative">
          <GridList lgColumns={2}>
            {services.map((service) => (
              <GridListItem
                key={service.href}
                title={service.title}
                className="group"
              >
                {service.description}
                <div className="mt-6 flex justify-end">
                  <Link
                    href={service.href}
                    aria-label={`${t('learnMore')} ${service.title}`}
                  >
                    <ArrowIcon className="w-6 fill-current text-neutral-300 transition-colors group-hover:text-neutral-950" />
                  </Link>
                </div>
              </GridListItem>
            ))}
          </GridList>
        </div>
      </Container>

      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}
