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
        name: 'Quelle différence entre décorateur et architecte d\'intérieur ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le décorateur intervient uniquement sur l\'habillage (mobilier, couleurs, accessoires) sans toucher à la structure. L\'architecte d\'intérieur peut modifier les cloisons, refaire l\'électricité et la plomberie. Budget et délais sont très différents : 5-50k€ en 3-8 semaines pour le décorateur, 30-200k€+ en 3-6 mois pour l\'architecte.',
        },
      },
      {
        '@type': 'Question',
        name: 'Puis-je gérer mon projet de décoration depuis l\'étranger ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolument. C\'est même l\'un de nos cas d\'usage principaux. Tout se fait à distance : sélection du mobilier en visioconférence ou par email, livraisons coordonnées, installation supervisée par le décorateur. Vous recevez des photos à chaque étape et récupérez un appartement prêt à vivre.',
        },
      },
      {
        '@type': 'Question',
        name: 'Quel budget minimum pour faire appel à un décorateur ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'À partir de 5 000 € (mobilier + honoraires), vous pouvez rafraîchir un espace avec de nouveaux textiles, accessoires et quelques meubles clés. Pour un ameublement complet d\'un studio ou 2 pièces, comptez 15 000 € à 25 000 €.',
        },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps prend un projet de décoration ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'De 3 à 8 semaines selon l\'ampleur : 3-4 semaines pour un refresh partiel, 6-8 semaines pour un ameublement complet. Les délais dépendent surtout des délais de livraison du mobilier (2-6 semaines en général).',
        },
      },
      {
        '@type': 'Question',
        name: 'Le décorateur peut-il m\'aider pour un Airbnb ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, plusieurs décorateurs de notre réseau sont spécialisés dans les locations saisonnières. Ils connaissent les codes visuels qui plaisent sur Airbnb, privilégient des matériaux robustes et optimisent le rapport qualité/prix pour maximiser votre rentabilité.',
        },
      },
      {
        '@type': 'Question',
        name: 'Comment fonctionne la rémunération du décorateur ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Soit un forfait pour le concept déco (800-1500€), soit un pourcentage sur le budget mobilier pour une mission complète (15-25%). Certains décorateurs combinent les deux : forfait pour la conception + pourcentage réduit sur le sourcing. Tout est transparent dès le devis.',
        },
      },
      {
        '@type': 'Question',
        name: 'Puis-je fournir mes propres meubles et ne payer que pour le conseil ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, vous pouvez opter pour une mission « conseil uniquement » : le décorateur vous remet planches d\'ambiance, liste shopping avec références et plan d\'agencement. Vous gérez ensuite les commandes et l\'installation vous-même. Tarif : 800 € à 1 500 € selon la surface.',
        },
      },
      {
        '@type': 'Question',
        name: 'Intervenez-vous en dehors de Paris ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui. Notre réseau couvre Paris intra-muros et toute l\'Île-de-France : Neuilly, Boulogne, Versailles, Saint-Cloud et les départements 92, 93, 94, 78, 91, 77, 95.',
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
