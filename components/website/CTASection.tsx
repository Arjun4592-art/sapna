'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import type { JSX } from 'react'
import { SparkleIcon } from '@/components/icons'

export default function CTASection(): JSX.Element {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className='section-sm text-center pb-20'>
      <div
        ref={sectionRef}
        className='reveal rounded-2xl px-6 sm:px-10 py-14 sm:py-16
                   relative overflow-hidden bg-burgundy-700'
      >
        {/* Glows */}
        <div
          className='pointer-events-none absolute -top-16 -left-16 w-56 h-56
                        rounded-full bg-rose-400 opacity-20 blur-[70px] z-0'
        />
        <div
          className='pointer-events-none absolute -bottom-16 -right-16 w-56 h-56
                        rounded-full bg-gold-400 opacity-15 blur-[70px] z-0'
        />

        {/* Shimmer border top */}
        <div
          className='absolute top-0 left-0 h-px w-1/2
                        bg-gradient-to-r from-transparent via-gold-400/60 to-transparent
                        animate-[borderShimmer_3.5s_linear_infinite]'
        />

        <div className='relative z-10 flex flex-col items-center stagger-children'>
          <div
            className='w-12 h-12 rounded-full bg-gold-400/20 border border-gold-400/25
                          flex items-center justify-center mb-6 animate-float
                          hover:bg-gold-400/30 transition-colors duration-200 cursor-default'
          >
            <SparkleIcon size={22} className='text-gold-300' />
          </div>

          <h2 className='font-serif text-white text-3xl sm:text-4xl mb-2 leading-[1.15]'>
            The pattern ends here.
          </h2>

          <p className='text-base text-gold-300 font-serif italic mb-4'>
            If not now — when?
          </p>

          <p className='text-sm text-white/45 max-w-sm mx-auto leading-relaxed mb-9 font-light'>
            You don&apos;t have to keep figuring this out alone. Healing should
            feel supported, safe, and compassionate.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 w-full'>
            <Link href='/login' className='w-full sm:w-auto'>
              <span
                className='btn btn-gold btn-lg w-full sm:w-auto inline-flex
                               shadow-[var(--shadow-gold)]
                               hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)]
                               hover:-translate-y-0.5 transition-all duration-200'
              >
                Start Your Journey
              </span>
            </Link>
            <Link href='/login' className='w-full sm:w-auto'>
              <span
                className='btn btn-lg w-full sm:w-auto inline-flex rounded-full
                               border border-white/15 text-white/55
                               hover:border-gold-400/40 hover:text-white/80
                               transition-all duration-200'
              >
                Already enrolled? Login →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
