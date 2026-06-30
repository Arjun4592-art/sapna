import Link from 'next/link'
import { adminDb } from '@/lib/firebase-admin'

interface Program {
  id: string
  slug: string
  title: string
  subtitle: string
  description: string
  weeks: number
  price: number
  originalPrice: number
  includes: string[]
}

function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

async function getPrograms(): Promise<Program[]> {
  const snapshot = await adminDb.collection('programs').orderBy('weeks').get()
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Program)
}

export const metadata = {
  title: 'Our Programs',
  description:
    'Explore our transformation programs — Akashic Record Reading and Relationship Coaching.',
}

export default async function CoursesPage() {
  const programs = await getPrograms()

  return (
    <>
      <style>{`
        .program-card {
          border: 1px solid var(--pink-100);
          background: var(--bg-surface);
          box-shadow: var(--shadow-card);
          transition: all 0.2s cubic-bezier(0.4,0,0.2,1);
        }
        .program-card:hover {
          border-color: var(--pink-200);
          box-shadow: var(--shadow-soft);
          transform: translateY(-6px);
        }
        .program-card:hover .card-arrow {
          transform: translateX(4px);
        }
        .card-arrow {
          transition: transform 0.15s ease;
        }
      `}</style>

      <main
        className='max-w-5xl mx-auto px-4 py-16 sm:py-20'
        style={{ background: 'var(--bg-base)' }}
      >
        {/* ── Header ── */}
        <div className='text-center mb-12'>
          <span
            className='text-xs font-semibold uppercase tracking-widest'
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--pink-400)' }}
          >
            Choose Your Path
          </span>
          <h1
            className='text-3xl sm:text-4xl mt-3 mb-4'
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink-900)' }}
          >
            Our Programs
          </h1>
          <p
            className='max-w-xl mx-auto text-sm'
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-400)' }}
          >
            Each program is a world of its own — explore before you enroll.
          </p>
        </div>

        {/* ── Program cards ── */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7'>
          {programs.map((program) => (
            <Link
              key={program.id}
              href={`/courses/${program.slug}`}
              className='program-card group block rounded-2xl p-7 sm:p-8'
            >
              <span
                className='text-xs font-semibold uppercase tracking-widest'
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--pink-400)',
                }}
              >
                {program.subtitle}
              </span>
              <h2
                className='text-2xl mt-2 mb-3'
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--ink-900)',
                }}
              >
                {program.title}
              </h2>
              <p
                className='text-sm leading-relaxed mb-6'
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--ink-500)',
                }}
              >
                {program.description}
              </p>
              <div className='flex items-center justify-between'>
                <div className='flex items-baseline gap-2'>
                  <span
                    className='text-xl font-bold'
                    style={{
                      fontFamily: 'var(--font-serif)',
                      color: 'var(--magenta-600)',
                    }}
                  >
                    {formatPrice(program.price)}
                  </span>
                  <span
                    className='text-sm line-through'
                    style={{ color: 'var(--ink-300)' }}
                  >
                    {formatPrice(program.originalPrice)}
                  </span>
                </div>
                <span
                  className='card-arrow text-xs font-semibold'
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--pink-400)',
                  }}
                >
                  View details →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* ── Empty state ── */}
        {programs.length === 0 && (
          <p
            className='text-center text-sm'
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-400)' }}
          >
            Programs jald hi yahan dikhenge.
          </p>
        )}
      </main>
    </>
  )
}
