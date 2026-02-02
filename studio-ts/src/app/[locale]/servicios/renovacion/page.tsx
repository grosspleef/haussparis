'use client'

import { useTranslations } from 'next-intl'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { StylizedImage } from '@/components/StylizedImage'
import imageLaptop from '@/images/conception-3d-architecte-interieur-paris.jpg'
import imageWhiteboard from '@/images/renovation-appartement-paris-avant-projet.jpg'
import { RootLayout } from '@/components/RootLayout'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import { routes, locales } from '@/lib/routes'

export default function RenovacionService() {
  const t = useTranslations('RenovationService')

  return (
    <AvailableLocalesProvider availableLocales={[...locales]} localeUrls={routes.renovation}>
    <RootLayout>
      <PageIntro
        eyebrow={t('eyebrow')}
        title={t('title')}
      >
        <p>{t('intro')}</p>
      </PageIntro>

      <Container className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageWhiteboard}
                  alt="Avant-projet de rénovation d'appartement à Paris"
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

        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-start lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageLaptop}
                  alt="Conception 3D par architecte d'intérieur à Paris"
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
              </FadeIn>
            </div>
          </div>
        </section>
      </Container>

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
            <GridListItem title={t('gridList.preliminary.title')}>
              {t('gridList.preliminary.description')}
            </GridListItem>
            <GridListItem title={t('gridList.detailed.title')}>
              {t('gridList.detailed.description')}
            </GridListItem>
            <GridListItem title={t('gridList.coordination.title')}>
              {t('gridList.coordination.description')}
            </GridListItem>
            <GridListItem title={t('gridList.turnkey.title')}>
              {t('gridList.turnkey.description')}
            </GridListItem>
          </GridList>
        </Container>
      </div>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <StatList>
          <StatListItem value="100%" label={t('stats.delivered')} />
          <StatListItem value="15+" label={t('stats.experience')} />
          <StatListItem value="500+" label={t('stats.transformed')} />
        </StatList>
      </Container>

      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}

