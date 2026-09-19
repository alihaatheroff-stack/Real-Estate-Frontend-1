import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Filter,
  LayoutGrid,
  List,
  RotateCcw,
  SearchX,
} from 'lucide-react'
import { EmployerFiltersDrawer } from '@/features/referrals/components/EmployerFiltersDrawer'
import { EmployerMapCard } from '@/features/referrals/components/EmployerMapCard'
import { EmployersMap } from '@/features/referrals/components/EmployersMap'
import type { EmployerFiltersState } from '@/features/referrals/model/employerFilters'
import {
  ResultsSortMenu,
  ResultsSplitView,
} from '@/features/referrals/components/ResultsSplitView'
import { useMapResultsInteraction } from '@/features/referrals/hooks/useMapResultsInteraction'
import { useResultsPagination } from '@/features/referrals/hooks/useResultsPagination'
import {
  EMPLOYER_SORT_OPTIONS,
  type EmployerSortKey,
} from '@/features/referrals/model/sort'
import type { Employer } from '@/entities/employer/types'
import { employerPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const PAGE_SIZE = 12

export type { EmployerSortKey }

type LayoutMode = 'grid' | 'list'

type EmployersMapViewProps = {
  employers: Employer[]
  count: number
  sort: EmployerSortKey
  onSortChange: (sort: EmployerSortKey) => void
  draftFilters: EmployerFiltersState
  onFiltersChange: (filters: EmployerFiltersState) => void
  onApplySearch: (filters?: EmployerFiltersState) => void
  onResetFilters: () => void
  isLoading?: boolean
  activeFilterCount?: number
}

function EmployersListSkeleton({ layout }: { layout: LayoutMode }) {
  return (
    <div
      className={cn(
        layout === 'grid' ? 'grid grid-cols-1 gap-4 sm:grid-cols-2' : 'flex flex-col gap-3',
      )}
      aria-busy="true"
      aria-live="polite"
    >
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'animate-pulse rounded-2xl border border-freeio-border-soft bg-white',
            layout === 'grid' ? 'h-[280px]' : 'h-[96px]',
          )}
        >
          <div className="flex gap-3 p-4">
            <div className="h-14 w-14 rounded-2xl bg-freeio-hover" />
            <div className="flex-1 space-y-2 pt-1">
              <div className="h-3 w-24 rounded bg-freeio-hover" />
              <div className="h-4 w-3/4 rounded bg-freeio-hover" />
              <div className="h-3 w-full rounded bg-freeio-hover" />
            </div>
          </div>
          {layout === 'grid' ? (
            <div className="mx-4 mt-2 grid grid-cols-2 gap-2">
              <div className="h-14 rounded-xl bg-freeio-hover" />
              <div className="h-14 rounded-xl bg-freeio-hover" />
            </div>
          ) : null}
        </div>
      ))}
      <span className="sr-only">Loading employer results</span>
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
  draftFilters,
  onFiltersChange,
  onApplySearch,
  onResetFilters,
  isLoading = false,
  activeFilterCount = 0,
}: EmployersMapViewProps) {
  const navigate = useNavigate()
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [layout, setLayout] = useState<LayoutMode>('grid')
  const { selectedId, setSelectedId, hoveredId, setHoveredId, itemRefs } =
    useMapResultsInteraction(employers)
  const { page, setPage, totalPages, pageStart, pageEnd, pagedItems } =
    useResultsPagination(employers, PAGE_SIZE)

  function openEmployer(id: string) {
    navigate(employerPath(id))
  }

  return (
    <ResultsSplitView
      rootClassName="flex h-full min-h-0 flex-col"
      asideClassName="bg-freeio-wash lg:w-[48%]"
      toolbarClassName="relative z-30 flex items-center justify-between gap-3 overflow-visible border-b border-freeio-border-soft bg-white px-4 py-3.5 sm:px-5"
      showMapBarClassName="border-t border-freeio-border-soft bg-white p-3 lg:hidden"
      mapPanelClassName="bg-mist lg:w-[52%]"
      toolbarStart={
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            className="relative inline-flex h-10 items-center gap-2 rounded-lg border border-freeio-border bg-white px-3.5 text-sm font-medium text-freeio-ink transition hover:border-freeio hover:text-freeio sm:h-11 sm:px-4 sm:text-[15px]"
          >
            <Filter className="h-4 w-4" aria-hidden />
            Filter
            {activeFilterCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[11px] font-bold text-white">
                {activeFilterCount}
              </span>
            ) : null}
          </button>
          <p className="text-sm text-freeio-muted sm:text-[15px]">
            {count === 0 ? (
              <span className="inline-flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-freeio-subtle" aria-hidden />
                No results
              </span>
            ) : (
              <>
                Showing{' '}
                <span className="font-semibold tabular-nums text-freeio-ink">
                  {pageStart}–{pageEnd}
                </span>{' '}
                of{' '}
                <span className="font-semibold tabular-nums text-freeio-ink">{count}</span>
              </>
            )}
          </p>
        </div>
      }
      toolbarEnd={
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ResultsSortMenu
            options={EMPLOYER_SORT_OPTIONS}
            value={sort}
            onChange={onSortChange}
            clearValue="default"
          />
          <div
            className="inline-flex h-10 items-center rounded-lg border border-freeio-border bg-freeio-surface p-0.5 sm:h-11"
            role="group"
            aria-label="Result layout"
          >
            <button
              type="button"
              aria-pressed={layout === 'grid'}
              onClick={() => setLayout('grid')}
              className={cn(
                'inline-flex h-full items-center gap-1.5 rounded-md px-2.5 text-sm font-semibold transition sm:px-3',
                layout === 'grid'
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-freeio-muted hover:text-freeio-ink',
              )}
            >
              <LayoutGrid className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">Grid</span>
            </button>
            <button
              type="button"
              aria-pressed={layout === 'list'}
              onClick={() => setLayout('list')}
              className={cn(
                'inline-flex h-full items-center gap-1.5 rounded-md px-2.5 text-sm font-semibold transition sm:px-3',
                layout === 'list'
                  ? 'bg-brand text-white shadow-sm'
                  : 'text-freeio-muted hover:text-freeio-ink',
              )}
            >
              <List className="h-3.5 w-3.5" aria-hidden />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>
        </div>
      }
      list={
        isLoading ? (
          <EmployersListSkeleton layout={layout} />
        ) : count === 0 ? (
          <EmployersEmptyState onReset={onResetFilters} />
        ) : (
          <ul
            className={cn(
              layout === 'grid'
                ? 'grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4'
                : 'flex flex-col gap-3',
            )}
          >
            {pagedItems.map((employer, index) => (
              <li
                key={employer.id}
                className="animate-[section-rise_0.4s_ease-out_both]"
                style={{ animationDelay: `${Math.min(index, 7) * 35}ms` }}
              >
                <EmployerMapCard
                  ref={(element) => {
                    itemRefs.current[employer.id] = element
                  }}
                  employer={employer}
                  compact={layout === 'list'}
                  selected={selectedId === employer.id}
                  active={hoveredId === employer.id}
                  onSelect={(id) => {
                    setSelectedId(id)
                    openEmployer(id)
                  }}
                  onHover={setHoveredId}
                />
              </li>
            ))}
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
      scrollResetKey={`${page}-${layout}`}
      map={
        <EmployersMap
          employers={employers}
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelect={setSelectedId}
          onHover={setHoveredId}
        />
      }
      drawer={
        <EmployerFiltersDrawer
          open={filtersOpen}
          onClose={() => setFiltersOpen(false)}
          filters={draftFilters}
          onChange={onFiltersChange}
          onReset={onResetFilters}
          onApply={() => onApplySearch()}
        />
      }
    />
  )
}
