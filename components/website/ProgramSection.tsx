'use client'

import Link from 'next/link'
import type { JSX, ReactNode } from 'react'
import { Divider, SectionHeading } from '@/components/website/Shared'
import ProgramCard from '@/components/website/ProgramCard'

interface CourseCardProps {
  href: string
  background: string
  badge: string
  badgeClass: string
  title: string
  titleClass: string
  price: string
  priceClass: string
  originalPrice: string
  children: ReactNode
  slideDir?: 'left' | 'right'
}

function CourseCard({
  href,
  background,
  badge,
  badgeClass,
  title,
  titleClass,
  price,
  priceClass,
  originalPrice,
  children,
  slideDir = 'left',
}: CourseCardProps): JSX.Element {
  return (
    <div
      className={`animate-[fadeUp_0.55s_ease_both] opacity-0
        ${slideDir === 'left' ? '' : '[animation-delay:0.12s]'}`}
    >
      <Link href={href}>
        <div
          className={`group relative overflow-hidden rounded-2xl cursor-pointer
                      min-h-[260px] sm:min-h-[290px] flex flex-col justify-end p-6 sm:p-7
                      hover:-translate-y-1.5 hover:scale-[0.985]
                      transition-all duration-250 ease-[cubic-bezier(0.4,0,0.2,1)]
                      ${background}`}
        >
          {children}
          <div className='relative z-10'>
            <span
              className={`text-[10px] font-semibold uppercase tracking-[0.22em] mb-1.5 block ${badgeClass}`}
            >
              {badge}
            </span>
            <h3
              className={`font-serif italic text-xl leading-tight mb-2.5 ${titleClass}`}
            >
              {title}
            </h3>
            <div className='flex items-center justify-between'>
              <div className='flex items-baseline gap-2'>
                <span className={`font-serif text-xl font-bold ${priceClass}`}>
                  {price}
                </span>
                <span className='text-sm line-through text-white/35'>
                  {originalPrice}
                </span>
              </div>
              <span
                className={`text-xs font-semibold animate-[float_1.6s_ease-in-out_infinite] ${badgeClass}`}
              >
                Explore →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default function ProgramsSection(): JSX.Element {
  return (
    <section id='programs' className='section'>
      <Divider />

      <div className='mt-10 mb-11'>
        <SectionHeading
          eyebrow='Choose Your Path'
          title={
            <>
              Two journeys.{' '}
              <span className='italic text-rose-400'>One destination.</span>
            </>
          }
          description='Each program is a world of its own — explore before you enroll.'
        />
      </div>

      {/* Visual cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-10'>
        <CourseCard
          href='/courses/akashic-reading'
          background='bg-[radial-gradient(ellipse_at_60%_20%,#3B1F6E_0%,#0D0521_50%,#000308_100%)]'
          badge='Akashic Record Reading'
          badgeClass='text-purple-300'
          title='Soul Blueprint Intensive'
          titleClass='text-white'
          price='₹5,999'
          priceClass='text-white'
          originalPrice='₹25,000'
          slideDir='left'
        >
          {/* Planet */}
          <div
            className='absolute top-5 right-5 sm:top-7 sm:right-7 w-14 h-14 sm:w-18 sm:h-18
                          rounded-full opacity-80 group-hover:scale-110 transition-transform duration-500
                          bg-[radial-gradient(circle_at_35%_35%,#9B6FD4,#4A1A8C,#1A0A3E)]
                          shadow-[0_0_26px_rgba(155,111,212,0.45)]'
          />
          {/* Nebula */}
          <div
            className='absolute inset-0 opacity-20
                          bg-[radial-gradient(ellipse_at_20%_50%,rgba(138,43,226,0.4)_0%,transparent_60%)]'
          />
          {/* Stars */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className='absolute rounded-full bg-white animate-[pulseRing_3s_ease-in-out_infinite]'
              style={{
                width: '1.5px',
                height: '1.5px',
                top: `${10 + ((i * 37) % 80)}%`,
                left: `${5 + ((i * 53) % 90)}%`,
                opacity: 0.3 + (i % 5) * 0.1,
                animationDelay: `${i * 0.15}s`,
              }}
            />
          ))}
        </CourseCard>

        <CourseCard
          href='/courses/relationship-coaching'
          background='bg-gradient-to-br from-[#F5E6D3] via-[#E8D5F0] to-[#D3E8F5]'
          badge='Relationship Coaching'
          badgeClass='text-[#8A4A6E]'
          title='Soul Awakening: Empowered You'
          titleClass='text-[#2D1A35]'
          price='₹51,000'
          priceClass='text-[#2D1A35]'
          originalPrice='₹56,100'
          slideDir='right'
        >
          {/* Blobs */}
          <div
            className='absolute top-5 left-5 w-20 h-20 rounded-full opacity-40 blur-xl
                         animate-[orbFloat_5s_ease-in-out_infinite]
                         bg-[radial-gradient(circle,#E8A0B4,#C45C8A)]'
          />
          <div
            className='absolute top-7 right-5 w-14 h-14 rounded-full opacity-35 blur-lg
                         animate-[orbFloat_4s_ease-in-out_1s_infinite]
                         bg-[radial-gradient(circle,#A0C4E8,#5C8AC4)]'
          />
          {/* Arch */}
          <div
            className='absolute top-0 left-1/2 -translate-x-1/2 w-28 h-12 opacity-10
                          rounded-t-[56px] border-2 border-[#C45C8A] border-b-0'
          />
        </CourseCard>
      </div>

      {/* Detail cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 max-w-4xl mx-auto'>
        <ProgramCard
          index={0}
          programId='4-week'
          courseHref='/courses/akashic-reading'
          badge='Breakthrough Journey'
          title='Soul Blueprint Intensive'
          subtitle='4-Week 1:1 Program'
          description='A concentrated deep-dive combining Akashic Record Reading with tactical coaching.'
          price='₹5,999'
          originalPrice='₹25,000'
          includes={[
            '4 Live 1:1 Deep-Dive Sessions',
            'Akashic Record Reading',
            'Tailored Worksheets & Exercises',
            'WhatsApp Support',
            'Guided Healing Audios',
            'Forgiveness Prayers',
          ]}
        />
        <ProgramCard
          index={1}
          programId='8-week'
          courseHref='/courses/relationship-coaching'
          badge='Complete Transformation'
          title='Soul Awakening: Empowered You'
          subtitle='8-Week 1:1 Journey'
          description='The full system — from responsibility to visualization to sustained action.'
          price='₹51,000'
          originalPrice='₹56,100'
          includes={[
            '8 One-on-One Coaching Sessions',
            '1 Akashic Record Reading',
            'Free Clarity Call',
            'Gratitude + Affirmation Journals',
            'Emotional & Pattern Deep Work',
            'WhatsApp Support throughout',
          ]}
          featured
        />
      </div>
    </section>
  )
}
