import { type ServiceKey } from './routes'
import { type ArticleCategory } from './blog-metadata'

// Service metadata translation keys for RelatedServices component
export const serviceMetadataTranslationKeys: Record<ServiceKey, { nameKey: string; descriptionKey: string }> = {
  renovation: { nameKey: 'Services.renovation.name', descriptionKey: 'Services.renovation.shortDescription' },
  decoration: { nameKey: 'Services.decoration.name', descriptionKey: 'Services.decoration.shortDescription' },
  furnishing: { nameKey: 'Services.furnishing.name', descriptionKey: 'Services.furnishing.shortDescription' },
  homeStaging: { nameKey: 'Services.homeStaging.name', descriptionKey: 'Services.homeStaging.shortDescription' },
  kitchenBathroom: { nameKey: 'Services.kitchenBathroom.name', descriptionKey: 'Services.kitchenBathroom.shortDescription' },
  customLayout: { nameKey: 'Services.customLayout.name', descriptionKey: 'Services.customLayout.shortDescription' },
  lightingDesign: { nameKey: 'Services.lightingDesign.name', descriptionKey: 'Services.lightingDesign.shortDescription' },
  exteriorDesign: { nameKey: 'Services.exteriorDesign.name', descriptionKey: 'Services.exteriorDesign.shortDescription' },
  officeDesign: { nameKey: 'Services.officeDesign.name', descriptionKey: 'Services.officeDesign.shortDescription' },
  commercialDesign: { nameKey: 'Services.commercialDesign.name', descriptionKey: 'Services.commercialDesign.shortDescription' },
  architecteInterieurParis: { nameKey: 'Services.architecteInterieurParis.name', descriptionKey: 'Services.architecteInterieurParis.shortDescription' },
  decorateurInterieurParis: { nameKey: 'Services.decorateurInterieurParis.name', descriptionKey: 'Services.decorateurInterieurParis.shortDescription' },
  architecteInterieurParis3: { nameKey: 'Services.architecteInterieurParis3.name', descriptionKey: 'Services.architecteInterieurParis3.shortDescription' },
  architecteInterieurParis4: { nameKey: 'Services.architecteInterieurParis4.name', descriptionKey: 'Services.architecteInterieurParis4.shortDescription' },
  architecteInterieurParis6: { nameKey: 'Services.architecteInterieurParis6.name', descriptionKey: 'Services.architecteInterieurParis6.shortDescription' },
  architecteInterieurParis7: { nameKey: 'Services.architecteInterieurParis7.name', descriptionKey: 'Services.architecteInterieurParis7.shortDescription' },
  architecteInterieurParis8: { nameKey: 'Services.architecteInterieurParis8.name', descriptionKey: 'Services.architecteInterieurParis8.shortDescription' },
  architecteInterieurParis9: { nameKey: 'Services.architecteInterieurParis9.name', descriptionKey: 'Services.architecteInterieurParis9.shortDescription' },
  architecteInterieurParis11: { nameKey: 'Services.architecteInterieurParis11.name', descriptionKey: 'Services.architecteInterieurParis11.shortDescription' },
  architecteInterieurParis15: { nameKey: 'Services.architecteInterieurParis15.name', descriptionKey: 'Services.architecteInterieurParis15.shortDescription' },
  architecteInterieurParis16: { nameKey: 'Services.architecteInterieurParis16.name', descriptionKey: 'Services.architecteInterieurParis16.shortDescription' },
  architecteInterieurParis17: { nameKey: 'Services.architecteInterieurParis17.name', descriptionKey: 'Services.architecteInterieurParis17.shortDescription' },
}

export type { ServiceKey }

// Mapping blog articles to related services
export const blogToServices: Record<string, ServiceKey[]> = {
  // Renovation articles
  'renovation-appartement-paris-guide-complet': ['renovation', 'architecteInterieurParis', 'kitchenBathroom'],
  'renovation-appartement-haussmannien-guide': ['renovation', 'architecteInterieurParis', 'decoration'],
  'renovation-salle-de-bain-paris-guide-complet': ['kitchenBathroom', 'renovation', 'customLayout'],
  'renovation-appartement-ancien-erreurs-eviter': ['renovation', 'architecteInterieurParis', 'customLayout'],
  'renovation-appartement-paris-16': ['renovation', 'architecteInterieurParis', 'decoration'],

  // Decoration articles
  'tendances-decoration-2026': ['decoration', 'furnishing', 'architecteInterieurParis'],
  'guide-choix-style-interieur': ['decoration', 'furnishing', 'customLayout'],
  'choisir-parquet-appartement-haussmannien': ['renovation', 'decoration', 'architecteInterieurParis'],

  // Professional articles
  'trouver-architecte-interieur-paris': ['architecteInterieurParis', 'renovation', 'decoration'],
  'tarif-architecte-interieur-paris': ['architecteInterieurParis', 'renovation', 'customLayout'],
  'decorateur-ou-architecte-interieur': ['decorateurInterieurParis', 'architecteInterieurParis', 'decoration'],
  'difference-architecte-architecte-interieur': ['architecteInterieurParis', 'renovation', 'decoration'],
  'role-architecte-interieur': ['architecteInterieurParis', 'renovation', 'decoration'],

  // Optimization articles
  'optimiser-rangement-appartement-parisien': ['customLayout', 'decoration', 'architecteInterieurParis'],
  'comment-agrandir-visuellement-petit-appartement': ['decoration', 'customLayout', 'lightingDesign'],
  'amenagement-cuisine-ouverte-salon': ['kitchenBathroom', 'customLayout', 'renovation'],

  // Home Staging articles
  'home-staging-paris-valoriser-bien': ['homeStaging', 'decoration', 'furnishing'],

  // Default fallback
  '_default': ['architecteInterieurParis', 'renovation', 'decoration'],
}

// Mapping services to related blog articles
export const serviceToBlog: Record<ServiceKey, string[]> = {
  renovation: ['renovation-appartement-paris-guide-complet', 'renovation-appartement-haussmannien-guide'],
  decoration: ['tendances-decoration-2026', 'guide-choix-style-interieur'],
  furnishing: ['tendances-decoration-2026', 'guide-choix-style-interieur'],
  homeStaging: ['home-staging-paris-valoriser-bien', 'tendances-decoration-2026'],
  kitchenBathroom: ['renovation-salle-de-bain-paris-guide-complet', 'amenagement-cuisine-ouverte-salon'],
  customLayout: ['optimiser-rangement-appartement-parisien', 'comment-agrandir-visuellement-petit-appartement'],
  lightingDesign: ['tendances-decoration-2026', 'comment-agrandir-visuellement-petit-appartement'],
  exteriorDesign: ['tendances-decoration-2026', 'guide-choix-style-interieur'],
  officeDesign: ['tendances-decoration-2026', 'guide-choix-style-interieur'],
  commercialDesign: ['tendances-decoration-2026', 'guide-choix-style-interieur'],
  architecteInterieurParis: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  decorateurInterieurParis: ['decorateur-ou-architecte-interieur', 'trouver-architecte-interieur-paris'],
  architecteInterieurParis3: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  architecteInterieurParis4: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  architecteInterieurParis6: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  architecteInterieurParis7: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  architecteInterieurParis8: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  architecteInterieurParis9: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  architecteInterieurParis11: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  architecteInterieurParis15: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  architecteInterieurParis16: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
  architecteInterieurParis17: ['trouver-architecte-interieur-paris', 'tarif-architecte-interieur-paris'],
}

// Articles grouped by category
export const articlesByCategory: Record<ArticleCategory, string[]> = {
  renovation: [
    'renovation-appartement-paris-guide-complet',
    'renovation-appartement-haussmannien-guide',
    'renovation-salle-de-bain-paris-guide-complet',
    'renovation-appartement-ancien-erreurs-eviter',
    'renovation-appartement-paris-16',
  ],
  decoration: [
    'tendances-decoration-2026',
    'guide-choix-style-interieur',
    'choisir-parquet-appartement-haussmannien',
  ],
  professionnels: [
    'trouver-architecte-interieur-paris',
    'tarif-architecte-interieur-paris',
    'decorateur-ou-architecte-interieur',
    'difference-architecte-architecte-interieur',
    'role-architecte-interieur',
  ],
  tendances: ['avenir-architecture-interieur-2023'],
  optimisation: [
    'optimiser-rangement-appartement-parisien',
    'comment-agrandir-visuellement-petit-appartement',
    'amenagement-cuisine-ouverte-salon',
  ],
  'home-staging': ['home-staging-paris-valoriser-bien'],
}

// Helper functions
export function getServicesForArticle(slug: string): ServiceKey[] {
  return blogToServices[slug] || blogToServices['_default']
}

export function getArticlesForService(serviceKey: ServiceKey): string[] {
  return serviceToBlog[serviceKey] || []
}

export function getRelatedArticlesByCategory(
  category: ArticleCategory,
  currentSlug: string,
  limit: number = 2
): string[] {
  const articles = articlesByCategory[category] || []
  return articles.filter((slug) => slug !== currentSlug).slice(0, limit)
}
