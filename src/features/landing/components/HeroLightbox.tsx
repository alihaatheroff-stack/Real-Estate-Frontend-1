import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
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
      aria-label={slide?.alt ?? 'Hero image preview'}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close preview"
        onClick={onClose}
        className="absolute right-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-5 sm:top-5"
      >
        <X className="h-5 w-5" strokeWidth={2.25} />
      </button>

      <p className="absolute left-1/2 top-4 z-10 -translate-x-1/2 text-xs font-medium tracking-wide text-white/70 sm:top-5 sm:text-sm">
        {index + 1} / {total}
      </p>

      <button
        type="button"
        aria-label="Previous image"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index - 1 + total) % total)
        }}
        className="absolute left-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:left-5 sm:h-12 sm:w-12"
      >
        <ChevronLeft className="h-7 w-7" strokeWidth={2.25} />
      </button>

      <button
        type="button"
        aria-label="Next image"
        onClick={(event) => {
          event.stopPropagation()
          onChange((index + 1) % total)
        }}
        className="absolute right-2 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 sm:right-5 sm:h-12 sm:w-12"
      >
        <ChevronRight className="h-7 w-7" strokeWidth={2.25} />
      </button>

      <figure
        className="flex max-h-[100dvh] max-w-[100vw] flex-col items-center gap-3 px-14 py-16 sm:px-20"
        onClick={(event) => event.stopPropagation()}
      >
        <img
          src={slide.src}
          alt={slide.alt}
          className="max-h-[min(88dvh,920px)] w-auto max-w-full object-contain"
        />
        {slide.caption ? (
          <figcaption className="max-w-2xl text-center text-sm font-medium text-white/80">
            {slide.caption}
          </figcaption>
        ) : null}
      </figure>
    </div>,
    document.body,
  )
}
