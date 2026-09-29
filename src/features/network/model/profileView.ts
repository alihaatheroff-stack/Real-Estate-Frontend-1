import { CURRENT_MEMBER_ID, getMember } from '@/features/network/data/members'
import type { NetworkMember, NetworkPost } from '@/features/network/data/types'

/** Facebook-style network profile surfaces. */
export type ProfileViewMode = 'personal' | 'profile'

export type ProfileRelationship = 'self' | 'friends' | 'pending' | 'none'

export function resolveProfileViewMode(options: {
  memberId: string
  /** Owner previewing their public profile (View as). */
  viewAsPublic?: boolean
}): ProfileViewMode {
  const isOwner = options.memberId === CURRENT_MEMBER_ID
  if (isOwner && !options.viewAsPublic) return 'personal'
  return 'profile'
}

export function resolveProfileRelationship(options: {
  memberId: string
  followingIds: string[]
  sentFriendRequestIds: string[]
}): ProfileRelationship {
  if (options.memberId === CURRENT_MEMBER_ID) return 'self'
  if (options.followingIds.includes(options.memberId)) return 'friends'
  if (options.sentFriendRequestIds.includes(options.memberId)) return 'pending'
  return 'none'
}

export function getMutualFriends(member: NetworkMember, viewerFriendIds: string[]) {
  const mutualIds = member.friendIds.filter((id) => viewerFriendIds.includes(id))
  return mutualIds
    .map((id) => getMember(id))
    .filter((item): item is NetworkMember => item != null)
}

/** Visitors only see Friends-audience posts when they are connected. */
export function filterPostsForProfileView(
  posts: NetworkPost[],
  options: { viewMode: ProfileViewMode; relationship: ProfileRelationship },
) {
  if (options.viewMode === 'personal' || options.relationship === 'friends') {
    return posts
  }
  return posts.filter((post) => post.audience !== 'Friends')
}
