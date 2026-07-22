import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, BadgeCheck, Heart, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { providerPath } from '@/app/router/paths'
import type { Provider } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

const FREEIO_TAG = '#FFEDE8'
const FREEIO_BTN = '#E7F6ED'
const FREEIO_GREEN = '#5BBB7B'
const VISIBLE_SKILLS = 2

type ProviderCardProps = {
  provider: Provider
  variant?: 'default' | 'marketplace'
}

export function ProviderCard({ provider, variant = 'default' }: ProviderCardProps) {
  const [saved, setSaved] = useState(false)

  if (variant === 'marketplace') {
    const skills = provider.skills ?? []
    const visibleSkills = skills.slice(0, VISIBLE_SKILLS)
    const extraSkills = Math.max(0, skills.length - VISIBLE_SKILLS)
    const rateLabel =
      provider.hourlyRateMin != null && provider.hourlyRateMax != null
        ? `$${provider.hourlyRateMin} - $${provider.hourlyRateMax} / hr`
        : '—'

    return (
      <article className="relative flex h-full flex-col rounded-2xl border border-[#eee] bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
        <button
          type="button"
          aria-label={saved ? 'Remove from saved' : 'Save freelancer'}
          onClick={() => setSaved((value) => !value)}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#eee] bg-white text-[#6b7280] transition hover:text-[#5BBB7B]"
        >
          <Heart className={cn('h-4 w-4', saved && 'fill-[#5BBB7B] text-[#5BBB7B]')} />
        </button>

        <div className="flex flex-1 flex-col items-center text-center">
          <Link to={providerPath(provider.id)} className="relative mt-1 shrink-0">
            <img
              src={provider.image}
              alt={provider.name}
              className="h-[5.5rem] w-[5.5rem] rounded-full object-cover"
              loading="lazy"
            />
            {provider.verified ? (
              <span
                className="absolute -right-0.5 bottom-1 flex h-6 w-6 items-center justify-center rounded-full text-white shadow"
                style={{ backgroundColor: FREEIO_GREEN }}
              >
                <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
            ) : null}
          </Link>

          <Link to={providerPath(provider.id)} className="mt-4 block w-full">
            <h3 className="truncate text-lg font-bold text-[#222] transition hover:text-[#5BBB7B]">
              {provider.name}
            </h3>
          </Link>
          <p className="mt-1 truncate text-sm text-[#6b7280]">{provider.title}</p>

          <div className="mt-2.5 inline-flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-[#f5b100] text-[#f5b100]" />
            <span className="font-medium text-[#222]">{formatRating(provider.rating)}</span>
            <span className="text-[#9ca3af]">
              ({provider.reviewCount} {provider.reviewCount === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>

          {visibleSkills.length ? (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {visibleSkills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-md px-3 py-1.5 text-xs font-medium text-[#222]"
                  style={{ backgroundColor: FREEIO_TAG }}
                >
                  {skill}
                </span>
              ))}
              {extraSkills > 0 ? (
                <span
                  className="rounded-md px-3 py-1.5 text-xs font-medium text-[#222]"
                  style={{ backgroundColor: FREEIO_TAG }}
                >
                  +{extraSkills}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-5 border-t border-[#eee] pt-4">
          <div className="grid grid-cols-2 gap-3 text-left">
            <div>
              <p className="text-sm font-semibold text-[#222]">Location:</p>
              <p className="mt-1 text-sm text-[#6b7280]">{provider.city}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#222]">Rate:</p>
              <p className="mt-1 text-sm text-[#6b7280]">{rateLabel}</p>
            </div>
          </div>

          <Link
            to={providerPath(provider.id)}
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-lg text-sm font-semibold transition hover:brightness-95"
            style={{ backgroundColor: FREEIO_BTN, color: FREEIO_GREEN }}
          >
            View Profile
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    )
  }

  return (
    <Link
      to={providerPath(provider.id)}
      className="flex h-full flex-col rounded-2xl border border-line bg-paper p-4 transition hover:border-brand/40 hover:shadow-soft"
    >
      <div className="flex items-start gap-3">
        <img
          src={provider.image}
          alt={provider.name}
          className="h-14 w-14 rounded-xl object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="truncate font-semibold text-ink">{provider.name}</h3>
            {provider.verified ? (
              <BadgeCheck className="h-4 w-4 shrink-0 text-brand" />
            ) : null}
          </div>
          <p className="truncate text-sm text-muted">{provider.title}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
            <MapPin className="h-3.5 w-3.5" />
            {provider.city}, {provider.state} · {provider.radiusMiles} mi
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-1.5">
        <Badge>{provider.type === 'trade' ? 'Trade' : 'Professional'}</Badge>
        {provider.learningIncluded ? <Badge tone="accent">Learning</Badge> : null}
        <Badge tone="muted">{provider.referralShare}% referral</Badge>
      </div>
      <div className="mt-4 flex items-center justify-between text-sm">
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
