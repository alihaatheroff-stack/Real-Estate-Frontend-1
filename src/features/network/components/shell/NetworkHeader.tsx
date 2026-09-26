import { Link } from 'react-router-dom'
import { GraduationCap, LayoutDashboard, Menu } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import {
  ABOUT_MENU,
  CROWDFUNDING_MENU,
  MARKETING_NAV,
  NETWORK_MENU,
  REFERRALS_MENU,
} from '@/app/config/nav'
import { AdvertiseMenu } from '@/components/layout/AdvertiseMenu'
import { NewsHeaderLink } from '@/components/layout/NewsHeaderLink'
import { CallsMenu } from '@/components/layout/CallsMenu'
import { WritingMenu } from '@/components/layout/WritingMenu'
import { FavoritesMenu } from '@/components/layout/FavoritesMenu'
import { GuestAuthPopover } from '@/components/layout/GuestAuthPopover'
import { MessagesMenu } from '@/components/layout/MessagesMenu'
import { NotificationsMenu } from '@/components/layout/NotificationsMenu'
import { OrdersMenu } from '@/components/layout/OrdersMenu'
import { GuestAccountMenu, ProfileMenu } from '@/components/layout/ProfileMenu'
import { SiteModuleNav } from '@/components/layout/SiteModuleNav'
import { SITE } from '@/shared/config/site'
import { signOut, useIsAuthenticated } from '@/features/auth'

export function NetworkHeader({
  onOpenMenu,
  showNetworkMenu = true,
}: {
  onOpenMenu?: () => void
  showNetworkMenu?: boolean
}) {
  const isAuthenticated = useIsAuthenticated()

  return (
    <header className="relative sticky top-0 z-50 border-b border-black/5 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
      <div className="flex h-[4.75rem] w-full items-center justify-between gap-4 px-3 sm:h-[5.5rem] sm:px-4">
        <div className="flex min-w-0 items-center gap-8 lg:gap-12">
          <Link
            to={PATHS.home}
            className="flex min-w-0 shrink-0 items-center gap-2.5"
          >
            <span
              aria-hidden
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#0b1f3a] sm:h-12 sm:w-12"
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

          <SiteModuleNav
            compact
            className="hidden lg:flex"
            items={MARKETING_NAV}
            referralsMenu={REFERRALS_MENU}
            crowdfundingMenu={CROWDFUNDING_MENU}
            networkMenu={NETWORK_MENU}
            aboutMenu={ABOUT_MENU}
          />
        </div>

        <div className="flex shrink-0 items-center justify-end gap-0.5 sm:gap-1">
          {showNetworkMenu && onOpenMenu ? (
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist lg:hidden"
              aria-label="Menu"
              onClick={onOpenMenu}
            >
              <Menu className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" />
            </button>
          ) : null}
          <div className="hidden items-center gap-0.5 sm:flex">
            <NewsHeaderLink />
            <WritingMenu locked={!isAuthenticated} />
            <AdvertiseMenu />
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
                icon={GraduationCap}
                href={PATHS.signIn}
              />
            )}
            <MessagesMenu locked={!isAuthenticated} />
            <NotificationsMenu locked={!isAuthenticated} />
            <FavoritesMenu locked={!isAuthenticated} />
            <OrdersMenu locked={!isAuthenticated} />
            {isAuthenticated ? (
              <Link
                to={PATHS.dashboard}
                className="inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist"
                aria-label="Dashboard"
              >
                <LayoutDashboard className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" />
              </Link>
            ) : (
              <GuestAuthPopover
                triggerLabel="Dashboard"
                icon={LayoutDashboard}
                href={PATHS.signIn}
              />
            )}
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
          networkMenu={NETWORK_MENU}
          aboutMenu={ABOUT_MENU}
        />
      </div>
    </header>
  )
}
