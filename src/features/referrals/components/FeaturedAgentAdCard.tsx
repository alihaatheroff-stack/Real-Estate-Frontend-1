import { forwardRef, useMemo, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Volume2 } from 'lucide-react'
import { providerPath } from '@/app/router/paths'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  referralProviderFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import type { ProfileResultAd } from '@/features/referrals/data/profileResultAds'
import type { Provider } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

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

/** Shared footprint so ad + organic cards align in the results grid. */
export const PROFILE_RESULT_CARD_FRAME =
  'flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white'

export const FeaturedAgentAdCard = forwardRef<HTMLElement, FeaturedAgentAdCardProps>(
  function FeaturedAgentAdCard(
    {
      ad,
      provider,
      active,
      selected,
      onSelect,
      onHover,
    },
    ref,
  ) {
    const href = providerPath(provider.id)
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
          role={interactive ? 'button' : undefined}
          tabIndex={interactive ? 0 : undefined}
          aria-pressed={interactive ? selected : undefined}
          aria-label={
            interactive ? `Sponsored listing: show ${provider.name} on the map` : undefined
          }
          onMouseEnter={onHover ? () => onHover(provider.id) : undefined}
          onMouseLeave={onHover ? () => onHover(null) : undefined}
          onClick={onSelect ? () => onSelect(provider.id) : undefined}
          onKeyDown={interactive ? handleKeyDown : undefined}
          className={cn(
            PROFILE_RESULT_CARD_FRAME,
            interactive && 'cursor-pointer',
            selected || active
              ? 'border-sky-500 shadow-soft ring-2 ring-sky-500/25'
              : 'border-line shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-sky-500 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]',
          )}
        >
          <div className="relative aspect-[4/3] shrink-0 overflow-hidden bg-mist">
            <img
              src={ad.coverImage}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
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
                  ? `Remove ${provider.name} from favorites`
                  : `Save ${provider.name} to favorites`
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
              <Link
                to={href}
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
            </div>

            <p className="min-w-0 truncate font-bold text-[#0b1f3a]">{ad.companyName}</p>
            <Link
              to={href}
              onClick={(event) => event.stopPropagation()}
              className="min-w-0 truncate font-bold text-[#0b1f3a] hover:underline"
            >
              {provider.name}
            </Link>

            <p className="min-w-0 truncate text-[10px] text-muted sm:text-[11px]">
              {ad.companyTagline ?? '\u00A0'}
            </p>
            <p className="min-w-0 truncate text-[10px] text-muted sm:text-[11px]">
              {provider.title ?? '\u00A0'}
            </p>

            <p className="min-w-0 truncate text-muted">License #: {ad.companyLicenseNo}</p>
            <p className="min-w-0 truncate text-muted">
              {provider.licenseNo ? `License # ${provider.licenseNo}` : '\u00A0'}
            </p>

            <p className="min-w-0 truncate text-muted">Phone: {ad.companyPhone}</p>
            <p className="min-w-0 truncate text-muted">
              {provider.phone ? `Phone: ${provider.phone}` : '\u00A0'}
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
