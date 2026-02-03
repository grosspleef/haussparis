import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

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
    subjectConfirmation: 'Confirmation de réception - HAUSS Paris',
    subjectNotification: 'Nouveau contact : {name}',
    confirmation: {
      greeting: 'Merci {name} !',
      received: 'Nous avons bien reçu votre demande de contact et nous vous en remercions.',
      response: 'Notre équipe va étudier votre projet avec attention et reviendra vers vous dans les plus brefs délais, généralement sous 24 à 48 heures.',
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
      actionText: 'N\'oubliez pas de recontacter ce prospect dans les 24-48h.',
      footer: 'Ce message a été envoyé automatiquement depuis le formulaire de contact de haussparis.com'
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
    subjectConfirmation: 'Receipt confirmation - HAUSS Paris',
    subjectNotification: 'New contact: {name}',
    confirmation: {
      greeting: 'Thank you {name}!',
      received: 'We have received your contact request and we thank you.',
      response: 'Our team will carefully review your project and get back to you as soon as possible, usually within 24 to 48 hours.',
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
      actionText: 'Don\'t forget to contact this prospect within 24-48 hours.',
      footer: 'This message was sent automatically from the haussparis.com contact form'
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
  phone?: string
): { valid: boolean; error?: string } {
  // Check required fields
  if (!name || !email || !message) {
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
      locale = 'fr'
    } = body

    // Sanitize inputs
    const name = sanitizeInput(rawName)
    const email = sanitizeInput(rawEmail)?.toLowerCase()
    const company = sanitizeInput(rawCompany)
    const phone = sanitizeInput(rawPhone)
    const message = sanitizeInput(rawMessage)

    // Obtenir les traductions selon la locale
    const t = translations[locale as keyof typeof translations] || translations.fr

    // Validate inputs
    const validation = validateInputs(name, email, message, company, phone)
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
    const budgetText = sanitizedBudget
      ? t.budgetLabels[sanitizedBudget as keyof typeof t.budgetLabels]
      : t.notSpecified

    // Escape HTML for email display
    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeCompany = escapeHtml(company || '')
    const safePhone = escapeHtml(phone || '')
    const safeMessage = escapeHtml(message)

    // 1. Email de confirmation au client
    const confirmationEmail = await resend.emails.send({
      from: 'HAUSS Paris <onboarding@resend.dev>', // À remplacer par votre domaine vérifié
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
                <p style="margin: 8px 0;"><strong>${t.confirmation.budget}</strong> ${budgetText}</p>
                <p style="margin: 8px 0;"><strong>${t.confirmation.message}</strong></p>
                <p style="margin: 8px 0; padding: 10px; background-color: #f8f8f8; border-radius: 5px;">${safeMessage}</p>
              </div>

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
      from: 'HAUSS Paris <onboarding@resend.dev>', // À remplacer par votre domaine vérifié
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
                  <tr>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <strong style="color: #666;">${t.notification.budget}</strong>
                    </td>
                    <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                      <span style="background-color: #e8f5e9; color: #2e7d32; padding: 4px 12px; border-radius: 4px; font-weight: 600;">${budgetText}</span>
                    </td>
                  </tr>
                </table>

                <div style="margin-top: 20px;">
                  <strong style="color: #666; display: block; margin-bottom: 10px;">${t.notification.message}</strong>
                  <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; border-left: 4px solid #0a0a0a;">
                    ${safeMessage}
                  </div>
                </div>
              </div>

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
