import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ProviderCard } from '@/features/referrals'
import {
  getModuleTopProviders,
  MODULE_TOP_PROVIDERS,
  type LandingModule,
} from '@/features/landing/api/content'
import { cn } from '@/shared/lib/cn'

type TopProvidersSectionProps = {
  module?: LandingModule
  /** Render without outer Section — for nesting under module sections. */
  embedded?: boolean
  /** When false, only the provider cards render (heading is placed elsewhere). */
  showHeading?: boolean
  className?: string
  listHref?: string
  listLabel?: string
}

function TopProvidersHeading({
  module = 'referrals',
  embedded = false,
  className,
}: TopProvidersSectionProps) {
  const config = MODULE_TOP_PROVIDERS[module]

  return (
    <SectionHeading
      eyebrow={embedded ? config.eyebrow : undefined}
      title={config.title}
      description={config.description}
      size={embedded ? 'subsection' : 'section'}
      className={cn(
        'w-full items-start [&>div]:max-w-none',
        embedded ? 'gap-2 sm:items-end' : 'mb-8 gap-3 sm:items-center',
        className,
      )}
    />
  )
}

export function TopProvidersSection({
  module = 'referrals',
  embedded = false,
  showHeading = true,
  className,
  listHref,
  listLabel,
}: TopProvidersSectionProps) {
  const providers = getModuleTopProviders(module)

  const content = (
    <div className={cn(embedded && 'mt-2', className)}>
      {showHeading ? <TopProvidersHeading module={module} embedded={embedded} /> : null}
      <div
        className={cn(
          providers.length > 4
            ? 'grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3'
            : 'grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6',
        )}
      >
        {providers.map((provider) => (
          <div key={provider.id} className="min-w-0">
            <ProviderCard
              provider={provider}
              variant="marketplace"
              rateDisplay={module === 'crowdfunding' ? '% - NonDisclosed' : undefined}
            />
          </div>
        ))}
      </div>

      {listHref && listLabel ? (
        <div className="mt-5 flex justify-end">
          <Link
            to={listHref}
            className="inline-flex items-center gap-1.5 font-display text-sm font-semibold tracking-tight text-brand underline underline-offset-4 transition hover:text-brand-dark"
          >
            {listLabel}
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </Link>
        </div>
      ) : null}
    </div>
  )

  if (embedded) return content

  return (
    <Section className="bg-freeio-wash" containerClassName="max-w-none">
      {content}
    </Section>
  )
}
