import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, UserCheck } from 'lucide-react'
import { networkProfilePath, PATHS } from '@/app/router/paths'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import type { NetworkMember } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

export function MemberCard({
  member,
  compact,
}: {
  member: NetworkMember
  compact?: boolean
}) {
  const [connected, setConnected] = useState(false)

  if (compact) {
    return (
      <article className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-black/[0.04]">
        <MemberAvatar
          name={member.name}
          src={member.avatar}
          memberId={member.id}
          online={member.online}
          framed
        />
        <div className="min-w-0 flex-1">
          <Link to={networkProfilePath(member.id)} className="block truncate text-sm font-semibold hover:underline">
            {member.name}
          </Link>
          <p className="truncate text-xs text-muted">
            {member.title} · {member.mutualCount} mutual
          </p>
        </div>
        <ConnectButton connected={connected} onClick={() => setConnected((value) => !value)} small />
      </article>
    )
  }

  return (
    <article className="rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04]">
      <Link to={networkProfilePath(member.id)} className="block">
        <div className="overflow-hidden rounded-t-xl">
          <img src={member.cover} alt="" className="h-24 w-full object-cover" />
        </div>
      </Link>
      <div className="relative px-4 pb-4 pt-10">
        <Link to={networkProfilePath(member.id)} className="absolute -top-8 left-4 rounded-full">
          <MemberAvatar name={member.name} src={member.avatar} size="lg" framed />
        </Link>
        <Link to={networkProfilePath(member.id)} className="block font-semibold leading-tight hover:underline">
          {member.name}
        </Link>
        <p className="mt-0.5 text-xs text-muted">
          {member.title} · {member.city}
        </p>
        <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-muted">{member.buyBox}</p>
        <div className="mt-3 flex gap-2">
          <ConnectButton connected={connected} onClick={() => setConnected((value) => !value)} />
          <Link
            to={PATHS.networkMessages}
            className="inline-flex h-9 flex-1 items-center justify-center rounded-lg bg-mist text-sm font-semibold text-ink hover:bg-line"
          >
            Message
          </Link>
        </div>
      </div>
    </article>
  )
}

function ConnectButton({
  connected,
  onClick,
  small,
}: {
  connected: boolean
  onClick: () => void
  small?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition',
        small ? 'h-8 px-2.5 text-xs' : 'h-9 flex-1 text-sm',
        connected ? 'bg-mist text-ink' : 'bg-brand text-white hover:bg-brand-dark',
      )}
    >
      {connected ? <UserCheck className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
      {connected ? 'Friends' : 'Connect'}
    </button>
  )
}
