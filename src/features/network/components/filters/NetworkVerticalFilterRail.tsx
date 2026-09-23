import {
  ForumFilterPanel,
  ForumModuleSelect,
  type ForumFiltersState,
} from '@/features/network/components/forums/ForumFilterPanel'
import { cn } from '@/shared/lib/cn'

type NetworkVerticalFilterRailProps = {
  filters: ForumFiltersState
  onChange: (next: ForumFiltersState) => void
  className?: string
}

/**
 * Desktop left-rail: module select pinned above a scrollable vertical filter stack.
 * Height follows the sibling content column (`h-0 min-h-full` trick).
 */
export function NetworkVerticalFilterRail({
  filters,
  onChange,
  className,
}: NetworkVerticalFilterRailProps) {
  return (
    <div
      className={cn(
        'hidden h-0 min-h-full self-stretch overflow-hidden border-r border-line/60 xl:flex xl:flex-col',
        className,
      )}
    >
      <div className="shrink-0 border-b border-line/60 px-5 pb-2 pt-4">
        <ForumModuleSelect filters={filters} onChange={onChange} />
      </div>
      <ForumFilterPanel
        className="h-full min-h-0 max-w-none flex-1"
        filters={filters}
        onChange={onChange}
        showScrollbar
        hideModule
      />
    </div>
  )
}

/**
 * Compact / stacked filters for viewports below the desktop rail breakpoint.
 */
export function NetworkVerticalFilterStack({
  filters,
  onChange,
  className,
}: NetworkVerticalFilterRailProps) {
  return (
    <div className={cn('border-t border-line/60 xl:hidden', className)}>
      <ForumFilterPanel
        className="h-[70vh] max-w-none"
        filters={filters}
        onChange={onChange}
      />
    </div>
  )
}
