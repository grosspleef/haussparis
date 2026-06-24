type FbqParams = Record<string, string | number | boolean>

/**
 * Déclenche un événement Meta Pixel côté client (ex: `Lead`, `Contact`).
 * No-op si le Pixel n'est pas chargé (dev, ID non configuré, ou bloqueur de pub).
 */
export function trackMetaEvent(event: string, params?: FbqParams) {
  if (typeof window === 'undefined') return
  const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq
  if (typeof fbq !== 'function') return
  if (params) {
    fbq('track', event, params)
  } else {
    fbq('track', event)
  }
}
