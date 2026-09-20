import { PATHS } from '@/app/router/paths'
import { STOCK } from '@/features/network/data/members'

export type FeedAd = {
  id: string
  title: string
  subtitle: string
  image: string
  href: string
  sponsor: string
}

export const FEED_LEFT_ADS: FeedAd[] = [
  {
    id: 'feed-left-1',
    title: '50% referral partnerships',
    subtitle: 'Put your firm beside every deal conversation.',
    image: STOCK.house4,
    href: PATHS.advertise,
    sponsor: 'Partner spotlight',
  },
  {
    id: 'feed-left-2',
    title: 'Lux Realty of California',
    subtitle: 'Listings, capital, and closing teams in one graph.',
    image: STOCK.house5,
    href: PATHS.advertise,
    sponsor: 'Featured sponsor',
  },
]

export const FEED_RIGHT_ADS: FeedAd[] = [
  {
    id: 'feed-right-1',
    title: 'Verified appraisers this week',
    subtitle: 'Valley coverage for files that cannot wait.',
    image: STOCK.house3,
    href: PATHS.advertise,
    sponsor: 'PSP spotlight',
  },
  {
    id: 'feed-right-2',
    title: 'Deal counsel on retainer',
    subtitle: 'LOIs, entity work, and quiet closings.',
    image: STOCK.glass,
    href: PATHS.advertise,
    sponsor: 'Law firm',
  },
]

export const FEED_BIRTHDAY_IDS = ['elena', 'marcus'] as const
