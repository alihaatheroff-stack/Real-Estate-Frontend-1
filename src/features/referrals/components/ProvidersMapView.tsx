import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FeaturedAgentAdCard } from '@/features/referrals/components/FeaturedAgentAdCard'
import { ProviderFiltersDrawer } from '@/features/referrals/components/ProviderFiltersDrawer'
import { ProviderListCard } from '@/features/referrals/components/ProviderListCard'
import { ProvidersMap } from '@/features/referrals/components/ProvidersMap'
import {
  ResultsFilterButton,
  ResultsPagination,
  ResultsSortMenu,
  ResultsSplitView,
} from '@/features/referrals/components/ResultsSplitView'
import {
  pickProfileResultAds,
  type ProfileResultAd,
} from '@/features/referrals/data/profileResultAds'
import { useMapResultsInteraction } from '@/features/referrals/hooks/useMapResultsInteraction'
import { useResultsPagination } from '@/features/referrals/hooks/useResultsPagination'
import {
  insertAdsIntoFeed,
  mergePageAds,
  RESULTS_ADS_PER_PAGE,
  RESULTS_ORGANIC_PAGE_SIZE,
} from '@/features/referrals/lib/resultFeedAds'
import {
  PROVIDER_SORT_OPTIONS,
  type ProviderSortKey,
} from '@/features/referrals/model/sort'
import { type HeroFiltersState } from '@/features/search'
import { PATHS } from '@/app/router/paths'
import type { Provider } from '@/entities/provider/types'

type FeedItem =
  | { kind: 'provider'; provider: Provider }
  | { kind: 'ad'; ad: ProfileResultAd; provider: Provider }

function buildFeedWithAds(providers: Provider[], page: number): FeedItem[] {
  const slots = pickProfileResultAds(page, RESULTS_ADS_PER_PAGE)
  const sponsoredIds = new Set(slots.map((slot) => slot.provider.id))
  const organic = providers.filter((provider) => !sponsoredIds.has(provider.id))

  return insertAdsIntoFeed(organic, slots, page).map((item) =>
    item.kind === 'ad'
      ? { kind: 'ad', ad: item.ad.ad, provider: item.ad.provider }
      : { kind: 'provider', provider: item.item },
  )
}

export type { ProviderSortKey }

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
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { page, setPage, totalPages, pageStart, pageEnd, pagedItems } =
    useResultsPagination(providers, RESULTS_ORGANIC_PAGE_SIZE)
  const feedItems = useMemo(() => buildFeedWithAds(pagedItems, page), [page, pagedItems])
  const pageAds = useMemo(() => pickProfileResultAds(page, RESULTS_ADS_PER_PAGE), [page])

  const mapProviders = useMemo(
    () => mergePageAds(providers, pageAds.map((slot) => slot.provider)),
    [pageAds, providers],
  )

  const adsByProviderId = useMemo(() => {
    if (pageAds.length === 0) return undefined
    return Object.fromEntries(pageAds.map((slot) => [slot.provider.id, slot.ad]))
  }, [pageAds])

  const { selectedId, setSelectedId, hoveredId, setHoveredId, itemRefs } =
    useMapResultsInteraction(mapProviders)

  function applyFilters() {
    const params = toSearchParams()
    params.delete('view')
    const find = filters.find
    const target = find.includes('agency')
      ? PATHS.employerResults
      : find.includes('profile')
        ? PATHS.profileResults
        : PATHS.results
    navigate(`${target}?${params.toString()}`)
  }

  function focusProvider(id: string | null) {
    setSelectedId(id)
  }

  function hoverProvider(id: string | null) {
    setHoveredId(id)
    if (id) setSelectedId(id)
  }

  return (
    <ResultsSplitView
      rootClassName="flex h-full min-h-0 flex-1 flex-col overflow-hidden"
      asideClassName="bg-freeio-wash lg:w-[48%]"
      toolbarClassName="flex items-start justify-between gap-3 border-b border-line bg-white px-4 py-4 sm:px-5"
      showMapBarClassName="border-t border-line bg-white p-3 lg:hidden"
      mapPanelClassName="bg-mist lg:w-[52%]"
      mapInnerClassName="absolute inset-0 overflow-hidden bg-mist"
      toolbarStart={
        <div className="flex min-w-0 flex-1 flex-col items-start gap-1">
          <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
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
                  of <span className="font-semibold text-ink">{count}</span>{' '}
                  {resultLabel}
                </>
              )}
            </p>
          </div>
          {q ? (
            <p className="text-sm text-muted">
              <Link to={PATHS.home} className="text-brand hover:underline">
                Home
              </Link>
              {' · '}“{q}”
            </p>
          ) : null}
        </div>
      }
      toolbarEnd={
        <ResultsSortMenu
          options={PROVIDER_SORT_OPTIONS}
          value={sort}
          onChange={onSortChange}
          clearValue="default"
        />
      }
      list={
        count === 0 ? (
          <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center">
            <p className="font-display text-xl font-bold text-ink">No profiles match</p>
            <p className="mt-2 text-sm text-muted">
              Try clearing filters or widening your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 items-stretch gap-4">
            {feedItems.map((item) =>
              item.kind === 'ad' ? (
                <FeaturedAgentAdCard
                  key={item.ad.id}
                  ref={(el) => {
                    itemRefs.current[item.provider.id] = el
                  }}
                  ad={item.ad}
                  provider={item.provider}
                  bannerPlacement="bottom-right"
                  selected={selectedId === item.provider.id}
                  active={hoveredId === item.provider.id}
                  onSelect={focusProvider}
                  onHover={hoverProvider}
                />
              ) : (
                <ProviderListCard
                  key={item.provider.id}
                  ref={(el) => {
                    itemRefs.current[item.provider.id] = el
                  }}
                  provider={item.provider}
                  selected={selectedId === item.provider.id}
                  active={hoveredId === item.provider.id}
                  onSelect={focusProvider}
                  onHover={hoverProvider}
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
        <ProvidersMap
          providers={mapProviders}
          adsByProviderId={adsByProviderId}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={focusProvider}
          onHover={setHoveredId}
        />
      }
      drawer={
        <ProviderFiltersDrawer
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
