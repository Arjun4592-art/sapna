'use client'

import { CheckIcon } from '@/components/icons'
import { Divider, SectionHeading } from '@/components/website/Shared'

const HELP_AREAS: string[] = [
  'Relationships and marriage',
  'Repeated heartbreaks',
  'Attracting emotionally unavailable partners',
  'Fear of abandonment',
  'Emotional heaviness',
  'Self-doubt and low confidence',
  'Financial struggles',
  'Fear of success',
  'Difficulty conceiving or relationship challenges around children',
  'Family conflicts',
  'Lack of peace',
  'Anxiety and emotional overwhelm',
  'People pleasing',
  'Fear-based living',
  'Purpose confusion',
  'Repeated failures despite hard work',
]

export default function AboutWhoSheHelps(): React.JSX.Element {
  return (
    <section className='section'>
      <Divider />
      <div className='mt-10 mb-10'>
        <SectionHeading
          eyebrow='Who she helps'
          title={
            <>
              Clarity for recurring patterns in{' '}
              <span className='italic text-rose-400'>every area of life</span>
            </>
          }
          description='Through Akashic Record Readings, Sapna helps clients gain deeper clarity and awareness about recurring patterns related to:'
        />
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-5xl mx-auto stagger-children'>
        {HELP_AREAS.map((item) => (
          <div
            key={item}
            className='flex items-start gap-3 p-4 bg-bg-surface border border-rose-100 rounded-xl hover:border-rose-300 hover:shadow-soft hover:-translate-y-0.5 transition-all duration-200 cursor-default'
          >
            <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-400 mt-0.5'>
              <CheckIcon size={12} />
            </span>
            <p className='text-sm text-ink-500 leading-relaxed'>{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
