import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberCard } from '@/features/network/components/shared/MemberCard'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { GroupCard } from '@/features/network/components/groups/GroupCard'
import { NETWORK_EVENTS } from '@/features/network/data/community'
import { NETWORK_MEMBERS, getCurrentMember, getMember } from '@/features/network/data/members'
import { useNetworkGroups } from '@/features/network/model/useNetworkGroups'

export function NetworkExplorePage() {
  const me = getCurrentMember()
  const { groups } = useNetworkGroups()
  const [query, setQuery] = useState('')
  const people = useMemo(
    () =>
      NETWORK_MEMBERS.filter((member) => member.id !== me.id).filter((member) => {
        const hay = `${member.name} ${member.title} ${member.city} ${member.buyBox}`.toLowerCase()
        return hay.includes(query.trim().toLowerCase())
      }),
    [me.id, query],
  )

  const exploreGroups = useMemo(
    () =>
      groups
        .filter((group) => !group.archived)
        .filter((group) => {
          const needle = query.trim().toLowerCase()
          if (!needle) return true
          return `${group.name} ${group.description} ${group.category} ${group.geography}`
            .toLowerCase()
            .includes(needle)
        })
        .slice(0, 4),
    [groups, query],
  )

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-5">
        <NetworkCard>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Explore</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
            Find people, groups, and rooms worth joining
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Suggestions tuned to your markets and how you want to participate — mile radius from your zip, or the
            people already in your graph.
          </p>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by name, trade, or city"
            className="mt-4 h-11 w-full rounded-full bg-[#F0F2F5] px-4 text-sm outline-none ring-brand/30 focus:ring-2"
          />
        </NetworkCard>

        <section>
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold">People you may know</h2>
            <Link to={PATHS.networkFriends} className="text-sm font-semibold text-brand hover:underline">
              Friend requests
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {people.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold">Groups to join</h2>
            <Link to={PATHS.networkGroups} className="text-sm font-semibold text-brand hover:underline">
              See all
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {exploreGroups.map((group) => (
              <GroupCard key={group.id} group={group} compact />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-xl font-semibold">Upcoming events</h2>
            <Link to={PATHS.networkEvents} className="text-sm font-semibold text-brand hover:underline">
              Calendar
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {NETWORK_EVENTS.map((event) => {
              const host = getMember(event.hostId)
              return (
                <article key={event.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/[0.04]">
                  <img src={event.cover} alt="" className="h-32 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand">{event.date}</p>
                    <h3 className="mt-1 font-semibold text-ink">{event.title}</h3>
                    <p className="mt-1 text-sm text-muted">
                      {event.time} · {event.location}
                    </p>
                    <p className="mt-2 text-xs text-muted">
                      Hosted by {host?.name} · {event.going} going
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>
    </NetworkPageFrame>
  )
}
