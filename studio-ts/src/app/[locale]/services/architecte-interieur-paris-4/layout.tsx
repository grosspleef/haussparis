import { type Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { type ReactNode } from 'react'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'ArchitecteParis4Service.metadata' })
  const baseUrl = 'https://www.haussparis.com'

  const paths = {
    en: '/en/services/interior-designer-paris-4',
    fr: '/fr/services/architecte-interieur-paris-4',
    it: '/it/servizi/architetto-interni-parigi-4',
    de: '/de/dienstleistungen/innenarchitekt-paris-4',
    es: '/es/servicios/disenador-interiores-paris-4',
  }

  const canonicalPath = paths[locale as keyof typeof paths] || paths.en

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        en: paths.en,
        fr: paths.fr,
        it: paths.it,
        de: paths.de,
        es: paths.es,
        'x-default': paths.en,
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
          alt: `Hauss Paris - ${t('title')}`,
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
