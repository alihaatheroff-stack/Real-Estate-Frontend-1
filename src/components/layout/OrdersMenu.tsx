import { Package } from 'lucide-react'
import { ModulePlatformMenu } from '@/components/layout/ModulePlatformMenu'
import {
  buildOrdersPlatforms,
  platformUnreadTotal,
} from '@/features/header/data/modulePlatformMenus'

export function OrdersMenu({
  className,
  locked = false,
}: {
  className?: string
  locked?: boolean
}) {
  const platforms = buildOrdersPlatforms(false)
  const unread = locked ? 0 : platformUnreadTotal(platforms)

  return (
    <ModulePlatformMenu
      className={className}
      TriggerIcon={Package}
      HeaderIcon={Package}
      triggerLabel="Orders"
      panelTitle={`Orders (${unread})`}
      panelSubtitle="Choose a platform to review your orders."
      footerLabel="See all orders"
      platforms={platforms}
      badgeCount={unread}
      locked={locked}
    />
  )
}
