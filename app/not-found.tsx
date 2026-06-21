import Link from 'next/link'
import { SparkleIcon, ArrowLeftIcon } from '@/components/icons'

export default function NotFound() {
  return (
    <div
      className='min-h-screen bg-[#FDFAF5] flex items-center
                    justify-center px-6'
    >
      <div className='text-center max-w-md'>
        {/* Icon */}
        <div
          className='w-20 h-20 rounded-full bg-[#F9E4DC]
                        flex items-center justify-center mx-auto mb-8'
        >
          <SparkleIcon size={32} className='text-[#C2847A]' />
        </div>

        {/* 404 */}
        <p
          className='text-[80px] font-bold text-[#EDD9D4] leading-none mb-4'
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          404
        </p>

        <h1
          className='text-2xl text-[#1A1412] mb-3'
          style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}
        >
          This page doesn't exist
        </h1>

        <p className='text-sm text-[#9B8B85] leading-relaxed mb-8'>
          The page you're looking for may have been moved, deleted, or perhaps
          never existed. Let's get you back on your journey.
        </p>

        <div className='flex items-center justify-center gap-3'>
          <Link href='/'>
            <button className='btn-primary flex items-center gap-2'>
              <ArrowLeftIcon size={15} />
              Back to home
            </button>
          </Link>
          <Link href='/dashboard'>
            <button className='btn-ghost'>My dashboard</button>
          </Link>
        </div>

        {/* Decorative quote */}
        <p
          className='text-xs text-[#B8AE98] mt-12 italic'
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          "Not all who wander are lost — but this page is."
        </p>
      </div>
    </div>
  )
}
