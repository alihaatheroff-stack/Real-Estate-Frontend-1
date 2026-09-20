import { useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { X } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { NetworkHeader } from '@/features/network/components/shell/NetworkHeader'
import { NetworkLeftNav } from '@/features/network/components/shell/NetworkLeftNav'
import { NetworkMobileNav } from '@/features/network/components/shell/NetworkMobileNav'
import { NetworkSocialProvider } from '@/features/network/model/NetworkSocialContext'
import { cn } from '@/shared/lib/cn'

export function NetworkLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const lockScroll =
    location.pathname === PATHS.networkMessages || location.pathname === PATHS.networkNotes

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, left: 0 })
  }, [location.pathname])

  return (
    <NetworkSocialProvider>
      <div className="network-shell flex h-dvh max-h-dvh flex-col overflow-hidden bg-[#F0F2F5]">
        <NetworkHeader onOpenMenu={() => setMenuOpen(true)} />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <aside className="network-shell-scroll hidden h-full w-[260px] shrink-0 overflow-y-auto border-r border-black/5 bg-white lg:flex">
            <NetworkLeftNav />
          </aside>
          <main
            ref={mainRef}
            className={cn(
              'network-shell-scroll flex h-full min-h-0 min-w-0 flex-1 flex-col',
              lockScroll ? 'overflow-hidden' : 'overflow-y-auto pb-16 lg:pb-0',
            )}
          >
            <Outlet />
          </main>
        </div>
        <NetworkMobileNav onOpenMenu={() => setMenuOpen(true)} />

        {menuOpen ? (
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
