'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import type { ComponentType } from 'react'
import {
  MailIcon,
  PhoneIcon,
  UserIcon,
  BookIcon,
  CheckIcon,
} from '@/components/icons'
import { SectionLabel } from '@/components/website/Shared'

interface ContactFormData {
  name: string
  email: string
  phone: string
  program: string
  message: string
}

interface ProgramOption {
  id: string
  label: string
}

const PROGRAMS: ProgramOption[] = [
  { id: '', label: 'Not sure yet — help me choose' },
  { id: '4-week', label: 'Soul Blueprint Intensive (4-Week · ₹5,999)' },
  { id: '8-week', label: 'Soul Awakening: Empowered You (8-Week · ₹51,000)' },
]

const EMPTY_FORM: ContactFormData = {
  name: '',
  email: '',
  phone: '',
  program: '',
  message: '',
}

const inputBase =
  'w-full pl-10 pr-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm font-sans placeholder:text-ink-300 outline-none transition-all duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)]'

function FieldIcon({
  icon: Icon,
}: {
  icon: ComponentType<{ size?: number }>
}): React.JSX.Element {
  return (
    <div className='pointer-events-none absolute left-3 top-0 h-full flex items-center justify-center text-ink-300'>
      <Icon size={16} />
    </div>
  )
}

export default function ContactForm(): React.JSX.Element {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM)
  const [loading, setLoading] = useState<boolean>(false)
  const [submitted, setSubmitted] = useState<boolean>(false)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setSubmitted(true)
      toast.success('Message sent!')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='lg:sticky lg:top-28'>
      {/* Success state */}
      {submitted ? (
        <div className='card text-center py-12 space-y-5 animate-[scaleInKf_0.35s_cubic-bezier(0.4,0,0.2,1)_forwards]'>
          <div className='w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center mx-auto animate-[scaleInKf_0.4s_cubic-bezier(0.34,1.56,0.64,1)_0.1s_forwards] opacity-0'>
            <CheckIcon size={28} className='text-rose-400' />
          </div>
          <div>
            <h2 className='font-serif italic text-xl text-ink-900 mb-2'>
              Message sent ✦
            </h2>
            <p className='text-sm text-ink-400 leading-relaxed max-w-xs mx-auto'>
              Thank you for reaching out. Sapna will get back to you within
              24–48 hours. Check your inbox for a confirmation email.
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false)
              setForm(EMPTY_FORM)
            }}
            className='btn btn-ghost btn-sm mx-auto hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150'
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className='card space-y-5 animate-[fadeUp_0.4s_ease_forwards]'
        >
          <div>
            <SectionLabel>Send a message</SectionLabel>
            <h2 className='font-serif text-lg text-ink-900'>
              I&apos;d love to hear from you
            </h2>
          </div>

          {/* Name */}
          <div>
            <label htmlFor='name' className='input-label'>
              Full name *
            </label>
            <div className='relative'>
              <FieldIcon icon={UserIcon} />
              <input
                id='name'
                name='name'
                className={inputBase}
                value={form.name}
                onChange={handleChange}
                placeholder='Your name'
                required
                autoComplete='name'
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='input-label'>
              Email *
            </label>
            <div className='relative'>
              <FieldIcon icon={MailIcon} />
              <input
                id='email'
                name='email'
                className={inputBase}
                type='email'
                value={form.email}
                onChange={handleChange}
                placeholder='you@example.com'
                required
                autoComplete='email'
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label htmlFor='phone' className='input-label'>
              Phone / WhatsApp
            </label>
            <div className='relative'>
              <FieldIcon icon={PhoneIcon} />
              <input
                id='phone'
                name='phone'
                className={inputBase}
                value={form.phone}
                onChange={handleChange}
                placeholder='+91 99999 99999'
                autoComplete='tel'
              />
            </div>
          </div>

          {/* Program */}
          <div>
            <label htmlFor='program' className='input-label'>
              Program interest
            </label>
            <div className='relative'>
              <FieldIcon icon={BookIcon} />
              <select
                id='program'
                name='program'
                className={`${inputBase} cursor-pointer`}
                value={form.program}
                onChange={handleChange}
              >
                {PROGRAMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor='message' className='input-label'>
              Message *
            </label>
            <textarea
              id='message'
              name='message'
              className='w-full px-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm font-sans placeholder:text-ink-300 outline-none transition-all duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)] min-h-[130px] resize-none'
              value={form.message}
              onChange={handleChange}
              placeholder='Tell Sapna a little about what you are going through and what you are hoping to heal or transform…'
              required
            />
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={loading}
            className='btn btn-primary w-full flex items-center justify-center gap-2 hover:scale-[1.015] active:scale-[0.97] transition-transform duration-150 disabled:opacity-40 disabled:transform-none'
          >
            {loading ? (
              <>
                <svg
                  className='animate-spin'
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  aria-hidden='true'
                >
                  <path d='M21 12a9 9 0 1 1-6.219-8.56' />
                </svg>
                Sending…
              </>
            ) : (
              <>
                <MailIcon size={15} />
                Send Message
              </>
            )}
          </button>

          <p className='text-xs text-ink-300 text-center'>
            You&apos;ll receive a confirmation email immediately. Sapna responds
            within 24–48 hours.
          </p>
        </form>
      )}
    </div>
  )
}
