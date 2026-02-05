'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { CategoryBadge } from '@/components/CategoryBadge'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { formatDate } from '@/lib/formatDate'
import type { Article, MDXEntry } from '@/lib/mdx'
import type { ArticleCategory } from '@/lib/blog-metadata'

const CATEGORIES: ArticleCategory[] = [
  'renovation',
  'decoration',
  'professionnels',
  'tendances',
  'optimisation',
  'home-staging',
]

interface BlogListProps {
  articles: MDXEntry<Article>[]
  locale: string
}

export function BlogList({ articles, locale }: BlogListProps) {
  const t = useTranslations('BlogPage')
  const tCategories = useTranslations('Categories')
  const [selectedCategory, setSelectedCategory] = useState<
    ArticleCategory | 'all'
  >('all')

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory)

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      {/* Category Filters */}
      <div className="mb-16 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selectedCategory === 'all'
              ? 'bg-neutral-950 text-white'
              : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
          }`}
        >
          {t('filterAll')}
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selectedCategory === category
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
            }`}
          >
            {tCategories(category)}
          </button>
        ))}
      </div>

      {/* Articles List */}
      <div className="space-y-24 lg:space-y-32">
        {filteredArticles.map((article) => (
          <FadeIn key={article.href}>
            <article>
              <Border className="pt-16">
                <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                  <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                    <h2 className="font-display text-2xl font-semibold text-neutral-950">
                      <Link href={article.href}>{article.title}</Link>
                    </h2>
                    <dl className="lg:absolute lg:top-0 lg:left-0 lg:w-1/3 lg:px-4">
                      <dt className="sr-only">{t('publishedOn')}</dt>
                      <dd className="absolute top-0 left-0 text-sm text-neutral-950 lg:static">
                        <time dateTime={article.date}>
                          {formatDate(article.date, locale)}
                        </time>
                      </dd>
                      {/* Category Badge */}
                      {article.category && (
                        <dd className="mt-2">
                          <CategoryBadge category={article.category} />
                        </dd>
                      )}
                      <dt className="sr-only">{t('author')}</dt>
                      <dd className="mt-6 flex gap-x-4">
                        <div className="flex-none overflow-hidden rounded-xl bg-neutral-100">
                          <Image
                            alt=""
                            {...article.author.image}
                            className="h-12 w-12 object-cover grayscale"
                          />
                        </div>
                        <div className="text-sm text-neutral-950">
                          <div className="font-semibold">
                            {article.author.name}
                          </div>
                          <div>{article.author.role}</div>
                        </div>
                      </dd>
                    </dl>
                    <p className="mt-6 max-w-2xl text-base text-neutral-600">
                      {article.description}
                    </p>
                    <Button
                      href={article.href}
                      aria-label={t('readArticle', { title: article.title })}
                      className="mt-8"
                    >
                      {t('readMore')}
                    </Button>
                  </div>
                </div>
              </Border>
            </article>
          </FadeIn>
        ))}
      </div>

      {/* No results message */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-16">
          <p className="text-neutral-600">
            {t('noArticles')}
          </p>
        </div>
      )}
    </Container>
  )
}
