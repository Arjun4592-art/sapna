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

// ── Local form state types ───────────────────────────────────────────────────
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

// ── Props ────────────────────────────────────────────────────────────────────
interface ProgramFormProps {
  initial?: Partial<Program>
  programId?: string
}

// ── Helpers ──────────────────────────────────────────────────────────────────
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

// ── Toggle switch ─────────────────────────────────────────────────────────────
interface ToggleProps {
  checked: boolean
  onChange: () => void
  label: string
}

function Toggle({ checked, onChange, label }: ToggleProps): JSX.Element {
  return (
    <label className='flex items-center gap-2 cursor-pointer select-none'>
      <span className='text-xs text-ink-400'>{label}</span>
      <button
        type='button'
        role='switch'
        aria-checked={checked}
        onClick={onChange}
        className={`w-9 h-5 rounded-full transition-colors duration-200
                    flex items-center px-0.5
                    ${checked ? 'bg-rose-400' : 'bg-ink-100'}`}
      >
        <div
          className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200
                      ${checked ? 'translate-x-4' : 'translate-x-0'}`}
        />
      </button>
    </label>
  )
}

// ── Spinner ──────────────────────────────────────────────────────────────────
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

// ── Main component ────────────────────────────────────────────────────────────
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
      const id = programId ?? (form.weeks === 4 ? '4-week' : '8-week')
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
      const message =
        err instanceof Error ? err.message : 'Something went wrong'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 max-w-2xl animate-fade-up'
    >
      <button
        type='button'
        onClick={() => router.back()}
        className='flex items-center gap-1.5 text-sm text-ink-400
                   hover:text-ink-900 transition-colors duration-150'
      >
        <ArrowLeftIcon size={15} />
        Back to programs
      </button>

      {/* Basic info */}
      <div style={{ borderRadius: '6px' }} className='card space-y-5'>
        <h2 className='font-serif text-base font-semibold text-ink-900'>
          Basic Info
        </h2>

        <div>
          <label className='input-label'>Program title *</label>
          <input
            name='title'
            className='input'
            value={form.title}
            onChange={handleChange}
            placeholder='e.g. Soul Blueprint Intensive'
            required
          />
        </div>

        <div>
          <label className='input-label'>Subtitle</label>
          <input
            name='subtitle'
            className='input'
            value={form.subtitle}
            onChange={handleChange}
            placeholder='e.g. 4-Week 1:1 Program'
          />
        </div>

        <div>
          <label className='input-label'>Description</label>
          <textarea
            name='description'
            className='input min-h-[100px]'
            value={form.description}
            onChange={handleChange}
            placeholder='Describe what this program offers…'
          />
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='input-label'>Duration (weeks)</label>
            <select
              name='weeks'
              className='input cursor-pointer'
              value={form.weeks}
              onChange={handleChange}
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
              className='input'
              value={form.price}
              onChange={handleChange}
              placeholder='5999'
            />
          </div>
          <div>
            <label className='input-label'>Original price (₹)</label>
            <input
              name='originalPrice'
              type='number'
              className='input'
              value={form.originalPrice}
              onChange={handleChange}
              placeholder='25000'
            />
          </div>
        </div>
      </div>

      {/* What's included */}
      <div style={{ borderRadius: '6px' }} className='card space-y-4'>
        <div className='flex items-center justify-between'>
          <h2 className='font-serif text-base font-semibold text-ink-900'>
            What&apos;s Included
          </h2>
          <button
            type='button'
            onClick={addInclude}
            className='btn btn-soft btn-sm flex items-center gap-1.5'
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
                value={item}
                onChange={(e) => handleIncludeChange(i, e.target.value)}
                placeholder={`Included item ${i + 1}`}
              />
              <button
                type='button'
                onClick={() => removeInclude(i)}
                className='w-9 h-9 flex items-center justify-center rounded-sm
                           border border-ink-100 text-ink-300
                           hover:border-red-300 hover:text-red-400
                           transition-all duration-150 shrink-0'
              >
                <TrashIcon size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly modules */}
      <div style={{ borderRadius: '6px' }} className='card space-y-4'>
        <h2 className='font-serif text-base font-semibold text-ink-900'>
          Weekly Modules
        </h2>
        <div className='space-y-4'>
          {modules.map((mod, i) => (
            <div
              key={mod.weekNum}
              className='border border-ink-100 rounded-sm p-4 space-y-3 bg-rose-50/40'
            >
              <div className='flex items-center justify-between'>
                <span className='text-xs font-semibold text-rose-500 uppercase tracking-wider'>
                  Week {mod.weekNum}
                </span>
                <Toggle
                  label='Locked'
                  checked={mod.locked}
                  onChange={() => handleModuleChange(i, 'locked', !mod.locked)}
                />
              </div>
              <input
                className='input'
                value={mod.title}
                onChange={(e) => handleModuleChange(i, 'title', e.target.value)}
                placeholder={`Week ${mod.weekNum} title`}
              />
              <textarea
                className='input min-h-[72px]'
                value={mod.description}
                onChange={(e) =>
                  handleModuleChange(i, 'description', e.target.value)
                }
                placeholder='What will students learn this week?'
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
          className='btn btn-primary flex items-center gap-2'
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
          className='btn btn-ghost'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
