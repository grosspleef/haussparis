import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { HomeBuildSection, HomeDiscoverSection } from '@/components/HomeDiscoverSection'
import { ValuesSection } from '@/components/ValuesSection'
import { WhyHaussSection } from '@/components/WhyHaussSection'
import { RootLayout } from '@/components/RootLayout'
import { StartProjectButton } from '@/components/StartProjectButton'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import type { Locale } from '@/lib/routes'

function HowItWorks() {
  const t = useTranslations('HomePage.highlights')

  const steps = [
    {
      number: '01',
      text: t('1'),
    },
    {
      number: '02',
      text: t('2'),
    },
    {
      number: '03',
      text: t('3'),
    },
  ]

  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            {t('title')}
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ol
            role="list"
            className="mt-10 grid grid-cols-1 gap-y-8 text-white lg:grid-cols-3 lg:items-start lg:gap-x-8 lg:gap-y-0"
          >
            {steps.map(({ number, text }) => (
              <li key={number}>
                <FadeIn>
                  <div className="flex items-start gap-x-4">
                    <span className="font-display text-5xl font-semibold leading-none text-white">
                      {number}
                    </span>
                    <p className="text-base leading-relaxed text-neutral-300">{text}</p>
                  </div>
                </FadeIn>
              </li>
            ))}
          </ol>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function ProcessPreview() {
  const t = useTranslations('HomePage.process')
  return (
    <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
      <HomeDiscoverSection title={t('individuals')} />
      <HomeBuildSection title={t('professionals')} />
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'HomePage.metadata' })
  const tOg = await getTranslations({ locale, namespace: 'OpenGraphImages' })
  const baseUrl = 'https://www.haussparis.com'
  const canonicalPath = locale === 'en' ? '/en' : '/fr'

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': '/en',
        'fr': '/fr',
        'it': '/it',
        'de': '/de',
        'es': '/es',
        'x-default': '/en',
      },
    },
    description: t('description'),
    openGraph: {
      url: `${baseUrl}${canonicalPath}`,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: tOg('home'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`${baseUrl}/og-image.jpg`],
    },
  }
}

// Languages available for this page (from alternates.languages in generateMetadata)
const availableLocales: Locale[] = ['en', 'fr', 'it', 'de', 'es']
const localeUrls: Partial<Record<Locale, string>> = {
  en: '/en',
  fr: '/fr',
  it: '/it',
  de: '/de',
  es: '/es',
}

export default function Home() {
  const t = useTranslations('HomePage.hero')
  return (
    <AvailableLocalesProvider availableLocales={availableLocales} localeUrls={localeUrls}>
    <RootLayout>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-7xl">
            {t('title').split('|').map((line, index) => (
              <span key={index}>
                {line}
                {index < t('title').split('|').length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            {t('description')}
          </p>
          <div className="mt-8 flex flex-col items-start gap-y-4 sm:flex-row sm:items-center sm:gap-x-6">
            <StartProjectButton>{t('cta')}</StartProjectButton>
            <p className="text-sm text-neutral-500">{t('reassurance')}</p>
          </div>
        </FadeIn>
      </Container>

      <HowItWorks />

      <WhyHaussSection />

      <ProcessPreview />

      <ValuesSection />

      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}
