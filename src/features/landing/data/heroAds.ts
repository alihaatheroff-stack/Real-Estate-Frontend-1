import { PATHS } from '@/app/router/paths'

export type HeroAd = {
  id: string
  title: string
  subtitle?: string
  image: string
  href: string
}

export const LEFT_ADS: HeroAd[] = [
  {
    id: 'l1',
    title: '50% Referrals',
    subtitle: 'Partner spotlight',
    image:
      '/images/stock/photo-1600596542815-ffad4c1539a9.jpg',
    href: PATHS.advertise,
  },
  {
    id: 'l2',
    title: 'Lux Realty',
    subtitle: 'Of California',
    image:
      '/images/stock/photo-1613490493576-7fde63acd811.jpg',
    href: PATHS.advertise,
  },
]

export const RIGHT_STACK_ADS: HeroAd[] = [
  {
    id: 'r1',
    title: 'Appraisers',
    subtitle: 'Verified PSPs',
    image:
      '/images/stock/photo-1568605114967-8130f3a36994.jpg',
    href: PATHS.advertise,
  },
  {
    id: 'r2',
    title: 'Law Firm',
    subtitle: 'Deal counsel',
    image:
      '/images/stock/photo-1497366811353-6870744d04b2.jpg',
    href: PATHS.advertise,
  },
]
