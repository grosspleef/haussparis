'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import clsx from 'clsx'

import { Link } from '@/i18n/routing'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { contactSlugs, type Locale } from '@/lib/routes'
import { trackMetaEvent } from '@/lib/metaPixel'

const PROJECT_OPTIONS = [
  'renovation',
  'reamenagement',
  'optimisation',
  'unsure',
] as const
const PROPERTY_OPTIONS = ['appartement', 'maison', 'local'] as const
const SURFACE_OPTIONS = ['lt50', 's50_90', 's90_150', 'gt150'] as const
const TIMELINE_OPTIONS = ['asap', 'm3', 'm6plus', 'researching'] as const
const STEP_KEYS = ['projet', 'bien', 'lieu', 'contact'] as const
const SUCCESS_STEPS = ['1', '2', '3', '4'] as const

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STEP_COUNT = 4

const PRIVACY_SLUGS: Record<Locale, string> = {
  en: 'privacy-policy',
  fr: 'politique-de-confidentialite',
  it: 'privacy-policy',
  de: 'datenschutz',
  es: 'politica-de-privacidad',
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-2 block text-sm text-neutral-600">
      {children}
      {required && <span className="ml-0.5 text-neutral-950">*</span>}
    </label>
  )
}

function ChoiceButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-xl border px-4 py-3 text-left text-sm transition',
        selected
          ? 'border-neutral-950 font-semibold ring-1 ring-neutral-950'
          : 'border-neutral-300 text-neutral-700 hover:border-neutral-400',
      )}
    >
      {children}
    </button>
  )
}

const inputClasses =
  'block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/5 focus:outline-hidden'

export function ProjectFunnel() {
  const t = useTranslations('ProjectFunnel')
  const locale = useLocale() as Locale

  const [step, setStep] = useState(0)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [propertyType, setPropertyType] = useState<string | null>(null)
  const [surface, setSurface] = useState<string | null>(null)
  const [location, setLocation] = useState('')
  const [timeline, setTimeline] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [consent, setConsent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  async function submit() {
    setError('')

    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError(t('validation.required'))
      return
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      setError(t('validation.invalidEmail'))
      return
    }
    if (!consent) {
      setError(t('validation.consent'))
      return
    }

    setSubmitting(true)
    // Identifiant d'événement partagé avec la CAPI serveur pour la déduplication Meta.
    const eventId =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          message: '',
          source: 'funnel',
          projectType: projectType ? t(`stepProjet.options.${projectType}`) : '',
          propertyType: propertyType
            ? t(`stepBien.propertyOptions.${propertyType}`)
            : '',
          surface: surface ? t(`stepBien.surfaceOptions.${surface}`) : '',
          address: location.trim(),
          planning: timeline ? t(`stepLieu.timelineOptions.${timeline}`) : '',
          locale,
          eventId,
        }),
      })

      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(t('errorGeneric'))
      }

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || t('errorGeneric'))
      }

      setDone(true)
      // Conversion principale : prospect qualifié via le funnel.
      // eventId partagé avec la CAPI serveur (/api/contact) → Meta déduplique.
      trackMetaEvent('Lead', undefined, eventId)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'))
    } finally {
      setSubmitting(false)
    }
  }

  function validateStep(current: number): string | null {
    if (current === 0 && !projectType) {
      return t('validation.projectType')
    }
    if (current === 1 && (!propertyType || !surface)) {
      return t('validation.stepRequired')
    }
    if (current === 2 && (!location.trim() || !timeline)) {
      return t('validation.stepRequired')
    }
    return null
  }

  function handleNext() {
    setError('')
    const stepError = validateStep(step)
    if (stepError) {
      setError(stepError)
      return
    }
    if (step < STEP_COUNT - 1) {
      setStep(step + 1)
    } else {
      submit()
    }
  }

  function goToStep(target: number) {
    if (target === step) return
    setError('')
    // Going back is always allowed so the user can review/edit.
    if (target < step) {
      setStep(target)
      return
    }
    // Jumping forward requires every preceding step to be valid,
    // otherwise the stepper would bypass per-step validation.
    for (let s = 0; s < target; s++) {
      const stepError = validateStep(s)
      if (stepError) {
        setError(stepError)
        setStep(s)
        return
      }
    }
    setStep(target)
  }

  if (done) {
    return (
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 bg-white px-6 py-16 text-center sm:px-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-neutral-950">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-white stroke-2" aria-hidden="true">
                <path d="m5 12 5 5 9-11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="mt-6 font-display text-3xl font-medium tracking-tight text-neutral-950">
              {t('success.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-neutral-600">
              {t('success.text')}
            </p>

            <ol className="mx-auto mt-12 max-w-lg space-y-8 text-left">
              {SUCCESS_STEPS.map((n) => (
                <li key={n} className="flex gap-x-5">
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full border border-neutral-950 font-display text-sm font-semibold text-neutral-950">
                    {n}
                  </span>
                  <div>
                    <p className="font-semibold text-neutral-950">{t(`success.steps.${n}.title`)}</p>
                    <p className="mt-1 text-sm text-neutral-600">{t(`success.steps.${n}.description`)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </FadeIn>
      </Container>
    )
  }

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        {/* Stepper */}
        <ol className="flex items-center gap-x-2">
          {STEP_KEYS.map((key, index) => (
            <li key={key} className="flex flex-1 items-center gap-x-3 last:flex-none">
              <button
                type="button"
                onClick={() => goToStep(index)}
                className="flex items-center gap-x-3 text-left"
                aria-current={index === step ? 'step' : undefined}
              >
                <span
                  className={clsx(
                    'flex h-6 w-6 flex-none items-center justify-center rounded-full border text-xs transition',
                    index === step
                      ? 'border-neutral-950 bg-neutral-950 text-white'
                      : index < step
                        ? 'border-neutral-950 text-neutral-950'
                        : 'border-neutral-300 text-neutral-400',
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={clsx(
                    'hidden whitespace-nowrap text-sm sm:block',
                    index === step
                      ? 'font-semibold text-neutral-950'
                      : index < step
                        ? 'text-neutral-600'
                        : 'text-neutral-400',
                  )}
                >
                  {t(`steps.${key}`)}
                </span>
              </button>
              {index < STEP_KEYS.length - 1 && (
                <span className="h-px flex-1 bg-neutral-200" />
              )}
            </li>
          ))}
        </ol>

        <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <p className="text-sm tracking-widest text-neutral-400 uppercase">
              {t('sidebar.stepLabel', { current: step + 1, total: STEP_COUNT })}
            </p>
            <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-neutral-950">
              {t(`sidebar.title.${STEP_KEYS[step]}`)}
            </h2>
            <p className="mt-4 text-base text-neutral-600">
              {t(`sidebar.description.${STEP_KEYS[step]}`)}
            </p>
            <p className="mt-8 text-sm text-neutral-600">
              {t('sidebar.help')}{' '}
              <Link
                href={`/${contactSlugs[locale]}`}
                className="font-semibold text-neutral-950 underline underline-offset-2"
              >
                {t('sidebar.helpLink')}
              </Link>
            </p>
          </div>

          {/* Main */}
          <div className="lg:col-span-2">
            {/* Step 1 — project */}
            {step === 0 && (
              <div>
                <FieldLabel required>{t('stepProjet.question')}</FieldLabel>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {PROJECT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setProjectType(opt)}
                      className={clsx(
                        'rounded-2xl border px-5 py-6 text-left transition',
                        projectType === opt
                          ? 'border-neutral-950 ring-1 ring-neutral-950'
                          : 'border-neutral-200 hover:border-neutral-400',
                      )}
                    >
                      <span className="block font-display text-base font-semibold text-neutral-950">
                        {t(`stepProjet.options.${opt}`)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2 — property */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <FieldLabel required>{t('stepBien.propertyQuestion')}</FieldLabel>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {PROPERTY_OPTIONS.map((opt) => (
                      <ChoiceButton
                        key={opt}
                        selected={propertyType === opt}
                        onClick={() => setPropertyType(opt)}
                      >
                        {t(`stepBien.propertyOptions.${opt}`)}
                      </ChoiceButton>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel required>{t('stepBien.surfaceQuestion')}</FieldLabel>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {SURFACE_OPTIONS.map((opt) => (
                      <ChoiceButton
                        key={opt}
                        selected={surface === opt}
                        onClick={() => setSurface(opt)}
                      >
                        {t(`stepBien.surfaceOptions.${opt}`)}
                      </ChoiceButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 — location & timeline */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <FieldLabel required>{t('stepLieu.locationQuestion')}</FieldLabel>
                  <input
                    className={inputClasses}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t('stepLieu.locationPlaceholder')}
                  />
                </div>
                <div>
                  <FieldLabel required>{t('stepLieu.timelineQuestion')}</FieldLabel>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {TIMELINE_OPTIONS.map((opt) => (
                      <ChoiceButton
                        key={opt}
                        selected={timeline === opt}
                        onClick={() => setTimeline(opt)}
                      >
                        {t(`stepLieu.timelineOptions.${opt}`)}
                      </ChoiceButton>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 — contact */}
            {step === 3 && (
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <div>
                  <FieldLabel required>{t('stepContact.firstName')}</FieldLabel>
                  <input
                    className={inputClasses}
                    autoComplete="given-name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder={t('stepContact.firstName')}
                  />
                </div>
                <div>
                  <FieldLabel required>{t('stepContact.lastName')}</FieldLabel>
                  <input
                    className={inputClasses}
                    autoComplete="family-name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder={t('stepContact.lastName')}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel required>{t('stepContact.email')}</FieldLabel>
                  <input
                    className={inputClasses}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('stepContact.emailPlaceholder')}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>
                    {t('stepContact.phone')}{' '}
                    <span className="text-neutral-400">({t('stepContact.phoneHint')})</span>
                  </FieldLabel>
                  <input
                    className={inputClasses}
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('stepContact.phonePlaceholder')}
                  />
                </div>
                <label className="flex items-start gap-x-3 text-sm text-neutral-600 sm:col-span-2">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 flex-none rounded border-neutral-300 text-neutral-950 focus:ring-neutral-950"
                  />
                  <span>
                    {t('stepContact.consent')}{' '}
                    <Link
                      href={`/${PRIVACY_SLUGS[locale]}`}
                      className="font-semibold text-neutral-950 underline underline-offset-2"
                    >
                      {t('stepContact.privacyLink')}
                    </Link>
                  </span>
                </label>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {error}
              </div>
            )}

            {/* Footer nav */}
            <div className="mt-10 flex items-center justify-between border-t border-neutral-200 pt-8">
              <button
                type="button"
                onClick={() => step > 0 && setStep(step - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-x-2 text-sm font-semibold text-neutral-600 transition hover:text-neutral-950 disabled:pointer-events-none disabled:opacity-0"
              >
                <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current" aria-hidden="true">
                  <path d="M7 1 1.5 6.5 7 12l1-1-3.8-3.8H15v-1.4H4.2L8 2z" />
                </svg>
                {t('nav.previous')}
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={submitting}
                className="inline-flex items-center gap-x-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60"
              >
                {submitting
                  ? t('nav.submitting')
                  : step === STEP_COUNT - 1
                    ? t('nav.submit')
                    : t('nav.next')}
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  )
}
