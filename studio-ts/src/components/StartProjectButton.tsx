'use client'

import { useLocale } from 'next-intl'

import { Button } from '@/components/Button'
import { startSlugs, type Locale } from '@/lib/routes'

type StartProjectButtonProps = {
  children: React.ReactNode
  invert?: boolean
  className?: string
}

/**
 * Project-initiation CTA that always points to the localized "Start a project"
 * funnel for the current locale (e.g. /fr/demarrer, /en/start). Used in MDX
 * content so authors don't have to hardcode locale-specific funnel slugs.
 */
export function StartProjectButton({
  children,
  invert,
  className,
}: StartProjectButtonProps) {
  const locale = useLocale() as Locale

  return (
    <Button href={`/${startSlugs[locale]}`} invert={invert} className={className}>
      {children}
    </Button>
  )
}
