import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LandingHero, NewsUpdatesSection, ReferralsSection } from '@/features/landing'
import {
  CrowdfundingTeaser,
  LoggedInCrowdfundingSection,
} from '@/features/crowdfunding'
import { LoggedInNetworkSection, NetworkPreview } from '@/features/network'
import { useIsAuthenticated } from '@/features/auth'
import { scrollToSectionInstant } from '@/shared/lib/scrollToSection'

type LocationState = {
  scrollToSection?: string
}

export function LandingPage() {
  const isAuthenticated = useIsAuthenticated()
  const { hash, state } = useLocation()
  const scrollToSection = (state as LocationState | null)?.scrollToSection

  useLayoutEffect(() => {
    const sectionId = scrollToSection || hash.replace(/^#/, '') || ''
    if (!sectionId) return

    if (scrollToSectionInstant(sectionId)) return

    const frame = window.requestAnimationFrame(() => {
      scrollToSectionInstant(sectionId)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [scrollToSection, hash, isAuthenticated])

  if (isAuthenticated) {
    return (
      <>
        <LandingHero />
        <NewsUpdatesSection />
        <ReferralsSection />
        <LoggedInCrowdfundingSection />
        <LoggedInNetworkSection />
      </>
    )
  }

  return (
    <>
      <LandingHero />
      <ReferralsSection />
      <CrowdfundingTeaser />
      <NetworkPreview />
    </>
  )
}
