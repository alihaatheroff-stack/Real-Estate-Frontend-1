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
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80',
    href: PATHS.advertise,
  },
  {
    id: 'l2',
    title: 'Lux Realty',
    subtitle: 'Of California',
    image:
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=400&q=80',
    href: PATHS.advertise,
  },
]

export const RIGHT_STACK_ADS: HeroAd[] = [
  {
    id: 'r1',
    title: 'Appraisers',
    subtitle: 'Verified PSPs',
    image:
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
    href: PATHS.advertise,
  },
  {
    id: 'r2',
    title: 'Law Firm',
    subtitle: 'Deal counsel',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=400&q=80',
    href: PATHS.advertise,
  },
]
