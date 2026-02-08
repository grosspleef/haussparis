import path from 'path'
import { type ImageProps } from 'next/image'
import glob from 'fast-glob'
import type { ArticleCategory } from './blog-metadata'

async function loadEntries<T extends { date: string }>(
  directory: string,
  metaName: string,
): Promise<Array<MDXEntry<T>>> {
  return (
    await Promise.all(
      (await glob('**/page.mdx', { cwd: path.join(process.cwd(), `src/app/${directory}`) })).map(
        async (filename) => {
          let metadata = (await import(`../app/${directory}/${filename}`))[
            metaName
          ] as T
          return {
            ...metadata,
            metadata,
            href: `/${directory}/${filename.replace(/\/page\.mdx$/, '')}`,
          }
        },
      ),
    )
  ).sort((a, b) => b.date.localeCompare(a.date))
}

type ImagePropsWithOptionalAlt = Omit<ImageProps, 'alt'> & { alt?: string }

export type MDXEntry<T> = T & { href: string; metadata: T }

export interface Article {
  date: string
  title: string
  description: string
  author: {
    name: string
    role: string
    image: ImagePropsWithOptionalAlt
  }
  locale?: string
  category?: ArticleCategory
}

export interface CaseStudy {
  date: string
  client: string
  title: string
  description: string
  summary: Array<string>
  logo: ImageProps['src']
  image: ImagePropsWithOptionalAlt
  service: string
  testimonial: {
    author: {
      name: string
      role: string
    }
    content: string
  }
}

export function loadArticles(locale?: string) {
  const directory = locale ? `[locale]/blog` : 'blog'
  return loadEntries<Article>(directory, 'article').then((articles) => {
    if (locale) {
      return articles
        .filter((article) => !article.locale || article.locale === locale)
        .map((article) => ({
          ...article,
          href: article.href.replace('[locale]', locale),
        }))
    }
    return articles
  })
}

export function loadCaseStudies(locale?: string) {
  return loadEntries<CaseStudy>('[locale]/work', 'caseStudy').then((studies) => {
    if (locale) {
      return studies.map((study) => ({
        ...study,
        href: study.href.replace('[locale]', locale),
      }))
    }
    return studies
  })
}
