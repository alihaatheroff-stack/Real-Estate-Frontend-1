import type { Service } from '@/entities/provider/types'
import { pickPageAds } from '@/features/referrals/lib/resultFeedAds'

export type ServiceResultAd = {
  id: string
  label: string
  service: Service
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

export const FEATURED_AD_SERVICES: Service[] = [
  {
    id: 'ad-svc-escrow-timeline',
    providerId: 'ad-priya-nair',
    title: 'Escrow timeline coordination for referral closings',
    category: 'Transaction Coordination',
    subcategory: 'Consulting',
    field: 'Residential',
    description:
      'Keeps residential and light-commercial closings on track — disclosures, calendars, and calm handoffs between agents, lenders, and escrow.',
    image: '/images/stock/photo-1450101499163-c8848c66ca85.jpg',
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
    image: '/images/stock/photo-1486406146926-c627a92ad1ab.jpg',
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
    id: 'ad-svc-listing-photos',
    providerId: 'ad-lena-vargas',
    title: 'Listing photo + twilight set for new inventory',
    category: 'Marketing & Media',
    subcategory: 'Photography',
    field: 'Residential',
    description:
      'Interior, exterior, and twilight stills that help referral partners win the first showing — edited and share-ready the next day.',
    image: '/images/stock/photo-1600585154340-be6161a56a0c.jpg',
    rating: 4.9,
    reviewCount: 73,
    startingPrice: 325,
    badges: ['50 Mile Radius', 'Learning Included'],
    featured: true,
    views: 1675,
    englishLevel: 'Native Or Bilingual',
    packages: adPackages('ad-svc-photos', [325, 640, 980]),
  },
  {
    id: 'ad-svc-preoffer-inspect',
    providerId: 'ad-marcus-hale',
    title: 'Pre-offer inspection recap for buyers',
    category: 'Home Inspection',
    subcategory: 'Consulting',
    field: 'Residential',
    description:
      'Same-week pre-offer inspections with a plain-language recap so referring agents know what is a deal-breaker before they write.',
    image: '/images/stock/photo-1560518883-ce09059eeffa.jpg',
    rating: 4.8,
    reviewCount: 112,
    startingPrice: 399,
    badges: ['50 Mile Radius'],
    featured: true,
    views: 1988,
    englishLevel: 'Native Or Bilingual',
    packages: adPackages('ad-svc-inspect', [399, 575, 850]),
  },
]

export const SERVICE_RESULT_ADS: ServiceResultAd[] = [
  {
    id: 'ad-featured-escrow',
    label: 'Featured Service',
    service: FEATURED_AD_SERVICES[0]!,
  },
  {
    id: 'ad-featured-prop13',
    label: 'Featured Service',
    service: FEATURED_AD_SERVICES[1]!,
  },
  {
    id: 'ad-featured-photos',
    label: 'Featured Service',
    service: FEATURED_AD_SERVICES[2]!,
  },
  {
    id: 'ad-featured-inspect',
    label: 'Featured Service',
    service: FEATURED_AD_SERVICES[3]!,
  },
]

export function getFeaturedAdServiceById(id: string): Service | undefined {
  return FEATURED_AD_SERVICES.find((service) => service.id === id)
}

export function pickServiceResultAds(page: number, count = 2): ServiceResultAd[] {
  return pickPageAds(SERVICE_RESULT_ADS, page, count)
}
