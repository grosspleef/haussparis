'use client'

import { useTranslations } from 'next-intl'
import { Container } from '@/components/Container'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { SectionIntro } from '@/components/SectionIntro'

export function ValuesSection() {
  const t = useTranslations('ValuesSection')
  
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-linear-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full mask-[linear-gradient(to_bottom_left,white_40%,transparent_50%)] fill-neutral-100 stroke-neutral-950/5"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow={t('eyebrow')}
        title={t('title')}
      >
        <p>
          {t('description')}
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList lgColumns={2}>
          <GridListItem title={t('services.renovation.title')}>
            {t('services.renovation.description')}
          </GridListItem>
          <GridListItem title={t('services.layout.title')}>
            {t('services.layout.description')}
          </GridListItem>
          <GridListItem title={t('services.decoration.title')}>
            {t('services.decoration.description')}
          </GridListItem>
          <GridListItem title={t('services.furnishing.title')}>
            {t('services.furnishing.description')}
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}
