import { RECREATIONAL_VENUES } from '@/features/crowdfunding/data/recreationalVenues'

export type CrowdfundingActivityStripId =
  | 'recently-viewed'
  | 'recommended'
  | 'trending'
  | 'watching'
  | 'saved'

export type CrowdfundingActivityStrip = {
  id: CrowdfundingActivityStripId
  title: string
  description?: string
  venueIds: string[]
  initiallySaved?: boolean
}

/** Fiverr-style member rows under Crowdfund on the logged-in home. */
export const CROWDFUNDING_ACTIVITY_STRIPS: CrowdfundingActivityStrip[] = [
  {
    id: 'recently-viewed',
    title: 'Recently viewed',
    description: 'Venues you opened while exploring LCREC.',
    venueIds: [
      'indoor-play',
      'ice-rink',
      'roller-rink',
      'splash-pad',
      'arcade',
      'bowling',
      'sports-complex',
      'skate-park',
    ],
  },
  {
    id: 'recommended',
    title: 'Recommended for you',
    description: 'Faith-aligned recreation matched to your interest list.',
    venueIds: [
      'wave-pool',
      'community-plaza',
      'obstacle-course',
      'indoor-play',
      'sports-complex',
      'arcade',
      'splash-pad',
      'bowling',
    ],
  },
  {
    id: 'trending',
    title: 'Trending venues',
    description: 'High pledge interest across the network this week.',
    venueIds: [
      'skate-park',
      'roller-rink',
      'ice-rink',
      'wave-pool',
      'indoor-play',
      'obstacle-course',
      'community-plaza',
      'sports-complex',
    ],
  },
  {
    id: 'watching',
    title: 'On your watchlist',
    description: 'Projects you are tracking until offerings go live.',
    venueIds: [
      'bowling',
      'splash-pad',
      'arcade',
      'ice-rink',
      'roller-rink',
      'wave-pool',
    ],
  },
  {
    id: 'saved',
    title: 'Saved venues',
    description: 'Favorites ready to revisit or share with your board.',
    venueIds: [
      'sports-complex',
      'indoor-play',
      'community-plaza',
      'skate-park',
      'obstacle-course',
      'bowling',
    ],
    initiallySaved: true,
  },
]

export function getCrowdfundingStripVenues(venueIds: string[]) {
  const byId = new Map(RECREATIONAL_VENUES.map((venue) => [venue.id, venue]))
  return venueIds
    .map((id) => byId.get(id))
    .filter((venue): venue is (typeof RECREATIONAL_VENUES)[number] => venue != null)
}
