import { PATHS } from '@/app/router/paths'
import { STOCK } from '@/features/network/data/members'

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
