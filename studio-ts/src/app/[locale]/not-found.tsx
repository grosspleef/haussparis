import { getTranslations } from 'next-intl/server'

import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { RootLayout } from '@/components/RootLayout'
import { Border } from '@/components/Border'

export default async function NotFound() {
  // Default to English for 404 pages
  const locale = 'en'
  const t = await getTranslations({ locale, namespace: 'NotFound' })

  // Services URL
  const servicesUrl = '/services'

  return (
    <RootLayout>
      <Container className="flex h-full items-center justify-center pt-24 sm:pt-32 lg:pt-40">
        <FadeIn className="flex max-w-3xl flex-col items-center text-center">
          <p className="font-display text-8xl font-bold text-neutral-950 sm:text-9xl">
            404
          </p>
          <h1 className="mt-8 font-display text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-lg text-neutral-600">
            {t('description')}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Button href={`/${locale}`}>
              {t('backToHome')}
            </Button>
            <Button href={servicesUrl} invert>
              {t('openMenu')}
            </Button>
          </div>

          <Border className="mt-16 w-full" />

          <div className="mt-16 max-w-2xl">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-neutral-950">
              {t('companyInfo.title')}
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              {t('companyInfo.description')}
            </p>
          </div>
        </FadeIn>
      </Container>
    </RootLayout>
  )
}
