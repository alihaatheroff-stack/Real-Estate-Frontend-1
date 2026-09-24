import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import type { FeedAd } from '@/features/network/data/feedAds'
import { cn } from '@/shared/lib/cn'

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
        </span>
      </Link>
    )
  }

  if (variant === 'feed') {
    return (
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
        <Link to={ad.href} className="flex items-center justify-between gap-3 border-t border-line/80 bg-[#F7F8F9] px-4 py-3">
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
    )
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
        </span>
      </Link>
    )
  }

  return (
    <NetworkCard padded={false}>
      <Link to={ad.href} className="block">
        <span className="relative block">
          <img src={ad.image} alt="" className="h-36 w-full object-cover" />
          <span className="absolute left-2 top-2 rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold underline text-ink shadow-sm">
            Ad
          </span>
        </span>
        <span className="block p-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            personalized Ad · {ad.sponsor}
          </span>
          <span className="mt-1 block text-sm font-semibold leading-snug text-ink">{ad.title}</span>
          <span className="mt-1 block text-xs leading-relaxed text-muted">{ad.subtitle}</span>
        </span>
      </Link>
    </NetworkCard>
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
          className="absolute left-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-soft"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => go(index + 1)}
          className="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-soft"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <span className="absolute right-3 top-3 rounded-full bg-ink/75 px-2.5 py-1 text-xs font-semibold text-white">
          {index + 1} / {images.length}
        </span>
        {price ? (
          <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2.5 py-1 text-sm font-semibold text-ink">
            {price}
          </span>
        ) : null}
      </div>
      <div className="flex items-center justify-center gap-1.5 py-3" role="tablist" aria-label="Photo pages">
        {images.map((_, imageIndex) => (
          <button
            key={`dot-${imageIndex}`}
            type="button"
            role="tab"
            aria-label={`Show photo ${imageIndex + 1}`}
            aria-selected={imageIndex === index}
            onClick={() => go(imageIndex)}
            className={cn(
              'h-2 w-2 rounded-full transition-colors',
              imageIndex === index ? 'bg-ink' : 'bg-line hover:bg-muted',
            )}
          />
        ))}
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
