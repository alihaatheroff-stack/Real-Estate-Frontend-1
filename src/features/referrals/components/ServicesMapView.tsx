import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Filter, List, Map as MapIcon } from 'lucide-react'
import { Select } from '@/components/ui/Select'
import { ServiceFiltersDrawer } from '@/features/referrals/components/ServiceFiltersDrawer'
import { ServiceMapCard } from '@/features/referrals/components/ServiceMapCard'
import { ServicesMap } from '@/features/referrals/components/ServicesMap'
import type { ServiceSortKey } from '@/features/referrals/hooks/useServiceResults'
import { type HeroFiltersState } from '@/features/search'
import { PATHS, servicePath } from '@/app/router/paths'
import type { Service } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

const PAGE_SIZE = 8

type ServicesMapViewProps = {
  services: Service[]
  count: number
  sort: ServiceSortKey
  onSortChange: (sort: ServiceSortKey) => void
  q: string
  zip?: string
  filters: HeroFiltersState
  onFilterChange: <K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) => void
  onResetFilters: () => void
  toSearchParams: () => URLSearchParams
}

export function ServicesMapView({
  services,
  count,
  sort,
  onSortChange,
  q,
  filters,
  onFilterChange,
  onResetFilters,
  toSearchParams,
}: ServicesMapViewProps) {
  const navigate = useNavigate()
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')
  const [page, setPage] = useState(1)
  const itemRefs = useRef<Record<string, HTMLElement | null>>({})

  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE))
  const pageStart = count === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
  const pageEnd = Math.min(page * PAGE_SIZE, count)
  const pagedServices = useMemo(
    () => services.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page, services],
  )

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  useEffect(() => {
    setPage(1)
  }, [services])

  useEffect(() => {
    if (!hoveredId) return
    itemRefs.current[hoveredId]?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [hoveredId])

  useEffect(() => {
    if (selectedId && !services.some((s) => s.id === selectedId)) {
      setSelectedId(null)
    }
  }, [selectedId, services])

  function applyFilters() {
    navigate(`${PATHS.results}?${toSearchParams().toString()}`)
  }

  function openService(id: string) {
    navigate(servicePath(id))
  }

  function selectOnMap(id: string | null) {
    setSelectedId(id)
  }

  return (
    <>
      <div className="flex h-[calc(100dvh-4.25rem)] flex-col lg:h-[calc(100dvh-5rem)]">
        <div className="flex min-h-0 flex-1">
          <aside
            className={cn(
              'flex min-h-0 w-full flex-col border-r border-line bg-paper lg:w-1/2',
              mobileView === 'map' && 'hidden lg:flex',
            )}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-4 sm:px-5">
              <p className="text-base text-muted">
                {count === 0 ? (
                  'No results'
                ) : (
                  <>
                    Showing{' '}
                    <span className="font-semibold text-ink">
                      {pageStart} – {pageEnd}
                    </span>{' '}
                    of{' '}
                    <span className="font-semibold text-ink">{count}</span> results
                  </>
                )}
                {q ? (
                  <span className="mt-1 block text-sm">
                    <Link to={PATHS.referrals} className="text-brand hover:underline">
                      Referrals home
                    </Link>
                    {' · '}
                    “{q}”
                  </span>
                ) : null}
              </p>

              <div className="flex items-end gap-2">
                <button
                  type="button"
                  onClick={() => setFiltersOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-line bg-paper px-4 text-base font-semibold text-ink transition hover:border-brand hover:text-brand"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </button>

                <Select
                  label="Sort by"
                  value={sort}
                  onChange={(e) => onSortChange(e.target.value as ServiceSortKey)}
                  options={[
                    { label: 'Default', value: 'rating' },
                    { label: 'Most reviews', value: 'reviews' },
                    { label: 'Lowest price', value: 'price-asc' },
                    { label: 'Highest price', value: 'price-desc' },
                  ]}
                  className="w-40 text-base"
                  labelClassName="text-base"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
              {count === 0 ? (
                <div className="rounded-2xl border border-dashed border-line bg-mist/50 p-10 text-center">
                  <p className="font-display text-xl font-bold text-ink">No services match</p>
                  <p className="mt-2 text-sm text-muted">
                    Try clearing filters or widening your radius.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {pagedServices.map((service) => (
                    <ServiceMapCard
                      key={service.id}
                      ref={(el) => {
                        itemRefs.current[service.id] = el
                      }}
                      service={service}
                      selected={selectedId === service.id}
                      active={hoveredId === service.id}
                      onSelect={(id) => {
                        setSelectedId(id)
                        openService(id)
                      }}
                      onHover={setHoveredId}
                    />
                  ))}
                </div>
              )}
            </div>

            {totalPages > 1 ? (
              <div className="flex items-center justify-center gap-2 border-t border-line px-4 py-3">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                  (pageNumber) => (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => setPage(pageNumber)}
                      className={cn(
                        'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition',
                        pageNumber === page
                          ? 'border-brand bg-brand text-white'
                          : 'border-line bg-paper text-ink hover:border-brand/40',
                      )}
                    >
                      {pageNumber}
                    </button>
                  ),
                )}
              </div>
            ) : null}

            <div className="border-t border-line p-3 lg:hidden">
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
              'relative min-h-[320px] flex-1 bg-mist lg:w-1/2',
              mobileView === 'list' && 'hidden lg:block',
            )}
          >
            <ServicesMap
              services={services}
              selectedId={selectedId}
              hoveredId={hoveredId}
              onSelect={selectOnMap}
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

      <ServiceFiltersDrawer
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
