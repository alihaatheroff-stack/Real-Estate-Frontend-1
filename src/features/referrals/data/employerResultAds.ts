import type { Employer } from '@/entities/employer/types'
import { AD_COMPANY_LOGOS } from '@/features/referrals/data/adCompanyLogos'
import { employerCoords } from '@/features/referrals/lib/geo'
import { pickPageAds } from '@/features/referrals/lib/resultFeedAds'

export type EmployerResultAd = {
  id: string
  label: string
  employer: Employer
  companyLogo: string
  companyName: string
  companyTagline?: string
  companyLicenseNo: string
  companyPhone: string
  companyAddress: string
}

/** Tight Canva crop (same asset as partner logo 14) — not the padded JPG. */
const DIVERSE_MORTGAGE_LOGO = '/images/logos/14.svg'
const BALENCIAGA_LANDSCAPING_LOGO = '/images/logos/balenciaga-landscaping.jpg'

type AdEmployerSeed = {
  id: string
  name: string
  logoInitials: string
  logoColor: string
  logoUrl?: string
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
}

function adEmployer(seed: AdEmployerSeed): Employer {
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
    logoUrl: seed.logoUrl,
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

const FEATURED_AD_EMPLOYER_SEEDS: AdEmployerSeed[] = [
  {
    id: 'ad-office-balenciaga-landscaping',
    name: 'Balenciaga Landscaping Services',
    logoInitials: 'BL',
    logoColor: '#15803D',
    logoUrl: BALENCIAGA_LANDSCAPING_LOGO,
    tagline: 'Landscaping Services',
    category: 'construction-trade',
    extraCategories: ['Landscaping'],
    city: 'Fresno',
    state: 'CA',
    rating: 4.9,
    reviewCount: 42,
    openProjects: 3,
    foundedYear: 2012,
    employees: '10-20',
    about:
      'Full-yard landscaping and sod crews for referral partners — clean scopes, same-week starts, and photo-ready outdoor finishes.',
  },
  {
    id: 'ad-office-sierra-title',
    name: 'Sierra Title Collective',
    logoInitials: 'ST',
    logoColor: '#0F4C81',
    logoUrl: AD_COMPANY_LOGOS[6]!.src, // Keystone Properties — commercial services
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
  },
  {
    id: 'ad-office-pacific-crest',
    name: 'Pacific Crest Media',
    logoInitials: 'PC',
    logoColor: '#C45C3E',
    logoUrl: AD_COMPANY_LOGOS[3]!.src, // Pacific Crest CRE
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
  },
  {
    id: 'ad-office-northstar',
    name: 'Northstar Inspection Group',
    logoInitials: 'NI',
    logoColor: '#0b1f3a',
    logoUrl: AD_COMPANY_LOGOS[5]!.src, // Northgate Advisors
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
  },
  {
    id: 'ad-office-redwood-mtg',
    name: 'Redwood Mortgage Desk',
    logoInitials: 'RM',
    logoColor: '#1E3A5F',
    logoUrl: DIVERSE_MORTGAGE_LOGO,
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
  },
]

const AD_CITIES = [
  { city: 'Fresno', state: 'CA' },
  { city: 'Clovis', state: 'CA' },
  { city: 'Los Angeles', state: 'CA' },
  { city: 'New York', state: 'NY' },
] as const

const AD_CATEGORIES = [
  'brokerage',
  'development',
  'legal-title',
  'mortgage-finance',
  'property-management',
  'marketing-media',
] as const

function initialsFromName(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

const LOGO_COLORS = [
  '#0F4C81',
  '#1E3A5F',
  '#0b1f3a',
  '#C45C3E',
  '#0F766E',
  '#334155',
  '#0369A1',
  '#9A3412',
] as const

/** Base featured offices (kept for id lookups / deep links). */
export const FEATURED_AD_EMPLOYERS: Employer[] = FEATURED_AD_EMPLOYER_SEEDS.map(adEmployer)

/** Partner-logo featured employers for result cards (same set as other marketplace pages). */
const PARTNER_FEATURED_EMPLOYERS: Employer[] = AD_COMPANY_LOGOS.map((logo, index) => {
  const base = FEATURED_AD_EMPLOYER_SEEDS[index % FEATURED_AD_EMPLOYER_SEEDS.length]!
  const place = AD_CITIES[index % AD_CITIES.length]!
  const category = AD_CATEGORIES[index % AD_CATEGORIES.length]!
  const isMortgage = category === 'mortgage-finance'

  return adEmployer({
    ...base,
    id: `ad-office-partner-${logo.id}`,
    name: logo.companyName,
    logoInitials: initialsFromName(logo.companyName),
    logoColor: LOGO_COLORS[index % LOGO_COLORS.length]!,
    logoUrl: isMortgage ? DIVERSE_MORTGAGE_LOGO : logo.src,
    tagline: logo.companyTagline,
    category,
    city: place.city,
    state: place.state,
    about: `${logo.companyName} — ${logo.companyTagline}. Partner office hiring for referral projects across ${place.city}.`,
  })
})

const AD_ADDRESSES = [
  '214 Clovis Ave, Clovis, CA 93612',
  '1455 E Shaw Ave, Fresno, CA 93710',
  '840 Herndon Ave, Clovis, CA 93611',
  '5050 N Palm Ave, Fresno, CA 93704',
] as const

function toEmployerResultAd(
  employer: Employer,
  index: number,
  overrides?: Partial<Pick<EmployerResultAd, 'companyLogo' | 'companyName' | 'companyTagline'>>,
): EmployerResultAd {
  const logo = overrides?.companyLogo ?? employer.logoUrl ?? AD_COMPANY_LOGOS[index % AD_COMPANY_LOGOS.length]!.src
  const companyName = overrides?.companyName ?? employer.name
  return {
    id: `ad-featured-${employer.id.replace(/^ad-office-/, '')}`,
    label: 'Featured Office',
    employer,
    companyLogo: logo,
    companyName,
    companyTagline: overrides?.companyTagline ?? employer.tagline,
    companyLicenseNo: String(20_200_000 + (index + 1) * 9_137).padStart(8, '0'),
    companyPhone: `+1-559-555-${String(400 + index).padStart(4, '0')}`,
    companyAddress: AD_ADDRESSES[index % AD_ADDRESSES.length]!,
  }
}

export const EMPLOYER_RESULT_ADS: EmployerResultAd[] = [
  ...FEATURED_AD_EMPLOYERS.map((employer, index) =>
    toEmployerResultAd(employer, index, {
      companyLogo: employer.logoUrl,
      companyName: employer.name,
      companyTagline: employer.tagline,
    }),
  ),
  ...PARTNER_FEATURED_EMPLOYERS.map((employer, index) => {
    const logo = AD_COMPANY_LOGOS[index % AD_COMPANY_LOGOS.length]!
    return toEmployerResultAd(employer, index + FEATURED_AD_EMPLOYERS.length, {
      companyLogo: employer.logoUrl ?? logo.src,
      companyName: logo.companyName,
      companyTagline: logo.companyTagline,
    })
  }),
]

export function getFeaturedAdEmployerById(id: string): Employer | undefined {
  return (
    FEATURED_AD_EMPLOYERS.find((employer) => employer.id === id) ??
    PARTNER_FEATURED_EMPLOYERS.find((employer) => employer.id === id)
  )
}

export function pickEmployerResultAds(page: number, count = 2): EmployerResultAd[] {
  return pickPageAds(EMPLOYER_RESULT_ADS, page, count)
}
