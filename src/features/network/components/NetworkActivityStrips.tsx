import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import { networkProfilePath } from '@/app/router/paths'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import {
  getNetworkStripMembers,
  NETWORK_ACTIVITY_STRIPS,
} from '@/features/network/data/networkActivity'
import type { NetworkMember } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

function NetworkMemberCard({ member }: { member: NetworkMember }) {
  return (
    <article
      data-network-activity-card
      className="logged-in-gig-card group w-[min(72vw,15.5rem)] shrink-0 sm:w-[14.75rem] lg:w-[15.25rem]"
    >
      <Link
        to={networkProfilePath(member.id)}
        className="relative block aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-mist"
      >
        <img
          src={member.cover}
          alt=""
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 pb-3 pt-10">
          <div className="flex items-center gap-2">
            <MemberAvatar
              name={member.name}
              src={member.avatar}
              memberId={member.id}
              size="sm"
              framed
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-white">{member.name}</p>
              <p className="truncate text-[0.7rem] text-white/80">{member.handle}</p>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-3">
        <Link
          to={networkProfilePath(member.id)}
          className="font-display text-base font-semibold tracking-tight text-ink transition group-hover:text-brand"
        >
          {member.title}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
          {member.company} · {member.bio}
        </p>
        <p className="mt-2 inline-flex items-center gap-1 text-xs text-muted">
          <MapPin className="h-3.5 w-3.5" />
          {member.city}, {member.state}
        </p>
      </div>
    </article>
  )
}

function MemberStripCarousel({ members }: { members: NetworkMember[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  function updateScrollState() {
    const el = scrollerRef.current
    if (!el) {
      setCanScrollPrev(false)
      setCanScrollNext(false)
      return
    }
    setCanScrollPrev(el.scrollLeft > 8)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => updateScrollState()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [members.length])

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-network-activity-card]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.7
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous members"
          disabled={!canScrollPrev}
          onClick={() => scrollByCard(-1)}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition',
            canScrollPrev
              ? 'hover:border-brand/35 hover:text-brand'
              : 'cursor-not-allowed opacity-35',
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next members"
          disabled={!canScrollNext}
          onClick={() => scrollByCard(1)}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white text-ink transition',
            canScrollNext
              ? 'hover:border-brand/35 hover:text-brand'
              : 'cursor-not-allowed opacity-35',
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
      >
        {members.map((member, index) => (
          <div key={member.id} style={{ animationDelay: `${index * 40}ms` }}>
            <NetworkMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function NetworkActivityStrips({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-10 sm:space-y-12', className)}>
      {NETWORK_ACTIVITY_STRIPS.map((strip, index) => {
        const members = getNetworkStripMembers(strip.memberIds)
        if (members.length === 0) return null
        return (
          <ScrollReveal key={strip.id} delay={index * 60} y={22}>
            <div>
              <div className="mb-1">
                <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  {strip.title}
                </h3>
                {strip.description ? (
                  <p className="mt-1 text-sm text-muted sm:text-base">{strip.description}</p>
                ) : null}
              </div>
              <MemberStripCarousel members={members} />
            </div>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
