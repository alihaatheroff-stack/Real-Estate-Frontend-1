import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PROVIDERS, ProvidersMapView } from '@/features/referrals'
import type { ProviderSortKey } from '@/features/referrals/components/ProvidersMapView'
import {
  FREELANCER_CATEGORY_OPTIONS,
  useProviderFilters,
  type HeroFiltersState,
} from '@/features/search'

function parseMulti(value: string) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
}

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

export function ProfileResultsPage() {
  const [params] = useSearchParams()
  const { filters, updateFilter, resetFilters, toSearchParams, setFilters } =
    useProviderFilters({ find: 'profile' })
  const [sort, setSort] = useState<ProviderSortKey>('default')
  const q = params.get('q')?.toLowerCase() ?? ''

  useEffect(() => {
    const next: Partial<HeroFiltersState> = { find: 'profile' }
    ;(
      [
        'pspCategory',
        'englishLevel',
        'region',
        'gender',
        'freelancerType',
        'language',
        'zip',
        'radius',
      ] as const
    ).forEach((key) => {
      const value = params.get(key)
      if (value) next[key] = value
    })
    setFilters((prev) => ({ ...prev, ...next }))
  }, [params, setFilters])

  const profileResults = useMemo(() => {
    let list = [...PROVIDERS]

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

    const categories = parseMulti(filters.pspCategory)
    if (categories.length) {
      list = list.filter((p) => {
        const text =
          `${p.title} ${p.specialty} ${p.about} ${(p.skills ?? []).join(' ')}`.toLowerCase()
        return categories.some((category) => matchesCategory(text, category))
      })
    }

    const regions = parseMulti(filters.region)
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
      list = list.filter((p) => p.type === 'professional' || p.type === 'trade')
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
      const shuffled = [...list]
      for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
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
    filters.region,
    q,
    sort,
  ])

  return (
    <ProvidersMapView
      providers={profileResults}
      count={profileResults.length}
      sort={sort}
      onSortChange={setSort}
      q={q}
      filters={filters}
      onFilterChange={updateFilter}
      onResetFilters={resetFilters}
      toSearchParams={toSearchParams}
      resultLabel="results"
    />
  )
}
