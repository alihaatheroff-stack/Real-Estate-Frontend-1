import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { CLIENT_FIELD_CARDS } from '@/features/landing/data/clientFieldCards'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { cn } from '@/shared/lib/cn'

const LOOP_CARDS = [...CLIENT_FIELD_CARDS, ...CLIENT_FIELD_CARDS]

export function ClientFieldsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

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

    const speed = 0.75 // px per frame @ ~60fps
    let last = performance.now()

    const tick = (now: number) => {
      const delta = Math.min(now - last, 32)
      last = now

      offsetRef.current += speed * (delta / 16.67)

      // Loop at exactly half track width (duplicated set).
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
  }, [reducedMotion])

  function nudge(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    const card = track.querySelector<HTMLElement>('[data-field-card]')
    const step = card ? card.offsetWidth + 20 : 280
    offsetRef.current += direction * step

    const loopWidth = track.scrollWidth / 2
    if (loopWidth > 0) {
      while (offsetRef.current >= loopWidth) offsetRef.current -= loopWidth
      while (offsetRef.current < 0) offsetRef.current += loopWidth
    }
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`
  }

  return (
    <section
      id="client-fields"
      aria-label="Multiple demographics"
      className="relative overflow-hidden border-b border-line bg-freeio-navy"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 10% 20%, rgba(212,160,23,0.18), transparent 55%),
            radial-gradient(ellipse 50% 40% at 90% 80%, rgba(91,187,123,0.12), transparent 50%)
          `,
        }}
      />

      <ScrollReveal className="relative z-[1] flex w-full items-end justify-between gap-4 pl-4 pr-4 pb-2 pt-10 sm:pl-5 sm:pr-6 sm:pt-12 lg:pl-6 lg:pr-8">
        <div className="min-w-0 text-left">
          <p className="font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            Multiple Demographics
          </p>
          <h2 className="mt-3 text-base font-semibold tracking-tight text-white/85 sm:mt-4 sm:text-xl md:text-2xl">
            Hire across every real estate field
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            Scroll through commercial, agriculture, industrial, multi-unit, residential,
            mixed-use, and more — then match the right professional.
          </p>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={() => nudge(-1)}
            aria-label="Previous demographics"
            className="inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 text-white transition hover:border-accent hover:bg-accent hover:text-ink"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => nudge(1)}
            aria-label="Next demographics"
            className="inline-flex h-11 w-11 items-center justify-center border border-white/20 bg-white/5 text-white transition hover:border-accent hover:bg-accent hover:text-ink"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </ScrollReveal>

      <ScrollReveal variant="fade" delay={90} className="relative z-[1] mt-8 overflow-hidden pb-10 sm:mt-10 sm:pb-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-10 bg-gradient-to-r from-freeio-navy to-transparent sm:w-16"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-10 bg-gradient-to-l from-freeio-navy to-transparent sm:w-16"
        />

        <div
          ref={trackRef}
          className="flex w-max gap-5 px-4 will-change-transform sm:px-6 lg:px-8"
        >
          {(reducedMotion ? CLIENT_FIELD_CARDS : LOOP_CARDS).map((field, index) => (
            <FieldCard
              key={`${field.id}-${index}`}
              field={field}
              index={index % CLIENT_FIELD_CARDS.length}
              ariaHidden={!reducedMotion && index >= CLIENT_FIELD_CARDS.length}
            />
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}

function FieldCard({
  field,
  index,
  ariaHidden,
}: {
  field: (typeof CLIENT_FIELD_CARDS)[number]
  index: number
  ariaHidden?: boolean
}) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <Link
      to={`${PATHS.results}?field=${field.id}`}
      data-field-card
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
      className={cn(
        'group relative isolate aspect-square w-[16rem] shrink-0 overflow-hidden sm:w-[17.5rem]',
        'outline-none ring-offset-2 ring-offset-freeio-navy focus-visible:ring-2 focus-visible:ring-accent',
      )}
      style={{ aspectRatio: '1 / 1' }}
    >
      <img
        src={field.image}
        alt={ariaHidden ? '' : field.title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
        width={640}
        height={640}
        loading="eager"
        decoding="async"
        draggable={false}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-freeio-navy via-freeio-navy/35 to-transparent opacity-90 transition duration-500 group-hover:opacity-95"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition duration-500 group-hover:scale-x-100"
      />

      <div className="absolute left-4 top-4">
        <span className="bg-accent px-2 py-1 text-[0.65rem] font-bold tracking-[0.14em] text-ink">
          {number}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-accent">
          {field.subtitle}
        </p>
        <h3 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-white transition duration-300 group-hover:translate-x-1">
          {field.title}
        </h3>
        <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/70 transition group-hover:text-accent">
          Explore field
          <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  )
}
