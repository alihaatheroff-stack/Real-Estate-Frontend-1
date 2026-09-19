import { EmployerFiltersFields } from '@/features/referrals/components/EmployerFiltersFields'
import type { EmployerFiltersState } from '@/features/referrals/model/employerFilters'
import { cn } from '@/shared/lib/cn'

export type {
  EmployerFiltersState,
} from '@/features/referrals/model/employerFilters'
export {
  EMPLOYER_DISTANCE_MIN,
  EMPLOYER_DISTANCE_MAX,
  EMPLOYER_DISTANCE_DEFAULT,
} from '@/features/referrals/model/employerFilters'

type EmployerFiltersSidebarProps = {
  filters: EmployerFiltersState
  onChange: (next: EmployerFiltersState) => void
  onSearch: () => void
  className?: string
}

export function EmployerFiltersSidebar({
  filters,
  onChange,
  onSearch,
  className,
}: EmployerFiltersSidebarProps) {
  return (
    <aside
      className={cn(
        'rounded-2xl border border-freeio-border-soft bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]',
        className,
      )}
    >
      <EmployerFiltersFields
        variant="sidebar"
        filters={filters}
        onChange={onChange}
        onSearch={onSearch}
      />
    </aside>
  )
}
