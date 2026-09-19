import { Bell } from 'lucide-react'
import { ModulePlatformMenu } from '@/components/layout/ModulePlatformMenu'
import {
  buildNotificationPlatforms,
  platformUnreadTotal,
} from '@/features/header/data/modulePlatformMenus'

export function NotificationsMenu({
  className,
  locked = false,
}: {
  className?: string
  locked?: boolean
}) {
  const platforms = buildNotificationPlatforms(false)
  const unread = locked ? 0 : platformUnreadTotal(platforms)

  return (
    <ModulePlatformMenu
      className={className}
      TriggerIcon={Bell}
      HeaderIcon={Bell}
      triggerLabel="Notifications"
      panelTitle={`Notifications (${unread})`}
      panelSubtitle="Choose a platform to review your alerts."
      footerLabel="See more notifications"
      platforms={platforms}
      badgeCount={unread}
      locked={locked}
    />
  )
}
