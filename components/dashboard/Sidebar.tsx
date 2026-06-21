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
      {/* Mobile overlay — CSS opacity transition, no Framer Motion */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-ink-900/30 backdrop-blur-sm z-20 lg:hidden
                    transition-opacity duration-300
                    ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 h-full w-64 bg-white
                    border-r border-ink-100 flex flex-col z-30
                    transition-transform duration-300
                    ${open ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0`}
      >
        {/* Logo */}
        <div className='px-6 py-5 border-b border-ink-100'>
          <div className='flex items-center gap-2.5'>
            <div
              className='w-8 h-8 rounded-full bg-rose-50 flex items-center
                            justify-center shrink-0 animate-[spin_10s_linear_infinite]'
            >
              <SparkleIcon size={15} className='text-rose-500' />
            </div>
            <div>
              <p className='text-xs font-semibold text-ink-900 leading-tight font-serif'>
                Soul Academy
              </p>
              <p className='text-[10px] text-rose-500 font-medium uppercase tracking-wider'>
                My Journey
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-3 py-4 overflow-y-auto'>
          <p
            className='px-3 mb-2 text-[10px] font-semibold uppercase
                        tracking-widest text-ink-300'
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
                className='px-3 mt-6 mb-2 text-[10px] font-semibold uppercase
                            tracking-widest text-ink-300'
              >
                Admin
              </p>
              <Link
                href='/admin'
                className='sidebar-item text-violet-500 hover:bg-violet-50 hover:text-violet-600'
              >
                <SparkleIcon size={18} />
                Admin Panel
              </Link>
            </>
          )}
        </nav>

        {/* Profile + logout */}
        <div className='px-3 py-4 border-t border-ink-100'>
          <Link href='/dashboard/profile'>
            <div
              className='flex items-center gap-3 px-3 py-2.5 rounded-sm
                            bg-rose-50/60 mb-2 cursor-pointer
                            hover:bg-rose-100 transition-colors duration-200'
            >
              <div
                className='w-8 h-8 rounded-full bg-rose-200 flex items-center
                              justify-center shrink-0 overflow-hidden'
              >
                {profile?.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profile.photo}
                    alt=''
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <span className='text-xs font-semibold text-rose-600'>
                    {profile?.name?.charAt(0)?.toUpperCase() || 'S'}
                  </span>
                )}
              </div>
              <div className='flex-1 min-w-0'>
                <p className='text-sm font-medium text-ink-900 truncate'>
                  {profile?.name || 'Student'}
                </p>
                <p className='text-[11px] text-ink-400 truncate'>
                  {profile?.email}
                </p>
              </div>
              <UserIcon size={14} className='text-ink-300 shrink-0' />
            </div>
          </Link>
          <button
            type='button'
            onClick={onLogout}
            className='sidebar-item w-full text-ink-400 hover:text-red-500 hover:bg-red-50'
          >
            <LogOutIcon size={17} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  )
}
