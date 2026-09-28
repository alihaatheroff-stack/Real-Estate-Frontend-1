import { useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, MapPin, Plus, Shield, Users } from 'lucide-react'
import { PATHS, networkGroupPath } from '@/app/router/paths'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { GroupCard } from '@/features/network/components/groups/GroupCard'
import { GroupsFilterBar } from '@/features/network/components/groups/GroupsFilterBar'
import { MyGroupsSection } from '@/features/network/components/groups/MyGroupsSection'
import { RecommendedGroupsSection } from '@/features/network/components/groups/RecommendedGroupsSection'
import { GroupMembershipButton } from '@/features/network/components/groups/GroupMembershipButton'
import { GroupMembersPanel } from '@/features/network/components/groups/GroupMembersPanel'
import { GroupManagePanel } from '@/features/network/components/groups/GroupManagePanel'
import { CreateGroupDialog } from '@/features/network/components/groups/CreateGroupDialog'
import {
  EMPTY_GROUP_FILTERS,
  groupFiltersActive,
  type GroupFiltersState,
} from '@/features/network/data/groupCategories'
import { canManageGroup, filterGroups, roleLabel, sortGroups } from '@/features/network/data/groups'
import { CURRENT_MEMBER_ID, getMember } from '@/features/network/data/members'
import { useNetworkGroups } from '@/features/network/model/useNetworkGroups'
import { cn } from '@/shared/lib/cn'

type DetailTab = 'about' | 'members' | 'rules' | 'admins' | 'manage'

export function NetworkGroupsPage() {
  const navigate = useNavigate()
  const { groups, loading, error } = useNetworkGroups()
  const [filters, setFilters] = useState<GroupFiltersState>(EMPTY_GROUP_FILTERS)
  const [createOpen, setCreateOpen] = useState(false)
  const discoverRef = useRef<HTMLElement>(null)
  const filtersActive = groupFiltersActive(filters)

  const visible = useMemo(() => {
    const filtered = filterGroups(groups, filters)
    return sortGroups(filtered, filters.sort, CURRENT_MEMBER_ID)
  }, [groups, filters])

  function handleFiltersChange(next: GroupFiltersState) {
    setFilters(next)
    requestAnimationFrame(() => {
      discoverRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <NetworkCard>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-semibold">Groups</h1>
              <p className="mt-1 text-sm text-muted">
                Find your tribe by strategy, geography, or role — then go deep with the right peers.
              </p>
            </div>
            <Button
              className="rounded-lg"
              leftIcon={<Plus className="h-4 w-4" />}
              onClick={() => setCreateOpen(true)}
            >
              Create group
            </Button>
          </div>
          <div className="mt-4">
            <GroupsFilterBar
              filters={filters}
              onChange={handleFiltersChange}
              resultCount={loading ? undefined : visible.length}
            />
          </div>
        </NetworkCard>

        {error ? (
          <NetworkCard>
            <p className="text-sm text-red-700">{error}</p>
          </NetworkCard>
        ) : null}

        <section ref={discoverRef} className="scroll-mt-4 space-y-3">
          <div className="flex items-end justify-between gap-3 px-0.5">
            <h2 className="font-display text-xl font-semibold">
              {filtersActive ? 'Matching groups' : 'Discover communities'}
            </h2>
            <p className="text-sm text-muted">{visible.length} shown</p>
          </div>

          {loading ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-72 animate-pulse rounded-xl bg-white/80 ring-1 ring-black/[0.04]"
                />
              ))}
            </div>
          ) : visible.length === 0 ? (
            <NetworkCard>
              <p className="font-semibold text-ink">No groups match your filters</p>
              <p className="mt-1 text-sm text-muted">
                Try clearing a filter or searching a different keyword. Or create a new community.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY_GROUP_FILTERS)}
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  Reset filters
                </button>
                <button
                  type="button"
                  onClick={() => setCreateOpen(true)}
                  className="text-sm font-semibold text-brand hover:underline"
                >
                  Create group
                </button>
              </div>
            </NetworkCard>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {visible.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </div>
          )}
        </section>

        {!filtersActive ? (
          <>
            <MyGroupsSection />
            <RecommendedGroupsSection />
          </>
        ) : null}
      </div>

      <CreateGroupDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreated={(groupId) => navigate(networkGroupPath(groupId))}
      />
    </NetworkPageFrame>
  )
}

export function NetworkGroupDetailPage() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const { getGroup, loading, myMembership } = useNetworkGroups()
  const [tab, setTab] = useState<DetailTab>('about')

  const group = getGroup(groupId ?? '')

  if (!loading && !group) {
    return <Navigate to={PATHS.networkGroups} replace />
  }

  if (loading || !group) {
    return (
      <div className="space-y-4 px-3 py-4 sm:px-4 lg:px-5">
        <div className="h-56 animate-pulse rounded-xl bg-white/80 sm:h-72" />
        <div className="h-40 animate-pulse rounded-xl bg-white/80" />
      </div>
    )
  }

  const membership = myMembership(group.id)
  const canManage = canManageGroup(membership.role)
  const admins = group.memberships.filter(
    (m) =>
      m.status === 'active' &&
      (m.role === 'owner' || m.role === 'admin' || m.role === 'moderator'),
  )
  const previewMembers = group.memberIds
    .map((id) => getMember(id))
    .filter((member): member is NonNullable<typeof member> => member != null)
    .slice(0, 8)

  const tabs: { id: DetailTab; label: string; hidden?: boolean }[] = [
    { id: 'about', label: 'About' },
    { id: 'members', label: 'Members' },
    { id: 'rules', label: 'Rules' },
    { id: 'admins', label: 'Admins' },
    { id: 'manage', label: 'Manage', hidden: !canManage },
  ]

  return (
    <div className="pb-20">
      <div className="bg-white shadow-sm">
        <img src={group.cover} alt="" className="h-56 w-full object-cover sm:h-72" />
        <div className="px-4 py-4 sm:px-5">
          <button
            type="button"
            onClick={() => navigate(PATHS.networkGroups)}
            className="mb-3 inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            All groups
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              {group.category}
            </p>
            <Badge tone={group.privacy === 'Private' ? 'ink' : 'muted'} className="normal-case">
              {group.privacy}
            </Badge>
            {membership.role ? (
              <Badge tone="brand" className="normal-case">
                Your role · {roleLabel(membership.role)}
              </Badge>
            ) : null}
          </div>

          <h1 className="mt-1 font-display text-3xl font-semibold">{group.name}</h1>

          <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {group.geography}
            </span>
            <span className="inline-flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {group.members.toLocaleString()} members
            </span>
            <span>Active {group.lastActive}</span>
          </p>

          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink">{group.description}</p>

          {group.tags.length > 0 ? (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {group.tags.map((tag) => (
                <Badge key={tag} tone="muted" className="font-medium normal-case">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <GroupMembershipButton groupId={group.id} allowLeave />
            <div className="flex -space-x-2">
              {previewMembers.map((member) => (
                <MemberAvatar
                  key={member.id}
                  name={member.name}
                  src={member.avatar}
                  size="sm"
                  className="ring-2 ring-white"
                />
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-1 border-t border-black/[0.06] pt-3">
            {tabs
              .filter((item) => !item.hidden)
              .map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    'rounded-lg px-3 py-2 text-sm font-semibold transition',
                    tab === item.id
                      ? 'bg-brand/10 text-brand'
                      : 'text-muted hover:bg-mist hover:text-ink',
                  )}
                >
                  {item.label}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="w-full space-y-4 px-3 py-4 sm:px-4 lg:px-5">
        <NetworkCard>
          {tab === 'about' ? (
            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-ink">About</h2>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-ink">
                  {group.about}
                </p>
              </div>
              <dl className="grid gap-3 sm:grid-cols-2">
                <Meta label="Industry" value={group.industry} />
                <Meta label="Professional role" value={group.professionalRole} />
                <Meta label="Geography" value={group.geography} />
                <Meta label="Strategy" value={group.strategy} />
                <Meta label="Interest" value={group.interest} />
                <Meta label="Privacy" value={group.privacy} />
              </dl>
              <p className="text-xs text-muted">
                Groups are communities of people. Topic discussions live in Forums; long-form
                writing lives in Articles.
              </p>
            </div>
          ) : null}

          {tab === 'members' ? <GroupMembersPanel group={group} manage={canManage} /> : null}

          {tab === 'rules' ? (
            <div>
              <h2 className="font-semibold text-ink">Group rules</h2>
              {group.rules.length === 0 ? (
                <p className="mt-2 text-sm text-muted">No rules published yet.</p>
              ) : (
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink">
                  {group.rules.map((rule) => (
                    <li key={rule}>{rule}</li>
                  ))}
                </ol>
              )}
            </div>
          ) : null}

          {tab === 'admins' ? (
            <div>
              <h2 className="mb-3 font-semibold text-ink">Admins & moderators</h2>
              {admins.length === 0 ? (
                <p className="text-sm text-muted">No admins listed.</p>
              ) : (
                <ul className="divide-y divide-black/[0.06]">
                  {admins.map((row) => {
                    const member = getMember(row.memberId)
                    if (!member) return null
                    return (
                      <li key={row.memberId} className="flex items-center gap-3 py-3">
                        <MemberAvatar name={member.name} src={member.avatar} size="sm" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold">{member.name}</p>
                          <p className="truncate text-xs text-muted">{member.title}</p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
                          <Shield className="h-3.5 w-3.5" />
                          {roleLabel(row.role)}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          ) : null}

          {tab === 'manage' && canManage ? <GroupManagePanel group={group} /> : null}
        </NetworkCard>
      </div>
    </div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-mist/70 px-3 py-2">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-muted">{label}</dt>
      <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
    </div>
  )
}
