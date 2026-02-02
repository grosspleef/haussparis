import { type Metadata } from 'next'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { RootLayout } from '@/components/RootLayout'
import { ContactForm } from '@/components/ContactForm'

function ContactDetails() {
  const t = useTranslations('ContactPage')
  
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        {t('ourOffice')}
      </h2>

      <Offices className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t('contactUs')}
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {[
            [t('email'), 'contact@haussparis.com'],
            [t('phone'), '+33 6 19 44 92 55'],
          ].map(([label, value]) => (
            <div key={value}>
              <dt className="font-semibold text-neutral-950">{label}</dt>
              <dd>
                {label === t('email') ? (
                  <Link
                    href={`mailto:${value}`}
                    className="text-neutral-600 hover:text-neutral-950"
                  >
                    {value}
                  </Link>
                ) : (
                  <Link
                    href={`tel:${value.replace(/\s/g, '')}`}
                    className="text-neutral-600 hover:text-neutral-950"
                  >
                    {value}
                  </Link>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Border>

      <Border className="mt-16 pt-16">
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t('messaging')}
        </h2>
        <SocialMedia className="mt-6" />
      </Border>
    </FadeIn>
  )
}

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'ContactPage.metadata',
  })
  const baseUrl = 'https://www.haussparis.com'
  const canonicalPath = '/it/contatti'

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': '/en/contact',
        'fr': '/fr/contact',
        'it': '/it/contatti',
        'x-default': '/en/contact',
      },
    },
    title: 'Contatti',
    description: t('description'),
    openGraph: {
      url: `${baseUrl}${canonicalPath}`,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Hauss Paris - Contattaci',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`${baseUrl}/og-image.jpg`],
    },
  }
}

export default async function Contatti(props: Props) {
  const params = await props.params
  setRequestLocale(params.locale)
  const t = await getTranslations('ContactPage')
  
  return (
    <RootLayout>
      <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>{t('description')}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </RootLayout>
  )
}

