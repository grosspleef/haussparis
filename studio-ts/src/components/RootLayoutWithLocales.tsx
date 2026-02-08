'use client'

import { AvailableLocalesProvider } from '@/contexts/AvailableLocalesContext'
import { RootLayout } from '@/components/RootLayout'
import { type Locale, locales } from '@/lib/routes'

type RootLayoutWithLocalesProps = {
  children: React.ReactNode
  localeUrls?: Partial<Record<Locale, string>>
  availableLocales?: Locale[]
}

export function RootLayoutWithLocales({
  children,
  localeUrls = {},
  availableLocales,
}: RootLayoutWithLocalesProps) {
  // If no availableLocales provided, derive from localeUrls keys
  const derivedLocales = availableLocales ||
    (Object.keys(localeUrls).length > 0
      ? (Object.keys(localeUrls) as Locale[])
      : [...locales])

  return (
    <AvailableLocalesProvider
      availableLocales={derivedLocales}
      localeUrls={localeUrls}
    >
      <RootLayout>{children}</RootLayout>
    </AvailableLocalesProvider>
  )
}
