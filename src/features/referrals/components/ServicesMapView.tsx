import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { adBannerPlacementFor } from '@/features/referrals/components/FeaturedAgentAdCard'
import { FeaturedServiceAdCard } from '@/features/referrals/components/FeaturedServiceAdCard'
import { ServiceFiltersDrawer } from '@/features/referrals/components/ServiceFiltersDrawer'
import { ServiceSortSelect } from '@/features/referrals/components/ServiceSortSelect'
import { ServiceMapCard } from '@/features/referrals/components/ServiceMapCard'
import { ServicesMap } from '@/features/referrals/components/ServicesMap'
import {
  ResultsFilterButton,
  ResultsPagination,
  ResultsSplitView,
} from '@/features/referrals/components/ResultsSplitView'
import {
  pickServiceResultAds,
  type ServiceResultAd,
} from '@/features/referrals/data/serviceResultAds'
import { useMapResultsInteraction } from '@/features/referrals/hooks/useMapResultsInteraction'
import { useResultsPagination } from '@/features/referrals/hooks/useResultsPagination'
import {
  insertAdsIntoFeed,
  mergePageAds,
  RESULTS_ADS_PER_PAGE,
  RESULTS_ORGANIC_PAGE_SIZE,
} from '@/features/referrals/lib/resultFeedAds'
import type { ServiceSortKey } from '@/features/referrals/model/sort'
import { type HeroFiltersState } from '@/features/search'
import { PATHS } from '@/app/router/paths'
import type { Service } from '@/entities/provider/types'

type FeedItem =
  | { kind: 'service'; service: Service }
  | { kind: 'ad'; ad: ServiceResultAd }

function buildFeedWithAds(services: Service[], page: number): FeedItem[] {
  const slots = pickServiceResultAds(page, RESULTS_ADS_PER_PAGE)
  const sponsoredIds = new Set(slots.map((slot) => slot.service.id))
  const organic = services.filter((service) => !sponsoredIds.has(service.id))

  return insertAdsIntoFeed(organic, slots, page).map((item) =>
    item.kind === 'ad'
      ? { kind: 'ad', ad: item.ad }
      : { kind: 'service', service: item.item },
  )
}

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
  const { page, setPage, totalPages, pageStart, pageEnd, pagedItems } =
    useResultsPagination(services, RESULTS_ORGANIC_PAGE_SIZE)
  const feedItems = useMemo(() => buildFeedWithAds(pagedItems, page), [page, pagedItems])
  const pageAds = useMemo(() => pickServiceResultAds(page, RESULTS_ADS_PER_PAGE), [page])
  const mapServices = useMemo(
    () => mergePageAds(services, pageAds.map((slot) => slot.service)),
    [pageAds, services],
  )
  const adsByServiceId = useMemo(() => {
    if (pageAds.length === 0) return undefined
    return Object.fromEntries(pageAds.map((slot) => [slot.service.id, slot]))
  }, [pageAds])
  const { selectedId, setSelectedId, hoveredId, setHoveredId, itemRefs } =
    useMapResultsInteraction(mapServices)

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
            {feedItems.map((item) =>
              item.kind === 'ad' ? (
                <FeaturedServiceAdCard
                  key={item.ad.id}
                  ref={(el) => {
                    itemRefs.current[item.ad.service.id] = el
                  }}
                  ad={item.ad}
                  service={item.ad.service}
                  bannerPlacement={adBannerPlacementFor(item.ad.service.providerId)}
                  selected={selectedId === item.ad.service.id}
                  active={hoveredId === item.ad.service.id}
                  onSelect={focusService}
                  onHover={hoverService}
                />
              ) : (
                <ServiceMapCard
                  key={item.service.id}
                  ref={(el) => {
                    itemRefs.current[item.service.id] = el
                  }}
                  service={item.service}
                  selected={selectedId === item.service.id}
                  active={hoveredId === item.service.id}
                  onSelect={focusService}
                  onHover={hoverService}
                />
              ),
            )}
          </div>
        )
      }
      pagination={
        <ResultsPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      }
      scrollResetKey={page}
      map={
        <ServicesMap
          services={mapServices}
          adsByServiceId={adsByServiceId}
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
