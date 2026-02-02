import { type Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { generateServiceMetadata } from '@/lib/serviceMetadata'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  return generateServiceMetadata(params.locale, 'decorateurInterieurParis')
}

export default function Layout({ children }: { children: ReactNode }) {
  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What\'s the difference between decorator and interior designer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The decorator works only on dressing (furniture, colors, accessories) without touching the structure. The interior designer can modify partitions, redo electricity and plumbing. Budget and timelines are very different: €5-50k in 3-8 weeks for decorator, €30-200k+ in 3-6 months for designer.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I manage my decoration project from abroad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely. It\'s actually one of our main use cases. Everything is done remotely: furniture selection by video call or email, coordinated deliveries, installation supervised by decorator. You receive photos at each stage and get back a ready-to-live apartment.',
        },
      },
      {
        '@type': 'Question',
        name: 'What\'s the minimum budget for hiring a decorator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'From €5,000 (furniture + fees), you can refresh a space with new textiles, accessories and some key furniture pieces. For complete furnishing of a studio or 1-bedroom, budget €15,000 to €25,000.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a decoration project take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'From 3 to 8 weeks depending on scope: 3-4 weeks for partial refresh, 6-8 weeks for complete furnishing. Timelines depend mainly on furniture delivery times (typically 2-6 weeks).',
        },
      },
      {
        '@type': 'Question',
        name: 'Can the decorator help with an Airbnb?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, several decorators in our network specialize in short-term rentals. They know the visual codes that work on Airbnb, favor robust materials and optimize quality-price ratio to maximize your profitability.',
        },
      },
      {
        '@type': 'Question',
        name: 'How is the decorator compensated?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Either a flat fee for the decor concept (€800-1500), or a percentage of furniture budget for full service (15-25%). Some decorators combine both: flat fee for design + reduced percentage on sourcing. Everything is transparent from the quote.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I provide my own furniture and only pay for advice?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, you can opt for an "advice only" service: the decorator provides mood boards, shopping list with references and layout plan. You then manage orders and installation yourself. Fee: €800 to €1,500 depending on surface.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work outside Paris?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our network covers Paris proper and all Île-de-France: Neuilly, Boulogne, Versailles, Saint-Cloud and departments 92, 93, 94, 78, 91, 77, 95.',
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
      'Matching service with interior decorators in Paris. Transformation without construction for pied-à-terre, Airbnb and rental investments.',
    url: 'https://www.haussparis.com',
    telephone: '+33-X-XX-XX-XX-XX',
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
      latitude: 48.8566,
      longitude: 2.3522,
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
    name: 'Interior Decorator in Paris',
    description:
      'Matching service with verified interior decorators in Paris. Fast transformation without construction: furniture, colors, styling. Ideal for Airbnb, pied-à-terre and home staging.',
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: 'https://www.haussparis.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
    serviceType: 'Interior Decoration',
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
          minPrice: '800',
          maxPrice: '1500',
          name: 'Decor concept (boards + shopping list)',
        },
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '5000',
          maxPrice: '50000',
          name: 'Full service (furniture + installation)',
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
