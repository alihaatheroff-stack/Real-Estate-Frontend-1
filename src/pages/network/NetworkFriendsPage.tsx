import { useLayoutEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CommunityPersonCard, type CommunityCardMode } from '@/features/network/components/community/CommunityPersonCard'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { FRIEND_REQUESTS, PEOPLE_YOU_MAY_KNOW } from '@/features/network/data/feed'
import { NETWORK_MEMBERS, getCurrentMember, getFollowers, getFollowing, getMember } from '@/features/network/data/members'
import { cn } from '@/shared/lib/cn'
import type { NetworkMember } from '@/features/network/data/types'

type CommunityTab = 'requests' | 'followers' | 'following' | 'suggest'

function formatCount(value: number) {
  return value.toLocaleString('en-US')
}

function parseCommunityTab(value: string | null): CommunityTab {
  if (value === 'followers' || value === 'following' || value === 'suggest' || value === 'requests') {
    return value
  }
  if (value === 'friends') return 'requests'
  return 'requests'
}

export function NetworkFriendsPage() {
  const me = getCurrentMember()
  const [params, setParams] = useSearchParams()
  const tab = parseCommunityTab(params.get('tab'))

  function setTab(next: CommunityTab) {
    setParams(next === 'requests' ? {} : { tab: next }, { replace: true })
  }

  const following = useMemo(() => getFollowing(me), [me])

  const followers = useMemo(() => getFollowers(me.id), [me.id])

  const requests = useMemo(
    () =>
      FRIEND_REQUESTS.map((request) => getMember(request.memberId)).filter(
        (member): member is NetworkMember => member != null,
      ),
    [],
  )

  const suggested = useMemo(() => {
    const taken = new Set([me.id, ...me.friendIds, ...FRIEND_REQUESTS.map((item) => item.memberId)])
    const fromHints = PEOPLE_YOU_MAY_KNOW.map((id) => getMember(id)).filter(
      (member): member is NetworkMember => member != null && !taken.has(member.id),
    )
    const extras = NETWORK_MEMBERS.filter((member) => !taken.has(member.id)).filter(
      (member) => !fromHints.some((item) => item.id === member.id),
    )
    return [...fromHints, ...extras]
  }, [me.id, me.friendIds])

  const tabs: { id: CommunityTab; label: string }[] = [
    { id: 'requests', label: `${formatCount(requests.length)} Friend requests` },
    { id: 'followers', label: `${formatCount(followers.length)} Followers` },
    { id: 'following', label: `${formatCount(following.length)} Following` },
    { id: 'suggest', label: 'People You Might Like' },
  ]

  const lists: Record<CommunityTab, { members: NetworkMember[]; mode: CommunityCardMode }> = {
    requests: { members: requests, mode: 'request' },
    followers: { members: followers, mode: 'follower' },
    following: { members: following, mode: 'following' },
    suggest: { members: suggested, mode: 'suggest' },
  }

  const active = lists[tab]

  useLayoutEffect(() => {
    const main = document.querySelector<HTMLElement>('.network-shell main')
    main?.scrollTo({ top: 0, left: 0 })
  }, [tab])

  return (
    <NetworkPageFrame hideRight>
      <div className="rounded-[28px] bg-white p-4 shadow-[0_12px_40px_rgba(15,31,26,0.06)] ring-1 ring-black/[0.04] sm:p-6">
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                'h-12 rounded-full px-4 text-center text-sm font-semibold transition',
                tab === item.id
                  ? 'bg-brand text-white shadow-sm'
                  : 'border border-line bg-white text-ink hover:bg-mist',
              )}
              aria-pressed={tab === item.id}
            >
              {item.label}
            </button>
          ))}
        </div>

        {active.members.length > 0 ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {active.members.map((member) => (
              <CommunityPersonCard key={`${tab}-${member.id}`} member={member} mode={active.mode} />
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-sm text-muted">No people in this list yet.</p>
        )}
      </div>
    </NetworkPageFrame>
  )
}
