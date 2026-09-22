import { Link } from 'react-router-dom'
import { SquarePen } from 'lucide-react'
import { ModulePlatformMenu } from '@/components/layout/ModulePlatformMenu'
import { PATHS } from '@/app/router/paths'
import { buildWritingPlatforms } from '@/features/header/data/modulePlatformMenus'

export function WritingMenu({
  className,
  locked = false,
}: {
  className?: string
  locked?: boolean
}) {
  const platforms = buildWritingPlatforms(false)

  return (
    <ModulePlatformMenu
      className={className}
      TriggerIcon={SquarePen}
      HeaderIcon={SquarePen}
      triggerLabel="Create post"
      panelTitle="Create post"
      panelSubtitle="Choose a platform, then write and publish your post."
      footerLabel="Open composer"
      platforms={platforms}
      badgeCount={0}
      locked={locked}
      footer={
        <Link
          to={`${PATHS.networkFeed}?compose=1`}
          className="text-sm font-medium text-brand transition hover:underline"
        >
          Open composer
        </Link>
      }
    />
  )
}
