import { useState } from 'react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ProviderProfilesStrip } from '@/features/landing/components/ProviderProfilesStrip'
import { ServiceGigsStrip } from '@/features/landing/components/ServiceGigsStrip'
import {
  getLoggedInReferralProviders,
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
  'think-tank': 'recommendations',
  'master-mind': 'saved',
}

export function MemberActivitySection() {
  const [activeTab, setActiveTab] = useState<MemberActivityTabId>('recently-viewed')
  const stripId = TAB_TO_STRIP[activeTab] ?? 'recently-viewed'
  const activeStrip =
    LOGGED_IN_REFERRAL_STRIPS.find((strip) => strip.id === stripId) ??
    LOGGED_IN_REFERRAL_STRIPS[0]

  return (
    <Section className="py-10 sm:py-12" containerClassName="max-w-none">
      <SectionHeading
        title="Your workspace"
        subtitle="Posts, membership, favorites, and recent activity"
        className="mb-6 w-full items-start sm:flex-col sm:items-start [&>div]:max-w-none"
      />

      <div className="landing-scroll-pane -mx-1 flex gap-2 overflow-x-auto px-1 pb-3">
        {MEMBER_ACTIVITY_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition',
              activeTab === tab.id
                ? 'border-brand bg-brand text-white'
                : 'border-line bg-paper text-ink hover:border-brand/40',
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeStrip.serviceIds?.length ? (
        <ServiceGigsStrip
          title={activeStrip.title}
          services={getLoggedInReferralServices(activeStrip.serviceIds)}
          className="mt-6"
        />
      ) : (
        <ProviderProfilesStrip
          title={activeStrip.title}
          providers={getLoggedInReferralProviders(activeStrip.providerIds ?? [])}
          className="mt-6"
        />
      )}
    </Section>
  )
}
