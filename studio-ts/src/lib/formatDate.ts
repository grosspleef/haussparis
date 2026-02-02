const localeMap: Record<string, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  it: 'it-IT',
  de: 'de-DE',
  es: 'es-ES',
}

export function formatDate(dateString: string, locale: string = 'en') {
  let parts = dateString.split('-')
  let hasDay = parts.length > 2
  const dateLocale = localeMap[locale] || 'en-US'

  return new Date(`${dateString}Z`).toLocaleDateString(dateLocale, {
    day: hasDay ? 'numeric' : undefined,
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
