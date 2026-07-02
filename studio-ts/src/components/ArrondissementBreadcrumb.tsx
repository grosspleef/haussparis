'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

import { Container } from '@/components/Container'
import { type Locale } from '@/lib/routes'
import { arrondissementCrumbs } from '@/lib/arrondissementBreadcrumb'

/**
 * Visible breadcrumb trail (Home > Services > Interior Designer Paris > Paris N)
 * mirroring the BreadcrumbList JSON-LD emitted by ArrondissementSchema. Same
 * source of truth (arrondissementCrumbs), so the two never drift.
 */
export function ArrondissementBreadcrumb({
  arrondissement,
}: {
  arrondissement: number
}) {
  const params = useParams()
  const locale = ((params?.locale as string) || 'en') as Locale
  const crumbs = arrondissementCrumbs(locale, arrondissement)

  return (
    <Container className="mt-8 sm:mt-12">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-neutral-500">
          {crumbs.map((crumb, i) => {
            const isLast = i === crumbs.length - 1
            return (
              <li key={crumb.path} className="flex items-center gap-x-2">
                {isLast ? (
                  <span className="text-neutral-700" aria-current="page">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.path}
                    className="transition hover:text-neutral-950"
                  >
                    {crumb.name}
                  </Link>
                )}
                {!isLast && (
                  <span aria-hidden="true" className="text-neutral-300">
                    /
                  </span>
                )}
              </li>
            )
          })}
        </ol>
      </nav>
    </Container>
  )
}
