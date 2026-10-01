import { NETWORK_MEMBERS } from '@/features/network/data/members'
import type { NetworkMember } from '@/features/network/data/types'

export type NetworkActivityStripId =
  | 'recently-viewed'
  | 'recommended'
  | 'people-to-greet'
  | 'trending'
  | 'saved'

export type NetworkActivityStrip = {
  id: NetworkActivityStripId
  title: string
  description?: string
  memberIds: string[]
}

/** Fiverr-style member rows under Network on the logged-in home. */
export const NETWORK_ACTIVITY_STRIPS: NetworkActivityStrip[] = [
  {
    id: 'recently-viewed',
    title: 'Recently viewed',
    description: 'Profiles you opened while browsing the network.',
    memberIds: ['maya', 'david', 'jordan', 'elena', 'aisha', 'noah', 'sarah', 'james'],
  },
  {
    id: 'recommended',
    title: 'Recommended for you',
    description: 'Members matched to your field, city, and deal style.',
    memberIds: ['sofia', 'marcus', 'amara', 'carlos', 'leah', 'nina', 'ryan', 'chris'],
  },
  {
    id: 'people-to-greet',
    title: 'People to greet',
    description: 'New and active members worth a quick hello.',
    memberIds: ['olivia', 'ethan', 'aisha', 'maya', 'david', 'jordan'],
  },
  {
    id: 'trending',
    title: 'Trending in your network',
    description: 'High-engagement profiles across forums and groups.',
    memberIds: ['james', 'elena', 'noah', 'sofia', 'marcus', 'amara', 'sarah', 'carlos'],
  },
  {
    id: 'saved',
    title: 'Saved profiles',
    description: 'People you bookmarked for follow-ups and intros.',
    memberIds: ['rigo', 'maya', 'david', 'leah', 'nina', 'ryan'],
  },
]

export function getNetworkStripMembers(memberIds: string[]): NetworkMember[] {
  const byId = new Map(NETWORK_MEMBERS.map((member) => [member.id, member]))
  return memberIds
    .map((id) => byId.get(id))
    .filter((member): member is NetworkMember => member != null)
}
