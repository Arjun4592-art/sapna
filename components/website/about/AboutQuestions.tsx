'use client'

import { Divider, SectionHeading } from '@/components/website/Shared'

const QUESTIONS: string[] = [
  '"Why is this happening to me?"',
  '"Why do I keep attracting the wrong relationships?"',
  '"Why do the same painful patterns repeat?"',
  '"Why do I feel emotionally stuck?"',
  '"Why do I struggle despite trying so hard?"',
  '"Why do I feel disconnected, anxious, or incomplete?"',
]

export default function AboutQuestions(): React.JSX.Element {
  return (
    <section className='section rounded-2xl mx-4 sm:mx-6 lg:mx-auto max-w-5xl mt-16 mb-16 overflow-hidden relative bg-ink-900'>
      <div
        className='pointer-events-none absolute -top-20 -right-20 w-64 h-64 rounded-full bg-rose-600 opacity-15 blur-[80px] z-0'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-rose-400 opacity-10 blur-[65px] z-0'
        aria-hidden='true'
      />

      <Divider light />

      <div className='relative z-10 mt-10 mb-10'>
        <SectionHeading
          eyebrow='The Questions We All Ask'
          title={
            <>
              From a human perspective,{' '}
              <span className='italic text-rose-300'>
                we only see the surface
              </span>
            </>
          }
          description="Most people spend their lives asking these questions — and never finding real answers, because they're looking at the surface level, not the soul level."
          light
        />
      </div>

      <div className='relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-10 stagger-children'>
        {QUESTIONS.map((q) => (
          <div
            key={q}
            className='bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:border-rose-400/35 hover:bg-rose-400/[0.06] transition-colors duration-200 cursor-default'
          >
            <p className='text-sm italic text-rose-300 leading-relaxed font-serif'>
              {q}
            </p>
          </div>
        ))}
      </div>

      <p className='relative z-10 text-center text-sm text-white/40 max-w-2xl mx-auto leading-relaxed font-light animate-[fadeUp_0.5s_ease_0.2s_forwards] opacity-0'>
        Through Akashic Record Readings, we go deeper into the soul-level root
        causes behind these experiences. Many times, the challenges we face are
        connected to karmic patterns, unresolved emotional wounds, subconscious
        fears, soul lessons, energetic imbalances, past life experiences,
        relationship contracts, and limiting beliefs carried across lifetimes.
      </p>
    </section>
  )
}
