'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { logout } from '@/lib/firebase/auth'
import {
  HomeIcon,
  UsersIcon,
  BookIcon,
  CalendarIcon,
  FolderIcon,
  SettingsIcon,
  LogOutIcon,
  SparkleIcon,
  MenuIcon,
  XIcon,
  MailIcon,
} from '@/components/icons'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/admin', icon: HomeIcon },
  { label: 'Students', href: '/admin/students', icon: UsersIcon },
  { label: 'Messages', href: '/admin/messages', icon: MailIcon },
  { label: 'Programs', href: '/admin/programs', icon: BookIcon },
  { label: 'Sessions', href: '/admin/sessions', icon: CalendarIcon },
  { label: 'Resources', href: '/admin/resources', icon: FolderIcon },
  { label: 'Settings', href: '/admin/settings', icon: SettingsIcon },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, profile, role, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!loading && (!user || role !== 'admin')) {
      router.replace('/dashboard')
    }
  }, [user, role, loading, router])

  async function handleLogout(): Promise<void> {
    await logout()
    router.push('/login')
  }

  // Loading state
  if (loading || role !== 'admin') {
    return (
      <div
        className='min-h-screen flex items-center justify-center'
        style={{ background: 'var(--bg-base)' }}
      >
        <div className='flex flex-col items-center gap-3'>
          <div
            className='w-10 h-10 rounded-full flex items-center justify-center
                       animate-[pulseRing_2s_ease-in-out_infinite]'
            style={{ background: 'var(--pink-100)', color: 'var(--pink-400)' }}
          >
            <SparkleIcon size={18} />
          </div>
          <p
            className='text-sm'
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-400)' }}
          >
            Loading…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen flex' style={{ background: 'var(--bg-base)' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-20 lg:hidden animate-[fadeIn_0.2s_ease_both]'
          style={{ background: 'rgba(42, 10, 32, 0.2)' }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 min-h-screen w-64 flex flex-col z-30
                    transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0 lg:flex`}
        style={{
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--ink-100)',
        }}
      >
        {/* Logo */}
        <div
          className='px-6 py-5'
          style={{ borderBottom: '1px solid var(--ink-100)' }}
        >
          <div className='flex items-center gap-2.5'>
            <div
              className='w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0'
              style={{
                background: 'var(--pink-100)',
                color: 'var(--pink-400)',
              }}
            >
              <SparkleIcon size={15} />
            </div>
            <div>
              <p
                className='text-xs font-semibold leading-tight'
                style={{
                  fontFamily: 'var(--font-sans)',
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
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-3 py-4 overflow-y-auto'>
          <p
            className='px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest'
            style={{ fontFamily: 'var(--font-sans)', color: 'var(--ink-400)' }}
          >
            Management
          </p>
          <ul className='space-y-0.5'>
            {navItems.map(({ label, href, icon: Icon }) => {
              const active =
                pathname === href ||
                (href !== '/admin' && pathname.startsWith(href))
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`sidebar-item ${active ? 'active' : ''}`}
                  >
                    <Icon size={18} />
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Profile + logout */}
        <div
          className='px-3 py-4'
          style={{ borderTop: '1px solid var(--ink-100)' }}
        >
          {/* Profile card */}
          <div
            className='flex items-center gap-3 px-3 py-2.5 rounded-xl mb-2'
            style={{ background: 'var(--bg-muted)' }}
          >
            <div
              className='w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden'
              style={{ background: 'var(--pink-200)' }}
            >
              {profile?.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
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
                  {profile?.name?.charAt(0)?.toUpperCase() ?? 'A'}
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
                {profile?.name ?? 'Admin'}
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
          </div>

          {/* Sign out */}
          <button
            onClick={handleLogout}
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

      {/* ── Main ── */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Topbar — mobile only */}
        <header
          className='sticky top-0 z-10 px-6 py-4 flex items-center justify-between lg:hidden'
          style={{
            background: 'var(--bg-surface)',
            borderBottom: '1px solid var(--ink-100)',
          }}
        >
          <div className='flex items-center gap-2'>
            <span style={{ color: 'var(--pink-400)' }}>
              <SparkleIcon size={16} />
            </span>
            <span
              className='text-sm font-semibold'
              style={{
                fontFamily: 'var(--font-sans)',
                color: 'var(--ink-900)',
              }}
            >
              Admin
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className='w-9 h-9 flex items-center justify-center rounded-full
                       active:scale-95 transition-all duration-150'
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
            {sidebarOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </header>

        {/* Page content */}
        <main className='flex-1 p-6 lg:p-8 overflow-y-auto'>{children}</main>
      </div>
    </div>
  )
}
