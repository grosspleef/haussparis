export const locales = ['en', 'fr', 'it', 'de', 'es'] as const
export type Locale = (typeof locales)[number]

// Service slugs per locale
export const servicesSlugs = {
  en: 'services',
  fr: 'services',
  it: 'servizi',
  de: 'dienstleistungen',
  es: 'servicios',
} as const

// Individual service slugs per locale
export const frServiceSlugs = {
  renovation: 'renovation',
  decoration: 'decoration',
  furnishing: 'ameublement',
  homeStaging: 'home-staging',
  kitchenBathroom: 'cuisine-salle-de-bain',
  customLayout: 'amenagement-sur-mesure',
  lightingDesign: 'design-eclairage',
  exteriorDesign: 'design-exterieur',
  officeDesign: 'design-bureaux',
  commercialDesign: 'design-commercial',
  architecteInterieurParis: 'architecte-interieur-paris',
  decorateurInterieurParis: 'decorateur-interieur-paris',
} as const

export const enServiceSlugs = {
  renovation: 'renovation',
  decoration: 'decoration',
  furnishing: 'furnishing',
  homeStaging: 'home-staging',
  kitchenBathroom: 'kitchen-bathroom',
  customLayout: 'custom-layout',
  lightingDesign: 'lighting-design',
  exteriorDesign: 'exterior-design',
  officeDesign: 'office-design',
  commercialDesign: 'commercial-design',
  architecteInterieurParis: 'interior-designer-paris',
  decorateurInterieurParis: 'interior-decorator-paris',
} as const

export const itServiceSlugs = {
  renovation: 'ristrutturazione',
  decoration: 'decorazione',
  furnishing: 'arredamento',
  homeStaging: 'home-staging',
  kitchenBathroom: 'cucina-bagno',
  customLayout: 'progettazione-su-misura',
  lightingDesign: 'design-illuminazione',
  exteriorDesign: 'design-esterni',
  officeDesign: 'design-uffici',
  commercialDesign: 'design-commerciale',
  architecteInterieurParis: 'architetto-interni-parigi',
  decorateurInterieurParis: 'decoratore-interni-parigi',
} as const

export const deServiceSlugs = {
  renovation: 'renovierung',
  decoration: 'dekoration',
  furnishing: 'einrichtung',
  homeStaging: 'home-staging',
  kitchenBathroom: 'kueche-bad',
  customLayout: 'individuelle-gestaltung',
  lightingDesign: 'lichtdesign',
  exteriorDesign: 'aussendesign',
  officeDesign: 'buerodesign',
  commercialDesign: 'gewerbedesign',
  architecteInterieurParis: 'innenarchitekt-paris',
  decorateurInterieurParis: 'innendekorateur-paris',
} as const

export const esServiceSlugs = {
  renovation: 'renovacion',
  decoration: 'decoracion',
  furnishing: 'mobiliario',
  homeStaging: 'home-staging',
  kitchenBathroom: 'cocina-bano',
  customLayout: 'diseno-personalizado',
  lightingDesign: 'diseno-iluminacion',
  exteriorDesign: 'diseno-exterior',
  officeDesign: 'diseno-oficinas',
  commercialDesign: 'diseno-comercial',
  architecteInterieurParis: 'disenador-interiores-paris',
  decorateurInterieurParis: 'decorador-interiores-paris',
} as const

export type ServiceKey = keyof typeof frServiceSlugs

export const localeToServiceSlug: Record<Locale, Record<ServiceKey, string>> = {
  fr: frServiceSlugs,
  en: enServiceSlugs,
  it: itServiceSlugs,
  de: deServiceSlugs,
  es: esServiceSlugs,
}

// Page slugs per locale
export const aboutSlugs = {
  en: 'about',
  fr: 'a-propos',
  it: 'chi-siamo',
  de: 'uber-uns',
  es: 'sobre-nosotros',
} as const

export const processSlugs = {
  en: 'our-process',
  fr: 'notre-processus',
  it: 'il-nostro-processo',
  de: 'unser-prozess',
  es: 'nuestro-proceso',
} as const

export const contactSlugs = {
  en: 'contact',
  fr: 'contact',
  it: 'contatto',
  de: 'kontakt',
  es: 'contacto',
} as const

// Helper function to get service URL
export function getServiceUrl(locale: Locale, serviceKey: ServiceKey): string {
  const servicesSlug = servicesSlugs[locale]
  const serviceSlug = localeToServiceSlug[locale][serviceKey]
  return `/${locale}/${servicesSlug}/${serviceSlug}`
}

// Helper to check if a slug belongs to a locale
export function isValidLocaleSlug(slug: string, locale: Locale): boolean {
  const validSlugs = [
    ...Object.values(localeToServiceSlug[locale]),
    aboutSlugs[locale],
    processSlugs[locale],
    contactSlugs[locale],
  ]
  return validSlugs.includes(slug)
}

// Routes object for service URLs by locale (used by RelatedServices)
export const routes: Record<ServiceKey, Record<Locale, string>> = {
  renovation: {
    en: '/en/services/renovation',
    fr: '/fr/services/renovation',
    it: '/it/servizi/ristrutturazione',
    de: '/de/dienstleistungen/renovierung',
    es: '/es/servicios/renovacion',
  },
  decoration: {
    en: '/en/services/decoration',
    fr: '/fr/services/decoration',
    it: '/it/servizi/decorazione',
    de: '/de/dienstleistungen/dekoration',
    es: '/es/servicios/decoracion',
  },
  furnishing: {
    en: '/en/services/furnishing',
    fr: '/fr/services/ameublement',
    it: '/it/servizi/arredamento',
    de: '/de/dienstleistungen/einrichtung',
    es: '/es/servicios/mobiliario',
  },
  homeStaging: {
    en: '/en/services/home-staging',
    fr: '/fr/services/home-staging',
    it: '/it/servizi/home-staging',
    de: '/de/dienstleistungen/home-staging',
    es: '/es/servicios/home-staging',
  },
  kitchenBathroom: {
    en: '/en/services/kitchen-bathroom',
    fr: '/fr/services/cuisine-salle-de-bain',
    it: '/it/servizi/cucina-bagno',
    de: '/de/dienstleistungen/kueche-bad',
    es: '/es/servicios/cocina-bano',
  },
  customLayout: {
    en: '/en/services/custom-layout',
    fr: '/fr/services/amenagement-sur-mesure',
    it: '/it/servizi/progettazione-su-misura',
    de: '/de/dienstleistungen/individuelle-gestaltung',
    es: '/es/servicios/diseno-personalizado',
  },
  lightingDesign: {
    en: '/en/services/lighting-design',
    fr: '/fr/services/design-eclairage',
    it: '/it/servizi/design-illuminazione',
    de: '/de/dienstleistungen/lichtdesign',
    es: '/es/servicios/diseno-iluminacion',
  },
  exteriorDesign: {
    en: '/en/services/exterior-design',
    fr: '/fr/services/design-exterieur',
    it: '/it/servizi/design-esterni',
    de: '/de/dienstleistungen/aussendesign',
    es: '/es/servicios/diseno-exterior',
  },
  officeDesign: {
    en: '/en/services/office-design',
    fr: '/fr/services/design-bureaux',
    it: '/it/servizi/design-uffici',
    de: '/de/dienstleistungen/buerodesign',
    es: '/es/servicios/diseno-oficinas',
  },
  commercialDesign: {
    en: '/en/services/commercial-design',
    fr: '/fr/services/design-commercial',
    it: '/it/servizi/design-commerciale',
    de: '/de/dienstleistungen/gewerbedesign',
    es: '/es/servicios/diseno-comercial',
  },
  architecteInterieurParis: {
    en: '/en/services/interior-designer-paris',
    fr: '/fr/services/architecte-interieur-paris',
    it: '/it/servizi/architetto-interni-parigi',
    de: '/de/dienstleistungen/innenarchitekt-paris',
    es: '/es/servicios/disenador-interiores-paris',
  },
  decorateurInterieurParis: {
    en: '/en/services/interior-decorator-paris',
    fr: '/fr/services/decorateur-interieur-paris',
    it: '/it/servizi/decoratore-interni-parigi',
    de: '/de/dienstleistungen/innendekorateur-paris',
    es: '/es/servicios/decorador-interiores-paris',
  },
}
