'use client'

import type { JSX } from 'react'
import { Divider, SectionHeading, PainCard } from '@/components/website/Shared'

const PAIN_POINTS: string[] = [
  'You say yes when every part of you wants to say no — people-pleasing until you disappear.',
  'You keep attracting the same painful patterns — unavailable partners, fear of abandonment, repeated heartbreak.',
  "You wake up exhausted from replaying what you said or didn't say, trapped in self-doubt.",
  'You experience repeated setbacks despite working incredibly hard — wondering why you remain stuck.',
  "You've achieved things by every external measure, yet feel disconnected or incomplete inside.",
  "Nothing feels truly aligned. You sense a deeper calling but can't find the path to it.",
]

export default function PainPointsSection(): JSX.Element {
  return (
    <section className='section'>
      <Divider />

      <div className='mt-10 mb-12'>
        <SectionHeading
          eyebrow='Does this sound familiar?'
          title={
            <>
              The patterns that keep{' '}
              <span className='italic text-rose-500'>pulling you back</span>
            </>
          }
          description="These aren't character flaws. They're unresolved soul contracts — and they have a root."
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
        {PAIN_POINTS.map((text, i) => (
          <PainCard key={i} text={text} index={i} />
        ))}
      </div>

      {/* Closing quote */}
      <div className='mt-10 text-center animate-[fadeUp_0.5s_ease_0.35s_forwards] opacity-0'>
        <div
          className='inline-block px-8 py-6 rounded-2xl bg-bg-surface border border-gold-200
                        shadow-[var(--shadow-gold)] hover:scale-[1.01] transition-transform duration-200'
        >
          <p className='font-serif italic text-base text-ink-900 leading-snug'>
            If even one of these hit —{' '}
            <span className='text-rose-500 not-italic font-medium'>
              your soul is already asking for something deeper.
            </span>
          </p>
        </div>
      </div>
    </section>
  )
}
