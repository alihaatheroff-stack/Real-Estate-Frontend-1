import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { Maximize2, Minimize2 } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import {
  BOTTOM_LEFT_ADS,
  BOTTOM_RIGHT_ADS,
  RIGHT_PROMO_CARDS,
  TOP_LEFT_ADS,
  TOP_RIGHT_ADS,
  type HeroAd,
  type HeroAdBroker,
} from '@/features/landing/data/heroAds'
import { cn } from '@/shared/lib/cn'

const SLIDE_MS = 700

/** Corner tall-ad width — keep LandingHero / HeroSlideshow offsets in sync */
const SIDE_AD_RAIL = 'w-[clamp(7.5rem,11vw,11rem)]'
const RIGHT_PROMO_RAIL = 'w-[clamp(11rem,15vw,14rem)]'
/** Promo cards sit left of the far-right tall rail */
const RIGHT_PROMO_OFFSET = 'right-[clamp(7.5rem,11vw,11rem)]'

function AdExpandButton({
  onClick,
  className,
}: {
  onClick: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      aria-label="Expand advertisement"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onClick()
      }}
      className={cn(
        'inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/95 text-ink shadow-sm transition hover:bg-white',
        className,
      )}
    >
      <Maximize2 className="h-3.5 w-3.5" strokeWidth={2.25} />
    </button>
  )
}

function HeroAdBrokerBlock({ broker }: { broker: HeroAdBroker }) {
  const cityZip = [broker.city, broker.zipcode].filter(Boolean).join(', ')

  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[11px] leading-snug text-muted">
      <p className="min-w-0 truncate text-xs font-semibold text-ink underline">
        {broker.brokerName || '—'}
      </p>
      <p className="min-w-0 truncate">
        <span className="font-medium text-ink-soft">Address:</span> {broker.address || '—'}
      </p>
      <p className="min-w-0 truncate">
        <span className="font-medium text-ink-soft">Service:</span> {broker.service || '—'}
      </p>
      <p className="min-w-0 truncate">
        <span className="font-medium text-ink-soft">City, Zipcode:</span> {cityZip || '—'}
      </p>
      <p className="min-w-0 truncate">
        <span className="font-medium text-ink-soft">License #:</span> {broker.licenseNo || '—'}
      </p>
      <p className="min-w-0 truncate">
        <span className="font-medium text-ink-soft">Phone:</span> {broker.phone || '—'}
      </p>
    </div>
  )
}

function expandHeadlineFor(ad: HeroAd) {
  if (ad.expandHeadline) return ad.expandHeadline
  if (ad.referralPercent != null && ad.referralPercent !== '') {
    return `${String(ad.referralPercent).replace(/%/g, '').trim()}% referral partnerships`
  }
  return ad.title
}

function HeroAdExpandDialog({
  ad,
  initialPhotoIndex = 0,
  onClose,
}: {
  ad: HeroAd
  initialPhotoIndex?: number
  onClose: () => void
}) {
  const images = ad.images && ad.images.length > 0 ? ad.images : [ad.image]
  const [photoIndex, setPhotoIndex] = useState(initialPhotoIndex)

  useEffect(() => {
    setPhotoIndex(
      Math.min(Math.max(initialPhotoIndex, 0), Math.max(images.length - 1, 0)),
    )
  }, [ad.id, initialPhotoIndex, images.length])

  useEffect(() => {
    const previousBody = document.body.style.overflow
    const previousHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (images.length < 2) return
      if (event.key === 'ArrowRight') {
        setPhotoIndex((current) => (current + 1) % images.length)
      }
      if (event.key === 'ArrowLeft') {
        setPhotoIndex((current) => (current - 1 + images.length) % images.length)
      }
    }

    function lockScroll(event: Event) {
      event.preventDefault()
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('wheel', lockScroll, { passive: false })
    window.addEventListener('touchmove', lockScroll, { passive: false })
    return () => {
      document.body.style.overflow = previousBody
      document.documentElement.style.overflow = previousHtml
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('wheel', lockScroll)
      window.removeEventListener('touchmove', lockScroll)
    }
  }, [images.length, onClose])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded advertisement: ${ad.title}`}
      className="fixed inset-x-0 bottom-0 top-[5.25rem] z-[200] flex items-end justify-center bg-ink/45 p-0 sm:top-[6rem] sm:items-start sm:px-4 sm:pb-6 md:px-6"
      onClick={onClose}
      onWheel={(event) => event.preventDefault()}
      onTouchMove={(event) => event.preventDefault()}
    >
      <div
        className="relative flex max-h-[min(96vh,1020px)] w-full max-w-4xl flex-col overflow-hidden rounded-t-2xl border border-white bg-white shadow-2xl sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
        onWheel={(event) => event.stopPropagation()}
        onTouchMove={(event) => event.stopPropagation()}
      >
        <div className="relative shrink-0 overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${photoIndex * 100}%)` }}
          >
            {images.map((src, imageIndex) => (
              <img
                key={`${ad.id}-expand-${src}-${imageIndex}`}
                src={src}
                alt=""
                className="h-[min(62vh,580px)] w-full shrink-0 object-cover"
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[4] flex items-center justify-between gap-2 px-3 py-3">
            <span className="pointer-events-auto rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold text-ink shadow-sm hover:underline">
              Ad
            </span>
            {ad.logo ? (
              <span className="inline-flex shrink-0 items-center rounded-sm bg-white/75 px-1 py-px shadow-sm">
                <img src={ad.logo} alt="" className="h-6 w-auto max-w-[6.5rem] object-contain" />
              </span>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Collapse advertisement"
            onClick={onClose}
            className="absolute bottom-3 right-3 z-[5] inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/95 text-ink shadow-sm transition hover:bg-white"
          >
            <Minimize2 className="h-4 w-4" strokeWidth={2.25} />
          </button>
          {images.length > 1 ? (
            <div
              className="absolute inset-x-0 bottom-3 z-[4] flex items-center justify-center gap-1.5"
              role="tablist"
              aria-label="Advertisement photos"
            >
              {images.map((_, imageIndex) => (
                <button
                  key={`expand-dot-${ad.id}-${imageIndex}`}
                  type="button"
                  role="tab"
                  aria-label={`Show photo ${imageIndex + 1}`}
                  aria-selected={imageIndex === photoIndex}
                  onClick={() => setPhotoIndex(imageIndex)}
                  className={cn(
                    'h-1.5 w-1.5 rounded-full shadow-sm transition-colors',
                    imageIndex === photoIndex
                      ? 'bg-white'
                      : 'bg-white/45 hover:bg-white/70',
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="shrink-0 px-5 py-4 sm:px-6 sm:py-5">
          <div className="mb-2.5 grid grid-cols-2 gap-x-4 gap-y-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              Advertisement
            </p>
            <p className="min-w-0 truncate text-xs font-semibold text-ink underline sm:text-sm">
              {expandHeadlineFor(ad)}
            </p>
          </div>
          {ad.broker ? <HeroAdBrokerBlock broker={ad.broker} /> : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function AdCard({
  ad,
  className,
  tabIndex,
  onExpand,
}: {
  ad: HeroAd
  className?: string
  tabIndex?: number
  onExpand?: () => void
}) {
  return (
    <Link
      to={ad.href}
      tabIndex={tabIndex}
      className={cn(
        'group relative block h-full w-full overflow-hidden border border-white bg-ink/40 shadow-soft backdrop-blur-sm transition',
        'hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50',
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
      <span className="absolute left-1.5 top-1.5 z-[3] rounded-md bg-white/95 px-1.5 py-0.5 text-[9px] font-semibold text-ink shadow-sm hover:underline sm:left-2 sm:top-2 sm:text-[10px]">
        Ad
      </span>
      {onExpand ? (
        <AdExpandButton
          onClick={onExpand}
          className="absolute bottom-7 right-1.5 z-[5] h-6 w-6 sm:bottom-8 sm:right-2 sm:h-7 sm:w-7"
        />
      ) : null}
      <div className="absolute inset-x-0 bottom-7 p-1.5 pr-9 sm:bottom-8 sm:p-2 sm:pr-10">
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
        'group relative block min-h-0 overflow-hidden border border-white bg-ink/50 shadow-soft',
        'transition hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50',
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

/**
 * Corner tall-ad slot — image fills height, dots + Advertise here overlay on the image.
 */
function CornerAdSlot({
  ads,
  label,
  className,
  onExpand,
}: {
  ads: HeroAd[]
  label: string
  className?: string
  onExpand?: (ad: HeroAd) => void
}) {
  const count = ads.length
  const [index, setIndex] = useState(0)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduceMotion(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])

  if (count === 0) return null

  const active = ((index % count) + count) % count

  return (
    <div className={cn('relative min-h-0 flex-1 overflow-hidden', className)}>
      <div
        className="absolute inset-y-0 left-0 flex h-full motion-reduce:transition-none"
        style={{
          width: `${count * 100}%`,
          transform: `translateX(-${(active * 100) / count}%)`,
          transition: reduceMotion ? 'none' : `transform ${SLIDE_MS}ms ease-in-out`,
        }}
      >
        {ads.map((ad, slideIndex) => {
          const visible = slideIndex === active
          return (
            <div
              key={ad.id}
              className="relative h-full shrink-0"
              style={{ width: `${100 / count}%` }}
              aria-hidden={!visible}
              inert={!visible}
            >
              <AdCard
                ad={ad}
                tabIndex={visible ? 0 : -1}
                onExpand={
                  visible && onExpand
                    ? () => onExpand(ad)
                    : undefined
                }
              />
            </div>
          )
        })}
      </div>

      {count > 1 ? (
        <div
          className="absolute bottom-5 left-1/2 z-[2] flex -translate-x-1/2 gap-1"
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
              onClick={() => setIndex(dotIndex)}
              className={cn(
                'h-1.5 rounded-full shadow-sm transition-all',
                dotIndex === active ? 'w-3.5 bg-paper' : 'w-1.5 bg-paper/45 hover:bg-paper/75',
              )}
            />
          ))}
        </div>
      ) : null}

      <Link
        to={PATHS.advertise}
        className="absolute inset-x-0 bottom-0 z-[3] px-1 pb-1 pt-0.5 text-center text-[9px] font-semibold tracking-wide text-paper drop-shadow-sm transition hover:text-paper hover:underline sm:text-[10px]"
        onClick={(event) => event.stopPropagation()}
      >
        Advertise here
      </Link>

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
  onExpand,
}: {
  topAds: HeroAd[]
  bottomAds: HeroAd[]
  topLabel: string
  bottomLabel: string
  onExpand?: (ad: HeroAd) => void
}) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col">
      <CornerAdSlot ads={topAds} label={topLabel} onExpand={onExpand} />
      <div className="h-9 shrink-0" aria-hidden />
      <CornerAdSlot ads={bottomAds} label={bottomLabel} onExpand={onExpand} />
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
      <div className="grid h-full min-h-0 grid-cols-2 grid-rows-6 gap-1.5 bg-transparent">
        {cards.slice(0, 12).map((ad) => (
          <PromoBannerCard key={ad.id} ad={ad} />
        ))}
      </div>
    </aside>
  )
}

export function HeroAdRails() {
  const [expandedAd, setExpandedAd] = useState<HeroAd | null>(null)

  return (
    <>
      {/* Far left corners — original full-height placement */}
      <aside className={cn('absolute inset-y-0 left-0 z-[6] hidden p-0 lg:flex', SIDE_AD_RAIL)}>
        <CornerAdColumn
          topAds={TOP_LEFT_ADS}
          bottomAds={BOTTOM_LEFT_ADS}
          topLabel="Top left"
          bottomLabel="Bottom left"
          onExpand={setExpandedAd}
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
          onExpand={setExpandedAd}
        />
      </aside>

      <div className="absolute right-0 top-0 z-[6] h-20 w-24 overflow-hidden xl:hidden">
        <CornerAdSlot
          ads={TOP_RIGHT_ADS}
          label="Featured"
          className="h-full flex-none"
          onExpand={setExpandedAd}
        />
      </div>

      {expandedAd ? (
        <HeroAdExpandDialog ad={expandedAd} onClose={() => setExpandedAd(null)} />
      ) : null}
    </>
  )
}
