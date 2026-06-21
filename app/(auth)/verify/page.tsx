'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import type { JSX } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
  MailIcon,
  ArrowLeftIcon,
  RefreshIcon,
  ShieldIcon,
} from '@/components/icons'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

export default function VerifyPage(): JSX.Element {
  const router = useRouter()
  const { role } = useAuth()
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [resending, setResending] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(RESEND_SECONDS)
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  const email: string =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('otp_email') || ''
      : ''
  const name: string =
    typeof window !== 'undefined'
      ? sessionStorage.getItem('otp_name') || ''
      : ''

  useEffect(() => {
    inputs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  function handleChange(i: number, val: string): void {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[i] = val.slice(-1)
    setOtp(next)
    if (val && i < OTP_LENGTH - 1) inputs.current[i + 1]?.focus()
  }

  function handleKeyDown(i: number, e: React.KeyboardEvent): void {
    if (e.key === 'Backspace' && !otp[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  function handlePaste(e: React.ClipboardEvent): void {
    e.preventDefault()
    const text = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH)
    if (text.length === OTP_LENGTH) {
      setOtp(text.split(''))
      inputs.current[OTP_LENGTH - 1]?.focus()
    }
  }

  async function handleVerify(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    const code = otp.join('')
    if (code.length < OTP_LENGTH) return
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })
      const data = (await res.json()) as { success: boolean; error?: string }

      if (!res.ok || !data.success) {
        setError(data.error || 'Invalid or expired code. Please try again.')
        setOtp(Array(OTP_LENGTH).fill(''))
        inputs.current[0]?.focus()
        return
      }

      document.cookie = `firebase-token=true; path=/; max-age=86400`
      sessionStorage.removeItem('otp_email')
      sessionStorage.removeItem('otp_name')
      router.push(role === 'admin' ? '/admin' : '/dashboard')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleResend(): Promise<void> {
    if (countdown > 0 || resending) return
    setResending(true)
    setError('')
    try {
      await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      setCountdown(RESEND_SECONDS)
      setOtp(Array(OTP_LENGTH).fill(''))
      inputs.current[0]?.focus()
    } catch {
      setError('Failed to resend. Please try again.')
    } finally {
      setResending(false)
    }
  }

  const isComplete: boolean = otp.join('').length === OTP_LENGTH

  return (
    <div className='min-h-screen bg-bg-base flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Ambient orbs */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        <div
          className='absolute -top-28 -left-24 h-72 w-72 rounded-full
                        bg-rose-200/40 blur-[90px] animate-[orbFloat_13s_ease-in-out_infinite]'
        />
        <div
          className='absolute -bottom-24 -right-16 h-80 w-80 rounded-full
                        bg-rose-300/25 blur-[100px] animate-[orbFloat_11s_ease-in-out_1.5s_infinite_reverse]'
        />
      </div>

      <div className='relative z-10 w-full max-w-md stagger-children'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <div
            className='inline-flex items-center justify-center w-14 h-14
                          rounded-full bg-rose-100 mb-4
                          animate-[pulseRing_2.5s_ease-in-out_infinite]'
          >
            <ShieldIcon size={26} className='text-rose-400' />
          </div>
          <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-500 mb-1'>
            Verification
          </p>
          <h1 className='font-serif text-[32px] text-ink-900'>
            Check your email
          </h1>
        </div>

        <div
          className='bg-bg-surface border border-rose-100 rounded-2xl p-8
                        shadow-[var(--shadow-card)]'
        >
          {/* Email display */}
          <div
            className='flex items-center gap-3 bg-rose-50/60 border border-rose-100
                          rounded-xl px-4 py-3 mb-8'
          >
            <MailIcon size={18} className='text-rose-400 flex-shrink-0' />
            <div>
              <p className='text-xs text-ink-400'>Code sent to</p>
              <p className='text-sm font-medium text-ink-900'>{email}</p>
            </div>
          </div>

          <form onSubmit={handleVerify}>
            {/* OTP inputs */}
            <div className='flex justify-between gap-2 mb-6'>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputs.current[i] = el
                  }}
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  onPaste={handlePaste}
                  className={`w-12 h-14 text-center text-xl font-semibold rounded-xl
                              border transition-all duration-150 outline-none
                              text-ink-900 bg-rose-50/60
                              focus:scale-[1.04] focus:shadow-[0_0_0_3px_rgba(201,168,76,0.15)]
                              ${
                                digit
                                  ? 'border-rose-400 bg-rose-50'
                                  : 'border-rose-100 focus:border-gold-400'
                              }`}
                />
              ))}
            </div>

            {/* Error */}
            {error && (
              <div
                className='bg-red-50 border border-red-100 rounded-xl
                              px-3 py-2.5 mb-4 animate-[fadeUp_0.25s_ease_both]'
              >
                <p className='text-xs text-red-500'>{error}</p>
              </div>
            )}

            <button
              type='submit'
              disabled={loading || !isComplete}
              className='btn btn-primary w-full mb-4 hover:-translate-y-px hover:scale-[1.015]
                         active:scale-[0.97] transition-all duration-200'
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
                  >
                    <path d='M21 12a9 9 0 1 1-6.219-8.56' />
                  </svg>
                  Verifying…
                </>
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>

          {/* Resend */}
          <div className='text-center'>
            <p className='text-sm text-ink-400 mb-1'>
              Didn&apos;t receive the code?
            </p>
            <button
              type='button'
              onClick={handleResend}
              disabled={countdown > 0 || resending}
              className='inline-flex items-center gap-1.5 text-sm font-medium
                         text-rose-500 hover:text-rose-600 hover:underline
                         disabled:text-ink-300 disabled:no-underline disabled:cursor-default
                         transition-colors duration-150'
            >
              <span className={resending ? 'animate-spin' : ''}>
                <RefreshIcon size={14} />
              </span>
              {countdown > 0
                ? `Resend in ${countdown}s`
                : resending
                  ? 'Sending…'
                  : 'Resend code'}
            </button>
          </div>

          {/* Back */}
          <button
            type='button'
            onClick={() => router.push('/login')}
            className='flex items-center gap-1.5 text-sm text-ink-300
                       hover:text-ink-600 transition-colors duration-150 mx-auto mt-6'
          >
            <ArrowLeftIcon size={14} />
            Back to login
          </button>
        </div>
      </div>
    </div>
  )
}
