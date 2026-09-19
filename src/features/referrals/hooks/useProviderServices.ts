import { useMemo } from 'react'
import type { ListSortKey } from '@/features/referrals/model/sort'
import { getServicesByProvider } from '@/features/referrals/api/repository'
import type { Provider, Service } from '@/entities/provider/types'

type UseProviderServicesOptions = {
  provider: Provider
  sort: ListSortKey
}

export function useProviderServices({
  provider,
  sort,
}: UseProviderServicesOptions): Service[] {
  return useMemo(() => {
    const list = [...getServicesByProvider(provider.id)]
    switch (sort) {
      case 'newest':
        return list.reverse()
      case 'oldest':
        return list
      case 'price-asc':
        return list.sort((a, b) => a.startingPrice - b.startingPrice)
      case 'price-desc':
        return list.sort((a, b) => b.startingPrice - a.startingPrice)
      case 'random':
        return list.sort(() => Math.random() - 0.5)
      default:
        return list
    }
  }, [provider, sort])
}
