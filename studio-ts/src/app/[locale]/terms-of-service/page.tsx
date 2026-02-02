import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'TermsOfService.metadata' })
  const baseUrl = 'https://www.haussparis.com'

  const pathMap: Record<string, string> = {
    en: '/en/terms-of-service',
    fr: '/fr/conditions-generales',
    it: '/it/terms-of-service',
    de: '/de/nutzungsbedingungen',
    es: '/es/terminos-de-servicio',
  }

  const canonicalPath = pathMap[locale] || pathMap.en

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': '/en/terms-of-service',
        'fr': '/fr/conditions-generales',
        'it': '/it/terms-of-service',
        'de': '/de/nutzungsbedingungen',
        'es': '/es/terminos-de-servicio',
        'x-default': '/en/terms-of-service',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}${canonicalPath}`,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default function TermsOfServicePage() {
  const t = useTranslations('TermsOfService')

  return (
    <RootLayout>
      <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>{t('lastUpdated')}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="prose prose-lg max-w-none">
            {/* Section 1: Service Description */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section1.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section1.paragraph1')}
              </p>
            </section>

            {/* Section 2: Eligibility */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section2.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section2.paragraph1')}
              </p>
            </section>

            {/* Section 3: Our Matching Service */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section3.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section3.paragraph1')}
              </p>
              <p className="mt-4 text-base text-neutral-600">
                {t('section3.paragraph2')}
              </p>
            </section>

            {/* Section 4: Designer Relationships */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section4.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section4.paragraph1')}
              </p>
            </section>

            {/* Section 5: User Responsibilities */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section5.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section5.paragraph1')}
              </p>
            </section>

            {/* Section 6: Intellectual Property */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section6.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section6.paragraph1')}
              </p>
            </section>

            {/* Section 7: Limitation of Liability */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section7.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section7.paragraph1')}
              </p>
              <p className="mt-4 text-base text-neutral-600">
                {t('section7.paragraph2')}
              </p>
            </section>

            {/* Section 8: Indemnification */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section8.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section8.paragraph1')}
              </p>
            </section>

            {/* Section 9: Termination */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section9.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section9.paragraph1')}
              </p>
            </section>

            {/* Section 10: Governing Law */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section10.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section10.paragraph1')}
              </p>
            </section>

            {/* Section 11: Changes to Terms */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section11.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section11.paragraph1')}
              </p>
            </section>

            {/* Section 12: Contact Information */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section12.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section12.paragraph1')}
              </p>
              <div className="mt-6 space-y-2 text-base text-neutral-600">
                <p>
                  <strong>{t('section12.email')}</strong> contact@haussparis.com
                </p>
                <p>
                  <strong>{t('section12.phone')}</strong> +33 6 19 44 92 55
                </p>
                <p>
                  <strong>{t('section12.address')}</strong> 9 Villa de Guelma, 75018 Paris, France
                </p>
                <p>
                  <strong>{t('section12.company')}</strong> Hugo Betscher (SIRET: 939766473 00010)
                </p>
              </div>
            </section>
          </div>
        </FadeIn>
      </Container>
    </RootLayout>
  )
}
