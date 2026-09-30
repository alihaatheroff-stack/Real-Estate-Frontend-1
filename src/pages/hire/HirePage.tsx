import {
  ClientFieldsMarquee,
  ClientHireSection,
  HireWelcomeSection,
  LandingFaqSection,
} from '@/features/landing'

export function HirePage() {
  return (
    <>
      <HireWelcomeSection />
      <ClientFieldsMarquee />
      <ClientHireSection />
      <LandingFaqSection />
    </>
  )
}
