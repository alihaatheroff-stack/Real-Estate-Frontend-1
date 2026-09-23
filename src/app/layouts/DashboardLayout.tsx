import { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { Menu, PanelLeft, X } from 'lucide-react'
import { SiteHeader } from '@/components/layout/SiteHeader'
import {
  ABOUT_MENU,
  CROWDFUNDING_MENU,
  MARKETING_NAV,
  NETWORK_MENU,
  REFERRALS_MENU,
} from '@/app/config/nav'
import { PATHS } from '@/app/router/paths'
import { DashboardSidebar } from '@/features/dashboard/components/DashboardSidebar'
import { signOut, useIsAuthenticated } from '@/features/auth'
import { cn } from '@/shared/lib/cn'

const SIDEBAR_STORAGE_KEY = 're-dashboard-sidebar-open'

function readSidebarOpen() {
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY)
    if (stored === null) return true
    return stored === '1'
  } catch {
    return true
  }
}

export function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(readSidebarOpen)
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0 })
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    try {
      localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarOpen ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [sidebarOpen])

  if (!isAuthenticated) {
    return (
      <Navigate
        to={PATHS.signIn}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  return (
    <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-[#F4F6F5]">
      <SiteHeader
        isAuthenticated={isAuthenticated}
        onSignOut={signOut}
        homeHref={PATHS.home}
        signInHref={PATHS.signIn}
        registerHref={PATHS.registerPsp}
        marketingNav={MARKETING_NAV}
        referralsMenu={REFERRALS_MENU}
        crowdfundingMenu={CROWDFUNDING_MENU}
        networkMenu={NETWORK_MENU}
        aboutMenu={ABOUT_MENU}
      />

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside
          className={cn(
            'hidden h-full shrink-0 overflow-hidden transition-[width] duration-200 ease-out lg:block',
            sidebarOpen ? 'w-[280px]' : 'w-0',
          )}
        >
          <div className="flex h-full w-[280px]">
            <DashboardSidebar onToggleCollapsed={() => setSidebarOpen(false)} />
          </div>
        </aside>

        <main ref={mainRef} className="relative min-h-0 min-w-0 flex-1 overflow-y-auto">
          <div
            className={cn(
              'sticky top-0 z-10 flex items-center gap-2 bg-[#F4F6F5] px-3 py-2.5 sm:px-4',
              // Hide empty strip on desktop when sidebar is already open
              sidebarOpen && 'lg:hidden',
            )}
          >
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-ink transition hover:bg-mist lg:hidden"
              aria-label="Open dashboard menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            {!sidebarOpen ? (
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="hidden h-9 w-9 items-center justify-center rounded-lg text-ink transition hover:bg-mist lg:inline-flex"
                aria-label="Open sidebar"
                title="Open sidebar"
              >
                <PanelLeft className="h-5 w-5" strokeWidth={1.75} />
              </button>
            ) : null}

            <p className="text-sm font-semibold text-ink lg:hidden">Dashboard menu</p>
          </div>

          <div className="px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100vw-3rem,280px)] flex-col bg-white shadow-panel animate-drawer-in">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <p className="font-display text-lg font-semibold text-ink">Menu</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-ink"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="network-hide-scroll min-h-0 flex-1 overflow-y-auto">
              <DashboardSidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
