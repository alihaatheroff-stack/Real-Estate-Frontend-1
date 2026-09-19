import { forwardRef } from 'react'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'
import type { Service } from '@/entities/provider/types'
import { getProviderForService } from '@/features/referrals/api/repository'

type ServiceListItemProps = {
  service: Service
  active?: boolean
  selected?: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

export const ServiceListItem = forwardRef<HTMLButtonElement, ServiceListItemProps>(
  function ServiceListItem({ service, active, selected, onSelect, onHover }, ref) {
    const provider = getProviderForService(service)

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => onSelect(service.id)}
        onMouseEnter={() => onHover(service.id)}
        onMouseLeave={() => onHover(null)}
        className={cn(
          'flex w-full gap-3 rounded-xl border bg-paper p-3 text-left transition',
          selected
            ? 'border-brand bg-brand-light/40 shadow-soft'
            : active
              ? 'border-accent bg-accent-soft/30'
              : 'border-line hover:border-brand/40 hover:shadow-soft',
        )}
      >
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
          <img
            src={service.image}
            alt={service.title}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {service.badges[0] ? (
            <span className="absolute left-1 top-1">
              <Badge tone="ink" className="text-[10px]">
                {service.badges[0]}
              </Badge>
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <p className="text-xs font-medium text-muted">{service.category}</p>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-ink">{service.title}</h3>

          <div className="mt-auto flex items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-1.5">
              {provider ? (
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-5 w-5 shrink-0 rounded-full object-cover"
                />
              ) : null}
              <span className="truncate text-xs text-muted">{provider?.name}</span>
            </div>
            <div className="shrink-0 text-right">
              <span className="inline-flex items-center gap-0.5 text-xs font-medium text-ink">
                <Star className="h-3 w-3 fill-accent text-accent" />
                {formatRating(service.rating)}
              </span>
              <p className="text-xs text-muted">
                From <strong className="text-ink">{formatCurrency(service.startingPrice)}</strong>
              </p>
            </div>
          </div>
        </div>
      </button>
    )
  },
)
