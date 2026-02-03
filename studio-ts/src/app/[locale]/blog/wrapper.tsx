import { getTranslations } from 'next-intl/server'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getBlogBreadcrumbs } from '@/lib/breadcrumbs'
import { CategoryBadge } from '@/components/CategoryBadge'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { MDXComponents } from '@/components/MDXComponents'
import { RelatedArticles } from '@/components/RelatedArticles'
import { RelatedServices } from '@/components/RelatedServices'
import { RootLayout } from '@/components/RootLayout'
import { formatDate } from '@/lib/formatDate'
import { type Article, loadArticles } from '@/lib/mdx'

// Article Schema component for SEO
function ArticleSchema({
  article,
  articleUrl,
}: {
  article: Article
  articleUrl: string
}) {
  const baseUrl = 'https://www.haussparis.com'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hauss Paris',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}${articleUrl}`,
    },
    image: `${baseUrl}/og-image.jpg`,
    url: `${baseUrl}${articleUrl}`,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function BlogArticleWrapper({
  article,
  children,
  params,
}: {
  article: Article
  children: React.ReactNode
  params?: { locale: string }
}) {
  // Get locale from article metadata or params, default to 'fr'
  const locale = article.locale || params?.locale || 'fr'
  const t = await getTranslations({ locale, namespace: 'BlogPage' })
  let allArticles = await loadArticles(locale)

  // Find current article in loaded articles by matching title and date to get href
  const currentArticle = allArticles.find(
    (a) => a.title === article.title && a.date === article.date
  )
  const articleHref = currentArticle?.href || `/${locale}/blog`
  const articleSlug = articleHref.split('/').pop() || ''

  // Filter related articles by same category, excluding current article
  const relatedArticles = article.category
    ? allArticles
        .filter(
          (a) =>
            a.category === article.category &&
            (a.metadata.title !== article.title || a.metadata.date !== article.date)
        )
        .slice(0, 2)
    : allArticles
        .filter(
          (a) =>
            a.metadata.title !== article.title || a.metadata.date !== article.date
        )
        .slice(0, 2)

  // Generate breadcrumbs
  const breadcrumbItems = getBlogBreadcrumbs(
    locale,
    article.title,
    articleHref
  )

  return (
    <RootLayout>
      {/* Article structured data for SEO */}
      <ArticleSchema article={article} articleUrl={articleHref} />
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          {/* Breadcrumbs */}
          <Breadcrumbs items={breadcrumbItems} className="mb-8" />

          <header className="mx-auto flex max-w-5xl flex-col text-center">
            {/* Date */}
            <time
              dateTime={article.date}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(article.date, locale)}
            </time>
            {/* Category Badge */}
            {article.category && (
              <div className="mt-3 flex justify-center">
                <CategoryBadge category={article.category} />
              </div>
            )}
            {/* Title */}
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-balance text-neutral-950 sm:text-6xl">
              {article.title}
            </h1>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              {t('by')} {article.author.name}, {article.author.role}
            </p>
          </header>
        </FadeIn>

        <FadeIn>
          <MDXComponents.wrapper className="mt-24 sm:mt-32 lg:mt-40">
            {children}
          </MDXComponents.wrapper>
        </FadeIn>
      </Container>

      {/* Related Articles (same category) */}
      {relatedArticles.length > 0 && (
        <RelatedArticles
          articles={relatedArticles}
          locale={locale}
          className="mt-24 sm:mt-32 lg:mt-40"
        />
      )}

      {/* Related Services */}
      <RelatedServices articleSlug={articleSlug} className="mt-24 sm:mt-32" />

      <ContactSection />
    </RootLayout>
  )
}
