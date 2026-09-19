import { useEffect } from 'react'
import { ArrowLeftToLine } from 'lucide-react'
import { EmployerFiltersFields } from '@/features/referrals/components/EmployerFiltersFields'
import type { EmployerFiltersState } from '@/features/referrals/model/employerFilters'


type EmployerFiltersDrawerProps = {
  open: boolean
  onClose: () => void
  filters: EmployerFiltersState
  onChange: (next: EmployerFiltersState) => void
  onReset: () => void
  onApply: () => void
}

export function EmployerFiltersDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
  onApply,
}: EmployerFiltersDrawerProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[1100] flex">
      <aside
        className="relative flex h-full w-full max-w-[400px] flex-col bg-white shadow-2xl animate-drawer-in"
        aria-label="Employer filters"
      >
        <div className="flex items-center justify-between border-b border-freeio-border-soft px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-freeio-ink">All Filters</h2>
            <button
              type="button"
              onClick={onReset}
              className="mt-1 text-[13px] font-medium text-freeio-muted hover:text-freeio hover:underline"
            >
              Reset all
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl transition bg-freeio-soft text-freeio-muted"
            aria-label="Close filters"
          >
            <ArrowLeftToLine className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <EmployerFiltersFields
            variant="drawer"
            filters={filters}
            onChange={onChange}
            onSearch={() => {
              onApply()
              onClose()
            }}
          />
        </div>
      </aside>

      <button
        type="button"
        className="flex-1 bg-ink/45 backdrop-blur-[1px]"
        onClick={onClose}
        aria-label="Close filters overlay"
      />
    </div>
  )
}
