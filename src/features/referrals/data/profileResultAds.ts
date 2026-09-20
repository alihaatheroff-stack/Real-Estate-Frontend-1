import type { Provider } from '@/entities/provider/types'
import { pickPageAds } from '@/features/referrals/lib/resultFeedAds'

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
  {
    id: 'ad-lena-vargas',
    name: 'Lena Vargas',
    title: 'Listing Photographer',
    company: 'Vargas Media Studio',
    licenseNo: '02188340',
    dreNo: '01955102',
    type: 'professional',
    specialty: 'Listing photography & twilight sets',
    city: 'Clovis',
    state: 'CA',
    country: 'United States',
    zip: '93611',
    lat: 36.8314,
    lng: -119.6912,
    radiusMiles: 35,
    rating: 4.9,
    reviewCount: 73,
    salesVolume: 0,
    dealsClosed: 0,
    referralShare: 40,
    learningIncluded: true,
    image: '/images/avatars/avatar-12.jpg',
    verified: true,
    about:
      'Turns listings into scroll-stopping stills — interiors, exteriors, and twilight sets that help referral partners win the first showing.',
    languages: ['English', 'Spanish'],
    englishLevel: 'Native Or Bilingual',
    hourlyRateMin: 85,
    hourlyRateMax: 140,
    joinedDate: 'Apr 2020',
    skills: ['Interior Photography', 'Twilight Shots', 'Listing Edits'],
    gender: 'Female',
    email: 'lena.vargas@example.com',
    phone: '(559) 555-0441',
    projectSuccess: 73,
    totalServices: 2,
    completedServices: 68,
    inQueueServices: 2,
  },
  {
    id: 'ad-marcus-hale',
    name: 'Marcus Hale',
    title: 'Home Inspector',
    company: 'Hale Inspection Group',
    licenseNo: '02044119',
    dreNo: '01877230',
    type: 'trade',
    specialty: 'Pre-offer inspection recaps',
    city: 'Fresno',
    state: 'CA',
    country: 'United States',
    zip: '93704',
    lat: 36.8011,
    lng: -119.8014,
    radiusMiles: 50,
    rating: 4.8,
    reviewCount: 112,
    salesVolume: 0,
    dealsClosed: 0,
    referralShare: 35,
    learningIncluded: true,
    image: '/images/avatars/marcus-hale.png',
    verified: true,
    about:
      'Same-week pre-offer inspections with plain-language recaps — so buyers and referring agents know what is a deal-breaker before they write.',
    languages: ['English'],
    englishLevel: 'Native Or Bilingual',
    hourlyRateMin: 95,
    hourlyRateMax: 165,
    joinedDate: 'Jun 2017',
    skills: ['Residential Inspection', 'Roof & HVAC', 'Repair Estimates'],
    gender: 'Male',
    email: 'marcus.hale@example.com',
    phone: '(559) 555-0618',
    projectSuccess: 112,
    totalServices: 2,
    completedServices: 104,
    inQueueServices: 3,
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
  {
    id: 'ad-featured-lena',
    label: 'Featured Agent',
    providerId: 'ad-lena-vargas',
  },
  {
    id: 'ad-featured-marcus',
    label: 'Featured Agent',
    providerId: 'ad-marcus-hale',
  },
]

export type ProfileResultAdSlot = {
  ad: ProfileResultAd
  provider: Provider
}

export function getFeaturedAdProviderById(id: string): Provider | undefined {
  return FEATURED_AD_PROVIDERS.find((provider) => provider.id === id)
}

export function pickProfileResultAds(page: number, count = 2): ProfileResultAdSlot[] {
  return pickPageAds(PROFILE_RESULT_ADS, page, count).flatMap((ad) => {
    const provider = getFeaturedAdProviderById(ad.providerId)
    return provider ? [{ ad, provider }] : []
  })
}
