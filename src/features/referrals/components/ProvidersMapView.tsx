import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FeaturedAgentAdCard,
  adBannerPlacementFor,
} from '@/features/referrals/components/FeaturedAgentAdCard'
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
  pickProfileResultAd,
  profileAdInsertIndex,
  type ProfileResultAd,
} from '@/features/referrals/data/profileResultAds'
import { useMapResultsInteraction } from '@/features/referrals/hooks/useMapResultsInteraction'
import { useResultsPagination } from '@/features/referrals/hooks/useResultsPagination'
import {
  PROVIDER_SORT_OPTIONS,
  type ProviderSortKey,
} from '@/features/referrals/model/sort'
import { type HeroFiltersState } from '@/features/search'
import { PATHS } from '@/app/router/paths'
import type { Provider } from '@/entities/provider/types'

const PAGE_SIZE = 7

type FeedItem =
  | { kind: 'provider'; provider: Provider }
  | { kind: 'ad'; ad: ProfileResultAd; provider: Provider }

/** Build a page feed that stays even in the 2-col grid (providers + one ad). */
function buildFeedWithAd(providers: Provider[], page: number): FeedItem[] {
  const slot = pickProfileResultAd(page)
  const organic = slot
    ? providers.filter((provider) => provider.id !== slot.provider.id)
    : providers

  const items: FeedItem[] = organic.map((provider) => ({
    kind: 'provider',
    provider,
  }))
  if (items.length === 0 || !slot) return items

  const insertAt = profileAdInsertIndex(page, items.length)
  items.splice(insertAt, 0, { kind: 'ad', ad: slot.ad, provider: slot.provider })
  return items
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
    useResultsPagination(providers, PAGE_SIZE)
  const feedItems = buildFeedWithAd(pagedItems, page)
  const pageAd = useMemo(() => pickProfileResultAd(page), [page])

  const mapProviders = useMemo(() => {
    if (!pageAd) return providers
    if (providers.some((provider) => provider.id === pageAd.provider.id)) {
      return providers
    }
    return [...providers, pageAd.provider]
  }, [pageAd, providers])

  const adsByProviderId = useMemo(() => {
    if (!pageAd) return undefined
    return { [pageAd.provider.id]: pageAd.ad }
  }, [pageAd])

  const { selectedId, setSelectedId, hoveredId, setHoveredId, itemRefs } =
    useMapResultsInteraction(mapProviders)

  function applyFilters() {
    const params = toSearchParams()
    params.set('find', 'profile')
    params.delete('view')
    navigate(`${PATHS.profileResults}?${params.toString()}`)
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
                  bannerPlacement={adBannerPlacementFor(item.provider.id)}
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
