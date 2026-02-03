'use client'

import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const t = useTranslations('Error')

  useEffect(() => {
    // Log the error to an error reporting service in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error boundary caught:', error)
    }
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-6 py-24">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-6 text-base text-neutral-400">
          {t('description')}
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => reset()}
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
          >
            {t('retry')}
          </button>
          <a
            href="/"
            className="text-sm font-semibold text-white transition hover:text-neutral-300"
          >
            {t('home')} <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  )
}
