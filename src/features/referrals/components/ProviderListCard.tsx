import { forwardRef, type KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, CircleDollarSign, MapPin, Star } from 'lucide-react'
import { formatRating } from '@/shared/lib/format'
import { providerPath } from '@/app/router/paths'
import type { Provider } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

const FREEIO_GREEN = '#5BBB7B'
const FREEIO_TAG = '#E8F5FC'

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

    const skills = provider.skills ?? []

    function handleKeyDown(event: KeyboardEvent<HTMLElement>) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        onSelect(provider.id)
      }
    }

    return (
      <article
        ref={ref}
        tabIndex={0}
        onMouseEnter={() => onHover(provider.id)}
        onMouseLeave={() => onHover(null)}
        onClick={() => onSelect(provider.id)}
        onKeyDown={handleKeyDown}
        className={cn(
          'cursor-pointer rounded-2xl border bg-white p-5 transition',
          selected || active
            ? 'border-[#5BBB7B] shadow-[0_12px_36px_rgba(91,187,123,0.18)]'
            : 'border-[#eee] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-[#5BBB7B]/40 hover:shadow-[0_12px_36px_rgba(0,0,0,0.08)]',
        )}
      >
        <div className="flex items-start gap-4">
          <Link
            to={providerPath(provider.id)}
            onClick={(event) => event.stopPropagation()}
            className="shrink-0"
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="h-16 w-16 rounded-full object-cover sm:h-[4.5rem] sm:w-[4.5rem]"
              loading="lazy"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <Link
                  to={providerPath(provider.id)}
                  onClick={(event) => event.stopPropagation()}
                  className="block truncate text-lg font-bold text-[#222] transition hover:text-[#5BBB7B]"
                >
                  {provider.name}
                </Link>
                <p className="mt-0.5 truncate text-sm text-[#6b7280]">{provider.title}</p>
              </div>

              <Link
                to={providerPath(provider.id)}
                onClick={(event) => event.stopPropagation()}
                className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg border px-4 text-sm font-semibold transition hover:bg-[#E7F6ED]"
                style={{ borderColor: FREEIO_GREEN, color: FREEIO_GREEN }}
              >
                View Profile
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#6b7280]">
              <span className="inline-flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 fill-[#f5b100] text-[#f5b100]" />
                <span className="font-semibold text-[#222]">{formatRating(provider.rating)}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#9ca3af]" />
                {provider.city}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CircleDollarSign className="h-3.5 w-3.5 text-[#9ca3af]" />
                {rateLabel}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-[#6b7280]">
          {provider.about}
        </p>

        {skills.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-[#3b4a5a]"
                style={{ backgroundColor: FREEIO_TAG }}
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    )
  },
)
