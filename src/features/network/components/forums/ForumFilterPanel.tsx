import { Input } from '@/components/ui/Input'
import { RangeSlider } from '@/components/ui/RangeSlider'
import {
  LandingFilterFields,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
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
    role: filters.role ?? [],
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
    tagSkill: filters.tagSkill ?? [],
    yourExperience: filters.yourExperience,
    experienceLevel: filters.experienceLevel ?? [],
    motive: filters.motive,
    language: filters.language,
    percentageShare: Array.isArray(filters.percentageShare)
      ? filters.percentageShare
      : [],
    willingToTrain: filters.willingToTrain ?? [],
    formOfPayment: filters.formOfPayment,
    references: filters.references ?? [],
    priceBand: filters.priceBand,
    institution: filters.institution ?? [],
    purchaseExperience: filters.purchaseExperience ?? [],
    loanExperience: filters.loanExperience ?? [],
    whichService: filters.whichService ?? [],
    govAgencies: filters.govAgencies ?? [],
    charge: filters.charge ?? [],
    income: filters.income ?? [],
    dti: filters.dti ?? [],
    ltv: filters.ltv ?? [],
    loanTypes: filters.loanTypes ?? [],
    loanRateType: filters.loanRateType ?? [],
    prepaymentPenalty: filters.prepaymentPenalty ?? [],
    timeDuration: filters.timeDuration ?? [],
    lengthToClose: filters.lengthToClose ?? [],
    creditCheck: filters.creditCheck ?? [],
    prSqFt: filters.prSqFt ?? [],
    proof: filters.proof ?? [],
    legalTitle: filters.legalTitle ?? [],
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
  const distance = Number(filters.radius || SERVICE_DISTANCE_MIN)

  function handleChange<K extends keyof LandingFilterValues>(
    key: K,
    next: LandingFilterValues[K],
  ) {
    let updated: ForumFiltersState = { ...filters, [key]: next }

    if (key === 'psp') {
      const psp = next as string[]
      const stillProfile = psp.some(
        (value) =>
          value === 'Agent' ||
          value.startsWith('Agent > ') ||
          value === 'Broker' ||
          value.startsWith('Broker > ') ||
          value === 'Real Estate' ||
          value.startsWith('Real Estate >') ||
          value === 'Executive' ||
          value.startsWith('Executive >'),
      )
      if (!stillProfile) {
        updated = {
          ...updated,
          representation: [],
          financing: [],
          tagSkill: [],
        }
      }
      const stillMortgage = psp.some(
        (value) =>
          value === 'Mortgage' ||
          value.startsWith('Mortgage >') ||
          value === 'Mortgage Consultant' ||
          value.startsWith('Mortgage Consultant') ||
          value === 'Mortgage Originator' ||
          value.startsWith('Mortgage Originator') ||
          value === 'Loan' ||
          value.startsWith('Loan >') ||
          value === 'Loan Executive' ||
          value.startsWith('Loan Executive') ||
          value === 'Loan Officer' ||
          value.startsWith('Loan Officer') ||
          value === 'Loan Originator' ||
          value.startsWith('Loan Originator') ||
          value === 'Loan Processor' ||
          value.startsWith('Loan Processor'),
      )
      if (!stillMortgage) {
        updated = {
          ...updated,
          institution: [],
          purchaseExperience: [],
          loanExperience: [],
          whichService: [],
          govAgencies: [],
          charge: [],
          income: [],
          dti: [],
          ltv: [],
          loanTypes: [],
          loanRateType: [],
          prepaymentPenalty: [],
          timeDuration: [],
          lengthToClose: [],
          creditCheck: [],
        }
      }
    }

    if (key === 'representation') {
      const stillBuying = (next as string[]).some(
        (value) =>
          value === 'Buying' ||
          value === 'All Of The Above' ||
          value.startsWith('Buying >'),
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
          hideLocation
          stopBeforeLanguage
          selectedPrefix="Selected: "
          highlightSelected
          value={toLandingValues(filters)}
          onChange={handleChange}
        />

        <ForumServiceTailFields filters={filters} onChange={onChange} />
      </div>

      <div className="shrink-0 space-y-3 border-t border-line bg-white px-5 py-3">
        <div>
          <h3 className="mb-1.5 text-sm font-semibold text-ink">Zipcode</h3>
          <Input
            name="forum-zip"
            value={filters.zip}
            onChange={(e) => onChange({ ...filters, zip: e.target.value })}
            placeholder="Enter location or ZIP"
            className="text-[13px]"
          />
        </div>
        <div>
          <h3 className="mb-1.5 text-sm font-semibold text-ink">Mile Radius</h3>
          <p className="mb-3 text-[13px] text-muted">Distance: {distance} miles</p>
          <RangeSlider
            min={SERVICE_DISTANCE_MIN}
            max={SERVICE_DISTANCE_MAX}
            value={distance}
            onChange={(miles) => onChange({ ...filters, radius: String(miles) })}
          />
        </div>
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
        highlightSelected
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
