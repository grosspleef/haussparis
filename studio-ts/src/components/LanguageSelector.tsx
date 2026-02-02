'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import clsx from 'clsx'
import { type Locale, locales } from '@/lib/routes'
import { useAvailableLocales } from '@/contexts/AvailableLocalesContext'

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fr: 'FR',
  it: 'IT',
  de: 'DE',
  es: 'ES',
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 8 6"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.75 1.75 4 4.25l2.25-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function LanguageSelector({ invert = false }: { invert?: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const params = useParams()
  const router = useRouter()
  const currentLocale = (params?.locale as Locale) || 'fr'

  const { availableLocales, localeUrls } = useAvailableLocales()

  // Filter to only show available locales (excluding current)
  const otherLocales = availableLocales.filter(
    (locale) => locale !== currentLocale,
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close dropdown on escape key
  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  const handleLocaleChange = (locale: Locale) => {
    setIsOpen(false)

    // Use the URL from context if available, otherwise fallback to simple locale switch
    if (localeUrls[locale]) {
      router.push(localeUrls[locale])
    } else {
      // Fallback: just change the locale prefix
      const currentPath = window.location.pathname
      const pathWithoutLocale = currentPath.replace(/^\/[a-z]{2}(\/|$)/, '/')
      router.push(`/${locale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`)
    }
  }

  // Don't render if only one locale is available
  if (otherLocales.length === 0) {
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-x-1 rounded-md px-3 py-2 text-sm font-medium transition',
          invert
            ? 'text-white hover:bg-white/10'
            : 'text-neutral-950 hover:bg-neutral-950/10',
        )}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {localeLabels[currentLocale]}
        <ChevronDownIcon
          className={clsx(
            'h-2 w-2 transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>

      {isOpen && (
        <div
          className={clsx(
            'absolute top-full left-0 z-50 mt-1 min-w-[4rem] overflow-hidden rounded-md shadow-lg',
            invert ? 'bg-neutral-800' : 'bg-white',
          )}
          role="listbox"
        >
          {otherLocales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => handleLocaleChange(locale)}
              className={clsx(
                'block w-full px-3 py-2 text-left text-sm font-medium transition',
                invert
                  ? 'text-white hover:bg-white/10'
                  : 'text-neutral-950 hover:bg-neutral-100',
              )}
              role="option"
              aria-selected={false}
            >
              {localeLabels[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
