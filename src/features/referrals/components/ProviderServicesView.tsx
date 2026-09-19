import { useState } from 'react'
import { Section } from '@/components/layout/Section'
import { ServiceCard } from '@/features/referrals/components/ServiceCard'
import {
  MarketplaceBreadcrumbs,
  MarketplaceEmptyState,
  MarketplaceListHeading,
  MarketplaceListSortMenu,
  MarketplacePeachBanner,
  MarketplaceResultsToolbar,
  MarketplaceShowingCount,
} from '@/features/referrals/components/marketplaceShell'
import { useProviderServices } from '@/features/referrals/hooks/useProviderServices'
import {
  LIST_SORT_OPTIONS,
  type ListSortKey,
} from '@/features/referrals/model/sort'
import type { Provider } from '@/entities/provider/types'
import { PATHS, providerPath } from '@/app/router/paths'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'

type ProviderServicesViewProps = {
  provider: Provider
}

export function ProviderServicesView({ provider }: ProviderServicesViewProps) {
  const [sort, setSort] = useState<ListSortKey>('default')
  const [sortOpen, setSortOpen] = useState(false)
  const services = useProviderServices({ provider, sort })

  const categoryLabel = provider.specialty || provider.title

  return (
    <div className="bg-white pb-16">
      <MarketplacePeachBanner>
        <MarketplaceBreadcrumbs
          crumbs={[
            { label: 'Home', to: PATHS.home },
            { label: provider.name, to: providerPath(provider.id) },
            { label: 'Services' },
          ]}
        />
        <MarketplaceListHeading
          title={categoryLabel}
          description={provider.about}
          showHowItWorks
        />
      </MarketplacePeachBanner>

      <Section className="py-6 sm:py-8" containerClassName={MARKETPLACE_PAGE_PAD}>
        <MarketplaceResultsToolbar
          countLabel={<MarketplaceShowingCount count={services.length} />}
          onFilterClick={() => {}}
          sortSlot={
            <MarketplaceListSortMenu
              value={sort}
              options={LIST_SORT_OPTIONS}
              open={sortOpen}
              onOpenChange={setSortOpen}
              onChange={setSort}
            />
          }
        />

        {services.length === 0 ? (
          <MarketplaceEmptyState>No services listed yet.</MarketplaceEmptyState>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} variant="marketplace" />
            ))}
          </div>
        )}
      </Section>
    </div>
  )
}
