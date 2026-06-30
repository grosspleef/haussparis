'use client'

import { useTranslations } from 'next-intl'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { SectionIntro } from '@/components/SectionIntro'

export function WhyHaussSection() {
  const t = useTranslations('WhyHauss')

  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <SectionIntro eyebrow={t('eyebrow')} title={t('title')}>
        <p>{t('description')}</p>
      </SectionIntro>

      <Container className="mt-16">
        <GridList lgColumns={2}>
          <GridListItem title={t('reasons.free.title')}>
            {t('reasons.free.description')}
          </GridListItem>
          <GridListItem title={t('reasons.selected.title')}>
            {t('reasons.selected.description')}
          </GridListItem>
          <GridListItem title={t('reasons.tailored.title')}>
            {t('reasons.tailored.description')}
          </GridListItem>
          <GridListItem title={t('reasons.audience.title')}>
            {t('reasons.audience.description')}
          </GridListItem>
        </GridList>

        <FadeIn>
          <p className="mt-16 max-w-3xl border-l-2 border-neutral-200 pl-6 text-base text-neutral-500 italic">
            {t('note')}
          </p>
        </FadeIn>
      </Container>
    </div>
  )
}
