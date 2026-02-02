import { type Metadata } from 'next'
import type { ReactNode } from 'react'
import Script from 'next/script'
import { generateServiceMetadata } from '@/lib/serviceMetadata'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  return generateServiceMetadata(params.locale, 'commercialDesign')
}

export default function Layout({ children }: { children: ReactNode }) {
  // FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between an interior designer and a commercial architect?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An interior designer can work on any type of space (residential, commercial). A commercial architect specializes in professional premises: restaurants, shops, hotels, medical offices. They master specific standards (ERP, PMR accessibility, fire safety) and business constraints (customer flow, storage areas, ergonomics).',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to fit out a restaurant in Paris?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Total budget between €60,000 and €250,000 depending on surface area and finish level. For an 80 m² restaurant, expect €10,000-15,000 in fees, €40,000-100,000 in works (professional kitchen, ventilation, plumbing) and €10,000-50,000 in equipment and furniture.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the mandatory standards for commercial premises?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ERP (Public Access Establishments) must comply with: PMR accessibility (ramp, adapted toilets, passage width), fire safety (emergency exits, extinguishers, safety lighting), ventilation (double-flow VMC mandatory in catering), and electrical compliance (standard panels, emergency lighting). A commercial architect handles these constraints from the design stage.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to open a shop?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '3 to 6 months on average. Design and permits: 1-2 months (town hall filing, safety commission validation). Works: 2-3 months for a 50-100 m² premises (demolition, electricity, painting, flooring, furniture). Legal deadline for opening: 15 days after compliance visit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I manage my commercial project from abroad?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. The architect coordinates everything remotely: plan validation via video, weekly photo updates, management of contractors and suppliers, work reception in your absence. You only intervene on strategic choices (concept, budget, timeline). Ideal for international investors or multi-site franchisees.',
        },
      },
      {
        '@type': 'Question',
        name: 'What budget should I plan for a medical office?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Between €30,000 and €120,000 depending on specialty. General practice office (60 m²): €5,000-8,000 in fees + €20,000-40,000 in works. Dental or physiotherapy office (specific plumbing, equipment): up to €80,000-100,000. Medical standards (hygiene, accessibility, confidentiality) increase costs by 20-30%.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does commercial architect remuneration work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Three possible modes: fixed fee (€8,000-20,000 depending on complexity), percentage of work budget (10-15%), or mixed (design fee + % on monitoring). Fixed fee is preferable for small projects (<100 m²), percentage for large sites (>150 m²). Full or partial mission according to your needs.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you work outside Paris?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Our network covers Paris city center and all of Île-de-France: Neuilly, Boulogne, Levallois, Montreuil, Saint-Denis and departments 92, 93, 94, 78, 91, 77, 95. For projects in the provinces or abroad, we refer to trusted partners.',
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
      'Connection service with interior designers specialized in commercial architecture in Paris. Restaurants, shops, hotels, medical offices.',
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
    name: 'Commercial Architecture in Paris',
    description:
      'Connection service with interior designers specialized in retail and commercial spaces in Paris. Design and fit-out of restaurants, shops, hotels, medical offices. Complete management: plans, permits, works, furniture.',
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: 'https://www.haussparis.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
    serviceType: 'Commercial Architecture',
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
          minPrice: '8000',
          maxPrice: '20000',
          name: 'Architect fees (fixed or %)',
        },
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '30000',
          maxPrice: '250000',
          name: 'Total project budget (fees + works + equipment)',
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

