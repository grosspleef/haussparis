'use client'

import { useTranslations } from 'next-intl'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { SectionIntro } from '@/components/SectionIntro'

export function MainServices() {
  const t = useTranslations('MainServices')

  return (
    <FadeIn className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 sm:py-32 lg:mt-40">
      <SectionIntro
        eyebrow={t('eyebrow')}
        title={t('title')}
        invert
      >
        <p>{t('description')}</p>
      </SectionIntro>

      <Container className="mt-16">
        <GridList lgColumns={2}>
          <GridListItem title={t('services.renovation.title')} invert>
            {t('services.renovation.description')}
          </GridListItem>
          <GridListItem title={t('services.customLayout.title')} invert>
            {t('services.customLayout.description')}
          </GridListItem>
          <GridListItem title={t('services.decoration.title')} invert>
            {t('services.decoration.description')}
          </GridListItem>
          <GridListItem title={t('services.furnishing.title')} invert>
            {t('services.furnishing.description')}
          </GridListItem>
        </GridList>
      </Container>
    </FadeIn>
  )
}

