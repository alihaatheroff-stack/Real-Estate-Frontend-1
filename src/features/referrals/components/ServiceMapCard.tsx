import { forwardRef, useState, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star } from 'lucide-react'
import { formatCurrency, formatRating } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'
import type { Service } from '@/entities/provider/types'
import { getProviderForService } from '@/features/referrals/data/marketplace'
import { providerPath } from '@/app/router/paths'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1000&q=80'

type ServiceMapCardProps = {
  service: Service
  active?: boolean
  selected?: boolean
  onSelect: (id: string) => void
  onHover: (id: string | null) => void
}

export const ServiceMapCard = forwardRef<HTMLElement, ServiceMapCardProps>(function ServiceMapCard(
  { service, active, selected, onSelect, onHover },
  ref,
) {
  const provider = getProviderForService(service)
  const [saved, setSaved] = useState(false)
  const [imageSrc, setImageSrc] = useState(service.image)
  const featured = service.featured ?? false

  function openService(event?: { stopPropagation?: () => void }) {
    event?.stopPropagation?.()
    onSelect(service.id)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      openService()
    }
  }

  return (
    <article
      ref={ref}
      role="link"
      tabIndex={0}
      onClick={() => openService()}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => onHover(service.id)}
      onMouseLeave={() => onHover(null)}
      className={cn(
        'group flex h-full cursor-pointer flex-col overflow-hidden rounded-[18px] border bg-paper text-left shadow-[0_6px_18px_rgb(15_31_26/0.06)] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
        selected
          ? 'border-brand shadow-soft ring-2 ring-brand/20'
          : active
            ? 'border-accent shadow-soft ring-2 ring-accent/25'
            : 'border-line/80 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-[0_10px_28px_rgb(15_31_26/0.1)]',
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={imageSrc}
          alt={service.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
          onError={() => setImageSrc(FALLBACK_IMAGE)}
        />

        {featured ? (
          <span className="absolute -left-8 top-4 w-28 -rotate-45 bg-brand py-1 text-center text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            Featured
          </span>
        ) : null}

        <span
          role="button"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation()
            setSaved((value) => !value)
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              event.stopPropagation()
              setSaved((value) => !value)
            }
          }}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-muted shadow-sm transition hover:text-brand"
          aria-label={saved ? 'Remove from saved' : 'Save service'}
        >
          <Heart className={cn('h-4 w-4', saved && 'fill-brand text-brand')} />
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-[11px] font-medium uppercase tracking-wide text-muted">
          {service.category}
        </p>
        <h3 className="line-clamp-2 min-h-[2.75rem] text-[15px] font-bold leading-snug text-ink group-hover:text-brand">
          {service.title}
        </h3>

        <div className="inline-flex items-center gap-1 text-sm text-ink">
          <Star className="h-4 w-4 fill-accent text-accent" />
          <span className="font-semibold">{formatRating(service.rating)}</span>
          <span className="text-muted">({service.reviewCount} Reviews)</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-line/70 pt-3">
          <div className="flex min-w-0 items-center gap-2">
            {provider ? (
              <>
                <img
                  src={provider.image}
                  alt={provider.name}
                  className="h-8 w-8 shrink-0 rounded-full object-cover"
                />
                <Link
                  to={providerPath(provider.id)}
                  onClick={(event) => event.stopPropagation()}
                  className="truncate text-sm font-medium text-ink hover:text-brand hover:underline"
                >
                  {provider.name}
                </Link>
              </>
            ) : null}
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[11px] text-muted">Starting at:</p>
            <p className="text-base font-bold text-ink">{formatCurrency(service.startingPrice)}</p>
          </div>
        </div>
      </div>
    </article>
  )
})
