'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import type { JSX } from 'react'
import { db } from '@/lib/firebase/config'
import toast from 'react-hot-toast'
import {
  PlusIcon,
  TrashIcon,
  CheckIcon,
  ArrowLeftIcon,
} from '@/components/icons'
import type { Program, Module } from '@/types'

interface ProgramFormState {
  title: string
  subtitle: string
  description: string
  weeks: number
  price: string
  originalPrice: string
  includes: string[]
}

type ModuleFormState = Pick<
  Module,
  'weekNum' | 'title' | 'description' | 'locked'
>

interface ProgramFormProps {
  initial?: Partial<Program>
  programId?: string
}

function buildDefaultModules(
  weeks: number,
  existing?: Module[],
): ModuleFormState[] {
  return Array.from({ length: weeks }, (_, i) => ({
    weekNum: i + 1,
    title: existing?.[i]?.title ?? '',
    description: existing?.[i]?.description ?? '',
    locked: existing?.[i]?.locked ?? i > 0,
  }))
}

// ── Toggle ────────────────────────────────────────────────────────────────────
interface ToggleProps {
  checked: boolean
  onChange: () => void
  label: string
}

function Toggle({ checked, onChange, label }: ToggleProps): JSX.Element {
  return (
    <label className='flex items-center gap-2 cursor-pointer select-none'>
      <span
        className='text-xs'
        style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-400)' }}
      >
        {label}
      </span>
      <button
        type='button'
        role='switch'
        aria-checked={checked}
        onClick={onChange}
        className='w-9 h-5 rounded-full transition-colors duration-200 flex items-center px-0.5'
        style={{ background: checked ? 'var(--pink-400)' : 'var(--ink-100)' }}
      >
        <div
          className='w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200'
          style={{ transform: checked ? 'translateX(16px)' : 'translateX(0)' }}
        />
      </button>
    </label>
  )
}

// ── Spinner ───────────────────────────────────────────────────────────────────
function Spinner(): JSX.Element {
  return (
    <svg
      className='animate-spin'
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
    >
      <path d='M21 12a9 9 0 1 1-6.219-8.56' />
    </svg>
  )
}

// ── Input focus helpers ───────────────────────────────────────────────────────
function focusInput(
  e: React.FocusEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) {
  e.currentTarget.style.borderColor = 'var(--pink-300)'
  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196, 56, 138, 0.12)'
}
function blurInput(
  e: React.FocusEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
) {
  e.currentTarget.style.borderColor = 'var(--ink-100)'
  e.currentTarget.style.boxShadow = 'none'
}

const inputStyle = {
  border: '1px solid var(--ink-100)',
  background: 'var(--bg-surface)',
  color: 'var(--ink-900)',
  fontFamily: 'var(--font-sans)',
}

const cardStyle = {
  background: 'var(--bg-surface)',
  border: '1px solid var(--ink-100)',
  boxShadow: 'var(--shadow-card)',
  borderRadius: '16px',
  padding: '24px',
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ProgramForm({
  initial,
  programId,
}: ProgramFormProps): JSX.Element {
  const router = useRouter()
  const isEdit = !!programId

  const [form, setForm] = useState<ProgramFormState>({
    title: initial?.title ?? '',
    subtitle: initial?.subtitle ?? '',
    description: initial?.description ?? '',
    weeks: initial?.weeks ?? 4,
    price: initial?.price?.toString() ?? '',
    originalPrice: initial?.originalPrice?.toString() ?? '',
    includes: initial?.includes?.length ? initial.includes : [''],
  })

  const [modules, setModules] = useState<ModuleFormState[]>(
    buildDefaultModules(initial?.weeks ?? 4, initial?.modules),
  )
  const [loading, setLoading] = useState<boolean>(false)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void {
    const { name, value } = e.target
    if (name === 'weeks') {
      const w = Number(value)
      setForm((prev) => ({ ...prev, weeks: w }))
      setModules(buildDefaultModules(w, modules as Module[]))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  function handleIncludeChange(i: number, val: string): void {
    setForm((prev) => {
      const next = [...prev.includes]
      next[i] = val
      return { ...prev, includes: next }
    })
  }

  function addInclude(): void {
    setForm((prev) => ({ ...prev, includes: [...prev.includes, ''] }))
  }

  function removeInclude(i: number): void {
    setForm((prev) => ({
      ...prev,
      includes: prev.includes.filter((_, idx) => idx !== i),
    }))
  }

  function handleModuleChange(
    i: number,
    field: keyof ModuleFormState,
    value: string | boolean,
  ): void {
    setModules((prev) => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      return next
    })
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    if (!form.title.trim()) {
      toast.error('Program title is required')
      return
    }
    setLoading(true)
    try {
      // ID is now akashic or relationship based on weeks
      const id = programId ?? (form.weeks === 4 ? 'akashic' : 'relationship')
      const payload = {
        title: form.title.trim(),
        subtitle: form.subtitle.trim(),
        description: form.description.trim(),
        weeks: Number(form.weeks),
        price: Number(form.price),
        originalPrice: Number(form.originalPrice),
        includes: form.includes.filter((item) => item.trim()),
        modules,
        updatedAt: serverTimestamp(),
      }

      if (isEdit) {
        await updateDoc(doc(db, 'programs', id), payload)
        toast.success('Program updated')
      } else {
        await setDoc(doc(db, 'programs', id), {
          ...payload,
          createdAt: serverTimestamp(),
        })
        toast.success('Program created')
      }
      router.push('/admin/programs')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 max-w-2xl animate-fade-up'
    >
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
        Back to programs
      </button>

      {/* ── Basic Info ── */}
      <div style={cardStyle} className='space-y-5'>
        <h2
          className='text-base font-semibold'
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink-900)' }}
        >
          Basic Info
        </h2>

        {[
          {
            name: 'title',
            label: 'Program title *',
            placeholder: 'e.g. Soul Blueprint Intensive',
            required: true,
          },
          {
            name: 'subtitle',
            label: 'Subtitle',
            placeholder: 'e.g. 4-Week 1:1 Program',
            required: false,
          },
        ].map(({ name, label, placeholder, required }) => (
          <div key={name}>
            <label className='input-label'>{label}</label>
            <input
              name={name}
              className='input w-full'
              style={inputStyle}
              value={form[name as keyof ProgramFormState] as string}
              onChange={handleChange}
              placeholder={placeholder}
              required={required}
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
        ))}

        <div>
          <label className='input-label'>Description</label>
          <textarea
            name='description'
            className='input w-full min-h-[100px]'
            style={inputStyle}
            value={form.description}
            onChange={handleChange}
            placeholder='Describe what this program offers…'
            onFocus={focusInput}
            onBlur={blurInput}
          />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='input-label'>Duration (weeks)</label>
            <select
              name='weeks'
              className='input w-full cursor-pointer'
              style={inputStyle}
              value={form.weeks}
              onChange={handleChange}
              onFocus={focusInput}
              onBlur={blurInput}
            >
              <option value={4}>4 weeks</option>
              <option value={8}>8 weeks</option>
            </select>
          </div>
          <div>
            <label className='input-label'>Price (₹)</label>
            <input
              name='price'
              type='number'
              className='input w-full'
              style={inputStyle}
              value={form.price}
              onChange={handleChange}
              placeholder='5999'
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
          <div>
            <label className='input-label'>Original price (₹)</label>
            <input
              name='originalPrice'
              type='number'
              className='input w-full'
              style={inputStyle}
              value={form.originalPrice}
              onChange={handleChange}
              placeholder='25000'
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
        </div>
      </div>

      {/* ── What's Included ── */}
      <div style={cardStyle} className='space-y-4'>
        <div className='flex items-center justify-between'>
          <h2
            className='text-base font-semibold'
            style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink-900)' }}
          >
            What&apos;s Included
          </h2>
          <button
            type='button'
            onClick={addInclude}
            className='btn btn-soft btn-sm inline-flex items-center gap-1.5'
          >
            <PlusIcon size={13} />
            Add item
          </button>
        </div>
        <div className='space-y-2'>
          {form.includes.map((item, i) => (
            <div key={i} className='flex items-center gap-2'>
              <input
                className='input flex-1'
                style={inputStyle}
                value={item}
                onChange={(e) => handleIncludeChange(i, e.target.value)}
                placeholder={`Included item ${i + 1}`}
                onFocus={focusInput}
                onBlur={blurInput}
              />
              <button
                type='button'
                onClick={() => removeInclude(i)}
                className='w-9 h-9 flex items-center justify-center rounded-xl
                           transition-all duration-150 shrink-0'
                style={{
                  border: '1px solid var(--ink-100)',
                  color: 'var(--ink-300)',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = '#fca5a5'
                  el.style.color = '#ef4444'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--ink-100)'
                  el.style.color = 'var(--ink-300)'
                }}
              >
                <TrashIcon size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ── Weekly Modules ── */}
      <div style={cardStyle} className='space-y-4'>
        <h2
          className='text-base font-semibold'
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink-900)' }}
        >
          Weekly Modules
        </h2>
        <div className='space-y-4'>
          {modules.map((mod, i) => (
            <div
              key={mod.weekNum}
              className='rounded-xl p-4 space-y-3'
              style={{
                border: '1px solid var(--ink-100)',
                background: 'var(--pink-50)',
              }}
            >
              <div className='flex items-center justify-between'>
                <span
                  className='text-xs font-semibold uppercase tracking-wider'
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--pink-400)',
                  }}
                >
                  Week {mod.weekNum}
                </span>
                <Toggle
                  label='Locked'
                  checked={mod.locked}
                  onChange={() => handleModuleChange(i, 'locked', !mod.locked)}
                />
              </div>
              <input
                className='input w-full'
                style={inputStyle}
                value={mod.title}
                onChange={(e) => handleModuleChange(i, 'title', e.target.value)}
                placeholder={`Week ${mod.weekNum} title`}
                onFocus={focusInput}
                onBlur={blurInput}
              />
              <textarea
                className='input w-full min-h-[72px]'
                style={inputStyle}
                value={mod.description}
                onChange={(e) =>
                  handleModuleChange(i, 'description', e.target.value)
                }
                placeholder='What will students learn this week?'
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>
          ))}
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
              <Spinner /> Saving…
            </>
          ) : (
            <>
              <CheckIcon size={15} />{' '}
              {isEdit ? 'Update Program' : 'Create Program'}
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
