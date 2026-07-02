'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

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

export default function Servicios() {
  const t = useTranslations('ServicesPage')
  
  const services = [
    {
      title: t('services.renovation.title'),
      description: t('services.renovation.description'),
      href: '/servicios/renovacion',
    },
    {
      title: t('services.customLayout.title'),
      description: t('services.customLayout.description'),
      href: '/servicios/diseno-personalizado',
    },
    {
      title: t('services.decoration.title'),
      description: t('services.decoration.description'),
      href: '/servicios/decoracion',
    },
    {
      title: t('services.furnishing.title'),
      description: t('services.furnishing.description'),
      href: '/servicios/mobiliario',
    },
    {
      title: t('services.homeStaging.title'),
      description: t('services.homeStaging.description'),
      href: '/servicios/home-staging',
    },
    {
      title: t('services.workplace.title'),
      description: t('services.workplace.description'),
      href: '/servicios/diseno-oficinas',
    },
    {
      title: t('services.kitchenBathroom.title'),
      description: t('services.kitchenBathroom.description'),
      href: '/servicios/cocina-bano',
    },
    {
      title: t('services.commercial.title'),
      description: t('services.commercial.description'),
      href: '/servicios/diseno-comercial',
    },
    {
      title: t('services.lighting.title'),
      description: t('services.lighting.description'),
      href: '/servicios/diseno-iluminacion',
    },
    {
      title: t('services.outdoor.title'),
      description: t('services.outdoor.description'),
      href: '/servicios/diseno-exterior',
    },
  ]

  // Arrondissement landing pages, linked here with their correct localized
  // URLs from routes.ts so the Spanish index stops orphaning them.
  const arrondissementServices = [3, 4, 6, 7, 8, 9, 11, 15, 16, 17].map((n) => ({
    title: t(`services.paris${n}.title`),
    description: t(`services.paris${n}.description`),
    href: routes[`architecteInterieurParis${n}` as keyof typeof routes].es as string,
  }))
  const allServices = [...services, ...arrondissementServices]

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
            {allServices.map((service) => (
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

