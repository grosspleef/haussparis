import { type Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { ServiceStats } from '@/components/ServiceStats'
import imageHugoBetscher from '@/images/team/hugo-betscher-fondateur-hauss-paris.jpg'
import { loadArticles } from '@/lib/mdx'
import { RootLayout } from '@/components/RootLayout'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import type { Locale } from '@/lib/routes'

async function Culture({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'AboutPage.culture' })
  
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow={t('eyebrow')}
        title={t('title')}
        invert
      >
        <p>{t('description')}</p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title={t('grid1Title')} invert>
            {t('grid1Description')}
          </GridListItem>
          <GridListItem title={t('grid2Title')} invert>
            {t('grid2Description')}
          </GridListItem>
          <GridListItem title={t('grid3Title')} invert>
            {t('grid3Description')}
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

async function Team({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'AboutPage.team' })

  const team = [
    {
      title: t('leadership'),
      people: [
        {
          name: 'Hugo Betscher',
          role: t('founder'),
          image: { src: imageHugoBetscher },
        },
      ],
    },
  ]
  
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person, index) => (
                    <li key={person.name} className={index === 0 ? 'lg:col-start-3' : ''}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'AboutPage.metadata',
  })
  const baseUrl = 'https://www.haussparis.com'
  const canonicalPath = params.locale === 'en' ? '/en/about' : '/fr/a-propos'

  return {
    alternates: {
      canonical: canonicalPath,
      languages: {
        'en': '/en/about',
        'fr': '/fr/a-propos',
        'it': '/it/chi-siamo',
        'de': '/de/uber-uns',
        'es': '/es/sobre-nosotros',
        'x-default': '/en/about',
      },
    },
    title: t('title'),
    description: t('description'),
    openGraph: {
      url: `${baseUrl}${canonicalPath}`,
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'Hauss Paris - About Us',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      images: [`${baseUrl}/og-image.jpg`],
    },
  }
}

// Languages available for this page (from alternates.languages in generateMetadata)
const availableLocales: Locale[] = ['en', 'fr', 'it', 'de', 'es']
const localeUrls: Partial<Record<Locale, string>> = {
  en: '/en/about',
  fr: '/fr/a-propos',
  it: '/it/chi-siamo',
  de: '/de/uber-uns',
  es: '/es/sobre-nosotros',
}

export default async function About(props: Props) {
  const params = await props.params
  setRequestLocale(params.locale)
  const t = await getTranslations('AboutPage')
  const tStats = await getTranslations('AboutPage.stats')
  const tBlog = await getTranslations('AboutPage.blog')

  let blogArticles = (await loadArticles(params.locale)).slice(0, 2)

  return (
    <AvailableLocalesProvider availableLocales={availableLocales} localeUrls={localeUrls}>
    <RootLayout>
      <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>{t('intro1')}</p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>{t('intro2')}</p>
          <p>{t('intro3')}</p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <ServiceStats />
      </Container>

      <Culture locale={params.locale} />

      <Team locale={params.locale} />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title={tBlog('title')}
        intro={tBlog('intro')}
        pages={blogArticles}
        locale={params.locale}
      />

      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}
