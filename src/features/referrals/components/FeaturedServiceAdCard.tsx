import { forwardRef, useMemo, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { providerPath } from '@/app/router/paths'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  referralServiceFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import type { AdBannerPlacement } from '@/features/referrals/components/FeaturedAgentAdCard'
import { getProviderForService } from '@/features/referrals/api/repository'
import type { ServiceResultAd } from '@/features/referrals/data/serviceResultAds'
import type { Service } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

const FALLBACK_IMAGE =
  '/images/stock/photo-1560518883-ce09059eeffa.jpg'

type FeaturedServiceAdCardProps = {
  ad: ServiceResultAd
  service: Service
  /** Kept for call-site compatibility; ads use the vertical side label. */
  bannerPlacement?: AdBannerPlacement
  active?: boolean
  selected?: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

export const FeaturedServiceAdCard = forwardRef<HTMLElement, FeaturedServiceAdCardProps>(
  function FeaturedServiceAdCard(
    {
      ad: _ad,
      service,
      active,
      selected,
      onSelect,
      onHover,
    },
    ref,
  ) {
    const provider = getProviderForService(service)
    const [imageSrc, setImageSrc] = useState(service.image)
    const draft = useMemo(
      () => referralServiceFavoriteDraft(service, provider),
      [provider, service],
    )
    const favorite = useFavoriteToggle(draft)

    function selectOnMap(event?: { stopPropagation?: () => void }) {
      event?.stopPropagation?.()
      onSelect(service.id)
    }

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        selectOnMap()
      }
    }

    return (
      <div className="relative h-full">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-5 top-1/2 z-20 select-none font-display text-[16px] font-bold uppercase tracking-[0.28em] text-brand drop-shadow-[0_1px_1px_rgb(15_31_26_/_0.18)] sm:-left-6 sm:text-[18px]"
          style={{
            writingMode: 'vertical-rl',
            transform: 'translateY(-50%) rotate(180deg)',
          }}
        >
          Advertiser
        </span>

        <article
          ref={ref}
          role="button"
          tabIndex={0}
          aria-pressed={selected}
          aria-label={`Sponsored listing: show ${service.title} on the map`}
          onClick={() => selectOnMap()}
          onKeyDown={handleKeyDown}
          onMouseEnter={() => onHover(service.id)}
          onMouseLeave={() => onHover(null)}
          className={cn(
            'group flex h-full cursor-pointer flex-col overflow-hidden rounded-[18px] border bg-paper text-left shadow-[0_6px_18px_rgb(15_31_26/0.06)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
            selected
              ? 'border-brand shadow-soft ring-2 ring-brand/20'
              : active
                ? 'border-accent shadow-soft ring-2 ring-accent/25'
                : 'border-line/80 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-[0_10px_28px_rgb(15_31_26/0.1)]',
          )}
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-mist">
            <img
              src={imageSrc}
              alt={service.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImageSrc(FALLBACK_IMAGE)}
            />

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                favorite.toggleSave()
              }}
              className="absolute left-2.5 top-2.5 z-10 inline-flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.65)] transition hover:scale-110 hover:text-rose-500"
              aria-label={
                favorite.saved
                  ? `Remove ${service.title} from favorites`
                  : `Save ${service.title} to favorites`
              }
              aria-pressed={favorite.saved}
            >
              <Heart
                className={cn('h-4 w-4', favorite.saved && 'fill-rose-500 text-rose-500')}
                strokeWidth={2.2}
              />
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-2 p-4">
            <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
              {service.category}
            </p>
            <h3 className="line-clamp-2 min-h-[3.4rem] text-[19px] font-bold leading-snug text-ink group-hover:text-brand">
              {service.title}
            </h3>

            <div className="inline-flex items-center gap-1 text-sm text-ink">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span className="font-semibold">{formatRating(service.rating)}</span>
              <span className="text-muted">({service.reviewCount} Reviews)</span>
            </div>

            <div className="mt-auto flex items-end justify-between gap-2 border-t border-line/70 pt-3">
              <div className="flex min-w-0 items-center gap-2">
                {provider ? (
                  <>
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="h-8 w-8 shrink-0 rounded-full object-cover"
                    />
                    <Link
                      to={providerPath(provider.id)}
                      onClick={(event) => event.stopPropagation()}
                      className="truncate text-sm font-medium text-ink hover:text-brand hover:underline"
                    >
                      {provider.name}
                    </Link>
                  </>
                ) : null}
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[11px] text-muted">Starting at:</p>
                <p className="text-base font-bold text-ink">
                  {formatCurrency(service.startingPrice)}
                </p>
              </div>
            </div>
          </div>
          <FavoriteActionDialogs favorite={favorite} />
        </article>
      </div>
    )
  },
)
