import { PATHS } from '@/app/router/paths'
import { DUMMY_INBOX_PLATFORMS } from '@/features/messages/data/dummyInbox'
import type { LoggedInReferralStrip } from '@/features/landing/data/loggedInReferralProfiles'

export const LOGGED_IN_MEMBER = {
  displayName: 'Rigoberto',
  firstName: 'Rigoberto',
} as const

export type HomeActionCard =
  | {
      id: 'recommended'
      kind: 'cta'
      eyebrow: string
      title: string
      description: string
      ctaLabel: string
      href: string
    }
  | {
      id: 'message'
      kind: 'message'
      eyebrow: string
      senderName: string
      senderHandle: string
      preview: string
      avatarSrc: string
      ctaLabel: string
      href: string
    }

const latestThread =
  DUMMY_INBOX_PLATFORMS.find((p) => p.unreadCount > 0)?.threads.find(
    (t) => (t.unreadCount ?? 0) > 0,
  ) ?? DUMMY_INBOX_PLATFORMS[0]?.threads[0]

export const HOME_ACTION_CARDS: HomeActionCard[] = [
  {
    id: 'recommended',
    kind: 'cta',
    eyebrow: 'Recommended for you',
    title: 'Describe the property service you need',
    description:
      'Post a brief and match with verified Property Service Providers across LCREN.',
    ctaLabel: 'Get started',
    href: PATHS.postOffer,
  },
  {
    id: 'message',
    kind: 'message',
    eyebrow: 'New message',
    senderName: latestThread?.name ?? 'Aisha Rahman',
    senderHandle: latestThread?.handle ?? '@aisha.psp',
    preview: latestThread?.preview ?? 'New referral match ready for review.',
    avatarSrc: latestThread?.avatarSrc ?? '/images/profile/F_1.jpg',
    ctaLabel: 'Go to inbox',
    href: PATHS.networkMessages,
  },
]

export type PickupTabId =
  | 'keep-exploring'
  | 'buy-again'
  | 'saved'
  | 'recommendations'

export type PickupTab = {
  id: PickupTabId
  label: string
  stripId: LoggedInReferralStrip['id']
  initiallySaved?: boolean
}

export const PICKUP_TABS: PickupTab[] = [
  {
    id: 'keep-exploring',
    label: 'Keep exploring',
    stripId: 'recently-viewed',
  },
  {
    id: 'buy-again',
    label: 'Buy again',
    stripId: 'recommendations',
  },
  {
    id: 'saved',
    label: 'Saved services',
    stripId: 'saved',
    initiallySaved: true,
  },
  {
    id: 'recommendations',
    label: 'For you',
    stripId: 'recommendations',
  },
]

export const HOME_QUICK_LINKS = [
  { label: 'Find PSPs', href: PATHS.results },
  { label: 'Post an offer', href: PATHS.postOffer },
  { label: 'Crowdfunding', href: PATHS.crowdfundingExplore },
  { label: 'Network feed', href: PATHS.networkFeed },
  { label: 'Shop', href: PATHS.shop },
  { label: 'Dashboard', href: PATHS.dashboard },
] as const

/** Stacked buyer rows driven by this member’s activity (search, views, hires, saves).
 *  IDs below are demo stand-ins until activity APIs are wired per user. */
export type HomeServiceStrip = {
  id: string
  title: string
  description?: string
  serviceIds: string[]
  initiallySaved?: boolean
}

export const HOME_SERVICE_STRIPS: HomeServiceStrip[] = [
  {
    id: 'recently-viewed',
    title: 'Recently viewed',
    description: 'Pick up PSP services you opened earlier.',
    serviceIds: ['s1', 's2', 's4', 's5', 's3', 's6', 's7', 's8'],
  },
  {
    id: 'inspired-search',
    title: 'Inspired by your search',
    description: 'Based on inspections, staging, and property prep you looked at.',
    serviceIds: ['s3', 's6', 's9', 's1', 's10', 's4', 's7', 's2'],
  },
  {
    id: 'inspired-activity',
    title: 'Inspired by your recent search activity',
    description: 'Fresh matches from your latest filters and keywords.',
    serviceIds: ['s8', 's5', 's2', 's10', 's9', 's3', 's1', 's6'],
  },
  {
    id: 'recommended',
    title: 'Recommended for you',
    description: 'Verified providers matched to your activity.',
    serviceIds: ['s5', 's9', 's2', 's10', 's1', 's4', 's7', 's3'],
  },
  {
    id: 'buy-again',
    title: 'Buy again',
    description: 'Services you hired before — book them again in a few taps.',
    serviceIds: ['s2', 's7', 's4', 's8', 's1', 's6', 's9', 's5'],
  },
  {
    id: 'gigs-you-may-like',
    title: 'Services you may like',
    description: 'Popular listings buyers with a similar profile explore next.',
    serviceIds: ['s4', 's8', 's1', 's5', 's9', 's2', 's10', 's7'],
  },
  {
    id: 'saved',
    title: 'Saved services',
    description: 'Favorites ready when you are.',
    serviceIds: ['s8', 's7', 's6', 's3', 's10', 's9', 's5', 's4'],
    initiallySaved: true,
  },
]

/** Seller / PSP carousels (Fiverr “Top rated sellers” style). */
export type HomeProviderStrip = {
  id: string
  title: string
  description?: string
  providerIds: string[]
}

export const HOME_PROVIDER_STRIPS: HomeProviderStrip[] = [
  {
    id: 'top-rated',
    title: 'Top rated sellers',
    description: 'Highly rated Property Service Providers across LCREN.',
    providerIds: ['p1', 'p3', 'p5', 'p7', 'p9', 'p11', 'p2', 'p4'],
  },
  {
    id: 'verified-pros',
    title: 'Verified Pro PSPs',
    description: 'Credential-checked providers ready for serious work.',
    providerIds: ['p2', 'p6', 'p8', 'p10', 'p12', 'p14', 'p1', 'p17'],
  },
  {
    id: 'sellers-in-your-area',
    title: 'Sellers in your area',
    description: 'Local talent near markets you search most.',
    providerIds: ['p4', 'p8', 'p13', 'p15', 'p16', 'p3', 'p6', 'p9'],
  },
]
