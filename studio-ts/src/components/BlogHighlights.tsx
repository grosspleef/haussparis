'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { SectionIntro } from '@/components/SectionIntro'
import { formatDate } from '@/lib/formatDate'
import type { Article, MDXEntry } from '@/lib/mdx'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 6" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 3 18 .5v2H0v1h18v2L24 3Z"
      />
    </svg>
  )
}

interface ArticleCardProps {
  article: MDXEntry<Article>
  locale: string
}

function ArticleCard({ article, locale }: ArticleCardProps) {
  const t = useTranslations('BlogPage')

  return (
    <article>
      <Border position="left" className="relative flex flex-col items-start pl-8">
        <h3 className="mt-6 text-base font-semibold text-neutral-950">
          {article.title}
        </h3>
        <time
          dateTime={article.date}
          className="order-first text-sm text-neutral-600"
        >
          {formatDate(article.date, locale)}
        </time>
        <p className="mt-2.5 text-base text-neutral-600 line-clamp-2">
          {article.description}
        </p>
        <Link
          href={article.href}
          className="mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:text-neutral-700"
          aria-label={t('readArticle', { title: article.title })}
        >
          {t('readMore')}
          <ArrowIcon className="w-6 flex-none fill-current" />
          <span className="absolute inset-0" />
        </Link>
      </Border>
    </article>
  )
}

interface BlogHighlightsProps {
  articles: MDXEntry<Article>[]
  locale: string
  className?: string
}

export function BlogHighlights({
  articles,
  locale,
  className = '',
}: BlogHighlightsProps) {
  const t = useTranslations('BlogHighlights')

  if (articles.length === 0) return null

  return (
    <div className={`py-24 sm:py-32 ${className}`}>
      <SectionIntro title={t('title')} smaller />

      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {articles.slice(0, 2).map((article) => (
            <FadeIn key={article.href}>
              <ArticleCard article={article} locale={locale} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  )
}
