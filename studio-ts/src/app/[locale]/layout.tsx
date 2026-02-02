import { type Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import '@/styles/tailwind.css'
import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { StructuredData } from '@/components/StructuredData'
import { PerformanceHead } from './PerformanceHead'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { locale } = params
  const t = await getTranslations({ locale, namespace: 'RootLayout.metadata' })
  const baseUrl = 'https://www.haussparis.com'

  // Determine canonical URL based on locale
  const canonicalPath = locale === 'en' ? '/en' : locale === 'fr' ? '/fr' : locale === 'it' ? '/it' : locale === 'de' ? '/de' : '/es'

  // Get OpenGraph locale
  const ogLocale = locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : locale === 'it' ? 'it_IT' : locale === 'de' ? 'de_DE' : 'es_ES'

  // Get alternate locales for OpenGraph
  const getAlternateLocales = () => {
    const allLocales = ['en_US', 'fr_FR', 'it_IT', 'de_DE', 'es_ES']
    return allLocales.filter(l => l !== ogLocale)
  }

  return {
    metadataBase: new URL(baseUrl),
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
    title: {
      template: '%s - Hauss Paris',
      default: t('title'),
    },
    description: t('description'),
    keywords: t.raw('keywords') as string[],
    authors: [{ name: 'Hauss Paris' }],
    creator: 'Hauss Paris',
    publisher: 'Hauss Paris',
    openGraph: {
      type: 'website',
      locale: ogLocale,
      url: `${baseUrl}${canonicalPath}`,
      siteName: 'Hauss Paris',
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: t('imageAlt'),
        },
      ],
      alternateLocale: getAlternateLocales(),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      images: [`${baseUrl}/og-image.jpg`],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      ],
      apple: [
        { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your Google Search Console verification code here
      // google: 'your-verification-code',
    },
    // Performance optimizations: other metadata
    other: {
      // These will be added to <head>
      'link-preconnect-gtm': 'https://www.googletagmanager.com',
    },
  }
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: Props['params']
}) {
  const { locale } = await params

  // Ensure that the incoming `locale` is valid
  if (!['en', 'fr', 'it', 'de', 'es'].includes(locale)) {
    notFound()
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  const baseUrl = 'https://www.haussparis.com'
  const organizationSchema = {
    '@context': 'https://schema.org' as const,
    '@type': 'Organization' as const,
    name: 'Hauss Paris',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    contactPoint: {
      '@type': 'ContactPoint' as const,
      telephone: '+33-6-19-44-92-55',
      contactType: 'Customer Service',
      email: 'contact@haussparis.com',
      areaServed: 'FR, International',
    },
    address: {
      '@type': 'PostalAddress' as const,
      streetAddress: '9 Villa de Guelma',
      addressLocality: 'Paris',
      postalCode: '75018',
      addressCountry: 'FR',
    },
    sameAs: [
      'https://www.instagram.com/hauss.paris/',
      'https://www.linkedin.com/company/hauss-paris/',
    ],
  }

  const localBusinessSchema = {
    '@context': 'https://schema.org' as const,
    '@type': 'LocalBusiness' as const,
    '@id': `${baseUrl}/#localbusiness`,
    name: 'Hauss Paris',
    description: 'Hauss Paris accompagne particuliers et professionnels dans leurs projets d\'architecture d\'intérieur à Paris. Intermédiaire spécialisé, nous facilitons la rencontre entre un projet et un architecte d\'intérieur adapté, selon les besoins, le style et la manière de travailler. Rénovation d\'appartements parisiens, aménagement, optimisation des volumes, décoration, furnishing, ainsi que projets professionnels (bureaux, commerces, hospitality) : du studio au grand haussmannien, nous aidons nos clients à avancer sereinement. Une approche humaine et structurée, pour des collaborations cohérentes. Clientèle française et internationale.',
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    image: `${baseUrl}/og-image.jpg`,
    telephone: '+33-6-19-44-92-55',
    email: 'contact@haussparis.com',
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress' as const,
      streetAddress: '9 Villa de Guelma',
      addressLocality: 'Paris',
      postalCode: '75018',
      addressCountry: 'FR',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification' as const,
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: [
      { '@type': 'City' as const, name: 'Paris' },
      { '@type': 'City' as const, name: 'Île-de-France' },
    ],
  }

  return (
    <html lang={locale} className="h-full bg-neutral-950 text-base antialiased">
      <PerformanceHead />
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider messages={messages}>
          <GoogleAnalytics />
          <StructuredData organization={organizationSchema} localBusiness={localBusinessSchema} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
