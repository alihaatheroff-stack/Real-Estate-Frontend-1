import {
  CrowdfundingTeaser,
  FieldsGrid,
  LandingHero,
  NetworkPreview,
  ReferralsSection,
  TopProvidersSection,
} from '@/features/landing'

export function LandingPage() {
  return (
    <>
      <LandingHero />
      <FieldsGrid />
      <ReferralsSection />
      <CrowdfundingTeaser />
      <NetworkPreview />
      <TopProvidersSection />
    </>
  )
}
