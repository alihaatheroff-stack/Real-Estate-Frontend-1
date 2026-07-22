import { Outlet, useLocation } from 'react-router-dom'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { PATHS } from '@/app/router/paths'

export function MarketplaceLayout() {
  const { pathname } = useLocation()
  const hideFooter =
    pathname === PATHS.results || pathname === PATHS.profileResults

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      {hideFooter ? null : <SiteFooter />}
    </div>
  )
}
