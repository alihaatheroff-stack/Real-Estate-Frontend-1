import { useMemo } from 'react'
import { SERVICES } from '@/features/referrals/data/marketplace'
import { getProviderForService } from '@/features/referrals/data/marketplace'
import type { HeroFiltersState } from '@/features/search'

export type ServiceSortKey = 'rating' | 'price-asc' | 'price-desc' | 'reviews'

type UseServiceResultsOptions = {
  q: string
  filters: HeroFiltersState
  sort: ServiceSortKey
}

function getMinDeliveryDays(service: (typeof SERVICES)[number]) {
  return Math.min(...service.packages.map((pkg) => pkg.deliveryDays))
}

export function useServiceResults({ q, filters, sort }: UseServiceResultsOptions) {
  return useMemo(() => {
    let list = [...SERVICES]
    const priceFrom = Number(filters.priceFrom || 0)
    const priceTo = Number(filters.priceTo || Number.MAX_SAFE_INTEGER)
    const maxDeliveryDays = filters.deliveryTime ? Number(filters.deliveryTime) : null

    if (q) {
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q),
      )
    }

    if (filters.field) {
      list = list.filter(
        (s) =>
          s.field.toLowerCase() === filters.field.toLowerCase() ||
          s.field.toLowerCase().includes(filters.field.replace('-', ' ')),
      )
    }

    if (filters.pspCategory) {
      list = list.filter((s) => {
        const cat = s.category.toLowerCase()
        const sub = s.subcategory.toLowerCase()
        const key = filters.pspCategory.toLowerCase()
        if (key === 'trade') return s.badges.includes('Trade') || sub === 'trade'
        return cat.includes(key) || key.includes(cat.split(' ')[0]?.toLowerCase() ?? '')
      })
    }

    list = list.filter(
      (s) => s.startingPrice >= priceFrom && s.startingPrice <= priceTo,
    )

    if (maxDeliveryDays) {
      list = list.filter((s) => getMinDeliveryDays(s) <= maxDeliveryDays)
    }

    if (filters.radius && filters.zip) {
      const radius = Number(filters.radius)
      if (!Number.isNaN(radius) && radius > 0) {
        list = list.filter((s) => {
          const provider = getProviderForService(s)
          return provider ? provider.radiusMiles <= radius : true
        })
      }
    }

    if (filters.region) {
      list = list.filter((s) => {
        const provider = getProviderForService(s)
        if (!provider) return false
        const city = provider.city.toLowerCase()
        const region = filters.region.toLowerCase()
        if (region === 'central-valley') {
          return ['fresno', 'clovis', 'madera', 'visalia'].includes(city)
        }
        return city.includes(region)
      })
    }

    list.sort((a, b) => {
      if (sort === 'price-asc') return a.startingPrice - b.startingPrice
      if (sort === 'price-desc') return b.startingPrice - a.startingPrice
      if (sort === 'reviews') return b.reviewCount - a.reviewCount
      return b.rating - a.rating
    })

    return list
  }, [
    filters.deliveryTime,
    filters.field,
    filters.priceFrom,
    filters.priceTo,
    filters.pspCategory,
    filters.radius,
    filters.region,
    filters.zip,
    q,
    sort,
  ])
}
