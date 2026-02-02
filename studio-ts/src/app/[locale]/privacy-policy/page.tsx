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
  const t = await getTranslations({ locale, namespace: 'PrivacyPolicy.metadata' })
  const baseUrl = 'https://www.haussparis.com'

  const pathMap: Record<string, string> = {
    en: '/en/privacy-policy',
    fr: '/fr/politique-de-confidentialite',
    it: '/it/privacy-policy',
    de: '/de/datenschutz',
    es: '/es/politica-de-privacidad',
  }

  const canonicalPath = pathMap[locale] || pathMap.en

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': '/en/privacy-policy',
        'fr': '/fr/politique-de-confidentialite',
        'it': '/it/privacy-policy',
        'de': '/de/datenschutz',
        'es': '/es/politica-de-privacidad',
        'x-default': '/en/privacy-policy',
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

export default function PrivacyPolicyPage() {
  const t = useTranslations('PrivacyPolicy')

  return (
    <RootLayout>
      <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>{t('lastUpdated')}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="prose prose-lg max-w-none">
            {/* Section 1: Information We Collect */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section1.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section1.paragraph1')}
              </p>
            </section>

            {/* Section 2: How We Use Your Information */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section2.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section2.paragraph1')}
              </p>
            </section>

            {/* Section 3: Information Sharing */}
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

            {/* Section 4: Data Security */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section4.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section4.paragraph1')}
              </p>
            </section>

            {/* Section 5: Your Rights */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section5.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section5.paragraph1')}
              </p>
            </section>

            {/* Section 6: Cookies and Tracking */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section6.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section6.paragraph1')}
              </p>
            </section>

            {/* Section 7: Third-Party Links */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section7.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section7.paragraph1')}
              </p>
            </section>

            {/* Section 8: Children's Privacy */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section8.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section8.paragraph1')}
              </p>
            </section>

            {/* Section 9: Changes to This Policy */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section9.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section9.paragraph1')}
              </p>
            </section>

            {/* Section 10: Contact Us */}
            <section className="mb-12">
              <h2 className="font-display text-2xl font-semibold text-neutral-950">
                {t('section10.title')}
              </h2>
              <p className="mt-6 text-base text-neutral-600">
                {t('section10.paragraph1')}
              </p>
              <div className="mt-6 space-y-2 text-base text-neutral-600">
                <p>
                  <strong>{t('section10.email')}</strong> contact@haussparis.com
                </p>
                <p>
                  <strong>{t('section10.phone')}</strong> +33 6 19 44 92 55
                </p>
                <p>
                  <strong>{t('section10.address')}</strong> 9 Villa de Guelma, 75018 Paris, France
                </p>
                <p>
                  <strong>{t('section10.company')}</strong> Hugo Betscher (SIRET: 939766473 00010)
                </p>
              </div>
            </section>
          </div>
        </FadeIn>
      </Container>
    </RootLayout>
  )
}
