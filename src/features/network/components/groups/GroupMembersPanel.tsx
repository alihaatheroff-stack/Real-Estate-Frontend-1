import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { canManageGroup, roleLabel } from '@/features/network/data/groups'
import { getMember } from '@/features/network/data/members'
import type { GroupMemberRole, NetworkGroup } from '@/features/network/data/types'
import { networkProfilePath } from '@/app/router/paths'
import { useNetworkGroups } from '@/features/network/model/useNetworkGroups'

type GroupMembersPanelProps = {
  group: NetworkGroup
  manage?: boolean
}

const ROLE_OPTIONS: GroupMemberRole[] = ['member', 'moderator', 'admin', 'owner']

export function GroupMembersPanel({ group, manage = false }: GroupMembersPanelProps) {
  const {
    myMembership,
    approveRequest,
    declineRequest,
    setMemberRole,
    removeMember,
  } = useNetworkGroups()
  const myRole = myMembership(group.id).role
  const canManage = manage && canManageGroup(myRole)

  const active = group.memberships.filter((m) => m.status === 'active')
  const pending = group.memberships.filter((m) => m.status === 'pending')

  return (
    <div className="space-y-5">
      {canManage && pending.length > 0 ? (
        <div>
          <h3 className="text-sm font-semibold text-ink">
            Membership requests · {pending.length}
          </h3>
          <ul className="mt-2 divide-y divide-black/[0.06]">
            {pending.map((row) => {
              const member = getMember(row.memberId)
              if (!member) return null
              return (
                <li key={row.memberId} className="flex items-center justify-between gap-3 py-3">
                  <Link
                    to={networkProfilePath(member.id)}
                    className="flex min-w-0 items-center gap-3"
                  >
                    <MemberAvatar name={member.name} src={member.avatar} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{member.name}</p>
                      <p className="truncate text-xs text-muted">
                        {member.title} · {member.city}
                      </p>
                    </div>
                  </Link>
                  <div className="flex shrink-0 gap-2">
                    <Button
                      size="sm"
                      className="rounded-lg"
                      onClick={() => approveRequest(group.id, row.memberId)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-lg"
                      onClick={() => declineRequest(group.id, row.memberId)}
                    >
                      Decline
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      <div>
        <h3 className="text-sm font-semibold text-ink">Members · {active.length}</h3>
        {active.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No members yet.</p>
        ) : (
          <ul className="mt-2 divide-y divide-black/[0.06]">
            {active.map((row) => {
              const member = getMember(row.memberId)
              if (!member) return null
              const showControls = canManage && (row.role !== 'owner' || myRole === 'owner')
              return (
                <li
                  key={row.memberId}
                  className="flex flex-wrap items-center justify-between gap-3 py-3"
                >
                  <Link
                    to={networkProfilePath(member.id)}
                    className="flex min-w-0 items-center gap-3"
                  >
                    <MemberAvatar name={member.name} src={member.avatar} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{member.name}</p>
                      <p className="truncate text-xs text-muted">
                        {roleLabel(row.role)} · {member.title}
                      </p>
                    </div>
                  </Link>
                  {showControls ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        aria-label={`Role for ${member.name}`}
                        value={row.role}
                        disabled={row.role === 'owner' && myRole !== 'owner'}
                        onChange={(event) =>
                          setMemberRole(
                            group.id,
                            row.memberId,
                            event.target.value as GroupMemberRole,
                          )
                        }
                        className="h-9 rounded-lg border border-line bg-paper px-2 text-xs"
                      >
                        {ROLE_OPTIONS.filter((option) =>
                          myRole === 'owner' ? true : option !== 'owner',
                        ).map((option) => (
                          <option key={option} value={option}>
                            {roleLabel(option)}
                          </option>
                        ))}
                      </select>
                      {row.role !== 'owner' ? (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="rounded-lg text-red-700"
                          onClick={() => removeMember(group.id, row.memberId)}
                        >
                          Remove
                        </Button>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
