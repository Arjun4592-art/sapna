'use client'

import type { ComponentType } from 'react'
import { ShieldIcon, BookIcon, StarIcon } from '@/components/icons'
import { SectionHeading } from '@/components/website/Shared'

interface MissionPillar {
  icon: ComponentType<{ size?: number; className?: string }>
  title: string
  desc: string
}

const MISSION_PILLARS: MissionPillar[] = [
  {
    icon: ShieldIcon,
    title: 'Soul-level clarity',
    desc: 'Akashic Records uncover the deeper soul-level reasons behind your struggles in health, wealth, and relationships.',
  },
  {
    icon: BookIcon,
    title: 'Safe & compassionate space',
    desc: 'A space where you do not feel judged, alone, or misunderstood — where you receive hand-holding and guidance throughout your healing journey.',
  },
  {
    icon: StarIcon,
    title: 'Lasting empowerment',
    desc: 'Moving towards clarity, healing, emotional freedom, and empowerment — because you do not have to figure everything out alone.',
  },
]

const MISSION_LINES: string[] = [
  'To touch as many lives as possible…',
  'To help people heal emotionally at the root cause level…',
  'To help them understand themselves more deeply…',
  'And to guide them towards a more peaceful, empowered, and aligned life.',
]

export default function AboutMission(): React.JSX.Element {
  return (
    <section className='section rounded-2xl mx-4 sm:mx-6 lg:mx-auto max-w-5xl mt-16 mb-16 overflow-hidden relative bg-ink-900'>
      {/* Orbs */}
      <div
        className='pointer-events-none absolute -top-16 -left-16 w-60 h-60 rounded-full bg-rose-400 opacity-10 blur-[75px] z-0'
        aria-hidden='true'
      />
      <div
        className='pointer-events-none absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-rose-600 opacity-15 blur-[80px] z-0'
        aria-hidden='true'
      />

      {/* Heading */}
      <div className='relative z-10 mb-12'>
        <SectionHeading
          eyebrow='Her Mission'
          title={
            <>
              Bridge the gap between{' '}
              <span className='italic text-rose-300'>
                soul wisdom &amp; human life
              </span>
            </>
          }
          light
        />
      </div>

      {/* Pillars */}
      <div className='relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 mb-12 stagger-children'>
        {MISSION_PILLARS.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className='flex flex-col items-center text-center p-6 border border-white/10 rounded-xl hover:border-rose-400/40 hover:-translate-y-1 transition-all duration-200 cursor-default group'
          >
            <span className='flex h-12 w-12 items-center justify-center rounded-full bg-rose-400/15 text-rose-300 mb-4 group-hover:bg-rose-400/25 transition-colors duration-200'>
              <Icon size={20} />
            </span>
            <p className='font-serif text-base text-white mb-2'>{title}</p>
            <p className='text-sm text-white/45 leading-relaxed font-light'>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Mission statement */}
      <div className='relative z-10 border-t border-white/10 pt-10 text-center space-y-3 max-w-2xl mx-auto animate-[fadeUp_0.5s_ease_forwards]'>
        <p className='text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-300'>
          Today, my mission is simple
        </p>
        {MISSION_LINES.map((line) => (
          <p
            key={line}
            className='text-white text-sm font-light leading-relaxed font-serif'
          >
            {line}
          </p>
        ))}
        <p className='text-rose-300 text-sm italic mt-4 font-serif'>
          Because sometimes, the answers we keep searching for externally…
          already exist within the wisdom of our soul.
        </p>
      </div>
    </section>
  )
}
