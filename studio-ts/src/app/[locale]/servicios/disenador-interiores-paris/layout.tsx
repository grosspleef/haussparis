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
        name: 'Vivo en el extranjero, ¿cómo gestionar mi proyecto de renovación en París?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Es nuestra especialidad. Organizamos intercambios por videoconferencia, compartimos documentos en línea y garantizamos informes periódicos con fotos de la obra. Muchos de nuestros clientes han realizado su proyecto sin viajar a París.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Hablan inglés o francés?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Nuestro equipo y varios diseñadores de nuestra red son bilingües o trilingües. Podemos conducir todo su proyecto en inglés o en francés.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cómo seleccionan a los diseñadores de interiores de su red?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Verificamos diplomas, seguros, referencias y nos reunimos con cada profesional antes de integrarlo en nuestra red. Monitoreamos la satisfacción del cliente para garantizar un nivel de calidad constante.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuál es el presupuesto mínimo para contratar a un diseñador de interiores?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No hay presupuesto mínimo impuesto. En la práctica, la intervención de un diseñador de interiores está completamente justificada a partir de 30.000 € en trabajos. Por debajo de ello, un servicio de consultoría puntual puede ser suficiente.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Cuánto tiempo dura una renovación de apartamento en París?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cuente 2-3 meses para una renovación parcial, 4-6 meses para una renovación completa. Los plazos dependen del alcance de los trabajos, la disponibilidad de artesanos y los permisos administrativos.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Actúan fuera de París?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Sí. Nuestra red cubre París intra-muros y toda la Île-de-France: Neuilly, Boulogne, Saint-Cloud, Versalles y los departamentos 92, 93, 94, 78, 91, 77, 95.',
        },
      },
      {
        '@type': 'Question',
        name: '¿Qué sucede si no estoy satisfecho con el diseñador propuesto?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Usted es libre de rechazar nuestra propuesta y solicitar otro perfil. La consulta inicial con Hauss Paris es gratuita y sin compromiso.',
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
      'Servicio de conexión con diseñadores de interiores en París. Acompañamiento personalizado para clientes internacionales.',
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
    name: 'Diseñador de interiores en París',
    description:
      'Servicio de conexión con diseñadores de interiores verificados en París. Acompañamiento de A a Z para sus proyectos de renovación.',
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: 'https://www.haussparis.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
    serviceType: 'Diseño de interiores',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: [
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: '0',
          name: 'Consulta inicial',
        },
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '80',
          maxPrice: '150',
          unitText: 'm²',
          name: 'Estudio de diseño',
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
