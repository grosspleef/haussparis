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
        name: 'Ich lebe im Ausland, wie kann ich mein Renovierungsprojekt in Paris verwalten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Das ist unsere Spezialität. Wir organisieren den Austausch per Videokonferenz, teilen Dokumente online und gewährleisten regelmäßiges Reporting mit Fotos der Baustelle. Viele unserer Kunden haben ihr Projekt durchgeführt, ohne nach Paris zu reisen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Sprechen Sie Englisch oder Französisch?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Unser Team und mehrere Architekten aus unserem Netzwerk sind zweisprachig oder mehrsprachig. Wir können Ihr gesamtes Projekt auf Englisch oder Französisch durchführen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie wählen Sie die Innenarchitekten in Ihrem Netzwerk aus?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Wir überprüfen Diplome, Versicherungen, Referenzen und treffen jeden Fachmann, bevor wir ihn in unser Netzwerk aufnehmen. Wir überwachen die Kundenzufriedenheit, um ein konstantes Qualitätsniveau zu gewährleisten.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie hoch ist das Mindestbudget für einen Innenarchitekten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es gibt kein Mindestbudget. In der Praxis ist der Einsatz eines Innenarchitekten ab 30.000 € an Arbeiten vollständig gerechtfertigt. Darunter kann eine gezielte Beratungsleistung ausreichen.',
        },
      },
      {
        '@type': 'Question',
        name: 'Wie lange dauert eine Wohnungsrenovierung in Paris?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rechnen Sie mit 2-3 Monaten für eine Teilrenovierung, 4-6 Monaten für eine Vollrenovierung. Die Dauer hängt vom Umfang der Arbeiten, der Verfügbarkeit von Handwerkern und administrativen Genehmigungen ab.',
        },
      },
      {
        '@type': 'Question',
        name: 'Arbeiten Sie auch außerhalb von Paris?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja. Unser Netzwerk deckt Paris intra-muros und die gesamte Île-de-France ab: Neuilly, Boulogne, Saint-Cloud, Versailles und die Departements 92, 93, 94, 78, 91, 77, 95.',
        },
      },
      {
        '@type': 'Question',
        name: 'Was passiert, wenn ich mit dem vorgeschlagenen Architekten nicht zufrieden bin?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sie können unseren Vorschlag ablehnen und ein anderes Profil anfordern. Die Erstberatung mit Hauss Paris ist kostenlos und unverbindlich.',
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
      'Service zur Vermittlung von Innenarchitekten in Paris. Persönliche Betreuung für internationale Kunden.',
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
    name: 'Innenarchitekt in Paris',
    description:
      'Service zur Vermittlung verifizierter Innenarchitekten in Paris. Komplette Begleitung für Ihre Renovierungsprojekte.',
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: 'https://www.haussparis.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
    serviceType: 'Innenarchitektur',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: [
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: '0',
          name: 'Erstberatung',
        },
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '80',
          maxPrice: '150',
          unitText: 'm²',
          name: 'Planungsstudie',
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
