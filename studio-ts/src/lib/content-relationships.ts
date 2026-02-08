import { type ServiceKey } from './routes'
import { type ArticleCategory } from './blog-metadata'

// Service metadata translation keys for RelatedServices component
export const serviceMetadataTranslationKeys: Record<ServiceKey, { nameKey: string; descriptionKey: string }> = {
  renovation: { nameKey: 'RenovationService.title', descriptionKey: 'RenovationService.intro' },
  decoration: { nameKey: 'DecorationService.title', descriptionKey: 'DecorationService.intro' },
  furnishing: { nameKey: 'FurnishingService.title', descriptionKey: 'FurnishingService.intro' },
  homeStaging: { nameKey: 'HomeStagingService.title', descriptionKey: 'HomeStagingService.intro' },
  kitchenBathroom: { nameKey: 'KitchenBathroomService.title', descriptionKey: 'KitchenBathroomService.intro' },
  customLayout: { nameKey: 'CustomLayoutService.title', descriptionKey: 'CustomLayoutService.intro' },
  lightingDesign: { nameKey: 'LightingDesignService.title', descriptionKey: 'LightingDesignService.intro' },
  exteriorDesign: { nameKey: 'OutdoorDesignService.title', descriptionKey: 'OutdoorDesignService.intro' },
  officeDesign: { nameKey: 'WorkplaceDesignService.title', descriptionKey: 'WorkplaceDesignService.intro' },
  commercialDesign: { nameKey: 'CommercialDesignService.metadata.title', descriptionKey: 'CommercialDesignService.metadata.description' },
  architecteInterieurParis: { nameKey: 'ArchitecteInterieurParisService.title', descriptionKey: 'ArchitecteInterieurParisService.intro' },
  decorateurInterieurParis: { nameKey: 'DecoratorParisService.title', descriptionKey: 'DecoratorParisService.intro' },
  architecteInterieurParis3: { nameKey: 'ArchitecteParis3Service.title', descriptionKey: 'ArchitecteParis3Service.intro' },
  architecteInterieurParis4: { nameKey: 'ArchitecteParis4Service.title', descriptionKey: 'ArchitecteParis4Service.intro' },
  architecteInterieurParis6: { nameKey: 'ArchitecteParis6Service.title', descriptionKey: 'ArchitecteParis6Service.intro' },
  architecteInterieurParis7: { nameKey: 'ArchitecteParis7Service.title', descriptionKey: 'ArchitecteParis7Service.intro' },
  architecteInterieurParis8: { nameKey: 'ArchitecteParis8Service.title', descriptionKey: 'ArchitecteParis8Service.intro' },
  architecteInterieurParis9: { nameKey: 'ArchitecteParis9Service.title', descriptionKey: 'ArchitecteParis9Service.intro' },
  architecteInterieurParis11: { nameKey: 'ArchitecteParis11Service.title', descriptionKey: 'ArchitecteParis11Service.intro' },
  architecteInterieurParis15: { nameKey: 'ArchitecteParis15Service.title', descriptionKey: 'ArchitecteParis15Service.intro' },
  architecteInterieurParis16: { nameKey: 'ArchitecteParis16Service.title', descriptionKey: 'ArchitecteParis16Service.intro' },
  architecteInterieurParis17: { nameKey: 'ArchitecteParis17Service.title', descriptionKey: 'ArchitecteParis17Service.intro' },
}

export type { ServiceKey }

// Mapping blog articles to related services
export const blogToServices: Record<string, ServiceKey[]> = {
  // Renovation articles
  'renovation-appartement-paris-guide-complet': ['renovation', 'architecteInterieurParis', 'kitchenBathroom'],
  'renovation-appartement-haussmannien-guide': ['renovation', 'architecteInterieurParis', 'decoration'],
  'renovation-salle-de-bain-paris-guide-complet': ['kitchenBathroom', 'renovation', 'customLayout'],
  'renovation-cuisine-paris-guide-complet': ['kitchenBathroom', 'renovation', 'customLayout'],
  'kitchen-renovation-paris-complete-guide': ['kitchenBathroom', 'renovation', 'customLayout'],
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
  kitchenBathroom: ['renovation-cuisine-paris-guide-complet', 'renovation-salle-de-bain-paris-guide-complet', 'amenagement-cuisine-ouverte-salon'],
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
    'renovation-cuisine-paris-guide-complet',
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
