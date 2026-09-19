import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GraduationCap, Menu, Search } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { ABOUT_MENU, CROWDFUNDING_MENU, MARKETING_NAV, REFERRALS_MENU } from '@/app/config/nav'
import { CallsMenu } from '@/components/layout/CallsMenu'
import { FavoritesMenu } from '@/components/layout/FavoritesMenu'
import { GuestAuthPopover } from '@/components/layout/GuestAuthPopover'
import { MessagesMenu } from '@/components/layout/MessagesMenu'
import { NotificationsMenu } from '@/components/layout/NotificationsMenu'
import { OrdersMenu } from '@/components/layout/OrdersMenu'
import { GuestAccountMenu, ProfileMenu } from '@/components/layout/ProfileMenu'
import { SiteModuleNav } from '@/components/layout/SiteModuleNav'
import { SITE } from '@/shared/config/site'
import { signOut, useIsAuthenticated } from '@/features/auth'

export function NetworkHeader({ onOpenMenu }: { onOpenMenu: () => void }) {
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()
  const [query, setQuery] = useState('')

  function onSearch(event: FormEvent) {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `${PATHS.networkSearch}?q=${encodeURIComponent(q)}` : PATHS.networkSearch)
  }

  return (
    <header className="relative sticky top-0 z-50 border-b border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <div className="grid h-[4.75rem] w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 px-3 sm:h-[5.5rem] sm:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Link to={PATHS.networkFeed} className="flex min-w-0 shrink-0 items-center gap-2.5">
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand sm:h-12 sm:w-12"
            />
            <span className="min-w-0 leading-tight">
              <span className="block font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
                {SITE.name}
              </span>
              <span className="hidden truncate text-[11px] text-muted sm:block">
                {SITE.tagline}
              </span>
            </span>
          </Link>
          <form onSubmit={onSearch} className="relative min-w-0 max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search RE Network"
              className="h-10 w-full rounded-full bg-[#F0F2F5] pl-9 pr-3 text-sm text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-brand/25"
            />
          </form>
        </div>

        <SiteModuleNav
          compact
          className="hidden lg:flex"
          items={MARKETING_NAV}
          referralsMenu={REFERRALS_MENU}
          crowdfundingMenu={CROWDFUNDING_MENU}
          aboutMenu={ABOUT_MENU}
        />

        <div className="flex items-center justify-end gap-0.5 sm:gap-1">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist lg:hidden"
            aria-label="Menu"
            onClick={onOpenMenu}
          >
            <Menu className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" />
          </button>
          <div className="hidden items-center gap-0.5 sm:flex">
            <CallsMenu locked={!isAuthenticated} />
            {isAuthenticated ? (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist"
                aria-label="Learn"
              >
                <GraduationCap className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" />
              </button>
            ) : (
              <GuestAuthPopover
                triggerLabel="Learn"
                title="Learn"
                description="Sign in or register to use learn."
                icon={GraduationCap}
              />
            )}
            <MessagesMenu locked={!isAuthenticated} />
            <NotificationsMenu locked={!isAuthenticated} />
            <FavoritesMenu locked={!isAuthenticated} />
            <OrdersMenu locked={!isAuthenticated} />
          </div>
          {isAuthenticated ? (
            <ProfileMenu homeHref={PATHS.networkFeed} onSignOut={signOut} />
          ) : (
            <GuestAccountMenu signInHref={PATHS.signIn} registerHref={PATHS.registerPsp} />
          )}
        </div>
      </div>
      <div className="border-t border-black/5 px-2 py-1 lg:hidden">
        <SiteModuleNav
          compact
          className="flex overflow-x-auto network-hide-scroll"
          items={MARKETING_NAV}
          referralsMenu={REFERRALS_MENU}
          crowdfundingMenu={CROWDFUNDING_MENU}
          aboutMenu={ABOUT_MENU}
        />
      </div>
    </header>
  )
}
