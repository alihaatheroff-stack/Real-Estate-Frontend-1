import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import type { HeroSlide } from '@/features/landing/data/heroSlides'

type HeroLightboxProps = {
  slides: HeroSlide[]
  index: number
  onClose: () => void
  onChange: (index: number) => void
}

export function HeroLightbox({ slides, index, onClose, onChange }: HeroLightboxProps) {
  const slide = slides[index] ?? slides[0]
  const total = slides.length

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onChange((index + 1) % total)
      if (event.key === 'ArrowLeft') onChange((index - 1 + total) % total)
    }

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [index, onChange, onClose, total])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={slide.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-paper"
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full p-2 text-ink/70 transition hover:bg-ink/5 hover:text-ink"
      >
        <X className="h-6 w-6" />
      </button>

      <button
        type="button"
        aria-label="Toggle full size"
        onClick={() => {
          const el = document.documentElement
          if (!document.fullscreenElement) void el.requestFullscreen()
          else void document.exitFullscreen()
        }}
        className="absolute left-4 top-4 z-10 rounded-full p-2 text-ink/70 transition hover:bg-ink/5 hover:text-ink"
      >
        <Maximize2 className="h-5 w-5" />
      </button>

      <button
        type="button"
        aria-label="Previous image"
        onClick={() => onChange((index - 1 + total) % total)}
        className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ink/5 p-2 text-ink transition hover:bg-ink/10 sm:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        type="button"
        aria-label="Next image"
        onClick={() => onChange((index + 1) % total)}
        className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-ink/5 p-2 text-ink transition hover:bg-ink/10 sm:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <figure className="flex max-h-[88vh] max-w-[min(92vw,1100px)] flex-col items-center gap-3 px-14">
        <img
          src={slide.src}
          alt={slide.alt}
          className="max-h-[80vh] w-auto max-w-full rounded-sm object-contain shadow-soft"
        />
        <figcaption className="text-center text-sm font-medium text-ink/70">
          {slide.caption}
        </figcaption>
      </figure>
    </div>,
    document.body,
  )
}
