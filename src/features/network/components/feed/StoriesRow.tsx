import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { networkProfilePath } from '@/app/router/paths'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { getCurrentMember, getMember } from '@/features/network/data/members'
import { NETWORK_STORIES } from '@/features/network/data/feed'
import { cn } from '@/shared/lib/cn'

export function StoriesRow() {
  const me = getCurrentMember()

  return (
    <NetworkCard padded={false} className="p-3">
      <div className="flex gap-2.5 overflow-x-auto network-hide-scroll pb-0.5">
        <Link
          to={networkProfilePath(me.id)}
          className="relative h-[198px] w-[112px] shrink-0 overflow-hidden rounded-xl bg-mist shadow-sm"
        >
          <img src={me.avatar} alt="" className="h-[138px] w-full object-cover" />
          <span className="absolute left-1/2 top-[118px] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-4 border-white bg-brand text-white shadow">
            <Plus className="h-5 w-5" strokeWidth={2.5} />
          </span>
          <span className="absolute inset-x-0 bottom-2 px-2 text-center text-[13px] font-semibold leading-tight text-ink">
            Create story
          </span>
        </Link>

        {NETWORK_STORIES.map((story) => {
          const member = getMember(story.memberId)
          if (!member) return null
          return (
            <Link
              key={story.id}
              to={networkProfilePath(member.id)}
              className="group relative h-[198px] w-[112px] shrink-0 overflow-hidden rounded-xl bg-ink"
            >
              <img
                src={story.image}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
              <span
                className={cn(
                  'absolute left-2.5 top-2.5 h-10 w-10 overflow-hidden rounded-full border-4',
                  story.viewed ? 'border-white/50' : 'border-brand',
                )}
              >
                <img src={member.avatar} alt="" className="h-full w-full object-cover" />
              </span>
              <span className="absolute inset-x-2 bottom-2.5 text-[13px] font-semibold leading-tight text-white drop-shadow">
                {member.firstName}
              </span>
            </Link>
          )
        })}
      </div>
    </NetworkCard>
  )
}
