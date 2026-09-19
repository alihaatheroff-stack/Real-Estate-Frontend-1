import { SectionHeading } from '@/components/layout/SectionHeading'
import { ProviderCard } from '@/features/referrals'
import type { Provider } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

type ProviderProfilesStripProps = {
  title: string
  description?: string
  providers: Provider[]
  className?: string
}

export function ProviderProfilesStrip({
  title,
  description,
  providers,
  className,
}: ProviderProfilesStripProps) {
  if (providers.length === 0) return null

  return (
    <div className={cn('mt-2', className)}>
      <SectionHeading
        title={title}
        description={description}
        size="subsection"
        className="w-full items-start [&>div]:max-w-none"
      />
      <div
        className={cn(
          providers.length > 4
            ? 'flex gap-4 overflow-x-auto pb-1 lg:gap-5'
            : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6',
        )}
      >
        {providers.map((provider) => (
          <div
            key={provider.id}
            className={cn(
              providers.length > 4 &&
                'w-[min(72vw,16rem)] shrink-0 sm:w-[14.5rem] lg:w-auto lg:min-w-0 lg:flex-1',
            )}
          >
            <ProviderCard provider={provider} variant="marketplace" />
          </div>
        ))}
      </div>
    </div>
  )
}
