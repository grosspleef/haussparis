import { type Metadata } from 'next'
import type { ReactNode } from 'react'
import { getTranslations } from 'next-intl/server'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const t = await getTranslations({ locale: params.locale, namespace: 'ServicesPage.metadata' })
  const tOg = await getTranslations({ locale: params.locale, namespace: 'OpenGraphImages' })
  const baseUrl = 'https://www.haussparis.com'
  const canonicalPath = params.locale === 'en' ? '/en/services' : params.locale === 'fr' ? '/fr/services' : '/it/servizi'

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': '/en/services',
        'fr': '/fr/services',
        'it': '/it/servizi',
        'de': '/de/dienstleistungen',
        'es': '/es/servicios',
        'x-default': '/en/services',
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
          alt: tOg('services'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${baseUrl}/og-image.jpg`],
    },
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return children
}

