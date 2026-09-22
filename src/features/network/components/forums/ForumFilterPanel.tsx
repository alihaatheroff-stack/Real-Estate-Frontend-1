import {
  LandingFilterFields,
  type LandingFilterValues,
  HeroFilterSelect,
} from '@/features/search'
import {
  DEFAULT_FORUM_FILTERS,
  EMPTY_FORUM_FILTERS,
  FORUM_MODULE_OPTIONS,
  forumFiltersActive,
  type ForumFiltersState,
} from '@/features/network/data/forumFilters'
import { ForumServiceTailFields } from '@/features/network/components/forums/ForumServiceTailFields'
import { cn } from '@/shared/lib/cn'

export type { ForumFiltersState }

type ForumFilterPanelProps = {
  filters: ForumFiltersState
  onChange: (next: ForumFiltersState) => void
  className?: string
  /** Show a visible scrollbar (compose mode height-matches the right column). */
  showScrollbar?: boolean
  /** Hide Choose Module when it is rendered outside this panel. */
  hideModule?: boolean
}

function toLandingValues(filters: ForumFiltersState): LandingFilterValues {
  return {
    find: filters.find,
    psp: filters.psp,
    representation: filters.representation,
    financing: filters.financing,
    field: filters.field,
    clientExperience: filters.clientExperience,
    condition: filters.condition,
    vacancy: filters.vacancy,
    propertyTitle: filters.propertyTitle,
    saleType: filters.saleType,
    yourExperience: filters.yourExperience,
    motive: filters.motive,
    language: filters.language,
    percentageShare: filters.percentageShare,
    formOfPayment: filters.formOfPayment,
    priceBand: filters.priceBand,
    zip: filters.zip,
    radius: filters.radius,
  }
}

export function ForumFilterPanel({
  filters: filtersProp,
  onChange,
  className,
  showScrollbar = false,
  hideModule = false,
}: ForumFilterPanelProps) {
  const filters = { ...EMPTY_FORUM_FILTERS, ...filtersProp }
  const hasActive = forumFiltersActive(filters)

  function handleChange<K extends keyof LandingFilterValues>(
    key: K,
    next: LandingFilterValues[K],
  ) {
    let updated: ForumFiltersState = { ...filters, [key]: next }

    if (key === 'psp') {
      const stillAgent = (next as string[]).some(
        (value) => value === 'Agent' || value.startsWith('Agent > '),
      )
      if (!stillAgent) {
        updated = { ...updated, representation: [], financing: [] }
      }
    }

    if (key === 'representation') {
      const stillBuying = (next as string[]).some(
        (value) => value === 'Buying' || value === 'Mortgage',
      )
      if (!stillBuying) {
        updated = { ...updated, financing: [] }
      }
    }

    onChange(updated)
  }

  return (
    <aside
      className={cn(
        'flex h-full min-h-0 w-full max-w-[21rem] shrink-0 flex-col overflow-hidden bg-white',
        className,
      )}
    >
      <div
        className={cn(
          'landing-scroll-pane flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain py-1.5 pl-5 pr-1.5',
          showScrollbar ? 'pr-2' : 'network-hide-scroll',
        )}
      >
        {hasActive ? (
          <div className="flex justify-end px-0.5">
            <button
              type="button"
              onClick={() => onChange(DEFAULT_FORUM_FILTERS)}
              className="shrink-0 text-[11px] font-semibold text-brand hover:underline"
            >
              Clear
            </button>
          </div>
        ) : null}

        {hideModule ? null : (
          <ForumModuleSelect filters={filters} onChange={onChange} />
        )}

        <LandingFilterFields
          hideRepresentation
          hideRecipientExperience
          hideLocation
          experienceLabel="Experience:"
          showExperienceLevel
          searchByAfterFields
          selectedPrefix="Selected: "
          experienceLevel={filters.experienceLevel}
          onExperienceLevelChange={(next) =>
            onChange({ ...filters, experienceLevel: next })
          }
          value={toLandingValues(filters)}
          onChange={handleChange}
        />

        <ForumServiceTailFields filters={filters} onChange={onChange} />
      </div>
    </aside>
  )
}

export function ForumModuleSelect({
  filters,
  onChange,
  className,
}: {
  filters: ForumFiltersState
  onChange: (next: ForumFiltersState) => void
  className?: string
}) {
  const merged = { ...EMPTY_FORUM_FILTERS, ...filters }
  return (
    <div className={cn(className)}>
      <HeroFilterSelect
        compact
        selectedPrefix="Selected: "
        label="Choose Module:"
        placeholder="Selected: Network"
        options={[...FORUM_MODULE_OPTIONS]}
        value={merged.module.length ? merged.module : ['Network']}
        onChange={(next) =>
          onChange({
            ...merged,
            module: next.length ? next : ['Network'],
          })
        }
      />
    </div>
  )
}
