import { PATHS } from '@/app/router/paths'
import { STOCK } from '@/features/network/data/members'

/** Brand logos for service-provider ads. */
export const SERVICE_LOGOS = {
  aquatic: '/images/logos/aquatic.svg',
} as const

export type FeedAdBroker = {
  /** Broker / agent / provider name */
  brokerName: string
  /** Name of community-related service / office */
  officeName: string
  /** Service offered, e.g. ABC Pool Service */
  service: string
  licenseNo: string
  address: string
  city: string
  zipcode: string
  phone: string
}

export type FeedAd = {
  id: string
  title: string
  subtitle: string
  image: string
  href: string
  sponsor: string
  /** In-feed video. Sidebar cards still use `image`. */
  video?: string
  /** In-feed listing photos. The first image is also `image`. */
  images?: string[]
  price?: string
  /** Broker / office details shown on the ad card. */
  broker?: FeedAdBroker
  /** When set, shows the purple referral starburst on the image. */
  referralPercent?: number | string
  /** Provider brand logo (e.g. pool service Aquatic mark). */
  logo?: string
}

export const FEED_LEFT_ADS: FeedAd[] = [
  {
    id: 'feed-left-1',
    title: '35% Referral Partnerships',
    subtitle: 'Put your firm beside every deal conversation.',
    image: STOCK.pool1,
    images: [STOCK.pool1, STOCK.pool2, STOCK.pool3, STOCK.pool4],
    href: PATHS.advertise,
    sponsor: 'Partner spotlight',
    referralPercent: 35,
    logo: SERVICE_LOGOS.aquatic,
    broker: {
      brokerName: 'Chen Xing',
      officeName: 'Holland',
      service: 'AB Pool Service',
      licenseNo: '01844291',
      address: '15538 El Cajon',
      city: 'Los Angeles',
      zipcode: '91342',
      phone: '(559) 555-0142',
    },
  },
  {
    id: 'feed-left-2',
    title: 'Pool care that keeps listings photo-ready',
    subtitle: 'Weekly service for agents who need crystal water on showing day.',
    image: STOCK.house4,
    images: [STOCK.house4, STOCK.house5, STOCK.pool2, STOCK.pool3],
    href: PATHS.advertise,
    sponsor: 'Featured sponsor',
    logo: SERVICE_LOGOS.aquatic,
    broker: {
      brokerName: 'Elena Ruiz',
      officeName: 'Holland Community Services',
      service: 'ABC Pool Service',
      licenseNo: 'DRE 02011834',
      address: '880 Herndon Ave',
      city: 'Clovis',
      zipcode: '93612',
      phone: '(559) 555-0198',
    },
  },
  {
    id: 'feed-left-3',
    title: 'Valley inspection partners',
    subtitle: 'Same-week reports for buyers and investors.',
    image: STOCK.house1,
    images: [STOCK.house1, STOCK.house3, STOCK.cottage, STOCK.house2],
    href: PATHS.advertise,
    sponsor: 'Inspection desk',
    referralPercent: 20,
    broker: {
      brokerName: 'David Kim',
      officeName: 'Precision Home Inspect',
      service: 'Home Inspection',
      licenseNo: 'HI 441902',
      address: '120 N Fresno St',
      city: 'Fresno',
      zipcode: '93701',
      phone: '(559) 555-0188',
    },
  },
  {
    id: 'feed-left-4',
    title: 'Staging that sells faster',
    subtitle: 'Model-home looks for listings under contract pressure.',
    image: STOCK.interior,
    images: [STOCK.interior, STOCK.living, STOCK.livingModern, STOCK.bedroom],
    href: PATHS.advertise,
    sponsor: 'Design partner',
    broker: {
      brokerName: 'Jordan Lee',
      officeName: 'Lee Interiors',
      service: 'Home Staging',
      licenseNo: 'DRE 01988021',
      address: '410 Clovis Ave',
      city: 'Clovis',
      zipcode: '93612',
      phone: '(559) 555-0129',
    },
  },
]

export const FEED_RIGHT_ADS: FeedAd[] = [
  {
    id: 'feed-right-1',
    title: 'Verified appraisers this week',
    subtitle: 'Valley coverage for files that cannot wait.',
    image: STOCK.house3,
    images: [STOCK.house3, STOCK.house1, STOCK.cottage, STOCK.condos],
    href: PATHS.advertise,
    sponsor: 'PSP spotlight',
    broker: {
      brokerName: 'James Holt',
      officeName: 'Holt Valuation',
      service: 'Appraisal Service',
      licenseNo: 'BREA 300812',
      address: '455 W Shaw Ave',
      city: 'Fresno',
      zipcode: '93704',
      phone: '(559) 555-0166',
    },
  },
  {
    id: 'feed-right-2',
    title: 'Deal counsel on retainer',
    subtitle: 'LOIs, entity work, and quiet closings.',
    image: STOCK.office,
    images: [STOCK.office, STOCK.meeting, STOCK.desk, STOCK.shake],
    href: PATHS.advertise,
    sponsor: 'Law firm',
    broker: {
      brokerName: 'Priya Nair',
      officeName: 'Nair Closing Partners',
      service: 'Legal Closing Service',
      licenseNo: 'CA Bar 291044',
      address: '2014 Tulare St, Floor 4',
      city: 'Fresno',
      zipcode: '93721',
      phone: '(559) 555-0133',
    },
  },
  {
    id: 'feed-right-3',
    title: 'Hard-money ready this month',
    subtitle: 'Fast term sheets for value-add multifamily.',
    image: STOCK.tower,
    images: [STOCK.tower, STOCK.condos, STOCK.glass, STOCK.office],
    href: PATHS.advertise,
    sponsor: 'Capital desk',
    referralPercent: 15,
    broker: {
      brokerName: 'Ryan Cole',
      officeName: 'Cole Capital',
      service: 'Private Lending',
      licenseNo: 'CFL 603441',
      address: '7475 N Palm Ave',
      city: 'Fresno',
      zipcode: '93711',
      phone: '(559) 555-0155',
    },
  },
  {
    id: 'feed-right-4',
    title: 'GC slots open for rehabs',
    subtitle: 'Investor timelines with weekly photo updates.',
    image: STOCK.build,
    images: [STOCK.build, STOCK.framing, STOCK.tools, STOCK.electrical],
    href: PATHS.advertise,
    sponsor: 'Build partner',
    broker: {
      brokerName: 'Noah Patel',
      officeName: 'Patel Build Co.',
      service: 'General Contracting',
      licenseNo: 'B 984411',
      address: '550 Pollasky Ave',
      city: 'Clovis',
      zipcode: '93612',
      phone: '(559) 555-0104',
    },
  },
]

/** In-feed ads. The first is a video, the second a listing photo scroller, then they alternate. */
export const FEED_NEWS_ADS: FeedAd[] = [
  {
    id: 'feed-news-video',
    title: 'Interior tour · for sale',
    subtitle: 'A short walk through the dining room and open plan. Book a showing with the listing agent.',
    image: STOCK.interior,
    video: '/videos/listing-walkthrough.mp4',
    href: PATHS.advertise,
    sponsor: 'Clovis listing',
    price: 'For sale',
    broker: {
      brokerName: 'Aisha Rahman',
      officeName: 'Rahman Homes',
      service: 'Listing Agent Service',
      licenseNo: '01955320',
      address: '620 Pollasky Ave',
      city: 'Clovis',
      zipcode: '93612',
      phone: '(559) 555-0177',
    },
  },
  {
    id: 'feed-news-slideshow',
    title: '4 bed · 3 bath in northwest Fresno',
    subtitle: 'Scroll the photos the way you would on a rental or sale — exterior, kitchen, and yard.',
    image: STOCK.house1,
    images: [STOCK.house1, STOCK.interior, STOCK.house2, STOCK.house5, STOCK.cottage, STOCK.house4],
    href: PATHS.advertise,
    sponsor: 'Home for sale',
    price: '$725,000',
    broker: {
      brokerName: 'Chris Adler',
      officeName: 'Adler Circle',
      service: 'Residential Sales',
      licenseNo: 'DRE 01722901',
      address: '7640 N Palm Ave',
      city: 'Fresno',
      zipcode: '93711',
      phone: '(559) 555-0112',
    },
  },
]

/** Posts between in-feed ads after the opening advertisement. */
export const NEWS_FEED_POSTS_BETWEEN_ADS = 2

export type NewsFeedEntry<TPost> =
  | { kind: 'ad'; ad: FeedAd }
  | { kind: 'post'; post: TPost }

/** Open with the video ad, then another ad after every two posts (slideshow, then video, and so on). */
export function buildNewsFeed<TPost>(
  posts: readonly TPost[],
  ads: readonly FeedAd[] = FEED_NEWS_ADS,
): NewsFeedEntry<TPost>[] {
  if (ads.length === 0) {
    return posts.map((post) => ({ kind: 'post', post }))
  }

  const entries: NewsFeedEntry<TPost>[] = [{ kind: 'ad', ad: ads[0]! }]
  let adIndex = 1
  let postsSinceAd = 0

  for (const post of posts) {
    entries.push({ kind: 'post', post })
    postsSinceAd += 1
    if (postsSinceAd < NEWS_FEED_POSTS_BETWEEN_ADS) continue
    entries.push({ kind: 'ad', ad: ads[adIndex % ads.length]! })
    adIndex += 1
    postsSinceAd = 0
  }

  return entries
}

export const FEED_BIRTHDAY_IDS = ['elena', 'marcus'] as const
