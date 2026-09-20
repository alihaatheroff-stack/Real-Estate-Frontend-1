import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { ChevronDown, GraduationCap, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { AdvertiseMenu } from '@/components/layout/AdvertiseMenu'
import { CallsMenu } from '@/components/layout/CallsMenu'
import { FavoritesMenu } from '@/components/layout/FavoritesMenu'
import { MessagesMenu } from '@/components/layout/MessagesMenu'
import { NotificationsMenu } from '@/components/layout/NotificationsMenu'
import { OrdersMenu } from '@/components/layout/OrdersMenu'
import { GuestAuthPopover } from '@/components/layout/GuestAuthPopover'
import { ProfileMenu, GuestAccountMenu } from '@/components/layout/ProfileMenu'
import { PATHS } from '@/app/router/paths'
import { SITE } from '@/shared/config/site'
import { cn } from '@/shared/lib/cn'
import {
  isCrowdfundingNavItem,
  isReferralsNavItem,
  NavLabel,
  SiteModuleNav,
} from '@/components/layout/SiteModuleNav'

type NavItem = { label: string; href: string; hasDropdown?: boolean; menuOnly?: boolean }
type MenuLink = { label: string; href: string }

type SiteHeaderProps = {
  isAuthenticated?: boolean
  onSignOut?: () => void
  homeHref: string
  signInHref: string
  registerHref: string
  marketingNav: readonly NavItem[]
  referralsMenu: readonly MenuLink[]
  crowdfundingMenu?: readonly MenuLink[]
  aboutMenu?: readonly MenuLink[]
}

export function SiteHeader({
  isAuthenticated: isAuthenticatedProp,
  onSignOut,
  homeHref,
  signInHref,
  registerHref,
  marketingNav,
  referralsMenu,
  crowdfundingMenu = [],
  aboutMenu = [],
}: SiteHeaderProps) {
  const [open, setOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const isAuthenticated = isAuthenticatedProp ?? false
  const navigate = useNavigate()

  function menuFor(item: NavItem): readonly MenuLink[] {
    if (item.href === PATHS.about) return aboutMenu
    if (isReferralsNavItem(item)) return referralsMenu
    if (isCrowdfundingNavItem(item)) return crowdfundingMenu
    return []
  }

  function handleMobileLogout() {
    onSignOut?.()
    setOpen(false)
    navigate(homeHref)
  }

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <Container className="flex h-[4.75rem] max-w-none items-center justify-between gap-4 px-3 sm:h-[5.5rem] sm:px-4 lg:px-5">
        <Link
          to={homeHref}
          className="flex min-w-0 shrink-0 items-center gap-2.5"
        >
          <span
            aria-hidden
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand sm:h-12 sm:w-12"
          />
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              {SITE.name}
            </span>
            <span className="hidden truncate text-[11px] text-muted sm:block">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <SiteModuleNav
          className="hidden lg:flex"
          items={marketingNav}
          referralsMenu={referralsMenu}
          crowdfundingMenu={crowdfundingMenu}
          aboutMenu={aboutMenu}
        />

        <div className="flex items-center gap-0.5 sm:gap-1">
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
                icon={GraduationCap}
                href={signInHref}
              />
            )}
            <MessagesMenu locked={!isAuthenticated} />
            <NotificationsMenu locked={!isAuthenticated} />
            <FavoritesMenu locked={!isAuthenticated} />
            <OrdersMenu locked={!isAuthenticated} />
            <AdvertiseMenu />
          </div>
          {isAuthenticated ? (
            <ProfileMenu
              className="hidden md:block"
              homeHref={homeHref}
              onSignOut={onSignOut}
            />
          ) : (
            <>
              <GuestAccountMenu
                className="hidden sm:block"
                signInHref={signInHref}
                registerHref={registerHref}
              />
              <Link to={registerHref} className="hidden md:block">
                <Button size="sm">Join RE Network</Button>
              </Link>
            </>
          )}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-mist lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <div className="border-t border-line bg-paper lg:hidden">
          <Container className="flex max-w-none flex-col gap-1 px-3 py-3 sm:px-4 lg:px-5">
            {marketingNav.map((item, index) =>
              item.hasDropdown ? (
                <div key={item.href} className="flex flex-col">
                  <div className="flex items-center">
                    {item.menuOnly ? (
                      <button
                        type="button"
                        className="flex min-w-0 flex-1 items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-mist"
                        onClick={() =>
                          setOpenDropdown((current) =>
                            current === item.href ? null : item.href,
                          )
                        }
                      >
                        <NavLabel index={index} label={item.label} />
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="min-w-0 flex-1 rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-mist"
                      >
                        <NavLabel index={index} label={item.label} />
                      </Link>
                    )}
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-mist"
                      aria-label={`Toggle ${item.label} menu`}
                      aria-expanded={openDropdown === item.href}
                      onClick={() =>
                        setOpenDropdown((current) =>
                          current === item.href ? null : item.href,
                        )
                      }
                    >
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 shrink-0 transition',
                          openDropdown === item.href && 'rotate-180',
                        )}
                      />
                    </button>
                  </div>
                  {openDropdown === item.href ? (
                    <div className="mb-1 ml-2 border-l border-line pl-2">
                      {menuFor(item).map((link) => (
                        <Link
                          key={link.label}
                          to={link.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-mist hover:text-ink"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-mist"
                >
                  <NavLabel index={index} label={item.label} />
                </NavLink>
              ),
            )}
            <div className="mt-2 flex items-center justify-center gap-1 border-t border-line pt-3">
              <CallsMenu locked={!isAuthenticated} />
              {isAuthenticated ? (
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg p-2.5 text-ink transition hover:bg-mist"
                  aria-label="Learn"
                >
                  <GraduationCap className="h-5 w-5 stroke-[1.5]" />
                </button>
              ) : (
                <GuestAuthPopover
                  triggerLabel="Learn"
                  icon={GraduationCap}
                  href={signInHref}
                />
              )}
              <MessagesMenu locked={!isAuthenticated} />
              <NotificationsMenu locked={!isAuthenticated} />
              <FavoritesMenu locked={!isAuthenticated} />
              <OrdersMenu locked={!isAuthenticated} />
              <AdvertiseMenu />
              {isAuthenticated ? null : (
                <GuestAccountMenu signInHref={signInHref} registerHref={registerHref} />
              )}
            </div>
            {isAuthenticated ? (
              <div className="mt-2 border-t border-line pt-3">
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-ink transition hover:bg-mist hover:text-brand"
                  onClick={handleMobileLogout}
                >
                  <LogOut className="h-4 w-4 stroke-[1.5]" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link to={signInHref} onClick={() => setOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link to={registerHref} onClick={() => setOpen(false)}>
                  <Button className="w-full">Join as PSP</Button>
                </Link>
              </div>
            )}
          </Container>
        </div>
      ) : null}
    </header>
  )
}
