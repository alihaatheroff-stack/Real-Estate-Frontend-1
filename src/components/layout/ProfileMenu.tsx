import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Globe, User } from 'lucide-react'
import { PATHS, providerPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const PROFILE_AVATAR = '/images/profile/rigoberto-peraza.jpg'

type MenuItem = {
  id: string
  label: string
  href?: string
  accent?: boolean
  muted?: boolean
  badge?: string
  trailing?: ReactNode
  onClick?: () => void
}

const PROFILE_MENU_SECTIONS: MenuItem[][] = [
  [
    { id: 'profile', label: 'Profile', href: providerPath('p1') },
    { id: 'post-brief', label: 'Post a project brief', href: PATHS.postOffer },
    { id: 'briefs', label: 'Your briefs', href: PATHS.dashboard },
    { id: 'refer', label: 'Refer a friend', href: PATHS.home, accent: true },
  ],
  [
    { id: 'seller', label: 'Become a Seller', href: PATHS.registerPsp },
    { id: 'settings', label: 'Account settings', href: PATHS.dashboard },
    { id: 'billing', label: 'Billing and payments', href: PATHS.dashboard },
  ],
  [
    {
      id: 'exclusive',
      label: 'Exclusive features',
      href: PATHS.advertise,
      badge: 'RE Pro',
    },
    { id: 'teammates', label: 'Invite your teammates', href: PATHS.networkFeed, muted: true },
    { id: 'find', label: 'Let us find your freelancer', href: PATHS.results, muted: true },
    { id: 'manage', label: 'Let us manage your project', href: PATHS.postOffer, muted: true },
  ],
  [
    {
      id: 'lang',
      label: 'English',
      trailing: <Globe className="h-4 w-4 text-muted" strokeWidth={1.75} />,
    },
    { id: 'currency', label: '$ USD' },
    { id: 'support', label: 'Support', href: PATHS.contact },
  ],
]

function MenuRow({
  item,
  onNavigate,
}: {
  item: MenuItem
  onNavigate: () => void
}) {
  const className = cn(
    'flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-mist',
    item.accent ? 'font-medium text-[#1dbf73]' : 'text-ink',
    item.muted && 'text-ink-soft',
  )

  const content = (
    <>
      <span className="inline-flex items-center gap-2">
        {item.label}
        {item.badge ? (
          <span className="rounded bg-[#404145] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            {item.badge}
          </span>
        ) : null}
      </span>
      {item.trailing}
    </>
  )

  if (item.href) {
    return (
      <Link
        to={item.href}
        role="menuitem"
        className={className}
        onClick={onNavigate}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      type="button"
      role="menuitem"
      className={className}
      onClick={() => {
        item.onClick?.()
        onNavigate()
      }}
    >
      {content}
    </button>
  )
}

export function GuestAccountMenu({
  className,
  signInHref,
  registerHref,
}: {
  className?: string
  signInHref: string
  registerHref: string
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        className={cn(
          'inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist',
          menuOpen && 'bg-mist',
        )}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <User className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" aria-hidden />
      </button>

      {menuOpen ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,14rem)] overflow-hidden rounded-xl border border-line bg-white py-1 shadow-soft"
        >
          <Link
            to={signInHref}
            role="menuitem"
            className="flex w-full px-4 py-2.5 text-left text-sm text-ink transition hover:bg-mist"
            onClick={() => setMenuOpen(false)}
          >
            Sign In
          </Link>
          <Link
            to={registerHref}
            role="menuitem"
            className="flex w-full px-4 py-2.5 text-left text-sm font-semibold text-ink transition hover:bg-mist"
            onClick={() => setMenuOpen(false)}
          >
            Register
          </Link>
        </div>
      ) : null}
    </div>
  )
}

export function ProfileMenu({
  className,
  homeHref,
  onAfterLogout,
  onSignOut,
}: {
  className?: string
  homeHref: string
  onAfterLogout?: () => void
  onSignOut?: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  function closeMenu() {
    setMenuOpen(false)
  }

  function handleLogout() {
    onSignOut?.()
    closeMenu()
    onAfterLogout?.()
    navigate(homeHref)
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        className={cn(
          'relative inline-flex items-center justify-center rounded-full transition',
          menuOpen && 'ring-2 ring-brand/30',
        )}
        aria-label="Account menu"
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-controls={menuId}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <img
          src={PROFILE_AVATAR}
          alt=""
          className="h-9 w-9 rounded-full object-cover object-[center_18%] ring-1 ring-line"
        />
        <span
          aria-hidden
          className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-paper bg-[#1dbf73]"
        />
      </button>

      {menuOpen ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,16.5rem)] overflow-hidden rounded-xl border border-line bg-white py-1 shadow-soft"
        >
          {PROFILE_MENU_SECTIONS.map((section, sectionIndex) => (
            <div
              key={sectionIndex}
              className={cn(sectionIndex > 0 && 'border-t border-line')}
            >
              {section.map((item) => (
                <MenuRow key={item.id} item={item} onNavigate={closeMenu} />
              ))}
            </div>
          ))}

          <div className="border-t border-line">
            <button
              type="button"
              role="menuitem"
              className="flex w-full px-4 py-2.5 text-left text-sm text-ink transition hover:bg-mist"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
