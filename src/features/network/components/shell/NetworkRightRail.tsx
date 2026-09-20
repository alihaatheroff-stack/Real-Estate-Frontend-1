import { Link } from 'react-router-dom'
import { ChevronRight, Search } from 'lucide-react'
import { PATHS, networkProfilePath } from '@/app/router/paths'
import { AdvertiseSlot, FeedAdCard } from '@/features/network/components/feed/FeedAdCard'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NETWORK_LISTINGS } from '@/features/network/data/community'
import { FEED_RIGHT_ADS } from '@/features/network/data/feedAds'
import { PEOPLE_YOU_MAY_KNOW } from '@/features/network/data/feed'
import { NETWORK_MEMBERS, getCurrentMember, getMember } from '@/features/network/data/members'

export function NetworkRightRail() {
  const me = getCurrentMember()
  const contacts = NETWORK_MEMBERS.filter((member) => member.id !== me.id).slice(0, 8)
  const sponsored = NETWORK_LISTINGS.slice(0, 2)
  const suggested = PEOPLE_YOU_MAY_KNOW.map((id) => getMember(id)).filter(
    (member) => member && member.id !== me.id,
  ).slice(0, 3)

  return (
    <>
      {FEED_RIGHT_ADS[0] ? <FeedAdCard ad={FEED_RIGHT_ADS[0]} /> : null}

      <NetworkCard>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-ink">Sponsored</h2>
          <Link to={PATHS.networkMarketplace} className="text-xs font-semibold text-brand hover:underline">
            See all
          </Link>
        </div>
        <div className="space-y-2">
          {sponsored.map((listing) => (
            <FeedAdCard
              key={listing.id}
              variant="row"
              ad={{
                id: listing.id,
                title: listing.title,
                subtitle: `${listing.price} · ${listing.location}`,
                image: listing.image,
                href: PATHS.networkMarketplace,
                sponsor: listing.category,
              }}
            />
          ))}
        </div>
      </NetworkCard>

      {FEED_RIGHT_ADS[1] ? <FeedAdCard ad={FEED_RIGHT_ADS[1]} /> : null}

      {suggested.length > 0 ? (
        <NetworkCard>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-ink">People you may know</h2>
            <Link
              to={`${PATHS.networkFriends}?tab=suggest`}
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted hover:bg-mist"
              aria-label="See more people"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="flex items-start justify-between gap-2">
            {suggested.map((member) =>
              member ? (
                <Link
                  key={member.id}
                  to={networkProfilePath(member.id)}
                  className="flex min-w-0 flex-1 flex-col items-center gap-1.5 text-center"
                >
                  <MemberAvatar name={member.name} src={member.avatar} />
                  <span className="w-full truncate text-xs font-semibold text-ink">{member.firstName}</span>
                </Link>
              ) : null,
            )}
          </div>
        </NetworkCard>
      ) : null}

      <div>
        <div className="mb-2 flex items-center justify-between px-1">
          <h2 className="text-[15px] font-semibold text-muted">Friends</h2>
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
                <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
                  {member.name}
                </span>
                {member.online ? (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                ) : (
                  <span className="text-[11px] text-muted">2h</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <AdvertiseSlot />
    </>
  )
}
