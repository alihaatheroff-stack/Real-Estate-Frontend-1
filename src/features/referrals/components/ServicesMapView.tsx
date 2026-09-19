import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ServiceFiltersDrawer } from '@/features/referrals/components/ServiceFiltersDrawer'
import { ServiceSortSelect } from '@/features/referrals/components/ServiceSortSelect'
import { ServiceMapCard } from '@/features/referrals/components/ServiceMapCard'
import { ServicesMap } from '@/features/referrals/components/ServicesMap'
import {
  ResultsFilterButton,
  ResultsPagination,
  ResultsSplitView,
} from '@/features/referrals/components/ResultsSplitView'
import { useMapResultsInteraction } from '@/features/referrals/hooks/useMapResultsInteraction'
import { useResultsPagination } from '@/features/referrals/hooks/useResultsPagination'
import type { ServiceSortKey } from '@/features/referrals/model/sort'
import { type HeroFiltersState } from '@/features/search'
import { PATHS } from '@/app/router/paths'
import type { Service } from '@/entities/provider/types'

const PAGE_SIZE = 8

type ServicesMapViewProps = {
  services: Service[]
  count: number
  sort: ServiceSortKey[]
  onSortChange: (sort: ServiceSortKey[]) => void
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
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { selectedId, setSelectedId, hoveredId, setHoveredId, itemRefs } =
    useMapResultsInteraction(services)
  const { page, setPage, totalPages, pageStart, pageEnd, pagedItems } =
    useResultsPagination(services, PAGE_SIZE)

  function applyFilters() {
    navigate(`${PATHS.results}?${toSearchParams().toString()}`)
  }

  function focusService(id: string | null) {
    setSelectedId(id)
  }

  function hoverService(id: string | null) {
    setHoveredId(id)
    if (id) setSelectedId(id)
  }

  return (
    <ResultsSplitView
      rootClassName="flex h-full min-h-0 flex-1 flex-col overflow-hidden"
      splitRowClassName="flex min-h-0 flex-1 overflow-hidden"
      asideClassName="bg-paper lg:w-1/2"
      toolbarClassName="relative z-30 flex items-start justify-between gap-3 border-b border-line bg-paper px-4 py-4 sm:px-5"
      showMapBarClassName="border-t border-line p-3 lg:hidden"
      mapPanelClassName="min-w-0 lg:w-1/2"
      mapInnerClassName="absolute inset-0 overflow-hidden bg-mist"
      toolbarStart={
        <div className="min-w-0 flex-1 flex-col items-start gap-2 flex">
          <ResultsFilterButton onClick={() => setFiltersOpen(true)} />
          <p className="text-base text-muted">
            {count === 0 ? (
              'No results'
            ) : (
              <>
                Showing{' '}
                <span className="font-semibold text-ink">
                  {pageStart} – {pageEnd}
                </span>{' '}
                of <span className="font-semibold text-ink">{count}</span> results
              </>
            )}
            {q ? (
              <span className="mt-1 block text-sm">
                <Link to={PATHS.home} className="text-brand hover:underline">
                  Home
                </Link>
                {' · '}“{q}”
              </span>
            ) : null}
          </p>
        </div>
      }
      toolbarEnd={<ServiceSortSelect value={sort} onChange={onSortChange} />}
      list={
        count === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-mist/50 p-10 text-center">
            <p className="font-display text-xl font-bold text-ink">No services match</p>
            <p className="mt-2 text-sm text-muted">
              Try clearing filters or widening your radius.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {pagedItems.map((service) => (
              <ServiceMapCard
                key={service.id}
                ref={(el) => {
                  itemRefs.current[service.id] = el
                }}
                service={service}
                selected={selectedId === service.id}
                active={hoveredId === service.id}
                onSelect={focusService}
                onHover={hoverService}
              />
            ))}
          </div>
        )
      }
      pagination={
        <ResultsPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      }
      scrollResetKey={page}
      map={
        <ServicesMap
          services={services}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={focusService}
          onHover={setHoveredId}
        />
      }
      drawer={
        <ServiceFiltersDrawer
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          filters={filters}
          onChange={onFilterChange}
          onReset={onResetFilters}
          onApply={applyFilters}
        />
      }
    />
  )
}
