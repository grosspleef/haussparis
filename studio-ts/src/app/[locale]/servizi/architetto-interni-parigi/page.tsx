'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { ServiceStats } from '@/components/ServiceStats'
import { StylizedImage } from '@/components/StylizedImage'
import imageSection1 from '@/images/renovation-appartement-paris-avant-projet.jpg'
import imageSection2 from '@/images/conception-3d-architecte-interieur-paris.jpg'
import imageSection3 from '@/images/consultation-architecte-interieur-paris.jpg'
import imageSection4 from '@/images/projet-architecture-conception.jpg'
import { RootLayout } from '@/components/RootLayout'
import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import { routes, locales } from '@/lib/routes'

export default function ArchitecteInterieurParisService() {
  const t = useTranslations('ArchitecteInterieurParisService')
  const params = useParams()
  const locale = (params?.locale as string) || 'it'

  return (
    <AvailableLocalesProvider availableLocales={[...locales]} localeUrls={routes.architecteInterieurParis}>
    <RootLayout>
      <PageIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>{t('intro')}</p>
      </PageIntro>

      <Container className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        {/* Section 1 */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageSection1}
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
                <div className="mt-8">
                  <Link
                    href={`/${locale}/blog/${locale === 'it' ? 'tariffe-architetto-interni-parigi' : 'interior-designer-fees-paris'}`}
                    className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
                  >
                    {t('section1.link')} →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-start lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageSection2}
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
                    href={`/${locale}/contatti`}
                    className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
                  >
                    {t('section2.link')} →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Section 3 */}
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

        {/* Section 4 */}
        <section className="group/section [counter-increment:section]">
          <div className="lg:flex lg:items-center lg:justify-start lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
            <div className="flex justify-center">
              <FadeIn className="w-135 flex-none lg:w-180">
                <StylizedImage
                  src={imageSection4}
                  alt={t('images.section4Alt')}
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
                </div>
                <div className="mt-8">
                  <Link
                    href={`/${locale}/contatti`}
                    className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
                  >
                    {t('section4.link')} →
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </Container>

      {/* GridList Section */}
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
            <GridListItem title={t('gridList.consultation.title')}>
              {t('gridList.consultation.description')}
            </GridListItem>
            <GridListItem title={t('gridList.matching.title')}>
              {t('gridList.matching.description')}
            </GridListItem>
            <GridListItem title={t('gridList.design.title')}>
              {t('gridList.design.description')}
            </GridListItem>
            <GridListItem title={t('gridList.execution.title')}>
              {t('gridList.execution.description')}
            </GridListItem>
          </GridList>
        </Container>
      </div>

      {/* Stats Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <ServiceStats />
      </Container>

      {/* Pricing Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            {t('pricing.title')}
          </h2>
          <p className="mt-6 text-base text-neutral-600">{t('pricing.intro')}</p>

          <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Honoraires */}
            <div className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="font-display text-xl font-semibold text-neutral-950">
                {t('pricing.fees.title')}
              </h3>
              <dl className="mt-8 space-y-4">
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <dt className="text-sm text-neutral-600">
                    {t('pricing.fees.consultation.label')}
                  </dt>
                  <dd className="text-sm font-semibold text-neutral-950">
                    {t('pricing.fees.consultation.price')}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <dt className="text-sm text-neutral-600">{t('pricing.fees.study.label')}</dt>
                  <dd className="text-sm font-semibold text-neutral-950">
                    {t('pricing.fees.study.price')}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <dt className="text-sm text-neutral-600">{t('pricing.fees.full.label')}</dt>
                  <dd className="text-sm font-semibold text-neutral-950">
                    {t('pricing.fees.full.price')}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Travaux */}
            <div className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="font-display text-xl font-semibold text-neutral-950">
                {t('pricing.works.title')}
              </h3>
              <dl className="mt-8 space-y-4">
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <dt className="text-sm text-neutral-600">
                    {t('pricing.works.refresh.label')}
                  </dt>
                  <dd className="text-sm font-semibold text-neutral-950">
                    {t('pricing.works.refresh.price')}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <dt className="text-sm text-neutral-600">
                    {t('pricing.works.partial.label')}
                  </dt>
                  <dd className="text-sm font-semibold text-neutral-950">
                    {t('pricing.works.partial.price')}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <dt className="text-sm text-neutral-600">
                    {t('pricing.works.complete.label')}
                  </dt>
                  <dd className="text-sm font-semibold text-neutral-950">
                    {t('pricing.works.complete.price')}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-4">
                  <dt className="text-sm text-neutral-600">
                    {t('pricing.works.highend.label')}
                  </dt>
                  <dd className="text-sm font-semibold text-neutral-950">
                    {t('pricing.works.highend.price')}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-neutral-600">{t('pricing.works.heavy.label')}</dt>
                  <dd className="text-sm font-semibold text-neutral-950">
                    {t('pricing.works.heavy.price')}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Example */}
          <div className="mt-8 rounded-3xl bg-neutral-50 p-8">
            <h3 className="font-display text-xl font-semibold text-neutral-950">
              {t('pricing.example.title')}
            </h3>
            <p className="mt-4 text-sm text-neutral-600">
              {t('pricing.example.description')}
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-600">
              <li>• {t('pricing.example.works')}</li>
              <li>• {t('pricing.example.fees')}</li>
              <li className="font-semibold text-neutral-950">
                • {t('pricing.example.total')}
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link
              href={`/${locale}/blog/${locale === 'it' ? 'tariffe-architetto-interni-parigi' : 'interior-designer-fees-paris'}`}
              className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
            >
              {t('pricing.link')} →
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
            <div className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {t('projects.haussmann.title')}
              </h3>
              <p className="mt-4 text-sm text-neutral-600">
                {t('projects.haussmann.description')}
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {t('projects.rooftop.title')}
              </h3>
              <p className="mt-4 text-sm text-neutral-600">
                {t('projects.rooftop.description')}
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {t('projects.piedaterre.title')}
              </h3>
              <p className="mt-4 text-sm text-neutral-600">
                {t('projects.piedaterre.description')}
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {t('projects.investment.title')}
              </h3>
              <p className="mt-4 text-sm text-neutral-600">
                {t('projects.investment.description')}
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {t('projects.studio.title')}
              </h3>
              <p className="mt-4 text-sm text-neutral-600">
                {t('projects.studio.description')}
              </p>
            </div>
            <div className="rounded-3xl border border-neutral-200 p-8">
              <h3 className="font-display text-lg font-semibold text-neutral-950">
                {t('distinctions.remote.title')}
              </h3>
              <p className="mt-4 text-sm text-neutral-600">
                {t('distinctions.remote.description')}
              </p>
            </div>
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
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
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
                  href={`/${locale}/contatti`}
                  className="inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-neutral-950 hover:bg-neutral-100"
                >
                  {t('cta.button')}
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </Container>

      {/* Link to related blog post */}
      <Container className="mt-16">
        <FadeIn>
          <div className="rounded-3xl border border-neutral-200 p-8">
            <h3 className="font-display text-lg font-semibold text-neutral-950">
              {t('relatedBlog.title')}
            </h3>
            <p className="mt-4 text-sm text-neutral-600">
              {t('relatedBlog.description')}
            </p>
            <div className="mt-6">
              <Link
                href={`/${locale}/blog/${locale === 'it' ? 'ristrutturazione-appartamento-parigi-guida-completa' : 'apartment-renovation-paris-complete-guide'}`}
                className="inline-flex items-center text-sm font-semibold text-neutral-950 hover:text-neutral-700"
              >
                {t('relatedBlog.link')} →
              </Link>
            </div>
          </div>
        </FadeIn>
      </Container>

      <ContactSection />
    </RootLayout>
    </AvailableLocalesProvider>
  )
}
