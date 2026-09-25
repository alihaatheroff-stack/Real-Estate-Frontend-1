import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ClientFieldsMarquee,
  ClientHireSection,
  LandingHero,
  // NewsUpdatesSection, // temporarily hidden
  ReferralsSection,
} from '@/features/landing'
import {
  CrowdfundingTeaser,
  LoggedInCrowdfundingSection,
} from '@/features/crowdfunding'
import { LoggedInNetworkSection, NetworkPreview } from '@/features/network'
import { useIsAuthenticated } from '@/features/auth'
import { splitCsv, useProviderFilters } from '@/features/search'
import { scrollToSectionInstant } from '@/shared/lib/scrollToSection'

type LocationState = {
  scrollToSection?: string
}

export function LandingPage() {
  const isAuthenticated = useIsAuthenticated()
  const { hash, state } = useLocation()
  const scrollToSection = (state as LocationState | null)?.scrollToSection
  const { filters, updateFilter, toSearchParams } = useProviderFilters()
  const isClientRole = splitCsv(filters.role).some(
    (value) => value.toLowerCase() === 'client',
  )

  useLayoutEffect(() => {
    const sectionId = scrollToSection || hash.replace(/^#/, '') || ''
    if (!sectionId) return

    if (scrollToSectionInstant(sectionId)) return

    const frame = window.requestAnimationFrame(() => {
      scrollToSectionInstant(sectionId)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [scrollToSection, hash, isAuthenticated])

  const hero = (
    <LandingHero
      filters={filters}
      onChange={updateFilter}
      toSearchParams={toSearchParams}
    />
  )

  // Client role: landing ends at Hire CTA — no referrals / crowdfunding / network below.
  if (isClientRole) {
    return (
      <>
        {hero}
        <ClientFieldsMarquee />
        <ClientHireSection />
      </>
    )
  }

  if (isAuthenticated) {
    return (
      <>
        {hero}
        {/* Temporarily hidden — restore when ready
        <NewsUpdatesSection />
        */}
        <ReferralsSection />
        <LoggedInCrowdfundingSection />
        <LoggedInNetworkSection />
      </>
    )
  }

  return (
    <>
      {hero}
      <ReferralsSection />
      <CrowdfundingTeaser />
      <NetworkPreview />
    </>
  )
}
