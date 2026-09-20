import type { Employer } from '@/entities/employer/types'
import { employerCoords } from '@/features/referrals/lib/geo'
import { pickPageAds } from '@/features/referrals/lib/resultFeedAds'

export type EmployerResultAd = {
  id: string
  label: string
  employer: Employer
}

function adEmployer(seed: {
  id: string
  name: string
  logoInitials: string
  logoColor: string
  tagline: string
  category: string
  extraCategories?: string[]
  city: string
  state: string
  rating: number
  reviewCount: number
  openProjects: number
  foundedYear: number
  employees: string
  about: string
}): Employer {
  const [lat, lng] = employerCoords(seed.city, seed.id)
  const categoryLabel = seed.category
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')

  return {
    id: seed.id,
    name: seed.name,
    logoInitials: seed.logoInitials,
    logoColor: seed.logoColor,
    tagline: seed.tagline,
    category: seed.category,
    categories: [categoryLabel, ...(seed.extraCategories ?? [])],
    city: seed.city,
    state: seed.state,
    lat,
    lng,
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    openProjects: seed.openProjects,
    foundedYear: seed.foundedYear,
    employees: seed.employees,
    team: [
      {
        id: `${seed.id}-lead`,
        name: `${seed.name.split(' ')[0]} Desk`,
        role: 'Partner lead',
      },
    ],
    email: `${seed.id.replaceAll('-', '.')}@example.com`,
    phone: '(555) 123-4567',
    about: seed.about,
    projects: [],
    positions: [],
    reviews: [],
  }
}

export const FEATURED_AD_EMPLOYERS: Employer[] = [
  adEmployer({
    id: 'ad-office-sierra-title',
    name: 'Sierra Title Collective',
    logoInitials: 'ST',
    logoColor: '#0F4C81',
    tagline: 'Title, escrow & referral closings',
    category: 'legal-title',
    extraCategories: ['Escrow'],
    city: 'Fresno',
    state: 'CA',
    rating: 4.9,
    reviewCount: 54,
    openProjects: 3,
    foundedYear: 2011,
    employees: '10-20',
    about:
      'Central Valley title desk that keeps referral closings on calendar — clean commitments, calm escrow notes, and same-day status for partners.',
  }),
  adEmployer({
    id: 'ad-office-pacific-crest',
    name: 'Pacific Crest Media',
    logoInitials: 'PC',
    logoColor: '#C45C3E',
    tagline: 'Listing media for referral teams',
    category: 'marketing-media',
    city: 'Clovis',
    state: 'CA',
    rating: 4.8,
    reviewCount: 41,
    openProjects: 4,
    foundedYear: 2016,
    employees: '5-10',
    about:
      'Photo, twilight, and short-form listing media for brokerages that want listing-ready assets without a two-week wait.',
  }),
  adEmployer({
    id: 'ad-office-northstar',
    name: 'Northstar Inspection Group',
    logoInitials: 'NI',
    logoColor: '#1B6B4F',
    tagline: 'Pre-offer inspections for buyer desks',
    category: 'construction-trade',
    city: 'Fresno',
    state: 'CA',
    rating: 4.7,
    reviewCount: 68,
    openProjects: 2,
    foundedYear: 2009,
    employees: '10-20',
    about:
      'Same-week residential inspections with repair recaps written for agents — so referring offices can advise before the offer goes in.',
  }),
  adEmployer({
    id: 'ad-office-redwood-mtg',
    name: 'Redwood Mortgage Desk',
    logoInitials: 'RM',
    logoColor: '#1E3A5F',
    tagline: 'Purchase & refi desk for partners',
    category: 'mortgage-finance',
    extraCategories: ['Brokerage'],
    city: 'Los Angeles',
    state: 'CA',
    rating: 4.8,
    reviewCount: 77,
    openProjects: 5,
    foundedYear: 2014,
    employees: '20-30',
    about:
      'Purchase and refi coordination for referral partners — pre-approvals, rate locks, and a single point of contact through funding.',
  }),
]

export const EMPLOYER_RESULT_ADS: EmployerResultAd[] = [
  {
    id: 'ad-featured-sierra-title',
    label: 'Featured Office',
    employer: FEATURED_AD_EMPLOYERS[0]!,
  },
  {
    id: 'ad-featured-pacific-crest',
    label: 'Featured Office',
    employer: FEATURED_AD_EMPLOYERS[1]!,
  },
  {
    id: 'ad-featured-northstar',
    label: 'Featured Office',
    employer: FEATURED_AD_EMPLOYERS[2]!,
  },
  {
    id: 'ad-featured-redwood-mtg',
    label: 'Featured Office',
    employer: FEATURED_AD_EMPLOYERS[3]!,
  },
]

export function getFeaturedAdEmployerById(id: string): Employer | undefined {
  return FEATURED_AD_EMPLOYERS.find((employer) => employer.id === id)
}

export function pickEmployerResultAds(page: number, count = 2): EmployerResultAd[] {
  return pickPageAds(EMPLOYER_RESULT_ADS, page, count)
}
