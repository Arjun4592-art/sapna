'use client'

import { SparkleIcon } from '@/components/icons'

export default function AboutHero(): React.JSX.Element {
  return (
    <section className='relative overflow-hidden bg-bg-base w-full text-center pt-24 pb-14 px-5 sm:px-6'>
      {/* Ambient orbs */}
      <div
        className='pointer-events-none absolute inset-0 overflow-hidden'
        aria-hidden='true'
      >
        <div className='orb orb-rose absolute -top-28 -left-24 h-72 w-72' />
        <div className='orb orb-gold absolute -bottom-24 -right-16 h-80 w-80' />
      </div>

      <div className='relative z-10 max-w-2xl mx-auto flex flex-col items-center stagger-children'>
        {/* Brand pill */}
        <div className='inline-flex items-center gap-2 bg-bg-surface border border-rose-200 px-4 py-1.5 rounded-full mb-8 shadow-card'>
          <span className='text-gold-400 animate-[float_5s_ease-in-out_infinite]'>
            <SparkleIcon size={11} />
          </span>
          <span className='text-[10px] font-semibold text-rose-500 uppercase tracking-[0.22em]'>
            Meet Sapna
          </span>
        </div>

        <h1 className='font-serif text-ink-900 leading-[1.15] text-[2.2rem] sm:text-5xl mb-2'>
          Sapna Lamba
        </h1>

        <p className='text-sm font-medium text-rose-500 mb-5 tracking-wide'>
          Akashic Record Reader · Life &amp; Relationship Coach · Soul Healing
          Guide
        </p>

        <p className='text-sm text-ink-400 max-w-xl mx-auto leading-relaxed font-light'>
          My journey into the world of Akashic Records did not begin as a
          profession. It began as a deeply personal search for answers, healing,
          and connection.
        </p>
      </div>
    </section>
  )
}
