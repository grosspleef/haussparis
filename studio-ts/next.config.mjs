import rehypeShiki from '@leafac/rehype-shiki'
import nextMDX from '@next/mdx'
import { Parser } from 'acorn'
import jsx from 'acorn-jsx'
import escapeStringRegexp from 'escape-string-regexp'
import * as path from 'path'
import { recmaImportImages } from 'recma-import-images'
import remarkGfm from 'remark-gfm'
import { remarkRehypeWrap } from 'remark-rehype-wrap'
import rehypeUnwrapImages from 'rehype-unwrap-images'
import shiki from 'shiki'
import { unifiedConditional } from 'unified-conditional'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  // Security and caching headers
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self'",
              "connect-src 'self' https://www.google-analytics.com https://api.resend.com https://region1.google-analytics.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      {
        // HSTS - only for production (HTTPS)
        source: '/:path*',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
        ],
      },
      {
        // Long-term cache for fonts
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Long-term cache for static images
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache for Next.js static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // ============================================
      // 1. URLs sans préfixe de locale → URLs avec préfixe EN
      // ============================================
      { source: '/about', destination: '/en/about', permanent: true },
      { source: '/contact', destination: '/en/contact', permanent: true },
      { source: '/blog', destination: '/en/blog', permanent: true },
      { source: '/services', destination: '/en/services', permanent: true },
      { source: '/our-process', destination: '/en/our-process', permanent: true },
      { source: '/a-propos', destination: '/fr/a-propos', permanent: true },
      { source: '/nuestro-proceso', destination: '/es/nuestro-proceso', permanent: true },

      // ============================================
      // 2. Services avec slugs différents
      // ============================================
      { source: '/services/workplace-design', destination: '/en/services/office-design', permanent: true },
      { source: '/en/services/workplace-design', destination: '/en/services/office-design', permanent: true },
      { source: '/services/design-luminaire', destination: '/fr/services/design-luminaire', permanent: true },
      { source: '/services/amenagement-sur-mesure', destination: '/fr/services/amenagement-sur-mesure', permanent: true },
      { source: '/en/services/outdoor-design', destination: '/en/services/exterior-design', permanent: true },
      { source: '/de/dienstleistungen/buerogestaltung', destination: '/de/dienstleistungen/buerodesign', permanent: true },
      { source: '/dienstleistungen', destination: '/de/dienstleistungen', permanent: true },
      { source: '/dienstleistungen/renovierung', destination: '/de/dienstleistungen/renovierung', permanent: true },
      { source: '/dienstleistungen/:slug', destination: '/de/dienstleistungen/:slug', permanent: true },

      // Services génériques sans locale → EN
      { source: '/services/decoration', destination: '/en/services/decoration', permanent: true },
      { source: '/services/renovation', destination: '/en/services/renovation', permanent: true },
      { source: '/services/furnishing', destination: '/en/services/furnishing', permanent: true },
      { source: '/services/lighting-design', destination: '/en/services/lighting-design', permanent: true },
      { source: '/services/home-staging', destination: '/en/services/home-staging', permanent: true },
      { source: '/services/kitchen-bathroom', destination: '/en/services/kitchen-bathroom', permanent: true },
      { source: '/services/:slug', destination: '/en/services/:slug', permanent: true },

      // ============================================
      // 3. Articles de blog avec slugs différents
      // ============================================
      { source: '/blog/kosten-innenarchitekt', destination: '/de/blog/kosten-innenarchitekt-paris', permanent: true },
      { source: '/it/blog/tariffe-architetto-interni', destination: '/it/blog/tariffe-architetto-interni-parigi', permanent: true },
      { source: '/en/blog/interior-designer-fees-pricing', destination: '/en/blog/interior-designer-fees-paris', permanent: true },
      { source: '/fr/blog/tarif-architecte-interieur', destination: '/fr/blog/tarif-architecte-interieur-paris', permanent: true },

      // Articles de blog mal localisés (slug IT dans FR ou EN)
      { source: '/fr/blog/decoratore-vs-architetto-interni', destination: '/it/blog/decoratore-vs-architetto-interni', permanent: true },
      { source: '/en/blog/decoratore-vs-architetto-interni', destination: '/it/blog/decoratore-vs-architetto-interni', permanent: true },

      // Blog sans locale
      { source: '/blog/avenir-architecture-interieur-2023', destination: '/fr/blog/avenir-architecture-interieur-2023', permanent: true },
      { source: '/blog/3-lecons-renovation-premier-espace', destination: '/fr/blog/3-lecons-renovation-premier-espace', permanent: true },
      { source: '/blog/guide-choix-style-interieur', destination: '/fr/blog/guide-choix-style-interieur', permanent: true },
      { source: '/blog/:slug', destination: '/en/blog/:slug', permanent: true },

      // ============================================
      // 4. Pages légales
      // ============================================
      { source: '/fr/terms', destination: '/fr/conditions-generales', permanent: true },

      // ============================================
      // 5. URLs IT spéciales
      // ============================================
      { source: '/servizi/architetto-interni-parigi', destination: '/it/servizi/architetto-interni-parigi', permanent: true },
      { source: '/servizi/:slug', destination: '/it/servizi/:slug', permanent: true },
      { source: '/servizi', destination: '/it/servizi', permanent: true },
      { source: '/it/contact', destination: '/it/contatti', permanent: true },

      // ============================================
      // 6. URLs ES spéciales
      // ============================================
      { source: '/servicios/:slug', destination: '/es/servicios/:slug', permanent: true },
      { source: '/servicios', destination: '/es/servicios', permanent: true },
    ]
  },
}

function remarkMDXLayout(source, metaName) {
  let parser = Parser.extend(jsx())
  let parseOptions = { ecmaVersion: 'latest', sourceType: 'module' }

  return (tree) => {
    let imp = `import _Layout from '${source}'`
    let exp = `export default function Layout(props) {
      return <_Layout {...props} ${metaName}={${metaName}} />
    }`

    tree.children.push(
      {
        type: 'mdxjsEsm',
        value: imp,
        data: { estree: parser.parse(imp, parseOptions) },
      },
      {
        type: 'mdxjsEsm',
        value: exp,
        data: { estree: parser.parse(exp, parseOptions) },
      },
    )
  }
}

export default async function config() {
  let highlighter = await shiki.getHighlighter({
    theme: 'css-variables',
  })

  let withMDX = nextMDX({
    extension: /\.mdx$/,
    options: {
      recmaPlugins: [recmaImportImages],
      rehypePlugins: [
        [rehypeShiki, { highlighter }],
        rehypeUnwrapImages,
        [
          remarkRehypeWrap,
          {
            node: { type: 'mdxJsxFlowElement', name: 'Typography' },
            start: ':root > :not(mdxJsxFlowElement)',
            end: ':root > mdxJsxFlowElement',
          },
        ],
      ],
      remarkPlugins: [
        remarkGfm,
        [
          unifiedConditional,
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/[locale]/blog'))}`),
            [[remarkMDXLayout, '@/app/[locale]/blog/wrapper', 'article']],
          ],
          [
            new RegExp(`^${escapeStringRegexp(path.resolve('src/app/[locale]/work'))}`),
            [[remarkMDXLayout, '@/app/[locale]/work/wrapper', 'caseStudy']],
          ],
        ],
      ],
    },
  })

  return withNextIntl(withMDX(nextConfig))
}
