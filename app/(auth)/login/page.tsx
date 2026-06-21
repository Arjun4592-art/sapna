'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import type { ComponentType, JSX } from 'react'
import { auth } from '@/lib/firebase/config'
import { ensureUserDoc } from '@/lib/firebase/auth'
import {
  GoogleIcon,
  MailIcon,
  LockIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  SparkleIcon,
} from '@/components/icons'

interface FieldIconProps {
  icon: ComponentType<{ size?: number }>
}

function FieldIcon({ icon: Icon }: FieldIconProps): JSX.Element {
  return (
    <div className='pointer-events-none absolute left-3 top-0 h-full flex items-center justify-center text-ink-300'>
      <Icon size={16} />
    </div>
  )
}

const inputBase =
  'w-full pl-10 pr-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm font-sans placeholder:text-ink-300 outline-none transition-all duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)]'

export default function LoginPage(): JSX.Element {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  async function sendOtp(otpEmail: string, otpName?: string): Promise<void> {
    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: otpEmail, name: otpName }),
    })
    if (!res.ok) throw new Error('Failed to send OTP')
  }

  async function handleEmailSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (isSignUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        await ensureUserDoc(cred.user, name)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      await sendOtp(email, name)
      sessionStorage.setItem('otp_email', email)
      sessionStorage.setItem('otp_name', name)
      router.push('/verify')
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message.replace('Firebase: ', '')
          : 'Something went wrong'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle(): Promise<void> {
    setError('')
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      const cred = await signInWithPopup(auth, provider)
      await ensureUserDoc(cred.user)
      const userEmail = cred.user.email ?? ''
      const userName = cred.user.displayName || ''
      await sendOtp(userEmail, userName)
      sessionStorage.setItem('otp_email', userEmail)
      sessionStorage.setItem('otp_name', userName)
      router.push('/verify')
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message.replace('Firebase: ', '')
          : 'Something went wrong'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  function handleToggleMode(): void {
    setIsSignUp((v) => !v)
    setError('')
    setName('')
  }

  return (
    <div className='min-h-screen bg-bg-base flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Ambient orbs — CSS only */}
      <div
        className='pointer-events-none absolute inset-0 overflow-hidden'
        aria-hidden='true'
      >
        <div className='orb orb-rose absolute -top-28 -left-24 h-72 w-72' />
        <div className='orb orb-gold absolute -bottom-24 -right-16 h-80 w-80' />
        <div className='orb orb-burgundy absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 opacity-40' />
      </div>

      <div className='relative z-10 w-full max-w-md animate-[fadeUp_0.5s_ease_forwards]'>
        {/* Logo / header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mb-4 animate-[float_5s_ease-in-out_infinite]'>
            <SparkleIcon size={22} className='text-rose-400' />
          </div>
          <p className='label-eyebrow mb-1'>Soul Awakening Academy</p>
          <h1 className='font-serif text-[32px] text-burgundy-700 leading-tight'>
            {isSignUp ? 'Begin your journey' : 'Welcome back'}
          </h1>
          <p className='text-sm text-ink-400 mt-1 font-light'>
            {isSignUp
              ? 'Create your account to get started'
              : 'Sign in to continue your journey'}
          </p>
        </div>

        {/* Card */}
        <div className='bg-bg-surface border border-rose-100 rounded-2xl p-8 shadow-soft'>
          {/* Google button */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            type='button'
            className='w-full flex items-center justify-center gap-3
                       border border-ink-100 rounded-full py-3 px-4
                       text-sm font-medium text-ink-900
                       hover:bg-bg-muted hover:border-rose-200
                       transition-all duration-200 disabled:opacity-40 mb-6
                       hover:-translate-y-0.5 active:scale-[0.98]'
          >
            <GoogleIcon size={18} />
            Continue with Google
          </button>

          {/* Divider */}
          <div className='flex items-center gap-3 mb-6'>
            <div className='flex-1 h-px bg-ink-100' />
            <span className='text-xs text-ink-300 font-medium'>or</span>
            <div className='flex-1 h-px bg-ink-100' />
          </div>

          {/* Form */}
          <form onSubmit={handleEmailSubmit} className='space-y-4'>
            {/* Name field — only in sign-up mode */}
            <div
              className={[
                'overflow-hidden transition-all duration-300 ease-in-out',
                isSignUp ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0',
              ].join(' ')}
            >
              <div className='pb-1'>
                <label htmlFor='name' className='input-label'>
                  Full name
                </label>
                <div className='relative'>
                  <FieldIcon icon={UserIcon} />
                  <input
                    id='name'
                    className={inputBase}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your full name'
                    required={isSignUp}
                    tabIndex={isSignUp ? 0 : -1}
                    autoComplete='name'
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='input-label'>
                Email address
              </label>
              <div className='relative'>
                <FieldIcon icon={MailIcon} />
                <input
                  id='email'
                  className={inputBase}
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='you@example.com'
                  required
                  autoComplete='email'
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className='flex items-center justify-between mb-1.5'>
                <label htmlFor='password' className='input-label'>
                  Password
                </label>
                {!isSignUp && (
                  <a
                    href='/forgot-password'
                    className='text-[11px] font-medium text-rose-500 hover:text-burgundy-600 transition-colors duration-150'
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <div className='relative'>
                <FieldIcon icon={LockIcon} />
                <input
                  id='password'
                  className={`${inputBase} pr-10`}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='••••••••'
                  required
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className='absolute right-0 top-0 h-full w-10 flex items-center justify-center
                             text-ink-300 hover:text-ink-600 transition-colors duration-150'
                >
                  {showPassword ? (
                    <EyeOffIcon size={16} />
                  ) : (
                    <EyeIcon size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Error */}
            <div
              className={[
                'overflow-hidden transition-all duration-200 ease-in-out',
                error ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0',
              ].join(' ')}
            >
              <div className='flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5'>
                <p className='text-xs text-red-500 leading-relaxed'>{error}</p>
              </div>
            </div>

            {/* Submit */}
            <button
              type='submit'
              disabled={loading}
              className='btn btn-primary w-full mt-2 btn-magnetic disabled:opacity-40 disabled:transform-none'
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
                  Please wait…
                </>
              ) : isSignUp ? (
                'Create Account'
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Toggle sign-in / sign-up */}
          <p className='text-center text-sm text-ink-400 mt-6'>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              type='button'
              onClick={handleToggleMode}
              className='text-rose-500 font-medium hover:text-burgundy-600 hover:underline transition-colors duration-150'
            >
              {isSignUp ? 'Sign in' : 'Sign up'}
            </button>
          </p>
        </div>

        {/* Footer note */}
        <p className='text-center text-[11px] text-ink-300 mt-6 font-light'>
          By continuing, you agree to our{' '}
          <a
            href='/terms'
            className='hover:text-rose-500 transition-colors duration-150'
          >
            Terms
          </a>{' '}
          and{' '}
          <a
            href='/privacy'
            className='hover:text-rose-500 transition-colors duration-150'
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
