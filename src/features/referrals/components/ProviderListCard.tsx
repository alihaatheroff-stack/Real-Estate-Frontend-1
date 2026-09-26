import { forwardRef, useMemo, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CircleDollarSign, Heart, MapPin, Star } from 'lucide-react'
import { formatRating } from '@/shared/lib/format'
import { providerPath } from '@/app/router/paths'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  referralProviderFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import type { Provider } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

const US_STATE_NAMES: Record<string, string> = {
  CA: 'California',
  FL: 'Florida',
  TX: 'Texas',
  WA: 'Washington',
}

function formatProviderLocation(provider: Provider) {
  const stateName = US_STATE_NAMES[provider.state] ?? provider.state
  const region = provider.country === 'United States' || !provider.country
    ? 'North America'
    : provider.country
  return `${provider.city}, ${stateName}, ${region}`
}

type ProviderListCardProps = {
  provider: Provider
  active?: boolean
  selected?: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

export const ProviderListCard = forwardRef<HTMLElement, ProviderListCardProps>(
  function ProviderListCard({ provider, active, selected, onSelect, onHover }, ref) {
    const rateLabel =
      provider.hourlyRateMin != null && provider.hourlyRateMax != null
        ? `$${provider.hourlyRateMin} - $${provider.hourlyRateMax} / hr`
        : 'Rate on request'

    const locationLabel = formatProviderLocation(provider)
    const draft = useMemo(() => referralProviderFavoriteDraft(provider), [provider])
    const favorite = useFavoriteToggle(draft)

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect(provider.id)
      }
    }

    return (
      <article
        ref={ref}
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={`Show ${provider.name} on the map`}
        onMouseEnter={() => onHover(provider.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect(provider.id)}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative flex h-full cursor-pointer flex-col rounded-2xl border bg-white p-5 transition',
          selected || active
            ? 'border-[#0b1f3a] shadow-[0_12px_36px_rgba(11,31,58,0.18)]'
            : 'border-freeio-border-soft shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#0b1f3a]/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]',
        )}
      >
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            favorite.toggleSave()
          }}
          className="absolute right-3 top-3 z-10 inline-flex items-center justify-center text-muted transition hover:scale-110 hover:text-rose-500"
          aria-label={favorite.saved ? `Remove ${provider.name} from favorites` : `Save ${provider.name} to favorites`}
          aria-pressed={favorite.saved}
        >
          <Heart
            className={cn('h-4 w-4', favorite.saved && 'fill-rose-500 text-rose-500')}
            strokeWidth={2.2}
          />
        </button>
        <div className="flex items-start gap-4">
          <Link
            to={providerPath(provider.id)}
            onClick={(event) => event.stopPropagation()}
            className="shrink-0"
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="h-20 w-20 rounded-full border-2 border-black object-cover sm:h-24 sm:w-24"
              loading="lazy"
            />
          </Link>

          <div className="min-w-0 flex-1 pr-7">
            {provider.company ? (
              <p className="text-sm font-bold leading-snug text-freeio-ink underline">
                {provider.company}
              </p>
            ) : null}
            {provider.licenseNo ? (
              <p className="mt-0.5 text-sm text-freeio-muted">
                License no: {provider.licenseNo}
              </p>
            ) : null}
            <Link
              to={providerPath(provider.id)}
              onClick={(event) => event.stopPropagation()}
              className="block text-sm font-bold leading-snug text-freeio-ink transition hover:text-[#0b1f3a]"
            >
              {provider.name}
            </Link>
            {provider.dreNo ? (
              <p className="mt-0.5 text-sm text-freeio-muted">CA DRE: {provider.dreNo}</p>
            ) : null}
          </div>
        </div>

        <div className="mt-3 space-y-2 text-sm text-freeio-muted">
          {provider.title ? (
            <p className="text-freeio-ink">
              <span className="font-semibold">Role:</span> {provider.title}
            </p>
          ) : null}
          {(provider.languages?.length ?? 0) > 0 ? (
            <p className="text-freeio-ink">
              <span className="font-semibold">Languages:</span>{' '}
              {provider.languages.join(', ')}
            </p>
          ) : null}
          <p className="text-freeio-ink">
            <span className="font-semibold">Serving Across:</span>{' '}
            {US_STATE_NAMES[provider.state] ?? provider.state}
          </p>
          <div className="flex items-center gap-x-2">
            <span className="inline-flex shrink-0 items-center gap-1.5">
              <Star className="h-3.5 w-3.5 shrink-0 fill-freeio-star text-freeio-star" />
              <span className="font-semibold text-freeio-ink">{formatRating(provider.rating)}</span>
            </span>
            <span className="inline-flex min-w-0 items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-freeio-subtle" />
              <span className="whitespace-nowrap">{locationLabel}</span>
            </span>
          </div>
          <div className="flex items-center gap-x-2">
            <span className="shrink-0 font-semibold text-freeio-ink">
              Referrals: {provider.referralShare}%
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CircleDollarSign className="h-3.5 w-3.5 shrink-0 text-freeio-subtle" />
              <span className="whitespace-nowrap">{rateLabel}</span>
            </span>
          </div>
        </div>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-freeio-muted">
          {provider.about}
        </p>

        <div className="mt-auto pt-4">
          <Link
            to={providerPath(provider.id)}
            onClick={(event) => event.stopPropagation()}
            className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#0b1f3a] px-4 text-sm font-semibold text-[#0b1f3a] transition hover:bg-[#0b1f3a]/10"
          >
            View Profile
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <FavoriteActionDialogs favorite={favorite} />
      </article>
    )
  },
)
