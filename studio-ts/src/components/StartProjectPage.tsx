import { type Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { PageIntro } from '@/components/PageIntro'
import { ProjectFunnel } from '@/components/ProjectFunnel'
import { RootLayout } from '@/components/RootLayout'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import { startSlugs, type Locale } from '@/lib/routes'

type Props = {
  params: Promise<{ locale: string }>
}

const availableLocales: Locale[] = ['en', 'fr', 'it', 'de', 'es']

function buildLocaleUrls() {
  const urls: Partial<Record<Locale, string>> = {}
  for (const locale of availableLocales) {
    urls[locale] = `/${locale}/${startSlugs[locale]}`
  }
  return urls
}

export async function generateStartMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params
  const t = await getTranslations({ locale, namespace: 'ProjectFunnel.metadata' })
  const tOg = await getTranslations({ locale, namespace: 'OpenGraphImages' })
  const baseUrl = 'https://www.haussparis.com'

  const localeUrls = buildLocaleUrls()
  const canonicalPath = localeUrls[locale as Locale] || localeUrls.en!

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        ...localeUrls,
        'x-default': localeUrls.en!,
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

export default async function StartProjectPage(props: Props) {
  const { locale } = await props.params
  setRequestLocale(locale)
  const t = await getTranslations('ProjectFunnel.page')

  return (
    <AvailableLocalesProvider availableLocales={availableLocales} localeUrls={buildLocaleUrls()}>
      <RootLayout>
        <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
          <p>{t('intro')}</p>
        </PageIntro>

        <ProjectFunnel />
      </RootLayout>
    </AvailableLocalesProvider>
  )
}
