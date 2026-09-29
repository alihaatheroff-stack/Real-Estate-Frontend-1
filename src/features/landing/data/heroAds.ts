import { PATHS } from '@/app/router/paths'

export type HeroAdBroker = {
  brokerName: string
  officeName: string
  service: string
  licenseNo: string
  address: string
  city: string
  zipcode: string
  phone: string
}

export type HeroAd = {
  id: string
  title: string
  subtitle?: string
  image: string
  href: string
  /** Extra photos shown in the expand dialog carousel. */
  images?: string[]
  /** Headline shown on the right of the expand info row. */
  expandHeadline?: string
  broker?: HeroAdBroker
  referralPercent?: number | string
  logo?: string
}

const stock = (id: string) => `/images/stock/photo-${id}.jpg`

export const TOP_LEFT_ADS: HeroAd[] = [
  {
    id: 'tl-1',
    title: '50% Referrals',
    subtitle: 'Partner spotlight',
    image: stock('1600596542815-ffad4c1539a9'),
    images: [
      stock('1600596542815-ffad4c1539a9'),
      stock('1600585154340-be6161a56a0c'),
      stock('1486406146926-c627a92ad1ab'),
      stock('1600566753190-17f0baa2a6c3'),
    ],
    href: PATHS.advertise,
    expandHeadline: '50% referral partnerships',
    referralPercent: 50,
    broker: {
      brokerName: 'Maya Patel',
      officeName: 'Valley Referral Hub',
      service: 'Referral Partnerships',
      licenseNo: 'DRE 02110488',
      address: '2100 Fresno St',
      city: 'Fresno',
      zipcode: '93721',
      phone: '(559) 555-0112',
    },
  },
  {
    id: 'tl-2',
    title: 'Harbor Homes',
    subtitle: 'Coastal listings',
    image: stock('1600585154340-be6161a56a0c'),
    images: [
      stock('1600585154340-be6161a56a0c'),
      stock('1600596542815-ffad4c1539a9'),
      stock('1613490493576-7fde63acd811'),
      stock('1564013799919-ab600027ffc6'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Coastal listings this week',
    broker: {
      brokerName: 'Ryan Cole',
      officeName: 'Harbor Homes',
      service: 'Residential Sales',
      licenseNo: 'DRE 01966210',
      address: '88 Ocean View Dr',
      city: 'Monterey',
      zipcode: '93940',
      phone: '(831) 555-0144',
    },
  },
  {
    id: 'tl-3',
    title: 'Skyline Group',
    subtitle: 'Commercial towers',
    image: stock('1486406146926-c627a92ad1ab'),
    images: [
      stock('1486406146926-c627a92ad1ab'),
      stock('1497366811353-6870744d04b2'),
      stock('1454165804606-c3d57bc86b40'),
      stock('1497366216548-37526070297c'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Commercial towers for lease',
    broker: {
      brokerName: 'Alicia Grant',
      officeName: 'Skyline Group',
      service: 'Commercial Brokerage',
      licenseNo: 'DRE 01890331',
      address: '500 Capitol Mall',
      city: 'Sacramento',
      zipcode: '95814',
      phone: '(916) 555-0177',
    },
  },
]

export const BOTTOM_LEFT_ADS: HeroAd[] = [
  {
    id: 'bl-1',
    title: 'Lux Realty',
    subtitle: 'Of California',
    image: stock('1613490493576-7fde63acd811'),
    images: [
      stock('1613490493576-7fde63acd811'),
      stock('1600607687939-ce8a6c25118c'),
      stock('1564013799919-ab600027ffc6'),
      stock('1600585154340-be6161a56a0c'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Luxury estates of California',
    broker: {
      brokerName: 'Sofia Alvarez',
      officeName: 'Lux Realty',
      service: 'Luxury Residential',
      licenseNo: 'DRE 02044119',
      address: '1200 Rodeo Dr',
      city: 'Beverly Hills',
      zipcode: '90210',
      phone: '(310) 555-0180',
    },
  },
  {
    id: 'bl-2',
    title: 'Oak & Pine',
    subtitle: 'Estate agents',
    image: stock('1600607687939-ce8a6c25118c'),
    images: [
      stock('1600607687939-ce8a6c25118c'),
      stock('1613490493576-7fde63acd811'),
      stock('1600596542815-ffad4c1539a9'),
      stock('1616486338812-3dadae4b4ace'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Estate agents near you',
    broker: {
      brokerName: 'Noah Brooks',
      officeName: 'Oak & Pine',
      service: 'Estate Sales',
      licenseNo: 'DRE 01778841',
      address: '44 Sierra Ave',
      city: 'Clovis',
      zipcode: '93612',
      phone: '(559) 555-0133',
    },
  },
  {
    id: 'bl-3',
    title: 'Metro Keys',
    subtitle: 'Urban sales',
    image: stock('1564013799919-ab600027ffc6'),
    images: [
      stock('1564013799919-ab600027ffc6'),
      stock('1486406146926-c627a92ad1ab'),
      stock('1600566753190-17f0baa2a6c3'),
      stock('1449844908441-8829872d2607'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Urban sales highlights',
    broker: {
      brokerName: 'Priya Shah',
      officeName: 'Metro Keys',
      service: 'Urban Residential',
      licenseNo: 'DRE 02155602',
      address: '901 Market St',
      city: 'San Francisco',
      zipcode: '94103',
      phone: '(415) 555-0191',
    },
  },
]

/**
 * Inner-right 2-column promo cards — sits beside the far-right tall ads
 * (Wix / reference placement).
 */
export const RIGHT_PROMO_CARDS: HeroAd[] = [
  {
    id: 'rp-1',
    title: '50% Referrals',
    subtitle: 'Partner spotlight',
    image: stock('1600596542815-ffad4c1539a9'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-2',
    title: 'Harbor Homes',
    subtitle: 'Coastal listings',
    image: stock('1600585154340-be6161a56a0c'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-3',
    title: 'Skyline Group',
    subtitle: 'Commercial towers',
    image: stock('1486406146926-c627a92ad1ab'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-4',
    title: 'Title Desk',
    subtitle: 'Closing support',
    image: stock('1450101499163-c8848c66ca85'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-5',
    title: 'InspectPro',
    subtitle: 'Home inspections',
    image: stock('1449844908441-8829872d2607'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-6',
    title: 'Coastal Escrow',
    subtitle: 'Fast closings',
    image: stock('1600566753190-17f0baa2a6c3'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-7',
    title: 'Summit Staging',
    subtitle: 'Show-ready homes',
    image: stock('1616486338812-3dadae4b4ace'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-8',
    title: 'Pine Mortgage',
    subtitle: 'Local lenders',
    image: stock('1560518883-ce09059eeffa'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-9',
    title: 'Atlas Renovations',
    subtitle: 'Value-add crews',
    image: stock('1503387762-592deb58ef4e'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-10',
    title: 'Oak & Pine',
    subtitle: 'Estate agents',
    image: stock('1600607687939-ce8a6c25118c'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-11',
    title: 'Metro Keys',
    subtitle: 'Urban sales',
    image: stock('1564013799919-ab600027ffc6'),
    href: PATHS.advertise,
  },
  {
    id: 'rp-12',
    title: 'Lux Realty',
    subtitle: 'Of California',
    image: stock('1613490493576-7fde63acd811'),
    href: PATHS.advertise,
  },
]

export const TOP_RIGHT_ADS: HeroAd[] = [
  {
    id: 'tr-1',
    title: 'Appraisers',
    subtitle: 'Verified PSPs',
    image: stock('1568605114967-8130f3a36994'),
    images: [
      stock('1568605114967-8130f3a36994'),
      stock('1600585154340-be6161a56a0c'),
      stock('1600596542815-ffad4c1539a9'),
      stock('1613490493576-7fde63acd811'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Verified appraisers this week',
    broker: {
      brokerName: 'James Holt',
      officeName: 'Holt Appraisal',
      service: 'Appraisal Service',
      licenseNo: 'BREA 300812',
      address: '455 W Shaw Ave',
      city: 'Fresno',
      zipcode: '93704',
      phone: '(559) 555-0166',
    },
  },
  {
    id: 'tr-2',
    title: 'InspectPro',
    subtitle: 'Home inspections',
    image: stock('1449844908441-8829872d2607'),
    images: [
      stock('1449844908441-8829872d2607'),
      stock('1450101499163-c8848c66ca85'),
      stock('1600566753190-17f0baa2a6c3'),
      stock('1568605114967-8130f3a36994'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Same-week home inspections',
    broker: {
      brokerName: 'David Kim',
      officeName: 'InspectPro',
      service: 'Home Inspection',
      licenseNo: 'HI 441902',
      address: '120 N Fresno St',
      city: 'Fresno',
      zipcode: '93701',
      phone: '(559) 555-0188',
    },
  },
  {
    id: 'tr-3',
    title: 'Title Desk',
    subtitle: 'Closing support',
    image: stock('1450101499163-c8848c66ca85'),
    images: [
      stock('1450101499163-c8848c66ca85'),
      stock('1449844908441-8829872d2607'),
      stock('1497366811353-6870744d04b2'),
      stock('1454165804606-c3d57bc86b40'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Title & closing support',
    broker: {
      brokerName: 'Lauren Ng',
      officeName: 'Title Desk',
      service: 'Title Services',
      licenseNo: 'CTO 552001',
      address: '770 Herndon Ave',
      city: 'Clovis',
      zipcode: '93611',
      phone: '(559) 555-0155',
    },
  },
]

export const BOTTOM_RIGHT_ADS: HeroAd[] = [
  {
    id: 'br-1',
    title: 'Law Firm',
    subtitle: 'Deal counsel',
    image: stock('1497366811353-6870744d04b2'),
    images: [
      stock('1497366811353-6870744d04b2'),
      stock('1454165804606-c3d57bc86b40'),
      stock('1497366216548-37526070297c'),
      stock('1486406146926-c627a92ad1ab'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Real estate deal counsel',
    broker: {
      brokerName: 'Marcus Reed',
      officeName: 'Reed & Partners',
      service: 'Real Estate Law',
      licenseNo: 'CA Bar 284411',
      address: '333 Van Ness Ave',
      city: 'Fresno',
      zipcode: '93721',
      phone: '(559) 555-0120',
    },
  },
  {
    id: 'br-2',
    title: 'Tax Advisory',
    subtitle: 'Property filings',
    image: stock('1454165804606-c3d57bc86b40'),
    images: [
      stock('1454165804606-c3d57bc86b40'),
      stock('1497366811353-6870744d04b2'),
      stock('1497366216548-37526070297c'),
      stock('1560518883-ce09059eeffa'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Property tax filings',
    broker: {
      brokerName: 'Helen Cho',
      officeName: 'Cho Tax Advisory',
      service: 'Tax Advisory',
      licenseNo: 'EA 119004',
      address: '65 Shaw Ave',
      city: 'Fresno',
      zipcode: '93710',
      phone: '(559) 555-0148',
    },
  },
  {
    id: 'br-3',
    title: 'Insurance Hub',
    subtitle: 'Coverage plans',
    image: stock('1497366216548-37526070297c'),
    images: [
      stock('1497366216548-37526070297c'),
      stock('1454165804606-c3d57bc86b40'),
      stock('1497366811353-6870744d04b2'),
      stock('1449844908441-8829872d2607'),
    ],
    href: PATHS.advertise,
    expandHeadline: 'Coverage plans for listings',
    broker: {
      brokerName: 'Chris Ortega',
      officeName: 'Insurance Hub',
      service: 'Property Insurance',
      licenseNo: 'DOI 0F88221',
      address: '1800 Blackstone Ave',
      city: 'Fresno',
      zipcode: '93703',
      phone: '(559) 555-0172',
    },
  },
]

export const LEFT_ADS: HeroAd[] = [TOP_LEFT_ADS[0]!, BOTTOM_LEFT_ADS[0]!]

export const RIGHT_STACK_ADS: HeroAd[] = [TOP_RIGHT_ADS[0]!, BOTTOM_RIGHT_ADS[0]!]
