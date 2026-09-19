import { ArrowLeft, BadgeCheck, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { PackageSelector } from '@/features/referrals/components/PackageSelector'
import { ReviewsList } from '@/features/referrals/components/ReviewsList'
import {
  getProviderForService,
  getServiceById,
  listReviews,
} from '@/features/referrals/api/repository'
import { formatRating } from '@/shared/lib/format'
import { providerPath } from '@/app/router/paths'

type ServiceDetailPanelProps = {
  serviceId: string
  onBack: () => void
}

export function ServiceDetailPanel({ serviceId, onBack }: ServiceDetailPanelProps) {
  const service = getServiceById(serviceId)

  if (!service) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted">Service not found.</p>
        <button type="button" onClick={onBack} className="mt-2 text-sm text-brand hover:underline">
          Back to list
        </button>
      </div>
    )
  }

  const provider = getProviderForService(service)

  return (
    <div className="animate-slide-in flex h-full flex-col">
      <div className="sticky top-0 z-10 border-b border-line bg-paper/95 px-4 py-3 backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted hover:text-brand"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to services
        </button>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-4">
        <div className="overflow-hidden rounded-xl border border-line">
          <img
            src={service.image}
            alt={service.title}
            className="aspect-[16/10] w-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {service.badges.map((badge) => (
              <Badge key={badge}>{badge}</Badge>
            ))}
          </div>
          <h2 className="font-display text-xl font-bold leading-snug text-ink">{service.title}</h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="inline-flex items-center gap-1 font-medium text-ink">
              <Star className="h-3.5 w-3.5 fill-accent text-accent" />
              {formatRating(service.rating)} ({service.reviewCount})
            </span>
            <span>{service.category}</span>
            <span>{service.field}</span>
          </div>
        </div>

        {provider ? (
          <Link
            to={providerPath(provider.id)}
            className="flex items-center gap-3 rounded-xl border border-line bg-mist/40 p-3 transition hover:border-brand"
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div className="min-w-0">
              <p className="inline-flex items-center gap-1 text-sm font-semibold text-ink">
                {provider.name}
                {provider.verified ? <BadgeCheck className="h-3.5 w-3.5 text-brand" /> : null}
              </p>
              <p className="truncate text-xs text-muted">{provider.title}</p>
              <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-muted">
                <MapPin className="h-3 w-3" />
                {provider.city}, {provider.state}
              </p>
            </div>
          </Link>
        ) : null}

        <div>
          <h3 className="font-display text-base font-bold text-ink">About this service</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{service.description}</p>
        </div>

        <PackageSelector
          basePrice={service.startingPrice}
          addons={service.packages.slice(1).map((pkg) => ({
            id: pkg.id,
            title: `${pkg.name} (+${pkg.deliveryDays} days)`,
            description: pkg.description,
            price: Math.max(pkg.price - service.startingPrice, 0) || pkg.price,
            extraDays: pkg.deliveryDays,
          }))}
          priceSuffix={service.startingPrice < 50 ? '/ sq ft' : undefined}
        />

        <div>
          <h3 className="mb-3 font-display text-base font-bold text-ink">Reviews</h3>
          <ReviewsList
            reviews={listReviews()}
            averageRating={service.rating}
            reviewCount={service.reviewCount}
          />
        </div>
      </div>
    </div>
  )
}
