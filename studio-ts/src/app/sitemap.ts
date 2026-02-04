import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.haussparis.com'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

interface RouteConfig {
  path: string
  priority: number
  changeFrequency: ChangeFrequency
}

// Blog articles organized by locale (each article belongs to ONE locale only)
const blogArticlesByLocale: Record<string, RouteConfig[]> = {
  fr: [
    { path: '/blog/3-lecons-renovation-premier-espace', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/amenagement-cuisine-ouverte-salon', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/avenir-architecture-interieur-2023', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/choisir-parquet-appartement-haussmannien', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/comment-agrandir-visuellement-petit-appartement', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/decorateur-ou-architecte-interieur', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/difference-architecte-architecte-interieur', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/guide-choix-style-interieur', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/home-staging-paris-valoriser-bien', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/optimiser-rangement-appartement-parisien', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/renovation-appartement-ancien-erreurs-eviter', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/renovation-appartement-haussmannien-guide', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/renovation-appartement-paris-16', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/renovation-appartement-paris-guide-complet', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/renovation-salle-de-bain-paris-guide-complet', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/role-architecte-interieur', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/tarif-architecte-interieur-paris', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/tendances-decoration-2026', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/trouver-architecte-interieur-paris', priority: 0.8, changeFrequency: 'monthly' },
  ],
  en: [
    { path: '/blog/3-lessons-renovating-first-space', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/apartment-renovation-paris-16', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/apartment-renovation-paris-complete-guide', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/architect-vs-interior-designer-differences', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/decorator-vs-interior-designer', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/find-interior-designer-paris', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/future-interior-architecture-2026', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/interior-designer-fees-paris', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/interior-designer-role-guide', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/short-guide-choosing-interior-style', priority: 0.7, changeFrequency: 'monthly' },
  ],
  it: [
    { path: '/blog/decoratore-vs-architetto-interni', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/ristrutturazione-appartamento-parigi-guida-completa', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/tariffe-architetto-interni-parigi', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/trovare-architetto-interni-parigi', priority: 0.8, changeFrequency: 'monthly' },
  ],
  de: [
    { path: '/blog/dekorateur-vs-innenarchitekt', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/innenarchitekt-paris-finden', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/kosten-innenarchitekt-paris', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/wohnungsrenovierung-paris-kompletter-leitfaden', priority: 0.8, changeFrequency: 'monthly' },
  ],
  es: [
    { path: '/blog/decorador-vs-disenador-interiores', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog/encontrar-disenador-interiores-paris', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/renovacion-apartamento-paris-guia-completa', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/blog/tarifas-disenador-interiores-paris', priority: 0.8, changeFrequency: 'monthly' },
  ],
}

// Routes by locale
const localeRoutes: Record<string, RouteConfig[]> = {
  en: [
    // Homepage
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    // Main pages
    { path: '/about', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/our-process', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'weekly' },
    // Legal pages
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/terms-of-service', priority: 0.5, changeFrequency: 'monthly' },
    // SEO Paris pages
    { path: '/services/interior-designer-paris', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/interior-decorator-paris', priority: 0.9, changeFrequency: 'weekly' },
    // SEO Arrondissements pages
    { path: '/services/interior-designer-paris-3', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/interior-designer-paris-4', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/interior-designer-paris-6', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/interior-designer-paris-7', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/interior-designer-paris-8', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/interior-designer-paris-9', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/interior-designer-paris-11', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/interior-designer-paris-15', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/interior-designer-paris-16', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/interior-designer-paris-17', priority: 0.8, changeFrequency: 'monthly' },
    // Generic services
    { path: '/services/renovation', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/custom-layout', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/decoration', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/kitchen-bathroom', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/furnishing', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/lighting-design', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/outdoor-design', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/home-staging', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/workplace-design', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/commercial-design', priority: 0.7, changeFrequency: 'monthly' },
  ],
  fr: [
    // Homepage
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    // Main pages
    { path: '/a-propos', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/notre-processus', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'weekly' },
    // Legal pages
    { path: '/politique-de-confidentialite', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/conditions-generales', priority: 0.5, changeFrequency: 'monthly' },
    // SEO Paris pages
    { path: '/services/architecte-interieur-paris', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services/decorateur-interieur-paris', priority: 0.9, changeFrequency: 'weekly' },
    // SEO Arrondissements pages
    { path: '/services/architecte-interieur-paris-3', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/architecte-interieur-paris-4', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/architecte-interieur-paris-6', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/architecte-interieur-paris-7', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/architecte-interieur-paris-8', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/architecte-interieur-paris-9', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/architecte-interieur-paris-11', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/architecte-interieur-paris-15', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/architecte-interieur-paris-16', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services/architecte-interieur-paris-17', priority: 0.8, changeFrequency: 'monthly' },
    // Generic services
    { path: '/services/renovation', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/amenagement-sur-mesure', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/decoration', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/cuisine-salle-de-bain', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/ameublement', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/design-luminaire', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/design-exterieur', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/home-staging', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/espaces-professionnels', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/services/design-commercial', priority: 0.7, changeFrequency: 'monthly' },
  ],
  it: [
    // Homepage
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    // Main pages
    { path: '/chi-siamo', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/servizi', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contatti', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/il-processo', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'weekly' },
    // Legal pages
    { path: '/privacy-policy', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/terms-of-service', priority: 0.5, changeFrequency: 'monthly' },
    // SEO Paris pages
    { path: '/servizi/architetto-interni-parigi', priority: 0.9, changeFrequency: 'weekly' },
    // SEO Arrondissements pages
    { path: '/servizi/architetto-interni-parigi-3', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi/architetto-interni-parigi-4', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi/architetto-interni-parigi-6', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi/architetto-interni-parigi-7', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi/architetto-interni-parigi-8', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi/architetto-interni-parigi-9', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi/architetto-interni-parigi-11', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi/architetto-interni-parigi-15', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi/architetto-interni-parigi-16', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servizi/architetto-interni-parigi-17', priority: 0.8, changeFrequency: 'monthly' },
    // Generic services
    { path: '/servizi/ristrutturazione', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servizi/progettazione-su-misura', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servizi/decorazione', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servizi/cucina-bagno', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servizi/arredamento', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servizi/design-illuminazione', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servizi/design-esterni', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servizi/home-staging', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servizi/design-uffici', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servizi/design-commerciale', priority: 0.7, changeFrequency: 'monthly' },
  ],
  de: [
    // Homepage
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    // Main pages
    { path: '/uber-uns', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/dienstleistungen', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/kontakt', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/unser-prozess', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'weekly' },
    // Legal pages
    { path: '/datenschutz', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/nutzungsbedingungen', priority: 0.5, changeFrequency: 'monthly' },
    // SEO Paris pages
    { path: '/dienstleistungen/innenarchitekt-paris', priority: 0.9, changeFrequency: 'weekly' },
    // SEO Arrondissements pages
    { path: '/dienstleistungen/innenarchitekt-paris-3', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/innenarchitekt-paris-4', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/innenarchitekt-paris-6', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/innenarchitekt-paris-7', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/innenarchitekt-paris-8', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/innenarchitekt-paris-9', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/innenarchitekt-paris-11', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/innenarchitekt-paris-15', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/innenarchitekt-paris-16', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/innenarchitekt-paris-17', priority: 0.8, changeFrequency: 'monthly' },
    // Generic services
    { path: '/dienstleistungen/renovierung', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/massanfertigung', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/dekoration', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/kueche-bad', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/einrichtung', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/lichtdesign', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/aussengestaltung', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/home-staging', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/buerogestaltung', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/dienstleistungen/gewerbedesign', priority: 0.7, changeFrequency: 'monthly' },
  ],
  es: [
    // Homepage
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    // Main pages
    { path: '/sobre-nosotros', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/servicios', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contacto', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/nuestro-proceso', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/faq', priority: 0.7, changeFrequency: 'weekly' },
    // Legal pages
    { path: '/politica-de-privacidad', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/terminos-de-servicio', priority: 0.5, changeFrequency: 'monthly' },
    // SEO Paris pages
    { path: '/servicios/disenador-interiores-paris', priority: 0.9, changeFrequency: 'weekly' },
    // SEO Arrondissements pages
    { path: '/servicios/disenador-interiores-paris-3', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servicios/disenador-interiores-paris-4', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servicios/disenador-interiores-paris-6', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servicios/disenador-interiores-paris-7', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servicios/disenador-interiores-paris-8', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servicios/disenador-interiores-paris-9', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servicios/disenador-interiores-paris-11', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servicios/disenador-interiores-paris-15', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servicios/disenador-interiores-paris-16', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/servicios/disenador-interiores-paris-17', priority: 0.8, changeFrequency: 'monthly' },
    // Generic services
    { path: '/servicios/renovacion', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servicios/diseno-personalizado', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servicios/decoracion', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servicios/cocina-bano', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servicios/mobiliario', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servicios/diseno-iluminacion', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servicios/diseno-exterior', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servicios/home-staging', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servicios/diseno-oficinas', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/servicios/diseno-comercial', priority: 0.7, changeFrequency: 'monthly' },
  ],
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []
  const locales = ['en', 'fr', 'it', 'de', 'es']
  const lastModified = new Date()

  for (const locale of locales) {
    const routes = localeRoutes[locale] || []

    // Add locale-specific routes
    for (const route of routes) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      })
    }

    // Add blog articles only for the current locale (not all articles for all locales)
    const localeBlogArticles = blogArticlesByLocale[locale] || []
    for (const article of localeBlogArticles) {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}${article.path}`,
        lastModified,
        changeFrequency: article.changeFrequency,
        priority: article.priority,
      })
    }
  }

  return sitemapEntries
}
