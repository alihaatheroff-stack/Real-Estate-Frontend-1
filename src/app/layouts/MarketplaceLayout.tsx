import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import {
  ABOUT_MENU,
  CROWDFUNDING_MENU,
  FOOTER_LINKS,
  MARKETING_NAV,
  REFERRALS_MENU,
} from '@/app/config/nav'
import { PATHS } from '@/app/router/paths'
import { useIsAuthenticated, signOut } from '@/features/auth'
import { cn } from '@/shared/lib/cn'

export function MarketplaceLayout() {
  const { pathname } = useLocation()
  const isAuthenticated = useIsAuthenticated()
  const hideFooter =
    pathname === PATHS.results ||
    pathname === PATHS.profileResults ||
    pathname === PATHS.employerResults

  return (
    <div
      className={cn(
        'flex flex-col',
        hideFooter ? 'h-dvh overflow-hidden' : 'min-h-screen',
      )}
    >
      <SiteHeader
        isAuthenticated={isAuthenticated}
        onSignOut={signOut}
        homeHref={PATHS.home}
        signInHref={PATHS.signIn}
        registerHref={PATHS.registerPsp}
        marketingNav={MARKETING_NAV}
        referralsMenu={REFERRALS_MENU}
        crowdfundingMenu={CROWDFUNDING_MENU}
        aboutMenu={ABOUT_MENU}
      />
      <main
        className={cn(
          'flex min-h-0 flex-1 flex-col',
          hideFooter && 'overflow-hidden',
        )}
      >
        <Outlet />
      </main>
      {hideFooter ? null : (
        <SiteFooter
          accountLinks={FOOTER_LINKS.account}
          legalLinks={FOOTER_LINKS.legal}
          advertiseHref={PATHS.advertise}
        />
      )}
    </div>
  )
}
