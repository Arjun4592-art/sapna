'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { db } from '@/lib/firebase/config'
import toast from 'react-hot-toast'
import {
  CalendarIcon,
  UserIcon,
  BookIcon,
  CheckIcon,
  ArrowLeftIcon,
  LinkIcon,
} from '@/components/icons'

interface SessionFormProps {
  initial?: any
  sessionId?: string
}

// Updated to match Firestore IDs
const PROGRAMS = [
  { id: 'akashic', label: 'Akashic Record Reading Program' },
  { id: 'relationship', label: 'Life & Relationship Coaching Program' },
]

const STATUS_OPTIONS = ['scheduled', 'completed', 'cancelled']

const inputStyle = {
  border: '1px solid var(--ink-100)',
  background: 'var(--bg-surface)',
  color: 'var(--ink-900)',
  fontFamily: 'var(--font-sans)',
}

const inputBase =
  'w-full pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder:text-[var(--ink-300)] outline-none transition-all duration-200'

const inputBasePlain =
  'w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 cursor-pointer'

function focusInput(
  e: React.FocusEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
) {
  e.currentTarget.style.borderColor = 'var(--pink-300)'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196, 56, 138, 0.12)'
}
function blurInput(
  e: React.FocusEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
) {
  e.currentTarget.style.borderColor = 'var(--ink-100)'
  e.currentTarget.style.boxShadow = 'none'
}

export default function SessionForm({ initial, sessionId }: SessionFormProps) {
  const router = useRouter()
  const isEdit = !!sessionId

  const [form, setForm] = useState({
    title: initial?.title || '',
    programId: initial?.programId || 'akashic',
    weekNum: initial?.weekNum || 1,
    userId: initial?.userId || '',
    date: initial?.date?.toDate
      ? initial.date.toDate().toISOString().slice(0, 16)
      : '',
    zoomLink: initial?.zoomLink || '',
    status: initial?.status || 'scheduled',
    notes: initial?.notes || '',
  })

  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    if (!form.title || !form.date) {
      toast.error('Title and date are required')
      return
    }
    setLoading(true)
    try {
      const payload = {
        title: form.title.trim(),
        programId: form.programId,
        weekNum: Number(form.weekNum),
        userId: form.userId.trim(),
        date: Timestamp.fromDate(new Date(form.date)),
        zoomLink: form.zoomLink.trim(),
        status: form.status,
        notes: form.notes.trim(),
        updatedAt: serverTimestamp(),
      }

      if (isEdit) {
        await updateDoc(doc(db, 'sessions', sessionId), payload)
        toast.success('Session updated')
      } else {
        await addDoc(collection(db, 'sessions'), {
          ...payload,
          createdAt: serverTimestamp(),
        })
        toast.success('Session created')
      }
      router.push('/admin/sessions')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-2xl'>
      {/* Back */}
      <button
        type='button'
        onClick={() => router.back()}
        className='flex items-center gap-1.5 text-sm transition-colors duration-150'
        style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-400)' }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.color = 'var(--ink-900)')
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.color = 'var(--ink-400)')
        }
      >
        <ArrowLeftIcon size={15} />
        Back to sessions
      </button>

      {/* Card */}
      <div
        className='rounded-2xl p-6 space-y-5'
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--ink-100)',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {/* Title */}
        <div>
          <label className='input-label'>Session title *</label>
          <div className='relative'>
            <div
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2'
              style={{ color: 'var(--ink-300)' }}
            >
              <CalendarIcon size={16} />
            </div>
            <input
              name='title'
              className={inputBase}
              style={inputStyle}
              value={form.title}
              onChange={handleChange}
              placeholder='e.g. Week 1 — Responsibility Deep Dive'
              required
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
        </div>

        {/* Program + Week */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='input-label'>Program *</label>
            <div className='relative'>
              <div
                className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2'
                style={{ color: 'var(--ink-300)' }}
              >
                <BookIcon size={16} />
              </div>
              <select
                name='programId'
                className={`${inputBase} cursor-pointer`}
                style={inputStyle}
                value={form.programId}
                onChange={handleChange}
                onFocus={focusInput}
                onBlur={blurInput}
              >
                {PROGRAMS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className='input-label'>Week number *</label>
            <select
              name='weekNum'
              className={inputBasePlain}
              style={inputStyle}
              value={form.weekNum}
              onChange={handleChange}
              onFocus={focusInput}
              onBlur={blurInput}
            >
              {Array.from(
                { length: form.programId === 'relationship' ? 8 : 4 },
                (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    Week {i + 1}
                  </option>
                ),
              )}
            </select>
          </div>
        </div>

        {/* Date + Status */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='input-label'>Date & time *</label>
            <input
              name='date'
              type='datetime-local'
              className={inputBasePlain}
              style={inputStyle}
              value={form.date}
              onChange={handleChange}
              required
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
          <div>
            <label className='input-label'>Status</label>
            <select
              name='status'
              className={inputBasePlain}
              style={inputStyle}
              value={form.status}
              onChange={handleChange}
              onFocus={focusInput}
              onBlur={blurInput}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Student UID */}
        <div>
          <label className='input-label'>Student UID</label>
          <div className='relative'>
            <div
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2'
              style={{ color: 'var(--ink-300)' }}
            >
              <UserIcon size={16} />
            </div>
            <input
              name='userId'
              className={inputBase}
              style={inputStyle}
              value={form.userId}
              onChange={handleChange}
              placeholder='Firebase user UID (optional for group sessions)'
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
          <p
            className='text-[11px] mt-1'
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-300)' }}
          >
            Leave blank for group/open sessions
          </p>
        </div>

        {/* Zoom link */}
        <div>
          <label className='input-label'>Zoom / Meet link</label>
          <div className='relative'>
            <div
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2'
              style={{ color: 'var(--ink-300)' }}
            >
              <LinkIcon size={16} />
            </div>
            <input
              name='zoomLink'
              className={inputBase}
              style={inputStyle}
              value={form.zoomLink}
              onChange={handleChange}
              placeholder='https://zoom.us/j/...'
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className='input-label'>Notes (internal)</label>
          <textarea
            name='notes'
            className='w-full px-4 py-2.5 rounded-xl text-sm placeholder:text-[var(--ink-300)] outline-none transition-all duration-200 min-h-[100px] resize-none'
            style={inputStyle}
            value={form.notes}
            onChange={handleChange}
            placeholder='Any notes about this session…'
            onFocus={focusInput}
            onBlur={blurInput}
          />
        </div>
      </div>

      {/* Submit */}
      <div className='flex items-center gap-3'>
        <button
          type='submit'
          disabled={loading}
          className='btn inline-flex items-center gap-2 disabled:opacity-40
                     transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02]
                     active:scale-[0.97]'
          style={{
            fontFamily: 'var(--font-sans)',
            background: 'var(--magenta-700)',
            color: '#ffffff',
            borderRadius: '99px',
            padding: '10px 20px',
            boxShadow: 'var(--shadow-card)',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              const el = e.currentTarget as HTMLElement
              el.style.background = 'var(--magenta-600)'
              el.style.boxShadow = 'var(--shadow-soft)'
            }
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--magenta-700)'
            el.style.boxShadow = 'var(--shadow-card)'
          }}
        >
          {loading ? (
            <>
              <svg
                className='animate-spin'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                aria-hidden='true'
              >
                <path d='M21 12a9 9 0 1 1-6.219-8.56' />
              </svg>
              Saving…
            </>
          ) : (
            <>
              <CheckIcon size={15} />
              {isEdit ? 'Update Session' : 'Create Session'}
            </>
          )}
        </button>

        <button
          type='button'
          onClick={() => router.back()}
          className='btn inline-flex transition-all duration-200
                     hover:-translate-y-0.5 active:scale-[0.97]'
          style={{
            fontFamily: 'var(--font-sans)',
            background: 'transparent',
            color: 'var(--ink-500)',
            borderRadius: '99px',
            padding: '10px 20px',
            border: '1px solid var(--ink-100)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--bg-muted)'
            el.style.borderColor = 'var(--pink-200)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            el.style.borderColor = 'var(--ink-100)'
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
