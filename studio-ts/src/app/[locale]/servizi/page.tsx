'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { MainServices } from '@/components/MainServices'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'

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

export default function Servizi() {
  const [showAll, setShowAll] = useState(false)
  const t = useTranslations('ServicesPage')
  
  const services = [
    {
      title: t('services.renovation.title'),
      description: t('services.renovation.description'),
      href: '/servizi/ristrutturazione',
    },
    {
      title: t('services.customLayout.title'),
      description: t('services.customLayout.description'),
      href: '/servizi/progettazione-su-misura',
    },
    {
      title: t('services.decoration.title'),
      description: t('services.decoration.description'),
      href: '/servizi/decorazione',
    },
    {
      title: t('services.furnishing.title'),
      description: t('services.furnishing.description'),
      href: '/servizi/arredamento',
    },
    {
      title: t('services.homeStaging.title'),
      description: t('services.homeStaging.description'),
      href: '/servizi/home-staging',
    },
    {
      title: t('services.workplace.title'),
      description: t('services.workplace.description'),
      href: '/servizi/design-uffici',
    },
    {
      title: t('services.kitchenBathroom.title'),
      description: t('services.kitchenBathroom.description'),
      href: '/servizi/cucina-bagno',
    },
    {
      title: t('services.commercial.title'),
      description: t('services.commercial.description'),
      href: '/servizi/design-commerciale',
    },
    {
      title: t('services.lighting.title'),
      description: t('services.lighting.description'),
      href: '/servizi/design-illuminazione',
    },
    {
      title: t('services.outdoor.title'),
      description: t('services.outdoor.description'),
      href: '/servizi/design-esterni',
    },
  ]

  return (
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
  )
}

