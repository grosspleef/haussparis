'use client'

import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import { StylizedImage } from '@/components/StylizedImage'
import imageLaptop from '@/images/architecture-commerciale-paris.jpg'
import imageWhiteboard from '@/images/design-boutique-commerce-paris.jpg'
import { RootLayout } from '@/components/RootLayout'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import { routes, locales } from '@/lib/routes'

export default function CommercialDesignService() {
  const t = useTranslations('CommercialDesignService')
  const params = useParams()
  const locale = (params?.locale as string) || 'fr'
  const tarifsUrl =
    locale === 'en'
      ? '/blog/interior-designer-fees-paris'
      : '/blog/tarif-architecte-interieur-paris'

  return (
    <AvailableLocalesProvider availableLocales={[...locales]} localeUrls={routes.commercialDesign}>
    <RootLayout>
      <PageIntro eyebrow={t('metadata.eyebrow')} title={t('metadata.title')}>
        <p>{t('metadata.description')}</p>
      </PageIntro>

      <Container className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        {/* Section 1: Votre projet commercial entre les mains d'experts */}
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
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section1.paragraph3') }} />
                </div>
                <div className="mt-8">
                  <Link
                    href={tarifsUrl}
                    className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
                  >
                    {t('section1.link')} →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 2: Pourquoi choisir un architecte spécialisé commerce ? */}
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
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section2.paragraph3') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 3: Restaurants et cafés à Paris */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageWhiteboard}
                  alt="Design de boutique et commerce à Paris"
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
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section3.paragraph3') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 4: Boutiques et commerces retail */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-start lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageLaptop}
                  alt="Architecture commerciale à Paris"
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
                  {t('section4.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section4.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section4.paragraph2') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section4.paragraph3') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 5: Hôtels et espaces d'accueil */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageWhiteboard}
                  alt="Design de boutique et commerce à Paris"
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
                  {t('section5.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section5.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section5.paragraph2') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section5.paragraph3') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 6: Cabinets médicaux et paramédicaux */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-start lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageLaptop}
                  alt="Architecture commerciale à Paris"
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
                  {t('section6.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section6.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section6.paragraph2') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section6.paragraph3') }} />
                </div>
                <div className="mt-8">
                  <Link
                    href="/fr/contact"
                    className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
                  >
                    Estimer mon projet →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 7: Bureaux et espaces de coworking */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageWhiteboard}
                  alt="Design de boutique et commerce à Paris"
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
                  {t('section7.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section7.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section7.paragraph2') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section7.paragraph3') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 8: Showrooms et espaces événementiels */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-start lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageLaptop}
                  alt="Architecture commerciale à Paris"
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
                  {t('section8.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section8.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section8.paragraph2') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section8.paragraph3') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 9: Normes et réglementation ERP */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageWhiteboard}
                  alt="Design de boutique et commerce à Paris"
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
                  {t('section9.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section9.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section9.paragraph2') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section9.paragraph3') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 10: Gestion de projet clés en main */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-start lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageLaptop}
                  alt="Architecture commerciale à Paris"
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
                  {t('section10.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section10.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section10.paragraph2') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section10.paragraph3') }} />
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 11: Architecture commerciale à Paris et Île-de-France */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageWhiteboard}
                  alt="Design de boutique et commerce à Paris"
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
                  {t('section11.title')}
                </h2>
                <div className="mt-6 space-y-6 text-base text-neutral-600">
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section11.paragraph1') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section11.paragraph2') }} />
                  <p dangerouslySetInnerHTML={{ __html: t.raw('section11.paragraph3') }} />
                </div>
                <div className="mt-8">
                  <Link
                    href="/fr/contact"
                    className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
                  >
                    Démarrer mon projet →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </Container>

      {/* GridList Section: Processus */}
      <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
        <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-linear-to-b from-neutral-50">
          <GridPattern
            className="absolute inset-0 h-full w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-100 stroke-neutral-950/5"
            yOffset={-270}
          />
        </div>

        <SectionIntro
          eyebrow={t('gridList.eyebrow')}
          title={t('gridList.title')}
        >
          <p>{t('gridList.description')}</p>
        </SectionIntro>

        <Container className="mt-24">
          <GridList lgColumns={2}>
            <GridListItem title={t('gridList.audit.title')}>
              {t('gridList.audit.description')}
            </GridListItem>
            <GridListItem title={t('gridList.concept.title')}>
              {t('gridList.concept.description')}
            </GridListItem>
            <GridListItem title={t('gridList.permits.title')}>
              {t('gridList.permits.description')}
            </GridListItem>
            <GridListItem title={t('gridList.execution.title')}>
              {t('gridList.execution.description')}
            </GridListItem>
          </GridList>
        </Container>
      </div>

      {/* Stats Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <StatList>
          <StatListItem value="150+" label={t('stats.projects')} />
          <StatListItem value="25+" label={t('stats.architects')} />
          <StatListItem value="4-6 mois" label={t('stats.timeline')} />
        </StatList>
      </Container>

      {/* Pricing Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            {t('pricing.title')}
          </h2>
          <p className="mt-6 text-base text-neutral-600">{t('pricing.intro')}</p>

          <div className="mt-16 space-y-16">
            {/* Budget Restaurant */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-neutral-950">
                {t('pricing.restaurant.title')}
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.restaurant.budget1.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.restaurant.budget1.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.restaurant.budget1.description')}
                  </p>
                </div>
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.restaurant.budget2.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.restaurant.budget2.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.restaurant.budget2.description')}
                  </p>
                </div>
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.restaurant.budget3.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.restaurant.budget3.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.restaurant.budget3.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Hôtel */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-neutral-950">
                {t('pricing.hotel.title')}
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.hotel.budget1.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.hotel.budget1.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.hotel.budget1.description')}
                  </p>
                </div>
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.hotel.budget2.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.hotel.budget2.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.hotel.budget2.description')}
                  </p>
                </div>
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.hotel.budget3.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.hotel.budget3.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.hotel.budget3.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Boutique */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-neutral-950">
                {t('pricing.retail.title')}
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.retail.budget1.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.retail.budget1.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.retail.budget1.description')}
                  </p>
                </div>
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.retail.budget2.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.retail.budget2.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.retail.budget2.description')}
                  </p>
                </div>
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.retail.budget3.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.retail.budget3.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.retail.budget3.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Budget Cabinet médical */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-neutral-950">
                {t('pricing.medical.title')}
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.medical.budget1.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.medical.budget1.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.medical.budget1.description')}
                  </p>
                </div>
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.medical.budget2.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.medical.budget2.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.medical.budget2.description')}
                  </p>
                </div>
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.medical.budget3.label')}
                  </h4>
                  <p className="mt-4 text-2xl font-bold text-neutral-950">
                    {t('pricing.medical.budget3.price')}
                  </p>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.medical.budget3.description')}
                  </p>
                </div>
              </div>
            </div>

            {/* Honoraires d'architecte */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-neutral-950">
                {t('pricing.fees.title')}
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <dl className="space-y-4">
                    <div className="flex justify-between border-b border-neutral-100 pb-4">
                      <dt className="text-sm text-neutral-600">
                        {t('pricing.fees.consultation.label')}
                      </dt>
                      <dd className="text-sm font-semibold text-neutral-950">
                        {t('pricing.fees.consultation.price')}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-4">
                      <dt className="text-sm text-neutral-600">
                        {t('pricing.fees.design.label')}
                      </dt>
                      <dd className="text-sm font-semibold text-neutral-950">
                        {t('pricing.fees.design.price')}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-4">
                      <dt className="text-sm text-neutral-600">
                        {t('pricing.fees.full.label')}
                      </dt>
                      <dd className="text-sm font-semibold text-neutral-950">
                        {t('pricing.fees.full.price')}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-neutral-600">
                        {t('pricing.fees.turnkey.label')}
                      </dt>
                      <dd className="text-sm font-semibold text-neutral-950">
                        {t('pricing.fees.turnkey.price')}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-3xl bg-neutral-50 p-8">
                  <p className="text-sm text-neutral-600">
                    {t('pricing.fees.note')}
                  </p>
                </div>
              </div>
            </div>

            {/* Coût des travaux */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-neutral-950">
                {t('pricing.workCosts.title')}
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-3xl border border-neutral-200 p-8">
                  <dl className="space-y-4">
                    <div className="flex justify-between border-b border-neutral-100 pb-4">
                      <dt className="text-sm text-neutral-600">
                        {t('pricing.workCosts.demolition.label')}
                      </dt>
                      <dd className="text-sm font-semibold text-neutral-950">
                        {t('pricing.workCosts.demolition.price')}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-4">
                      <dt className="text-sm text-neutral-600">
                        {t('pricing.workCosts.electricity.label')}
                      </dt>
                      <dd className="text-sm font-semibold text-neutral-950">
                        {t('pricing.workCosts.electricity.price')}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-4">
                      <dt className="text-sm text-neutral-600">
                        {t('pricing.workCosts.plumbing.label')}
                      </dt>
                      <dd className="text-sm font-semibold text-neutral-950">
                        {t('pricing.workCosts.plumbing.price')}
                      </dd>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-4">
                      <dt className="text-sm text-neutral-600">
                        {t('pricing.workCosts.finishes.label')}
                      </dt>
                      <dd className="text-sm font-semibold text-neutral-950">
                        {t('pricing.workCosts.finishes.price')}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-sm text-neutral-600">
                        {t('pricing.workCosts.furniture.label')}
                      </dt>
                      <dd className="text-sm font-semibold text-neutral-950">
                        {t('pricing.workCosts.furniture.price')}
                      </dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-3xl bg-neutral-50 p-8">
                  <p className="text-sm text-neutral-600">
                    {t('pricing.workCosts.note')}
                  </p>
                </div>
              </div>
            </div>

            {/* Exemples de projets */}
            <div>
              <h3 className="font-display text-2xl font-semibold text-neutral-950">
                {t('pricing.examples.title')}
              </h3>
              <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="rounded-3xl bg-neutral-50 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.examples.example1.title')}
                  </h4>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.examples.example1.description')}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                    <li>• {t('pricing.examples.example1.fees')}</li>
                    <li>• {t('pricing.examples.example1.works')}</li>
                    <li>• {t('pricing.examples.example1.equipment')}</li>
                    <li className="font-semibold text-neutral-950">
                      • {t('pricing.examples.example1.total')}
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl bg-neutral-50 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.examples.example2.title')}
                  </h4>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.examples.example2.description')}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                    <li>• {t('pricing.examples.example2.fees')}</li>
                    <li>• {t('pricing.examples.example2.works')}</li>
                    <li>• {t('pricing.examples.example2.furniture')}</li>
                    <li className="font-semibold text-neutral-950">
                      • {t('pricing.examples.example2.total')}
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl bg-neutral-50 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.examples.example3.title')}
                  </h4>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.examples.example3.description')}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                    <li>• {t('pricing.examples.example3.fees')}</li>
                    <li>• {t('pricing.examples.example3.works')}</li>
                    <li>• {t('pricing.examples.example3.equipment')}</li>
                    <li className="font-semibold text-neutral-950">
                      • {t('pricing.examples.example3.total')}
                    </li>
                  </ul>
                </div>
                <div className="rounded-3xl bg-neutral-50 p-8">
                  <h4 className="font-display text-lg font-semibold text-neutral-950">
                    {t('pricing.examples.example4.title')}
                  </h4>
                  <p className="mt-4 text-sm text-neutral-600">
                    {t('pricing.examples.example4.description')}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-600">
                    <li>• {t('pricing.examples.example4.fees')}</li>
                    <li>• {t('pricing.examples.example4.works')}</li>
                    <li>• {t('pricing.examples.example4.equipment')}</li>
                    <li className="font-semibold text-neutral-950">
                      • {t('pricing.examples.example4.total')}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <Link
              href={tarifsUrl}
              className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
            >
              Voir tous les tarifs →
            </Link>
          </div>
        </FadeIn>
      </Container>

      {/* Projects Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            {t('projects.title')}
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="rounded-3xl border border-neutral-200 p-8">
                <h3 className="font-display text-lg font-semibold text-neutral-950">
                  {t(`projects.p${num}.title`)}
                </h3>
                <p className="mt-4 text-sm text-neutral-600">
                  {t(`projects.p${num}.description`)}
                </p>
                <dl className="mt-6 space-y-2 text-xs text-neutral-600">
                  <div>
                    <dt className="font-semibold">Budget:</dt>
                    <dd>{t(`projects.p${num}.budget`)}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold">Délai:</dt>
                    <dd>{t(`projects.p${num}.timeline`)}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </FadeIn>
      </Container>

      {/* FAQ Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            {t('faq.title')}
          </h2>
          <dl className="mt-16 space-y-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
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

      {/* Testimonials Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            {t('testimonials.title')}
          </h2>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((num) => (
              <div
                key={num}
                className="rounded-3xl border border-neutral-200 bg-neutral-50 p-8"
              >
                <blockquote className="text-sm text-neutral-600">
                  &ldquo;{t(`testimonials.t${num}.quote`)}&rdquo;
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-neutral-950">
                    {t(`testimonials.t${num}.author`)}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {t(`testimonials.t${num}.location`)}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {t(`testimonials.t${num}.project`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
                  href="/fr/contact"
                  className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-100"
                >
                  {t('cta.button')}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>

      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}
