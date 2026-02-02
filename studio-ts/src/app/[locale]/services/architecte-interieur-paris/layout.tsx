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
        name: 'Je vis à l\'étranger, comment gérer mon projet de rénovation à Paris ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'C\'est notre spécialité. Nous organisons les échanges par visioconférence, partageons les documents en ligne et assurons un reporting régulier avec photos du chantier. Plusieurs de nos clients ont mené leur projet sans se déplacer à Paris.',
        },
      },
      {
        '@type': 'Question',
        name: 'Parlez-vous anglais ou italien ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui. Notre équipe et plusieurs architectes de notre réseau sont bilingues ou trilingues. Nous pouvons conduire l\'intégralité de votre projet en anglais ou en italien.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment sélectionnez-vous les architectes d\'intérieur de votre réseau ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nous vérifions les diplômes, les assurances, les références et rencontrons chaque professionnel avant de l\'intégrer à notre réseau. Nous suivons la satisfaction des clients pour garantir un niveau de qualité constant.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel budget minimum pour faire appel à un architecte d\'intérieur ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Il n\'y a pas de budget minimum imposé. En pratique, l\'intervention d\'un architecte d\'intérieur se justifie pleinement à partir de 30 000 € de travaux. En dessous, une prestation de conseil ponctuel peut suffire.',
        },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps dure une rénovation d\'appartement à Paris ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Comptez 2 à 3 mois pour une rénovation partielle, 4 à 6 mois pour une rénovation complète. Les délais dépendent de l\'ampleur des travaux, de la disponibilité des artisans et des autorisations administratives.',
        },
      },
      {
        '@type': 'Question',
        name: 'Intervenez-vous en dehors de Paris ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui. Notre réseau couvre Paris intra-muros et toute l\'Île-de-France : Neuilly, Boulogne, Saint-Cloud, Versailles, et les départements 92, 93, 94, 78, 91, 77, 95.',
        },
      },
      {
        '@type': 'Question',
        name: 'Que se passe-t-il si je ne suis pas satisfait de l\'architecte proposé ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Vous êtes libre de refuser notre proposition et de demander un autre profil. La consultation initiale avec Hauss Paris est gratuite et sans engagement.',
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
      'Service de mise en relation avec des architectes d\'intérieur à Paris. Accompagnement personnalisé pour clients internationaux.',
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
    name: 'Architecte d\'intérieur à Paris',
    description:
      'Service de mise en relation avec des architectes d\'intérieur vérifiés à Paris. Accompagnement de A à Z pour vos projets de rénovation.',
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: 'https://www.haussparis.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
    serviceType: 'Architecture d\'intérieur',
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
          minPrice: '80',
          maxPrice: '150',
          unitText: 'm²',
          name: 'Étude d\'aménagement',
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
