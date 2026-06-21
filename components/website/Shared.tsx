'use client'

import type { ReactNode, ComponentType, JSX } from 'react'
import { SparkleIcon, CheckIcon } from '@/components/icons'

// ─────────────────────────────────────────
// Divider
// ─────────────────────────────────────────
export function Divider({ light = false }: { light?: boolean }): JSX.Element {
  return (
    <div className='flex items-center justify-center gap-3 py-1'>
      <div
        className={`h-px w-10 sm:w-16 animate-[fadeIn_0.7s_ease_both]
          ${
            light
              ? 'bg-gradient-to-r from-transparent to-white/20'
              : 'bg-gradient-to-r from-transparent to-rose-200'
          }`}
      />
      <span
        className={`animate-[slow-spin_10s_linear_infinite]
          ${light ? 'text-rose-300' : 'text-gold-400'}`}
      >
        <SparkleIcon size={12} />
      </span>
      <div
        className={`h-px w-10 sm:w-16 animate-[fadeIn_0.7s_ease_both]
          ${
            light
              ? 'bg-gradient-to-l from-transparent to-white/20'
              : 'bg-gradient-to-l from-transparent to-rose-200'
          }`}
      />
    </div>
  )
}

// ─────────────────────────────────────────
// SectionLabel
// ─────────────────────────────────────────
export function SectionLabel({
  children,
  light = false,
}: {
  children: ReactNode
  light?: boolean
}): JSX.Element {
  return (
    <div
      className={`inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full border
                  text-[10px] font-semibold uppercase tracking-[0.2em]
                  animate-[fadeUp_0.45s_ease_both]
                  ${
                    light
                      ? 'border-white/10 bg-white/5 text-rose-200'
                      : 'border-rose-200 bg-rose-50 text-rose-500'
                  }`}
    >
      <span
        className={`animate-float
          ${light ? 'text-rose-300' : 'text-gold-400'}`}
      >
        <SparkleIcon size={10} />
      </span>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────
// SectionHeading
// ─────────────────────────────────────────
interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  light?: boolean
  align?: 'center' | 'left'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = 'center',
}: SectionHeadingProps): JSX.Element {
  return (
    <div
      className={`stagger-children ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      <div className={align === 'center' ? 'flex justify-center' : 'flex'}>
        <SectionLabel light={light}>{eyebrow}</SectionLabel>
      </div>

      <h2
        className={`font-serif text-3xl sm:text-4xl leading-[1.15] mt-1
          ${light ? 'text-white' : 'text-ink-900'}`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`text-sm sm:text-[15px] mt-3 font-light leading-relaxed max-w-md
            ${align === 'center' ? 'mx-auto' : ''}
            ${light ? 'text-white/45' : 'text-ink-400'}`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────
// PainCard
// ─────────────────────────────────────────
export function PainCard({
  text,
  index,
}: {
  text: string
  index: number
}): JSX.Element {
  return (
    <div
      className='group flex items-start gap-3 p-4 sm:p-5 bg-bg-surface
                 border border-rose-100 rounded-xl cursor-default
                 hover:border-rose-300 hover:shadow-[var(--shadow-soft)]
                 hover:-translate-y-1 transition-all duration-200
                 animate-[fadeUp_0.45s_ease_both] opacity-0'
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <span
        className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full mt-0.5
                   bg-rose-50 border border-rose-100 text-rose-400
                   group-hover:bg-rose-100 group-hover:border-gold-300
                   group-hover:text-gold-500 group-hover:scale-110 group-hover:rotate-[15deg]
                   transition-all duration-200'
      >
        <SparkleIcon size={11} />
      </span>
      <p className='text-sm text-ink-500 leading-relaxed group-hover:text-ink-700 transition-colors duration-200'>
        {text}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────
// CheckItem
// ─────────────────────────────────────────
export function CheckItem({
  text,
  featured = false,
}: {
  text: string
  featured?: boolean
}): JSX.Element {
  return (
    <li className='flex items-start gap-2.5 group'>
      <span
        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full
                    group-hover:scale-110 transition-all duration-150
                    ${
                      featured
                        ? 'bg-gold-400/20 text-gold-300 group-hover:bg-gold-400/35'
                        : 'bg-rose-50 text-rose-500 group-hover:bg-rose-100'
                    }`}
      >
        <CheckIcon size={10} />
      </span>
      <span
        className={`text-sm leading-relaxed
          ${featured ? 'text-white/75' : 'text-ink-500'}`}
      >
        {text}
      </span>
    </li>
  )
}

// ─────────────────────────────────────────
// FeatureCard
// ─────────────────────────────────────────
interface FeatureCardProps {
  icon: ComponentType<{ size?: number; className?: string }>
  title: string
  description: string
  index: number
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: FeatureCardProps): JSX.Element {
  return (
    <div
      className='group relative flex flex-col items-center text-center p-5 sm:p-6
                 bg-bg-surface border border-rose-100 rounded-2xl cursor-default
                 hover:border-gold-300 hover:shadow-[var(--shadow-gold)]
                 hover:-translate-y-1.5 transition-all duration-250 overflow-hidden
                 animate-[fadeUp_0.5s_ease_both] opacity-0'
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {/* shimmer bg on hover */}
      <div
        className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
                      bg-gradient-to-br from-gold-50/60 via-transparent to-rose-50/40 rounded-2xl pointer-events-none'
      />

      <span
        className='relative flex h-12 w-12 items-center justify-center rounded-full mb-4
                   bg-rose-50 border border-rose-100 text-rose-500
                   group-hover:bg-gold-50 group-hover:border-gold-200 group-hover:text-gold-500
                   group-hover:scale-110 group-hover:rotate-[-4deg]
                   transition-all duration-200'
      >
        {/* pulse ring */}
        <span
          className='absolute inset-0 rounded-full border border-gold-300 opacity-0
                         group-hover:opacity-100 animate-[pulseRing_1.6s_ease-out_infinite]'
        />
        <Icon size={18} />
      </span>

      <p
        className='relative font-serif text-base text-ink-900 mb-1.5
                    group-hover:text-burgundy-600 transition-colors duration-200'
      >
        {title}
      </p>
      <p className='relative text-sm text-ink-400 leading-relaxed font-light'>
        {description}
      </p>
    </div>
  )
}
