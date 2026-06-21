'use client'

import type { JSX } from 'react'
import { Divider, SectionHeading } from '@/components/website/Shared'

interface Week {
  title: string
  desc: string
}

const WEEKS: Week[] = [
  {
    title: 'Your Life, Your Responsibility',
    desc: 'Stop asking "why me" and start asking "what now".',
  },
  {
    title: 'Understanding Your True Why',
    desc: 'Dig below goals and find the values that actually run your life.',
  },
  {
    title: 'Breaking Limiting Beliefs',
    desc: 'Expose hidden scripts and dismantle them at the root.',
  },
  {
    title: 'Turning Dreams into Clear Goals',
    desc: 'Vague desires become precise, soul-aligned intentions.',
  },
  {
    title: 'Understanding Inner Resistances',
    desc: 'Fear, procrastination, self-sabotage — named and moved through.',
  },
  {
    title: 'Affirmations — Power of Your Words',
    desc: 'Build an inner language that rewires what you believe.',
  },
  {
    title: 'Visualization — Dream it, Become it',
    desc: 'Emotional alignment precedes physical reality.',
  },
  {
    title: 'Taking Action — Knowing to Doing',
    desc: 'Sustainable habits and a clear, lasting plan.',
  },
]

export default function JourneySection(): JSX.Element {
  return (
    <section
      id='journey'
      className='section rounded-2xl mx-4 sm:mx-6 lg:mx-auto max-w-5xl my-10 overflow-hidden relative bg-burgundy-700'
    >
      <div
        className='pointer-events-none absolute -top-20 -right-20 w-64 h-64
                      rounded-full bg-rose-600 opacity-15 blur-[80px] z-0'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute -bottom-16 -left-16 w-56 h-56
                      rounded-full bg-gold-400 opacity-10 blur-[65px] z-0'
        aria-hidden='true'
      />

      <Divider light />

      <div className='relative z-10 mt-10 mb-9 sm:mb-10'>
        <SectionHeading
          eyebrow='Inside the 8-Week Journey'
          title={
            <>
              Week by week,{' '}
              <span className='italic text-rose-300'>layer by layer</span>
            </>
          }
          description='Each week builds on the last. Nothing is skipped. Nothing is surface-level.'
          light
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 relative z-10 stagger-children'>
        {WEEKS.map((item, i) => (
          <div
            key={item.title}
            className='flex gap-3.5 p-4 sm:p-5 rounded-xl border border-white/10
                       hover:border-gold-400/45 hover:bg-gold-400/[0.06]
                       transition-colors duration-200 cursor-default group'
          >
            <div
              className='w-8 h-8 rounded-full bg-rose-400/15 flex items-center justify-center
                            flex-shrink-0 font-serif text-xs font-bold text-rose-300
                            group-hover:bg-gold-400/20 group-hover:text-gold-300 transition-colors duration-200'
            >
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <p
                className='text-sm font-semibold text-white mb-1 leading-snug
                            group-hover:text-gold-200 transition-colors duration-200'
              >
                {item.title}
              </p>
              <p
                className='text-xs text-white/40 leading-relaxed
                            group-hover:text-white/60 transition-colors duration-200'
              >
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
