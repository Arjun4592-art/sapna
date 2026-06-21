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
  { id: '4-week', label: 'Soul Blueprint (4-Week)' },
  { id: '8-week', label: 'Empowered You (8-Week)' },
  { id: 'both', label: 'Both Programs' },
]

const TYPES = [
  { id: 'pdf', label: 'PDF / Worksheet' },
  { id: 'audio', label: 'Audio / Meditation' },
  { id: 'video', label: 'Video' },
  { id: 'link', label: 'External Link' },
]

const fieldIconClass =
  'pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-300'
const inputBase =
  'w-full pl-10 pr-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm font-sans placeholder:text-ink-300 outline-none transition-all duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)]'
const inputPlain =
  'w-full px-4 py-2.5 rounded-xl border border-ink-100 bg-bg-surface text-ink-900 text-sm font-sans placeholder:text-ink-300 outline-none transition-all duration-200 focus:border-gold-400 focus:shadow-[0_0_0_3px_rgba(201,168,76,0.12)]'

export default function ResourceForm({
  initial,
  resourceId,
}: ResourceFormProps) {
  const router = useRouter()
  const isEdit = !!resourceId

  const [form, setForm] = useState({
    title: initial?.title || '',
    programId: initial?.programId || '4-week',
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

  const weeks = form.programId === '8-week' ? 8 : 4

  return (
    <form onSubmit={handleSubmit} className='space-y-6 max-w-2xl'>
      {/* Back */}
      <button
        type='button'
        onClick={() => router.back()}
        className='flex items-center gap-1.5 text-sm text-ink-400 hover:text-ink-900 transition-colors duration-150'
      >
        <ArrowLeftIcon size={15} />
        Back to resources
      </button>

      <div className='card space-y-5'>
        {/* Title */}
        <div>
          <label className='input-label'>Resource title *</label>
          <div className='relative'>
            <div className={fieldIconClass}>
              <FileIcon size={16} />
            </div>
            <input
              name='title'
              className={inputBase}
              value={form.title}
              onChange={handleChange}
              placeholder='e.g. Week 1 — Responsibility Worksheet'
              required
            />
          </div>
        </div>

        {/* Program + Week + Type */}
        <div className='grid grid-cols-3 gap-4'>
          <div>
            <label className='input-label'>Program</label>
            <div className='relative'>
              <div className={fieldIconClass}>
                <BookIcon size={15} />
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
            <label className='input-label'>Week</label>
            <select
              name='weekNum'
              className={`${inputPlain} cursor-pointer`}
              value={form.weekNum}
              onChange={handleChange}
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
              value={form.type}
              onChange={handleChange}
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
              className={[
                'flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-all duration-200',
                file
                  ? 'border-rose-400 bg-bg-muted'
                  : 'border-rose-100 hover:border-rose-300 hover:bg-bg-muted',
              ].join(' ')}
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
              <UploadIcon
                size={24}
                className={file ? 'text-rose-400' : 'text-ink-300'}
              />
              {file ? (
                <div className='text-center'>
                  <p className='text-sm font-medium text-ink-900'>
                    {file.name}
                  </p>
                  <p className='text-xs text-ink-400 mt-0.5'>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className='text-center'>
                  <p className='text-sm font-medium text-ink-400'>
                    Click to upload
                  </p>
                  <p className='text-xs text-ink-300 mt-0.5'>
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
                <div className='flex justify-between text-xs text-ink-400 mb-1'>
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
              <p className='text-xs text-ink-300 mb-1.5'>
                Or paste a direct URL instead
              </p>
              <input
                name='url'
                className={inputPlain}
                value={form.url}
                onChange={handleChange}
                placeholder='https://…'
              />
            </div>
          </div>
        ) : (
          <div>
            <label className='input-label'>External URL *</label>
            <input
              name='url'
              className={inputPlain}
              value={form.url}
              onChange={handleChange}
              placeholder='https://…'
            />
          </div>
        )}

        {/* Locked toggle */}
        <div className='flex items-center justify-between p-4 rounded-xl bg-bg-muted border border-rose-100'>
          <div>
            <p className='text-sm font-medium text-ink-900'>Lock resource</p>
            <p className='text-xs text-ink-400 mt-0.5'>
              Locked resources are hidden until the relevant week is reached
            </p>
          </div>
          <div
            onClick={() =>
              setForm((prev) => ({ ...prev, locked: !prev.locked }))
            }
            className={[
              'w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer flex items-center px-0.5 flex-shrink-0',
              form.locked ? 'bg-rose-400' : 'bg-ink-100',
            ].join(' ')}
            role='switch'
            aria-checked={form.locked}
          >
            <div
              className={[
                'w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200',
                form.locked ? 'translate-x-5' : 'translate-x-0',
              ].join(' ')}
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className='input-label'>Notes (internal)</label>
          <textarea
            name='notes'
            className={`${inputPlain} min-h-[80px] resize-none`}
            value={form.notes}
            onChange={handleChange}
            placeholder='Internal notes about this resource…'
          />
        </div>
      </div>

      {/* Submit */}
      <div className='flex items-center gap-3'>
        <button
          type='submit'
          disabled={loading || uploading}
          className='btn btn-primary flex items-center gap-2 disabled:opacity-40'
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
          className='btn btn-ghost'
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
