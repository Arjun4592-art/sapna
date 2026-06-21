'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { JSX, ReactNode } from 'react'
import { useAuth } from '@/context/AuthContext'
import { logout } from '@/lib/firebase/auth'
import { SparkleIcon } from '@/components/icons'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): JSX.Element {
  const { user, profile, role, loading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [user, loading, router])

  async function handleLogout(): Promise<void> {
    await logout()
    router.push('/login')
  }

  if (loading || !user) {
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
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        role={role}
        profile={profile}
        onLogout={handleLogout}
      />

      <div className='flex-1 flex flex-col min-w-0'>
        <Topbar
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((v) => !v)}
        />

        <main className='flex-1 p-6 lg:p-8 overflow-y-auto'>{children}</main>
      </div>
    </div>
  )
}
