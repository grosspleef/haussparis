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
        name: 'Quelle différence entre architecte d\'intérieur et architecte commercial ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Un architecte d\'intérieur peut intervenir sur tout type d\'espace (résidentiel, commercial). Un architecte commercial est spécialisé dans les locaux professionnels : restaurants, boutiques, hôtels, cabinets médicaux. Il maîtrise les normes spécifiques (ERP, accessibilité PMR, sécurité incendie) et les contraintes métier (flux clients, zones de stockage, ergonomie).',
        },
      },
      {
        '@type': 'Question',
        name: 'Combien coûte l\'aménagement d\'un restaurant à Paris ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Budget total entre 60 000 € et 250 000 € selon la surface et le niveau de finition. Pour un restaurant de 80 m², comptez 10 000-15 000 € d\'honoraires, 40 000-100 000 € de travaux (cuisine pro, ventilation, plomberie) et 10 000-50 000 € d\'équipement et mobilier.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quelles sont les normes obligatoires pour un commerce ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Les ERP (Établissements Recevant du Public) doivent respecter : accessibilité PMR (rampe, WC adaptés, largeur passages), sécurité incendie (issues de secours, extincteurs, éclairage de sécurité), ventilation (VMC double flux obligatoire en restauration), et conformité électrique (tableaux aux normes, éclairage de secours). Un architecte commercial gère ces contraintes dès la conception.',
        },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps prend l\'ouverture d\'une boutique ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'De 3 à 6 mois en moyenne. Conception et permis : 1-2 mois (dépôt en mairie, validation commission de sécurité). Travaux : 2-3 mois pour un local de 50-100 m² (démolition, électricité, peinture, sol, mobilier). Délai légal pour l\'ouverture : 15 jours après la visite de conformité.',
        },
      },
      {
        '@type': 'Question',
        name: 'Puis-je gérer mon projet commercial depuis l\'étranger ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui. L\'architecte coordonne tout à distance : validation des plans par visio, suivi photos hebdo, gestion des artisans et fournisseurs, réception des travaux en votre absence. Vous intervenez uniquement sur les choix stratégiques (concept, budget, planning). Idéal pour investisseurs internationaux ou franchisés multi-sites.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel budget prévoir pour un cabinet médical ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Entre 30 000 € et 120 000 € selon la spécialité. Cabinet généraliste (60 m²) : 5 000-8 000 € d\'honoraires + 20 000-40 000 € de travaux. Cabinet dentaire ou kinésithérapie (plomberie spécifique, équipement) : jusqu\'à 80 000-100 000 €. Les normes médicales (hygiène, accessibilité, confidentialité) augmentent les coûts de 20-30 %.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment fonctionne la rémunération de l\'architecte commercial ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Trois modes possibles : au forfait (8 000-20 000 € selon complexité), au pourcentage du budget travaux (10-15 %), ou mixte (forfait conception + % sur suivi). Le forfait est préférable pour les petits projets (<100 m²), le pourcentage pour les gros chantiers (>150 m²). Mission complète ou partielle selon vos besoins.',
        },
      },
      {
        '@type': 'Question',
        name: 'Intervenez-vous en dehors de Paris ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui. Notre réseau couvre Paris intra-muros et toute l\'Île-de-France : Neuilly, Boulogne, Levallois, Montreuil, Saint-Denis et les départements 92, 93, 94, 78, 91, 77, 95. Pour les projets en province ou à l\'étranger, nous orientons vers des partenaires de confiance.',
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
      'Service de mise en relation avec des architectes d\'intérieur spécialisés en architecture commerciale à Paris. Restaurants, boutiques, hôtels, cabinets médicaux.',
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
    name: 'Architecture commerciale à Paris',
    description:
      'Service de mise en relation avec des architectes d\'intérieur spécialisés retail et commerce à Paris. Conception et aménagement de restaurants, boutiques, hôtels, cabinets médicaux. Gestion complète : plans, permis, travaux, mobilier.',
    provider: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: 'https://www.haussparis.com',
    },
    areaServed: {
      '@type': 'City',
      name: 'Paris',
    },
    serviceType: 'Architecture commerciale',
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
          minPrice: '8000',
          maxPrice: '20000',
          name: 'Honoraires d\'architecte (forfait ou %)',
        },
        {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          minPrice: '30000',
          maxPrice: '250000',
          name: 'Budget total projet (honoraires + travaux + équipement)',
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

