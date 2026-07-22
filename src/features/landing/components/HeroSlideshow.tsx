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
      {HERO_SLIDES.map((item, index) => (
        <button
          key={item.id}
          type="button"
          aria-hidden={index !== activeIndex}
          tabIndex={index === activeIndex ? 0 : -1}
          aria-label={`Preview ${item.alt}`}
          onClick={() => setPreviewIndex(index)}
          className={cn(
            'absolute inset-0 block cursor-zoom-in transition-opacity duration-700',
            index === activeIndex ? 'z-[1] opacity-100' : 'z-0 opacity-0 pointer-events-none',
          )}
        >
          <img
            src={item.src}
            alt={item.alt}
            className="h-full w-full object-cover"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
        </button>
      ))}

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-ink/75 via-ink/45 to-ink/70" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-[clamp(8.5rem,12vw,12.5rem)] top-1/2 z-[4] hidden -translate-y-1/2 rounded-full bg-paper/90 p-2 text-ink shadow-soft transition hover:bg-paper xl:inline-flex"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-[clamp(8.5rem,12vw,12.5rem)] top-1/2 z-[4] hidden -translate-y-1/2 rounded-full bg-paper/90 p-2 text-ink shadow-soft transition hover:bg-paper xl:inline-flex"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-0 right-0 z-[5] px-3 sm:bottom-4 sm:px-4 lg:left-[clamp(7.5rem,11vw,11rem)] lg:right-0 lg:px-3 xl:right-[clamp(7.5rem,11vw,11rem)]">
        <div className="flex w-full items-center justify-between gap-2">
          {HERO_SLIDES.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={cn(
                'relative h-12 w-[4.75rem] shrink-0 overflow-hidden rounded-md border-2 transition sm:h-14 sm:w-[5.5rem] md:h-[3.75rem] md:w-[7.25rem]',
                index === activeIndex
                  ? 'border-accent shadow-soft'
                  : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <img src={item.src} alt="" className="h-full w-full object-cover" />
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
