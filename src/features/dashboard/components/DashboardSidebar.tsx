import { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { PanelLeftClose } from 'lucide-react'
import { PATHS, providerPath } from '@/app/router/paths'
import { DASHBOARD_NAV } from '@/features/dashboard/data/nav'
import { cn } from '@/shared/lib/cn'

const PROFILE_AVATAR = '/images/profile/rigoberto-peraza.jpg'

export function DashboardSidebar({
  onNavigate,
  className,
  onToggleCollapsed,
}: {
  onNavigate?: () => void
  className?: string
  onToggleCollapsed?: () => void
}) {
  return (
    <nav
      className={cn(
        'flex h-full w-full flex-col border-r border-line bg-white text-ink',
        className,
      )}
    >
      <div className="flex shrink-0 items-center gap-3 border-b border-line px-4 py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <img
            src={PROFILE_AVATAR}
            alt=""
            className="h-11 w-11 rounded-full object-cover ring-2 ring-line"
          />
          <div className="min-w-0">
            <p className="truncate font-semibold text-ink">PSP Account</p>
            <p className="text-sm text-muted">$191 balance</p>
            <Link
              to={providerPath('p1')}
              onClick={onNavigate}
              className="mt-0.5 inline-block text-xs font-medium text-brand hover:underline"
            >
              View Profile
            </Link>
          </div>
        </div>

        {onToggleCollapsed ? (
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-mist hover:text-ink"
            aria-label="Close sidebar"
            title="Close sidebar"
          >
            <PanelLeftClose className="h-5 w-5" strokeWidth={1.75} />
          </button>
        ) : null}
      </div>

      <ul className="network-hide-scroll flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-3">
        {DASHBOARD_NAV.map((item, index) => {
          const Icon = item.icon
          const prevSection = DASHBOARD_NAV[index - 1]?.section
          const showSection = Boolean(item.section && item.section !== prevSection)

          const link = item.external ? (
            <Link
              to={item.href}
              onClick={onNavigate}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-ink/70 transition hover:bg-mist hover:text-ink"
            >
              <Icon className="h-[1.15rem] w-[1.15rem] shrink-0" strokeWidth={1.75} />
              <span className="leading-snug">{item.label}</span>
            </Link>
          ) : (
            <NavLink
              to={item.href}
              end={item.href === PATHS.dashboard}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition',
                  isActive
                    ? 'bg-ink text-white'
                    : 'text-ink/70 hover:bg-mist hover:text-ink',
                )
              }
            >
              <Icon className="h-[1.15rem] w-[1.15rem] shrink-0" strokeWidth={1.75} />
              <span className="leading-snug">{item.label}</span>
            </NavLink>
          )

          return (
            <Fragment key={item.id}>
              {showSection ? (
                <li className="mt-3 px-3 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-muted">
                  {item.section}
                </li>
              ) : null}
              <li>{link}</li>
            </Fragment>
          )
        })}
      </ul>
    </nav>
  )
}
