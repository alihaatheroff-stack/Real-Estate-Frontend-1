import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { scrollToSectionInstant, scrollWindowToInstant } from '@/shared/lib/scrollToSection'

type LocationState = {
  scrollToSection?: string
}

export function RootLayout() {
  const { pathname, hash, state } = useLocation()
  const scrollToSection = (state as LocationState | null)?.scrollToSection

  useLayoutEffect(() => {
    const sectionId = scrollToSection || hash.replace(/^#/, '') || ''

    // Section targets are positioned by LandingPage after its tree mounts.
    // Avoid resetting to top here — that would hide the Explore / Learn more CTAs.
    if (sectionId) {
      scrollToSectionInstant(sectionId)
      return
    }

    scrollWindowToInstant(0)
  }, [pathname, hash, scrollToSection])

  return <Outlet />
}
