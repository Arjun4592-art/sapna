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
} from '@/components/icons'

interface IconProps {
  size?: number
  className?: string
  strokeWidth?: number
}

export function LinkIcon({
  size = 20,
  className = '',
  strokeWidth = 1.5,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={strokeWidth}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
      <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
    </svg>
  )
}

interface SessionFormProps {
  initial?: any
  sessionId?: string
}

const PROGRAMS = [
  { id: '4-week', label: 'Soul Blueprint Intensive (4-Week)' },
  { id: '8-week', label: 'Soul Awakening: Empowered You (8-Week)' },
]

const STATUS_OPTIONS = ['scheduled', 'completed', 'cancelled']

const fieldIconClass =
  'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300'

const inputBase =
  'w-full pl-10 pr-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm font-sans placeholder:text-ink-300 outline-none transition-all duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)]'

export default function SessionForm({ initial, sessionId }: SessionFormProps) {
  const router = useRouter()
  const isEdit = !!sessionId

  const [form, setForm] = useState({
    title: initial?.title || '',
    programId: initial?.programId || '4-week',
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
        className='flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-900 transition-colors duration-150'
      >
        <ArrowLeftIcon size={15} />
        Back to sessions
      </button>

      <div className='card space-y-5'>
        {/* Title */}
        <div>
          <label className='input-label'>Session title *</label>
          <div className='relative'>
            <div className={fieldIconClass}>
              <CalendarIcon size={16} />
            </div>
            <input
              name='title'
              className={inputBase}
              value={form.title}
              onChange={handleChange}
              placeholder='e.g. Week 1 — Responsibility Deep Dive'
              required
            />
          </div>
        </div>

        {/* Program + Week */}
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <label className='input-label'>Program *</label>
            <div className='relative'>
              <div className={fieldIconClass}>
                <BookIcon size={16} />
              </div>
              <select
                name='programId'
                className={`${inputBase} cursor-pointer`}
                value={form.programId}
                onChange={handleChange}
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
              className='w-full px-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm outline-none transition-all duration-200 focus:border-gold-400 cursor-pointer'
              value={form.weekNum}
              onChange={handleChange}
            >
              {Array.from(
                { length: form.programId === '8-week' ? 8 : 4 },
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
              className='w-full px-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm outline-none transition-all duration-200 focus:border-gold-400 cursor-pointer'
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className='input-label'>Status</label>
            <select
              name='status'
              className='w-full px-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm outline-none transition-all duration-200 focus:border-gold-400 cursor-pointer'
              value={form.status}
              onChange={handleChange}
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
            <div className={fieldIconClass}>
              <UserIcon size={16} />
            </div>
            <input
              name='userId'
              className={inputBase}
              value={form.userId}
              onChange={handleChange}
              placeholder='Firebase user UID (optional for group sessions)'
            />
          </div>
          <p className='text-[11px] text-ink-300 mt-1'>
            Leave blank for group/open sessions
          </p>
        </div>

        {/* Zoom link */}
        <div>
          <label className='input-label'>Zoom / Meet link</label>
          <div className='relative'>
            <div className={fieldIconClass}>
              <LinkIcon size={16} />
            </div>
            <input
              name='zoomLink'
              className={inputBase}
              value={form.zoomLink}
              onChange={handleChange}
              placeholder='https://zoom.us/j/...'
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className='input-label'>Notes (internal)</label>
          <textarea
            name='notes'
            className='w-full px-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm font-sans placeholder:text-ink-300 outline-none transition-all duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)] min-h-[100px] resize-none'
            value={form.notes}
            onChange={handleChange}
            placeholder='Any notes about this session…'
          />
        </div>
      </div>

      {/* Submit */}
      <div className='flex items-center gap-3'>
        <button
          type='submit'
          disabled={loading}
          className='btn btn-primary flex items-center gap-2 disabled:opacity-40'
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
          className='btn btn-ghost'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
