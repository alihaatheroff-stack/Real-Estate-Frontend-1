import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Bell,
  ChevronDown,
  Menu,
  MessageCircle,
  User,
  Video,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/layout/Container'
import { PATHS } from '@/app/router/paths'
import { MARKETING_NAV, REFERRALS_MENU, SITE } from '@/shared/config/site'
import { cn } from '@/shared/lib/cn'

const HEADER_ACTIONS = [
  { label: 'Calls', icon: Video },
  { label: 'Messages', icon: MessageCircle },
  { label: 'Notifications', icon: Bell },
  { label: 'Account', icon: User },
] as const

function NavLabel({ index, label }: { index: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1">
      <span className="tabular-nums">{index + 1}.</span>
      <span>{label}</span>
    </span>
  )
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [referralsOpen, setReferralsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-paper/85 backdrop-blur-md">
      <Container className="flex h-16 max-w-none items-center justify-between gap-4 px-3 sm:h-[4.25rem] sm:px-4 lg:px-5">
        <Link
          to={PATHS.home}
          className="flex min-w-0 shrink-0 items-center gap-2.5"
        >
          <span
            aria-hidden
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand text-[0.7rem] font-extrabold tracking-wide text-white sm:h-10 sm:w-10 sm:text-xs"
          >
            RE
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
              {SITE.name}
            </span>
            <span className="hidden truncate text-[11px] text-muted sm:block">
              {SITE.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {MARKETING_NAV.map((item, index) =>
            'hasDropdown' in item && item.hasDropdown ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setReferralsOpen(true)}
                onMouseLeave={() => setReferralsOpen(false)}
              >
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition',
                      isActive || referralsOpen
                        ? 'bg-brand-light text-brand-dark'
                        : 'text-ink hover:bg-mist',
                    )
                  }
                >
                  <NavLabel index={index} label={item.label} />
                  <ChevronDown
                    className={cn(
                      'h-3.5 w-3.5 shrink-0 transition',
                      referralsOpen && 'rotate-180',
                    )}
                  />
                </NavLink>

                <div
                  className={cn(
                    'absolute left-0 top-full z-50 min-w-[14rem] pt-1 transition',
                    referralsOpen
                      ? 'pointer-events-auto opacity-100'
                      : 'pointer-events-none opacity-0',
                  )}
                >
                  <ul className="overflow-hidden rounded-xl border border-line bg-paper py-1 shadow-soft">
                    {REFERRALS_MENU.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.href}
                          className="block px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-mist hover:text-brand"
                          onClick={() => setReferralsOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  cn(
                    'inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold transition',
                    isActive
                      ? 'bg-brand-light text-brand-dark'
                      : 'text-ink hover:bg-mist',
                  )
                }
              >
                <NavLabel index={index} label={item.label} />
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-1">
          <div className="hidden items-center gap-0.5 sm:flex">
            {HEADER_ACTIONS.map(({ label, icon: Icon }) => (
              <button
                key={label}
                type="button"
                className="inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist"
                aria-label={label}
              >
                <Icon className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" />
              </button>
            ))}
          </div>
          <Link to={PATHS.signIn} className="hidden md:block">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link to={PATHS.registerPsp} className="hidden md:block">
            <Button size="sm">Join</Button>
          </Link>
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
            {MARKETING_NAV.map((item, index) =>
              'hasDropdown' in item && item.hasDropdown ? (
                <div key={item.href} className="flex flex-col">
                  <button
                    type="button"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold hover:bg-mist"
                    onClick={() => setReferralsOpen((v) => !v)}
                  >
                    <NavLabel index={index} label={item.label} />
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 shrink-0 transition',
                        referralsOpen && 'rotate-180',
                      )}
                    />
                  </button>
                  {referralsOpen ? (
                    <div className="mb-1 ml-2 border-l border-line pl-2">
                      <NavLink
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-muted hover:bg-mist hover:text-ink"
                      >
                        All referrals
                      </NavLink>
                      {REFERRALS_MENU.map((link) => (
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
              {HEADER_ACTIONS.map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg p-2.5 text-ink transition hover:bg-mist"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 stroke-[1.5]" />
                </button>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link to={PATHS.signIn} onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link to={PATHS.registerPsp} onClick={() => setOpen(false)}>
                <Button className="w-full">Join as PSP</Button>
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
