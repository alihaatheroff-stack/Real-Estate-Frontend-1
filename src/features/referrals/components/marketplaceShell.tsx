import { type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftToLine, ChevronDown, ChevronRight, Play, SlidersHorizontal } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'
import { cn } from '@/shared/lib/cn'

const PEACH_WAVE_BG = `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 55c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3Cpath d='M0 25c10-8 20-8 30 0s20 8 30 0 20-8 30 0' fill='none' stroke='%23e8d5cc' stroke-width='1'/%3E%3C/svg%3E")`

type BannerSize = 'default' | 'compact' | 'medium'

const BANNER_SECTION_CLASS: Record<BannerSize, string> = {
  default: 'relative py-6 sm:py-8',
  compact: 'relative py-2.5 sm:py-3',
  medium: 'relative py-4 sm:py-5',
}

type MarketplacePeachBannerProps = {
  children: ReactNode
  size?: BannerSize
  className?: string
  shrink?: boolean
}

/** Shared peach header plane used across marketplace list screens. */
export function MarketplacePeachBanner({
  children,
  size = 'default',
  className,
  shrink = false,
}: MarketplacePeachBannerProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden border-b border-freeio-peach-line bg-freeio-peach',
        shrink && 'shrink-0',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ backgroundImage: PEACH_WAVE_BG }}
      />
      <Section className={BANNER_SECTION_CLASS[size]} containerClassName={MARKETPLACE_PAGE_PAD}>
        {children}
      </Section>
    </div>
  )
}

export type MarketplaceCrumb = {
  label: string
  to?: string
}

type MarketplaceBreadcrumbsProps = {
  crumbs: MarketplaceCrumb[]
  className?: string
}

export function MarketplaceBreadcrumbs({ crumbs, className }: MarketplaceBreadcrumbsProps) {
  return (
    <nav
      className={cn(
        'mb-6 flex flex-wrap items-center gap-1.5 text-sm text-freeio-muted',
        className,
      )}
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1
        return (
          <span key={`${crumb.label}-${index}`} className="contents">
            {index > 0 ? <ChevronRight className="h-3.5 w-3.5" /> : null}
            {crumb.to && !isLast ? (
              <Link to={crumb.to} className="hover:text-freeio-ink">
                {crumb.label}
              </Link>
            ) : (
              <span className={isLast ? 'text-freeio-ink' : undefined}>{crumb.label}</span>
            )}
          </span>
        )
      })}
    </nav>
  )
}

type MarketplaceListHeadingProps = {
  title: string
  description?: ReactNode
  titleClassName?: string
  descriptionClassName?: string
  showHowItWorks?: boolean
  children?: ReactNode
}

export function MarketplaceListHeading({
  title,
  description,
  titleClassName,
  descriptionClassName,
  showHowItWorks = false,
  children,
}: MarketplaceListHeadingProps) {
  return (
    <div className="max-w-2xl">
      <h1
        className={cn(
          'text-3xl font-bold tracking-tight text-freeio-ink sm:text-4xl lg:text-[2.5rem]',
          titleClassName,
        )}
      >
        {title}
      </h1>
      {description ? (
        <p
          className={cn(
            'mt-3 max-w-xl text-base leading-relaxed text-freeio-muted sm:text-lg',
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}
      {showHowItWorks ? <MarketplaceHowItWorksButton /> : null}
      {children}
    </div>
  )
}

export function MarketplaceHowItWorksButton() {
  return (
    <button
      type="button"
      className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-freeio-ink transition hover:opacity-80"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-freeio text-white shadow-md">
        <Play className="h-4 w-4 fill-white" />
      </span>
      How RE NETWORK Works
    </button>
  )
}

type MarketplaceSearchPanelProps = {
  children: ReactNode
  className?: string
}

/** White search card that sits inside the peach banner. */
export function MarketplaceSearchPanel({ children, className }: MarketplaceSearchPanelProps) {
  return (
    <div
      className={cn(
        'mt-8 flex flex-col gap-3 rounded-2xl border border-white/70 bg-white p-3 shadow-soft sm:flex-row sm:items-center',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function MarketplaceSearchButton({
  onClick,
  className,
  children = 'Search',
}: {
  onClick: () => void
  className?: string
  children?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-12 shrink-0 items-center justify-center rounded-xl bg-freeio px-6 text-sm font-semibold text-white transition hover:brightness-95',
        className,
      )}
    >
      {children}
    </button>
  )
}

type SortOption<T extends string> = {
  value: T
  label: string
}

type MarketplaceListSortMenuProps<T extends string> = {
  value: T
  options: SortOption<T>[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onChange: (value: T) => void
}

export function MarketplaceListSortMenu<T extends string>({
  value,
  options,
  open,
  onOpenChange,
  onChange,
}: MarketplaceListSortMenuProps<T>) {
  const sortLabel =
    options.find((option) => option.value === value)?.label ?? 'Sort by (Default)'

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        className="inline-flex h-11 min-w-[11rem] items-center justify-between gap-2 rounded-lg border border-freeio-border bg-white px-4 text-sm font-medium text-freeio-ink transition hover:border-freeio"
      >
        <span className="truncate">{sortLabel}</span>
        <ChevronDown className={cn('h-4 w-4 shrink-0 transition', open && 'rotate-180')} />
      </button>
      {open ? (
        <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-freeio-border-soft bg-white py-1 shadow-soft">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value)
                onOpenChange(false)
              }}
              className={cn(
                'block w-full px-4 py-2.5 text-left text-sm transition hover:bg-freeio-hover',
                value === option.value ? 'font-semibold text-freeio' : 'text-freeio-ink',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}

type MarketplaceResultsToolbarProps = {
  countLabel: ReactNode
  onFilterClick?: () => void
  filterButtonClassName?: string
  showFilter?: boolean
  sortSlot?: ReactNode
  trailing?: ReactNode
  className?: string
}

export function MarketplaceResultsToolbar({
  countLabel,
  onFilterClick,
  filterButtonClassName,
  showFilter = true,
  sortSlot,
  trailing,
  className,
}: MarketplaceResultsToolbarProps) {
  return (
    <div className={cn('mb-6 flex flex-wrap items-center justify-between gap-4', className)}>
      <div className="text-sm text-freeio-muted sm:text-base">{countLabel}</div>
      <div className="flex flex-wrap items-center gap-3">
        {showFilter && onFilterClick ? (
          <button
            type="button"
            onClick={onFilterClick}
            className={cn(
              'inline-flex h-11 items-center gap-2 rounded-lg border border-freeio-border bg-white px-4 text-sm font-medium text-freeio-ink transition hover:border-freeio hover:text-freeio',
              filterButtonClassName,
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>
        ) : null}
        {sortSlot}
        {trailing}
      </div>
    </div>
  )
}

export function MarketplaceShowingCount({ count }: { count: number }) {
  return (
    <>
      Showing all <span className="font-semibold text-freeio-ink">{count}</span> results
    </>
  )
}

type FilterDrawerVariant = 'emphasized' | 'simple'

type MarketplaceFilterDrawerProps = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  /** `emphasized` = jobs-style green close; `simple` = projects mobile style */
  variant?: FilterDrawerVariant
  /** Constrain drawer to mobile breakpoints (projects) */
  mobileOnly?: boolean
  panelWidthClassName?: string
  bodyClassName?: string
}

export function MarketplaceFilterDrawer({
  open,
  onClose,
  title,
  children,
  variant = 'emphasized',
  mobileOnly = false,
  panelWidthClassName = 'w-[min(100%,24rem)]',
  bodyClassName,
}: MarketplaceFilterDrawerProps) {
  if (!open) return null

  const isSimple = variant === 'simple'

  return (
    <div className={cn('fixed inset-0 z-50', mobileOnly && 'lg:hidden')}>
      <button
        type="button"
        aria-label="Close filters"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div
        className={cn(
          'absolute inset-y-0 left-0 flex flex-col bg-white shadow-xl',
          panelWidthClassName,
        )}
      >
        <div
          className={cn(
            'flex items-center justify-between border-b border-freeio-border-soft',
            isSimple ? 'px-4 py-3' : 'px-6 py-5',
          )}
        >
          <h2
            className={cn('font-bold text-freeio-ink', isSimple ? 'text-base' : 'text-xl')}
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'flex items-center justify-center transition',
              isSimple
                ? 'h-9 w-9 rounded-full text-freeio-muted hover:bg-freeio-hover'
                : 'h-10 w-10 rounded-lg bg-freeio-soft text-freeio hover:opacity-90',
            )}
            aria-label="Close"
          >
            <ArrowLeftToLine className="h-5 w-5" />
          </button>
        </div>
        <div
          className={cn(
            'flex-1 overflow-y-auto',
            isSimple ? 'p-4' : 'space-y-6 px-6 pb-8 pt-2',
            bodyClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

export function MarketplaceEmptyState({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-xl border border-freeio-border-soft bg-freeio-surface px-6 py-10 text-center text-freeio-muted">
      {children}
    </p>
  )
}
