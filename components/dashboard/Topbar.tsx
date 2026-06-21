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
      className='sticky top-0 z-10 bg-white border-b border-ink-100
                       px-5 py-3.5 flex items-center justify-between lg:hidden'
    >
      <div className='flex items-center gap-2'>
        {/* CSS wiggle animation instead of Framer Motion */}
        <span className='text-rose-500 animate-float'>
          <SparkleIcon size={16} />
        </span>
        <span className='text-sm font-semibold text-ink-900 font-serif'>
          Soul Academy
        </span>
      </div>

      <button
        type='button'
        onClick={onToggleSidebar}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        className='w-9 h-9 flex items-center justify-center rounded-full
                   border border-ink-100 text-ink-500
                   hover:bg-rose-50 hover:border-rose-200
                   transition-colors duration-150
                   focus-visible:ring-2 focus-visible:ring-rose-300 outline-none'
      >
        {/* CSS rotate transition instead of AnimatePresence */}
        <span
          className={`flex transition-all duration-150
                      ${sidebarOpen ? 'rotate-90 opacity-100' : 'rotate-0 opacity-100'}`}
        >
          {sidebarOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
        </span>
      </button>
    </header>
  )
}
