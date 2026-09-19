import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { networkGroupPath } from '@/app/router/paths'
import { MemberCard } from '@/features/network/components/shared/MemberCard'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NETWORK_GROUPS } from '@/features/network/data/community'
import { NETWORK_MEMBERS, getCurrentMember } from '@/features/network/data/members'

export function NetworkSearchPage() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const me = getCurrentMember()

  const people = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return NETWORK_MEMBERS.filter((member) => member.id !== me.id).filter((member) => {
      if (!needle) return true
      return `${member.name} ${member.title} ${member.city} ${member.buyBox} ${member.company}`
        .toLowerCase()
        .includes(needle)
    })
  }, [q, me.id])

  const groups = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return NETWORK_GROUPS.filter((group) => {
      if (!needle) return true
      return `${group.name} ${group.description} ${group.category}`.toLowerCase().includes(needle)
    })
  }, [q])

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-5">
        <NetworkCard>
          <h1 className="font-display text-3xl font-semibold">Search</h1>
          <p className="mt-1 text-sm text-muted">Filter by name, trade, zip, or the room you want next.</p>
          <input
            value={q}
            onChange={(event) =>
              setParams(event.target.value ? { q: event.target.value } : {}, { replace: true })
            }
            placeholder="Search people and groups"
            className="mt-4 h-11 w-full rounded-full bg-[#F0F2F5] px-4 text-sm outline-none ring-brand/30 focus:ring-2"
          />
        </NetworkCard>

        <section>
          <h2 className="mb-3 text-lg font-semibold">People · {people.length}</h2>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {people.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold">Groups · {groups.length}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {groups.map((group) => (
              <Link
                key={group.id}
                to={networkGroupPath(group.id)}
                className="overflow-hidden rounded-xl bg-white shadow-sm"
              >
                <img src={group.cover} alt="" className="h-28 w-full object-cover" />
                <div className="p-4">
                  <p className="font-semibold">{group.name}</p>
                  <p className="text-xs text-muted">{group.members.toLocaleString()} members</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </NetworkPageFrame>
  )
}
