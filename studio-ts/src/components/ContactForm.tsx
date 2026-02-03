'use client'

import { useId, useState, useRef } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/Button'
import { FadeIn } from '@/components/FadeIn'

// Validation constants
const MAX_NAME_LENGTH = 100
const MAX_EMAIL_LENGTH = 254
const MAX_MESSAGE_LENGTH = 5000
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function TextInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  let id = useId()

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className="peer block w-full border border-neutral-300 bg-transparent px-6 pt-12 pb-4 text-base/6 text-neutral-950 ring-4 ring-transparent transition group-first:rounded-t-2xl group-last:rounded-b-2xl focus:border-neutral-950 focus:ring-neutral-950/5 focus:outline-hidden"
      />
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-1/2 left-6 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-not-placeholder-shown:-translate-y-4 peer-not-placeholder-shown:scale-75 peer-not-placeholder-shown:font-semibold peer-not-placeholder-shown:text-neutral-950 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950"
      >
        {label}
      </label>
    </div>
  )
}

function RadioInput({
  label,
  ...props
}: React.ComponentPropsWithoutRef<'input'> & { label: string }) {
  return (
    <label className="flex gap-x-3">
      <input
        type="radio"
        {...props}
        className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-hidden checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
      />
      <span className="text-base/6 text-neutral-950">{label}</span>
    </label>
  )
}

export function ContactForm() {
  const t = useTranslations('ContactForm')
  const locale = useLocale()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') as string)?.trim()
    const email = (formData.get('email') as string)?.trim().toLowerCase()
    const message = (formData.get('message') as string)?.trim()

    // Client-side validation
    if (!name || !email || !message) {
      setSubmitStatus({
        type: 'error',
        message: t('requiredFields') || 'Please fill in all required fields',
      })
      setIsSubmitting(false)
      return
    }

    if (!EMAIL_REGEX.test(email) || email.length > MAX_EMAIL_LENGTH) {
      setSubmitStatus({
        type: 'error',
        message: t('invalidEmail') || 'Please enter a valid email address',
      })
      setIsSubmitting(false)
      return
    }

    if (name.length > MAX_NAME_LENGTH || message.length > MAX_MESSAGE_LENGTH) {
      setSubmitStatus({
        type: 'error',
        message: t('inputTooLong') || 'Input exceeds maximum length',
      })
      setIsSubmitting(false)
      return
    }

    const data = {
      name,
      email,
      company: formData.get('company') as string,
      phone: formData.get('phone') as string,
      message,
      budget: formData.get('budget') as string,
      locale: locale, // Passer la langue à l'API
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      // Vérifier si la réponse est bien du JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        if (process.env.NODE_ENV === 'development') {
          const text = await response.text()
          console.error('Réponse non-JSON reçue:', text.substring(0, 200))
        }
        throw new Error(t('serverError'))
      }

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || t('error'))
      }

      setSubmitStatus({
        type: 'success',
        message: t('success'),
      })

      // Réinitialiser le formulaire
      if (formRef.current) {
        formRef.current.reset()
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Erreur lors de l\'envoi:', error)
      }
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : t('error'),
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <FadeIn className="lg:order-last">
      <form ref={formRef} onSubmit={handleSubmit}>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          {t('title')}
        </h2>
        <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
          <TextInput label={t('name')} name="name" autoComplete="name" required />
          <TextInput
            label={t('email')}
            type="email"
            name="email"
            autoComplete="email"
            required
          />
          <TextInput
            label={t('company')}
            name="company"
            autoComplete="organization"
          />
          <TextInput label={t('phone')} type="tel" name="phone" autoComplete="tel" />
          <TextInput label={t('message')} name="message" required />
          <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
            <fieldset>
              <legend className="text-base/6 text-neutral-500">{t('budget')}</legend>
              <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <RadioInput label={t('budgetOptions.50-100')} name="budget" value="50-100" />
                <RadioInput label={t('budgetOptions.100-250')} name="budget" value="100-250" />
                <RadioInput label={t('budgetOptions.250-500')} name="budget" value="250-500" />
                <RadioInput label={t('budgetOptions.500+')} name="budget" value="500+" />
              </div>
            </fieldset>
          </div>
        </div>

        {submitStatus.type && (
          <div
            className={`mt-6 rounded-lg p-4 ${
              submitStatus.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {submitStatus.message}
          </div>
        )}

        <Button type="submit" className="mt-10" disabled={isSubmitting}>
          {isSubmitting ? t('submitting') : t('submit')}
        </Button>
      </form>
    </FadeIn>
  )
}

