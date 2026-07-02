import Script from 'next/script'
import { getMessages } from 'next-intl/server'

// Schema text must be plain: strip any inline HTML the copy might carry.
function plain(value: unknown): string {
  return String(value ?? '')
    .replace(/<[^>]*>/g, '')
    .trim()
}

type FaqEntry = { question?: string; answer?: string }

/**
 * FAQPage JSON-LD for a service page, sourced from the SAME message keys the
 * page renders its visible FAQ from (namespace.faq.qN). Single source of truth,
 * so the schema can never drift from the on-page, localized FAQ. Server
 * component: renders into the SSR HTML.
 */
export async function ServiceFaqSchema({
  locale,
  namespace,
}: {
  locale: string
  namespace: string
}) {
  const messages = (await getMessages({ locale })) as Record<
    string,
    { faq?: Record<string, FaqEntry> }
  >
  const faq = messages?.[namespace]?.faq ?? {}
  const questions = Object.keys(faq)
    .filter((k) => /^q\d+$/.test(k))
    .sort((a, b) => Number(a.slice(1)) - Number(b.slice(1)))

  if (questions.length === 0) return null

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((key) => ({
      '@type': 'Question',
      name: plain(faq[key].question),
      acceptedAnswer: {
        '@type': 'Answer',
        text: plain(faq[key].answer),
      },
    })),
  }

  return (
    <Script
      id="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  )
}
