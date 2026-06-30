import { createHash } from 'crypto'

const GRAPH_VERSION = 'v21.0'

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex')
}

/** Meta exige l'email en minuscules, trimmé, puis SHA-256. */
function hashEmail(email: string): string {
  return sha256(email.trim().toLowerCase())
}

/** Meta exige le téléphone en chiffres uniquement (indicatif compris), puis SHA-256. */
function hashPhone(phone: string): string | null {
  const digits = phone.replace(/[^0-9]/g, '')
  return digits ? sha256(digits) : null
}

export type CapiLeadInput = {
  eventId: string
  eventSourceUrl?: string
  email?: string
  phone?: string
  clientIp?: string
  userAgent?: string
  fbp?: string
  fbc?: string
}

/**
 * Envoie l'événement de conversion « Lead » à Meta via la Conversions API
 * (server-to-server). Complète le Pixel navigateur :
 *  - même `eventId` que `fbq('track','Lead', …, { eventID })` → Meta déduplique ;
 *  - récupère les conversions que le Pixel rate (bloqueurs de pub, iOS/Safari).
 *
 * Appel serveur-à-serveur → ne passe PAS par le navigateur, donc rien à ajouter
 * au CSP. No-op si `META_CAPI_ACCESS_TOKEN` ou l'ID Pixel ne sont pas configurés.
 * Ne jette jamais : toute erreur est loggée et avalée pour ne pas casser la réponse.
 *
 * RGPD : on envoie l'email/téléphone (hashés) que l'utilisateur fournit
 * volontairement pour être recontacté. `_fbp`/`_fbc` ne sont inclus que s'ils
 * existent, c.-à-d. après consentement cookies (le Pixel les pose). Pour gater
 * l'événement entier sur le consentement cookies, ne pas appeler cette fonction
 * quand le bandeau n'a pas été accepté.
 */
export async function sendCapiLead(input: CapiLeadInput): Promise<void> {
  const pixelId =
    process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN
  if (!pixelId || !accessToken) return

  const userData: Record<string, unknown> = {}
  if (input.email) userData.em = [hashEmail(input.email)]
  if (input.phone) {
    const ph = hashPhone(input.phone)
    if (ph) userData.ph = [ph]
  }
  if (input.clientIp) userData.client_ip_address = input.clientIp
  if (input.userAgent) userData.client_user_agent = input.userAgent
  if (input.fbp) userData.fbp = input.fbp
  if (input.fbc) userData.fbc = input.fbc

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: 'website',
        ...(input.eventSourceUrl
          ? { event_source_url: input.eventSourceUrl }
          : {}),
        user_data: userData,
      },
    ],
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      },
    )
    if (!res.ok) {
      console.error('Meta CAPI Lead failed:', res.status, await res.text())
    }
  } catch (err) {
    console.error('Meta CAPI Lead error:', err)
  }
}
