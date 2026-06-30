'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '@/lib/firebase/config'
import toast from 'react-hot-toast'
import {
  FileIcon,
  BookIcon,
  ArrowLeftIcon,
  CheckIcon,
  UploadIcon,
} from '@/components/icons'

interface ResourceFormProps {
  initial?: any
  resourceId?: string
}

const PROGRAMS = [
  { id: 'akashic', label: 'Akashic Record Reading Program' },
  { id: 'relationship', label: 'Life & Relationship Coaching Program' },
  { id: 'both', label: 'Both Programs' },
]

const TYPES = [
  { id: 'pdf', label: 'PDF / Worksheet' },
  { id: 'audio', label: 'Audio / Meditation' },
  { id: 'video', label: 'Video' },
  { id: 'link', label: 'External Link' },
]

const inputStyle = {
  border: '1px solid var(--ink-100)',
  background: 'var(--bg-surface)',
  color: 'var(--ink-900)',
  fontFamily: 'var(--font-sans)',
}

const inputBase =
  'w-full pl-10 pr-4 py-2.5 rounded-xl text-sm placeholder:text-[var(--ink-300)] outline-none transition-all duration-200'
const inputPlain =
  'w-full px-4 py-2.5 rounded-xl text-sm placeholder:text-[var(--ink-300)] outline-none transition-all duration-200'

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

export default function ResourceForm({
  initial,
  resourceId,
}: ResourceFormProps) {
  const router = useRouter()
  const isEdit = !!resourceId

  const [form, setForm] = useState({
    title: initial?.title || '',
    programId: initial?.programId || 'akashic',
    weekNum: initial?.weekNum || 1,
    type: initial?.type || 'pdf',
    url: initial?.url || '',
    locked: initial?.locked ?? true,
    notes: initial?.notes || '',
  })

  const [file, setFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function uploadFile(f: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const path = `resources/${Date.now()}_${f.name}`
      const storageRef = ref(storage, path)
      const task = uploadBytesResumable(storageRef, f)
      task.on(
        'state_changed',
        (snap) =>
          setUploadProgress(
            Math.round((snap.bytesTransferred / snap.totalBytes) * 100),
          ),
        reject,
        async () => {
          const url = await getDownloadURL(task.snapshot.ref)
          resolve(url)
        },
      )
    })
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault()
    if (!form.title) {
      toast.error('Title is required')
      return
    }
    setLoading(true)
    try {
      let url = form.url
      if (file) {
        setUploading(true)
        url = await uploadFile(file)
        setUploading(false)
      }
      if (!url) {
        toast.error('Please provide a file or URL')
        setLoading(false)
        return
      }

      const payload = {
        title: form.title.trim(),
        programId: form.programId,
        weekNum: Number(form.weekNum),
        type: form.type,
        url,
        locked: form.locked,
        notes: form.notes.trim(),
        updatedAt: serverTimestamp(),
      }

      if (isEdit) {
        await updateDoc(doc(db, 'resources', resourceId), payload)
        toast.success('Resource updated')
      } else {
        await addDoc(collection(db, 'resources'), {
          ...payload,
          createdAt: serverTimestamp(),
        })
        toast.success('Resource created')
      }
      router.push('/admin/resources')
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
      setUploading(false)
    } finally {
      setLoading(false)
    }
  }

  const weeks = form.programId === 'relationship' ? 8 : 4

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
        Back to resources
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
          <label className='input-label'>Resource title *</label>
          <div className='relative'>
            <div
              className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2'
              style={{ color: 'var(--ink-300)' }}
            >
              <FileIcon size={16} />
            </div>
            <input
              name='title'
              className={inputBase}
              style={inputStyle}
              value={form.title}
              onChange={handleChange}
              placeholder='e.g. Week 1 — Responsibility Worksheet'
              required
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
        </div>

        {/* Program + Week + Type */}
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='input-label'>Program</label>
            <div className='relative'>
              <div
                className='pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2'
                style={{ color: 'var(--ink-300)' }}
              >
                <BookIcon size={15} />
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
            <label className='input-label'>Week</label>
            <select
              name='weekNum'
              className={`${inputPlain} cursor-pointer`}
              style={inputStyle}
              value={form.weekNum}
              onChange={handleChange}
              onFocus={focusInput}
              onBlur={blurInput}
            >
              {Array.from({ length: weeks }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  Week {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className='input-label'>Type</label>
            <select
              name='type'
              className={`${inputPlain} cursor-pointer`}
              style={inputStyle}
              value={form.type}
              onChange={handleChange}
              onFocus={focusInput}
              onBlur={blurInput}
            >
              {TYPES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* File upload OR URL */}
        {form.type !== 'link' ? (
          <div>
            <label className='input-label'>Upload file</label>
            <label
              className='flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-200'
              style={{
                borderColor: file ? 'var(--pink-400)' : 'var(--pink-100)',
                background: file ? 'var(--bg-muted)' : 'transparent',
              }}
              onMouseEnter={(e) => {
                if (!file) {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--pink-300)'
                  el.style.background = 'var(--bg-muted)'
                }
              }}
              onMouseLeave={(e) => {
                if (!file) {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = 'var(--pink-100)'
                  el.style.background = 'transparent'
                }
              }}
            >
              <input
                type='file'
                className='hidden'
                accept={
                  form.type === 'pdf'
                    ? '.pdf'
                    : form.type === 'audio'
                      ? '.mp3,.wav,.m4a'
                      : form.type === 'video'
                        ? '.mp4,.mov,.webm'
                        : '*'
                }
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              <span
                style={{ color: file ? 'var(--pink-400)' : 'var(--ink-300)' }}
              >
                <UploadIcon size={24} />
              </span>
              {file ? (
                <div className='text-center'>
                  <p
                    className='text-sm font-medium'
                    style={{
                      color: 'var(--ink-900)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {file.name}
                  </p>
                  <p
                    className='text-xs mt-0.5'
                    style={{
                      color: 'var(--ink-400)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className='text-center'>
                  <p
                    className='text-sm font-medium'
                    style={{
                      color: 'var(--ink-400)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    Click to upload
                  </p>
                  <p
                    className='text-xs mt-0.5'
                    style={{
                      color: 'var(--ink-300)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {form.type === 'pdf'
                      ? 'PDF files up to 20MB'
                      : form.type === 'audio'
                        ? 'MP3, WAV, M4A up to 50MB'
                        : 'MP4, MOV up to 200MB'}
                  </p>
                </div>
              )}
            </label>

            {/* Upload progress */}
            {uploading && (
              <div className='mt-3'>
                <div
                  className='flex justify-between text-xs mb-1'
                  style={{
                    color: 'var(--ink-400)',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <span>Uploading…</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className='progress-track'>
                  <div
                    className='progress-fill'
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Or paste URL */}
            <div className='mt-3'>
              <p
                className='text-xs mb-1.5'
                style={{
                  color: 'var(--ink-300)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                Or paste a direct URL instead
              </p>
              <input
                name='url'
                className={inputPlain}
                style={inputStyle}
                value={form.url}
                onChange={handleChange}
                placeholder='https://…'
                onFocus={focusInput}
                onBlur={blurInput}
              />
            </div>
          </div>
        ) : (
          <div>
            <label className='input-label'>External URL *</label>
            <input
              name='url'
              className={inputPlain}
              style={inputStyle}
              value={form.url}
              onChange={handleChange}
              placeholder='https://…'
              onFocus={focusInput}
              onBlur={blurInput}
            />
          </div>
        )}

        {/* Locked toggle */}
        <div
          className='flex items-center justify-between p-4 rounded-xl'
          style={{
            background: 'var(--bg-muted)',
            border: '1px solid var(--pink-100)',
          }}
        >
          <div>
            <p
              className='text-sm font-medium'
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--ink-900)',
              }}
            >
              Lock resource
            </p>
            <p
              className='text-xs mt-0.5'
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--ink-400)',
              }}
            >
              Locked resources are hidden until the relevant week is reached
            </p>
          </div>
          <div
            onClick={() =>
              setForm((prev) => ({ ...prev, locked: !prev.locked }))
            }
            className='w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer flex items-center px-0.5 flex-shrink-0'
            style={{
              background: form.locked ? 'var(--pink-400)' : 'var(--ink-100)',
            }}
            role='switch'
            aria-checked={form.locked}
          >
            <div
              className='w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200'
              style={{
                transform: form.locked ? 'translateX(20px)' : 'translateX(0)',
              }}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className='input-label'>Notes (internal)</label>
          <textarea
            name='notes'
            className={`${inputPlain} min-h-[80px] resize-none`}
            style={inputStyle}
            value={form.notes}
            onChange={handleChange}
            placeholder='Internal notes about this resource…'
            onFocus={focusInput}
            onBlur={blurInput}
          />
        </div>
      </div>

      {/* Submit */}
      <div className='flex items-center gap-3'>
        <button
          type='submit'
          disabled={loading || uploading}
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
            if (!loading && !uploading) {
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
          {loading || uploading ? (
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
              {uploading ? `Uploading ${uploadProgress}%…` : 'Saving…'}
            </>
          ) : (
            <>
              <CheckIcon size={15} />
              {isEdit ? 'Update Resource' : 'Create Resource'}
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
