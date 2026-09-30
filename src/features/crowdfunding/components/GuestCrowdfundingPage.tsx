import { CrowdfundingWelcomeSection } from '@/features/crowdfunding/components/CrowdfundingWelcomeSection'
import { GuestCrowdfundingSection } from '@/features/crowdfunding/components/GuestCrowdfundingSection'
import { LandingFaqSection } from '@/features/landing'

export function GuestCrowdfundingPage() {
  return (
    <>
      <CrowdfundingWelcomeSection />
      <GuestCrowdfundingSection />
      <LandingFaqSection />
    </>
  )
}
