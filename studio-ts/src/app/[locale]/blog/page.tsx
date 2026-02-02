import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

import { BlogList } from '@/components/BlogList'
import { ContactSection } from '@/components/ContactSection'
import { PageIntro } from '@/components/PageIntro'
import { RootLayout } from '@/components/RootLayout'
import { loadArticles } from '@/lib/mdx'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import type { Locale } from '@/lib/routes'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'BlogPage' })
  const baseUrl = 'https://www.haussparis.com'

  const pathMap: Record<string, string> = {
    en: '/en/blog',
    fr: '/fr/blog',
    it: '/it/blog',
    de: '/de/blog',
    es: '/es/blog',
  }

  const canonicalPath = pathMap[locale] || pathMap.en

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': '/en/blog',
        'fr': '/fr/blog',
        'it': '/it/blog',
        'de': '/de/blog',
        'es': '/es/blog',
        'x-default': '/en/blog',
      },
    },
    title: t('metadata.title'),
    description: t('metadata.description'),
    openGraph: {
      url: `${baseUrl}${canonicalPath}`,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Hauss Paris - Blog',
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
  en: '/en/blog',
  fr: '/fr/blog',
  it: '/it/blog',
  de: '/de/blog',
  es: '/es/blog',
}

export default async function Blog({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'BlogPage' })
  let articles = await loadArticles(locale)

  return (
    <AvailableLocalesProvider availableLocales={availableLocales} localeUrls={localeUrls}>
    <RootLayout>
      <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>
          {t('intro')}
        </p>
      </PageIntro>

      <BlogList articles={articles} locale={locale} />

      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}
