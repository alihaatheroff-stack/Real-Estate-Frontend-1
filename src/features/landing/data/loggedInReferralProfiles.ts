import { getProviderById, getServiceById } from '@/features/referrals/api/repository'
import type { Provider, Service } from '@/entities/provider/types'

export type LoggedInReferralStrip = {
  id: 'recently-viewed' | 'saved' | 'recommendations'
  title: string
  /** Service gig cards (Fiverr-style). */
  serviceIds?: string[]
  /** Provider profile cards. */
  providerIds?: string[]
}

/** Curated demo lists for the logged-in referrals landing experience. */
export const LOGGED_IN_REFERRAL_STRIPS: LoggedInReferralStrip[] = [
  {
    id: 'recently-viewed',
    title: 'Recently viewed',
    serviceIds: ['s1', 's2', 's4', 's5', 's3', 's6', 's7', 's8', 's9', 's10'],
  },
  {
    id: 'saved',
    title: 'Saved/favorites',
    serviceIds: ['s8', 's7', 's6', 's3', 's10', 's9', 's5', 's4', 's2', 's1'],
  },
  {
    id: 'recommendations',
    title: 'Recommendations',
    serviceIds: ['s5', 's9', 's2', 's10', 's1', 's4', 's7', 's3', 's6', 's8'],
  },
]

export function getLoggedInReferralProviders(providerIds: string[]): Provider[] {
  return providerIds
    .map((id) => getProviderById(id))
    .filter((provider): provider is Provider => provider != null)
}

export function getLoggedInReferralServices(serviceIds: string[]): Service[] {
  return serviceIds
    .map((id) => getServiceById(id))
    .filter((service): service is Service => service != null)
}
