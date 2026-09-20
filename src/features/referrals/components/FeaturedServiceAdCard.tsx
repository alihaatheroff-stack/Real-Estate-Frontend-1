import { forwardRef, useMemo, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CircleDollarSign, Heart, MapPin, Star } from 'lucide-react'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { providerPath, servicePath } from '@/app/router/paths'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  referralServiceFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import {
  AdCornerRibbon,
  AdWatermark,
  isCornerRibbonPlacement,
  type AdBannerPlacement,
} from '@/features/referrals/components/FeaturedAgentAdCard'
import { getProviderForService } from '@/features/referrals/api/repository'
import type { ServiceResultAd } from '@/features/referrals/data/serviceResultAds'
import type { Service } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

const US_STATE_NAMES: Record<string, string> = {
  CA: 'California',
  FL: 'Florida',
  TX: 'Texas',
  WA: 'Washington',
}

function formatProviderLocation(city: string, state: string, country?: string) {
  const stateName = US_STATE_NAMES[state] ?? state
  const region = country === 'United States' || !country ? 'North America' : country
  return `${city}, ${stateName}, ${region}`
}

type FeaturedServiceAdCardProps = {
  ad: ServiceResultAd
  service: Service
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
      bannerPlacement = 'bottom-right',
      active,
      selected,
      onSelect,
      onHover,
    },
    ref,
  ) {
    const provider = getProviderForService(service)
    const href = servicePath(service.id)
    const profileHref = provider ? providerPath(provider.id) : href
    const usesCornerRibbon = isCornerRibbonPlacement(bannerPlacement)
    const contentFlush = bannerPlacement !== 'top-left'
    const draft = useMemo(
      () => referralServiceFavoriteDraft(service, provider),
      [provider, service],
    )
    const favorite = useFavoriteToggle(draft)
    const locationLabel = provider
      ? formatProviderLocation(provider.city, provider.state, provider.country)
      : null
    const rateLabel = provider
      ? provider.hourlyRateMin != null && provider.hourlyRateMax != null
        ? `$${provider.hourlyRateMin} - $${provider.hourlyRateMax} / hr`
        : `Starting at ${formatCurrency(service.startingPrice)}`
      : `Starting at ${formatCurrency(service.startingPrice)}`

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect(service.id)
      }
    }

    return (
      <article
        ref={ref}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={`Sponsored listing: show ${service.title} on the map`}
        onMouseEnter={() => onHover(service.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect(service.id)}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[#b7d8f0] bg-[#eef7fd] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition',
          selected || active
            ? 'border-freeio shadow-[0_12px_36px_rgba(91,187,123,0.18)]'
            : 'hover:border-freeio/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]',
        )}
      >
        {usesCornerRibbon ? <AdCornerRibbon placement={bannerPlacement} /> : null}
        {bannerPlacement === 'watermark' ? <AdWatermark /> : null}

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            favorite.toggleSave()
          }}
          className="absolute right-3 top-3 z-20 inline-flex items-center justify-center text-muted transition hover:scale-110 hover:text-rose-500"
          aria-label={
            favorite.saved ? `Remove ${service.title} from favorites` : `Save ${service.title} to favorites`
          }
          aria-pressed={favorite.saved}
        >
          <Heart
            className={cn('h-4 w-4', favorite.saved && 'fill-rose-500 text-rose-500')}
            strokeWidth={2.2}
          />
        </button>

        <div className="relative z-[1] flex h-full flex-col">
          <div
            className={
              contentFlush ? 'flex items-start gap-4' : 'flex items-start gap-4 pl-5 sm:pl-6'
            }
          >
            {provider ? (
              <Link
                to={profileHref}
                onClick={(event) => event.stopPropagation()}
                className={contentFlush ? 'shrink-0' : 'mt-9 shrink-0'}
              >
                <img
                  src={provider.image}
                  alt={provider.name}
                  className={
                    contentFlush
                      ? 'h-20 w-20 rounded-full border-2 border-black object-cover sm:h-24 sm:w-24'
                      : 'h-24 w-24 rounded-full border-2 border-black object-cover sm:h-28 sm:w-28'
                  }
                  loading="lazy"
                />
              </Link>
            ) : null}

            <div className="min-w-0 flex-1 pr-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
                <span className="underline">Sponsored</span>
                {' · '}
                {ad.label}
              </p>
              {provider?.company ? (
                <p className="mt-1 text-sm font-bold leading-snug text-freeio-ink underline">
                  {provider.company}
                </p>
              ) : null}
              {provider?.licenseNo ? (
                <p className="mt-0.5 text-sm text-freeio-muted">License no: {provider.licenseNo}</p>
              ) : null}
              <Link
                to={profileHref}
                onClick={(event) => event.stopPropagation()}
                className="block text-sm font-bold leading-snug text-freeio-ink transition hover:text-freeio"
              >
                {provider?.name ?? service.title}
              </Link>
              {provider?.dreNo ? (
                <p className="mt-0.5 text-sm text-freeio-muted">CA DRE: {provider.dreNo}</p>
              ) : null}
            </div>
          </div>

          <div className="mt-3 space-y-2 text-sm text-freeio-muted">
            {provider?.title ? (
              <p className="text-freeio-ink">
                <span className="font-semibold">Role:</span> {provider.title}
              </p>
            ) : (
              <p className="text-freeio-ink">
                <span className="font-semibold">Service:</span> {service.title}
              </p>
            )}
            {(provider?.languages?.length ?? 0) > 0 ? (
              <p className="text-freeio-ink">
                <span className="font-semibold">Languages:</span>{' '}
                {provider!.languages.join(', ')}
              </p>
            ) : null}
            {provider ? (
              <p className="text-freeio-ink">
                <span className="font-semibold">Serving Across:</span>{' '}
                {US_STATE_NAMES[provider.state] ?? provider.state}
              </p>
            ) : null}
            <div className="flex items-center gap-x-2">
              <span className="inline-flex shrink-0 items-center gap-1.5">
                <Star className="h-3.5 w-3.5 shrink-0 fill-freeio-star text-freeio-star" />
                <span className="font-semibold text-freeio-ink">{formatRating(service.rating)}</span>
              </span>
              {locationLabel ? (
                <span className="inline-flex min-w-0 items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-freeio-subtle" />
                  <span className="whitespace-nowrap">{locationLabel}</span>
                </span>
              ) : null}
            </div>
            <div className="flex items-center gap-x-2">
              {provider ? (
                <span className="shrink-0 font-semibold text-freeio-ink">
                  Referrals: {provider.referralShare}%
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1.5">
                <CircleDollarSign className="h-3.5 w-3.5 shrink-0 text-freeio-subtle" />
                <span className="whitespace-nowrap">{rateLabel}</span>
              </span>
            </div>
          </div>

          <p className="mt-4 flex-1 text-sm leading-relaxed text-freeio-muted">
            {service.description}
          </p>

          <div className="mt-auto pt-4">
            <Link
              to={href}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#2563eb] px-4 text-sm font-semibold text-[#2563eb] transition hover:bg-[#eff6ff]"
            >
              View Service
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <FavoriteActionDialogs favorite={favorite} />
      </article>
    )
  },
)
