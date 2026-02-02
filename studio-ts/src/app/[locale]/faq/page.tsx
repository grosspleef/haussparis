'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Script from 'next/script'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'

// FAQ categories with their question keys
const faqCategories = {
  general: ['q1', 'q2', 'q3', 'q4'],
  pricing: ['q5', 'q6', 'q7'],
  process: ['q8', 'q9', 'q10'],
  services: ['q11', 'q12', 'q13'],
}

export default function FAQPage() {
  const t = useTranslations('FAQPage')
  const params = useParams()
  const locale = (params?.locale as string) || 'en'

  const contactUrl = locale === 'en' ? '/en/contact' : locale === 'fr' ? '/fr/contact' : locale === 'it' ? '/it/contatti' : locale === 'de' ? '/de/kontakt' : '/es/contacto'
  const servicesUrl = locale === 'en' ? '/en/services/interior-designer-paris' : locale === 'fr' ? '/fr/services/architecte-interieur-paris' : locale === 'it' ? '/it/servizi/architetto-interni-parigi' : locale === 'de' ? '/de/dienstleistungen/innenarchitekt-paris' : '/es/servicios/disenador-interiores-paris'

  // Generate FAQPage schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: Object.values(faqCategories)
      .flat()
      .map((qKey) => ({
        '@type': 'Question',
        name: t(`${qKey}.question`),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t(`${qKey}.answer`),
        },
      })),
  }

  return (
    <RootLayout>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>{t('intro')}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeInStagger>
          {/* General Questions */}
          <FadeIn>
            <section className="mb-16">
              <h2 className="font-display text-2xl font-semibold text-neutral-950 mb-8">
                {t('categories.general')}
              </h2>
              <dl className="space-y-8">
                {faqCategories.general.map((qKey) => (
                  <div key={qKey} className="border-b border-neutral-200 pb-8">
                    <dt className="font-display text-lg font-semibold text-neutral-950">
                      {t(`${qKey}.question`)}
                    </dt>
                    <dd className="mt-4 text-base text-neutral-600">
                      {t(`${qKey}.answer`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </FadeIn>

          {/* Pricing Questions */}
          <FadeIn>
            <section className="mb-16">
              <h2 className="font-display text-2xl font-semibold text-neutral-950 mb-8">
                {t('categories.pricing')}
              </h2>
              <dl className="space-y-8">
                {faqCategories.pricing.map((qKey) => (
                  <div key={qKey} className="border-b border-neutral-200 pb-8">
                    <dt className="font-display text-lg font-semibold text-neutral-950">
                      {t(`${qKey}.question`)}
                    </dt>
                    <dd className="mt-4 text-base text-neutral-600">
                      {t(`${qKey}.answer`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </FadeIn>

          {/* Process Questions */}
          <FadeIn>
            <section className="mb-16">
              <h2 className="font-display text-2xl font-semibold text-neutral-950 mb-8">
                {t('categories.process')}
              </h2>
              <dl className="space-y-8">
                {faqCategories.process.map((qKey) => (
                  <div key={qKey} className="border-b border-neutral-200 pb-8">
                    <dt className="font-display text-lg font-semibold text-neutral-950">
                      {t(`${qKey}.question`)}
                    </dt>
                    <dd className="mt-4 text-base text-neutral-600">
                      {t(`${qKey}.answer`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </FadeIn>

          {/* Services Questions */}
          <FadeIn>
            <section className="mb-16">
              <h2 className="font-display text-2xl font-semibold text-neutral-950 mb-8">
                {t('categories.services')}
              </h2>
              <dl className="space-y-8">
                {faqCategories.services.map((qKey) => (
                  <div key={qKey} className="border-b border-neutral-200 pb-8">
                    <dt className="font-display text-lg font-semibold text-neutral-950">
                      {t(`${qKey}.question`)}
                    </dt>
                    <dd className="mt-4 text-base text-neutral-600">
                      {t(`${qKey}.answer`)}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </FadeIn>
        </FadeInStagger>

        {/* CTA Section */}
        <FadeIn>
          <div className="mt-24 rounded-4xl bg-neutral-950 px-6 py-20 sm:px-6 sm:py-32 md:px-12">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {t('cta.title')}
              </h2>
              <p className="mt-6 text-lg text-neutral-300">{t('cta.description')}</p>
              <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href={contactUrl}
                  className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-100"
                >
                  {t('cta.button')}
                </Link>
                <Link
                  href={servicesUrl}
                  className="inline-flex rounded-full border border-white px-8 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  {t('cta.servicesButton')}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>

      <ContactSection />
    </RootLayout>
  )
}
