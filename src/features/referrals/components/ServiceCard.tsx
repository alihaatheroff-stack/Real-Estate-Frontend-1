import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Play, Star, Video } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { providerPath, servicePath } from '@/app/router/paths'
import type { Service } from '@/entities/provider/types'
import { AuthRequiredDialog } from '@/features/auth'
import { SaveToFolderDialog } from '@/features/favorites/SaveToFolderDialog'
import {
  referralServiceFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import { getProviderForService } from '@/features/referrals/api/repository'
import { cn } from '@/shared/lib/cn'

type ServiceCardProps = {
  service: Service
  variant?: 'default' | 'marketplace' | 'gig'
  /** Start with the heart filled (e.g. Favorites / Saved lists). */
  initiallySaved?: boolean
}

function formatReviewCount(count: number) {
  if (count >= 1000) return `${Math.floor(count / 100) / 10}k+`.replace('.0k+', 'k+')
  return String(count)
}

function providerLevelLabel(rating: number, verified: boolean) {
  if (verified || rating >= 4.8) return 'Top Rated' as const
  return 'Level 1' as const
}

export function ServiceCard({
  service,
  variant = 'default',
  initiallySaved = false,
}: ServiceCardProps) {
  const provider = getProviderForService(service)
  const draft = useMemo(
    () => referralServiceFavoriteDraft(service, provider),
    [provider, service],
  )
  const favorite = useFavoriteToggle(draft)
  const saved = favorite.saved || initiallySaved

  function onToggleSave(event: { preventDefault: () => void; stopPropagation?: () => void }) {
    event.preventDefault()
    event.stopPropagation?.()
    favorite.toggleSave()
  }

  if (variant === 'gig') {
    const level = provider
      ? providerLevelLabel(provider.rating, provider.verified)
      : 'Level 1'
    const offersVideo = service.featured || service.badges.some((badge) => /video|consult/i.test(badge))
    const showPlay = Boolean(service.gallery?.length) || service.featured

    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-xl bg-white">
        <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-freeio-photo">
          <Link to={servicePath(service.id)} className="block h-full w-full">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              loading="lazy"
            />
          </Link>
          <button
            type="button"
            aria-label={saved ? 'Remove from saved' : 'Save service'}
            aria-pressed={saved}
            onClick={onToggleSave}
            className="absolute right-2 top-2 z-10 inline-flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.65)] transition hover:scale-110 hover:text-rose-500"
          >
            <Heart
              className={cn('h-4 w-4', saved && 'fill-rose-500 text-rose-500')}
              strokeWidth={2.2}
            />
          </button>
          {showPlay ? (
            <span className="pointer-events-none absolute bottom-2.5 left-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/55 text-white">
              <Play className="h-3.5 w-3.5 fill-white" />
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col pt-3">
          <div className="flex items-center gap-2">
            {provider ? (
              <Link
                to={providerPath(provider.id)}
                className="flex min-w-0 flex-1 items-center gap-2"
              >
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="truncate text-sm font-semibold text-freeio-ink">
                  {provider.name}
                </span>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {level === 'Top Rated' ? (
              <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-freeio-promo px-1.5 py-0.5 text-[0.65rem] font-bold text-freeio-promo-ink">
                <span aria-hidden>◆◆◆</span>
                Top Rated
              </span>
            ) : (
              <span className="inline-flex shrink-0 items-center gap-1 text-[0.7rem] font-semibold text-freeio-muted">
                <span aria-hidden className="text-freeio-faint">
                  ◆◆
                </span>
                Level 1
              </span>
            )}
          </div>

          <Link to={servicePath(service.id)} className="mt-2">
            <h3 className="line-clamp-2 text-[0.95rem] font-semibold leading-snug text-freeio-ink transition group-hover:underline">
              {service.title}
            </h3>
          </Link>

          <div className="mt-2 inline-flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-freeio-ink text-freeio-ink" />
            <span className="font-bold text-freeio-ink">{formatRating(service.rating)}</span>
            <span className="text-freeio-meta">({formatReviewCount(service.reviewCount)})</span>
          </div>

          <p className="mt-3 text-sm text-freeio-ink">
            From{' '}
            <span className="text-base font-bold">{formatCurrency(service.startingPrice)}</span>
          </p>

          {offersVideo ? (
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-freeio-meta">
              <Video className="h-3.5 w-3.5" />
              Offers video consultation
            </p>
          ) : null}
        </div>
        <SaveToFolderDialog
          open={favorite.saveOpen}
          draft={favorite.draft}
          onClose={favorite.closeSave}
        />
        <AuthRequiredDialog
          open={favorite.authOpen}
          onClose={favorite.closeAuth}
          action="save favorites"
        />
      </article>
    )
  }

  if (variant === 'marketplace') {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-freeio-border-soft bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Link to={servicePath(service.id)} className="block h-full w-full">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </Link>
          <button
            type="button"
            aria-label={saved ? 'Remove from saved' : 'Save service'}
            aria-pressed={saved}
            onClick={onToggleSave}
            className="absolute right-2 top-2 z-10 inline-flex items-center justify-center text-white drop-shadow-[0_1px_3px_rgb(0_0_0_/_0.65)] transition hover:scale-110 hover:text-rose-500"
          >
            <Heart
              className={cn('h-4 w-4', saved && 'fill-rose-500 text-rose-500')}
              strokeWidth={2.2}
            />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-sm text-freeio-subtle">{service.category}</p>
          <Link to={servicePath(service.id)}>
            <h3 className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug text-freeio-ink transition hover:text-freeio">
              {service.title}
            </h3>
          </Link>
          <div className="mt-2 inline-flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-freeio-star text-freeio-star" />
            <span className="font-medium text-freeio-ink">{formatRating(service.rating)}</span>
            <span className="text-freeio-subtle">
              ({service.reviewCount} {service.reviewCount === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-freeio-border-soft pt-3.5 mt-4">
            {provider ? (
              <Link
                to={providerPath(provider.id)}
                className="flex min-w-0 items-center gap-2 transition hover:text-freeio"
              >
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="truncate text-sm font-medium text-freeio-ink hover:text-freeio">
                  {provider.name}
                </span>
              </Link>
            ) : (
              <div className="flex min-w-0 items-center gap-2" />
            )}
            <div className="shrink-0 text-right">
              <p className="text-xs text-freeio-subtle">Starting at:</p>
              <p className="text-sm font-bold text-freeio-ink">
                {formatCurrency(service.startingPrice)}
              </p>
            </div>
          </div>
        </div>
        <SaveToFolderDialog
          open={favorite.saveOpen}
          draft={favorite.draft}
          onClose={favorite.closeSave}
        />
        <AuthRequiredDialog
          open={favorite.authOpen}
          onClose={favorite.closeAuth}
          action="save favorites"
        />
      </article>
    )
  }

  return (
    <Link
      to={servicePath(service.id)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {service.badges.slice(0, 2).map((badge) => (
            <Badge key={badge} tone="ink">
              {badge}
            </Badge>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2">
          {provider ? (
            <img
              src={provider.image}
              alt={provider.name}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : null}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{provider?.name}</p>
            <p className="truncate text-xs text-muted">{service.category}</p>
          </div>
        </div>
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-ink group-hover:text-brand">
          {service.title}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="inline-flex items-center gap-1 text-sm font-medium text-ink">
            <Star className="h-4 w-4 fill-accent text-accent" />
            {formatRating(service.rating)}
            <span className="text-muted">({service.reviewCount})</span>
          </span>
          <span className="text-sm text-muted">
            From <strong className="text-ink">{formatCurrency(service.startingPrice)}</strong>
          </span>
        </div>
      </div>
    </Link>
  )
}
