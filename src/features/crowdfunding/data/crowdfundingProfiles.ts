import { VOTE_VENUES } from '@/features/crowdfunding/data/crowdfundingVote'
import type { VoteVertical } from '@/features/crowdfunding/data/crowdfundingVote'

export type CrowdfundingPledgeStatus = 'interest' | 'pledged' | 'watching'

export type CrowdfundingProfileActivity = {
  id: string
  label: string
  detail: string
  date: string
  status: CrowdfundingPledgeStatus
}

export type CrowdfundingProfileVenue = {
  venueId: string
  status: CrowdfundingPledgeStatus
  note?: string
}

export type CrowdfundingProfile = {
  id: string
  name: string
  firstName: string
  handle: string
  role: string
  company: string
  city: string
  region: string
  avatar: string
  cover: string
  verified: boolean
  joined: string
  bio: string
  thesis: string
  languages: string[]
  preferredGeographies: string[]
  preferredVerticals: VoteVertical[]
  votesCast: number
  pledgesSignaled: number
  venuesWatching: number
  boardInterest: boolean
  interestListJoined: boolean
  venues: CrowdfundingProfileVenue[]
  activity: CrowdfundingProfileActivity[]
}

export const CURRENT_CROWDFUNDING_PROFILE_ID = 'rigo'

export const CROWDFUNDING_PROFILES: CrowdfundingProfile[] = [
  {
    id: 'rigo',
    name: 'Rigoberto Peraza',
    firstName: 'Rigoberto',
    handle: '@rigo.crowdfund',
    role: 'Community Backer',
    company: 'Alumax Realty & Mortgage',
    city: 'Fresno',
    region: 'California, United States',
    avatar: '/images/profile/rigoberto-peraza.jpg',
    cover: '/images/crowdfunding/25-city-pool.jpg',
    verified: true,
    joined: 'September 2024',
    bio: 'Backing faith-aligned recreation venues so families across the Central Valley and Mexico have lasting places to gather—not temporary pop-ups.',
    thesis:
      'Priority: water recreation and community plazas near bilingual markets. Signals demand on the interest list until Reg A+ offerings go live.',
    languages: ['English', 'Spanish'],
    preferredGeographies: ['United States', 'Mexico'],
    preferredVerticals: ['water', 'community', 'outdoor'],
    votesCast: 12,
    pledgesSignaled: 4,
    venuesWatching: 6,
    boardInterest: true,
    interestListJoined: true,
    venues: [
      { venueId: 'indoor-play', status: 'pledged', note: 'Early interest for Fresno / Clovis families' },
      { venueId: 'ropes-course', status: 'watching', note: 'Outdoor adventure near Central Valley' },
      { venueId: 'zip-line', status: 'interest', note: 'Wants canopy rides tied to community hubs' },
      { venueId: 'city-pool', status: 'watching' },
    ],
    activity: [
      {
        id: 'a1',
        label: 'Joined interest list',
        detail: 'Signed up for Reg A+ offering notifications — no commitment, first in line.',
        date: 'Mar 12, 2026',
        status: 'interest',
      },
      {
        id: 'a2',
        label: 'Voted on Indoor Play #44',
        detail: 'Supported climate-controlled courts and youth programming.',
        date: 'Mar 8, 2026',
        status: 'pledged',
      },
      {
        id: 'a3',
        label: 'Board acknowledgement',
        detail: 'Expressed interest in Board of Directors shaping venue direction.',
        date: 'Feb 28, 2026',
        status: 'interest',
      },
      {
        id: 'a4',
        label: 'Watching Zip Line #12',
        detail: 'Following canopy rides linking outdoor recreation hubs.',
        date: 'Feb 14, 2026',
        status: 'watching',
      },
    ],
  },
  {
    id: 'maya',
    name: 'Maya Chen',
    firstName: 'Maya',
    handle: '@maya.venues',
    role: 'Venue Advocate',
    company: 'Central Valley Realty Group',
    city: 'Orlando',
    region: 'Florida, United States',
    avatar: '/images/profile/F_1.jpg',
    cover: '/images/crowdfunding/27-amuse-parks.jpg',
    verified: true,
    joined: 'January 2025',
    bio: 'Helps investors and communities signal demand for indoor entertainment and sports venues before offerings open.',
    thesis: 'Focus on Florida and Caribbean community venues with clear membership (SAAS) upside.',
    languages: ['English', 'Mandarin'],
    preferredGeographies: ['United States', 'Caribbean'],
    preferredVerticals: ['indoor', 'sports', 'community'],
    votesCast: 8,
    pledgesSignaled: 2,
    venuesWatching: 5,
    boardInterest: false,
    interestListJoined: true,
    venues: [
      { venueId: 'indoor-play', status: 'pledged' },
      { venueId: 'ropes-course', status: 'watching' },
    ],
    activity: [
      {
        id: 'm1',
        label: 'Joined interest list',
        detail: 'Waiting for SEC qualification updates.',
        date: 'Jan 20, 2026',
        status: 'interest',
      },
      {
        id: 'm2',
        label: 'Voted on Indoor Play',
        detail: 'Backed youth programming in climate-controlled venues.',
        date: 'Jan 9, 2026',
        status: 'pledged',
      },
    ],
  },
]

const VERTICAL_LABELS: Record<VoteVertical, string> = {
  water: 'Water recreation',
  indoor: 'Indoor entertainment',
  outdoor: 'Outdoor adventure',
  wildlife: 'Wildlife & nature',
  sports: 'Sports & play',
  community: 'Community venues',
}

export function getCrowdfundingProfile(id: string) {
  return CROWDFUNDING_PROFILES.find((profile) => profile.id === id)
}

export function getCurrentCrowdfundingProfile() {
  return (
    getCrowdfundingProfile(CURRENT_CROWDFUNDING_PROFILE_ID) ?? CROWDFUNDING_PROFILES[0]
  )
}

export function getCrowdfundingProfileVenues(profile: CrowdfundingProfile) {
  return profile.venues
    .map((entry) => {
      const venue = VOTE_VENUES.find((item) => item.id === entry.venueId)
      if (!venue) return null
      return { ...entry, venue }
    })
    .filter((item): item is NonNullable<typeof item> => item != null)
}

export function crowdfundingVerticalLabel(vertical: VoteVertical) {
  return VERTICAL_LABELS[vertical]
}

export function crowdfundingPledgeLabel(status: CrowdfundingPledgeStatus) {
  if (status === 'pledged') return 'Pledged interest'
  if (status === 'watching') return 'Watching'
  return 'Interest list'
}
