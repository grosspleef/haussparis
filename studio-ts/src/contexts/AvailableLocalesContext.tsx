'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { locales, type Locale } from '@/lib/routes'

type AvailableLocalesContextType = {
  availableLocales: Locale[]
  localeUrls: Partial<Record<Locale, string>>
}

const AvailableLocalesContext = createContext<AvailableLocalesContextType | null>(null)

type AvailableLocalesProviderProps = {
  children: ReactNode
  availableLocales: Locale[]
  localeUrls: Partial<Record<Locale, string>>
}

export function AvailableLocalesProvider({
  children,
  availableLocales,
  localeUrls,
}: AvailableLocalesProviderProps) {
  return (
    <AvailableLocalesContext.Provider value={{ availableLocales, localeUrls }}>
      {children}
    </AvailableLocalesContext.Provider>
  )
}

export function useAvailableLocales(): AvailableLocalesContextType {
  const context = useContext(AvailableLocalesContext)

  // Fallback: return all locales if no provider (for backward compatibility)
  if (!context) {
    return {
      availableLocales: [...locales],
      localeUrls: {},
    }
  }

  return context
}
