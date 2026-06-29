import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { sendCapiLead } from '@/lib/metaCapi'

// Rate limiting: Map to track requests per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5

// Input validation constants
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_COMPANY_LENGTH = 100
const MAX_PHONE_LENGTH = 30
const MAX_MESSAGE_LENGTH = 5000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Traductions pour les emails
const translations = {
  fr: {
    budgetLabels: {
      '50-100': '50K € – 100K €',
      '100-250': '100K € – 250K €',
      '250-500': '250K € – 500K €',
      '500+': 'Plus de 500K €',
    },
    notSpecified: 'Non spécifié',
    requiredFields: 'Les champs nom, email et message sont requis',
    invalidEmail: 'Format d\'email invalide',
    rateLimitExceeded: 'Trop de requêtes. Veuillez réessayer dans une minute.',
    inputTooLong: 'Un ou plusieurs champs dépassent la longueur maximale autorisée',
    emailError: 'L\'envoi de votre demande a échoué. Merci de réessayer dans un instant.',
    subjectConfirmation: 'Confirmation de réception - HAUSS Paris',
    subjectNotification: 'Nouveau contact : {name}',
    confirmation: {
      greeting: 'Merci {name} !',
      received: 'Nous avons bien reçu votre demande de contact et nous vous en remercions.',
      response: 'Notre équipe va étudier votre projet avec attention et reviendra vers vous dans les plus brefs délais.',
      summaryTitle: 'Récapitulatif de votre demande',
      name: 'Nom :',
      email: 'Email :',
      company: 'Entreprise :',
      phone: 'Téléphone :',
      budget: 'Budget :',
      message: 'Message :',
      portfolio: 'En attendant, n\'hésitez pas à consulter notre portfolio et découvrir nos réalisations sur notre site.',
      signature: 'À très bientôt,',
      team: 'L\'équipe HAUSS Paris',
      footer: 'Email : contact@haussparis.com | Téléphone : +33 6 19 44 92 55'
    },
    notification: {
      title: '📨 Nouvelle demande de contact',
      intro: 'Une nouvelle demande a été reçue via le formulaire de contact du site.',
      infoTitle: 'Informations du contact',
      name: 'Nom :',
      email: 'Email :',
      company: 'Entreprise :',
      phone: 'Téléphone :',
      budget: 'Budget :',
      message: 'Message :',
      actionRequired: 'Action requise :',
      actionText: 'N\'oubliez pas de recontacter ce prospect rapidement.',
      footer: 'Ce message a été envoyé automatiquement depuis le formulaire de contact de haussparis.com'
    },
    projectInfo: {
      title: 'Détails du projet',
      type: 'Type de projet :',
      propertyType: 'Type de bien :',
      surface: 'Surface :',
      budget: 'Budget :',
      address: 'Localisation :',
      planning: 'Démarrage :',
      ownership: 'Situation :',
    }
  },
  en: {
    budgetLabels: {
      '50-100': '50K € – 100K €',
      '100-250': '100K € – 250K €',
      '250-500': '250K € – 500K €',
      '500+': 'More than 500K €',
    },
    notSpecified: 'Not specified',
    requiredFields: 'Name, email and message fields are required',
    invalidEmail: 'Invalid email format',
    rateLimitExceeded: 'Too many requests. Please try again in a minute.',
    inputTooLong: 'One or more fields exceed the maximum allowed length',
    emailError: 'Your request could not be sent. Please try again shortly.',
    subjectConfirmation: 'Receipt confirmation - HAUSS Paris',
    subjectNotification: 'New contact: {name}',
    confirmation: {
      greeting: 'Thank you {name}!',
      received: 'We have received your contact request and we thank you.',
      response: 'Our team will carefully review your project and get back to you as soon as possible.',
      summaryTitle: 'Summary of your request',
      name: 'Name:',
      email: 'Email:',
      company: 'Company:',
      phone: 'Phone:',
      budget: 'Budget:',
      message: 'Message:',
      portfolio: 'In the meantime, feel free to consult our portfolio and discover our achievements on our site.',
      signature: 'See you soon,',
      team: 'The HAUSS Paris team',
      footer: 'Email: contact@haussparis.com | Phone: +33 6 19 44 92 55'
    },
    notification: {
      title: '📨 New contact request',
      intro: 'A new request has been received via the website contact form.',
      infoTitle: 'Contact information',
      name: 'Name:',
      email: 'Email:',
      company: 'Company:',
      phone: 'Phone:',
      budget: 'Budget:',
      message: 'Message:',
      actionRequired: 'Action required:',
      actionText: 'Don\'t forget to contact this prospect promptly.',
      footer: 'This message was sent automatically from the haussparis.com contact form'
    },
    projectInfo: {
      title: 'Project details',
      type: 'Project type:',
      propertyType: 'Property type:',
      surface: 'Surface:',
      budget: 'Budget:',
      address: 'Location:',
      planning: 'Timeline:',
      ownership: 'Situation:',
    }
  },
  de: {
    budgetLabels: {
      '50-100': '50K € – 100K €',
      '100-250': '100K € – 250K €',
      '250-500': '250K € – 500K €',
      '500+': 'Mehr als 500K €',
    },
    notSpecified: 'Nicht angegeben',
    requiredFields: 'Die Felder Name, E-Mail und Nachricht sind erforderlich',
    invalidEmail: 'Ungültiges E-Mail-Format',
    rateLimitExceeded: 'Zu viele Anfragen. Bitte versuchen Sie es in einer Minute erneut.',
    inputTooLong: 'Ein oder mehrere Felder überschreiten die maximal zulässige Länge',
    emailError: 'Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es gleich erneut.',
    subjectConfirmation: 'Empfangsbestätigung - HAUSS Paris',
    subjectNotification: 'Neuer Kontakt: {name}',
    confirmation: {
      greeting: 'Vielen Dank, {name}!',
      received: 'Wir haben Ihre Kontaktanfrage erhalten und danken Ihnen dafür.',
      response: 'Unser Team prüft Ihr Projekt sorgfältig und meldet sich schnellstmöglich bei Ihnen.',
      summaryTitle: 'Zusammenfassung Ihrer Anfrage',
      name: 'Name:',
      email: 'E-Mail:',
      company: 'Unternehmen:',
      phone: 'Telefon:',
      budget: 'Budget:',
      message: 'Nachricht:',
      portfolio: 'In der Zwischenzeit können Sie gerne unser Portfolio ansehen und unsere Projekte auf unserer Website entdecken.',
      signature: 'Bis bald,',
      team: 'Das HAUSS Paris Team',
      footer: 'E-Mail: contact@haussparis.com | Telefon: +33 6 19 44 92 55'
    },
    notification: {
      title: '📨 Neue Kontaktanfrage',
      intro: 'Eine neue Anfrage ist über das Kontaktformular der Website eingegangen.',
      infoTitle: 'Kontaktinformationen',
      name: 'Name:',
      email: 'E-Mail:',
      company: 'Unternehmen:',
      phone: 'Telefon:',
      budget: 'Budget:',
      message: 'Nachricht:',
      actionRequired: 'Erforderliche Aktion:',
      actionText: 'Vergessen Sie nicht, diesen Interessenten zeitnah zu kontaktieren.',
      footer: 'Diese Nachricht wurde automatisch über das Kontaktformular von haussparis.com gesendet'
    },
    projectInfo: {
      title: 'Projektdetails',
      type: 'Projektart:',
      propertyType: 'Objektart:',
      surface: 'Fläche:',
      budget: 'Budget:',
      address: 'Standort:',
      planning: 'Beginn:',
      ownership: 'Situation:',
    }
  },
  es: {
    budgetLabels: {
      '50-100': '50K € – 100K €',
      '100-250': '100K € – 250K €',
      '250-500': '250K € – 500K €',
      '500+': 'Más de 500K €',
    },
    notSpecified: 'No especificado',
    requiredFields: 'Los campos nombre, email y mensaje son obligatorios',
    invalidEmail: 'Formato de email no válido',
    rateLimitExceeded: 'Demasiadas solicitudes. Vuelve a intentarlo en un minuto.',
    inputTooLong: 'Uno o varios campos superan la longitud máxima permitida',
    emailError: 'No se ha podido enviar tu solicitud. Inténtalo de nuevo en un momento.',
    subjectConfirmation: 'Confirmación de recepción - HAUSS Paris',
    subjectNotification: 'Nuevo contacto: {name}',
    confirmation: {
      greeting: '¡Gracias, {name}!',
      received: 'Hemos recibido tu solicitud de contacto y te lo agradecemos.',
      response: 'Nuestro equipo estudiará tu proyecto con atención y te responderá lo antes posible.',
      summaryTitle: 'Resumen de tu solicitud',
      name: 'Nombre:',
      email: 'Email:',
      company: 'Empresa:',
      phone: 'Teléfono:',
      budget: 'Presupuesto:',
      message: 'Mensaje:',
      portfolio: 'Mientras tanto, no dudes en consultar nuestro portafolio y descubrir nuestros proyectos en nuestra web.',
      signature: 'Hasta pronto,',
      team: 'El equipo de HAUSS Paris',
      footer: 'Email: contact@haussparis.com | Teléfono: +33 6 19 44 92 55'
    },
    notification: {
      title: '📨 Nueva solicitud de contacto',
      intro: 'Se ha recibido una nueva solicitud a través del formulario de contacto de la web.',
      infoTitle: 'Información del contacto',
      name: 'Nombre:',
      email: 'Email:',
      company: 'Empresa:',
      phone: 'Teléfono:',
      budget: 'Presupuesto:',
      message: 'Mensaje:',
      actionRequired: 'Acción requerida:',
      actionText: 'No olvides volver a contactar con este prospecto rápidamente.',
      footer: 'Este mensaje se ha enviado automáticamente desde el formulario de contacto de haussparis.com'
    },
    projectInfo: {
      title: 'Detalles del proyecto',
      type: 'Tipo de proyecto:',
      propertyType: 'Tipo de inmueble:',
      surface: 'Superficie:',
      budget: 'Presupuesto:',
      address: 'Ubicación:',
      planning: 'Inicio:',
      ownership: 'Situación:',
    }
  },
  it: {
    budgetLabels: {
      '50-100': '50K € – 100K €',
      '100-250': '100K € – 250K €',
      '250-500': '250K € – 500K €',
      '500+': 'Più di 500K €',
    },
    notSpecified: 'Non specificato',
    requiredFields: 'I campi nome, email e messaggio sono obbligatori',
    invalidEmail: 'Formato email non valido',
    rateLimitExceeded: 'Troppe richieste. Riprova tra un minuto.',
    inputTooLong: 'Uno o più campi superano la lunghezza massima consentita',
    emailError: 'Invio della tua richiesta non riuscito. Riprova tra un istante.',
    subjectConfirmation: 'Conferma di ricezione - HAUSS Paris',
    subjectNotification: 'Nuovo contatto: {name}',
    confirmation: {
      greeting: 'Grazie, {name}!',
      received: 'Abbiamo ricevuto la tua richiesta di contatto e ti ringraziamo.',
      response: 'Il nostro team esaminerà il tuo progetto con attenzione e ti risponderà al più presto.',
      summaryTitle: 'Riepilogo della tua richiesta',
      name: 'Nome:',
      email: 'Email:',
      company: 'Azienda:',
      phone: 'Telefono:',
      budget: 'Budget:',
      message: 'Messaggio:',
      portfolio: 'Nel frattempo, non esitare a consultare il nostro portfolio e a scoprire i nostri progetti sul nostro sito.',
      signature: 'A presto,',
      team: 'Il team di HAUSS Paris',
      footer: 'Email: contact@haussparis.com | Telefono: +33 6 19 44 92 55'
    },
    notification: {
      title: '📨 Nuova richiesta di contatto',
      intro: 'È stata ricevuta una nuova richiesta tramite il modulo di contatto del sito.',
      infoTitle: 'Informazioni di contatto',
      name: 'Nome:',
      email: 'Email:',
      company: 'Azienda:',
      phone: 'Telefono:',
      budget: 'Budget:',
      message: 'Messaggio:',
      actionRequired: 'Azione richiesta:',
      actionText: 'Non dimenticare di ricontattare questo potenziale cliente rapidamente.',
      footer: 'Questo messaggio è stato inviato automaticamente dal modulo di contatto di haussparis.com'
    },
    projectInfo: {
      title: 'Dettagli del progetto',
      type: 'Tipo di progetto:',
      propertyType: 'Tipo di immobile:',
      surface: 'Superficie:',
      budget: 'Budget:',
      address: 'Località:',
      planning: 'Inizio:',
      ownership: 'Situazione:',
    }
  }
}

/**
 * Get client IP from request headers (Vercel specific)
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }
  return 'unknown'
}

/**
 * Check rate limit for a given IP
 * Returns true if request is allowed, false if rate limited
 */
function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(ip)

  // Clean up old entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key)
      }
    }
  }

  if (!record || now > record.resetTime) {
    // First request or window expired
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false
  }

  record.count++
  return true
}

/**
 * Sanitize input to prevent XSS and email header injection
 */
function sanitizeInput(input: string): string {
  if (!input) return ''
  return input
    .replace(/[<>]/g, '') // Remove < and > to prevent HTML injection
    .replace(/[\r\n]/g, ' ') // Remove newlines to prevent email header injection
    .trim()
}

/**
 * Escape HTML entities for safe display in emails
 */
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, char => htmlEntities[char] || char)
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email) && email.length <= MAX_EMAIL_LENGTH
}

/**
 * Validate all input fields
 */
function validateInputs(
  name: string,
  email: string,
  message: string,
  company?: string,
  phone?: string,
  requireMessage: boolean = true
): { valid: boolean; error?: string } {
  // Check required fields
  if (!name || !email || (requireMessage && !message)) {
    return { valid: false, error: 'requiredFields' }
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return { valid: false, error: 'invalidEmail' }
  }

  // Check length limits
  if (
    name.length > MAX_NAME_LENGTH ||
    message.length > MAX_MESSAGE_LENGTH ||
    (company && company.length > MAX_COMPANY_LENGTH) ||
    (phone && phone.length > MAX_PHONE_LENGTH)
  ) {
    return { valid: false, error: 'inputTooLong' }
  }

  return { valid: true }
}

export async function POST(request: NextRequest) {
  try {
    // Verify Content-Type header
    const contentType = request.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 415 }
      )
    }

    // CSRF protection: verify Origin header matches our domain
    const origin = request.headers.get('origin')
    const allowedOrigins = [
      'https://www.haussparis.com',
      'https://haussparis.com',
      'http://localhost:3000', // Development only
    ]
    // Allow Vercel preview deployments (non-production only) so the funnel and
    // contact form can be tested before going live. Production stays locked down.
    const isVercelPreview =
      process.env.VERCEL_ENV === 'preview' &&
      !!origin &&
      /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin)
    if (origin && !allowedOrigins.includes(origin) && !isVercelPreview) {
      return NextResponse.json(
        { error: 'Invalid origin' },
        { status: 403 }
      )
    }

    // Get client IP for rate limiting
    const clientIP = getClientIP(request)

    // Check rate limit
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: translations.en.rateLimitExceeded },
        { status: 429 }
      )
    }

    // Vérifier que la clé API est configurée
    if (!process.env.RESEND_API_KEY) {
      if (process.env.NODE_ENV === 'development') {
        console.error('RESEND_API_KEY n\'est pas définie dans les variables d\'environnement')
      }
      return NextResponse.json(
        { error: 'Configuration serveur manquante. Veuillez configurer RESEND_API_KEY dans .env.local' },
        { status: 500 }
      )
    }

    // Instancier Resend uniquement quand nécessaire
    const resend = new Resend(process.env.RESEND_API_KEY)

    const body = await request.json()
    const {
      name: rawName,
      email: rawEmail,
      company: rawCompany,
      phone: rawPhone,
      message: rawMessage,
      budget,
      source,
      projectType: rawProjectType,
      propertyType: rawPropertyType,
      surface: rawSurface,
      budgetAmount: rawBudgetAmount,
      address: rawAddress,
      planning: rawPlanning,
      eventId: rawEventId,
      locale = 'fr'
    } = body

    const isFunnel = source === 'funnel'

    // Sanitize inputs (cap structured fields to a safe length)
    const cap = (value: string) => value.slice(0, 300)
    const name = sanitizeInput(rawName)
    const email = sanitizeInput(rawEmail)?.toLowerCase()
    const company = sanitizeInput(rawCompany)
    const phone = sanitizeInput(rawPhone)
    const message = sanitizeInput(rawMessage)
    const projectType = cap(sanitizeInput(rawProjectType))
    const propertyType = cap(sanitizeInput(rawPropertyType))
    const surface = cap(sanitizeInput(rawSurface))
    const budgetAmount = cap(sanitizeInput(rawBudgetAmount))
    const address = cap(sanitizeInput(rawAddress))
    const planning = cap(sanitizeInput(rawPlanning))
    const eventId = cap(sanitizeInput(rawEventId))

    // Obtenir les traductions selon la locale
    const t = translations[locale as keyof typeof translations] || translations.fr

    // Validate inputs (the project funnel carries structured data, message optional)
    const validation = validateInputs(name, email, message, company, phone, !isFunnel)
    if (!validation.valid) {
      const errorKey = validation.error as keyof typeof t
      return NextResponse.json(
        { error: t[errorKey] || t.requiredFields },
        { status: 400 }
      )
    }

    // Budget formaté (validate against allowed values)
    const validBudgets = ['50-100', '100-250', '250-500', '500+']
    const sanitizedBudget = validBudgets.includes(budget) ? budget : null
    const safeBudgetAmount = escapeHtml(budgetAmount || '')
    const budgetText = isFunnel
      ? safeBudgetAmount || t.notSpecified
      : sanitizedBudget
        ? t.budgetLabels[sanitizedBudget as keyof typeof t.budgetLabels]
        : t.notSpecified
    // Le budget n'est demandé que par le formulaire de contact ; le funnel ne le
    // collecte pas, donc on n'affiche pas de ligne budget vide/« Non spécifié ».
    const hasBudget = isFunnel ? Boolean(budgetAmount) : Boolean(sanitizedBudget)

    // Escape HTML for email display
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeCompany = escapeHtml(company || '')
    const safePhone = escapeHtml(phone || '')
    const safeMessage = escapeHtml(message)

    // Structured project details (project funnel only)
    const projectRows: Array<[string, string]> = isFunnel
      ? ([
          [t.projectInfo.type, escapeHtml(projectType || '')],
          [t.projectInfo.propertyType, escapeHtml(propertyType || '')],
          [t.projectInfo.surface, escapeHtml(surface || '')],
          [t.projectInfo.address, escapeHtml(address || '')],
          [t.projectInfo.planning, escapeHtml(planning || '')],
        ].filter(([, value]) => value) as Array<[string, string]>)
      : []

    const confirmationProjectBlock =
      projectRows.length > 0
        ? `
              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #0a0a0a; font-size: 18px; margin-bottom: 15px;">${t.projectInfo.title}</h2>
                ${projectRows
                  .map(
                    ([label, value]) =>
                      `<p style="margin: 8px 0;"><strong>${label}</strong> ${value}</p>`,
                  )
                  .join('')}
              </div>`
        : ''

    const notificationProjectBlock =
      projectRows.length > 0
        ? `
              <div style="background-color: white; padding: 25px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #0a0a0a; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #0a0a0a; padding-bottom: 10px;">${t.projectInfo.title}</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  ${projectRows
                    .map(
                      ([label, value]) =>
                        `<tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong style="color: #666;">${label}</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${value}</td></tr>`,
                    )
                    .join('')}
                </table>
              </div>`
        : ''

    // 1. Email de confirmation au client
    const confirmationEmail = await resend.emails.send({
      from: 'HAUSS Paris <noreply@haussparis.com>',
      to: email,
      subject: t.subjectConfirmation,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f8f8; padding: 30px; border-radius: 10px;">
              <h1 style="color: #0a0a0a; margin-bottom: 20px; font-size: 24px;">${t.confirmation.greeting.replace('{name}', safeName)}</h1>

              <p style="margin-bottom: 15px;">${t.confirmation.received}</p>

              <p style="margin-bottom: 15px;">${t.confirmation.response}</p>

              <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 25px 0;">
                <h2 style="color: #0a0a0a; font-size: 18px; margin-bottom: 15px;">${t.confirmation.summaryTitle}</h2>
                <p style="margin: 8px 0;"><strong>${t.confirmation.name}</strong> ${safeName}</p>
                <p style="margin: 8px 0;"><strong>${t.confirmation.email}</strong> ${safeEmail}</p>
                ${safeCompany ? `<p style="margin: 8px 0;"><strong>${t.confirmation.company}</strong> ${safeCompany}</p>` : ''}
                ${safePhone ? `<p style="margin: 8px 0;"><strong>${t.confirmation.phone}</strong> ${safePhone}</p>` : ''}
                ${hasBudget ? `<p style="margin: 8px 0;"><strong>${t.confirmation.budget}</strong> ${budgetText}</p>` : ''}
                ${safeMessage ? `<p style="margin: 8px 0;"><strong>${t.confirmation.message}</strong></p>
                <p style="margin: 8px 0; padding: 10px; background-color: #f8f8f8; border-radius: 5px;">${safeMessage}</p>` : ''}
              </div>
              ${confirmationProjectBlock}

              <p style="margin-bottom: 15px;">${t.confirmation.portfolio}</p>

              <p style="margin-top: 30px; color: #666; font-size: 14px;">
                ${t.confirmation.signature}<br>
                <strong>${t.confirmation.team}</strong>
              </p>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999;">
                <p>HAUSS Paris</p>
                <p>${t.confirmation.footer}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    // 2. Email récapitulatif pour l'équipe (utiliser variable d'environnement)
    const notificationRecipient = process.env.NOTIFICATION_EMAIL || 'contact@haussparis.com'
    const notificationEmail = await resend.emails.send({
      from: 'HAUSS Paris <noreply@haussparis.com>',
      to: notificationRecipient,
      subject: t.subjectNotification.replace('{name}', safeName),
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #f8f8f8; padding: 30px; border-radius: 10px;">
              <h1 style="color: #0a0a0a; margin-bottom: 20px; font-size: 24px;">${t.notification.title}</h1>

              <p style="margin-bottom: 20px;">${t.notification.intro} <strong>[${locale.toUpperCase()}]</strong></p>

              <div style="background-color: white; padding: 25px; border-radius: 8px; margin: 20px 0;">
                <h2 style="color: #0a0a0a; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #0a0a0a; padding-bottom: 10px;">${t.notification.infoTitle}</h2>

                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="color: #666;">${t.notification.name}</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      ${safeName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="color: #666;">${t.notification.email}</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <a href="mailto:${safeEmail}" style="color: #0066cc; text-decoration: none;">${safeEmail}</a>
                    </td>
                  </tr>
                  ${safeCompany ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="color: #666;">${t.notification.company}</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      ${safeCompany}
                    </td>
                  </tr>
                  ` : ''}
                  ${safePhone ? `
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="color: #666;">${t.notification.phone}</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <a href="tel:${safePhone.replace(/\s/g, '')}" style="color: #0066cc; text-decoration: none;">${safePhone}</a>
                    </td>
                  </tr>
                  ` : ''}
                  ${hasBudget ? `<tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="color: #666;">${t.notification.budget}</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <span style="background-color: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 4px; font-weight: 600;">${budgetText}</span>
                    </td>
                  </tr>` : ''}
                </table>

                ${safeMessage ? `<div style="margin-top: 20px;">
                  <strong style="color: #666; display: block; margin-bottom: 10px;">${t.notification.message}</strong>
                  <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #0a0a0a;">
                    ${safeMessage}
                  </div>
                </div>` : ''}
              </div>
              ${notificationProjectBlock}

              <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; border-left: 4px solid #ffc107; margin-top: 20px;">
                <p style="margin: 0; color: #856404;">
                  <strong>${t.notification.actionRequired}</strong> ${t.notification.actionText}
                </p>
              </div>

              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #999; text-align: center;">
                <p>${t.notification.footer}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })

    // Resend returns { data, error } and does NOT throw on API failures
    // (e.g. an unverified sender domain). Check explicitly so a failed send
    // is never reported to the client as success.
    if (confirmationEmail.error || notificationEmail.error) {
      const resendError = confirmationEmail.error || notificationEmail.error
      console.error('Resend send failed:', {
        confirmation: confirmationEmail.error,
        notification: notificationEmail.error,
      })
      const exposeDetail = process.env.VERCEL_ENV !== 'production'
      return NextResponse.json(
        {
          error: t.emailError,
          ...(exposeDetail
            ? { detail: resendError?.message || String(resendError) }
            : {}),
        },
        { status: 502 }
      )
    }

    // Conversion serveur (CAPI) pour les leads du funnel : complète le Pixel
    // navigateur et déduplique via le même eventId. Best-effort (ne jette pas).
    if (isFunnel && eventId) {
      await sendCapiLead({
        eventId,
        email: email || undefined,
        phone: phone || undefined,
        clientIp:
          request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
          request.headers.get('x-real-ip') ||
          undefined,
        userAgent: request.headers.get('user-agent') || undefined,
        fbp: request.cookies.get('_fbp')?.value,
        fbc: request.cookies.get('_fbc')?.value,
        eventSourceUrl: request.headers.get('referer') || undefined,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Emails envoyés avec succès',
      confirmationId: confirmationEmail.data?.id,
      notificationId: notificationEmail.data?.id,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Erreur lors de l\'envoi des emails:', error)
    }
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi des emails' },
      { status: 500 }
    )
  }
}
