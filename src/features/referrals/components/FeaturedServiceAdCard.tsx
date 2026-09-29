import { forwardRef, useMemo, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { providerPath } from '@/app/router/paths'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  referralServiceFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import {
  PROFILE_RESULT_CARD_FRAME,
  type AdBannerPlacement,
} from '@/features/referrals/components/FeaturedAgentAdCard'
import { getProviderForService } from '@/features/referrals/api/repository'
import type { ServiceResultAd } from '@/features/referrals/data/serviceResultAds'
import type { Service } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

const FALLBACK_IMAGE = '/images/services/townhouse-exteriors.png'

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
      ad,
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
      <div className="relative h-full w-full">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-5 top-1/2 z-20 select-none font-display text-[15px] font-bold uppercase tracking-[0.22em] text-sky-500 drop-shadow-[0_1px_1px_rgb(15_31_26_/_0.18)] sm:-left-6 sm:text-[17px]"
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
            PROFILE_RESULT_CARD_FRAME,
            'cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
            selected
              ? 'border-sky-500 shadow-soft ring-2 ring-sky-500/25'
              : active
                ? 'border-sky-500 shadow-soft ring-2 ring-sky-500/25'
                : 'border-line/80 hover:-translate-y-0.5 hover:border-sky-500 hover:shadow-[0_10px_28px_rgb(15_31_26/0.1)]',
          )}
        >
          <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-mist">
            <img
              src={imageSrc}
              alt={service.title}
              className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
              loading="lazy"
              onError={() => setImageSrc(FALLBACK_IMAGE)}
            />

            <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold leading-none text-ink shadow-sm">
              Ad
            </span>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation()
                favorite.toggleSave()
              }}
              className="absolute right-2.5 top-2.5 z-10 inline-flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.65)] transition hover:scale-110 hover:text-rose-500"
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

          <div className="grid min-h-0 flex-1 grid-cols-2 items-start gap-x-2.5 gap-y-1 border-t border-line/70 px-3 py-2.5 text-[11px] leading-[1.35] text-ink sm:gap-x-3 sm:px-3.5 sm:text-[12px]">
            <div className="flex h-24 min-w-0 items-start sm:h-[6.5rem]">
              <img
                src={ad.companyLogo}
                alt={ad.companyName}
                className="h-full w-full object-contain object-left object-top"
                loading="lazy"
              />
            </div>

            <div className="flex h-16 min-w-0 items-start sm:h-[4.5rem]">
              {provider ? (
                <Link
                  to={providerPath(provider.id)}
                  onClick={(event) => event.stopPropagation()}
                  className="block size-14 shrink-0 overflow-hidden rounded-md border border-line sm:size-16"
                >
                  <img
                    src={provider.image}
                    alt={provider.name}
                    className="h-full w-full object-cover object-top"
                    loading="lazy"
                  />
                </Link>
              ) : null}
            </div>

            <p className="min-w-0 truncate font-bold text-[#0b1f3a]">{ad.companyName}</p>
            {provider ? (
              <Link
                to={providerPath(provider.id)}
                onClick={(event) => event.stopPropagation()}
                className="min-w-0 truncate font-bold text-[#0b1f3a] hover:underline"
              >
                {provider.name}
              </Link>
            ) : (
              <p className="min-w-0 truncate font-bold text-[#0b1f3a]">{service.title}</p>
            )}

            <p className="min-w-0 truncate text-[10px] text-muted sm:text-[11px]">
              {ad.companyTagline ?? '\u00A0'}
            </p>
            <p className="min-w-0 truncate text-[10px] text-muted sm:text-[11px]">
              {provider?.title ?? service.category}
            </p>

            <p className="min-w-0 truncate text-muted">License #: {ad.companyLicenseNo}</p>
            <p className="min-w-0 truncate text-muted">
              {provider?.licenseNo ? `License # ${provider.licenseNo}` : '\u00A0'}
            </p>

            <p className="min-w-0 truncate text-muted">Phone: {ad.companyPhone}</p>
            <p className="min-w-0 truncate text-muted">
              {provider?.phone ? `Phone: ${provider.phone}` : '\u00A0'}
            </p>

            <p className="min-w-0 line-clamp-2 text-muted">{ad.companyAddress}</p>
            <p className="min-w-0" aria-hidden>
              {'\u00A0'}
            </p>
          </div>

          <FavoriteActionDialogs favorite={favorite} />
        </article>
      </div>
    )
  },
)
