import { Video } from 'lucide-react'
import { ModulePlatformMenu } from '@/components/layout/ModulePlatformMenu'
import {
  buildCallsPlatforms,
  platformUnreadTotal,
} from '@/features/header/data/modulePlatformMenus'

export function CallsMenu({
  className,
  locked = false,
}: {
  className?: string
  locked?: boolean
}) {
  const platforms = buildCallsPlatforms(false)
  const unread = locked ? 0 : platformUnreadTotal(platforms)

  return (
    <ModulePlatformMenu
      className={className}
      TriggerIcon={Video}
      HeaderIcon={Video}
      triggerLabel="Calls"
      panelTitle={`Calls (${unread})`}
      panelSubtitle="Choose a platform to see scheduled calls."
      footerLabel="See more calls"
      platforms={platforms}
      badgeCount={unread}
      locked={locked}
    />
  )
}
