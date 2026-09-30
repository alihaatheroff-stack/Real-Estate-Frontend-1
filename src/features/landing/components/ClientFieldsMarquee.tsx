import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import {
  DEMOGRAPHY_ROWS,
  type DemographyRow,
  type DemographySlide,
} from '@/features/landing/data/clientFieldCards'
import { cn } from '@/shared/lib/cn'

export function ClientFieldsMarquee() {
  return (
    <Section id="client-fields" containerClassName="max-w-none">
      <ScrollReveal y={40}>
        <SectionHeading
          eyebrow="Hire"
          title="Demography"
          className="w-full [&>div]:max-w-none"
        />
      </ScrollReveal>

      <div className="space-y-12 sm:space-y-14">
        {DEMOGRAPHY_ROWS.map((row, index) => (
          <ScrollReveal key={row.id} delay={index * 150} y={48}>
            <DemographyMarquee row={row} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}

function DemographyMarquee({ row }: { row: DemographyRow }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const loopSlides = [...row.slides, ...row.slides]

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const track = trackRef.current
    if (!track) return

    const speed = 0.75
    let last = performance.now()

    const tick = (now: number) => {
      const delta = Math.min(now - last, 32)
      last = now

      offsetRef.current += speed * (delta / 16.67)

      const loopWidth = track.scrollWidth / 2
      if (loopWidth > 0 && offsetRef.current >= loopWidth) {
        offsetRef.current -= loopWidth
      }

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
      rafRef.current = window.requestAnimationFrame(tick)
    }

    rafRef.current = window.requestAnimationFrame(tick)
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current)
    }
  }, [reducedMotion, row.slides.length])

  function nudge(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-demo-slide]')
    const step = card ? card.offsetWidth + 20 : 280
    offsetRef.current += direction * step

    const loopWidth = track.scrollWidth / 2
    if (loopWidth > 0) {
      while (offsetRef.current >= loopWidth) offsetRef.current -= loopWidth
      while (offsetRef.current < 0) offsetRef.current += loopWidth
    }
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
  }

  const slides = reducedMotion ? row.slides : loopSlides

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          title={row.title}
          description={row.description}
          size="subsection"
          className="mb-0 w-full flex-1 items-start [&>div]:max-w-none"
        />
        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label={`Previous ${row.title}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition hover:border-brand/40 hover:text-brand"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label={`Next ${row.title}`}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition hover:border-brand/40 hover:text-brand"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative mt-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-10 bg-gradient-to-r from-paper to-transparent sm:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-10 bg-gradient-to-l from-paper to-transparent sm:w-16"
        />

        <div
          ref={trackRef}
          className={cn(
            'flex w-max gap-4 will-change-transform lg:gap-5',
            reducedMotion &&
              'w-full max-w-full flex-wrap justify-start overflow-visible will-change-auto',
          )}
        >
          {slides.map((slide, index) => (
            <SlideCard
              key={`${slide.id}-${index}`}
              slide={slide}
              ariaHidden={!reducedMotion && index >= row.slides.length}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SlideCard({
  slide,
  ariaHidden,
}: {
  slide: DemographySlide
  ariaHidden?: boolean
}) {
  const className = cn(
    'group relative aspect-[16/10] w-[min(72vw,18rem)] shrink-0 overflow-hidden rounded-2xl',
    'sm:w-[min(40vw,16rem)] lg:w-[min(22vw,15.5rem)]',
    'outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
  )

  const media = (
    <>
      <img
        src={slide.image}
        alt={ariaHidden ? '' : slide.title}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
        width={640}
        height={400}
        loading="eager"
        decoding="async"
        draggable={false}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition duration-500 group-hover:from-ink/90" />
      <p className="absolute bottom-4 left-4 font-display text-lg font-semibold tracking-tight text-paper transition duration-300 group-hover:translate-y-[-2px] sm:text-xl">
        {slide.title}
      </p>
    </>
  )

  if (slide.href) {
    return (
      <Link
        to={slide.href}
        data-demo-slide
        aria-hidden={ariaHidden || undefined}
        tabIndex={ariaHidden ? -1 : undefined}
        className={className}
      >
        {media}
      </Link>
    )
  }

  return (
    <div
      data-demo-slide
      aria-hidden={ariaHidden || undefined}
      className={className}
    >
      {media}
    </div>
  )
}
