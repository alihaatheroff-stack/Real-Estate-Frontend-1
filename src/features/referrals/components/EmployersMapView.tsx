import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, RotateCcw, SearchX } from 'lucide-react'
import { EmployerMapCard } from '@/features/referrals/components/EmployerMapCard'
import { EmployersMap } from '@/features/referrals/components/EmployersMap'
import { FeaturedEmployerAdCard } from '@/features/referrals/components/FeaturedEmployerAdCard'
import { adBannerPlacementFor } from '@/features/referrals/components/FeaturedAgentAdCard'
import { ServiceFiltersDrawer } from '@/features/referrals/components/ServiceFiltersDrawer'
import {
  pickEmployerResultAds,
  type EmployerResultAd,
} from '@/features/referrals/data/employerResultAds'
import {
  ResultsFilterButton,
  ResultsSortMenu,
  ResultsSplitView,
} from '@/features/referrals/components/ResultsSplitView'
import { useMapResultsInteraction } from '@/features/referrals/hooks/useMapResultsInteraction'
import { useResultsPagination } from '@/features/referrals/hooks/useResultsPagination'
import {
  insertAdsIntoFeed,
  mergePageAds,
  RESULTS_ADS_PER_PAGE,
  RESULTS_ORGANIC_PAGE_SIZE,
} from '@/features/referrals/lib/resultFeedAds'
import {
  EMPLOYER_SORT_OPTIONS,
  type EmployerSortKey,
} from '@/features/referrals/model/sort'
import { type HeroFiltersState } from '@/features/search'
import type { Employer } from '@/entities/employer/types'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

type FeedItem =
  | { kind: 'employer'; employer: Employer }
  | { kind: 'ad'; ad: EmployerResultAd }

function buildFeedWithAds(employers: Employer[], page: number): FeedItem[] {
  const slots = pickEmployerResultAds(page, RESULTS_ADS_PER_PAGE)
  const sponsoredIds = new Set(slots.map((slot) => slot.employer.id))
  const organic = employers.filter((employer) => !sponsoredIds.has(employer.id))

  return insertAdsIntoFeed(organic, slots, page).map((item) =>
    item.kind === 'ad'
      ? { kind: 'ad', ad: item.ad }
      : { kind: 'employer', employer: item.item },
  )
}

export type { EmployerSortKey }

type EmployersMapViewProps = {
  employers: Employer[]
  count: number
  sort: EmployerSortKey
  onSortChange: (sort: EmployerSortKey) => void
  q?: string
  filters: HeroFiltersState
  onFilterChange: <K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) => void
  onResetFilters: () => void
  toSearchParams: () => URLSearchParams
  isLoading?: boolean
  activeFilterCount?: number
}

function EmployersListSkeleton() {
  return (
    <div
      className="mx-auto grid w-full max-w-[34rem] auto-rows-fr items-stretch gap-5 pl-5 sm:max-w-none sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 sm:pl-6 sm:pr-1"
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-line/80 bg-white"
        >
          <div className="aspect-[4/3] bg-mist" />
          <div className="space-y-2 p-4">
            <div className="h-3 w-24 rounded bg-freeio-hover" />
            <div className="h-5 w-3/4 rounded bg-freeio-hover" />
            <div className="h-4 w-1/2 rounded bg-freeio-hover" />
            <div className="mt-2 h-10 rounded bg-freeio-hover" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading office results</span>
    </div>
  )
}

function EmployersEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center rounded-2xl border border-dashed border-freeio-border bg-white px-6 py-14 text-center shadow-[0_8px_28px_rgba(0,0,0,0.03)]"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-freeio-peach text-freeio-coral">
        <SearchX className="h-7 w-7" strokeWidth={1.6} aria-hidden />
      </span>
      <h2 className="mt-4 font-display text-xl font-bold text-freeio-ink">No employers match</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-freeio-muted">
        Try clearing filters, changing location, or searching a broader keyword.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 inline-flex h-10 items-center gap-2 rounded-xl bg-brand px-4 text-sm font-semibold text-white transition hover:bg-brand-dark"
      >
        <RotateCcw className="h-4 w-4" aria-hidden />
        Reset filters
      </button>
    </div>
  )
}

function CircularPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1)

  return (
    <div className="flex items-center justify-center gap-2 px-4 py-3.5">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-freeio-border bg-white text-freeio-muted transition hover:border-brand/40 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
      </button>
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={cn(
            'inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition',
            pageNumber === page
              ? 'bg-brand text-white'
              : 'border border-freeio-border bg-white text-freeio-muted hover:border-brand/40 hover:text-brand',
          )}
        >
          {pageNumber}
        </button>
      ))}
      {totalPages > 5 ? (
        <>
          <span className="px-1 text-sm font-semibold tracking-widest text-freeio-subtle" aria-hidden>
            …
          </span>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className={cn(
              'inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition',
              page === totalPages
                ? 'bg-brand text-white'
                : 'border border-freeio-border bg-white text-freeio-muted hover:border-brand/40 hover:text-brand',
            )}
          >
            {totalPages}
          </button>
        </>
      ) : null}
      <button
        type="button"
        aria-label="Next page"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-freeio-border bg-white text-freeio-muted transition hover:border-brand/40 hover:text-brand disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  )
}

export function EmployersMapView({
  employers,
  count,
  sort,
  onSortChange,
  q = '',
  filters,
  onFilterChange,
  onResetFilters,
  toSearchParams,
  isLoading = false,
  activeFilterCount = 0,
}: EmployersMapViewProps) {
  const navigate = useNavigate()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const { page, setPage, totalPages, pageStart, pageEnd, pagedItems } =
    useResultsPagination(employers, RESULTS_ORGANIC_PAGE_SIZE)
  const feedItems = useMemo(() => buildFeedWithAds(pagedItems, page), [page, pagedItems])
  const pageAds = useMemo(() => pickEmployerResultAds(page, RESULTS_ADS_PER_PAGE), [page])
  const mapEmployers = useMemo(
    () => mergePageAds(employers, pageAds.map((slot) => slot.employer)),
    [employers, pageAds],
  )
  const adsByEmployerId = useMemo(() => {
    if (pageAds.length === 0) return undefined
    return Object.fromEntries(pageAds.map((slot) => [slot.employer.id, slot]))
  }, [pageAds])
  const { selectedId, setSelectedId, hoveredId, setHoveredId, itemRefs } =
    useMapResultsInteraction(mapEmployers)

  function applyFilters() {
    const params = toSearchParams()
    params.delete('view')
    if (q) params.set('q', q)
    const find = filters.find
    const target = find.includes('profile')
      ? PATHS.profileResults
      : find.includes('service')
        ? PATHS.results
        : PATHS.employerResults
    navigate(`${target}?${params.toString()}`)
  }

  return (
    <ResultsSplitView
      rootClassName="flex h-full min-h-0 flex-1 flex-col overflow-hidden"
      splitRowClassName="flex min-h-0 flex-1 overflow-hidden"
      asideClassName="bg-freeio-wash lg:w-[48%]"
      toolbarClassName="relative z-30 flex flex-col gap-2 bg-paper px-4 py-4 sm:px-5"
      showMapBarClassName="border-t border-line bg-white p-3 lg:hidden"
      mapPanelClassName="bg-mist lg:w-[52%]"
      mapInnerClassName="absolute inset-0 overflow-hidden bg-mist"
      toolbarStart={
        <div className="flex w-full min-w-0 flex-col gap-2">
          <div className="grid grid-cols-3 items-center gap-3">
            <div className="justify-self-start">
              <ResultsFilterButton variant="underline" onClick={() => setFiltersOpen(true)} />
              {activeFilterCount > 0 ? (
                <span className="sr-only">{activeFilterCount} active filters</span>
              ) : null}
            </div>
            <p className="justify-self-center text-center text-sm text-muted underline underline-offset-[3px] sm:text-base">
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
            </p>
            <div className="justify-self-end">
              <ResultsSortMenu
                options={EMPLOYER_SORT_OPTIONS}
                value={sort}
                onChange={onSortChange}
                clearValue="default"
                variant="underline"
              />
            </div>
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
      toolbarEnd={null}
      list={
        isLoading ? (
          <EmployersListSkeleton />
        ) : count === 0 ? (
          <EmployersEmptyState onReset={onResetFilters} />
        ) : (
          <ul className="mx-auto grid w-full max-w-[34rem] auto-rows-fr items-stretch gap-5 pl-5 sm:max-w-none sm:grid-cols-2 sm:gap-x-8 sm:gap-y-5 sm:pl-6 sm:pr-1">
            {feedItems.map((item, index) => {
              const employer = item.kind === 'ad' ? item.ad.employer : item.employer
              return (
                <li
                  key={item.kind === 'ad' ? item.ad.id : employer.id}
                  className="animate-[section-rise_0.4s_ease-out_both]"
                  style={{ animationDelay: `${Math.min(index, 7) * 35}ms` }}
                >
                  {item.kind === 'ad' ? (
                    <FeaturedEmployerAdCard
                      ref={(element) => {
                        itemRefs.current[employer.id] = element
                      }}
                      ad={item.ad}
                      employer={employer}
                      bannerPlacement={adBannerPlacementFor(employer.id)}
                      selected={selectedId === employer.id}
                      active={hoveredId === employer.id}
                      onSelect={setSelectedId}
                      onHover={setHoveredId}
                    />
                  ) : (
                    <EmployerMapCard
                      ref={(element) => {
                        itemRefs.current[employer.id] = element
                      }}
                      employer={employer}
                      selected={selectedId === employer.id}
                      active={hoveredId === employer.id}
                      onSelect={setSelectedId}
                      onHover={setHoveredId}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        )
      }
      pagination={
        <div
          className={cn(
            'border-t border-freeio-border-soft bg-white',
            (isLoading || count === 0) && 'hidden',
          )}
        >
          <CircularPagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      }
      scrollResetKey={page}
      map={
        <EmployersMap
          employers={mapEmployers}
          adsByEmployerId={adsByEmployerId}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={setSelectedId}
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
