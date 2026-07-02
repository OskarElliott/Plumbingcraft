'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock, Instagram, CheckCircle } from 'lucide-react'
import { SectionLabel } from '@/components/atoms/SectionLabel'
import { FormField } from '@/components/molecules/FormField'
import { slideLeftVariant, slideRightVariant, staggerContainer, fadeUpVariant, viewportConfig } from '@/lib/animations'
import { site } from '@/lib/siteData'

const data = site.contact
const b = site.business

interface FormState {
  name: string
  phone: string
  email: string
  message: string
}
interface FormErrors {
  name?: string
  phone?: string
  email?: string
}

function validatePhone(value: string) {
  return /^(\+48)?[0-9]{9}$/.test(value.replace(/[\s-]/g, ''))
}
function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function Contact() {
  const [form, setForm] = useState<FormState>({ name: '', phone: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validate = (): FormErrors => {
    const e: FormErrors = {}
    if (!form.name.trim()) e.name = 'Imię jest wymagane.'
    if (!form.phone.trim()) e.phone = 'Numer telefonu jest wymagany.'
    else if (!validatePhone(form.phone)) e.phone = 'Podaj prawidłowy numer telefonu.'
    if (form.email.trim() && !validateEmail(form.email)) e.email = 'Podaj prawidłowy adres e-mail.'
    return e
  }

  const handleBlur = (field: keyof FormErrors) => {
    const e = validate()
    setErrors((prev) => ({ ...prev, [field]: e[field] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const d = await res.json().catch(() => ({}))
        setErrors({ name: d.error ?? 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' })
        return
      }
      setSubmitted(true)
    } catch {
      setErrors({ name: 'Nie udało się wysłać wiadomości. Spróbuj ponownie.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="kontakt" className="bg-ink py-20 md:py-28" aria-label="Kontakt">
      <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column: details */}
          <motion.div variants={slideLeftVariant} initial="hidden" whileInView="visible" viewport={viewportConfig}>
            <SectionLabel>{data.eyebrow}</SectionLabel>
            <h2 className="mt-4 font-display text-3xl font-medium leading-tight text-bone md:text-[2.75rem]">
              {data.heading}
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{data.intro}</p>

            <a
              href={`tel:${b.phoneHref}`}
              className="mt-8 block font-display text-4xl font-semibold text-blue transition-colors hover:text-blue-light"
            >
              {b.phone}
            </a>

            <ul className="mt-8 flex flex-col gap-4" role="list">
              {[
                { icon: Mail, label: b.email, href: `mailto:${b.email}` },
                { icon: MapPin, label: `${b.address.street}, ${b.address.postal} ${b.address.city}`, href: undefined },
                { icon: Clock, label: b.hours, href: undefined },
                { icon: Instagram, label: b.instagram.handle, href: b.instagram.url },
              ].map(({ icon: Icon, label, href }) => {
                const inner = (
                  <>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-bone/5 text-blue">
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span>{label}</span>
                  </>
                )
                return (
                  <li key={label} className="flex items-center gap-3 text-sm text-bone/80">
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center gap-3 transition-colors hover:text-bone">
                        {inner}
                      </a>
                    ) : (
                      <span className="flex items-center gap-3">{inner}</span>
                    )}
                  </li>
                )
              })}
            </ul>
          </motion.div>

          {/* Right column: form */}
          <motion.div
            variants={slideRightVariant}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-line bg-ink-800/50 p-6 sm:p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center" role="status" aria-live="polite">
                <CheckCircle size={48} className="text-blue" aria-hidden="true" />
                <h3 className="font-display text-xl font-medium text-bone">Wiadomość wysłana!</h3>
                <p className="max-w-xs text-sm text-muted">
                  Dziękujemy za kontakt. Odezwiemy się najczęściej w ciągu jednego dnia roboczego.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Formularz kontaktowy">
                <div className="flex flex-col gap-5">
                  <FormField
                    label="Imię"
                    id="contact-name"
                    fieldType="text"
                    placeholder="Jan Kowalski"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    onBlur={() => handleBlur('name')}
                    error={errors.name}
                  />
                  <FormField
                    label="Telefon"
                    id="contact-phone"
                    fieldType="tel"
                    placeholder="+48 600 000 000"
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    onBlur={() => handleBlur('phone')}
                    error={errors.phone}
                  />
                  <FormField
                    label="E-mail"
                    id="contact-email"
                    fieldType="email"
                    placeholder="jan@example.com"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    onBlur={() => handleBlur('email')}
                    error={errors.email}
                  />
                  <FormField
                    label="Wiadomość"
                    id="contact-message"
                    fieldType="textarea"
                    placeholder="Opisz krótko inwestycję i zakres prac..."
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="min-h-[52px] w-full rounded-full bg-blue text-base font-semibold text-bone shadow-blue transition-all duration-300 hover:bg-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submitting ? 'Wysyłanie...' : 'Wyślij zapytanie'}
                  </button>
                  <p className="text-center text-xs text-muted">{data.formNote}</p>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
