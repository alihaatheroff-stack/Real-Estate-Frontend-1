import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Star } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import type { FeedAd, FeedAdBroker } from '@/features/network/data/feedAds'
import { cn } from '@/shared/lib/cn'

function FeedAdLogo({
  src,
  alt,
  size = 'md',
  className,
}: {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        'object-contain object-center',
        size === 'sm' && 'h-5 w-auto max-w-[5.5rem]',
        size === 'md' && 'h-6 w-auto max-w-[6.5rem]',
        size === 'lg' && 'h-7 w-auto max-w-[7.5rem]',
        size === 'xl' && 'h-8 w-auto max-w-[9rem]',
        className,
      )}
    />
  )
}

/** Top overlay: Ad (left) · logo (top-right). Expand/collapse sits separately bottom-right. */
function FeedAdImageChrome({
  logo,
  logoAlt,
  logoSize = 'md',
  left,
  className,
}: {
  logo?: string
  logoAlt?: string
  logoSize?: 'sm' | 'md' | 'lg' | 'xl'
  left: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-x-0 top-0 z-[4] flex items-center justify-between gap-2 px-2 py-2',
        className,
      )}
    >
      <div className="pointer-events-auto shrink-0">{left}</div>
      {logo ? (
        <span className="inline-flex shrink-0 items-center rounded-sm bg-white/75 px-1 py-px shadow-sm">
          <FeedAdLogo src={logo} alt={logoAlt ?? 'Logo'} size={logoSize} />
        </span>
      ) : (
        <span />
      )}
    </div>
  )
}

function FeedAdBrokerBlock({
  broker,
  compact = false,
  locationInline = false,
}: {
  broker: FeedAdBroker
  compact?: boolean
  /** Two-column rows: name|address, service|city, license|phone. */
  locationInline?: boolean
}) {
  const cityZip = [broker.city, broker.zipcode].filter(Boolean).join(', ')
  const nameClass = cn('font-semibold text-ink underline', compact ? 'text-[11px]' : 'text-xs')
  const textSize = compact ? 'text-[10px] leading-snug' : 'text-[11px] leading-snug'
  const nameRow = (
    <p className={cn('min-w-0 truncate', nameClass)}>{broker.brokerName || '—'}</p>
  )

  if (locationInline) {
    return (
      <div className={cn('grid grid-cols-2 gap-x-4 gap-y-1.5 text-muted', textSize)}>
        {nameRow}
        <p className="min-w-0 truncate">
          <span className="font-medium text-ink-soft">Address:</span>{' '}
          {broker.address || '—'}
        </p>
        <p className="min-w-0 truncate">
          <span className="font-medium text-ink-soft">Service:</span>{' '}
          {broker.service || '—'}
        </p>
        <p className="min-w-0 truncate">
          <span className="font-medium text-ink-soft">City, Zipcode:</span>{' '}
          {cityZip || '—'}
        </p>
        <p className="min-w-0 truncate">
          <span className="font-medium text-ink-soft">License #:</span>{' '}
          {broker.licenseNo || '—'}
        </p>
        <p className="min-w-0 truncate">
          <span className="font-medium text-ink-soft">Phone:</span>{' '}
          {broker.phone || '—'}
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-0.5 text-muted', textSize)}>
      {broker.brokerName ? nameRow : null}
      {broker.service ? (
        <p>
          <span className="font-medium text-ink-soft">Service:</span> {broker.service}
        </p>
      ) : null}
      {broker.licenseNo ? (
        <p>
          <span className="font-medium text-ink-soft">License #:</span> {broker.licenseNo}
        </p>
      ) : null}
      {broker.address ? (
        <p>
          <span className="font-medium text-ink-soft">Address:</span> {broker.address}
        </p>
      ) : null}
      {cityZip ? (
        <p>
          <span className="font-medium text-ink-soft">City, Zipcode:</span> {cityZip}
        </p>
      ) : null}
      {broker.phone ? (
        <p>
          <span className="font-medium text-ink-soft">Phone:</span> {broker.phone}
        </p>
      ) : null}
    </div>
  )
}

export function FeedAdCard({
  ad,
  variant = 'banner',
}: {
  ad: FeedAd
  variant?: 'banner' | 'row' | 'tile' | 'feed'
}) {
  if (variant === 'row') {
    return (
      <Link
        to={ad.href}
        className="flex gap-3 rounded-lg p-1 transition hover:bg-mist"
      >
        <img src={ad.image} alt="" className="h-20 w-24 shrink-0 rounded-lg object-cover" />
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold leading-snug text-ink">{ad.title}</span>
          <span className="mt-1 block text-xs text-muted">{ad.subtitle}</span>
          <span className="mt-1.5 block text-[11px] font-medium text-muted">Sponsored · {ad.sponsor}</span>
          {ad.broker ? <FeedAdBrokerBlock broker={ad.broker} compact /> : null}
        </span>
      </Link>
    )
  }

  if (variant === 'feed') {
    return <FeedNewsAdCard ad={ad} />
  }

  if (variant === 'tile') {
    return (
      <Link
        to={ad.href}
        className="relative block overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(15,31,26,0.04)]"
      >
        <img src={ad.image} alt="" className="h-28 w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <span className="absolute inset-x-0 bottom-0 p-2.5">
          <span className="block text-[10px] font-semibold uppercase tracking-wide text-white/80">
            Sponsored
          </span>
          <span className="block text-sm font-semibold leading-snug text-white">{ad.title}</span>
          {ad.broker?.brokerName ? (
            <span className="mt-0.5 block truncate text-[10px] text-white/85">{ad.broker.brokerName}</span>
          ) : null}
        </span>
      </Link>
    )
  }

  return <BannerFeedAdCard ad={ad} />
}

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

function FeedAdExpandDialog({
  ad,
  initialPhotoIndex = 0,
  onClose,
}: {
  ad: FeedAd
  initialPhotoIndex?: number
  onClose: () => void
}) {
  const images =
    ad.images && ad.images.length > 0 ? ad.images : [ad.image]
  const [photoIndex, setPhotoIndex] = useState(initialPhotoIndex)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    setPhotoIndex(
      Math.min(Math.max(initialPhotoIndex, 0), Math.max(images.length - 1, 0)),
    )
  }, [ad.id, initialPhotoIndex, images.length])

  useEffect(() => {
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

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

    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [images.length, onClose])

  useEffect(() => {
    if (paused || images.length < 2) return
    const timer = window.setInterval(() => {
      setPhotoIndex((current) => (current + 1) % images.length)
    }, 3500)
    return () => window.clearInterval(timer)
  }, [images.length, paused])

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Expanded advertisement: ${ad.title}`}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/10 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[min(92vh,880px)] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative shrink-0 overflow-hidden">
          {ad.video ? (
            <video
              src={ad.video}
              poster={images[photoIndex] ?? ad.image}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="max-h-[min(52vh,420px)] w-full bg-ink object-cover"
            />
          ) : (
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${photoIndex * 100}%)` }}
            >
              {images.map((src, imageIndex) => (
                <img
                  key={`${ad.id}-expand-${src}-${imageIndex}`}
                  src={src}
                  alt=""
                  className="max-h-[min(52vh,420px)] w-full shrink-0 object-cover"
                />
              ))}
            </div>
          )}
          <FeedAdImageChrome
            className="px-3 py-3"
            logo={ad.logo}
            logoAlt={`${ad.broker?.service ?? ad.sponsor} logo`}
            logoSize="lg"
            left={
              <span className="rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold underline text-ink shadow-sm">
                Ad
              </span>
            }
          />
          <button
            type="button"
            aria-label="Collapse advertisement"
            onClick={onClose}
            className="absolute bottom-3 right-3 z-[5] inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/95 text-ink shadow-sm transition hover:bg-white"
          >
            <Minimize2 className="h-4 w-4" strokeWidth={2.25} />
          </button>
          {!ad.video && images.length > 1 ? (
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

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
          <div className="mb-2 grid grid-cols-2 gap-x-4 gap-y-0.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
              Advertisement{ad.price ? ` · ${ad.price}` : ''}
            </p>
            <p className="min-w-0 truncate text-xs font-semibold text-ink underline">
              {ad.referralPercent != null && ad.referralPercent !== ''
                ? `${String(ad.referralPercent).replace(/%/g, '').trim()}% referral partnerships`
                : ad.title}
            </p>
          </div>
          {ad.broker ? <FeedAdBrokerBlock broker={ad.broker} locationInline /> : null}
        </div>
      </div>
    </div>,
    document.body,
  )
}

function BannerFeedAdCard({ ad }: { ad: FeedAd }) {
  return <FeedAdCarousel ads={[ad]} />
}

/** Sidebar slot — rotates advertisers when several place ads here; photos slide within each ad. */
export function FeedAdCarousel({
  ads,
  intervalMs = 3500,
  adIntervalMs = 7000,
  initialAdIndex = 0,
}: {
  ads: FeedAd[]
  intervalMs?: number
  /** Rotate to the next advertiser after this many ms (when 2+ ads share the slot). */
  adIntervalMs?: number
  initialAdIndex?: number
}) {
  const pool = ads.filter(Boolean)
  const [adIndex, setAdIndex] = useState(() =>
    pool.length ? ((initialAdIndex % pool.length) + pool.length) % pool.length : 0,
  )
  const [photoIndex, setPhotoIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const [expandedAd, setExpandedAd] = useState<FeedAd | null>(null)
  const [expandedPhotoIndex, setExpandedPhotoIndex] = useState(0)

  const ad = pool[adIndex] ?? pool[0]
  const images =
    ad?.images && ad.images.length > 0 ? ad.images : ad ? [ad.image] : []
  const photoCount = images.length
  const adCount = pool.length
  const rotationPaused = paused || expandedAd != null

  useEffect(() => {
    setPhotoIndex(0)
  }, [ad?.id])

  useEffect(() => {
    if (rotationPaused || photoCount < 2) return
    const timer = window.setInterval(() => {
      setPhotoIndex((current) => (current + 1) % photoCount)
    }, intervalMs)
    return () => window.clearInterval(timer)
  }, [photoCount, intervalMs, rotationPaused, ad?.id])

  useEffect(() => {
    if (rotationPaused || adCount < 2) return
    const timer = window.setInterval(() => {
      setAdIndex((current) => (current + 1) % adCount)
    }, adIntervalMs)
    return () => window.clearInterval(timer)
  }, [adCount, adIntervalMs, rotationPaused])

  if (!ad || photoCount === 0) return null

  function openExpand() {
    setExpandedAd(ad)
    setExpandedPhotoIndex(photoIndex)
  }

  return (
    <>
      <NetworkCard padded={false}>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${photoIndex * 100}%)` }}
            >
              {images.map((src, imageIndex) => (
                <div
                  key={`${ad.id}-${src}-${imageIndex}`}
                  className="relative h-36 w-full shrink-0"
                  aria-hidden={imageIndex !== photoIndex}
                >
                  <img src={src} alt="" className="h-36 w-full object-cover" />
                </div>
              ))}
            </div>
            <FeedAdImageChrome
              logo={ad.logo}
              logoAlt={`${ad.broker?.service ?? ad.sponsor} logo`}
              logoSize="md"
              left={
                <span className="rounded-md bg-white/95 px-2 py-0.5 text-[11px] font-semibold underline text-ink shadow-sm">
                  Ad
                </span>
              }
            />
            <AdExpandButton onClick={openExpand} className="absolute bottom-2 right-2 z-[5]" />
            {photoCount > 1 ? (
              <div
                className="absolute inset-x-0 bottom-2 z-[4] flex items-center justify-center gap-1.5"
                role="tablist"
                aria-label="Advertisement photos"
              >
                {images.map((_, imageIndex) => (
                  <button
                    key={`photo-dot-${ad.id}-${imageIndex}`}
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

          {ad.broker ? (
            <div className="border-t border-line/60 p-3">
              <FeedAdBrokerBlock broker={ad.broker} />
            </div>
          ) : null}

          {adCount > 1 ? (
            <div
              className="flex items-center justify-center gap-1.5 border-t border-line/60 px-2 py-2.5"
              role="tablist"
              aria-label="Advertisers in this slot"
            >
              {pool.map((slide, slideIndex) => (
                <button
                  key={`ad-dot-${slide.id}`}
                  type="button"
                  role="tab"
                  aria-label={`Show ad from ${slide.broker?.brokerName ?? slide.sponsor}`}
                  aria-selected={slideIndex === adIndex}
                  onClick={() => setAdIndex(slideIndex)}
                  className={cn(
                    'h-2 rounded-full transition-all',
                    slideIndex === adIndex
                      ? 'w-4 bg-brand'
                      : 'w-2 bg-line hover:bg-muted',
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
      </NetworkCard>
      {expandedAd ? (
        <FeedAdExpandDialog
          ad={expandedAd}
          initialPhotoIndex={expandedPhotoIndex}
          onClose={() => setExpandedAd(null)}
        />
      ) : null}
    </>
  )
}

function FeedNewsAdCard({ ad }: { ad: FeedAd }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <NetworkCard padded={false}>
        <div className="flex items-center gap-3 px-4 pt-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Star className="h-5 w-5 stroke-[1.5]" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-semibold text-ink">{ad.sponsor}</span>
            <span className="block text-[13px] text-muted">Sponsored</span>
          </span>
        </div>
        <p className="px-4 py-3 text-[15px] leading-relaxed text-ink">{ad.subtitle}</p>
        <div className="relative overflow-hidden">
          {ad.video ? (
            <video
              src={ad.video}
              poster={ad.image}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="max-h-[420px] w-full bg-ink object-cover"
            />
          ) : ad.images && ad.images.length > 1 ? (
            <ListingPhotoScroller images={ad.images} title={ad.title} price={ad.price} />
          ) : (
            <img src={ad.image} alt="" className="max-h-[420px] w-full object-cover" />
          )}
          <AdExpandButton onClick={() => setExpanded(true)} className="absolute bottom-3 right-3 z-[4]" />
        </div>
        {ad.broker ? (
          <div className="px-4 py-3">
            <FeedAdBrokerBlock broker={ad.broker} />
          </div>
        ) : null}
        <Link
          to={ad.href}
          className="flex items-center justify-between gap-3 border-t border-line/80 bg-[#F7F8F9] px-4 py-3"
        >
          <span className="min-w-0">
            <span className="block text-[11px] font-semibold uppercase tracking-wide text-muted">
              Advertisement{ad.price ? ` · ${ad.price}` : ''}
            </span>
            <span className="mt-0.5 block truncate text-sm font-semibold text-ink">{ad.title}</span>
          </span>
          <span className="shrink-0 rounded-md bg-mist px-3 py-1.5 text-sm font-semibold text-ink">
            Learn more
          </span>
        </Link>
      </NetworkCard>
      {expanded ? <FeedAdExpandDialog ad={ad} onClose={() => setExpanded(false)} /> : null}
    </>
  )
}

function ListingPhotoScroller({
  images,
  title,
  price,
}: {
  images: string[]
  title: string
  price?: string
}) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  function go(next: number) {
    setIndex((next + images.length) % images.length)
  }

  useEffect(() => {
    if (paused || images.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % images.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [images.length, paused])

  return (
    <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative overflow-hidden bg-ink">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, imageIndex) => (
            <img
              key={`${src}-${imageIndex}`}
              src={src}
              alt={`${title} photo ${imageIndex + 1}`}
              className="h-[420px] w-full shrink-0 object-cover"
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => go(index - 1)}
          className="absolute left-3 top-1/2 z-[1] inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-soft"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 z-[1] inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-soft"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="absolute right-3 top-3 z-[1] rounded-full bg-ink/75 px-2.5 py-1 text-xs font-semibold text-white">
          {index + 1} / {images.length}
        </span>
        {price ? (
          <span className="absolute bottom-3 left-3 z-[1] rounded-md bg-white/95 px-2.5 py-1 text-sm font-semibold text-ink">
            {price}
          </span>
        ) : null}
        <div
          className="absolute inset-x-0 bottom-3 z-[1] flex items-center justify-center gap-1.5"
          role="tablist"
          aria-label="Photo pages"
        >
          {images.map((_, imageIndex) => (
            <button
              key={`dot-${imageIndex}`}
              type="button"
              role="tab"
              aria-label={`Show photo ${imageIndex + 1}`}
              aria-selected={imageIndex === index}
              onClick={() => go(imageIndex)}
              className={cn(
                'h-2 w-2 rounded-full shadow-sm transition-colors',
                imageIndex === index
                  ? 'bg-white'
                  : 'bg-white/45 hover:bg-white/70',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export function AdvertiseSlot({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to={PATHS.advertise}
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-brand/30 bg-white text-center shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:border-brand hover:bg-brand/5',
        compact ? 'gap-1 px-3 py-4' : 'gap-1.5 px-4 py-6',
      )}
    >
      <Star className={cn('stroke-[1.5] text-brand', compact ? 'h-4 w-4' : 'h-5 w-5')} />
      <span className={cn('font-semibold text-ink', compact ? 'text-xs' : 'text-sm')}>
        Advertise here
      </span>
      {compact ? null : (
        <span className="text-xs leading-relaxed text-muted">Reach members on this newsfeed</span>
      )}
    </Link>
  )
}

export function FeedMobileAdStrip({ ads }: { ads: FeedAd[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:hidden">
      {ads.slice(0, 2).map((ad) => (
        <FeedAdCard key={ad.id} ad={ad} variant="tile" />
      ))}
    </div>
  )
}
