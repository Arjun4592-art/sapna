'use client'

import type { JSX } from 'react'
import { Divider, SectionLabel } from '@/components/website/Shared'
import { SparkleIcon } from '@/components/icons'

const STORY_PARAS: string[] = [
  'Professionally, Sapna came from a world of logic — engineering, law, teaching. Credentials stacked. Life still hollow.',
  'When cancer took her father, the grief cracked something open. In the Akashic Records, she found what no degree had given her.',
  "Today she blends ancient spiritual wisdom with grounded, practical coaching — because awareness alone doesn't transform. Action does.",
]

const BADGES: string[] = ['Akashic Reader', 'Life Coach', 'Soul Guide']

export default function AboutSection(): JSX.Element {
  return (
    <section
      id='about'
      className='section bg-white border border-rose-100 rounded-sm
                 mx-4 sm:mx-6 lg:mx-auto max-w-5xl my-8 overflow-hidden relative
                 shadow-[var(--shadow-card)]'
    >
      {/* Decorative orbs */}
      <div
        className='pointer-events-none absolute -top-20 -right-20 w-64 h-64
                      rounded-full bg-gold-100 opacity-40 blur-[70px]'
      />
      <div
        className='pointer-events-none absolute -bottom-16 -left-16 w-48 h-48
                      rounded-full bg-rose-100 opacity-30 blur-[60px]'
      />

      <Divider />

      <div
        className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14
                      items-center relative z-10'
      >
        {/* ── Avatar col ── */}
        <div className='flex flex-col items-center animate-[slideInLeft_0.6s_cubic-bezier(0.4,0,0.2,1)_both]'>
          <div className='relative mb-5'>
            <span
              className='absolute inset-0 rounded-full border-2 border-rose-300
                             animate-[pulseRing_3s_ease-out_infinite]'
            />
            <span
              className='absolute inset-0 rounded-full border border-gold-300
                             animate-[pulseRing_3s_ease-out_0.8s_infinite]'
            />

            <div
              className='relative h-36 w-36 sm:h-40 sm:w-40 rounded-full
                            bg-rose-100 border-4 border-rose-200
                            flex items-center justify-center
                            shadow-[0_4px_20px_rgba(107,45,62,0.15)]
                            hover:shadow-[var(--shadow-soft)]
                            hover:border-gold-300 hover:scale-[1.04]
                            transition-all duration-300 cursor-default'
            >
              <span className='font-serif text-4xl text-burgundy-600'>SL</span>
            </div>
          </div>

          <p className='font-serif text-base text-ink-900'>Sapna Lamba</p>
          <p className='text-xs text-ink-400 text-center mt-1 leading-relaxed'>
            Certified Akashic Record Reader
            <br />
            Life &amp; Relationship Coach · Soul Healing Guide
          </p>

          {/* Badges */}
          <div className='flex gap-1.5 mt-4 flex-wrap justify-center'>
            {BADGES.map((c) => (
              <span
                key={c}
                className='badge badge-rose text-[10px] cursor-default
                           hover:scale-[1.06] hover:-translate-y-0.5
                           hover:border-gold-300 hover:bg-gold-50 hover:text-gold-600
                           active:scale-[0.97] transition-all duration-200'
              >
                {c}
              </span>
            ))}
          </div>

          <span className='mt-5 text-gold-400 animate-float'>
            <SparkleIcon size={16} />
          </span>
        </div>

        {/* ── Story col ── */}
        <div className='animate-[slideInRight_0.6s_cubic-bezier(0.4,0,0.2,1)_both]'>
          <SectionLabel>Your Guide</SectionLabel>

          <h2
            className='font-serif text-ink-900 text-2xl sm:text-3xl
                         leading-[1.2] mt-2 mb-4'
          >
            She didn&apos;t find this path.{' '}
            <span className='italic text-rose-500'>Grief led her to it.</span>
          </h2>

          <blockquote
            className='border-l-2 border-gold-400 pl-4 mb-5
                                 font-serif italic text-burgundy-600
                                 text-sm sm:text-base leading-relaxed'
          >
            &ldquo;I felt connected to my father at a soul level — even though
            he was no longer physically present.&rdquo;
          </blockquote>

          <div className='space-y-3 stagger-children'>
            {STORY_PARAS.map((para, i) => (
              <p
                key={i}
                className='text-sm text-ink-500 leading-relaxed font-light'
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
