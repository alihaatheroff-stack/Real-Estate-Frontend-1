import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { signOut } from '@/features/auth'
import { getUnreadNoticeCount } from '@/features/network/data/feed'
import { NETWORK_SIDEBAR_LINKS } from '@/features/network/data/nav'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { cn } from '@/shared/lib/cn'

function linkIsActive(pathname: string, search: string, to: string, end?: boolean) {
  const [path, query = ''] = to.split('?')
  if (query) {
    return pathname === path && (search === `?${query}` || search.includes(query))
  }
  if (path === PATHS.networkFriends) {
    return pathname === path && (!search || search === '?')
  }
  if (end) return pathname === path
  return pathname === path || pathname.startsWith(`${path}/`)
}

export function NetworkLeftNav({ onNavigate }: { onNavigate?: () => void }) {
  const navigate = useNavigate()
  const { pathname, search } = useLocation()
  const { unreadMessageCount } = useNetworkSocial()
  const unreadNoticeCount = getUnreadNoticeCount()

  return (
    <nav className="flex h-full w-full flex-col px-3 py-4">
      <div className="flex flex-1 flex-col gap-1">
        {NETWORK_SIDEBAR_LINKS.map((link, index) => {
          const isActive = linkIsActive(pathname, search, link.to, link.end)
          const prev = NETWORK_SIDEBAR_LINKS[index - 1]
          const next = NETWORK_SIDEBAR_LINKS[index + 1]
          const isSectionParent = !link.nested && Boolean(next?.nested)
          const startsNestedBlock = Boolean(link.nested && !prev?.nested)
          const endsNestedBlock = Boolean(link.nested && !next?.nested)

          return (
            <NavLink
              key={`${link.to}-${link.label}`}
              to={link.to}
              end={link.end}
              onClick={() => {
                onNavigate?.()
                document.querySelector<HTMLElement>('.network-shell main')?.scrollTo({ top: 0, left: 0 })
              }}
              className={cn(
                'flex items-center gap-3 transition',
                link.nested
                  ? cn(
                      'ml-5 border-l-2 py-2 pl-3 pr-3 text-[13px] font-medium',
                      startsNestedBlock && 'mt-0.5',
                      endsNestedBlock && 'mb-1',
                      isActive
                        ? 'border-brand bg-brand/10 text-brand'
                        : 'border-line text-muted hover:border-brand/40 hover:bg-mist hover:text-ink',
                    )
                  : cn(
                      'rounded-2xl px-4 py-3 text-[15px]',
                      isSectionParent ? 'font-bold text-ink' : 'font-semibold',
                      isActive ? 'bg-brand text-white shadow-sm' : 'text-muted hover:bg-mist hover:text-ink',
                    ),
              )}
            >
              <link.icon
                className={cn('shrink-0', link.nested ? 'h-4 w-4' : 'h-5 w-5')}
                strokeWidth={isActive ? 2.25 : link.nested ? 1.7 : isSectionParent ? 2.15 : 1.85}
              />
              <span className="min-w-0 flex-1 truncate">{link.label}</span>
              {link.to === PATHS.networkMessages && unreadMessageCount > 0 ? (
                <span
                  className={cn(
                    'grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold',
                    isActive ? 'bg-white/20 text-white' : 'bg-brand text-white',
                  )}
                >
                  {unreadMessageCount}
                </span>
              ) : null}
              {link.to === PATHS.networkNotifications && unreadNoticeCount > 0 ? (
                <span
                  className={cn(
                    'grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold',
                    isActive ? 'bg-white/20 text-white' : 'bg-brand text-white',
                  )}
                >
                  {unreadNoticeCount}
                </span>
              ) : null}
            </NavLink>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          signOut()
          onNavigate?.()
          navigate(PATHS.home)
        }}
        className="mt-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-semibold text-muted transition hover:bg-mist hover:text-ink"
      >
        <LogOut className="h-5 w-5 shrink-0" strokeWidth={1.85} />
        Logout
      </button>
    </nav>
  )
}
