import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { Users } from 'lucide-react'
import type { NetworkMember } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

export function ConversationAvatar({
  avatars,
  title,
  online,
  isGroup,
  groupAvatar,
  size = 'md',
  linked = false,
}: {
  avatars: NetworkMember[]
  title: string
  online?: boolean
  isGroup?: boolean
  groupAvatar?: string
  size?: 'sm' | 'md' | 'lg'
  linked?: boolean
}) {
  const box =
    size === 'lg' ? 'size-28' : size === 'sm' ? 'size-10' : 'size-12'

  if (isGroup) {
    if (groupAvatar) {
      return (
        <span className={cn('relative block shrink-0 overflow-hidden rounded-full bg-mist', box)}>
          <img src={groupAvatar} alt={title} className="size-full object-cover" />
        </span>
      )
    }

    if (avatars.length >= 2 && size !== 'lg') {
      return (
        <span className={cn('relative block shrink-0', size === 'sm' ? 'size-10' : 'size-12')}>
          <span className="absolute top-0 left-0">
            <MemberAvatar name={avatars[0].name} src={avatars[0].avatar} size="xs" />
          </span>
          <span className="absolute right-0 bottom-0 rounded-full ring-2 ring-white">
            <MemberAvatar name={avatars[1].name} src={avatars[1].avatar} size="xs" />
          </span>
        </span>
      )
    }

    return (
      <span
        className={cn(
          'grid shrink-0 place-items-center rounded-full bg-mist text-brand',
          box,
        )}
      >
        <Users className={size === 'lg' ? 'size-12' : 'size-5'} strokeWidth={1.85} />
        <span className="sr-only">{title}</span>
      </span>
    )
  }

  const member = avatars[0]
  if (!member) {
    return <span className={cn('shrink-0 rounded-full bg-mist', box)} />
  }

  return (
    <MemberAvatar
      name={member.name}
      src={member.avatar}
      memberId={linked ? member.id : undefined}
      online={online}
      size={size === 'lg' ? 'xl' : size === 'sm' ? 'sm' : 'md'}
    />
  )
}
