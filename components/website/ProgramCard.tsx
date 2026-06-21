'use client'

import Link from 'next/link'
import { CheckItem } from '@/components/website/Shared'
import RazorpayButton from '@/components/RazorpayButton'

interface ProgramCardProps {
  programId: string
  badge: string
  title: string
  subtitle: string
  description: string
  price: string
  originalPrice: string
  includes: string[]
  featured?: boolean
  courseHref: string
  index?: number
}

export default function ProgramCard({
  programId,
  badge,
  title,
  subtitle,
  description,
  price,
  originalPrice,
  includes,
  featured = false,
  courseHref,
  index = 0,
}: ProgramCardProps): React.JSX.Element {
  return (
    <div
      style={{ animationDelay: `${index * 0.12}s` }}
      className={[
        'relative rounded-2xl p-6 sm:p-7 flex flex-col h-full',
        'animate-[fadeUp_0.55s_cubic-bezier(0.4,0,0.2,1)_forwards] opacity-0',
        'transition-all duration-200',
        featured
          ? 'bg-burgundy-700 shadow-[0_20px_50px_rgba(107,45,62,0.28)] hover:shadow-[0_28px_60px_rgba(107,45,62,0.35)] hover:-translate-y-1.5'
          : 'bg-bg-surface border border-rose-100 shadow-card hover:border-gold-200 hover:shadow-gold hover:-translate-y-1.5',
      ].join(' ')}
    >
      {/* Most Popular badge */}
      {featured && (
        <div className='absolute -top-3 left-1/2 -translate-x-1/2 z-10'>
          <span className='inline-block bg-gold-400 text-burgundy-700 text-[10px] font-semibold px-4 py-1 rounded-full uppercase tracking-widest animate-[goldPulse_2.5s_ease-in-out_infinite]'>
            Most Popular
          </span>
        </div>
      )}

      {/* Header */}
      <div className='mb-5'>
        <span
          className={[
            'text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 inline-block',
            featured
              ? 'bg-gold-400/20 text-gold-300'
              : 'bg-rose-50 text-rose-500',
          ].join(' ')}
        >
          {badge}
        </span>
        <h3
          className={`font-serif text-xl sm:text-2xl leading-tight mb-1 ${featured ? 'text-white' : 'text-ink-900'}`}
        >
          {title}
        </h3>
        <p className={`text-sm ${featured ? 'text-rose-200' : 'text-ink-400'}`}>
          {subtitle}
        </p>
      </div>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed mb-5 font-light ${featured ? 'text-white/65' : 'text-ink-500'}`}
      >
        {description}
      </p>

      {/* Includes */}
      <ul className='space-y-2 mb-7 flex-1'>
        {includes.map((item, i) => (
          <CheckItem key={i} text={item} featured={featured} />
        ))}
      </ul>

      {/* Price */}
      <div
        className={`mb-4 pb-4 border-b ${featured ? 'border-white/10' : 'border-rose-100'}`}
      >
        <div className='flex items-baseline gap-2'>
          <span
            className={`font-serif text-3xl font-bold ${featured ? 'text-gold-300' : 'text-burgundy-600'}`}
          >
            {price}
          </span>
          <span
            className={`text-sm line-through ${featured ? 'text-white/30' : 'text-ink-300'}`}
          >
            {originalPrice}
          </span>
        </div>
        <p
          className={`text-xs mt-0.5 ${featured ? 'text-white/30' : 'text-ink-300'}`}
        >
          One-time investment · Limited seats
        </p>
      </div>

      {/* Course link */}
      <Link
        href={courseHref}
        className='text-xs font-medium mb-3.5 inline-flex items-center gap-1 text-rose-400 hover:text-gold-500 hover:gap-2 transition-all duration-150'
      >
        View full program details →
      </Link>

      {/* Enroll button */}
      <div className='hover:scale-[1.015] active:scale-[0.97] transition-transform duration-150'>
        <RazorpayButton
          programId={programId}
          label='Enroll Now'
          className={[
            'w-full py-3 rounded-full font-semibold text-sm transition-all duration-200',
            featured
              ? 'bg-gold-400 text-burgundy-700 hover:bg-gold-300 shadow-gold hover:shadow-[0_6px_20px_rgba(201,168,76,0.45)]'
              : 'bg-burgundy-700 text-white hover:bg-burgundy-600 shadow-card hover:shadow-soft',
          ].join(' ')}
        />
      </div>
    </div>
  )
}
