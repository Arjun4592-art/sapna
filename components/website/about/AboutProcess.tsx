'use client'

import { SectionHeading } from '@/components/website/Shared'

interface ProcessStep {
  step: string
  title: string
  desc: string
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Akashic Record Reading',
    desc: "We access your soul's records to uncover the root cause of your patterns — karmic contracts, past life wounds, energetic imbalances, subconscious fears, and limiting beliefs carried across lifetimes.",
  },
  {
    step: '02',
    title: 'Pattern Identification',
    desc: 'Together we map exactly where and why you keep getting stuck — in relationships, career, self-worth, abundance, or emotional wellbeing.',
  },
  {
    step: '03',
    title: 'Release & Clear',
    desc: 'Through guided meditations, forgiveness prayers, aroma oils, spiritual remedies, and energy healing, we release what no longer serves your highest good.',
  },
  {
    step: '04',
    title: 'Rewire & Rise',
    desc: 'We replace old patterns with a new identity using practical mindset work, affirmations, worksheets, reflection exercises, and clear daily action steps.',
  },
]

const TOOLS: string[] = [
  'Life Coaching',
  'Relationship Coaching',
  'Emotional Healing Techniques',
  'Guided Meditations',
  'Forgiveness Prayers',
  'Mindset Work',
  'Self-Awareness Practices',
  'Worksheets & Reflection Exercises',
  'Energy Healing Support',
  'Aroma Oils & Spiritual Remedies',
  'Practical Transformation Tools',
]

export default function AboutProcess(): React.JSX.Element {
  return (
    <section className='section bg-bg-surface rounded-2xl border border-rose-100 mx-4 sm:mx-6 lg:mx-auto max-w-5xl mt-16 mb-16 relative shadow-card overflow-hidden'>
      <div
        className='pointer-events-none absolute -top-20 -left-20 w-64 h-64 rounded-full bg-rose-100 opacity-50 blur-[70px]'
        aria-hidden='true'
      />

      <div className='relative z-10 mb-12'>
        <SectionHeading
          eyebrow='The Two-Step Process'
          title={
            <>
              Finding the root cause is{' '}
              <span className='italic text-rose-400'>only the first step</span>
            </>
          }
          description='Once we understand WHY a certain problem exists at the soul level, the next step is: how do we heal it and transform it in our everyday human life? That is where practical transformation work comes in, because most people struggle majorly in three core areas of life — Health, Wealth, and Relationships.'
        />
      </div>

      <div className='relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 stagger-children'>
        {PROCESS_STEPS.map(({ step, title, desc }) => (
          <div
            key={step}
            className='flex gap-4 p-5 bg-bg-muted border border-rose-100 rounded-xl hover:border-rose-200 hover:shadow-soft hover:-translate-y-1 transition-all duration-200 cursor-default'
          >
            <div className='w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0 font-serif text-sm font-bold text-rose-500'>
              {step}
            </div>
            <div>
              <p className='text-sm font-semibold text-ink-900 mb-1'>{title}</p>
              <p className='text-xs text-ink-400 leading-relaxed'>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='relative z-10 pt-8 border-t border-rose-100'>
        <p className='text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-rose-400 mb-4'>
          That is why I combine Akashic Record Readings with
        </p>
        <div className='flex flex-wrap gap-2 justify-center stagger-children'>
          {TOOLS.map((tool) => (
            <span
              key={tool}
              className='badge badge-rose text-[11px] cursor-default hover:scale-105 transition-transform duration-150'
            >
              {tool}
            </span>
          ))}
        </div>
        <p className='text-center text-sm text-ink-400 mt-6 font-light italic'>
          This combination helps clients not only understand their patterns but
          also actively work on changing them. Because awareness without action
          cannot create transformation.
        </p>
      </div>
    </section>
  )
}
