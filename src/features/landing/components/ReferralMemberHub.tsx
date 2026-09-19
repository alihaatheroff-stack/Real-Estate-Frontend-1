import { useState } from 'react'
import { ReferralAwards } from '@/features/landing/components/ReferralAwards'
import { RecentlyViewedServicesCarousel } from '@/features/landing/components/ServiceGigsCarousel'
import {
  getLoggedInReferralServices,
  LOGGED_IN_REFERRAL_STRIPS,
} from '@/features/landing/data/loggedInReferralProfiles'
import {
  MEMBER_ACTIVITY_TABS,
  type MemberActivityTabId,
} from '@/features/landing/data/loggedInLanding'
import { cn } from '@/shared/lib/cn'

const TAB_TO_STRIP: Partial<
  Record<MemberActivityTabId, (typeof LOGGED_IN_REFERRAL_STRIPS)[number]['id']>
> = {
  'recently-viewed': 'recently-viewed',
  favorites: 'saved',
  recommendations: 'recommendations',
}

const PROFILE_TABS = new Set<MemberActivityTabId>(['think-tank', 'master-mind'])

export function ReferralMemberHub({ className }: { className?: string }) {
  const [activeTab, setActiveTab] = useState<MemberActivityTabId>('recently-viewed')
  const showProfiles = PROFILE_TABS.has(activeTab)
  const stripId = TAB_TO_STRIP[activeTab] ?? 'recently-viewed'
  const activeStrip =
    LOGGED_IN_REFERRAL_STRIPS.find((strip) => strip.id === stripId) ??
    LOGGED_IN_REFERRAL_STRIPS[0]

  return (
    <div className={cn(className)}>
      <div className="mb-5 flex flex-wrap items-center justify-start gap-2 sm:gap-2.5">
        {MEMBER_ACTIVITY_TABS.map((tab) => {
          const active = tab.id === activeTab
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'rounded-lg px-3 py-2 text-[0.7rem] font-semibold tracking-[0.02em] transition sm:text-xs',
                active
                  ? 'bg-brand text-white shadow-sm ring-2 ring-brand/25'
                  : 'border border-line bg-mist/70 text-ink-soft hover:border-brand/40 hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {showProfiles ? (
        <ReferralAwards embedded showHeading={false} />
      ) : (
        <RecentlyViewedServicesCarousel
          title={activeStrip.title}
          services={getLoggedInReferralServices(activeStrip.serviceIds ?? [])}
          fadeFrom="mist"
          initiallySaved={activeTab === 'favorites'}
        />
      )}
    </div>
  )
}
