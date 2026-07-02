import { type Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { generateServiceMetadata } from '@/lib/serviceMetadata'
import { ServiceFaqSchema } from '@/components/ServiceFaqSchema'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  return generateServiceMetadata(params.locale, 'decorateurInterieurParis')
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.haussparis.com/#organization',
    name: 'Hauss Paris',
    description:
      'Service de mise en relation avec des décorateurs d\'intérieur à Paris. Transformation sans travaux pour pied-à-terre, Airbnb et investissements locatifs.',
    url: 'https://www.haussparis.com',
    telephone: '+33-6-19-44-92-55',
    email: 'contact@haussparis.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '9 Villa de Guelma',
      addressLocality: 'Paris',
      postalCode: '75018',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8920,
      longitude: 2.3447,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Paris',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Île-de-France',
      },
    ],
    priceRange: '€€',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  }

  // ProfessionalService Schema
  const professionalServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Décorateur d\'intérieur à Paris',
    description:
      'Service de mise en relation avec des décorateurs d\'intérieur vérifiés à Paris. Transformation rapide sans travaux : mobilier, couleurs, styling. Idéal pour Airbnb, pied-à-terre et home staging.',
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: 'https://www.haussparis.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
    serviceType: 'Décoration d\'intérieur',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: [
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: '0',
          name: 'Consultation initiale',
        },
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '800',
          maxPrice: '1500',
          name: 'Concept déco (planches + shopping list)',
        },
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '5000',
          maxPrice: '50000',
          name: 'Mission complète (mobilier + installation)',
        },
      ],
    },
  }

  return (
    <>
      <ServiceFaqSchema locale={locale} namespace="DecoratorParisService" />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="professional-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      {children}
    </>
  )
}
