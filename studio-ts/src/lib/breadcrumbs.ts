export interface BreadcrumbItem {
  name: string
  href: string
}

// Helper function to generate breadcrumbs for service pages
export function getServiceBreadcrumbs(
  locale: string,
  serviceName: string,
  serviceHref: string
): BreadcrumbItem[] {
  const homeLabels: Record<string, string> = {
    en: 'Home',
    fr: 'Accueil',
    it: 'Home',
    de: 'Startseite',
    es: 'Inicio',
  }

  const servicesLabels: Record<string, string> = {
    en: 'Services',
    fr: 'Services',
    it: 'Servizi',
    de: 'Dienstleistungen',
    es: 'Servicios',
  }

  const servicesHrefs: Record<string, string> = {
    en: '/en/services',
    fr: '/fr/services',
    it: '/it/servizi',
    de: '/de/dienstleistungen',
    es: '/es/servicios',
  }

  return [
    { name: homeLabels[locale] || 'Home', href: `/${locale}` },
    { name: servicesLabels[locale] || 'Services', href: servicesHrefs[locale] || '/en/services' },
    { name: serviceName, href: serviceHref },
  ]
}

// Helper function to generate breadcrumbs for blog articles
export function getBlogBreadcrumbs(
  locale: string,
  articleTitle: string,
  articleHref: string
): BreadcrumbItem[] {
  const homeLabels: Record<string, string> = {
    en: 'Home',
    fr: 'Accueil',
    it: 'Home',
    de: 'Startseite',
    es: 'Inicio',
  }

  const blogLabels: Record<string, string> = {
    en: 'Blog',
    fr: 'Blog',
    it: 'Blog',
    de: 'Blog',
    es: 'Blog',
  }

  return [
    { name: homeLabels[locale] || 'Home', href: `/${locale}` },
    { name: blogLabels[locale] || 'Blog', href: `/${locale}/blog` },
    { name: articleTitle, href: articleHref },
  ]
}
