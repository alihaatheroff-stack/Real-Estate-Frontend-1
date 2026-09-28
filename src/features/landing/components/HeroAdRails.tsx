import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import {
  BOTTOM_LEFT_ADS,
  BOTTOM_RIGHT_ADS,
  RIGHT_PROMO_CARDS,
  TOP_LEFT_ADS,
  TOP_RIGHT_ADS,
  type HeroAd,
} from '@/features/landing/data/heroAds'
import { cn } from '@/shared/lib/cn'

const SLIDE_MS = 700
const ROTATE_MS = 4800

/** Corner tall-ad width — keep LandingHero / HeroSlideshow offsets in sync */
const SIDE_AD_RAIL = 'w-[clamp(7.5rem,11vw,11rem)]'
const RIGHT_PROMO_RAIL = 'w-[clamp(11rem,15vw,14rem)]'
/** Promo cards sit left of the far-right tall rail */
const RIGHT_PROMO_OFFSET = 'right-[clamp(7.5rem,11vw,11rem)]'

function AdCard({
  ad,
  className,
  tabIndex,
}: {
  ad: HeroAd
  className?: string
  tabIndex?: number
}) {
  return (
    <Link
      to={ad.href}
      tabIndex={tabIndex}
      className={cn(
        'group relative block h-full w-full overflow-hidden border border-white/15 bg-ink/40 shadow-soft backdrop-blur-sm transition',
        'hover:border-brand/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50',
        className,
      )}
    >
      <img
        src={ad.image}
        alt=""
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2">
        <p className="text-[10px] font-semibold leading-tight tracking-wide text-paper sm:text-xs">
          {ad.title}
        </p>
        {ad.subtitle ? (
          <p className="mt-0.5 text-[9px] leading-tight text-paper/70 sm:text-[10px]">
            {ad.subtitle}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

/** Compact Shopify-style banner tile for the inner-right 2-column grid */
function PromoBannerCard({ ad }: { ad: HeroAd }) {
  return (
    <Link
      to={ad.href}
      className={cn(
        'group relative block min-h-0 overflow-hidden border border-white/20 bg-ink/50 shadow-soft',
        'transition hover:border-brand/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50',
      )}
      aria-label={`${ad.title}${ad.subtitle ? ` — ${ad.subtitle}` : ''}`}
    >
      <img
        src={ad.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition duration-500 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/35 to-transparent" />
      <div className="relative z-[1] flex h-full flex-col justify-end p-1.5 sm:p-2">
        <p className="text-[9px] font-bold uppercase leading-tight tracking-wide text-paper sm:text-[10px]">
          {ad.title}
        </p>
        {ad.subtitle ? (
          <p className="mt-0.5 text-[8px] leading-tight text-paper/75 sm:text-[9px]">
            {ad.subtitle}
          </p>
        ) : null}
        <span className="mt-1 inline-flex items-center gap-0.5 text-[8px] font-semibold text-accent sm:text-[9px]">
          View now
          <span aria-hidden>→</span>
        </span>
      </div>
    </Link>
  )
}

function AdvertiseLink({ className }: { className?: string }) {
  return (
    <Link
      to={PATHS.advertise}
      className={cn(
        'block border-t border-brand-dark/30 bg-brand px-2 py-2 text-center text-[10px] font-semibold tracking-wide text-paper transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50',
        className,
      )}
    >
      Advertise here
    </Link>
  )
}

function useAdSlideshow({
  count,
  startDelayMs,
  intervalMs,
  paused,
}: {
  count: number
  startDelayMs: number
  intervalMs: number
  paused: boolean
}) {
  const [index, setIndex] = useState(0)
  const [instant, setInstant] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const awaitingFirstTick = useRef(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (paused || count < 2) return
    const wait = awaitingFirstTick.current ? intervalMs + startDelayMs : intervalMs
    let intervalId = 0
    const timeoutId = window.setTimeout(() => {
      awaitingFirstTick.current = false
      setIndex((current) => current + 1)
      intervalId = window.setInterval(() => {
        setIndex((current) => current + 1)
      }, intervalMs)
    }, wait)
    return () => {
      window.clearTimeout(timeoutId)
      window.clearInterval(intervalId)
    }
  }, [paused, count, intervalMs, startDelayMs])

  useEffect(() => {
    if (count < 2 || index < count) return
    const timeoutId = window.setTimeout(() => {
      setInstant(true)
      setIndex(0)
    }, SLIDE_MS)
    return () => window.clearTimeout(timeoutId)
  }, [index, count])

  useEffect(() => {
    if (!instant) return
    const frame = window.requestAnimationFrame(() => {
      setInstant(false)
    })
    return () => window.cancelAnimationFrame(frame)
  }, [instant])

  return { index, setIndex, instant, setInstant, reduceMotion }
}

/**
 * Corner tall-ad slot — same length/placement as before:
 * image fills height, dots on the image, Advertise here as footer.
 */
function CornerAdSlot({
  ads,
  label,
  startDelayMs = 0,
  intervalMs = ROTATE_MS,
  className,
}: {
  ads: HeroAd[]
  label: string
  startDelayMs?: number
  intervalMs?: number
  className?: string
}) {
  const count = ads.length
  const [paused, setPaused] = useState(false)
  const { index, setIndex, instant, setInstant, reduceMotion } = useAdSlideshow({
    count,
    startDelayMs,
    intervalMs,
    paused,
  })

  if (count === 0) return null

  const active = index % count
  const slides = count > 1 ? [...ads, ads[0]!] : ads

  return (
    <div
      className={cn('relative min-h-0 flex-1 overflow-hidden', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="absolute inset-y-0 left-0 flex h-full motion-reduce:transition-none"
        style={{
          width: `${slides.length * 100}%`,
          transform: `translateX(-${(index * 100) / slides.length}%)`,
          transition: instant || reduceMotion ? 'none' : `transform ${SLIDE_MS}ms ease-in-out`,
        }}
      >
        {slides.map((ad, slideIndex) => {
          const visible = slideIndex === index
          return (
            <div
              key={`${ad.id}-${slideIndex}`}
              className="relative h-full shrink-0"
              style={{ width: `${100 / slides.length}%` }}
              aria-hidden={!visible}
              inert={!visible}
            >
              <AdCard ad={ad} tabIndex={visible ? 0 : -1} />
            </div>
          )
        })}
      </div>

      {count > 1 ? (
        <div
          className="absolute bottom-1.5 left-1/2 z-[2] flex -translate-x-1/2 gap-1"
          role="tablist"
          aria-label={`${label} advertisers`}
        >
          {ads.map((ad, dotIndex) => (
            <button
              key={ad.id}
              type="button"
              role="tab"
              aria-label={`Show ${ad.title}`}
              aria-selected={dotIndex === active}
              onClick={() => {
                setInstant(true)
                setIndex(dotIndex)
              }}
              className={cn(
                'h-1.5 rounded-full shadow-sm transition-all',
                dotIndex === active ? 'w-3.5 bg-paper' : 'w-1.5 bg-paper/45 hover:bg-paper/75',
              )}
            />
          ))}
        </div>
      ) : null}

      <p className="sr-only" aria-live="polite">
        {ads[active]?.title}
        {ads[active]?.subtitle ? `, ${ads[active].subtitle}` : ''}
      </p>
    </div>
  )
}

/** Original corner column: top ad + CTA, gap, bottom ad + CTA — full hero height */
function CornerAdColumn({
  topAds,
  bottomAds,
  topLabel,
  bottomLabel,
  topDelayMs,
  bottomDelayMs,
}: {
  topAds: HeroAd[]
  bottomAds: HeroAd[]
  topLabel: string
  bottomLabel: string
  topDelayMs: number
  bottomDelayMs: number
}) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <CornerAdSlot ads={topAds} label={topLabel} startDelayMs={topDelayMs} />
      <AdvertiseLink className="shrink-0" />
      <div className="h-9 shrink-0" aria-hidden />
      <CornerAdSlot ads={bottomAds} label={bottomLabel} startDelayMs={bottomDelayMs} />
      <AdvertiseLink className="shrink-0" />
    </div>
  )
}

function RightPromoCardGrid({ cards }: { cards: HeroAd[] }) {
  if (cards.length === 0) return null

  return (
    <aside
      className={cn(
        'absolute z-[6] hidden flex-col p-0 xl:flex',
        RIGHT_PROMO_RAIL,
        RIGHT_PROMO_OFFSET,
        // End with SEARCH — do not cover bottom slide thumbnails
        'top-0 bottom-[4.75rem] sm:bottom-20',
      )}
      aria-label="Sponsored promo cards"
    >
      <div className="grid h-full min-h-0 grid-cols-2 grid-rows-6 gap-px bg-white/10">
        {cards.slice(0, 12).map((ad) => (
          <PromoBannerCard key={ad.id} ad={ad} />
        ))}
      </div>
    </aside>
  )
}

export function HeroAdRails() {
  return (
    <>
      {/* Far left corners — original full-height placement */}
      <aside className={cn('absolute inset-y-0 left-0 z-[6] hidden p-0 lg:flex', SIDE_AD_RAIL)}>
        <CornerAdColumn
          topAds={TOP_LEFT_ADS}
          bottomAds={BOTTOM_LEFT_ADS}
          topLabel="Top left"
          bottomLabel="Bottom left"
          topDelayMs={0}
          bottomDelayMs={1600}
        />
      </aside>

      {/* Inner-right promo cards (stop above slider) */}
      <RightPromoCardGrid cards={RIGHT_PROMO_CARDS} />

      {/* Far right corners — original full-height placement */}
      <aside className={cn('absolute inset-y-0 right-0 z-[6] hidden p-0 xl:flex', SIDE_AD_RAIL)}>
        <CornerAdColumn
          topAds={TOP_RIGHT_ADS}
          bottomAds={BOTTOM_RIGHT_ADS}
          topLabel="Top right"
          bottomLabel="Bottom right"
          topDelayMs={800}
          bottomDelayMs={2400}
        />
      </aside>

      <div className="absolute right-0 top-0 z-[6] h-20 w-24 overflow-hidden xl:hidden">
        <CornerAdSlot
          ads={TOP_RIGHT_ADS}
          label="Featured"
          startDelayMs={400}
          intervalMs={4200}
          className="h-full flex-none"
        />
      </div>
    </>
  )
}
