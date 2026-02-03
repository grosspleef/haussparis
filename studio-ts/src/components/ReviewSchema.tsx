import Script from 'next/script'

type ReviewSchemaProps = {
  ratingValue?: string
  reviewCount?: string
  bestRating?: string
  worstRating?: string
}

export function ReviewSchema({
  ratingValue = '4.9',
  reviewCount = '47',
  bestRating = '5',
  worstRating = '1',
}: ReviewSchemaProps) {
  const aggregateRatingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.haussparis.com/#localbusiness',
    name: 'Hauss Paris',
    image: 'https://www.haussparis.com/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '9 Villa de Guelma',
      addressLocality: 'Paris',
      postalCode: '75018',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.892,
      longitude: 2.3447,
    },
    url: 'https://www.haussparis.com',
    telephone: '+33-6-19-44-92-55',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue,
      bestRating,
      worstRating,
      reviewCount,
    },
  }

  return (
    <Script
      id="aggregate-rating-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(aggregateRatingSchema),
      }}
    />
  )
}
