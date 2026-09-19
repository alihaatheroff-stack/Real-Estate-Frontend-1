import { useMemo } from 'react'
import { listProviders } from '@/features/referrals/api/repository'
import { matchesZipRadius } from '@/features/referrals/lib/geo'
import type { ProviderSortKey } from '@/features/referrals/model/sort'
import {
  FREELANCER_CATEGORY_OPTIONS,
  splitCsv,
  type HeroFiltersState,
} from '@/features/search'
import { shuffledCopy } from '@/shared/lib/array'
import type { Provider } from '@/entities/provider/types'

export type { ProviderSortKey }

function joinedTime(value?: string) {
  if (!value) return 0
  const parsed = Date.parse(value)
  return Number.isNaN(parsed) ? 0 : parsed
}

function matchesEnglishLevel(providerLevel: string | undefined, filterValue: string) {
  if (!providerLevel) return false
  const normalized = providerLevel.toLowerCase()
  if (filterValue === 'native') {
    return normalized.includes('native') || normalized.includes('bilingual')
  }
  return normalized.includes(filterValue.toLowerCase())
}

function matchesCategory(providerText: string, categoryValue: string) {
  const option = FREELANCER_CATEGORY_OPTIONS.find((item) => item.value === categoryValue)
  const tokens = (option?.label ?? categoryValue)
    .toLowerCase()
    .split(/[\s&/]+/)
    .filter((token) => token.length > 2)

  return tokens.some((token) => providerText.includes(token))
}

export function useProfileResults({
  q,
  filters,
  sort,
}: {
  q: string
  filters: HeroFiltersState
  sort: ProviderSortKey
}): Provider[] {
  return useMemo(() => {
    let list = listProviders()

    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.title.toLowerCase().includes(q) ||
          p.specialty.toLowerCase().includes(q) ||
          p.about.toLowerCase().includes(q) ||
          (p.skills ?? []).some((skill) => skill.toLowerCase().includes(q)),
      )
    }

    const categories = splitCsv(filters.pspCategory)
    if (categories.length) {
      list = list.filter((p) => {
        const text =
          `${p.title} ${p.specialty} ${p.about} ${(p.skills ?? []).join(' ')}`.toLowerCase()
        return categories.some((category) => matchesCategory(text, category))
      })
    }

    if (filters.zip) {
      list = list.filter((p) => matchesZipRadius(p, filters.zip, filters.radius))
    }

    const regions = splitCsv(filters.region)
    if (regions.length) {
      list = list.filter((p) => {
        const city = p.city.toLowerCase()
        const state = p.state.toLowerCase()
        return regions.some((region) => {
          const normalized = region.replaceAll('-', ' ')
          return city.includes(normalized) || state.includes(normalized) || city.includes(region)
        })
      })
    }

    if (filters.englishLevel) {
      list = list.filter((p) => matchesEnglishLevel(p.englishLevel, filters.englishLevel))
    }

    if (filters.gender && filters.gender !== 'both') {
      list = list.filter((p) => p.gender?.toLowerCase() === filters.gender.toLowerCase())
    }

    if (filters.freelancerType === 'agency') {
      list = list.filter((p) => p.type === 'professional' && p.verified)
    } else if (filters.freelancerType === 'independent') {
      list = list.filter((p) => p.type === 'trade' || !p.verified)
    } else if (filters.freelancerType === 'rising') {
      list = list.filter((p) => !p.verified || p.reviewCount < 80)
    }

    if (filters.language) {
      const language = filters.language.toLowerCase()
      list = list.filter((p) =>
        p.languages.some((lang) => lang.toLowerCase().includes(language)),
      )
    }

    if (sort === 'random') {
      return shuffledCopy(list)
    }

    list.sort((a, b) => {
      if (sort === 'newest') return joinedTime(b.joinedDate) - joinedTime(a.joinedDate)
      if (sort === 'oldest') return joinedTime(a.joinedDate) - joinedTime(b.joinedDate)
      if (sort === 'price-asc') {
        return (a.hourlyRateMin ?? 0) - (b.hourlyRateMin ?? 0)
      }
      if (sort === 'price-desc') {
        return (b.hourlyRateMax ?? 0) - (a.hourlyRateMax ?? 0)
      }
      return b.rating - a.rating
    })

    return list
  }, [
    filters.englishLevel,
    filters.freelancerType,
    filters.gender,
    filters.language,
    filters.pspCategory,
    filters.radius,
    filters.region,
    filters.zip,
    q,
    sort,
  ])
}
