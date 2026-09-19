import { SectionHeading } from '@/components/layout/SectionHeading'
import { ServiceCard } from '@/features/referrals'
import type { Service } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

type ServiceGigsStripProps = {
  title: string
  description?: string
  services: Service[]
  className?: string
}

export function ServiceGigsStrip({
  title,
  description,
  services,
  className,
}: ServiceGigsStripProps) {
  if (services.length === 0) return null

  return (
    <div className={cn(title ? 'mt-2' : undefined, className)}>
      {title ? (
        <SectionHeading
          title={title}
          description={description}
          size="subsection"
          className="w-full items-start [&>div]:max-w-none"
        />
      ) : null}
      <div
        className={cn(
          services.length > 4
            ? 'flex gap-4 overflow-x-auto pb-1 lg:gap-5'
            : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6',
        )}
      >
        {services.map((service) => (
          <div
            key={service.id}
            className={cn(
              services.length > 4 &&
                'w-[min(72vw,16rem)] shrink-0 sm:w-[14.5rem] lg:w-auto lg:min-w-0 lg:flex-1',
            )}
          >
            <ServiceCard service={service} variant="gig" initiallySaved />
          </div>
        ))}
      </div>
    </div>
  )
}
