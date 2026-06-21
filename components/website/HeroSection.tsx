'use client'

import Link from 'next/link'
import type { JSX } from 'react'
import { SparkleIcon, ChevronRightIcon } from '@/components/icons'

interface Stat {
  value: string
  label: string
}

const STATS: Stat[] = [
  { value: '200+', label: 'Lives Transformed' },
  { value: '98%', label: 'Satisfaction Rate' },
  { value: '5★', label: 'Average Rating' },
]

const TRUST_BADGES = [
  'Certified Akashic Reader',
  'Life & Relationship Coach',
  'Soul Healing Guide',
]

export default function HeroSection(): JSX.Element {
  return (
    <section className='relative overflow-hidden min-h-[92vh] flex flex-col justify-center bg-bg-base'>
      {/* ── Ambient orbs ── */}
      <div
        className='pointer-events-none absolute inset-0 overflow-hidden'
        aria-hidden='true'
      >
        <div
          className='absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full
                        bg-rose-300/20 blur-[100px]
                        animate-[orbFloat_12s_ease-in-out_infinite]'
        />
        <div
          className='absolute -bottom-40 -right-20 h-[420px] w-[420px] rounded-full
                        bg-gold-300/15 blur-[90px]
                        animate-[orbFloat_10s_ease-in-out_infinite_reverse]'
        />
        <div
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        h-72 w-72 rounded-full bg-burgundy-300/10 blur-[80px]
                        animate-[orbFloat_14s_ease-in-out_3s_infinite]'
        />
      </div>

      {/* ── Subtle grid texture ── */}
      <div
        className='pointer-events-none absolute inset-0 opacity-[0.025]'
        style={{
          backgroundImage:
            'linear-gradient(var(--rose-400) 1px, transparent 1px), linear-gradient(90deg, var(--rose-400) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden='true'
      />

      <div className='relative z-10 max-w-3xl mx-auto px-5 sm:px-6 pt-16 sm:pt-20 pb-20 sm:pb-28'>
        <div className='flex flex-col items-center text-center'>
          {/* Brand pill */}
          <div
            className='inline-flex items-center gap-2 bg-bg-surface/90 backdrop-blur-sm
                        border border-rose-200 px-4 py-1.5 rounded-full mb-10
                        shadow-[var(--shadow-card)] cursor-default
                        hover:border-gold-300 hover:shadow-[var(--shadow-gold)]
                        transition-all duration-300
                        animate-[fadeUp_0.5s_ease_0.1s_both] opacity-0'
          >
            <span className='text-gold-400 animate-float'>
              <SparkleIcon size={11} />
            </span>
            <span className='text-[10px] font-semibold text-rose-500 uppercase tracking-[0.22em]'>
              Soul Awakening Academy
            </span>
          </div>

          {/* Headline */}
          <h1
            className='font-serif text-ink-900 leading-[1.08]
                       text-[2.6rem] sm:text-[3.4rem] lg:text-[4rem] mb-6
                       animate-[fadeUp_0.6s_ease_0.2s_both] opacity-0'
          >
            You keep trying.
            <br />
            <span className='italic relative'>
              <span className='text-rose-500'>The same pain</span> keeps
              winning.
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className='text-lg sm:text-xl text-ink-500 max-w-lg leading-relaxed mb-3 font-light
                       animate-[fadeUp_0.6s_ease_0.3s_both] opacity-0'
          >
            New year. New partner. New job.{' '}
            <span className='text-ink-700 font-normal'>
              Same story. Same heartbreak.
            </span>
          </p>

          <p
            className='text-sm sm:text-[15px] text-ink-400 max-w-md leading-relaxed mb-11
                       animate-[fadeUp_0.6s_ease_0.38s_both] opacity-0'
          >
            The pattern isn&apos;t a coincidence — it&apos;s a soul-level
            blueprint. Through{' '}
            <span className='text-rose-500 font-medium'>
              Akashic Record Reading
            </span>{' '}
            and{' '}
            <span className='text-rose-500 font-medium'>
              Life &amp; Relationship Coaching
            </span>
            , we go to the root. And we rewrite it.
          </p>

          {/* CTAs */}
          <div
            className='flex flex-col sm:flex-row items-center gap-3 mb-14
                       w-full sm:w-auto px-4 sm:px-0
                       animate-[fadeUp_0.6s_ease_0.46s_both] opacity-0'
          >
            <Link href='/login' className='w-full sm:w-auto'>
              <span
                className='btn btn-primary btn-lg w-full sm:w-auto inline-flex
                           shadow-[0_8px_28px_rgba(107,45,62,0.28)]
                           hover:shadow-[0_12px_36px_rgba(107,45,62,0.38)]
                           hover:-translate-y-1 hover:scale-[1.02]
                           active:scale-[0.97]
                           transition-all duration-200'
              >
                Begin Your Healing
                <ChevronRightIcon size={15} />
              </span>
            </Link>
            <a href='#programs' className='w-full sm:w-auto'>
              <span
                className='btn btn-ghost btn-lg w-full sm:w-auto inline-flex
                           hover:-translate-y-0.5 transition-all duration-200'
              >
                See Programs
              </span>
            </a>
          </div>

          {/* Stats row */}
          <div
            className='flex flex-wrap items-center justify-center gap-x-10 gap-y-5 mb-11
                       px-8 py-5 rounded-2xl
                       bg-bg-surface/80 border border-rose-100
                       backdrop-blur-sm shadow-[var(--shadow-card)]
                       hover:border-gold-200 hover:shadow-[var(--shadow-soft)]
                       transition-all duration-300
                       animate-[fadeUp_0.6s_ease_0.54s_both] opacity-0'
          >
            {STATS.map(({ value, label }, i) => (
              <div
                key={label}
                className='flex flex-col items-center group cursor-default'
              >
                <span
                  className='font-serif text-3xl text-burgundy-600 leading-none
                             group-hover:text-gold-500 transition-colors duration-200'
                >
                  {value}
                </span>
                <span
                  className='text-[10px] font-semibold uppercase tracking-[0.18em]
                             text-ink-400 mt-1.5 group-hover:text-ink-600
                             transition-colors duration-200'
                >
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div
            className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2
                       animate-[fadeUp_0.6s_ease_0.62s_both] opacity-0'
          >
            {TRUST_BADGES.map((badge, i) => (
              <div
                key={badge}
                className='flex items-center gap-2 text-xs text-ink-400 group cursor-default'
              >
                <span
                  className='h-1.5 w-1.5 rounded-full bg-gold-400
                             group-hover:bg-rose-400 group-hover:scale-125
                             transition-all duration-200
                             animate-[sparklePop_2.5s_ease-in-out_infinite]'
                  style={{ animationDelay: `${i * 0.7}s` }}
                />
                <span className='group-hover:text-ink-700 transition-colors duration-200'>
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className='hidden sm:flex absolute bottom-6 inset-x-0 flex-col items-center gap-2
                   animate-[fadeIn_0.7s_ease_1.8s_forwards] opacity-0'
      >
        <span className='text-[9px] uppercase tracking-[0.28em] text-ink-300'>
          Scroll
        </span>
        <span
          className='block h-7 w-px bg-gradient-to-b from-gold-400/80 to-transparent
                         animate-[float_1.4s_ease-in-out_infinite]'
        />
      </div>
    </section>
  )
}
