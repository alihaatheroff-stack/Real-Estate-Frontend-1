import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, BadgeCheck, Heart, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { providerPath } from '@/app/router/paths'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  referralProviderFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import type { Provider } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'
const VISIBLE_SKILLS = 3

type ProviderCardProps = {
  provider: Provider
  variant?: 'default' | 'marketplace'
  className?: string
  /** Override marketplace rate text (e.g. crowdfunding non-disclosed). */
  rateDisplay?: string
}

export function ProviderCard({
  provider,
  variant = 'default',
  className,
  rateDisplay,
}: ProviderCardProps) {
  const draft = useMemo(() => referralProviderFavoriteDraft(provider), [provider])
  const favorite = useFavoriteToggle(draft)

  if (variant === 'marketplace') {
    const skills = provider.skills ?? []
    const visibleSkills = skills.slice(0, VISIBLE_SKILLS)
    const extraSkills = Math.max(0, skills.length - VISIBLE_SKILLS)
    const rateLabel =
      rateDisplay ??
      (provider.hourlyRateMin != null && provider.hourlyRateMax != null
        ? `$${provider.hourlyRateMin} – $${provider.hourlyRateMax}/hr`
        : '—')

    return (
      <article
        className={cn(
          'relative flex h-full flex-col rounded-2xl border border-freeio-border-soft bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition hover:shadow-[0_10px_32px_rgba(0,0,0,0.07)]',
          className,
        )}
      >
        <button
          type="button"
          aria-label={favorite.saved ? 'Remove from saved' : 'Save provider'}
          aria-pressed={favorite.saved}
          onClick={favorite.toggleSave}
          className="absolute right-4 top-4 z-10 inline-flex items-center justify-center text-muted transition hover:scale-110 hover:text-rose-500"
        >
          <Heart
            className={cn('h-4 w-4', favorite.saved && 'fill-rose-500 text-rose-500')}
            strokeWidth={2.2}
          />
        </button>

        <div className="flex flex-1 flex-col items-center text-center">
          <Link to={providerPath(provider.id)} className="relative mt-1 shrink-0">
            <img
              src={provider.image}
              alt={provider.name}
              className="h-[5.75rem] w-[5.75rem] rounded-full object-cover ring-1 ring-freeio-ring"
              loading="lazy"
            />
            {provider.verified ? (
              <span
                className="absolute -right-0.5 bottom-1 flex h-6 w-6 items-center justify-center rounded-full text-white shadow bg-freeio"
              >
                <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            ) : null}
          </Link>

          <Link to={providerPath(provider.id)} className="mt-4 block w-full min-w-0">
            <h3 className="truncate text-lg font-bold text-freeio-ink transition hover:opacity-70">
              {provider.name}
            </h3>
          </Link>
          <p className="mt-1 truncate text-sm text-freeio-subtle">{provider.title}</p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 text-sm">
            <Star className="h-3.5 w-3.5 fill-freeio-star text-freeio-star" />
            <span className="font-semibold text-freeio-ink">{formatRating(provider.rating)}</span>
            <span className="text-freeio-subtle">
              ({provider.reviewCount} {provider.reviewCount === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>

          {visibleSkills.length ? (
            <div className="mt-4 flex h-[4.75rem] w-full flex-wrap content-start items-start justify-center gap-1.5 overflow-hidden">
              {visibleSkills.map((skill) => (
                <span
                  key={skill}
                  title={skill}
                  className="max-w-[calc(100%-0.25rem)] truncate rounded-full bg-freeio-tag px-3 py-1.5 text-xs font-medium text-freeio-ink"
                >
                  {skill}
                </span>
              ))}
              {extraSkills > 0 ? (
                <span className="shrink-0 rounded-full bg-freeio-tag px-3 py-1.5 text-xs font-medium text-freeio-ink">
                  +{extraSkills}
                </span>
              ) : null}
            </div>
          ) : (
            <div className="mt-4 h-[4.75rem]" aria-hidden />
          )}
        </div>

        <div className="mt-auto border-t border-freeio-border-soft pt-4">
          <div className="space-y-3 text-center">
            <div className="min-w-0">
              <p className="text-sm font-bold text-freeio-ink">Location:</p>
              <p className="mt-1 text-sm text-freeio-muted">{provider.city}</p>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-freeio-ink">Rate:</p>
              <p className="mt-1 text-sm text-freeio-muted">{rateLabel}</p>
            </div>
          </div>

          <Link
            to={providerPath(provider.id)}
            className="mt-5 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full border border-freeio-ink bg-transparent text-sm font-semibold text-freeio-ink transition hover:bg-freeio-ink hover:text-white"
          >
            View Profile
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <FavoriteActionDialogs favorite={favorite} />
      </article>
    )
  }

  return (
    <Link
      to={providerPath(provider.id)}
      className={cn(
        'flex h-full min-h-[13.5rem] flex-col rounded-2xl border border-line bg-paper p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-soft sm:p-6',
        className,
      )}
    >
      <div className="flex items-start gap-3.5">
        <img
          src={provider.image}
          alt={provider.name}
          className="h-16 w-16 rounded-xl object-cover sm:h-[4.5rem] sm:w-[4.5rem]"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate text-base font-semibold text-ink sm:text-lg">
              {provider.name}
            </h3>
            {provider.verified ? (
              <BadgeCheck className="h-4 w-4 shrink-0 text-brand" />
            ) : null}
          </div>
          <p className="truncate text-sm text-muted sm:text-[0.95rem]">{provider.title}</p>
          <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted sm:text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {provider.city}, {provider.state} · {provider.radiusMiles} mi
          </p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-1.5">
        <Badge>{provider.type === 'trade' ? 'Trade' : 'Professional'}</Badge>
        {provider.learningIncluded ? <Badge tone="accent">Learning</Badge> : null}
        <Badge tone="muted">{provider.referralShare}% referral</Badge>
      </div>
      <div className="mt-auto flex items-center justify-between pt-5 text-sm">
        <span className="inline-flex items-center gap-1 font-medium">
          <Star className="h-4 w-4 fill-accent text-accent" />
          {formatRating(provider.rating)}
          <span className="text-muted">({provider.reviewCount})</span>
        </span>
        <span className="text-muted">
          {provider.dealsClosed} deals
          {provider.salesVolume > 0
            ? ` · ${formatCurrency(provider.salesVolume)}`
            : ''}
        </span>
      </div>
    </Link>
  )
}
