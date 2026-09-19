import { useMemo, useState } from 'react'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { NetworkListingCard } from '@/features/network/components/marketplace/NetworkListingCard'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NETWORK_LISTINGS } from '@/features/network/data/community'

const CATEGORIES = ['All', 'Retail', 'Multifamily', 'Note / finish-out', 'Services', 'Trades', 'Creative'] as const

export function NetworkMarketplacePage() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('All')
  const listings = useMemo(
    () => NETWORK_LISTINGS.filter((item) => category === 'All' || item.category === category),
    [category],
  )

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <NetworkCard>
          <h1 className="font-display text-3xl font-semibold">Marketplace</h1>
          <p className="mt-1 text-sm text-muted">
            Off-market inventory, services, and trade capacity — listed by people you can actually message.
          </p>
          <div className="mt-4 flex gap-2 overflow-x-auto network-hide-scroll">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${
                  category === item ? 'bg-brand text-white' : 'bg-mist text-ink hover:bg-line'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </NetworkCard>
        <div className="grid gap-3 sm:grid-cols-2">
          {listings.map((listing) => (
            <NetworkListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </NetworkPageFrame>
  )
}
