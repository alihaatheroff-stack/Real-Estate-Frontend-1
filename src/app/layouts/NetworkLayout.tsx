import { useEffect, useRef, useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { NetworkHeader } from '@/features/network/components/shell/NetworkHeader'
import { NetworkLeftNav } from '@/features/network/components/shell/NetworkLeftNav'
import { NetworkMobileNav } from '@/features/network/components/shell/NetworkMobileNav'
import { NetworkSocialProvider } from '@/features/network/model/NetworkSocialContext'
import { useIsAuthenticated } from '@/features/auth'
import { cn } from '@/shared/lib/cn'

const SIDEBAR_KEY = 're-network-sidebar-open'
const SIDEBAR_WIDTH = 260
/** Half of the 32px toggle — parks the full button on-screen when the sidebar is closed. */
const TOGGLE_HALF = 16

function readSidebarOpen() {
  try {
    const raw = localStorage.getItem(SIDEBAR_KEY)
    if (raw === null) return true
    return raw === '1'
  } catch {
    return true
  }
}

/** Guests may only browse Articles + Forums; feed and the rest require sign-in. */
function isGuestPublicNetworkPath(pathname: string) {
  return (
    pathname === PATHS.networkArticles ||
    pathname.startsWith(`${PATHS.networkArticles}/`) ||
    pathname === PATHS.networkForums ||
    pathname.startsWith(`${PATHS.networkForums}/`)
  )
}

export function NetworkLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(readSidebarOpen)
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const isAuthenticated = useIsAuthenticated()
  const showSidebar = isAuthenticated
  const guestBlocked =
    !isAuthenticated && !isGuestPublicNetworkPath(location.pathname)
  const lockScroll =
    location.pathname === PATHS.networkMessages || location.pathname === PATHS.networkNotes

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  useEffect(() => {
    if (!showSidebar) return
    try {
      localStorage.setItem(SIDEBAR_KEY, sidebarOpen ? '1' : '0')
    } catch {
      /* ignore */
    }
  }, [sidebarOpen, showSidebar])

  useEffect(() => {
    if (!showSidebar || !sidebarOpen) return

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node | null
      if (!target) return
      if (sidebarRef.current?.contains(target)) return
      if (toggleRef.current?.contains(target)) return
      setSidebarOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [sidebarOpen, showSidebar])

  if (guestBlocked) {
    return (
      <Navigate
        to={PATHS.signIn}
        replace
        state={{ from: `${location.pathname}${location.search}` }}
      />
    )
  }

  return (
    <NetworkSocialProvider>
      <div className="network-shell flex h-dvh max-h-dvh flex-col overflow-hidden bg-[#F0F2F5]">
        <NetworkHeader
          onOpenMenu={showSidebar ? () => setMenuOpen(true) : undefined}
          showNetworkMenu={showSidebar}
        />

        <div className="relative flex min-h-0 flex-1 overflow-hidden">
          {showSidebar ? (
            <>
              {/* Overlay sidebar — inset from header like Forums card, floats over content. */}
              <div
                ref={sidebarRef}
                className={cn(
                  'absolute bottom-4 left-0 top-4 z-20 hidden overflow-hidden rounded-r-xl transition-[width,box-shadow] duration-200 ease-out lg:block',
                  sidebarOpen && 'shadow-[4px_0_24px_rgba(0,0,0,0.08)]',
                )}
                style={{ width: sidebarOpen ? SIDEBAR_WIDTH : 0 }}
                aria-hidden={!sidebarOpen}
              >
                <div
                  className="network-shell-scroll h-full overflow-y-auto border border-black/5 border-l-0 bg-white"
                  style={{ width: SIDEBAR_WIDTH }}
                >
                  <NetworkLeftNav />
                </div>
              </div>

              <button
                ref={toggleRef}
                type="button"
                onClick={() => setSidebarOpen((open) => !open)}
                className="absolute top-1/2 z-30 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-ink/70 shadow-[0_1px_4px_rgba(0,0,0,0.12)] transition-[left,color,border-color] duration-200 ease-out hover:border-brand/25 hover:text-brand lg:flex"
                style={{ left: sidebarOpen ? SIDEBAR_WIDTH : TOGGLE_HALF }}
                aria-label={sidebarOpen ? 'Hide menu' : 'Show menu'}
                aria-expanded={sidebarOpen}
                title={sidebarOpen ? 'Hide menu' : 'Show menu'}
              >
                {sidebarOpen ? (
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
                ) : (
                  <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
                )}
              </button>
            </>
          ) : null}

          <main
            ref={mainRef}
            className={cn(
              'network-shell-scroll flex h-full min-h-0 min-w-0 flex-1 flex-col',
              lockScroll ? 'overflow-hidden' : 'overflow-y-auto',
              showSidebar ? 'pb-16 lg:pb-0' : 'pb-0',
            )}
          >
            <Outlet />
          </main>
        </div>

        {showSidebar ? <NetworkMobileNav onOpenMenu={() => setMenuOpen(true)} /> : null}

        {showSidebar && menuOpen ? (
          <div className="fixed inset-0 z-[70] lg:hidden">
            <button
              type="button"
              className="absolute inset-0 bg-ink/40"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 flex w-[min(100vw-3rem,280px)] flex-col bg-white shadow-panel animate-drawer-in">
              <div className="flex items-center justify-between px-4 py-3">
                <p className="font-display text-lg font-semibold">Menu</p>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-mist"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto">
                <NetworkLeftNav onNavigate={() => setMenuOpen(false)} />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </NetworkSocialProvider>
  )
}
