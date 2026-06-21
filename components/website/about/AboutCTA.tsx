'use client'

import Link from 'next/link'
import { ChevronRightIcon } from '@/components/icons'
import { Divider } from '@/components/website/Shared'

export default function AboutCTA(): React.JSX.Element {
  return (
    <section className='section-sm text-center pb-20'>
      <Divider />

      <div className='mt-12 animate-[fadeUp_0.55s_ease_forwards]'>
        <h2 className='font-serif text-ink-900 text-2xl sm:text-3xl mb-4'>
          Ready to work with Sapna?
        </h2>
        <p className='text-sm text-ink-400 max-w-sm mx-auto mb-8 font-light leading-relaxed'>
          You don&apos;t have to figure everything out alone. Choose your
          program and begin your transformation journey today.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-3'>
          <Link href='/courses' className='w-full sm:w-auto'>
            <span className='btn btn-primary btn-lg w-full sm:w-auto inline-flex btn-magnetic shadow-[0_8px_24px_rgba(107,45,62,0.25)] hover:shadow-soft transition-shadow duration-200'>
              View Programs
              <ChevronRightIcon size={16} />
            </span>
          </Link>
          <Link href='/contact' className='w-full sm:w-auto'>
            <span className='btn btn-ghost btn-lg w-full sm:w-auto inline-flex hover:scale-[1.02] active:scale-[0.97] transition-transform duration-150'>
              Get in touch
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
