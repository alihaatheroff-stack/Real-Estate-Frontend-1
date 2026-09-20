import { forwardRef, useMemo, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CircleDollarSign, Heart, MapPin, Star, Volume2 } from 'lucide-react'
import { formatRating } from '@/shared/lib/format'
import { providerPath } from '@/app/router/paths'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  referralProviderFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import type { ProfileResultAd } from '@/features/referrals/data/profileResultAds'
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

export type AdBannerPlacement = 'top-left' | 'top-right' | 'bottom-right' | 'watermark'

type FeaturedAgentAdCardProps = {
  ad: ProfileResultAd
  provider: Provider
  /** Client A/B: corner ribbon vs full-card watermark. */
  bannerPlacement?: AdBannerPlacement
  active?: boolean
  selected?: boolean
  onSelect?: (id: string) => void
  onHover?: (id: string | null) => void
}

export function AdCornerRibbon({
  placement,
  compact = false,
}: {
  placement: 'top-left' | 'top-right' | 'bottom-right'
  compact?: boolean
}) {
  const size = compact ? 'h-[5.25rem] w-[5.25rem]' : 'h-[7.5rem] w-[7.5rem]'
  const offset = compact ? 8 : 12
  const positionClass =
    placement === 'bottom-right'
      ? `pointer-events-none absolute bottom-0 right-0 z-10 overflow-hidden ${size} ${compact ? 'rounded-br-[0.85rem]' : 'rounded-br-[0.9rem]'}`
      : placement === 'top-right'
        ? `pointer-events-none absolute right-0 top-0 z-10 overflow-hidden ${size} ${compact ? 'rounded-tr-[0.85rem]' : 'rounded-tr-[0.9rem]'}`
        : `pointer-events-none absolute left-0 top-0 z-10 overflow-hidden ${size} ${compact ? 'rounded-tl-[0.85rem]' : 'rounded-tl-[0.9rem]'}`

  const rotate =
    placement === 'top-right'
      ? `translate(-50%, -50%) translate(${offset}px, -${offset}px) rotate(45deg)`
      : placement === 'bottom-right'
        ? `translate(-50%, -50%) translate(${offset}px, ${offset}px) rotate(-45deg)`
        : `translate(-50%, -50%) translate(-${offset}px, -${offset}px) rotate(-45deg)`

  return (
    <div className={positionClass} aria-hidden>
      <span
        className={
          compact
            ? 'absolute left-1/2 top-1/2 flex items-center gap-0.5 whitespace-nowrap bg-[#16a34a] py-[0.28rem] pl-5 pr-2.5 text-[8px] font-extrabold uppercase leading-none tracking-[0.06em] text-white shadow-sm'
            : 'absolute left-1/2 top-1/2 flex items-center gap-1 whitespace-nowrap bg-[#16a34a] py-[0.35rem] pl-6 pr-3 text-[10px] font-extrabold uppercase leading-none tracking-[0.08em] text-white shadow-sm'
        }
        style={{
          width: compact ? '7.75rem' : '10.25rem',
          transform: rotate,
        }}
      >
        <Volume2
          className={compact ? 'h-2.5 w-2.5 shrink-0 fill-white' : 'h-3 w-3 shrink-0 fill-white'}
          strokeWidth={2.25}
        />
        Advertisement
      </span>
    </div>
  )
}

export function AdWatermark({ compact = false }: { compact?: boolean } = {}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden [container-type:size]"
      aria-hidden
    >
      <span
        className={
          compact
            ? 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[58deg] select-none whitespace-nowrap text-[length:22cqmin] font-extrabold uppercase tracking-[0.28em] text-emerald-600/20'
            : 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[58deg] select-none whitespace-nowrap text-[length:14.08cqmin] font-extrabold uppercase tracking-[0.32em] text-emerald-600/18'
        }
      >
        Advertisement
      </span>
    </div>
  )
}

export function AdTopBanner() {
  return (
    <div
      className="flex items-center justify-center gap-1.5 bg-[#16a34a] px-2 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-white"
      aria-hidden
    >
      <Volume2 className="h-3 w-3 shrink-0 fill-white" strokeWidth={2.25} />
      Advertisement
    </div>
  )
}

export function isCornerRibbonPlacement(
  placement: AdBannerPlacement,
): placement is 'top-left' | 'top-right' | 'bottom-right' {
  return placement === 'top-left' || placement === 'top-right' || placement === 'bottom-right'
}

export function adBannerPlacementFor(_id?: string): AdBannerPlacement {
  return 'bottom-right'
}

export const FeaturedAgentAdCard = forwardRef<HTMLElement, FeaturedAgentAdCardProps>(
  function FeaturedAgentAdCard(
    {
      ad,
      provider,
      bannerPlacement = 'bottom-right',
      active,
      selected,
      onSelect,
      onHover,
    },
    ref,
  ) {
    const rateLabel =
      provider.hourlyRateMin != null && provider.hourlyRateMax != null
        ? `$${provider.hourlyRateMin} - $${provider.hourlyRateMax} / hr`
        : 'Rate on request'

    const locationLabel = formatProviderLocation(provider)
    const href = providerPath(provider.id)
    const usesCornerRibbon = isCornerRibbonPlacement(bannerPlacement)
    const contentFlush = bannerPlacement !== 'top-left'
    const interactive = Boolean(onSelect)
    const draft = useMemo(() => referralProviderFavoriteDraft(provider), [provider])
    const favorite = useFavoriteToggle(draft)

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (!onSelect) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect(provider.id)
      }
    }

    return (
      <article
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-pressed={interactive ? selected : undefined}
        aria-label={interactive ? `Show ${provider.name} on the map` : undefined}
        onMouseEnter={onHover ? () => onHover(provider.id) : undefined}
        onMouseLeave={onHover ? () => onHover(null) : undefined}
        onClick={onSelect ? () => onSelect(provider.id) : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        className={cn(
          'relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#b7d8f0] bg-[#eef7fd] p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)]',
          interactive && 'cursor-pointer transition',
          interactive &&
            (selected || active
              ? 'border-freeio shadow-[0_12px_36px_rgba(91,187,123,0.18)]'
              : 'hover:border-freeio/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]'),
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
          aria-label={favorite.saved ? `Remove ${provider.name} from favorites` : `Save ${provider.name} to favorites`}
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
              contentFlush
                ? 'flex items-start gap-4'
                : 'flex items-start gap-4 pl-5 sm:pl-6'
            }
          >
            <Link
              to={href}
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

            <div className="min-w-0 flex-1 pr-7">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#2563eb]">
                <span className="underline">Sponsored</span>
                {' · '}
                {ad.label}
              </p>
              {provider.company ? (
                <p className="mt-1 text-sm font-bold leading-snug text-freeio-ink underline">
                  {provider.company}
                </p>
              ) : null}
              {provider.licenseNo ? (
                <p className="mt-0.5 text-sm text-freeio-muted">
                  License no: {provider.licenseNo}
                </p>
              ) : null}
              <Link
                to={href}
                onClick={(event) => event.stopPropagation()}
                className="block text-sm font-bold leading-snug text-freeio-ink transition hover:text-freeio"
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
                <span className="font-semibold text-freeio-ink">
                  {formatRating(provider.rating)}
                </span>
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
              to={href}
              onClick={(event) => event.stopPropagation()}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#2563eb] px-4 text-sm font-semibold text-[#2563eb] transition hover:bg-[#eff6ff]"
            >
              View Profile
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
        <FavoriteActionDialogs favorite={favorite} />
      </article>
    )
  },
)
