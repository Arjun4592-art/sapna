'use client'

import Link from 'next/link'
import type { ComponentType } from 'react'
import {
  SparkleIcon,
  MailIcon,
  PhoneIcon,
  BookIcon,
  ChevronRightIcon,
  CheckIcon,
} from '@/components/icons'
import { SectionLabel } from '@/components/website/Shared'

interface ContactMethod {
  icon: ComponentType<{ size?: number; className?: string }>
  label: string
  value: string
  href: string
}

const CONTACT_METHODS: ContactMethod[] = [
  {
    icon: MailIcon,
    label: 'Email',
    value: 'soulawakeningwithsapna@gmail.com',
    href: 'mailto:soulawakeningwithsapna@gmail.com',
  },
  {
    icon: PhoneIcon,
    label: 'WhatsApp',
    value: 'Message on WhatsApp',
    href: 'https://wa.me/919999999999',
  },
]

const EXPECTATIONS: string[] = [
  'Sapna reads every message personally',
  'Response within 24–48 hours',
  'Auto-confirmation sent to your email',
  'Safe, non-judgmental space — always',
]

interface ProgramLink {
  title: string
  subtitle: string
  href: string
}

const PROGRAM_LINKS: ProgramLink[] = [
  {
    title: 'Soul Blueprint Intensive',
    subtitle: '4-Week · ₹5,999',
    href: '/#programs',
  },
  {
    title: 'Soul Awakening: Empowered You',
    subtitle: '8-Week · ₹51,000',
    href: '/#programs',
  },
]

export default function ContactInfo(): React.JSX.Element {
  return (
    <div className='space-y-8 animate-[slideInLeft_0.6s_cubic-bezier(0.4,0,0.2,1)_forwards]'>
      {/* Header */}
      <div>
        <SectionLabel>Get in touch</SectionLabel>
        <h1 className='font-serif text-ink-900 text-3xl sm:text-4xl leading-[1.15] mb-4'>
          Begin the <span className='italic text-rose-400'>conversation</span>
        </h1>
        <p className='text-sm text-ink-500 leading-relaxed font-light'>
          Have a question about the programs, want to know if this is the right
          fit for you, or simply ready to take the first step? Reach out — Sapna
          reads every message personally.
        </p>
      </div>

      {/* Contact methods */}
      <div className='space-y-3 stagger-children'>
        {CONTACT_METHODS.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center gap-4 p-4 bg-bg-surface border border-rose-100 rounded-xl hover:border-rose-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 group'
          >
            <div className='w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0 text-rose-400 group-hover:bg-rose-100 transition-colors duration-200'>
              <Icon size={18} />
            </div>
            <div>
              <p className='text-[10px] font-semibold uppercase tracking-wider text-ink-400'>
                {label}
              </p>
              <p className='text-sm font-medium text-ink-900'>{value}</p>
            </div>
            <span className='ml-auto text-ink-300 group-hover:text-rose-400 transition-all duration-200 group-hover:translate-x-1'>
              <ChevronRightIcon size={15} />
            </span>
          </a>
        ))}
      </div>

      {/* What to expect */}
      <div className='p-5 bg-ink-900 rounded-xl relative overflow-hidden animate-[fadeUp_0.5s_ease_forwards]'>
        <div
          className='pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-rose-400 opacity-15 blur-[50px]'
          aria-hidden='true'
        />
        <div className='relative z-10 flex items-center gap-2 mb-3'>
          <span className='text-rose-300 animate-[float_5s_ease-in-out_infinite]'>
            <SparkleIcon size={14} />
          </span>
          <p className='text-xs font-semibold uppercase tracking-wider text-rose-300'>
            What to expect
          </p>
        </div>
        <div className='relative z-10 space-y-2.5'>
          {EXPECTATIONS.map((item) => (
            <div key={item} className='flex items-center gap-2.5'>
              <CheckIcon size={13} className='text-rose-300 flex-shrink-0' />
              <p className='text-xs text-white/50'>{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Program quick links */}
      <div className='space-y-3'>
        <p className='text-xs font-semibold uppercase tracking-widest text-ink-400'>
          Explore programs
        </p>
        {PROGRAM_LINKS.map(({ title, subtitle, href }, i) => (
          <Link key={title} href={href}>
            <div
              style={{ animationDelay: `${i * 0.08}s` }}
              className='flex items-center gap-3 p-3.5 bg-bg-surface border border-rose-100 rounded-xl hover:border-rose-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 mb-3 group animate-[fadeUp_0.4s_ease_forwards] opacity-0'
            >
              <div className='w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0 text-rose-400'>
                <BookIcon size={14} />
              </div>
              <div className='flex-1'>
                <p className='text-sm font-medium text-ink-900'>{title}</p>
                <p className='text-xs text-ink-400'>{subtitle}</p>
              </div>
              <ChevronRightIcon
                size={14}
                className='text-ink-300 group-hover:text-rose-400 group-hover:translate-x-1 transition-all duration-200'
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
