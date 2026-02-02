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
  const canonicalPath = params.locale === 'en' ? '/en/our-process' : '/fr/notre-processus'

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': '/en/our-process',
        'fr': '/fr/notre-processus',
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
          alt: 'Hauss Paris - Our Process',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`${baseUrl}/og-image.jpg`],
    },
  }
}

export default async function Process(props: Props) {
  const params = await props.params
  setRequestLocale(params.locale)
  const t = await getTranslations('ProcessPage')
  
  return (
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
  )
}
