'use client'

import { type ComponentPropsWithoutRef, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/travail-architecte-interieur-conception.jpg'
import imageMeeting from '@/images/consultation-architecte-interieur-paris.jpg'
import imageWhiteboard from '@/images/planification-projet-renovation-paris.jpg'
import imageSalonHomeStaging from '@/images/home-staging-salon-architecte-interieur.jpg'
import imageBoutiqueHotelLobby from '@/images/boutique-hotel-lobby-architecte-interieur.jpg'
import imageDecorationHautDeGamme from '@/images/decoration-interieure-paris-haut-de-gamme.jpg'
import imageBureauDomicile from '@/images/bureau-domicile-appartement-haussmannien.jpg'
import imageCuisineOuverte from '@/images/amenagement-cuisine-ouverte-paris.jpg'
import imageSalleDeBainLuxe from '@/images/salle-de-bain-luxe-renovation-paris.jpg'

type SectionProps = {
  title: string
  image: ComponentPropsWithoutRef<typeof StylizedImage>
  children: ReactNode
}

function Section({ title, image, children }: SectionProps) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-135 flex-none lg:w-180">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-148 lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

type SectionOverrideProps = {
  title?: string
}

//
// Sections for the Home Page
//

export function HomeDiscoverSection({
  title,
}: SectionOverrideProps) {
  const t = useTranslations('ProcessSections.homeDiscover')
  const displayTitle = title || t('title')

  return (
    <Section title={displayTitle} image={{ src: imageSalonHomeStaging, priority: true, alt: "Salon contemporain lumineux mis en valeur par home staging, réalisation d'architecture d'intérieur" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph1') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph2') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph3') }} />
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        {t('includedTitle')}
      </h3>
      <TagList className="mt-4">
        <TagListItem>{t('tags.needsAnalysis')}</TagListItem>
        <TagListItem>{t('tags.architectSelection')}</TagListItem>
        <TagListItem>{t('tags.qualifiedConnection')}</TagListItem>
        <TagListItem>{t('tags.referenceCheck')}</TagListItem>
        <TagListItem>{t('tags.relationshipFollowup')}</TagListItem>
      </TagList>
    </Section>
  )
}

export function HomeBuildSection({ title }: SectionOverrideProps) {
  const t = useTranslations('ProcessSections.homeBuild')
  const displayTitle = title || t('title')
  
  return (
    <Section title={displayTitle} image={{ src: imageBoutiqueHotelLobby, shape: 1, alt: "Lobby d'un boutique-hôtel aménagé par un architecte d'intérieur" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph1') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph2') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph3') }} />
      </div>
    </Section>
  )
}

//
// Sections for the Process Page
//

export function ProcessDiscoverSection({
  title,
}: SectionOverrideProps) {
  const t = useTranslations('ProcessPage.discover')
  const displayTitle = title || t('title')
  
  return (
    <Section title={displayTitle} image={{ src: imageBureauDomicile, alt: "Bureau à domicile dans un appartement haussmannien" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph1') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph2') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph3') }} />
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        {t('supportTitle')}
      </h3>
      <TagList className="mt-4">
        <TagListItem>{t('tags.needsAudit')}</TagListItem>
        <TagListItem>{t('tags.styleClarification')}</TagListItem>
        <TagListItem>{t('tags.budgetFraming')}</TagListItem>
        <TagListItem>{t('tags.planningDefinition')}</TagListItem>
        <TagListItem>{t('tags.briefWriting')}</TagListItem>
      </TagList>
    </Section>
  )
}

export function ProcessBuildSection({ title }: SectionOverrideProps) {
  const t = useTranslations('ProcessPage.build')
  const displayTitle = title || t('title')
  
  return (
    <Section title={displayTitle} image={{ src: imageCuisineOuverte, shape: 1, alt: "Aménagement cuisine ouverte à Paris" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph1') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph2') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph3') }} />
      </div>
    </Section>
  )
}

export function ProcessDeliverSection() {
  const t = useTranslations('ProcessPage.deliver')
  
  return (
    <Section title={t('title')} image={{ src: imageSalleDeBainLuxe, shape: 2, alt: "Salle de bain de luxe rénovée à Paris" }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph1') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph2') }} />
        <p dangerouslySetInnerHTML={{ __html: t.raw('paragraph3') }} />
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        {t('guaranteesTitle')}
      </h3>
      <List className="mt-8">
        <ListItem title={t('guarantees.excellence.title')}>
          {t('guarantees.excellence.description')}
        </ListItem>
        <ListItem title={t('guarantees.mobility.title')}>
          {t('guarantees.mobility.description')}
        </ListItem>
        <ListItem title={t('guarantees.serenity.title')}>
          {t('guarantees.serenity.description')}
        </ListItem>
      </List>
    </Section>
  )
}
