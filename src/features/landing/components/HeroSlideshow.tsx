import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HERO_SLIDES } from '@/features/landing/data/heroSlides'
import { cn } from '@/shared/lib/cn'

type HeroSlideshowProps = {
  activeIndex: number
  onChange: Dispatch<SetStateAction<number>>
}

/**
 * Visible photo pocket: right of the filter panel, left of promo/ad rails,
 * above the thumbnail strip. Image fills this area (cover, no zoom motion).
 */
const PHOTO_POCKET =
  'absolute top-0 bottom-[4.75rem] sm:bottom-20 ' +
  /* clear filter column (+ padding) */
  'left-[calc(17.5rem+0.75rem)] sm:left-[calc(19.5rem+1rem)] ' +
  /* clear left ad rail + filter on lg+ */
  'lg:left-[calc(clamp(7.5rem,11vw,11rem)+19.5rem+0.75rem)] ' +
  /* clear right rails on xl */
  'right-2 xl:right-[calc(clamp(18.5rem,26vw,25rem)+0.5rem)]'

export function HeroSlideshow({ activeIndex, onChange }: HeroSlideshowProps) {
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => {
      onChange((current) => (current + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [onChange, paused])

  function go(delta: number) {
    onChange((current) => (current + delta + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  return (
    <div
      className="absolute inset-0 bg-ink"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={PHOTO_POCKET}>
        {/* Wider frame fills the pocket — static cover, no ken-burns zoom */}
        <div className="relative h-full w-full overflow-hidden">
          {HERO_SLIDES.map((item, index) => {
            const isActive = index === activeIndex
            return (
              <Link
                key={item.id}
                to={item.href}
                aria-hidden={!isActive}
                tabIndex={isActive ? 0 : -1}
                aria-label={`View ${item.caption} services`}
                className={cn(
                  'group absolute inset-0 block overflow-hidden transition-opacity duration-700 ease-out',
                  isActive ? 'z-[1] opacity-100' : 'pointer-events-none z-0 opacity-0',
                )}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
                <p className="absolute bottom-4 left-4 font-display text-xl font-semibold tracking-tight text-paper underline-offset-4 transition group-hover:underline sm:bottom-5 sm:left-5 sm:text-2xl">
                  {item.caption}
                </p>
              </Link>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-[calc(17.5rem+1.25rem)] top-[calc(50%-2.5rem)] z-[8] hidden -translate-y-1/2 rounded-full border border-black/10 bg-white p-1 text-ink shadow-soft transition hover:scale-105 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 sm:left-[calc(19.5rem+1.5rem)] lg:left-[calc(clamp(7.5rem,11vw,11rem)+19.5rem+1.25rem)] lg:inline-flex"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-[calc(50%-2.5rem)] z-[8] hidden -translate-y-1/2 rounded-full border border-black/10 bg-white p-1 text-ink shadow-soft transition hover:scale-105 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 xl:right-[calc(clamp(18.5rem,26vw,25rem)+0.75rem)] xl:inline-flex"
      >
        <ChevronRight className="h-3.5 w-3.5" />
      </button>

      {/* Bottom strip: all 10 thumbs fully visible — no edge clipping */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex h-[4.75rem] items-center px-3 sm:h-20 sm:px-4 lg:left-[clamp(7.5rem,11vw,11rem)] lg:px-3 xl:right-[clamp(7.5rem,11vw,11rem)]">
        <div className="pointer-events-auto grid h-[3.25rem] w-full grid-cols-10 gap-1.5 sm:h-14 sm:gap-2">
          {HERO_SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(index)}
              aria-label={`Go to ${item.caption}`}
              title={item.caption}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={cn(
                'relative min-w-0 overflow-hidden rounded-md border-2 transition duration-300',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink/40',
                index === activeIndex
                  ? 'border-accent shadow-soft ring-1 ring-accent/30'
                  : 'border-white/20 opacity-65 hover:border-white/50 hover:opacity-100',
              )}
            >
              <img src={item.src} alt={item.caption} className="h-full w-full object-cover object-center" />
              {index === activeIndex ? (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
              ) : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
