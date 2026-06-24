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
  architecteInterieurParis3: 'architecte-interieur-paris-3',
  architecteInterieurParis4: 'architecte-interieur-paris-4',
  architecteInterieurParis6: 'architecte-interieur-paris-6',
  architecteInterieurParis7: 'architecte-interieur-paris-7',
  architecteInterieurParis8: 'architecte-interieur-paris-8',
  architecteInterieurParis9: 'architecte-interieur-paris-9',
  architecteInterieurParis11: 'architecte-interieur-paris-11',
  architecteInterieurParis15: 'architecte-interieur-paris-15',
  architecteInterieurParis16: 'architecte-interieur-paris-16',
  architecteInterieurParis17: 'architecte-interieur-paris-17',
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
  architecteInterieurParis3: 'interior-designer-paris-3',
  architecteInterieurParis4: 'interior-designer-paris-4',
  architecteInterieurParis6: 'interior-designer-paris-6',
  architecteInterieurParis7: 'interior-designer-paris-7',
  architecteInterieurParis8: 'interior-designer-paris-8',
  architecteInterieurParis9: 'interior-designer-paris-9',
  architecteInterieurParis11: 'interior-designer-paris-11',
  architecteInterieurParis15: 'interior-designer-paris-15',
  architecteInterieurParis16: 'interior-designer-paris-16',
  architecteInterieurParis17: 'interior-designer-paris-17',
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
  architecteInterieurParis3: 'architetto-interni-parigi-3',
  architecteInterieurParis4: 'architetto-interni-parigi-4',
  architecteInterieurParis6: 'architetto-interni-parigi-6',
  architecteInterieurParis7: 'architetto-interni-parigi-7',
  architecteInterieurParis8: 'architetto-interni-parigi-8',
  architecteInterieurParis9: 'architetto-interni-parigi-9',
  architecteInterieurParis11: 'architetto-interni-parigi-11',
  architecteInterieurParis15: 'architetto-interni-parigi-15',
  architecteInterieurParis16: 'architetto-interni-parigi-16',
  architecteInterieurParis17: 'architetto-interni-parigi-17',
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
  architecteInterieurParis3: 'innenarchitekt-paris-3',
  architecteInterieurParis4: 'innenarchitekt-paris-4',
  architecteInterieurParis6: 'innenarchitekt-paris-6',
  architecteInterieurParis7: 'innenarchitekt-paris-7',
  architecteInterieurParis8: 'innenarchitekt-paris-8',
  architecteInterieurParis9: 'innenarchitekt-paris-9',
  architecteInterieurParis11: 'innenarchitekt-paris-11',
  architecteInterieurParis15: 'innenarchitekt-paris-15',
  architecteInterieurParis16: 'innenarchitekt-paris-16',
  architecteInterieurParis17: 'innenarchitekt-paris-17',
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
  architecteInterieurParis3: 'disenador-interiores-paris-3',
  architecteInterieurParis4: 'disenador-interiores-paris-4',
  architecteInterieurParis6: 'disenador-interiores-paris-6',
  architecteInterieurParis7: 'disenador-interiores-paris-7',
  architecteInterieurParis8: 'disenador-interiores-paris-8',
  architecteInterieurParis9: 'disenador-interiores-paris-9',
  architecteInterieurParis11: 'disenador-interiores-paris-11',
  architecteInterieurParis15: 'disenador-interiores-paris-15',
  architecteInterieurParis16: 'disenador-interiores-paris-16',
  architecteInterieurParis17: 'disenador-interiores-paris-17',
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

export const startSlugs = {
  en: 'start',
  fr: 'demarrer',
  it: 'inizia',
  de: 'projekt-starten',
  es: 'empezar',
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
    startSlugs[locale],
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
  architecteInterieurParis3: {
    en: '/en/services/interior-designer-paris-3',
    fr: '/fr/services/architecte-interieur-paris-3',
    it: '/it/servizi/architetto-interni-parigi-3',
    de: '/de/dienstleistungen/innenarchitekt-paris-3',
    es: '/es/servicios/disenador-interiores-paris-3',
  },
  architecteInterieurParis4: {
    en: '/en/services/interior-designer-paris-4',
    fr: '/fr/services/architecte-interieur-paris-4',
    it: '/it/servizi/architetto-interni-parigi-4',
    de: '/de/dienstleistungen/innenarchitekt-paris-4',
    es: '/es/servicios/disenador-interiores-paris-4',
  },
  architecteInterieurParis6: {
    en: '/en/services/interior-designer-paris-6',
    fr: '/fr/services/architecte-interieur-paris-6',
    it: '/it/servizi/architetto-interni-parigi-6',
    de: '/de/dienstleistungen/innenarchitekt-paris-6',
    es: '/es/servicios/disenador-interiores-paris-6',
  },
  architecteInterieurParis7: {
    en: '/en/services/interior-designer-paris-7',
    fr: '/fr/services/architecte-interieur-paris-7',
    it: '/it/servizi/architetto-interni-parigi-7',
    de: '/de/dienstleistungen/innenarchitekt-paris-7',
    es: '/es/servicios/disenador-interiores-paris-7',
  },
  architecteInterieurParis8: {
    en: '/en/services/interior-designer-paris-8',
    fr: '/fr/services/architecte-interieur-paris-8',
    it: '/it/servizi/architetto-interni-parigi-8',
    de: '/de/dienstleistungen/innenarchitekt-paris-8',
    es: '/es/servicios/disenador-interiores-paris-8',
  },
  architecteInterieurParis9: {
    en: '/en/services/interior-designer-paris-9',
    fr: '/fr/services/architecte-interieur-paris-9',
    it: '/it/servizi/architetto-interni-parigi-9',
    de: '/de/dienstleistungen/innenarchitekt-paris-9',
    es: '/es/servicios/disenador-interiores-paris-9',
  },
  architecteInterieurParis11: {
    en: '/en/services/interior-designer-paris-11',
    fr: '/fr/services/architecte-interieur-paris-11',
    it: '/it/servizi/architetto-interni-parigi-11',
    de: '/de/dienstleistungen/innenarchitekt-paris-11',
    es: '/es/servicios/disenador-interiores-paris-11',
  },
  architecteInterieurParis15: {
    en: '/en/services/interior-designer-paris-15',
    fr: '/fr/services/architecte-interieur-paris-15',
    it: '/it/servizi/architetto-interni-parigi-15',
    de: '/de/dienstleistungen/innenarchitekt-paris-15',
    es: '/es/servicios/disenador-interiores-paris-15',
  },
  architecteInterieurParis16: {
    en: '/en/services/interior-designer-paris-16',
    fr: '/fr/services/architecte-interieur-paris-16',
    it: '/it/servizi/architetto-interni-parigi-16',
    de: '/de/dienstleistungen/innenarchitekt-paris-16',
    es: '/es/servicios/disenador-interiores-paris-16',
  },
  architecteInterieurParis17: {
    en: '/en/services/interior-designer-paris-17',
    fr: '/fr/services/architecte-interieur-paris-17',
    it: '/it/servizi/architetto-interni-parigi-17',
    de: '/de/dienstleistungen/innenarchitekt-paris-17',
    es: '/es/servicios/disenador-interiores-paris-17',
  },
}
