import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import {
  BOTTOM_LEFT_ADS,
  BOTTOM_RIGHT_ADS,
  TOP_LEFT_ADS,
  TOP_RIGHT_ADS,
  type HeroAd,
} from '@/features/landing/data/heroAds'
import { cn } from '@/shared/lib/cn'

const SLIDE_MS = 700
const ROTATE_MS = 4800

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

function ScrollingAdSlot({
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
  const slides = count > 1 ? [...ads, ads[0]!] : ads
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
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

  if (count === 0) return null

  const active = index % count

  return (
    <div
      className={cn('relative min-h-0 flex-1 overflow-hidden', className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className="absolute inset-x-0 top-0 w-full motion-reduce:transition-none"
        style={{
          height: `${slides.length * 100}%`,
          transform: `translateY(-${(index * 100) / slides.length}%)`,
          transition: instant || reduceMotion ? 'none' : `transform ${SLIDE_MS}ms ease-in-out`,
        }}
      >
        {slides.map((ad, slideIndex) => {
          const visible = slideIndex === index
          return (
            <div
              key={`${ad.id}-${slideIndex}`}
              className="relative w-full"
              style={{ height: `${100 / slides.length}%` }}
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
          className="absolute left-1/2 top-1.5 z-[2] flex -translate-x-1/2 gap-1"
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

export function HeroAdRails() {
  return (
    <>
      <aside className="absolute inset-y-0 left-0 z-[6] hidden w-[clamp(7.5rem,11vw,11rem)] flex-col p-0 lg:flex">
        <ScrollingAdSlot ads={TOP_LEFT_ADS} label="Top left" startDelayMs={0} />
        <AdvertiseLink className="shrink-0" />
        <div className="h-9 shrink-0" aria-hidden />
        <ScrollingAdSlot ads={BOTTOM_LEFT_ADS} label="Bottom left" startDelayMs={1600} />
        <AdvertiseLink className="shrink-0" />
      </aside>

      <aside className="absolute inset-y-0 right-0 z-[6] hidden w-[clamp(7.5rem,11vw,11rem)] flex-col p-0 xl:flex">
        <ScrollingAdSlot ads={TOP_RIGHT_ADS} label="Top right" startDelayMs={800} />
        <AdvertiseLink className="shrink-0" />
        <div className="h-9 shrink-0" aria-hidden />
        <ScrollingAdSlot ads={BOTTOM_RIGHT_ADS} label="Bottom right" startDelayMs={2400} />
        <AdvertiseLink className="shrink-0" />
      </aside>

      <div className="absolute right-0 top-0 z-[6] h-20 w-24 overflow-hidden xl:hidden">
        <ScrollingAdSlot
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
