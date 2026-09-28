import { Link } from 'react-router-dom'
import { PATHS, networkGroupPath } from '@/app/router/paths'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { roleLabel } from '@/features/network/data/groups'
import { useNetworkGroups } from '@/features/network/model/useNetworkGroups'
import { cn } from '@/shared/lib/cn'

function MiniGroupRow({
  id,
  name,
  meta,
  badge,
}: {
  id: string
  name: string
  meta: string
  badge?: string
}) {
  return (
    <Link
      to={networkGroupPath(id)}
      className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 transition hover:bg-mist"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-ink">{name}</p>
        <p className="truncate text-xs text-muted">{meta}</p>
      </div>
      {badge ? (
        <span className="shrink-0 rounded-md bg-mist px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted">
          {badge}
        </span>
      ) : null}
    </Link>
  )
}

export function MyGroupsSection({ className }: { className?: string }) {
  const { joinedGroups, managedGroups, pendingGroups, myMembership } = useNetworkGroups()

  const joinedOnly = joinedGroups.filter(
    (group) => !managedGroups.some((managed) => managed.id === group.id),
  )

  const empty =
    joinedGroups.length === 0 && managedGroups.length === 0 && pendingGroups.length === 0

  return (
    <NetworkCard className={cn(className)}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">My Groups</h2>
          <p className="mt-0.5 text-sm text-muted">Joined, managed, and pending requests.</p>
        </div>
        <Link to={PATHS.networkGroups} className="text-sm font-semibold text-brand hover:underline">
          Discover
        </Link>
      </div>

      {empty ? (
        <p className="mt-4 text-sm text-muted">
          You have not joined any groups yet. Browse below to find your community.
        </p>
      ) : (
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              Joined · {joinedOnly.length}
            </p>
            <div className="space-y-0.5">
              {joinedOnly.length === 0 ? (
                <p className="px-2 py-2 text-xs text-muted">None yet</p>
              ) : (
                joinedOnly.slice(0, 5).map((group) => (
                  <MiniGroupRow
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    meta={`${group.members.toLocaleString()} members · ${group.geography}`}
                    badge={
                      myMembership(group.id).role
                        ? roleLabel(myMembership(group.id).role!)
                        : undefined
                    }
                  />
                ))
              )}
            </div>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              Managing · {managedGroups.length}
            </p>
            <div className="space-y-0.5">
              {managedGroups.length === 0 ? (
                <p className="px-2 py-2 text-xs text-muted">None yet</p>
              ) : (
                managedGroups.slice(0, 5).map((group) => (
                  <MiniGroupRow
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    meta={group.privacy}
                    badge={
                      myMembership(group.id).role
                        ? roleLabel(myMembership(group.id).role!)
                        : undefined
                    }
                  />
                ))
              )}
            </div>
          </div>
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              Pending · {pendingGroups.length}
            </p>
            <div className="space-y-0.5">
              {pendingGroups.length === 0 ? (
                <p className="px-2 py-2 text-xs text-muted">No open requests</p>
              ) : (
                pendingGroups.slice(0, 5).map((group) => (
                  <MiniGroupRow
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    meta="Awaiting approval"
                    badge="Pending"
                  />
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </NetworkCard>
  )
}
