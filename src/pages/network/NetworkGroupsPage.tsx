import { useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PATHS, networkGroupPath } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import { Composer } from '@/features/network/components/feed/Composer'
import { PostCard } from '@/features/network/components/feed/PostCard'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NETWORK_GROUPS, getGroup } from '@/features/network/data/community'
import { getMember } from '@/features/network/data/members'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'

export function NetworkGroupsPage() {
  const [query, setQuery] = useState('')
  const groups = NETWORK_GROUPS.filter((group) =>
    `${group.name} ${group.category} ${group.description}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <NetworkCard>
          <h1 className="font-display text-3xl font-semibold">Groups</h1>
          <p className="mt-1 text-sm text-muted">
            Find your tribe by strategy, geography, or role — then go deep with the right peers.
          </p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Filter by name, latest joined, or topic"
            className="mt-4 h-11 w-full rounded-full bg-[#F0F2F5] px-4 text-sm outline-none"
          />
        </NetworkCard>
        <div className="grid gap-3 sm:grid-cols-2">
          {groups.map((group) => (
            <Link
              key={group.id}
              to={networkGroupPath(group.id)}
              className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04]"
            >
              <img src={group.cover} alt="" className="h-36 w-full object-cover" />
              <div className="p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">{group.category}</p>
                <h2 className="mt-1 font-semibold">{group.name}</h2>
                <p className="mt-1 text-xs text-muted">
                  {group.privacy} · {group.members.toLocaleString()} members · {group.lastActive}
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{group.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </NetworkPageFrame>
  )
}

export function NetworkGroupDetailPage() {
  const { groupId } = useParams()
  const group = getGroup(groupId ?? '')
  const { posts } = useNetworkSocial()
  const [joined, setJoined] = useState(false)

  if (!group) return <Navigate to={PATHS.networkGroups} replace />

  const feed = posts.filter((post) => group.memberIds.includes(post.memberId))
  const people = group.memberIds.map((id) => getMember(id)).filter((member) => member != null)

  return (
    <div className="pb-20">
      <div className="bg-white shadow-sm">
        <div className="w-full">
          <img src={group.cover} alt="" className="h-56 w-full object-cover sm:h-72" />
          <div className="px-4 py-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">{group.category}</p>
            <h1 className="font-display text-3xl font-semibold">{group.name}</h1>
            <p className="mt-1 text-sm text-muted">
              {group.privacy} group · {group.members.toLocaleString()} members
            </p>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink">{group.description}</p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button className="rounded-lg" onClick={() => setJoined((value) => !value)}>
                {joined ? 'Joined' : 'Join group'}
              </Button>
              <div className="flex -space-x-2">
                {people.slice(0, 6).map((member) => (
                  <MemberAvatar key={member.id} name={member.name} src={member.avatar} size="sm" className="ring-2 ring-white" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full space-y-4 px-3 py-4 sm:px-4 lg:px-5">
        <Composer />
        {feed.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {feed.length === 0 ? (
          <NetworkCard>
            <p className="text-sm text-muted">No posts in this group yet. Start the thread.</p>
          </NetworkCard>
        ) : null}
      </div>
    </div>
  )
}
