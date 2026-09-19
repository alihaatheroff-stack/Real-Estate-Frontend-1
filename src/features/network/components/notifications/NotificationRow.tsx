import { Link } from 'react-router-dom'
import { Calendar, Heart, MessageCircle, UserPlus, Users, type LucideIcon } from 'lucide-react'
import { PATHS, networkProfilePath } from '@/app/router/paths'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { getMember } from '@/features/network/data/members'
import type { NetworkNotice } from '@/features/network/data/types'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { cn } from '@/shared/lib/cn'

const KIND_BADGE: Record<
  NetworkNotice['kind'],
  { icon: LucideIcon; badge: string; ring: string }
> = {
  like: {
    icon: Heart,
    badge: 'bg-rose-500',
    ring: 'ring-rose-200',
  },
  comment: {
    icon: MessageCircle,
    badge: 'bg-sky-500',
    ring: 'ring-sky-200',
  },
  friend: {
    icon: UserPlus,
    badge: 'bg-brand',
    ring: 'ring-brand/25',
  },
  group: {
    icon: Users,
    badge: 'bg-violet-500',
    ring: 'ring-violet-200',
  },
  event: {
    icon: Calendar,
    badge: 'bg-amber-500',
    ring: 'ring-amber-200',
  },
}

export function NotificationRow({
  notice,
  compact = false,
  onNavigate,
}: {
  notice: NetworkNotice
  compact?: boolean
  onNavigate?: () => void
}) {
  const member = getMember(notice.memberId)
  const { friendResponses, respondToFriendRequest } = useNetworkSocial()
  if (!member) return null

  const isFriend = notice.kind === 'friend'
  const status = friendResponses[member.id]
  const profileHref = networkProfilePath(member.id)

  const body = (
    <>
      <span className="relative shrink-0">
        <MemberAvatar
          name={member.name}
          src={member.avatar}
          size={compact ? 'md' : 'lg'}
        />
        <NoticeKindBadge kind={notice.kind} compact={compact} />
      </span>
      <span className="min-w-0 flex-1">
        <span className={cn('block text-ink', compact ? 'text-sm' : 'text-[19px] leading-snug')}>
          <Link
            to={profileHref}
            onClick={onNavigate}
            className="font-semibold hover:underline"
          >
            {member.name}
          </Link>{' '}
          {notice.text}
        </span>
        <span className={cn('font-medium text-muted', compact ? 'text-xs' : 'mt-1 block text-[15px]')}>
          {notice.timeAgo}
        </span>
      </span>
      {isFriend ? (
        <FriendRequestActions
          compact={compact}
          status={status}
          onAccept={() => respondToFriendRequest(member.id, 'accepted')}
          onDecline={() => respondToFriendRequest(member.id, 'declined')}
        />
      ) : null}
    </>
  )

  const rowClassName = cn(
    'flex items-center gap-5 border border-black/[0.06]',
    compact ? 'rounded-lg px-2 py-2' : 'rounded-2xl px-5 py-5',
    notice.unread && (!isFriend || !status) && 'bg-brand-light/35',
  )

  if (isFriend) {
    return <div className={rowClassName}>{body}</div>
  }

  return (
    <Link
      to={notice.href || PATHS.networkFeed}
      onClick={onNavigate}
      className={cn(rowClassName, 'hover:bg-mist')}
    >
      {body}
    </Link>
  )
}

function NoticeKindBadge({ kind, compact }: { kind: NetworkNotice['kind']; compact?: boolean }) {
  const badge = KIND_BADGE[kind]
  return (
    <span
      className={cn(
        'absolute grid place-items-center rounded-full text-white ring-2',
        compact ? '-right-0.5 -bottom-0.5 size-5' : '-right-1 -bottom-1 size-7',
        badge.badge,
        badge.ring,
      )}
    >
      <badge.icon className={compact ? 'size-3' : 'size-4'} strokeWidth={2.4} fill="currentColor" />
    </span>
  )
}

function FriendRequestActions({
  compact,
  status,
  onAccept,
  onDecline,
}: {
  compact?: boolean
  status?: 'accepted' | 'declined'
  onAccept: () => void
  onDecline: () => void
}) {
  if (status === 'accepted') {
    return (
      <p className={cn('shrink-0 font-semibold text-brand', compact ? 'text-xs' : 'text-sm')}>
        Request accepted
      </p>
    )
  }
  if (status === 'declined') {
    return (
      <p className={cn('shrink-0 font-semibold text-muted', compact ? 'text-xs' : 'text-sm')}>
        Request declined
      </p>
    )
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <button
        type="button"
        onClick={onAccept}
        className={cn(
          'rounded-full bg-brand font-semibold text-white transition hover:bg-brand-dark',
          compact ? 'h-8 px-3.5 text-xs' : 'h-11 px-5 text-base',
        )}
      >
        Confirm
      </button>
      <button
        type="button"
        onClick={onDecline}
        className={cn(
          'rounded-full bg-white font-semibold text-ink ring-1 ring-black/[0.08] transition hover:bg-mist',
          compact ? 'h-8 px-3.5 text-xs' : 'h-11 px-5 text-base',
        )}
      >
        Decline
      </button>
    </div>
  )
}
