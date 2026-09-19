import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ArrowRightToLine, Filter, List, Map as MapIcon } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

const mapToggleBtnClass =
  'pointer-events-auto absolute top-1/2 z-30 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-blue-600/50 text-white shadow-[0_0_0_6px_#e8ddf8,0_4px_14px_rgb(15_31_26_/_0.25)] backdrop-blur-[2px] transition hover:bg-blue-600/70 lg:flex'

/** Dual arrows: up then down — Low to High / ascending. */
function SortAscIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M5 12.5V3.5M5 3.5L2.75 5.75M5 3.5L7.25 5.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 3.5V12.5M11 12.5L8.75 10.25M11 12.5L13.25 10.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Dual arrows: down then up — High to Low / descending. */
function SortDescIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M5 3.5V12.5M5 12.5L2.75 10.25M5 12.5L7.25 10.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 12.5V3.5M11 3.5L8.75 5.75M11 3.5L13.25 5.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Newest — clock with spark. */
function SortNewestIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8.25" r="5.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 5.75V8.5L9.75 9.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.75 2.25L12.35 3.65L13.75 4.25L12.35 4.85L11.75 6.25L11.15 4.85L9.75 4.25L11.15 3.65L11.75 2.25Z"
        fill="currentColor"
      />
    </svg>
  )
}

/** Oldest — simple clock / history feel. */
function SortOldestIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 5V8H10.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.25 4.25 2 5.5M2 5.5 3.25 6.75"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Random — shuffle. */
function SortRandomIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M2.5 4.5H5.2c.7 0 1.35.35 1.75.95L10 11.5c.4.6 1.05.95 1.75.95H13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.75 9.75 13.5 11.5 11.75 13.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 11.5H5.2c.7 0 1.35-.35 1.75-.95L8 9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 4.5h1.75c.7 0 1.35.35 1.75.95"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.75 2.75 13.5 4.5 11.75 6.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Default / recommended. */
function SortDefaultIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 2.5 9.7 6.1 13.6 6.45 10.6 9.05 11.5 12.9 8 10.85 4.5 12.9 5.4 9.05 2.4 6.45 6.3 6.1 8 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function sortOptionIcon(value: string): ReactNode {
  switch (value) {
    case 'price-asc':
    case 'projects-asc':
      return <SortAscIcon />
    case 'price-desc':
    case 'projects-desc':
      return <SortDescIcon />
    case 'newest':
      return <SortNewestIcon />
    case 'oldest':
      return <SortOldestIcon />
    case 'random':
      return <SortRandomIcon />
    case 'default':
      return <SortDefaultIcon />
    default:
      return null
  }
}

export type ResultsSplitViewProps = {
  /** Outer flex column wrapping the split panes. */
  rootClassName: string
  /** Classes on the inner row that holds aside + map (`flex min-h-0 flex-1` …). */
  splitRowClassName?: string
  /** Extra classes on the list aside (width + background). */
  asideClassName: string
  /** Toolbar row under the filter/count header. */
  toolbarClassName: string
  /** Mobile “Show Map” bar under the list. */
  showMapBarClassName: string
  /** Right-hand map panel sizing/background. */
  mapPanelClassName: string
  /**
   * Optional inner frame around the map (e.g. services black border).
   * When set, `map` is wrapped; otherwise `map` is a direct child of the panel.
   */
  mapInnerClassName?: string
  toolbarStart: ReactNode
  toolbarEnd: ReactNode
  list: ReactNode
  /** Optional pagination row between list and mobile Show Map. */
  pagination?: ReactNode
  /** When this value changes (e.g. page number), the list pane scrolls to the top. */
  scrollResetKey?: number | string
  map: ReactNode
  drawer: ReactNode
  /** Desktop: hide the map so the list expands. Open by default. */
  collapsibleMap?: boolean
  mapOpen?: boolean
  onMapOpenChange?: (open: boolean) => void
  /** Keep the filter/sort bar pinned while the list scrolls. */
  stickyToolbar?: boolean
}

/**
 * Shared list/map split chrome: mobile list↔map toggle, aside + map panes.
 * Entity-specific cards, maps, filters, and sort controls stay as slots.
 */
export function ResultsSplitView({
  rootClassName,
  splitRowClassName = 'flex min-h-0 flex-1',
  asideClassName,
  toolbarClassName,
  showMapBarClassName,
  mapPanelClassName,
  mapInnerClassName,
  toolbarStart,
  toolbarEnd,
  list,
  pagination,
  scrollResetKey,
  map,
  drawer,
  collapsibleMap = false,
  mapOpen,
  onMapOpenChange,
  stickyToolbar = false,
}: ResultsSplitViewProps) {
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')
  const [internalMapOpen, setInternalMapOpen] = useState(true)
  const listRef = useRef<HTMLDivElement>(null)
  const isMapOpen = mapOpen ?? internalMapOpen

  function setIsMapOpen(open: boolean) {
    onMapOpenChange?.(open)
    if (mapOpen === undefined) setInternalMapOpen(open)
  }

  useEffect(() => {
    if (scrollResetKey === undefined) return
    listRef.current?.scrollTo({ top: 0, behavior: 'auto' })
  }, [scrollResetKey])

  return (
    <>
      <div className={rootClassName}>
        <div className={cn(splitRowClassName, 'relative', collapsibleMap && 'lg:overflow-visible')}>
          <aside
            className={cn(
              'relative flex min-h-0 w-full flex-col border-r border-line',
              asideClassName,
              stickyToolbar && 'overflow-hidden',
              mobileView === 'map' && 'hidden lg:flex',
              collapsibleMap && !isMapOpen && 'lg:!w-full lg:border-r-0',
            )}
          >
            {stickyToolbar ? (
              <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto">
                <div
                  className={cn(
                    'sticky top-0 z-40 shrink-0 shadow-[0_1px_0_rgb(15_31_26_/_0.06)]',
                    toolbarClassName,
                  )}
                >
                  {toolbarStart}
                  {toolbarEnd}
                </div>
                <div className="px-4 py-4 sm:px-5">{list}</div>
              </div>
            ) : (
              <>
                <div className={toolbarClassName}>
                  {toolbarStart}
                  {toolbarEnd}
                </div>
                <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                  {list}
                </div>
              </>
            )}

            {pagination}

            <div className={showMapBarClassName}>
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
              'relative min-h-[320px] flex-1 lg:min-h-0',
              collapsibleMap && isMapOpen ? 'overflow-visible' : 'overflow-hidden',
              mapPanelClassName,
              mobileView === 'list' && 'hidden lg:block',
              collapsibleMap && !isMapOpen && 'lg:!hidden',
            )}
          >
            {mobileView === 'map' || isMapOpen || !collapsibleMap ? (
              mapInnerClassName ? (
                <div className={cn(mapInnerClassName, 'z-0')}>{map}</div>
              ) : (
                map
              )
            ) : null}

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

            {collapsibleMap && isMapOpen ? (
              <button
                type="button"
                aria-label="Hide map"
                aria-expanded
                onClick={() => setIsMapOpen(false)}
                className={cn(mapToggleBtnClass, 'left-0 -translate-x-1/2')}
              >
                <ArrowRight className="h-5 w-5" strokeWidth={2.4} />
              </button>
            ) : null}
          </div>

          {collapsibleMap && !isMapOpen ? (
            <button
              type="button"
              aria-label="Show map"
              aria-expanded={false}
              onClick={() => setIsMapOpen(true)}
              className={cn(mapToggleBtnClass, 'right-6')}
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={2.4} />
            </button>
          ) : null}
        </div>
      </div>

      {drawer}
    </>
  )
}

type SortOption<T extends string> = { value: T; label: string }

type ResultsSortMenuProps<T extends string> = {
  options: readonly SortOption<T>[]
  value: T
  onChange: (value: T) => void
  /** Value used when unchecking the active option (usually `'default'`). */
  clearValue: T
  /** When true, show the active option after “Sort by:”. */
  showSelectedLabel?: boolean
}

/** Hover select-style sort control used by provider and employer map views. */
export function ResultsSortMenu<T extends string>({
  options,
  value,
  onChange,
  clearValue,
  showSelectedLabel = false,
}: ResultsSortMenuProps<T>) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const selectedLabel = options.find((option) => option.value === value)?.label
  const triggerLabel =
    showSelectedLabel && selectedLabel ? `Sort by: ${selectedLabel}` : 'Sort by'

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    if (open) {
      document.addEventListener('mousedown', onPointerDown)
      document.addEventListener('keydown', onKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function toggleForTouch() {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    setOpen((next) => !next)
  }

  return (
    <div
      ref={rootRef}
      className={cn('results-sort-select shrink-0', open && 'is-open')}
    >
      <button
        type="button"
        className="selected"
        onClick={toggleForTouch}
        aria-label="Sort by"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="selected-label">{triggerLabel}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 512 512"
          className="arrow"
          aria-hidden
        >
          <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
        </svg>
      </button>

      <div className="options" role="listbox" aria-label="Sort options">
        {options.map((option) => {
          const icon = sortOptionIcon(option.value)
          const checked = value === option.value

          return (
            <div key={option.value} title={option.label}>
              <button
                type="button"
                role="option"
                aria-selected={checked}
                className={cn('option', checked && 'is-active')}
                onClick={(event) => {
                  onChange(checked ? clearValue : option.value)
                  setOpen(false)
                  event.currentTarget.blur()
                }}
              >
                {icon ? (
                  <span className="option-icon" aria-hidden>
                    {icon}
                  </span>
                ) : null}
                <span>{option.label}</span>
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

type ResultsPaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ResultsPagination({
  page,
  totalPages,
  onPageChange,
}: ResultsPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 border-t border-line px-4 py-3">
      {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          onClick={() => onPageChange(pageNumber)}
          className={cn(
            'inline-flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-semibold transition',
            pageNumber === page
              ? 'border-brand bg-brand text-white'
              : 'border-line bg-paper text-ink hover:border-brand/40',
          )}
        >
          {pageNumber}
        </button>
      ))}
      <span
        className="inline-flex h-9 items-center px-1 text-sm font-semibold tracking-widest text-muted"
        aria-hidden
      >
        …
      </span>
      <span
        className="inline-flex h-9 min-w-9 cursor-default items-center justify-center rounded-lg border border-line bg-paper px-3 text-sm font-semibold text-muted"
        aria-hidden
      >
        10
      </span>
      <span
        className="inline-flex h-9 items-center px-1 text-sm font-semibold tracking-widest text-muted"
        aria-hidden
      >
        …
      </span>
    </div>
  )
}

type ResultsFilterButtonProps = {
  onClick: () => void
  variant?: 'box' | 'underline'
}

export function ResultsFilterButton({ onClick, variant = 'box' }: ResultsFilterButtonProps) {
  if (variant === 'underline') {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group inline-flex items-center gap-1.5 border-0 border-b-2 border-ink/35 bg-transparent py-0.5 text-sm font-semibold leading-none text-ink outline-none transition hover:border-brand"
      >
        Filter
        <ArrowRightToLine
          aria-hidden
          className="size-4 shrink-0 text-ink/70 transition group-hover:text-brand"
          strokeWidth={2.2}
        />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-11 items-center gap-2 rounded-lg border border-freeio-border bg-white px-4 text-[15px] font-medium text-freeio-ink transition hover:border-freeio hover:text-freeio"
    >
      Filter
      <Filter className="h-4 w-4" />
    </button>
  )
}
