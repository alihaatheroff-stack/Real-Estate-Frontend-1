import {
  Ban,
  Bell,
  ChevronRight,
  Eye,
  Languages,
  ShieldCheck,
  User,
  type LucideIcon,
} from 'lucide-react'
import type { SettingsTab } from '@/features/network/data/settings'
import { cn } from '@/shared/lib/cn'

const ITEMS: { id: SettingsTab; label: string; icon: LucideIcon }[] = [
  { id: 'profile', label: 'Edit Profile', icon: User },
  { id: 'language', label: 'Language', icon: Languages },
  { id: 'blocking', label: 'Blocking', icon: Ban },
  { id: 'notification', label: 'Notification', icon: Bell },
  { id: 'security', label: 'Password & Security', icon: ShieldCheck },
  { id: 'viewing', label: 'Viewing & Sharing', icon: Eye },
]

export function SettingsNav({
  tab,
  onSelect,
}: {
  tab: SettingsTab
  onSelect: (tab: SettingsTab) => void
}) {
  return (
    <nav className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)] ring-1 ring-black/[0.04]">
      {ITEMS.map((item, index) => {
        const active = tab === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              'flex w-full items-center gap-3 px-4 py-3.5 text-left text-[15px] transition',
              index > 0 && 'border-t border-[#E6EBF1]',
              active ? 'font-bold text-ink' : 'font-medium text-[#5B6B7A] hover:bg-mist/70',
            )}
          >
            <item.icon className="size-5 shrink-0" strokeWidth={1.75} />
            <span className="flex-1">{item.label}</span>
            {item.id === 'viewing' ? <ChevronRight className="size-4 shrink-0" strokeWidth={2.2} /> : null}
          </button>
        )
      })}
    </nav>
  )
}
