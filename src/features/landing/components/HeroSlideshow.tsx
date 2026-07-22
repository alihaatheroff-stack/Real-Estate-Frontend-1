import { useEffect, useState, type Dispatch, type SetStateAction } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HERO_SLIDES } from '@/features/landing/data/heroSlides'
import { HeroLightbox } from '@/features/landing/components/HeroLightbox'
import { cn } from '@/shared/lib/cn'

type HeroSlideshowProps = {
  activeIndex: number
  onChange: Dispatch<SetStateAction<number>>
}

export function HeroSlideshow({ activeIndex, onChange }: HeroSlideshowProps) {
  const [paused, setPaused] = useState(false)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const lightboxOpen = previewIndex !== null

  useEffect(() => {
    if (paused || lightboxOpen) return
    const timer = window.setInterval(() => {
      onChange((current) => (current + 1) % HERO_SLIDES.length)
    }, 5500)
    return () => window.clearInterval(timer)
  }, [onChange, paused, lightboxOpen])

  function go(delta: number) {
    onChange((current) => (current + delta + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  return (
    <div
      className="absolute inset-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {HERO_SLIDES.map((item, index) => {
        const isActive = index === activeIndex
        return (
          <button
            key={item.id}
            type="button"
            aria-hidden={!isActive}
            tabIndex={isActive ? 0 : -1}
            aria-label={`Preview ${item.alt}`}
            onClick={() => setPreviewIndex(index)}
            className={cn(
              'absolute inset-0 block cursor-zoom-in overflow-hidden transition-opacity duration-1000 ease-out',
              isActive ? 'z-[1] opacity-100' : 'pointer-events-none z-0 opacity-0',
            )}
          >
            <img
              src={item.src}
              alt={item.alt}
              className={cn(
                'hero-slide-image h-full w-full object-cover will-change-transform',
                isActive && 'is-active',
              )}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </button>
        )
      })}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-ink/80 via-ink/40 to-ink/55" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink/75 via-transparent to-ink/25" />

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-[clamp(8.5rem,12vw,12.5rem)] top-1/2 z-[4] hidden -translate-y-1/2 rounded-full border border-white/30 bg-paper/90 p-2.5 text-ink shadow-soft transition hover:scale-105 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 xl:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-[clamp(8.5rem,12vw,12.5rem)] top-1/2 z-[4] hidden -translate-y-1/2 rounded-full border border-white/30 bg-paper/90 p-2.5 text-ink shadow-soft transition hover:scale-105 hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 xl:inline-flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-0 right-0 z-[5] px-3 sm:bottom-5 sm:px-4 lg:left-[clamp(7.5rem,11vw,11rem)] lg:right-0 lg:px-3 xl:right-[clamp(7.5rem,11vw,11rem)]">
        <div className="flex w-full items-center justify-between gap-2">
          {HERO_SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              className={cn(
                'relative h-12 w-[4.75rem] shrink-0 overflow-hidden rounded-lg border-2 transition duration-300 sm:h-14 sm:w-[5.5rem] md:h-[3.75rem] md:w-[7.25rem]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ink/40',
                index === activeIndex
                  ? 'border-accent shadow-soft ring-1 ring-accent/30'
                  : 'border-white/20 opacity-65 hover:opacity-100 hover:border-white/50',
              )}
            >
              <img src={item.src} alt="" className="h-full w-full object-cover" />
              {index === activeIndex ? (
                <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-accent" />
              ) : null}
            </button>
          ))}
        </div>
      </div>

      {previewIndex !== null ? (
        <HeroLightbox
          slides={HERO_SLIDES}
          index={previewIndex}
          onClose={() => setPreviewIndex(null)}
          onChange={(next) => {
            setPreviewIndex(next)
            onChange(next)
          }}
        />
      ) : null}
    </div>
  )
}
