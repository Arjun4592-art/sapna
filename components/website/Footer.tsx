'use client'

import type { JSX } from 'react'
import { SparkleIcon } from '@/components/icons'

export default function Footer(): JSX.Element {
  return (
    <footer className='border-t border-rose-100 py-8 sm:py-10 px-6 bg-bg-base'>
      <div
        className='max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between
                      gap-4 sm:gap-6 text-center sm:text-left'
      >
        <div className='flex items-center gap-2.5'>
          <span
            className='w-7 h-7 rounded-full bg-rose-100 border border-rose-100
                           flex items-center justify-center text-gold-400
                           hover:bg-gold-50 hover:border-gold-200 transition-colors duration-200
                           animate-float'
          >
            <SparkleIcon size={13} />
          </span>
          <span className='text-sm font-semibold text-ink-900 font-serif'>
            Soul Awakening Academy
          </span>
        </div>

        <span className='hidden sm:block text-gold-400 text-xs animate-[goldPulse_2.5s_ease-in-out_infinite]'>
          ✦
        </span>

        <p className='text-xs text-ink-300 italic font-serif'>
          &ldquo;Healing should feel supported, safe, and compassionate.&rdquo;
        </p>

        <p className='text-xs text-ink-300'>
          © {new Date().getFullYear()} Sapna Lamba · All rights reserved
        </p>
      </div>
    </footer>
  )
}
