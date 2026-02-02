import { type Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import {
  ProcessBuildSection,
  ProcessDeliverSection,
  ProcessDiscoverSection,
} from '@/components/ProcessSections'
import { ValuesSection } from '@/components/ValuesSection'
import { RootLayout } from '@/components/RootLayout'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import type { Locale } from '@/lib/routes'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'ProcessPage.metadata',
  })
  const baseUrl = 'https://www.haussparis.com'
  const canonicalPath = '/it/il-processo'

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': '/en/our-process',
        'fr': '/fr/notre-processus',
        'it': '/it/il-processo',
        'de': '/de/unser-prozess',
        'es': '/es/nuestro-proceso',
        'x-default': '/en/our-process',
      },
    },
    title: t('title'),
    description: t('description'),
    openGraph: {
      url: `${baseUrl}${canonicalPath}`,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Hauss Paris - Il Nostro Processo',
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
  en: '/en/our-process',
  fr: '/fr/notre-processus',
  it: '/it/il-processo',
  de: '/de/unser-prozess',
  es: '/es/nuestro-proceso',
}

export default async function IlProcesso(props: Props) {
  const params = await props.params
  setRequestLocale(params.locale)
  const t = await getTranslations('ProcessPage')

  return (
    <AvailableLocalesProvider availableLocales={availableLocales} localeUrls={localeUrls}>
    <RootLayout>
      <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>{t('description')}</p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <ProcessDiscoverSection />
        <ProcessBuildSection />
        <ProcessDeliverSection />
      </div>

      <ValuesSection />

      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}

