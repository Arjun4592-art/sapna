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

  if (loading || role !== 'admin') {
    return (
      <div className='min-h-screen bg-bg-base flex items-center justify-center'>
        <div className='flex flex-col items-center gap-3'>
          <div
            className='w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center
                          animate-[pulseRing_2s_ease-in-out_infinite]'
          >
            <SparkleIcon
              size={18}
              className='text-rose-400 animate-[slow-spin_3s_linear_infinite]'
            />
          </div>
          <p className='text-sm text-ink-400'>Loading…</p>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-bg-base flex'>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-burgundy-900/20 z-20 lg:hidden
                     animate-[fadeIn_0.2s_ease_both]'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 min-h-screen w-64 bg-bg-surface border-r border-ink-100
                    flex flex-col z-30 transition-transform duration-300
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0 lg:flex`}
      >
        {/* Logo */}
        <div className='px-6 py-5 border-b border-ink-100'>
          <div className='flex items-center gap-2.5'>
            <div className='w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center flex-shrink-0'>
              <SparkleIcon size={15} className='text-rose-400' />
            </div>
            <div>
              <p className='text-xs font-semibold text-ink-900 leading-tight'>
                Soul Academy
              </p>
              <p className='text-[10px] text-rose-500 font-medium uppercase tracking-wider'>
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className='flex-1 px-3 py-4 overflow-y-auto'>
          <p
            className='px-3 mb-2 text-[10px] font-semibold uppercase
                        tracking-widest text-ink-400'
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
        <div className='px-3 py-4 border-t border-ink-100'>
          <div className='flex items-center gap-3 px-3 py-2.5 rounded-xl bg-bg-muted mb-2'>
            <div
              className='w-8 h-8 rounded-full bg-rose-200 flex items-center
                            justify-center flex-shrink-0 overflow-hidden'
            >
              {profile?.photo ? (
                <img
                  src={profile.photo}
                  alt={profile.name}
                  className='w-full h-full object-cover'
                />
              ) : (
                <span className='text-xs font-semibold text-rose-600'>
                  {profile?.name?.charAt(0)?.toUpperCase() ?? 'A'}
                </span>
              )}
            </div>
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium text-ink-900 truncate'>
                {profile?.name ?? 'Admin'}
              </p>
              <p className='text-[11px] text-ink-400 truncate'>
                {profile?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className='sidebar-item w-full text-ink-400
                       hover:text-red-500 hover:bg-red-50'
          >
            <LogOutIcon size={17} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className='flex-1 flex flex-col min-w-0'>
        {/* Top bar — mobile only */}
        <header
          className='sticky top-0 z-10 bg-bg-surface border-b border-ink-100
                           px-6 py-4 flex items-center justify-between lg:hidden'
        >
          <div className='flex items-center gap-2'>
            <SparkleIcon size={16} className='text-rose-400' />
            <span className='text-sm font-semibold text-ink-900'>Admin</span>
          </div>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className='w-9 h-9 flex items-center justify-center rounded-full
                       border border-ink-100 text-ink-500
                       hover:bg-rose-50 hover:border-rose-200
                       active:scale-95 transition-all duration-150'
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
