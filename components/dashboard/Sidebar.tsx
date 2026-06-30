'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import type { ComponentType, JSX } from 'react'
import {
  HomeIcon,
  BookIcon,
  CalendarIcon,
  FolderIcon,
  PenIcon,
  StarIcon,
  TrendingUpIcon,
  LogOutIcon,
  SparkleIcon,
  UserIcon,
} from '@/components/icons'

interface NavItem {
  label: string
  href: string
  icon: ComponentType<{ size?: number }>
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/dashboard', icon: HomeIcon },
  { label: 'My Programs', href: '/dashboard/programs', icon: BookIcon },
  { label: 'Sessions', href: '/dashboard/sessions', icon: CalendarIcon },
  { label: 'Resources', href: '/dashboard/resources', icon: FolderIcon },
  { label: 'Journal', href: '/dashboard/journal', icon: PenIcon },
  { label: 'Affirmations', href: '/dashboard/affirmations', icon: StarIcon },
  { label: 'Progress', href: '/dashboard/progress', icon: TrendingUpIcon },
]

interface SidebarProfile {
  name?: string
  email?: string
  photo?: string
}

interface SidebarProps {
  open: boolean
  onClose: () => void
  role: 'admin' | 'student' | null
  profile: SidebarProfile | null
  onLogout: () => void | Promise<void>
}

export default function Sidebar({
  open,
  onClose,
  role,
  profile,
  onLogout,
}: SidebarProps): JSX.Element {
  const pathname = usePathname()

  function isActive(href: string): boolean {
    return href === '/dashboard'
      ? pathname === '/dashboard'
      : pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 backdrop-blur-sm z-20 lg:hidden
                    transition-opacity duration-300
                    ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(42, 10, 32, 0.3)' }}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 h-full w-64 flex flex-col z-30
                    transition-transform duration-300
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0`}
        style={{
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--ink-100)',
        }}
      >
        {/* ── Logo ── */}
        <div
          className='px-6 py-5'
          style={{ borderBottom: '1px solid var(--ink-100)' }}
        >
          <div className='flex items-center gap-2.5'>
            <div
              className='w-8 h-8 rounded-full flex items-center justify-center shrink-0
                         animate-[spin_10s_linear_infinite]'
              style={{ background: 'var(--pink-50)', color: 'var(--pink-400)' }}
            >
              <SparkleIcon size={15} />
            </div>
            <div>
              <p
                className='text-xs font-semibold leading-tight'
                style={{
                  fontFamily: 'var(--font-serif)',
                  color: 'var(--ink-900)',
                }}
              >
                Soul Academy
              </p>
              <p
                className='text-[10px] font-medium uppercase tracking-wider'
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--pink-400)',
                }}
              >
                My Journey
              </p>
            </div>
          </div>
        </div>

        {/* ── Nav ── */}
        <nav className='flex-1 px-3 py-4 overflow-y-auto'>
          <p
            className='px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest'
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-300)' }}
          >
            Navigation
          </p>
          <ul className='space-y-0.5'>
            {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onClose}
                  className={`sidebar-item ${isActive(href) ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {role === 'admin' && (
            <>
              <p
                className='px-3 mt-6 mb-2 text-[10px] font-semibold uppercase tracking-widest'
                style={{
                  fontFamily: 'var(--font-sans)',
                  color: 'var(--ink-300)',
                }}
              >
                Admin
              </p>
              <Link
                href='/admin'
                className='sidebar-item'
                style={{ color: 'var(--magenta-500)' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--pink-50)'
                  el.style.color = 'var(--magenta-600)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = ''
                  el.style.color = 'var(--magenta-500)'
                }}
              >
                <SparkleIcon size={18} />
                Admin Panel
              </Link>
            </>
          )}
        </nav>

        {/* ── Profile + logout ── */}
        <div
          className='px-3 py-4'
          style={{ borderTop: '1px solid var(--ink-100)' }}
        >
          <Link href='/dashboard/profile'>
            <div
              className='flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2 cursor-pointer
                         transition-all duration-200'
              style={{ background: 'var(--pink-50)' }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  'var(--pink-100)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  'var(--pink-50)'
              }}
            >
              {/* Avatar */}
              <div
                className='w-8 h-8 rounded-full flex items-center justify-center shrink-0 overflow-hidden'
                style={{ background: 'var(--pink-200)' }}
              >
                {profile?.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.photo}
                    alt=''
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <span
                    className='text-xs font-semibold'
                    style={{
                      color: 'var(--magenta-600)',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    {profile?.name?.charAt(0)?.toUpperCase() || 'S'}
                  </span>
                )}
              </div>

              <div className='flex-1 min-w-0'>
                <p
                  className='text-sm font-medium truncate'
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--ink-900)',
                  }}
                >
                  {profile?.name || 'Student'}
                </p>
                <p
                  className='text-[11px] truncate'
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--ink-400)',
                  }}
                >
                  {profile?.email}
                </p>
              </div>
              <span style={{ color: 'var(--ink-300)' }}>
                <UserIcon size={14} />
              </span>
            </div>
          </Link>

          {/* Sign out */}
          <button
            type='button'
            onClick={onLogout}
            className='sidebar-item w-full transition-all duration-200'
            style={{ color: 'var(--ink-400)' }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = '#fef2f2'
              el.style.color = '#b91c1c'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement
              el.style.background = ''
              el.style.color = 'var(--ink-400)'
            }}
          >
            <LogOutIcon size={17} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
