import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ServiceCard } from '@/features/referrals'
import type { Service } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

type ServiceGigsCarouselProps = {
  title?: string
  description?: string
  services: Service[]
  className?: string
  fadeFrom?: 'paper' | 'mist'
  prevLabel?: string
  nextLabel?: string
  /** Prefill hearts as favorited (Saved/Favorites lists). */
  initiallySaved?: boolean
}

export function ServiceGigsCarousel({
  title,
  description,
  services,
  className,
  fadeFrom = 'paper',
  prevLabel = 'Previous services',
  nextLabel = 'More services',
  initiallySaved = false,
}: ServiceGigsCarouselProps) {
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
  }, [services.length])

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-gig-card]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.7
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  if (services.length === 0) return null

  const fadeClass =
    fadeFrom === 'mist'
      ? 'from-mist from-20% via-mist/80'
      : 'from-paper from-20% via-paper/70'
  const arrowClass =
    'absolute top-[28%] z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition hover:border-brand/40 hover:text-brand sm:h-11 sm:w-11'

  return (
    <div className={cn(className)}>
      {title ? (
        <SectionHeading
          title={title}
          description={description}
          size="subsection"
          className="w-full items-start [&>div]:max-w-none"
        />
      ) : null}

      <div className="relative">
        <div
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent"
        >
          {services.map((service) => (
            <div
              key={service.id}
              data-gig-card
              className="w-[min(70vw,15rem)] shrink-0 sm:w-[calc((100%-3rem)/3.35)] md:w-[calc((100%-4rem)/4.25)] lg:w-[calc((100%-5rem)/4.55)]"
            >
              <ServiceCard
                service={service}
                variant="gig"
                initiallySaved={initiallySaved}
              />
            </div>
          ))}
        </div>

        {canScrollPrev ? (
          <>
            <div
              aria-hidden
              className={cn(
                'pointer-events-none absolute inset-y-0 left-0 z-[1] w-20 bg-gradient-to-r to-transparent sm:w-28',
                fadeClass,
              )}
            />
            <button
              type="button"
              aria-label={prevLabel}
              onClick={() => scrollByCard(-1)}
              className={cn(arrowClass, 'left-1 sm:left-2')}
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
                'pointer-events-none absolute inset-y-0 right-0 z-[1] w-20 bg-gradient-to-l to-transparent sm:w-28',
                fadeClass,
              )}
            />
            <button
              type="button"
              aria-label={nextLabel}
              onClick={() => scrollByCard(1)}
              className={cn(arrowClass, 'right-1 sm:right-2')}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        ) : null}
      </div>
    </div>
  )
}

/** @deprecated Prefer ServiceGigsCarousel — kept as alias for existing imports. */
export function RecentlyViewedServicesCarousel(props: ServiceGigsCarouselProps) {
  return (
    <ServiceGigsCarousel
      prevLabel="Previous recently viewed services"
      nextLabel="More recently viewed services"
      {...props}
    />
  )
}
