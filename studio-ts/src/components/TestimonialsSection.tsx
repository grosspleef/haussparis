'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Script from 'next/script'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'

interface Testimonial {
  name: string
  location: string
  text: string
  rating: number
  project: string
}

function StarIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />
    </svg>
  )
}

export function TestimonialsSection() {
  const [showAll, setShowAll] = useState(false)
  const t = useTranslations('TestimonialsSection')

  const testimonials: Testimonial[] = Array.from({ length: 10 }, (_, i) => ({
    name: t(`testimonials.${i + 1}.name`),
    location: t(`testimonials.${i + 1}.location`),
    text: t(`testimonials.${i + 1}.text`),
    rating: 5,
    project: t(`testimonials.${i + 1}.project`),
  }))

  // Generate Schema.org structured data for reviews
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Hauss Paris',
    telephone: '+33-6-19-44-92-55',
    image: 'https://www.haussparis.com/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '9 Villa de Guelma',
      addressLocality: 'Paris',
      postalCode: '75018',
      addressCountry: 'FR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      reviewCount: testimonials.length.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((testimonial) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: testimonial.name,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: testimonial.rating.toString(),
        bestRating: '5',
      },
      reviewBody: testimonial.text,
    })),
  }

  return (
    <>
      <Script
        id="testimonials-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(reviewSchema),
        }}
      />
      <section
        className="mt-24 sm:mt-32 lg:mt-40"
        aria-labelledby="testimonials-heading"
      >
        <Container>
          <FadeIn>
            <h2
              id="testimonials-heading"
              className="font-display text-4xl font-medium tracking-tight text-neutral-950 sm:text-5xl"
            >
              {t('title')}
            </h2>
            <p className="mt-6 text-xl text-neutral-600">
              {t('subtitle')}
            </p>
          </FadeIn>

        <div className="relative mt-16">
          <FadeInStagger faster>
            <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2" role="list">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <FadeIn key={index}>
                  <li
                    className={`relative rounded-3xl bg-neutral-50 p-8 shadow-md shadow-neutral-900/5 ring-1 ring-neutral-900/5 transition hover:shadow-lg hover:shadow-neutral-900/10 ${
                      !showAll && index >= 2 ? 'blur-sm opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-neutral-950">
                          {testimonial.name}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          {testimonial.location}
                        </p>
                        <p className="mt-1 text-sm font-medium text-neutral-700">
                          {testimonial.project}
                        </p>
                      </div>
                      <div
                        className="flex gap-1"
                        role="img"
                        aria-label={`${testimonial.rating} étoiles sur 5`}
                      >
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <StarIcon
                            key={i}
                            className="h-5 w-5 fill-neutral-950"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                    </div>
                    <blockquote className="mt-4 text-base leading-relaxed text-neutral-700">
                      <p className="before:content-['«_'] after:content-['_»']">
                        {testimonial.text}
                      </p>
                    </blockquote>
                  </li>
                </FadeIn>
              ))}
            </ul>
          </FadeInStagger>

          {showAll && (
            <div className="mt-8">
              <FadeInStagger faster>
                <ul className="grid grid-cols-1 gap-8 lg:grid-cols-2" role="list">
                  {testimonials.slice(4).map((testimonial, index) => (
                    <FadeIn key={index + 4}>
                      <li className="relative rounded-3xl bg-neutral-50 p-8 shadow-md shadow-neutral-900/5 ring-1 ring-neutral-900/5 transition hover:shadow-lg hover:shadow-neutral-900/10">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-display text-lg font-semibold text-neutral-950">
                              {testimonial.name}
                            </h3>
                            <p className="text-sm text-neutral-600">
                              {testimonial.location}
                            </p>
                            <p className="mt-1 text-sm font-medium text-neutral-700">
                              {testimonial.project}
                            </p>
                          </div>
                          <div
                            className="flex gap-1"
                            role="img"
                            aria-label={`${testimonial.rating} étoiles sur 5`}
                          >
                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                              <StarIcon
                                key={i}
                                className="h-5 w-5 fill-neutral-950"
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                        <blockquote className="mt-4 text-base leading-relaxed text-neutral-700">
                          <p className="before:content-['«_'] after:content-['_»']">
                            {testimonial.text}
                          </p>
                        </blockquote>
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </FadeInStagger>
            </div>
          )}

          {!showAll && (
            <FadeIn className="flex justify-center mt-12">
              <button
                onClick={() => setShowAll(true)}
                className="text-neutral-950 font-light hover:text-neutral-600 transition cursor-pointer"
                aria-expanded="false"
                aria-controls="additional-testimonials"
              >
                {t('seeMore')}
              </button>
            </FadeIn>
          )}
        </div>
      </Container>
    </section>
    </>
  )
}
