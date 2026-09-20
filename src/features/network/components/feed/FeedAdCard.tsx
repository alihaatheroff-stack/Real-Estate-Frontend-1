import { Link } from 'react-router-dom'
import { Megaphone } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import type { FeedAd } from '@/features/network/data/feedAds'
import { cn } from '@/shared/lib/cn'

export function FeedAdCard({
  ad,
  variant = 'banner',
}: {
  ad: FeedAd
  variant?: 'banner' | 'row' | 'tile'
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
        <img src={ad.image} alt="" className="h-36 w-full object-cover" />
        <span className="block p-3">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-muted">
            Sponsored · {ad.sponsor}
          </span>
          <span className="mt-1 block text-sm font-semibold leading-snug text-ink">{ad.title}</span>
          <span className="mt-1 block text-xs leading-relaxed text-muted">{ad.subtitle}</span>
        </span>
      </Link>
    </NetworkCard>
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
      <Megaphone className={cn('text-brand', compact ? 'h-4 w-4' : 'h-5 w-5')} />
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
