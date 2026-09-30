import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SquarePen } from 'lucide-react'
import { ModulePlatformMenu } from '@/components/layout/ModulePlatformMenu'
import { PATHS } from '@/app/router/paths'
import { buildWritingPlatforms } from '@/features/header/data/modulePlatformMenus'
import { ReferralPostComposer } from '@/features/referrals/components/ReferralPostComposer'

export function WritingMenu({
  className,
  locked = false,
}: {
  className?: string
  locked?: boolean
}) {
  const platforms = buildWritingPlatforms(false)
  const [referralComposerOpen, setReferralComposerOpen] = useState(false)

  return (
    <>
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
        onPlatformOpen={(platform) => {
          if (platform.id === 'referral') {
            setReferralComposerOpen(true)
            return true
          }
          return false
        }}
        footer={
          <Link
            to={`${PATHS.networkFeed}?compose=1`}
            className="text-sm font-medium text-brand transition hover:underline"
          >
            Open composer
          </Link>
        }
      />
      <ReferralPostComposer
        open={referralComposerOpen}
        onClose={() => setReferralComposerOpen(false)}
      />
    </>
  )
}
