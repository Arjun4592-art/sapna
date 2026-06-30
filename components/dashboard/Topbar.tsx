'use client'

import type { JSX } from 'react'
import { SparkleIcon, MenuIcon, XIcon } from '@/components/icons'

interface TopbarProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function Topbar({
  sidebarOpen,
  onToggleSidebar,
}: TopbarProps): JSX.Element {
  return (
    <header
      className='sticky top-0 z-10 px-5 py-3.5 flex items-center justify-between lg:hidden'
      style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--ink-100)',
      }}
    >
      <div className='flex items-center gap-2'>
        <span className='animate-float' style={{ color: 'var(--pink-400)' }}>
          <SparkleIcon size={16} />
        </span>
        <span
          className='text-sm font-semibold'
          style={{ fontFamily: 'var(--font-serif)', color: 'var(--ink-900)' }}
        >
          Soul Academy
        </span>
      </div>

      <button
        type='button'
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        className='w-9 h-9 flex items-center justify-center rounded-full
                   transition-all duration-150 outline-none
                   focus-visible:ring-2'
        style={{
          border: '1px solid var(--ink-100)',
          color: 'var(--ink-500)',
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'var(--pink-50)'
          el.style.borderColor = 'var(--pink-200)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.background = 'transparent'
          el.style.borderColor = 'var(--ink-100)'
        }}
      >
        <span
          className={`flex transition-all duration-150
                      ${sidebarOpen ? 'rotate-90' : 'rotate-0'}`}
        >
          {sidebarOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
        </span>
      </button>
    </header>
  )
}
