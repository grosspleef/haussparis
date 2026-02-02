'use client'

import { useTranslations } from 'next-intl'
import type { ArticleCategory } from '@/lib/blog-metadata'

interface CategoryBadgeProps {
  category: ArticleCategory
  className?: string
}

export function CategoryBadge({ category, className = '' }: CategoryBadgeProps) {
  const t = useTranslations('Categories')

  return (
    <span
      className={`inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600 ${className}`}
    >
      {t(category)}
    </span>
  )
}
