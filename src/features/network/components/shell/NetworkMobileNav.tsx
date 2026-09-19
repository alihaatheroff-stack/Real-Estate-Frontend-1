import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { NETWORK_MOBILE_TABS } from '@/features/network/data/nav'
import { cn } from '@/shared/lib/cn'

export function NetworkMobileNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-black/5 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:hidden">
      <div className="grid grid-cols-5">
        {NETWORK_MOBILE_TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.end}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold',
                isActive ? 'text-brand' : 'text-muted',
              )
            }
          >
            <tab.icon className="h-6 w-6" />
            {tab.label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={onOpenMenu}
          className="flex flex-col items-center gap-0.5 py-2 text-[11px] font-semibold text-muted"
        >
          <Menu className="h-6 w-6" />
          Menu
        </button>
      </div>
    </nav>
  )
}
