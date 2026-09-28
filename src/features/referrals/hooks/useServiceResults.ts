import { useMemo } from 'react'
import type { Service } from '@/entities/provider/types'
import {
  getProviderForService,
  listServices,
} from '@/features/referrals/api/repository'
import type { ServiceSortKey } from '@/features/referrals/model/sort'
import { matchesZipRadius } from '@/features/referrals/lib/geo'
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

  if (sort === 'latest') {
    const joinedA = getProviderForService(a)?.joinedDate
    const joinedB = getProviderForService(b)?.joinedDate
    const timeA = joinedA ? Date.parse(`1 ${joinedA}`) : 0
    const timeB = joinedB ? Date.parse(`1 ${joinedB}`) : 0
    if (timeA !== timeB) return timeB - timeA
    return b.id.localeCompare(a.id)
  }

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

  if (sort === 'willing-to-train') {
    const trainA = getProviderForService(a)?.learningIncluded ? 0 : 1
    const trainB = getProviderForService(b)?.learningIncluded ? 0 : 1
    return trainA - trainB
  }

  return 0
}

function applySortFilters(list: Service[], sort: ServiceSortKey[]): Service[] {
  let next = list

  const referralExact = sort.find(
    (key) =>
      key.startsWith('referral-') &&
      key !== 'referral-desc' &&
      key !== 'referral-asc',
  )
  if (referralExact) {
    const target = Number(referralExact.replace('referral-', ''))
    if (!Number.isNaN(target)) {
      next = next.filter((service) => getProviderForService(service)?.referralShare === target)
    }
  }

  const trainExact = sort.find((key) => key.startsWith('train-'))
  if (trainExact === 'train-yes') {
    next = next.filter((service) => getProviderForService(service)?.learningIncluded === true)
  } else if (trainExact === 'train-no') {
    next = next.filter((service) => getProviderForService(service)?.learningIncluded === false)
  } else if (trainExact === 'train-maybe') {
    // Catalog only stores yes/no — keep list unchanged for "Maybe".
  }

  return next
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

    if (filters.zip) {
      list = list.filter((s) => {
        const provider = getProviderForService(s)
        return provider ? matchesZipRadius(provider, filters.zip, filters.radius) : false
      })
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
          // Catalog only encodes yes/no. "Maybe" must not match every provider.
          return false
        })
      })
    }

    list = applySortFilters(list, sort)

    list.sort((a, b) => {
      for (const key of sort) {
        if (
          (key.startsWith('referral-') && key !== 'referral-desc' && key !== 'referral-asc') ||
          key.startsWith('train-')
        ) {
          continue
        }
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
