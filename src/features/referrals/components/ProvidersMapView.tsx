import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { List, ListFilter, Map as MapIcon } from 'lucide-react'
import { ProviderFiltersDrawer } from '@/features/referrals/components/ProviderFiltersDrawer'
import { ProviderListCard } from '@/features/referrals/components/ProviderListCard'
import { ProvidersMap } from '@/features/referrals/components/ProvidersMap'
import { type HeroFiltersState } from '@/features/search'
import { PATHS } from '@/app/router/paths'
import type { Provider } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

export type ProviderSortKey =
  | 'default'
  | 'newest'
  | 'oldest'
  | 'price-asc'
  | 'price-desc'
  | 'random'

const SORT_OPTIONS: { label: string; value: ProviderSortKey }[] = [
  { label: 'Sort by (Default)', value: 'default' },
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Lowest Price', value: 'price-asc' },
  { label: 'Highest Price', value: 'price-desc' },
  { label: 'Random', value: 'random' },
]

type ProvidersMapViewProps = {
  providers: Provider[]
  count: number
  sort: ProviderSortKey
  onSortChange: (sort: ProviderSortKey) => void
  q: string
  filters: HeroFiltersState
  onFilterChange: <K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) => void
  onResetFilters: () => void
  toSearchParams: () => URLSearchParams
  resultLabel?: string
}

export function ProvidersMapView({
  providers,
  count,
  sort,
  onSortChange,
  q,
  filters,
  onFilterChange,
  onResetFilters,
  toSearchParams,
  resultLabel = 'results',
}: ProvidersMapViewProps) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')
  const itemRefs = useRef<Record<string, HTMLElement | null>>({})

  const sortLabel = useMemo(
    () => SORT_OPTIONS.find((option) => option.value === sort)?.label ?? 'Sort by (Default)',
    [sort],
  )

  useEffect(() => {
    if (!hoveredId) return
    itemRefs.current[hoveredId]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [hoveredId])

  useEffect(() => {
    if (selectedId && !providers.some((p) => p.id === selectedId)) {
      setSelectedId(null)
    }
  }, [selectedId, providers])

  function applyFilters() {
    const params = toSearchParams()
    params.set('find', 'profile')
    params.delete('view')
    navigate(`${PATHS.profileResults}?${params.toString()}`)
  }

  return (
    <>
      <div className="flex h-[calc(100dvh-4.25rem)] flex-col lg:h-[calc(100dvh-5rem)]">
        <div className="flex min-h-0 flex-1">
          <aside
            className={cn(
              'flex min-h-0 w-full flex-col border-r border-line bg-[#f8f9fb] lg:w-[48%]',
              mobileView === 'map' && 'hidden lg:flex',
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-4 py-4 sm:px-5">
              <p className="text-[15px] text-[#222]">
                {count === 0 ? (
                  'No results'
                ) : (
                  <>
                    Showing all <span className="font-semibold">{count}</span> {resultLabel}
                  </>
                )}
                {q ? (
                  <span className="mt-1 block text-sm text-muted">
                    <Link to={PATHS.referrals} className="text-brand hover:underline">
                      Referrals home
                    </Link>
                    {' · '}
                    “{q}”
                  </span>
                ) : null}
              </p>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#e5e7eb] bg-[#f7f9fc] px-4 text-[15px] font-medium text-[#222] transition hover:border-[#5BBB7B] hover:text-[#5BBB7B]"
                >
                  <ListFilter className="h-4 w-4" />
                  Filter
                </button>

                <label className="relative inline-flex min-w-[10.5rem]">
                  <span className="sr-only">Sort by</span>
                  <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value as ProviderSortKey)}
                    className="h-11 w-full appearance-none rounded-lg border border-[#e5e7eb] bg-white py-2 pl-3 pr-9 text-[15px] font-medium text-[#222] outline-none transition focus:border-[#5BBB7B]"
                    aria-label={sortLabel}
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#222]"
                  >
                    ▼
                  </span>
                </label>
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
              {count === 0 ? (
                <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
                  <p className="font-display text-xl font-bold text-ink">No profiles match</p>
                  <p className="mt-2 text-sm text-muted">
                    Try clearing filters or widening your search.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {providers.map((provider) => (
                    <ProviderListCard
                      key={provider.id}
                      ref={(el) => {
                        itemRefs.current[provider.id] = el
                      }}
                      provider={provider}
                      selected={selectedId === provider.id}
                      active={hoveredId === provider.id}
                      onSelect={setSelectedId}
                      onHover={setHoveredId}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-line bg-white p-3 lg:hidden">
              <button
                type="button"
                onClick={() => setMobileView('map')}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white"
              >
                <MapIcon className="h-4 w-4" />
                Show Map
              </button>
            </div>
          </aside>

          <div
            className={cn(
              'relative min-h-[320px] flex-1 bg-mist lg:w-[52%]',
              mobileView === 'list' && 'hidden lg:block',
            )}
          >
            <ProvidersMap
              providers={providers}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={setSelectedId}
              onHover={setHoveredId}
            />

            <div className="absolute left-4 top-4 z-[500] lg:hidden">
              <button
                type="button"
                onClick={() => setMobileView('list')}
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2 text-sm font-semibold text-ink shadow-soft"
              >
                <List className="h-4 w-4" />
                Show List
              </button>
            </div>
          </div>
        </div>
      </div>

      <ProviderFiltersDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onChange={onFilterChange}
        onReset={onResetFilters}
        onApply={applyFilters}
      />
    </>
  )
}
