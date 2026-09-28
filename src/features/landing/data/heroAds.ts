import { PATHS } from '@/app/router/paths'

export type HeroAd = {
  id: string
  title: string
  subtitle?: string
  image: string
  href: string
}

const stock = (id: string) => `/images/stock/photo-${id}.jpg`

export const TOP_LEFT_ADS: HeroAd[] = [
  {
    id: 'tl-1',
    title: '50% Referrals',
    subtitle: 'Partner spotlight',
    image: stock('1600596542815-ffad4c1539a9'),
    href: PATHS.advertise,
  },
  {
    id: 'tl-2',
    title: 'Harbor Homes',
    subtitle: 'Coastal listings',
    image: stock('1600585154340-be6161a56a0c'),
    href: PATHS.advertise,
  },
  {
    id: 'tl-3',
    title: 'Skyline Group',
    subtitle: 'Commercial towers',
    image: stock('1486406146926-c627a92ad1ab'),
    href: PATHS.advertise,
  },
]

export const BOTTOM_LEFT_ADS: HeroAd[] = [
  {
    id: 'bl-1',
    title: 'Lux Realty',
    subtitle: 'Of California',
    image: stock('1613490493576-7fde63acd811'),
    href: PATHS.advertise,
  },
  {
    id: 'bl-2',
    title: 'Oak & Pine',
    subtitle: 'Estate agents',
    image: stock('1600607687939-ce8a6c25118c'),
    href: PATHS.advertise,
  },
  {
    id: 'bl-3',
    title: 'Metro Keys',
    subtitle: 'Urban sales',
    image: stock('1564013799919-ab600027ffc6'),
    href: PATHS.advertise,
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
    href: PATHS.advertise,
  },
  {
    id: 'tr-2',
    title: 'InspectPro',
    subtitle: 'Home inspections',
    image: stock('1449844908441-8829872d2607'),
    href: PATHS.advertise,
  },
  {
    id: 'tr-3',
    title: 'Title Desk',
    subtitle: 'Closing support',
    image: stock('1450101499163-c8848c66ca85'),
    href: PATHS.advertise,
  },
]

export const BOTTOM_RIGHT_ADS: HeroAd[] = [
  {
    id: 'br-1',
    title: 'Law Firm',
    subtitle: 'Deal counsel',
    image: stock('1497366811353-6870744d04b2'),
    href: PATHS.advertise,
  },
  {
    id: 'br-2',
    title: 'Tax Advisory',
    subtitle: 'Property filings',
    image: stock('1454165804606-c3d57bc86b40'),
    href: PATHS.advertise,
  },
  {
    id: 'br-3',
    title: 'Insurance Hub',
    subtitle: 'Coverage plans',
    image: stock('1497366216548-37526070297c'),
    href: PATHS.advertise,
  },
]

export const LEFT_ADS: HeroAd[] = [TOP_LEFT_ADS[0]!, BOTTOM_LEFT_ADS[0]!]

export const RIGHT_STACK_ADS: HeroAd[] = [TOP_RIGHT_ADS[0]!, BOTTOM_RIGHT_ADS[0]!]
