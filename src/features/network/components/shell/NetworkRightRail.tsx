import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { PATHS, networkProfilePath } from '@/app/router/paths'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NETWORK_MEMBERS, getCurrentMember } from '@/features/network/data/members'
import { NETWORK_LISTINGS } from '@/features/network/data/community'

export function NetworkRightRail() {
  const me = getCurrentMember()
  const contacts = NETWORK_MEMBERS.filter((member) => member.id !== me.id).slice(0, 10)
  const sponsored = NETWORK_LISTINGS.slice(0, 2)

  return (
    <div className="network-thin-scroll flex max-h-[calc(100vh-5.5rem)] flex-col gap-4 overflow-y-auto pb-8 pl-1">
      <NetworkCard>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[17px] font-semibold text-muted">Sponsored deals</h2>
          <Link to={PATHS.networkMarketplace} className="text-xs font-semibold text-brand hover:underline">
            See all
          </Link>
        </div>
        <div className="space-y-3">
          {sponsored.map((listing) => (
            <Link
              key={listing.id}
              to={PATHS.networkMarketplace}
              className="flex gap-3 rounded-lg p-1 hover:bg-mist"
            >
              <img src={listing.image} alt="" className="h-24 w-28 shrink-0 rounded-lg object-cover" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-snug text-ink">{listing.title}</span>
                <span className="mt-1 block text-xs text-muted">
                  {listing.price} · {listing.location}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </NetworkCard>

      <div>
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-[17px] font-semibold text-muted">Contacts</h2>
          <Search className="h-4 w-4 text-muted" />
        </div>
        <ul className="space-y-0.5">
          {contacts.map((member) => (
            <li key={member.id}>
              <Link
                to={networkProfilePath(member.id)}
                className="flex items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-white/80"
              >
                <MemberAvatar
                  name={member.name}
                  src={member.avatar}
                  size="sm"
                  online={member.online}
                />
                <span className="truncate text-sm font-semibold text-ink">{member.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
