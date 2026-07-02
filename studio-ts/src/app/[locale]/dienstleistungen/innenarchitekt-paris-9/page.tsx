'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { ArrondissementLinks } from '@/components/ArrondissementLinks'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { ServiceStats } from '@/components/ServiceStats'
import { StylizedImage } from '@/components/StylizedImage'
import imageLaptop from '@/images/architecte-interieur-paris-9-opera.jpg'
import imageWhiteboard from '@/images/renovation-appartement-paris-avant-projet.jpg'
import imageSection3 from '@/images/salon-haussmannien-paris-architecte-interieur.jpg'
import { RootLayout } from '@/components/RootLayout'
import { ArrondissementSchema } from '@/components/ArrondissementSchema'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import { routes, locales } from '@/lib/routes'

export default function InnenarchitektParis9Service() {
  const t = useTranslations('ArchitecteParis9Service')
  const params = useParams()
  const locale = (params?.locale as string) || 'en'

  const startUrl = (locale === 'en' ? '/en/start' : locale === 'fr' ? '/fr/demarrer' : locale === 'it' ? '/it/inizia' : locale === 'de' ? '/de/projekt-starten' : '/es/empezar') + '?arr=9'
  const mainServiceUrl = locale === 'en' ? '/en/services/interior-designer-paris' : locale === 'fr' ? '/fr/services/architecte-interieur-paris' : locale === 'it' ? '/it/servizi/architetto-interni-parigi' : locale === 'de' ? '/de/dienstleistungen/innenarchitekt-paris' : '/es/servicios/disenador-interiores-paris'

  return (
    <AvailableLocalesProvider availableLocales={[...locales]} localeUrls={routes.architecteInterieurParis9}>
    <RootLayout>
      <ArrondissementSchema namespace="ArchitecteParis9Service" arrondissement={9} />
      <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>{t('intro')}</p>
      </PageIntro>

      <Container className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        {/* Section 1: The Neighborhood */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageWhiteboard}
                  alt={t('images.section1Alt')}
                  sizes="(min-width: 1024px) 41rem, 31rem"
                  className="justify-center lg:justify-end"
                />
              </FadeIn>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-148 lg:flex-none">
              <FadeIn>
                <div
                  className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
                  aria-hidden="true"
                />
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                  {t('section1.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section1.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section1.paragraph2') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 2: Typical Projects */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-start lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageLaptop}
                  alt={t('images.section2Alt')}
                  shape={1}
                  sizes="(min-width: 1024px) 41rem, 31rem"
                  className="justify-center lg:justify-start"
                />
              </FadeIn>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-148 lg:flex-none lg:order-first">
              <FadeIn>
                <div
                  className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
                  aria-hidden="true"
                />
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                  {t('section2.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section2.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section2.paragraph2') }} />
                </div>
                <div className="mt-8">
                  <Link
                    href={startUrl}
                    className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
                  >
                    {t('section2.cta')} →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 3: Our Expertise */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageSection3}
                  alt={t('images.section3Alt')}
                  sizes="(min-width: 1024px) 41rem, 31rem"
                  className="justify-center lg:justify-end"
                />
              </FadeIn>
            </div>
            <div className="mt-12 lg:mt-0 lg:w-148 lg:flex-none">
              <FadeIn>
                <div
                  className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
                  aria-hidden="true"
                />
                <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
                  {t('section3.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section3.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section3.paragraph2') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </Container>

      {/* GridList Section: Services */}
      <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
        <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-linear-to-b from-neutral-50">
          <GridPattern
            className="absolute inset-0 h-full w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-100 stroke-neutral-950/5"
            yOffset={-270}
          />
        </div>

        <SectionIntro
          eyebrow={t('sectionIntro.eyebrow')}
          title={t('sectionIntro.title')}
        >
          <p>{t('sectionIntro.description')}</p>
        </SectionIntro>

        <Container className="mt-24">
          <GridList lgColumns={2}>
            <GridListItem title={t('gridList.renovation.title')}>
              {t('gridList.renovation.description')}
            </GridListItem>
            <GridListItem title={t('gridList.layout.title')}>
              {t('gridList.layout.description')}
            </GridListItem>
            <GridListItem title={t('gridList.decoration.title')}>
              {t('gridList.decoration.description')}
            </GridListItem>
            <GridListItem title={t('gridList.furnishing.title')}>
              {t('gridList.furnishing.description')}
            </GridListItem>
          </GridList>
        </Container>
      </div>

      {/* Stats Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <ServiceStats />
      </Container>

      {/* FAQ Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            {t('faq.title')}
          </h2>
          <dl className="mt-16 space-y-8">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="border-b border-neutral-200 pb-8">
                <dt className="font-display text-lg font-semibold text-neutral-950">
                  {t(`faq.q${num}.question`)}
                </dt>
                <dd className="mt-4 text-base text-neutral-600">
                  {t(`faq.q${num}.answer`)}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </Container>

      {/* CTA Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="rounded-4xl bg-neutral-950 px-6 py-20 sm:px-6 sm:py-32 md:px-12">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="font-display text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {t('cta.title')}
              </h2>
              <p className="mt-6 text-lg text-neutral-300">{t('cta.description')}</p>
              <div className="mt-10">
                <Link
                  href={startUrl}
                  className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-100"
                >
                  {t('cta.button')}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* Link to main Interior Designer Paris page */}
      <Container className="mt-16">
        <FadeIn>
          <div className="rounded-3xl border border-neutral-200 p-8">
            <h3 className="font-display text-lg font-semibold text-neutral-950">
              {t('mainServiceLink.title')}
            </h3>
            <p className="mt-4 text-sm text-neutral-600">
              {t('mainServiceLink.description')}
            </p>
            <div className="mt-6">
              <Link
                href={mainServiceUrl}
                className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
              >
                {t('mainServiceLink.link')} →
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>

      <ArrondissementLinks current={9} />
      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}
