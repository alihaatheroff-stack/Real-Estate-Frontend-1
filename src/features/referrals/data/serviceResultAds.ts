import type { Service } from '@/entities/provider/types'
import { AD_COMPANY_LOGOS } from '@/features/referrals/data/adCompanyLogos'
import { pickPageAds } from '@/features/referrals/lib/resultFeedAds'

export type ServiceResultAd = {
  id: string
  label: string
  service: Service
  companyLogo: string
  companyName: string
  companyTagline?: string
  companyLicenseNo: string
  companyPhone: string
  companyAddress: string
}

function adPackages(
  prefix: string,
  prices: [number, number, number],
): Service['packages'] {
  return [
    {
      id: `${prefix}-b`,
      name: 'Basic',
      price: prices[0],
      deliveryDays: 5,
      description: 'Scoped starter package for one assignment.',
      includes: ['Kickoff call', 'Written summary', 'Email support'],
    },
    {
      id: `${prefix}-s`,
      name: 'Standard',
      price: prices[1],
      deliveryDays: 10,
      description: 'Full delivery with revisions.',
      includes: ['Everything in Basic', 'One revision round', 'Share-ready files'],
    },
    {
      id: `${prefix}-p`,
      name: 'Premium',
      price: prices[2],
      deliveryDays: 14,
      description: 'Priority delivery with partner walkthrough.',
      includes: ['Everything in Standard', 'Live walkthrough', 'Referral packet'],
    },
  ]
}

const BALENCIAGA_LANDSCAPING_LOGO = '/images/logos/balenciaga-landscaping.jpg'

export const FEATURED_AD_SERVICES: Service[] = [
  {
    id: 'ad-svc-landscaping',
    providerId: 'ad-priya-nair',
    title: 'Full-yard landscaping & sod install crews',
    category: 'Landscaper',
    subcategory: 'Trade',
    field: 'Residential',
    description:
      'Sod, hardscape, and irrigation crews for listing-ready yards — scheduled around referral closings and photo days.',
    image: '/images/services/lawn-sod-install.png',
    rating: 4.9,
    reviewCount: 86,
    startingPrice: 850,
    badges: ['Trade', '50 Mile Radius'],
    featured: true,
    views: 2410,
    englishLevel: 'Fluent',
    packages: adPackages('ad-svc-landscaping', [850, 1650, 2800]),
  },
  {
    id: 'ad-svc-escrow-timeline',
    providerId: 'ad-priya-nair',
    title: 'Escrow timeline coordination for referral closings',
    category: 'Transaction Coordination',
    subcategory: 'Consulting',
    field: 'Residential',
    description:
      'Keeps residential and light-commercial closings on track — disclosures, calendars, and calm handoffs between agents, lenders, and escrow.',
    image: '/images/services/townhouse-exteriors.png',
    rating: 4.8,
    reviewCount: 64,
    startingPrice: 450,
    badges: ['Referral Only', 'Learning Included'],
    featured: true,
    views: 1840,
    englishLevel: 'Fluent',
    packages: adPackages('ad-svc-escrow', [450, 890, 1400]),
  },
  {
    id: 'ad-svc-prop13-appeal',
    providerId: 'ad-daniel-okada',
    title: 'Prop 13 & reassessment appeal packet',
    category: 'Property Tax',
    subcategory: 'Consulting',
    field: 'Commercial',
    description:
      'Challenge assessments and plan holding costs with a clear numbers packet before you buy, refinance, or reposition an asset.',
    image: '/images/services/construction-crew.png',
    rating: 4.9,
    reviewCount: 91,
    startingPrice: 720,
    badges: ['Referral Only'],
    featured: true,
    views: 2210,
    englishLevel: 'Native Or Bilingual',
    packages: adPackages('ad-svc-prop13', [720, 1280, 2100]),
  },
  {
    id: 'ad-svc-roof-framing',
    providerId: 'ad-lena-vargas',
    title: 'Roof framing crew for new residential builds',
    category: 'Roofing',
    subcategory: 'Trade',
    field: 'Residential',
    description:
      'Rafter handoffs and framing crews for new homes and additions — scheduled so referral partners keep construction timelines on track.',
    image: '/images/services/roof-framing.png',
    rating: 4.9,
    reviewCount: 73,
    startingPrice: 325,
    badges: ['50 Mile Radius', 'Learning Included'],
    featured: true,
    views: 1675,
    englishLevel: 'Native Or Bilingual',
    packages: adPackages('ad-svc-framing', [1800, 3600, 6200]),
  },
  {
    id: 'ad-svc-asphalt-paving',
    providerId: 'ad-marcus-hale',
    title: 'Asphalt paving & road resurfacing crew',
    category: 'Paving',
    subcategory: 'Trade',
    field: 'Commercial',
    description:
      'Machine paving and sealcoat crews for drive lanes, HOA roads, and small commercial lots — scheduled around referral closings.',
    image: '/images/services/asphalt-paving.png',
    rating: 4.8,
    reviewCount: 112,
    startingPrice: 2400,
    badges: ['Trade', '50 Mile Radius'],
    featured: true,
    views: 1988,
    englishLevel: 'Native Or Bilingual',
    packages: adPackages('ad-svc-paving', [2400, 4800, 8200]),
  },
]

const AD_ADDRESSES = [
  '214 Clovis Ave, Clovis, CA 93612',
  '1455 E Shaw Ave, Fresno, CA 93710',
  '840 Herndon Ave, Clovis, CA 93611',
  '5050 N Palm Ave, Fresno, CA 93704',
] as const

/** Other featured services cycle under the Canva partner logos (exclude landscaping). */
const PARTNER_FEATURED_SERVICES = FEATURED_AD_SERVICES.filter(
  (service) => service.id !== 'ad-svc-landscaping',
)

const BALENCIAGA_LANDSCAPING_AD: ServiceResultAd = {
  id: 'ad-featured-service-balenciaga-landscaping',
  label: 'Featured Service',
  service: FEATURED_AD_SERVICES[0]!,
  companyLogo: BALENCIAGA_LANDSCAPING_LOGO,
  companyName: 'Balenciaga Landscaping Services',
  companyTagline: 'Landscaping Services',
  companyLicenseNo: '20102410',
  companyPhone: '+1-559-555-0317',
  companyAddress: AD_ADDRESSES[0]!,
}

export const SERVICE_RESULT_ADS: ServiceResultAd[] = [
  BALENCIAGA_LANDSCAPING_AD,
  ...AD_COMPANY_LOGOS.map((logo, index) => {
    const service = PARTNER_FEATURED_SERVICES[index % PARTNER_FEATURED_SERVICES.length]!
    return {
      id: `ad-featured-service-${logo.id}`,
      label: 'Featured Service',
      service,
      companyLogo: logo.src,
      companyName: logo.companyName,
      companyTagline: logo.companyTagline,
      companyLicenseNo: String(20_100_000 + logo.id * 10_241).padStart(8, '0'),
      companyPhone: `+1-559-555-${String(300 + logo.id).padStart(4, '0')}`,
      companyAddress: AD_ADDRESSES[index % AD_ADDRESSES.length]!,
    }
  }),
]

export function getFeaturedAdServiceById(id: string): Service | undefined {
  return FEATURED_AD_SERVICES.find((service) => service.id === id)
}

export function pickServiceResultAds(page: number, count = 2): ServiceResultAd[] {
  const picked = pickPageAds(SERVICE_RESULT_ADS, page, count)
  if (page !== 1 || count <= 0) return picked

  // Always surface the landscaping partner ad on the first results page.
  if (picked.some((ad) => ad.id === BALENCIAGA_LANDSCAPING_AD.id)) return picked

  const withoutDup = picked.filter((ad) => ad.id !== BALENCIAGA_LANDSCAPING_AD.id)
  return [BALENCIAGA_LANDSCAPING_AD, ...withoutDup].slice(0, count)
}
