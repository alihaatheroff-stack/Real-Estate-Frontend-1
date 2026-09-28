import { Link } from 'react-router-dom'
import { MapPin, Users } from 'lucide-react'
import { networkGroupPath } from '@/app/router/paths'
import { Badge } from '@/components/ui/Badge'
import { GroupMembershipButton } from '@/features/network/components/groups/GroupMembershipButton'
import type { NetworkGroup } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

type GroupCardProps = {
  group: NetworkGroup
  className?: string
  compact?: boolean
}

export function GroupCard({ group, className, compact = false }: GroupCardProps) {
  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04]',
        className,
      )}
    >
      <Link to={networkGroupPath(group.id)} className="block shrink-0">
        <img
          src={group.cover}
          alt=""
          className={cn('w-full object-cover', compact ? 'h-28' : 'h-36')}
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">
            {group.category}
          </p>
          <Badge tone={group.privacy === 'Private' ? 'ink' : 'muted'} className="normal-case">
            {group.privacy}
          </Badge>
        </div>
        <Link to={networkGroupPath(group.id)} className="mt-1">
          <h2 className="font-semibold text-ink hover:text-brand">{group.name}</h2>
        </Link>
        <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3 w-3" aria-hidden />
            {group.geography}
          </span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3 w-3" aria-hidden />
            {group.members.toLocaleString()} members
          </span>
          <span aria-hidden>·</span>
          <span>Active {group.lastActive}</span>
        </p>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{group.description}</p>
        {group.tags.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {group.tags.slice(0, 4).map((tag) => (
              <Badge key={tag} tone="muted" className="font-medium normal-case">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            to={networkGroupPath(group.id)}
            className="inline-flex h-9 items-center justify-center rounded-lg border border-line bg-paper/80 px-3 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand"
          >
            View Group
          </Link>
          <GroupMembershipButton groupId={group.id} size="sm" />
        </div>
      </div>
    </article>
  )
}
