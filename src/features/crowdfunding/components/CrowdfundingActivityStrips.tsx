import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { AuthRequiredDialog, useIsAuthenticated } from '@/features/auth'
import { SaveToFolderDialog } from '@/features/favorites/SaveToFolderDialog'
import { removeFavoriteItem, useFavorites } from '@/features/favorites/store'
import {
  CROWDFUNDING_ACTIVITY_STRIPS,
  getCrowdfundingStripVenues,
} from '@/features/crowdfunding/data/crowdfundingActivity'
import type { RecreationalVenue } from '@/features/crowdfunding/data/recreationalVenues'
import { cn } from '@/shared/lib/cn'

function ActivityVenueCard({
  venue,
  initiallySaved,
}: {
  venue: RecreationalVenue
  initiallySaved?: boolean
}) {
  const [saveOpen, setSaveOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const isAuthenticated = useIsAuthenticated()
  const { isSaved } = useFavorites()
  const saved = isSaved('crowdfunding', venue.id) || Boolean(initiallySaved)

  function toggleSave() {
    if (!isAuthenticated) {
      setAuthOpen(true)
      return
    }
    if (isSaved('crowdfunding', venue.id)) removeFavoriteItem('crowdfunding', venue.id)
    else setSaveOpen(true)
  }

  return (
    <article
      data-cf-activity-card
      className="logged-in-gig-card group w-[min(72vw,15.5rem)] shrink-0 sm:w-[14.75rem] lg:w-[15.25rem]"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-mist">
        <img
          src={venue.image}
          alt={venue.title}
          className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
          loading="lazy"
        />
        <button
          type="button"
          onClick={toggleSave}
          aria-label={saved ? `Remove ${venue.title} from favorites` : `Add ${venue.title} to favorites`}
          aria-pressed={saved}
          className="absolute right-2.5 top-2.5 z-10 inline-flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.65)] transition hover:scale-110 hover:text-rose-500"
        >
          <Heart
            className={cn('h-4 w-4', saved && 'fill-rose-500 text-rose-500')}
            strokeWidth={2.2}
          />
        </button>
      </div>

      <div className="mt-3">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted">
          {venue.role}
        </p>
        <h4 className="mt-1 font-display text-base font-semibold tracking-tight text-ink transition group-hover:text-brand">
          {venue.title}
        </h4>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{venue.text}</p>
        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          <span className="font-semibold text-ink">{venue.raise}</span>
          <span>Target raise</span>
          <span className="text-freeio font-semibold">{venue.roi} ROI</span>
        </div>
      </div>

      <SaveToFolderDialog
        open={saveOpen}
        draft={{
          itemId: venue.id,
          module: 'crowdfunding',
          title: venue.title,
          subtitle: venue.text,
          image: venue.image,
        }}
        onClose={() => setSaveOpen(false)}
      />
      <AuthRequiredDialog
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        action="save favorites"
      />
    </article>
  )
}

function VenueStripCarousel({
  venues,
  initiallySaved,
}: {
  venues: RecreationalVenue[]
  initiallySaved?: boolean
}) {
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
  }, [venues.length])

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-cf-activity-card]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.7
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous venues"
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
          aria-label="Next venues"
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
        {venues.map((venue, index) => (
          <div key={venue.id} style={{ animationDelay: `${index * 40}ms` }}>
            <ActivityVenueCard venue={venue} initiallySaved={initiallySaved} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CrowdfundingActivityStrips({ className }: { className?: string }) {
  return (
    <div className={cn('space-y-10 sm:space-y-12', className)}>
      {CROWDFUNDING_ACTIVITY_STRIPS.map((strip, index) => {
        const venues = getCrowdfundingStripVenues(strip.venueIds)
        if (venues.length === 0) return null
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
              <VenueStripCarousel
                venues={venues}
                initiallySaved={strip.initiallySaved}
              />
            </div>
          </ScrollReveal>
        )
      })}
    </div>
  )
}
