'use client'

import { useState, useEffect, type JSX } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SparkleIcon, MenuIcon, XIcon } from '@/components/icons'

interface NavLink {
  label: string
  href: string
}

const NAV_LINKS: NavLink[] = [
  { label: 'Programs', href: '/#programs' },
  { label: 'Journey', href: '/#journey' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Dedication', href: '/dedications' },
]

const MARQUEE_TEXT = 'ॐ नमः शिवाय'
const MARQUEE_REPEAT = 12

function MarqueeStrip(): JSX.Element {
  const items = Array.from({ length: MARQUEE_REPEAT })

  return (
    <div className='w-full overflow-hidden py-1.5 bg-gradient-to-r from-burgundy-700 via-rose-500 to-burgundy-700'>
      <div className='flex w-max whitespace-nowrap animate-[marquee_22s_linear_infinite]'>
        {[0, 1].map((half) => (
          <div key={half} className='flex shrink-0'>
            {items.map((_, i) => (
              <span
                key={`${half}-${i}`}
                className='mx-5 text-[10px] font-semibold tracking-[0.28em] text-rose-100'
              >
                {MARQUEE_TEXT}
                <span className='mx-4 text-gold-400 opacity-70'>✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Navbar(): JSX.Element {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)
  const [scrolled, setScrolled] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', open)
    return () => document.body.classList.remove('overflow-hidden')
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActiveLink = (href: string): boolean =>
    href.startsWith('/') && !href.includes('#') && pathname === href

  return (
    <>
      <header className='sticky top-0 inset-x-0 z-50'>
        <MarqueeStrip />

        <nav
          className={`w-full border-b transition-all duration-300 ${
            scrolled
              ? 'bg-[var(--bg-base)]/97 border-rose-100 shadow-[var(--shadow-card)] backdrop-blur-xl py-2.5'
              : 'bg-[var(--bg-base)]/80 border-transparent backdrop-blur-md py-4'
          }`}
        >
          <div className='max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-4'>
            {/* ── Logo ── */}
            <Link
              href='/'
              className='flex items-center gap-2.5 group shrink-0 outline-none
                         focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 rounded'
            >
              <span
                className='relative flex h-8 w-8 items-center justify-center rounded-full
                           bg-rose-50 border border-rose-100
                           group-hover:border-gold-400 group-hover:bg-rose-100
                           transition-all duration-300'
              >
                {/* Pulse ring */}
                <span
                  className='absolute inset-0 rounded-full border border-gold-300
                             opacity-0 group-hover:opacity-100
                             animate-[pulseRing_1.8s_ease-out_infinite]'
                />
                <span
                  className='text-rose-500 group-hover:text-gold-500
                             transition-colors duration-300
                             animate-[spin_10s_linear_infinite]'
                >
                  <SparkleIcon size={14} />
                </span>
              </span>

              <span
                className='font-serif text-base text-[var(--ink-900)] hidden sm:block
                           group-hover:text-[var(--burgundy-600)] transition-colors duration-200'
              >
                Soul Awakening
              </span>
            </Link>

            {/* ── Desktop pill nav ── */}
            <div
              className='hidden md:flex items-center gap-0.5 rounded-full px-1.5 py-1
                         bg-rose-50/70 border border-rose-100'
            >
              {NAV_LINKS.map(({ label, href }) => {
                const active = isActiveLink(href)
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`relative px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider
                                rounded-full transition-all duration-200 outline-none
                                focus-visible:ring-2 focus-visible:ring-gold-400
                                ${
                                  active
                                    ? 'text-white bg-[var(--burgundy-700)]'
                                    : 'text-[var(--ink-500)] hover:text-[var(--ink-900)] hover:bg-white/60'
                                }`}
                  >
                    {label}
                  </Link>
                )
              })}
            </div>

            {/* ── Desktop CTA ── */}
            <div className='hidden md:block shrink-0'>
              <Link
                href='/login'
                className='btn btn-primary btn-sm inline-flex
                           hover:shadow-[0_4px_16px_rgba(201,168,76,0.3)]
                           hover:-translate-y-px hover:scale-[1.04]
                           active:scale-[0.97]
                           transition-all duration-200'
              >
                Student Login
              </Link>
            </div>

            {/* ── Mobile toggle ── */}
            <button
              type='button'
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className='md:hidden flex h-9 w-9 items-center justify-center rounded
                         text-[var(--ink-900)] hover:bg-rose-50 active:bg-rose-100
                         transition-colors duration-150 shrink-0
                         focus-visible:ring-2 focus-visible:ring-gold-400 outline-none'
            >
              {open ? <XIcon size={19} /> : <MenuIcon size={19} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            className='fixed inset-0 z-40 md:hidden
                       bg-[var(--burgundy-900)]/50 backdrop-blur-sm
                       animate-[fadeIn_0.2s_ease_both]'
          />

          {/* Drawer panel */}
          <div
            className='fixed top-0 right-0 bottom-0 z-50 w-[80%] max-w-xs
                       md:hidden flex flex-col bg-[var(--bg-base)]
                       border-l border-rose-100 shadow-2xl
                       animate-[slideInRight_0.28s_cubic-bezier(0.4,0,0.2,1)_both]'
          >
            {/* Drawer header */}
            <div className='flex items-center justify-between px-5 py-4 border-b border-rose-100'>
              <div className='flex items-center gap-2'>
                <span className='w-2 h-2 rounded-full bg-gold-400' />
                <span className='font-serif text-sm text-[var(--ink-900)]'>
                  Menu
                </span>
              </div>
              <button
                type='button'
                onClick={() => setOpen(false)}
                className='h-8 w-8 flex items-center justify-center rounded
                           text-[var(--ink-400)] hover:bg-rose-50 active:bg-rose-100
                           transition-colors duration-150
                           focus-visible:ring-2 focus-visible:ring-gold-400 outline-none
                           active:scale-90'
              >
                <XIcon size={17} />
              </button>
            </div>

            {/* Drawer links */}
            <nav className='flex-1 px-3 py-5 space-y-1 overflow-y-auto'>
              {NAV_LINKS.map(({ label, href }, i) => {
                const active = isActiveLink(href)
                return (
                  <Link
                    key={label}
                    href={href}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl
                                text-sm font-semibold transition-all duration-150
                                focus-visible:ring-2 focus-visible:ring-gold-400 outline-none
                                opacity-0 animate-[fadeSlideLeft_0.25s_ease_both]
                                ${
                                  active
                                    ? 'bg-rose-100 text-[var(--rose-600)]'
                                    : 'text-[var(--ink-500)] hover:bg-rose-50 hover:text-[var(--ink-900)]'
                                }`}
                    style={{ animationDelay: `${0.04 + i * 0.05}s` }}
                  >
                    <span>{label}</span>
                    <span
                      className={`text-xs transition-transform duration-200 ${active ? 'text-rose-400 translate-x-1' : 'text-[var(--ink-300)]'}`}
                    >
                      →
                    </span>
                  </Link>
                )
              })}
            </nav>

            {/* Drawer footer */}
            <div className='px-5 py-5 border-t border-rose-100 space-y-2.5'>
              <Link
                href='/login'
                className='btn btn-primary w-full justify-center inline-flex active:scale-[0.97] transition-transform duration-150'
              >
                Student Login
              </Link>
              <div className='divider-gold' />
              <p className='text-[10px] text-center italic text-[var(--ink-300)] font-serif leading-relaxed'>
                Healing should feel supported, safe, compassionate.
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
