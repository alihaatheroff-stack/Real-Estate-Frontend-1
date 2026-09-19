import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { AuthRequiredDialog, useIsAuthenticated } from '@/features/auth'
import { SaveToFolderDialog } from '@/features/favorites/SaveToFolderDialog'
import { removeFavoriteItem, useFavorites } from '@/features/favorites/store'
import {
  RECREATIONAL_VENUES,
  type RecreationalVenue,
} from '@/features/crowdfunding/data/recreationalVenues'
import { cn } from '@/shared/lib/cn'

type RecreationalCrowdfundingProps = {
  /** Render without outer Section — for nesting under Crowdfunding. */
  embedded?: boolean
  className?: string
  fadeFrom?: 'paper' | 'mist'
  /** Guest teaser uses a static grid; logged-in uses the arrow carousel. */
  variant?: 'carousel' | 'grid'
  /** Show title + one-line description under each venue card. */
  showCaptions?: boolean
}

function VenueCard({
  venue,
  showCaptions,
  compact,
}: {
  venue: RecreationalVenue
  showCaptions: boolean
  compact?: boolean
}) {
  const [saveOpen, setSaveOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)
  const isAuthenticated = useIsAuthenticated()
  const { isSaved } = useFavorites()
  const saved = isSaved('crowdfunding', venue.id)

  function toggleSave() {
    if (!isAuthenticated) {
      setAuthOpen(true)
      return
    }
    if (saved) removeFavoriteItem('crowdfunding', venue.id)
    else setSaveOpen(true)
  }

  return (
    <article
      data-venue-card
      className={cn(
        'group',
        compact &&
          (showCaptions
            ? 'w-[min(72vw,13.5rem)] shrink-0 sm:w-[calc((100%-3rem)/4.25)] md:w-[calc((100%-4rem)/5)] lg:w-[calc((100%-5rem)/5.5)]'
            : 'h-40 w-[min(72vw,13.5rem)] shrink-0 sm:h-44 sm:w-[calc((100%-3rem)/4.25)] md:h-48 md:w-[calc((100%-4rem)/5)] lg:h-52 lg:w-[calc((100%-5rem)/5.5)]'),
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden rounded-2xl border border-line bg-mist',
          showCaptions || !compact ? 'aspect-[16/10] w-full' : 'h-full w-full',
        )}
      >
        <img
          src={venue.image}
          alt={venue.title}
          className={cn(
            'h-full w-full object-cover transition duration-700 ease-out',
            showCaptions && 'group-hover:scale-[1.04]',
          )}
          loading="lazy"
        />
        <button
          type="button"
          onClick={toggleSave}
          aria-label={saved ? `Remove ${venue.title} from favorites` : `Add ${venue.title} to favorites`}
          aria-pressed={saved}
          className="absolute right-2 top-2 z-10 inline-flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.65)] transition hover:scale-110 hover:text-rose-500"
        >
          <Heart
            className={cn('h-4 w-4', saved && 'fill-rose-500 text-rose-500')}
            strokeWidth={2.2}
          />
        </button>
      </div>

      {showCaptions ? (
        <figcaption className="mt-3">
          <h4 className="font-display text-base font-semibold tracking-tight text-ink">
            {venue.title}
          </h4>
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
            {venue.text}
          </p>
        </figcaption>
      ) : null}

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

export function RecreationalCrowdfunding({
  embedded = false,
  className,
  fadeFrom = 'paper',
  variant = 'carousel',
  showCaptions = false,
}: RecreationalCrowdfundingProps) {
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
    if (variant !== 'carousel') return
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
  }, [variant, showCaptions])

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-venue-card]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.55
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  const fadeClass =
    fadeFrom === 'mist'
      ? 'from-mist from-20% via-mist/80'
      : 'from-paper from-20% via-paper/70'
  const arrowClass =
    'absolute top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition hover:border-brand/40 hover:text-brand sm:h-11 sm:w-11'

  const gridContent = (
    <div className={cn(embedded && 'mt-2', className)}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {RECREATIONAL_VENUES.slice(0, 8).map((venue) => (
          <VenueCard key={venue.id} venue={venue} showCaptions />
        ))}
      </div>
    </div>
  )

  const carouselContent = (
    <div className={cn(embedded && 'mt-2', className)}>
      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent"
        >
          {RECREATIONAL_VENUES.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              showCaptions={showCaptions}
              compact
            />
          ))}
        </div>

        {canScrollPrev ? (
          <>
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-y-0 left-0 z-[1] w-16 bg-gradient-to-r to-transparent sm:w-24',
                showCaptions && 'bottom-16',
                fadeClass,
              )}
            />
            <button
              type="button"
              aria-label="Previous recreational venues"
              onClick={() => scrollByCard(-1)}
              className={cn(
                arrowClass,
                'left-1 sm:left-2',
                showCaptions && 'top-[30%]',
              )}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </>
        ) : null}

        {canScrollNext ? (
          <>
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-y-0 right-0 z-[1] w-16 bg-gradient-to-l to-transparent sm:w-24',
                showCaptions && 'bottom-16',
                fadeClass,
              )}
            />
            <button
              type="button"
              aria-label="More recreational venues"
              onClick={() => scrollByCard(1)}
              className={cn(
                arrowClass,
                'right-1 sm:right-2',
                showCaptions && 'top-[30%]',
              )}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  )

  const content = variant === 'grid' ? gridContent : carouselContent

  if (embedded) return content

  return <Section containerClassName="max-w-none">{content}</Section>
}
