import type {
  VoteVenue,
  VoteVenueLocation,
} from '@/features/crowdfunding/data/crowdfundingVote'
import { pickPageAds } from '@/features/referrals/lib/resultFeedAds'

export type CrowdfundingResultAd = {
  id: string
  label: string
  venue: VoteVenue
}

export const FEATURED_AD_VENUE_LOCATIONS: Record<string, VoteVenueLocation> = {
  'ad-venue-splash-cove': { lat: 21.1619, lng: -86.8515, city: 'Cancún' },
  'ad-venue-sky-trails': { lat: 20.6534, lng: -105.2253, city: 'Puerto Vallarta' },
  'ad-venue-family-dome': { lat: 19.4326, lng: -99.1332, city: 'Mexico City' },
  'ad-venue-summit-park': { lat: 25.6866, lng: -100.3161, city: 'Monterrey' },
}

export const FEATURED_AD_VENUES: VoteVenue[] = [
  {
    id: 'ad-venue-splash-cove',
    title: 'Splash Cove',
    text: 'Family water campus with lazy river, splash pads, and shade pavilions for year-round recreation.',
    image: '/images/crowdfunding/25-city-pool.jpg',
    role: 'Sponsored Water Campus',
    raise: '$4.8M',
    roi: '16%',
    geographies: ['mexico'],
    vertical: 'water',
  },
  {
    id: 'ad-venue-sky-trails',
    title: 'Sky Trails',
    text: 'Canopy adventure park with zip circuits, lookout towers, and guided night walks.',
    image: '/images/crowdfunding/10-198.jpg',
    role: 'Sponsored Adventure Park',
    raise: '$3.6M',
    roi: '19%',
    geographies: ['mexico'],
    vertical: 'outdoor',
  },
  {
    id: 'ad-venue-family-dome',
    title: 'Family Dome',
    text: 'Climate-controlled indoor play, courts, and birthday suites for dense urban neighborhoods.',
    image: '/images/crowdfunding/01-3169093_web1_IMG_5825.jpg',
    role: 'Sponsored Indoor Hub',
    raise: '$2.9M',
    roi: '14%',
    geographies: ['mexico'],
    vertical: 'indoor',
  },
  {
    id: 'ad-venue-summit-park',
    title: 'Summit Sports Park',
    text: 'Multi-field sports campus with lights, lockers, and community tournament weekends.',
    image: '/images/crowdfunding/27-amuse-parks.jpg',
    role: 'Sponsored Sports Campus',
    raise: '$5.1M',
    roi: '17%',
    geographies: ['mexico'],
    vertical: 'sports',
  },
]

export const CROWDFUNDING_RESULT_ADS: CrowdfundingResultAd[] = [
  {
    id: 'ad-featured-splash-cove',
    label: 'Featured Venue',
    venue: FEATURED_AD_VENUES[0]!,
  },
  {
    id: 'ad-featured-sky-trails',
    label: 'Featured Venue',
    venue: FEATURED_AD_VENUES[1]!,
  },
  {
    id: 'ad-featured-family-dome',
    label: 'Featured Venue',
    venue: FEATURED_AD_VENUES[2]!,
  },
  {
    id: 'ad-featured-summit-park',
    label: 'Featured Venue',
    venue: FEATURED_AD_VENUES[3]!,
  },
]

export function getFeaturedAdVenueLocation(id: string): VoteVenueLocation | undefined {
  return FEATURED_AD_VENUE_LOCATIONS[id]
}

export function pickCrowdfundingResultAds(page: number, count = 2): CrowdfundingResultAd[] {
  return pickPageAds(CROWDFUNDING_RESULT_ADS, page, count)
}
