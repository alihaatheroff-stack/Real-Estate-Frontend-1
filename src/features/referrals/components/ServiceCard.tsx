import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { providerPath, servicePath } from '@/app/router/paths'
import type { Service } from '@/entities/provider/types'
import { getProviderForService } from '@/features/referrals/data/marketplace'
import { cn } from '@/shared/lib/cn'

type ServiceCardProps = {
  service: Service
  variant?: 'default' | 'marketplace'
}

export function ServiceCard({ service, variant = 'default' }: ServiceCardProps) {
  const provider = getProviderForService(service)
  const [saved, setSaved] = useState(false)

  if (variant === 'marketplace') {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#eee] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]">
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
            onClick={(event) => {
              event.preventDefault()
              setSaved((value) => !value)
            }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#6b7280] shadow-sm transition hover:text-[#5BBB7B]"
          >
            <Heart className={cn('h-4 w-4', saved && 'fill-[#5BBB7B] text-[#5BBB7B]')} />
          </button>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <p className="text-sm text-[#9ca3af]">{service.category}</p>
          <Link to={servicePath(service.id)}>
            <h3 className="mt-1.5 line-clamp-2 text-[15px] font-semibold leading-snug text-[#222] transition hover:text-[#5BBB7B]">
              {service.title}
            </h3>
          </Link>
          <div className="mt-2 inline-flex items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-[#f5b100] text-[#f5b100]" />
            <span className="font-medium text-[#222]">{formatRating(service.rating)}</span>
            <span className="text-[#9ca3af]">
              ({service.reviewCount} {service.reviewCount === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>

          <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#eee] pt-3.5 mt-4">
            {provider ? (
              <Link
                to={providerPath(provider.id)}
                className="flex min-w-0 items-center gap-2 transition hover:text-[#5BBB7B]"
              >
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="truncate text-sm font-medium text-[#222] hover:text-[#5BBB7B]">
                  {provider.name}
                </span>
              </Link>
            ) : (
              <div className="flex min-w-0 items-center gap-2" />
            )}
            <div className="shrink-0 text-right">
              <p className="text-xs text-[#9ca3af]">Starting at:</p>
              <p className="text-sm font-bold text-[#222]">
                {formatCurrency(service.startingPrice)}
              </p>
            </div>
          </div>
        </div>
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
