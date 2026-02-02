import Script from 'next/script'

type OrganizationSchema = {
  '@context': 'https://schema.org'
  '@type': 'Organization'
  name: string
  url: string
  logo?: string
  contactPoint?: {
    '@type': 'ContactPoint'
    telephone: string
    contactType: string
    email?: string
    areaServed?: string
  }
  address?: {
    '@type': 'PostalAddress'
    addressLocality: string
    addressCountry: string
  }
  sameAs?: string[]
}

type BreadcrumbSchema = {
  '@context': 'https://schema.org'
  '@type': 'BreadcrumbList'
  itemListElement: Array<{
    '@type': 'ListItem'
    position: number
    name: string
    item: string
  }>
}

type ServiceSchema = {
  '@context': 'https://schema.org'
  '@type': 'Service'
  name: string
  description: string
  provider: {
    '@type': 'Organization'
    name: string
  }
  areaServed: {
    '@type': 'Country'
    name: string
  }
}

type LocalBusinessSchema = {
  '@context': 'https://schema.org'
  '@type': 'LocalBusiness'
  '@id': string
  name: string
  description: string
  url: string
  logo: string
  image: string
  telephone: string
  email: string
  priceRange: string
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    postalCode: string
    addressCountry: string
  }
  geo?: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification'
    dayOfWeek: string[]
    opens: string
    closes: string
  }
  areaServed: {
    '@type': 'City'
    name: string
  }[]
}

type Props = {
  organization?: OrganizationSchema
  breadcrumbs?: BreadcrumbSchema
  service?: ServiceSchema
  localBusiness?: LocalBusinessSchema
}

export function StructuredData({ organization, breadcrumbs, service, localBusiness }: Props) {
  const schemas = []

  if (organization) {
    schemas.push(organization)
  }

  if (breadcrumbs) {
    schemas.push(breadcrumbs)
  }

  if (service) {
    schemas.push(service)
  }

  if (localBusiness) {
    schemas.push(localBusiness)
  }

  if (schemas.length === 0) {
    return null
  }

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schemas.length === 1 ? schemas[0] : schemas),
      }}
    />
  )
}

