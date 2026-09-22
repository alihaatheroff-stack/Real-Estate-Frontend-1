import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

export type ModuleNavItem = {
  label: string
  href: string
  hasDropdown?: boolean
  menuOnly?: boolean
}
export type ModuleNavLink = { label: string; href: string }

export function NavLabel({ index, label }: { index: number; label: string }) {
  return (
    <span className="inline-flex items-baseline gap-1 underline underline-offset-4">
      <span className="tabular-nums">{index + 1}.</span>
      <span>{label}</span>
    </span>
  )
}

export function isReferralsNavItem(item: { label: string }) {
  return item.label === 'Referral' || item.label === 'Referrals'
}

export function isCrowdfundingNavItem(item: { label: string }) {
  return item.label === 'Crowdfund' || item.label === 'Crowdfunding'
}

export function isModuleNavActive(pathname: string, item: ModuleNavItem) {
  if (isReferralsNavItem(item)) {
    return pathname === PATHS.referrals || pathname.startsWith(`${PATHS.referrals}/`)
  }
  if (isCrowdfundingNavItem(item)) {
    return pathname === PATHS.crowdfunding || pathname.startsWith(`${PATHS.crowdfunding}/`)
  }
  if (item.href === PATHS.network || item.href === PATHS.networkFeed) {
    return pathname === PATHS.network || pathname.startsWith(`${PATHS.network}/`)
  }
  if (item.href === PATHS.about) {
    return pathname === PATHS.about || pathname === PATHS.contact || pathname.startsWith(`${PATHS.about}/`)
  }
  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

export function SiteModuleNav({
  items,
  referralsMenu,
  crowdfundingMenu = [],
  aboutMenu = [],
  compact = false,
  className,
}: {
  items: readonly ModuleNavItem[]
  referralsMenu: readonly ModuleNavLink[]
  crowdfundingMenu?: readonly ModuleNavLink[]
  aboutMenu?: readonly ModuleNavLink[]
  compact?: boolean
  className?: string
}) {
  const { pathname } = useLocation()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  function menuFor(item: ModuleNavItem): readonly ModuleNavLink[] {
    if (item.href === PATHS.about) return aboutMenu
    if (isReferralsNavItem(item)) return referralsMenu
    if (isCrowdfundingNavItem(item)) return crowdfundingMenu
    return []
  }

  return (
    <nav className={cn('items-center', compact ? 'gap-16' : 'gap-4', className)}>
      {items.map((item, index) => {
        const active = isModuleNavActive(pathname, item)
        const open = openDropdown === item.href
        const highlighted = active || open

        if (item.hasDropdown) {
          const triggerClassName = cn(
            'inline-flex items-center gap-1 rounded-lg font-semibold transition',
            compact ? 'px-2 py-1.5 text-[13px]' : 'px-3 py-2 text-sm',
            highlighted ? 'bg-brand-light text-brand-dark' : 'text-ink hover:bg-mist',
          )
          const trigger = (
            <>
              <NavLabel index={index} label={item.label} />
              <ChevronDown
                className={cn('h-3.5 w-3.5 shrink-0 transition', open && 'rotate-180')}
              />
            </>
          )

          return (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => setOpenDropdown(item.href)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.menuOnly ? (
                <button
                  type="button"
                  className={triggerClassName}
                  aria-expanded={open}
                  aria-haspopup="menu"
                  onClick={() =>
                    setOpenDropdown((current) => (current === item.href ? null : item.href))
                  }
                >
                  {trigger}
                </button>
              ) : (
                <Link to={item.href} className={triggerClassName}>
                  {trigger}
                </Link>
              )}
              <div
                className={cn(
                  'absolute left-0 top-full z-50 min-w-[14rem] pt-1 transition',
                  open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
                )}
              >
                <ul className="overflow-hidden rounded-xl border border-line bg-white py-1 shadow-soft">
                  {menuFor(item).map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="block px-4 py-2.5 text-center text-xs font-semibold uppercase tracking-wide text-ink transition hover:bg-mist hover:text-brand"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }

        return (
          <Link
            key={item.href}
            to={item.href}
            aria-current={active ? 'page' : undefined}
            className={cn(
              'inline-flex items-center rounded-lg font-semibold transition',
              compact ? 'px-2 py-1.5 text-[13px]' : 'px-3 py-2 text-sm',
              active ? 'bg-brand-light text-brand-dark' : 'text-ink hover:bg-mist',
            )}
          >
            <NavLabel index={index} label={item.label} />
          </Link>
        )
      })}
    </nav>
  )
}
