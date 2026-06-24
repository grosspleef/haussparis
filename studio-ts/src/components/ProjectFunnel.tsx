'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import clsx from 'clsx'

import { Link } from '@/i18n/routing'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { contactSlugs, type Locale } from '@/lib/routes'

const PROJECT_TYPES = [
  'appart',
  'maison',
  'sureleve',
  'bureaux',
  'neuf',
  'autre',
] as const
const PLANNING_OPTIONS = ['time', 'fast', 'urgent'] as const
const OWNERSHIP_OPTIONS = ['prop', 'promesse', 'acquis', 'recherche'] as const
const STEP_KEYS = ['travaux', 'infos', 'details', 'coordonnees'] as const
const SUCCESS_STEPS = ['1', '2', '3', '4'] as const

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const STEP_COUNT = 4

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-2 block text-sm text-neutral-600">
      {children}
      {required && <span className="ml-0.5 text-neutral-950">*</span>}
    </label>
  )
}

const inputClasses =
  'block w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/5 focus:outline-hidden'

export function ProjectFunnel() {
  const t = useTranslations('ProjectFunnel')
  const locale = useLocale() as Locale

  const [step, setStep] = useState(0)
  const [projectType, setProjectType] = useState<string | null>(null)
  const [ownership, setOwnership] = useState<string | null>(null)
  const [planning, setPlanning] = useState<string>('time')
  const [surface, setSurface] = useState('')
  const [budget, setBudget] = useState('')
  const [address, setAddress] = useState('')
  const [details, setDetails] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
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

    setSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${firstName.trim()} ${lastName.trim()}`.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          message: details.trim(),
          source: 'funnel',
          projectType: projectType ? t(`stepTravaux.types.${projectType}.label`) : '',
          surface: surface.trim(),
          budgetAmount: budget.trim(),
          address: address.trim(),
          planning: t(`stepInfos.planningOptions.${planning}`),
          ownership: ownership ? t(`stepDetails.options.${ownership}`) : '',
          locale,
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
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errorGeneric'))
    } finally {
      setSubmitting(false)
    }
  }

  function handleNext() {
    setError('')
    if (step < STEP_COUNT - 1) {
      setStep(step + 1)
    } else {
      submit()
    }
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
                onClick={() => setStep(index)}
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
            {/* Step 1 — project type */}
            {step === 0 && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {PROJECT_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setProjectType(type)}
                    className={clsx(
                      'rounded-2xl border px-5 py-6 text-left transition',
                      projectType === type
                        ? 'border-neutral-950 ring-1 ring-neutral-950'
                        : 'border-neutral-200 hover:border-neutral-400',
                    )}
                  >
                    <span className="block font-display text-base font-semibold text-neutral-950">
                      {t(`stepTravaux.types.${type}.label`)}
                    </span>
                    <span className="mt-1 block text-sm text-neutral-500">
                      {t(`stepTravaux.types.${type}.description`)}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Step 2 — practical info */}
            {step === 1 && (
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                <div>
                  <FieldLabel required>{t('stepInfos.surface')}</FieldLabel>
                  <input
                    className={inputClasses}
                    inputMode="numeric"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    placeholder={t('stepInfos.surfacePlaceholder')}
                  />
                </div>
                <div>
                  <FieldLabel required>{t('stepInfos.budget')}</FieldLabel>
                  <input
                    className={inputClasses}
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder={t('stepInfos.budgetPlaceholder')}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel required>{t('stepInfos.address')}</FieldLabel>
                  <input
                    className={inputClasses}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t('stepInfos.addressPlaceholder')}
                  />
                </div>
                <div className="sm:col-span-2">
                  <FieldLabel>{t('stepInfos.planning')}</FieldLabel>
                  <select
                    className={inputClasses}
                    value={planning}
                    onChange={(e) => setPlanning(e.target.value)}
                  >
                    {PLANNING_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {t(`stepInfos.planningOptions.${opt}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Step 3 — details */}
            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <FieldLabel>{t('stepDetails.question')}</FieldLabel>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {OWNERSHIP_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setOwnership(opt)}
                        className={clsx(
                          'rounded-xl border px-4 py-3 text-left text-sm transition',
                          ownership === opt
                            ? 'border-neutral-950 font-semibold ring-1 ring-neutral-950'
                            : 'border-neutral-300 text-neutral-700 hover:border-neutral-400',
                        )}
                      >
                        {t(`stepDetails.options.${opt}`)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <FieldLabel>{t('stepDetails.detailsLabel')}</FieldLabel>
                  <textarea
                    rows={4}
                    className={inputClasses}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder={t('stepDetails.detailsPlaceholder')}
                  />
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
                  <FieldLabel>{t('stepContact.phone')}</FieldLabel>
                  <input
                    className={inputClasses}
                    type="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t('stepContact.phonePlaceholder')}
                  />
                </div>
                <p className="text-xs text-neutral-400 sm:col-span-2">
                  {t('stepContact.rgpd')}
                </p>
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
