'use client'

import { SparkleIcon } from '@/components/icons'
import { SectionLabel } from '@/components/website/Shared'

const CREDENTIALS: string[] = [
  'Certified Akashic Reader',
  'Life Coach',
  'Relationship Coach',
  'Soul Healing Guide',
]

const SOUL_REALIZATIONS: string[] = [
  'Life does not end with the physical body.',
  'The soul continues its journey beyond this human form.',
]

export default function AboutStory(): React.JSX.Element {
  return (
    <section className='section'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start'>
        {/* Left — Avatar + credentials */}
        <div className='flex flex-col items-center md:sticky md:top-28 animate-[slideInLeft_0.6s_cubic-bezier(0.4,0,0.2,1)_forwards]'>
          <div className='relative'>
            <span className='absolute inset-0 rounded-3xl border-2 border-rose-300 animate-[pulseRing_3s_ease-out_infinite]' />
            <div className='relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-rose-100 flex items-center justify-center border border-rose-200 shadow-soft hover:scale-[1.02] transition-transform duration-250'>
              <span className='font-serif text-7xl sm:text-8xl text-rose-400/50'>
                SL
              </span>
            </div>
            <div className='absolute -bottom-4 -right-4 bg-bg-surface border border-rose-100 rounded-xl px-4 py-3 shadow-soft animate-[fadeUp_0.45s_ease_0.3s_forwards] opacity-0'>
              <p className='text-xs font-semibold text-ink-900'>Sapna Lamba</p>
              <p className='text-[10px] text-rose-400 mt-0.5'>
                Soul Healing Guide
              </p>
            </div>
          </div>

          <div className='flex flex-wrap gap-1.5 mt-10 justify-center'>
            {CREDENTIALS.map((c) => (
              <span
                key={c}
                className='badge badge-rose text-[10px] cursor-default hover:scale-105 transition-transform duration-150'
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Story */}
        <div className='space-y-5 animate-[slideInRight_0.6s_cubic-bezier(0.4,0,0.2,1)_0.1s_forwards] opacity-0'>
          <SectionLabel>Her Story</SectionLabel>

          <h2 className='font-serif text-ink-900 text-2xl sm:text-3xl leading-[1.2]'>
            From logic to <span className='italic text-rose-400'>soul</span>
          </h2>

          <p className='text-sm text-ink-500 leading-relaxed font-light'>
            Professionally, I come from a very different background. I am an
            engineer by qualification, I studied law, and I also explored
            teaching as a career. But somewhere deep within, nothing truly felt
            aligned. Despite trying different paths, I always felt that
            something was missing — as if life was trying to guide me towards
            something much deeper.
          </p>
          <p className='text-sm text-ink-500 leading-relaxed font-light'>
            A few years ago, my life changed completely when I lost my father to
            cancer. He was not just my father — he was my biggest emotional
            support, my strength, and the one person I could always rely on
            unconditionally throughout my life journey. Losing him was one of
            the most painful experiences of my life.
          </p>
          <p className='text-sm text-ink-500 leading-relaxed font-light'>
            To a very large extent, I could not accept that he was gone.
            Somewhere within me, I kept searching for him. I wanted to feel
            connected to him again. I wanted to understand:
          </p>

          <blockquote className='border-l-2 border-rose-300 pl-5 py-1'>
            <p className='text-base italic text-ink-700 leading-relaxed font-serif'>
              &ldquo;How can someone who was such a strong part of your life
              suddenly disappear?&rdquo;
            </p>
          </blockquote>

          <p className='text-sm text-ink-500 leading-relaxed font-light'>
            That search became the turning point of my life. During that
            emotional phase, I stumbled upon the concept of Akashic Records.
            Initially, I was simply curious. But slowly, as I started learning
            and experiencing this work, I realized that life is far deeper than
            what we perceive through the physical world.
          </p>

          <p className='text-sm font-medium text-ink-900'>
            For the first time, I began understanding life from a soul
            perspective rather than only from a human perspective. I realized:
          </p>

          <div className='space-y-2 pl-4'>
            {SOUL_REALIZATIONS.map((line, i) => (
              <div
                key={line}
                style={{ animationDelay: `${i * 0.1}s` }}
                className='flex items-start gap-2 animate-[slideInLeft_0.4s_ease_forwards] opacity-0'
              >
                <SparkleIcon
                  size={12}
                  className='text-rose-400 mt-1 flex-shrink-0'
                />
                <p className='text-sm text-ink-500 font-light'>{line}</p>
              </div>
            ))}
          </div>

          <p className='text-sm text-ink-500 leading-relaxed font-light'>
            As I started exploring Akashic Records more deeply through
            meditation, prayers, spiritual practices, and inner healing work, I
            experienced a profound emotional shift within myself.
          </p>

          <blockquote className='border-l-2 border-rose-300 pl-5 py-1'>
            <p className='text-base italic text-ink-700 leading-relaxed font-serif'>
              &ldquo;I felt connected to my father at a soul level. Even though
              he was no longer physically present, it felt as if his guidance,
              energy, love, and presence were still around me. That realization
              changed my understanding of life completely.&rdquo;
            </p>
            <p className='text-xs text-ink-300 mt-2'>— Sapna Lamba</p>
          </blockquote>

          <p className='text-sm text-ink-500 leading-relaxed font-light'>
            What initially started as a personal healing journey slowly became
            my soul&apos;s purpose. I continued studying Akashic Records deeply
            — understanding soul patterns, karmic cycles, emotional wounds,
            energetic healing, and spiritual guidance. Eventually, I became a
            certified Akashic Record Reader.
          </p>
          <p className='text-sm text-ink-500 leading-relaxed font-light'>
            But before helping others, I first helped myself. I understood my
            own emotional wounds, fears, patterns, and soul lessons. I
            experienced how awareness at the soul level can completely shift the
            way we see our struggles.
          </p>
          <p className='text-sm font-medium text-ink-900'>
            And today, this is exactly what I wish to help others experience.
          </p>
        </div>
      </div>
    </section>
  )
}
