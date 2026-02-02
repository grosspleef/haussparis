'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useTranslations } from 'next-intl'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { MainServices } from '@/components/MainServices'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import type { Locale } from '@/lib/routes'

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

export default function Dienstleistungen() {
  const [showAll, setShowAll] = useState(false)
  const t = useTranslations('ServicesPage')
  
  const services = [
    {
      title: t('services.renovation.title'),
      description: t('services.renovation.description'),
      href: '/dienstleistungen/renovierung',
    },
    {
      title: t('services.customLayout.title'),
      description: t('services.customLayout.description'),
      href: '/dienstleistungen/massanfertigung',
    },
    {
      title: t('services.decoration.title'),
      description: t('services.decoration.description'),
      href: '/dienstleistungen/dekoration',
    },
    {
      title: t('services.furnishing.title'),
      description: t('services.furnishing.description'),
      href: '/dienstleistungen/einrichtung',
    },
    {
      title: t('services.homeStaging.title'),
      description: t('services.homeStaging.description'),
      href: '/dienstleistungen/home-staging',
    },
    {
      title: t('services.workplace.title'),
      description: t('services.workplace.description'),
      href: '/dienstleistungen/buerogestaltung',
    },
    {
      title: t('services.kitchenBathroom.title'),
      description: t('services.kitchenBathroom.description'),
      href: '/dienstleistungen/kueche-bad',
    },
    {
      title: t('services.commercial.title'),
      description: t('services.commercial.description'),
      href: '/dienstleistungen/gewerbedesign',
    },
    {
      title: t('services.lighting.title'),
      description: t('services.lighting.description'),
      href: '/dienstleistungen/lichtdesign',
    },
    {
      title: t('services.outdoor.title'),
      description: t('services.outdoor.description'),
      href: '/dienstleistungen/aussengestaltung',
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
            {services.slice(0, 6).map((service, index) => (
              <GridListItem 
                key={service.href} 
                title={service.title} 
                className={`group transition-all duration-300 ${
                  !showAll && index >= 4 && index < 6 ? 'blur-sm opacity-50' : ''
                }`}
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
          {showAll && (
            <div className="mt-10">
              <GridList lgColumns={2}>
                {services.slice(6).map((service) => (
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
          )}
          {!showAll && (
            <FadeIn className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="text-neutral-950 font-light hover:text-neutral-600 transition cursor-pointer"
              >
                {t('seeMore')}
              </button>
            </FadeIn>
          )}
        </div>
      </Container>

      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}

