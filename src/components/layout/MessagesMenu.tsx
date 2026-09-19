import { Mail, MessageCircle } from 'lucide-react'
import { ModulePlatformMenu } from '@/components/layout/ModulePlatformMenu'
import {
  buildMessagePlatforms,
  platformUnreadTotal,
} from '@/features/header/data/modulePlatformMenus'

export function MessagesMenu({
  className,
  locked = false,
}: {
  className?: string
  locked?: boolean
}) {
  const platforms = buildMessagePlatforms(false)
  const unread = locked ? 0 : platformUnreadTotal(platforms)

  return (
    <ModulePlatformMenu
      className={className}
      TriggerIcon={MessageCircle}
      HeaderIcon={Mail}
      triggerLabel="Messages"
      panelTitle={`Inbox (${unread})`}
      panelSubtitle="Choose a platform to see who messaged you."
      footerLabel="See more messages"
      platforms={platforms}
      badgeCount={unread}
      locked={locked}
    />
  )
}
