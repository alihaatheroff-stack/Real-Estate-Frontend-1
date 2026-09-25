import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CalendarDays, Camera, Cake } from 'lucide-react'
import { PATHS, networkProfilePath } from '@/app/router/paths'
import { AdvertiseSlot, FeedAdCarousel } from '@/features/network/components/feed/FeedAdCard'
import { COMMUNITY_SOCIALS } from '@/features/network/components/community/SocialPlatformIcons'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { NETWORK_EVENTS } from '@/features/network/data/community'
import { FEED_BIRTHDAY_IDS, FEED_LEFT_ADS } from '@/features/network/data/feedAds'
import { PEOPLE_YOU_MAY_KNOW } from '@/features/network/data/feed'
import { NETWORK_MEMBERS, getCurrentMember, getMember } from '@/features/network/data/members'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import type { NetworkMember } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

const EVENT_TONES = [
  { wrap: 'bg-emerald-50', icon: 'text-emerald-600', Icon: CalendarDays },
  { wrap: 'bg-rose-50', icon: 'text-rose-500', Icon: Camera },
] as const

export function NetworkLeftRail() {
  const me = getCurrentMember()
  const { followingIds, toggleFollow } = useNetworkSocial()
  const [ignoredIds, setIgnoredIds] = useState<string[]>([])

  const suggestion = useMemo(() => {
    const taken = new Set([me.id, ...followingIds, ...ignoredIds])
    const pool = [
      ...PEOPLE_YOU_MAY_KNOW.map((id) => getMember(id)),
      ...NETWORK_MEMBERS,
    ].filter((member): member is NetworkMember => member != null && !taken.has(member.id))
    return pool[0] ?? null
  }, [followingIds, ignoredIds, me.id])

  const birthdays = FEED_BIRTHDAY_IDS.map((id) => getMember(id)).filter(
    (member): member is NetworkMember => member != null,
  )

  return (
    <>
      {FEED_LEFT_ADS.length > 0 ? <FeedAdCarousel ads={FEED_LEFT_ADS} /> : null}

      {suggestion ? (
        <NetworkCard>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-ink">You Might Like</h2>
            <Link
              to={`${PATHS.networkFriends}?tab=suggest`}
              className="text-xs font-semibold text-brand hover:underline"
            >
              See All
            </Link>
          </div>
          <div className="flex items-start gap-3">
            <MemberAvatar
              name={suggestion.name}
              src={suggestion.avatar}
              memberId={suggestion.id}
              size="lg"
              framed
            />
            <div className="min-w-0 flex-1 pt-0.5">
              <Link
                to={networkProfilePath(suggestion.id)}
                className="block truncate text-sm font-semibold text-ink hover:underline"
              >
                {suggestion.name}
              </Link>
              <p className="truncate text-xs text-muted">
                {suggestion.title} at {suggestion.company}
              </p>
              <div className="mt-2 flex items-center gap-2.5 text-muted">
                {COMMUNITY_SOCIALS.map((social) => (
                  <span key={social.label} title={social.label} className="inline-flex">
                    <social.Icon className="size-3.5" />
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIgnoredIds((ids) => [...ids, suggestion.id])}
              className="h-9 rounded-full border border-line bg-white text-sm font-semibold text-ink transition hover:bg-mist"
            >
              Ignore
            </button>
            <button
              type="button"
              onClick={() => toggleFollow(suggestion.id)}
              className="h-9 rounded-full bg-brand text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Follow
            </button>
          </div>
        </NetworkCard>
      ) : null}

      <NetworkCard>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-ink">Recent Event</h2>
          <Link to={PATHS.networkEvents} className="text-xs font-semibold text-brand hover:underline">
            See All
          </Link>
        </div>
        <ul className="space-y-3">
          {NETWORK_EVENTS.slice(0, 2).map((event, index) => {
            const tone = EVENT_TONES[index % EVENT_TONES.length]!
            const faces = NETWORK_MEMBERS.slice(index * 2, index * 2 + 3)
            return (
              <li key={event.id}>
                <Link
                  to={PATHS.networkEvents}
                  className="flex gap-3 rounded-xl p-1.5 transition hover:bg-mist"
                >
                  <span
                    className={cn(
                      'grid h-11 w-11 shrink-0 place-items-center rounded-xl',
                      tone.wrap,
                    )}
                  >
                    <tone.Icon className={cn('h-5 w-5', tone.icon)} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold leading-snug text-ink">{event.title}</span>
                    <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
                      {event.description}
                    </span>
                    <span className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted">{event.going} seen</span>
                      <span className="flex -space-x-1.5">
                        {faces.map((member) => (
                          <img
                            key={member.id}
                            src={member.avatar}
                            alt=""
                            className="h-5 w-5 rounded-full object-cover ring-2 ring-white"
                          />
                        ))}
                        <span className="grid h-5 min-w-5 place-items-center rounded-full bg-mist px-1 text-[9px] font-semibold text-muted ring-2 ring-white">
                          +{Math.max(event.going - faces.length, 1)}
                        </span>
                      </span>
                    </span>
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </NetworkCard>

      {FEED_LEFT_ADS.length > 1 ? (
        <FeedAdCarousel ads={FEED_LEFT_ADS} initialAdIndex={2} />
      ) : null}

      <NetworkCard>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-ink">Birthdays</h2>
          <Link
            to={PATHS.networkFriends}
            className="text-xs font-semibold text-brand hover:underline"
          >
            See All
          </Link>
        </div>
        <ul className="space-y-3">
          {birthdays.map((member) => (
            <li key={member.id}>
              <Link
                to={networkProfilePath(member.id)}
                className="flex items-center gap-3 rounded-lg px-1 py-0.5 hover:bg-mist"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600">
                  <Cake className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-ink">{member.name}</span>
                  <span className="text-xs text-muted">Celebrating today</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </NetworkCard>

      <AdvertiseSlot />
    </>
  )
}
