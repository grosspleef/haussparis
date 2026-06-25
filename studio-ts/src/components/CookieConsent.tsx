'use client'

import { useEffect, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

import { GoogleAnalytics } from '@/components/GoogleAnalytics'
import { MetaPixel } from '@/components/MetaPixel'

const STORAGE_KEY = 'hauss-consent'
type Consent = 'granted' | 'denied' | 'unknown'

// Slugs localisés de la politique de confidentialité (cf. Footer.tsx)
const PRIVACY_PATHS: Record<string, string> = {
  en: '/privacy-policy',
  fr: '/politique-de-confidentialite',
  it: '/privacy-policy',
  de: '/datenschutz',
  es: '/politica-de-privacidad',
}

/**
 * Bandeau de consentement (RGPD/CNIL).
 *
 * Google Analytics et le Meta Pixel ne sont chargés qu'APRÈS un consentement
 * explicite. Tant que l'utilisateur n'a pas choisi, aucun traceur n'est posé.
 * Le choix est mémorisé dans localStorage.
 */
export function CookieConsent() {
  const t = useTranslations('CookieConsent')
  const locale = useLocale()
  const [consent, setConsent] = useState<Consent>('unknown')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored === 'granted' || stored === 'denied') {
        setConsent(stored)
      }
    } catch {
      // localStorage indisponible (navigation privée, etc.) : on affichera le bandeau.
    }
  }, [])

  function choose(value: 'granted' | 'denied') {
    try {
      localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // ignore
    }
    setConsent(value)
  }

  const privacyPath = PRIVACY_PATHS[locale] ?? PRIVACY_PATHS.en

  return (
    <>
      {/* Traceurs chargés uniquement après consentement explicite */}
      {consent === 'granted' && (
        <>
          <GoogleAnalytics />
          <MetaPixel />
        </>
      )}

      {mounted && consent === 'unknown' && (
        <div className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6">
          <div
            role="dialog"
            aria-label={t('title')}
            className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-neutral-950/10 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6"
          >
            <div className="text-sm text-neutral-600">
              <p className="font-semibold text-neutral-950">{t('title')}</p>
              <p className="mt-1">
                {t('message')}{' '}
                <a
                  href={`/${locale}${privacyPath}`}
                  className="font-medium text-neutral-950 underline underline-offset-2 hover:no-underline"
                >
                  {t('learnMore')}
                </a>
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => choose('denied')}
                className="inline-flex rounded-full px-4 py-1.5 text-sm font-semibold text-neutral-700 ring-1 ring-neutral-300 transition hover:bg-neutral-100"
              >
                {t('decline')}
              </button>
              <button
                type="button"
                onClick={() => choose('granted')}
                className="inline-flex rounded-full bg-neutral-950 px-4 py-1.5 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                {t('accept')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
