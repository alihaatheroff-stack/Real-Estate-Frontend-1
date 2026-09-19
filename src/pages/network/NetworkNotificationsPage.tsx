import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { networkSettingsPath } from '@/app/router/paths'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NotificationRow } from '@/features/network/components/notifications/NotificationRow'
import { NETWORK_NOTICES } from '@/features/network/data/feed'

export function NetworkNotificationsPage() {
  return (
    <NetworkPageFrame hideRight>
      <NetworkCard padded={false} className="rounded-[28px]">
        <div className="flex items-center justify-between px-6 py-7">
          <h1 className="font-display text-[2.75rem] leading-none font-semibold tracking-tight">Notification</h1>
          <Link
            to={networkSettingsPath('notification')}
            className="grid size-12 place-items-center rounded-full text-muted transition hover:bg-mist hover:text-ink"
            aria-label="Notification settings"
          >
            <Settings className="size-7" />
          </Link>
        </div>
        <ul className="flex flex-col gap-3 px-4 pb-6">
          {NETWORK_NOTICES.map((notice) => (
            <li key={notice.id}>
              <NotificationRow notice={notice} />
            </li>
          ))}
        </ul>
      </NetworkCard>
    </NetworkPageFrame>
  )
}
