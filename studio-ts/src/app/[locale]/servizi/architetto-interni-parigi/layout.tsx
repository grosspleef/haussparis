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
        name: 'Vivo all\'estero, come gestire il mio progetto di ristrutturazione a Parigi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'È la nostra specialità. Organizziamo scambi per videoconferenza, condividiamo i documenti online e garantiamo un reporting regolare con foto del cantiere. Molti dei nostri clienti hanno condotto il loro progetto senza recarsi a Parigi.',
        },
      },
      {
        '@type': 'Question',
        name: 'Parlate inglese o francese?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì. Il nostro team e diversi architetti della nostra rete sono bilingui o trilingui. Possiamo condurre l\'intero vostro progetto in inglese o in francese.',
        },
      },
      {
        '@type': 'Question',
        name: 'Come selezionate gli architetti d\'interni della vostra rete?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Verifichiamo i diplomi, le assicurazioni, i riferimenti e incontriamo ogni professionista prima di integrarlo nella nostra rete. Monitoriamo la soddisfazione dei clienti per garantire un livello di qualità costante.',
        },
      },
      {
        '@type': 'Question',
        name: 'Qual è il budget minimo per ricorrere a un architetto d\'interni?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Non c\'è un budget minimo imposto. In pratica, l\'intervento di un architetto d\'interni è pienamente giustificato a partire da 30.000 € di lavori. Al di sotto, un servizio di consulenza mirata può essere sufficiente.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quanto tempo dura una ristrutturazione di appartamento a Parigi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Contate 2-3 mesi per una ristrutturazione parziale, 4-6 mesi per una ristrutturazione completa. I tempi dipendono dall\'entità dei lavori, dalla disponibilità degli artigiani e dalle autorizzazioni amministrative.',
        },
      },
      {
        '@type': 'Question',
        name: 'Intervenite al di fuori di Parigi?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sì. La nostra rete copre Parigi intra-muros e tutta l\'Île-de-France: Neuilly, Boulogne, Saint-Cloud, Versailles e i dipartimenti 92, 93, 94, 78, 91, 77, 95.',
        },
      },
      {
        '@type': 'Question',
        name: 'Cosa succede se non sono soddisfatto dell\'architetto proposto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Siete liberi di rifiutare la nostra proposta e di richiedere un altro profilo. La consultazione iniziale con Hauss Paris è gratuita e senza impegno.',
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
      'Servizio di connessione con architetti d\'interni a Parigi. Accompagnamento personalizzato per clienti internazionali.',
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
    name: 'Architetto d\'interni a Parigi',
    description:
      'Servizio di connessione con architetti d\'interni verificati a Parigi. Accompagnamento dalla A alla Z per i vostri progetti di ristrutturazione.',
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: 'https://www.haussparis.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
    serviceType: 'Architettura d\'interni',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: [
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: '0',
          name: 'Consultazione iniziale',
        },
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '80',
          maxPrice: '150',
          unitText: 'm²',
          name: 'Studio di progettazione',
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
