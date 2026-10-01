import { Navigate, useLocation } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { useIsAuthenticated } from '@/features/auth'
import {
  LandingAssistantWidget,
  LandingFaqSection,
  LoggedInHomeHub,
  ReferralsSection,
} from '@/features/landing'
import { LoggedInCrowdfundingSection } from '@/features/crowdfunding'
import { LoggedInNetworkSection } from '@/features/network'

/**
 * Personalized member home (`/home`) — signed-in only.
 * Rows reflect the member’s searches, views, hires, and saved activity (demo data for now).
 * Guests are sent to sign-in; marketing landing stays at `/`.
 */
export function MemberHomePage() {
  const isAuthenticated = useIsAuthenticated()
  const location = useLocation()

  if (!isAuthenticated) {
    return (
      <Navigate
        to={PATHS.signIn}
        replace
        state={{ from: location.pathname + location.search }}
      />
    )
  }

  return (
    <>
      <LoggedInHomeHub />
      <ReferralsSection />
      <LoggedInCrowdfundingSection />
      <LoggedInNetworkSection />
      <LandingFaqSection />
      <LandingAssistantWidget />
    </>
  )
}
