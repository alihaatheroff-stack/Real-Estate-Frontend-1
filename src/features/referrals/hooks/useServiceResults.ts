import { useMemo } from 'react'
import type { Service } from '@/entities/provider/types'
import {
  getProviderForService,
  listServices,
} from '@/features/referrals/api/repository'
import type { ServiceSortKey } from '@/features/referrals/model/sort'
import { splitCsv, type HeroFiltersState } from '@/features/search'

export type { ServiceSortKey }

type UseServiceResultsOptions = {
  q: string
  filters: HeroFiltersState
  sort: ServiceSortKey[]
}

function compareBySort(a: Service, b: Service, sort: ServiceSortKey): number {
  if (sort === 'price-asc') return a.startingPrice - b.startingPrice
  if (sort === 'price-desc') return b.startingPrice - a.startingPrice

  if (sort === 'referral-desc' || sort === 'referrals') {
    const shareA = getProviderForService(a)?.referralShare ?? 0
    const shareB = getProviderForService(b)?.referralShare ?? 0
    return shareB - shareA
  }

  if (sort === 'referral-asc') {
    const shareA = getProviderForService(a)?.referralShare ?? 0
    const shareB = getProviderForService(b)?.referralShare ?? 0
    return shareA - shareB
  }

  if (sort.startsWith('referral-')) {
    const shareA = getProviderForService(a)?.referralShare ?? 0
    const shareB = getProviderForService(b)?.referralShare ?? 0
    const target = Number(sort.replace('referral-', ''))
    const distA = Math.abs(shareA - target)
    const distB = Math.abs(shareB - target)
    if (distA !== distB) return distA - distB
    return shareB - shareA
  }

  if (sort === 'willing-to-train' || sort.startsWith('train-')) {
    const trainRank = (learningIncluded: boolean | undefined) => {
      if (sort === 'train-yes') return learningIncluded ? 0 : 1
      if (sort === 'train-no') return learningIncluded ? 1 : 0
      if (sort === 'train-maybe') return learningIncluded ? 1 : 0
      return learningIncluded ? 0 : 1
    }
    const rankA = trainRank(getProviderForService(a)?.learningIncluded)
    const rankB = trainRank(getProviderForService(b)?.learningIncluded)
    return rankA - rankB
  }

  return 0
}

export function useServiceResults({ q, filters, sort }: UseServiceResultsOptions) {
  return useMemo(() => {
    let list = listServices()

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
      const keys = splitCsv(filters.pspCategory).map((key) => key.toLowerCase())
      list = list.filter((s) => {
        const cat = s.category.toLowerCase()
        const sub = s.subcategory.toLowerCase()
        return keys.some((key) => {
          if (key === 'trade') return s.badges.includes('Trade') || sub === 'trade'
          return (
            cat.includes(key) ||
            key.includes(cat.split(' ')[0]?.toLowerCase() ?? '')
          )
        })
      })
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

    if (filters.percentageShare) {
      const targets = splitCsv(filters.percentageShare)
        .map((value) => Number(value.replace('%', '').trim()))
        .filter((value) => !Number.isNaN(value))
      if (targets.length > 0) {
        list = list.filter((s) => {
          const provider = getProviderForService(s)
          return provider ? targets.includes(provider.referralShare) : false
        })
      }
    }

    if (filters.willingToTrain) {
      const trainFilters = splitCsv(filters.willingToTrain.toLowerCase())
      list = list.filter((s) => {
        const provider = getProviderForService(s)
        if (!provider) return false
        return trainFilters.some((train) => {
          if (train === 'yes') return provider.learningIncluded
          if (train === 'no') return !provider.learningIncluded
          if (train === 'maybe') return true
          return false
        })
      })
    }

    list.sort((a, b) => {
      for (const key of sort) {
        const cmp = compareBySort(a, b, key)
        if (cmp !== 0) return cmp
      }
      return 0
    })

    return list
  }, [
    filters.field,
    filters.percentageShare,
    filters.pspCategory,
    filters.radius,
    filters.willingToTrain,
    filters.zip,
    q,
    sort,
  ])
}
