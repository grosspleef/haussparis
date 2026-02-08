export type ArticleCategory =
  | 'renovation'
  | 'decoration'
  | 'professionnels'
  | 'tendances'
  | 'optimisation'
  | 'home-staging'

export interface ArticleMetadata {
  slug: string
  category: ArticleCategory
  locale: string
}

export const articlesMetadata: ArticleMetadata[] = [
  // French articles - Renovation
  { slug: 'renovation-appartement-paris-guide-complet', category: 'renovation', locale: 'fr' },
  { slug: 'renovation-appartement-haussmannien-guide', category: 'renovation', locale: 'fr' },
  { slug: 'renovation-salle-de-bain-paris-guide-complet', category: 'renovation', locale: 'fr' },
  { slug: 'renovation-cuisine-paris-guide-complet', category: 'renovation', locale: 'fr' },
  { slug: 'renovation-appartement-ancien-erreurs-eviter', category: 'renovation', locale: 'fr' },
  { slug: 'renovation-appartement-paris-16', category: 'renovation', locale: 'fr' },

  // French articles - Decoration
  { slug: 'tendances-decoration-2026', category: 'decoration', locale: 'fr' },
  { slug: 'guide-choix-style-interieur', category: 'decoration', locale: 'fr' },
  { slug: 'choisir-parquet-appartement-haussmannien', category: 'decoration', locale: 'fr' },

  // French articles - Professionnels
  { slug: 'trouver-architecte-interieur-paris', category: 'professionnels', locale: 'fr' },
  { slug: 'tarif-architecte-interieur-paris', category: 'professionnels', locale: 'fr' },
  { slug: 'decorateur-ou-architecte-interieur', category: 'professionnels', locale: 'fr' },
  { slug: 'difference-architecte-architecte-interieur', category: 'professionnels', locale: 'fr' },
  { slug: 'role-architecte-interieur', category: 'professionnels', locale: 'fr' },

  // French articles - Tendances
  { slug: 'avenir-architecture-interieur-2023', category: 'tendances', locale: 'fr' },

  // French articles - Optimisation
  { slug: 'optimiser-rangement-appartement-parisien', category: 'optimisation', locale: 'fr' },
  { slug: 'comment-agrandir-visuellement-petit-appartement', category: 'optimisation', locale: 'fr' },
  { slug: 'amenagement-cuisine-ouverte-salon', category: 'optimisation', locale: 'fr' },

  // French articles - Home Staging
  { slug: 'home-staging-paris-valoriser-bien', category: 'home-staging', locale: 'fr' },

  // English articles
  { slug: 'kitchen-renovation-paris-complete-guide', category: 'renovation', locale: 'en' },
  { slug: 'interior-design-trends-2026', category: 'tendances', locale: 'en' },
  { slug: 'future-interior-design-2023', category: 'tendances', locale: 'en' },
  { slug: 'how-to-select-interior-designer', category: 'professionnels', locale: 'en' },

  // Italian articles
  { slug: 'tendenze-design-interni-2026', category: 'tendances', locale: 'it' },
  { slug: 'futuro-architettura-interni-2023', category: 'tendances', locale: 'it' },
  { slug: 'come-scegliere-architetto-interni', category: 'professionnels', locale: 'it' },

  // German articles
  { slug: 'innenarchitektur-trends-2026', category: 'tendances', locale: 'de' },
  { slug: 'zukunft-innenarchitektur-2023', category: 'tendances', locale: 'de' },
  { slug: 'innenarchitekt-auswaehlen', category: 'professionnels', locale: 'de' },

  // Spanish articles
  { slug: 'tendencias-diseno-interiores-2026', category: 'tendances', locale: 'es' },
  { slug: 'futuro-diseno-interiores-2023', category: 'tendances', locale: 'es' },
  { slug: 'como-elegir-disenador-interiores', category: 'professionnels', locale: 'es' },
]

export function getArticleCategory(slug: string, locale: string): ArticleCategory | undefined {
  const article = articlesMetadata.find(
    (a) => a.slug === slug && a.locale === locale
  )
  return article?.category
}

export function getArticlesByCategory(
  category: ArticleCategory,
  locale: string
): ArticleMetadata[] {
  return articlesMetadata.filter(
    (a) => a.category === category && a.locale === locale
  )
}
