import type { Provider } from '@/entities/provider/types'

export type ProfileResultAd = {
  id: string
  label: string
  providerId: string
}

/**
 * Sponsored-only profiles — not part of the organic PROVIDERS directory,
 * so each results card stays a unique person (no Maya/Rigoberto double-ups).
 */
export const FEATURED_AD_PROVIDERS: Provider[] = [
  {
    id: 'ad-priya-nair',
    name: 'Priya Nair',
    title: 'Transaction Coordinator',
    company: 'Nair Closing Partners',
    licenseNo: '02110488',
    dreNo: '01922011',
    type: 'professional',
    specialty: 'Listing & escrow coordination',
    city: 'Clovis',
    state: 'CA',
    country: 'United States',
    zip: '93611',
    lat: 36.8252,
    lng: -119.7029,
    radiusMiles: 40,
    rating: 4.8,
    reviewCount: 64,
    salesVolume: 18000000,
    dealsClosed: 210,
    referralShare: 45,
    learningIncluded: true,
    image: '/images/avatars/avatar-5.jpg',
    verified: true,
    about:
      'Keeps residential and light-commercial closings on track — timelines, disclosures, and calm handoffs between agents, lenders, and escrow.',
    languages: ['English', 'Hindi'],
    englishLevel: 'Fluent',
    hourlyRateMin: 55,
    hourlyRateMax: 95,
    joinedDate: 'Mar 2021',
    skills: ['Escrow Coordination', 'Disclosure Review', 'Closing Timeline'],
    gender: 'Female',
    email: 'priya.nair@example.com',
    phone: '(559) 555-0288',
    projectSuccess: 210,
    totalServices: 2,
    completedServices: 198,
    inQueueServices: 3,
  },
  {
    id: 'ad-daniel-okada',
    name: 'Daniel Okada',
    title: 'Property Tax Consultant',
    company: 'Okada Assessment Advisors',
    licenseNo: '02077301',
    dreNo: '01890440',
    type: 'professional',
    specialty: 'Prop 13 & reassessment appeals',
    city: 'Fresno',
    state: 'CA',
    country: 'United States',
    zip: '93710',
    lat: 36.8125,
    lng: -119.747,
    radiusMiles: 55,
    rating: 4.9,
    reviewCount: 91,
    salesVolume: 0,
    dealsClosed: 0,
    referralShare: 50,
    learningIncluded: true,
    image: '/images/avatars/daniel-okada.png',
    verified: true,
    about:
      'Helps owners and investors challenge assessments and plan holding costs — clear numbers before you buy, refinance, or reposition an asset.',
    languages: ['English', 'Japanese'],
    englishLevel: 'Native Or Bilingual',
    hourlyRateMin: 120,
    hourlyRateMax: 180,
    joinedDate: 'Aug 2018',
    skills: ['Tax Appeals', 'Assessment Review', 'Acquisition Diligence'],
    gender: 'Male',
    email: 'daniel.okada@example.com',
    phone: '(559) 555-0312',
    projectSuccess: 91,
    totalServices: 2,
    completedServices: 84,
    inQueueServices: 2,
  },
]

export const PROFILE_RESULT_ADS: ProfileResultAd[] = [
  {
    id: 'ad-featured-priya',
    label: 'Featured Agent',
    providerId: 'ad-priya-nair',
  },
  {
    id: 'ad-featured-daniel',
    label: 'Featured Agent',
    providerId: 'ad-daniel-okada',
  },
]

export type ProfileResultAdSlot = {
  ad: ProfileResultAd
  provider: Provider
}

export function getFeaturedAdProviderById(id: string): Provider | undefined {
  return FEATURED_AD_PROVIDERS.find((provider) => provider.id === id)
}

export function pickProfileResultAd(page: number): ProfileResultAdSlot | null {
  const ad = PROFILE_RESULT_ADS[page % PROFILE_RESULT_ADS.length]!
  const provider = getFeaturedAdProviderById(ad.providerId)
  if (!provider) return null
  return { ad, provider }
}

/** Insert index that shifts slightly per page (YouTube-style in-feed slot). */
export function profileAdInsertIndex(page: number, itemCount: number): number {
  if (itemCount <= 0) return 0
  const preferred = 2 + (page % 3)
  return Math.min(preferred, itemCount)
}
