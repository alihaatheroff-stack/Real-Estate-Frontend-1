import { Link } from 'react-router-dom'
import { networkProfilePath } from '@/app/router/paths'
import { COMMUNITY_SOCIALS } from '@/features/network/components/community/SocialPlatformIcons'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import type { NetworkMember } from '@/features/network/data/types'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { cn } from '@/shared/lib/cn'

export type CommunityCardMode = 'request' | 'follower' | 'following' | 'suggest'

export function CommunityPersonCard({
  member,
  mode,
}: {
  member: NetworkMember
  mode: CommunityCardMode
}) {
  const { friendResponses, respondToFriendRequest, followingIds, toggleFollow } = useNetworkSocial()
  const requestStatus = friendResponses[member.id]
  const following = followingIds.includes(member.id)

  const requestMode = mode === 'request'
  const declined = requestMode && requestStatus === 'declined'
  const accepted = requestMode && requestStatus === 'accepted'
  const connected = requestMode ? accepted : following
  const primaryLabel = requestMode
    ? accepted
      ? 'Friends'
      : 'Confirm'
    : connected
      ? 'Unfollow'
      : 'Follow'
  const primaryFilled = !connected && !declined

  function onIgnore() {
    if (!requestMode || requestStatus) return
    respondToFriendRequest(member.id, 'declined')
  }

  function onPrimary() {
    if (requestMode) {
      if (requestStatus) return
      respondToFriendRequest(member.id, 'accepted')
      return
    }
    toggleFollow(member.id)
  }

  return (
    <article className="flex flex-col rounded-2xl bg-white p-4 shadow-[0_8px_24px_rgba(15,31,26,0.06)] ring-1 ring-black/[0.04]">
      <div className="flex items-start gap-3">
        <MemberAvatar name={member.name} src={member.avatar} memberId={member.id} size="lg" framed />
        <div className="min-w-0 flex-1 pt-0.5">
          <Link
            to={networkProfilePath(member.id)}
            className="block truncate text-[15px] font-semibold text-ink hover:underline"
          >
            {member.name}
          </Link>
          <p className="truncate text-sm text-muted">
            {member.title} at {member.company}
          </p>
          <div className="mt-2 flex items-center gap-2.5 text-muted">
            {COMMUNITY_SOCIALS.map((social) => (
              <span key={social.label} title={social.label} className="inline-flex text-muted">
                <social.Icon className="size-4" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className={cn('mt-4 grid gap-2', requestMode ? 'grid-cols-2' : 'grid-cols-1')}>
        {requestMode ? (
          <button
            type="button"
            disabled={Boolean(requestStatus)}
            onClick={onIgnore}
            className={cn(
              'h-10 rounded-full border text-sm font-semibold transition',
              declined ? 'border-line bg-mist text-muted' : 'border-line bg-white text-ink hover:bg-mist',
            )}
          >
            {declined ? 'Ignored' : 'Ignore'}
          </button>
        ) : null}
        <button
          type="button"
          disabled={declined || accepted}
          onClick={onPrimary}
          className={cn(
            'h-10 rounded-full text-sm font-semibold transition',
            declined
              ? 'bg-mist text-muted'
              : primaryFilled
                ? 'bg-brand text-white hover:bg-brand-dark'
                : 'border border-line bg-white text-ink hover:bg-mist',
          )}
        >
          {primaryLabel}
        </button>
      </div>
    </article>
  )
}
