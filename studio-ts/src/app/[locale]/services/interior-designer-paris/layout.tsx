import { type Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { generateServiceMetadata } from '@/lib/serviceMetadata'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  return generateServiceMetadata(params.locale, 'architecteInterieurParis')
}

export default function Layout({ children }: { children: ReactNode }) {
  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'I live abroad, how can I manage my renovation project in Paris?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This is our specialty. We organize exchanges via video conference, share documents online, and ensure regular reporting with construction site photos. Several of our clients have conducted their project without traveling to Paris once during the works.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you speak English or Italian?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our team and several designers in our network are bilingual or trilingual. We can conduct your entire project in English or Italian.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you select the interior designers in your network?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We verify diplomas, insurance, references, and meet each professional before integrating them into our network. We monitor client satisfaction to ensure consistent quality.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the minimum budget to hire an interior designer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'There is no imposed minimum budget. In practice, an interior designer\'s intervention is fully justified from €30,000 of works. Below that, a one-time consultation service may suffice.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does an apartment renovation in Paris take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Allow 2 to 3 months for partial renovation, 4 to 6 months for complete renovation. Timelines depend on the scope of works, craftsmen availability, and administrative authorizations.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work outside of Paris?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our network covers Paris proper and all of Île-de-France: Neuilly, Boulogne, Saint-Cloud, Versailles, and departments 92, 93, 94, 78, 91, 77, 95.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if I\'m not satisfied with the proposed designer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You are free to refuse our proposal and request another profile. The initial consultation with Hauss Paris is free and without obligation.',
        },
      },
    ],
  }

  // LocalBusiness Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.haussparis.com/#organization',
    name: 'Hauss Paris',
    description:
      'Matching service with interior designers in Paris. Personalized support for international clients.',
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
    priceRange: '€€€',
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
    name: 'Interior Designer in Paris',
    description:
      'Matching service with verified interior designers in Paris. A to Z support for your renovation projects.',
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: 'https://www.haussparis.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
    serviceType: 'Interior Design',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: [
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: '0',
          name: 'Initial consultation',
        },
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '80',
          maxPrice: '150',
          unitText: 'sqm',
          name: 'Layout study',
        },
      ],
    },
  }

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
