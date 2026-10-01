import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { Input } from '@/components/ui/Input'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { ResultsBelowLanguageFields } from '@/features/referrals/components/filters/ResultsBelowLanguageFields'
import {
  DEFAULT_FILTERS,
  FIND_FILTER_OPTIONS,
  HeroFilterSelect,
  LANGUAGE_BY_LETTER,
  LandingFilterFields,
  PSP_BY_LETTER,
  PSP_NESTED_TREES,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
  joinCsv,
  splitCsv,
  type HeroFiltersState,
  type LandingFilterValues,
} from '@/features/search'
import { cn } from '@/shared/lib/cn'
import {
  ADVERTISE_MODULES,
  ADVERTISE_OTHER_WEBSITES_OPTIONS,
  ADVERTISE_TIME_OPTIONS,
  AGE_REQUIREMENT_OPTIONS,
  BANNER_SIZE_OPTIONS,
  BANNER_VIDEO_NESTED_OPTIONS,
  CROWDFUND_AD_OPTIONS,
  GEOGRAPHICS_STYLE_OPTIONS,
  LC_ECOSYSTEM_AD_OPTIONS,
  NETWORK_AD_OPTIONS,
  VIDEO_LENGTH_OPTIONS,
} from '@/features/advertise/data/advertiseFilterOptions'
import {
  PREVIEW_PAGE_GROUPS,
  placementsForPage,
} from '@/features/advertise/data/advertisePreviewPlacement'

type AdvertiseFilters = {
  module: string[]
  ageRequirements: string[]
  whatTime: string[]
  otherWebsites: string[]
  lcEcosystem: string[]
  geographicsStyle: string[]
  bannerSize: string[]
  videoLength: string[]
  customVideoSeconds: string
  customBannerWidth: string
  customBannerHeight: string
  crowdfund: string[]
  network: string[]
}

export type { AdvertiseFilters }

export const EMPTY_ADVERTISE_FILTERS: AdvertiseFilters = {
  module: [],
  ageRequirements: [],
  whatTime: [],
  otherWebsites: [],
  lcEcosystem: [],
  geographicsStyle: [],
  bannerSize: [],
  videoLength: [],
  customVideoSeconds: '',
  customBannerWidth: '300',
  customBannerHeight: '250',
  crowdfund: [],
  network: [],
}

const EMPTY_FILTERS = EMPTY_ADVERTISE_FILTERS

function toLandingValues(filters: HeroFiltersState): LandingFilterValues {
  const findLabels = splitCsv(filters.find).map((value) => {
    if (value === 'service') return 'Service'
    if (value === 'profile') return 'Profile'
    if (value === 'agency') return 'Office'
    return value
  })

  return {
    role: splitCsv(filters.role ?? ''),
    find: findLabels,
    psp: splitCsv(filters.pspCategory),
    representation: splitCsv(filters.representation),
    financing: splitCsv(filters.financing),
    field: splitCsv(filters.field),
    clientExperience: splitCsv(filters.clientExperience),
    condition: splitCsv(filters.condition),
    vacancy: splitCsv(filters.vacancy),
    propertyTitle: splitCsv(filters.propertyTitle),
    saleType: splitCsv(filters.saleType),
    tagSkill: splitCsv(filters.tagSkill ?? ''),
    yourExperience: splitCsv(filters.yourExperience),
    experienceLevel: splitCsv(filters.experienceLevel ?? ''),
    motive: splitCsv(filters.motive),
    language: splitCsv(filters.language),
    percentageShare: splitCsv(filters.percentageShare),
    willingToTrain: splitCsv(filters.willingToTrain),
    formOfPayment: splitCsv(filters.formOfPayment),
    references: splitCsv(filters.referral),
    priceBand: splitCsv(filters.priceBand),
    institution: splitCsv(filters.institution ?? ''),
    purchaseExperience: splitCsv(filters.purchaseExperience ?? ''),
    loanExperience: splitCsv(filters.loanExperience ?? ''),
    whichService: splitCsv(filters.whichService ?? ''),
    govAgencies: splitCsv(filters.govAgencies ?? ''),
    charge: splitCsv(filters.charge ?? ''),
    income: splitCsv(filters.income ?? ''),
    dti: splitCsv(filters.dti ?? ''),
    ltv: splitCsv(filters.ltv ?? ''),
    loanTypes: splitCsv(filters.loanTypes ?? ''),
    loanRateType: splitCsv(filters.loanRateType ?? ''),
    prepaymentPenalty: splitCsv(filters.prepaymentPenalty ?? ''),
    timeDuration: splitCsv(filters.timeDuration ?? ''),
    lengthToClose: splitCsv(filters.lengthToClose ?? ''),
    creditCheck: splitCsv(filters.creditCheck ?? ''),
    prSqFt: splitCsv(filters.prSqFt ?? ''),
    proof: splitCsv(filters.proof ?? ''),
    legalTitle: splitCsv(filters.legalTitle ?? ''),
    zip: filters.zip,
    radius: filters.radius,
  }
}

function isMortgagePsp(list: string[]) {
  return list.some(
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
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="pt-1 text-[11px] font-bold uppercase tracking-wide text-ink">
      {children}
    </p>
  )
}

/** Ballot-style checked box — matches register / landing filter menus. */
function CheckedBallotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className} aria-hidden>
      <path
        d="M12.25 3.1H4.6A2.1 2.1 0 0 0 2.5 5.2v6.2A2.1 2.1 0 0 0 4.6 13.5h6.2a2.1 2.1 0 0 0 2.1-2.1V7.15"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.35 8.05 6.9 10.55 13.55 2.85"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PreviewOptionCheck({ checked }: { checked: boolean }) {
  if (checked) {
    return <CheckedBallotIcon className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
  }
  return (
    <span
      className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded-[4px] border-[1.55px] border-ink/40 bg-white"
      aria-hidden
    />
  )
}

type InlinePreviewOption = {
  value: string
  label: string
  depth?: number
}

type InlinePreviewGroup = {
  label: string
  options: InlinePreviewOption[]
}

/** Landing/register-style in-flow select: label + trigger + options in one shell. */
function InlinePreviewSelect({
  name,
  label,
  value,
  onChange,
  placeholder,
  groups,
  flatOptions,
  disabled = false,
  listLabel,
}: {
  name: string
  label: string
  value: string
  onChange: (next: string) => void
  placeholder: string
  groups?: InlinePreviewGroup[]
  flatOptions?: InlinePreviewOption[]
  disabled?: boolean
  listLabel: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const selectedLabel = (() => {
    if (!value) return ''
    if (flatOptions) {
      return flatOptions.find((option) => option.value === value)?.label ?? value
    }
    for (const group of groups ?? []) {
      const match = group.options.find((option) => option.value === value)
      if (match) return `${group.label} · ${match.label}`
    }
    return value
  })()

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  function pick(next: string) {
    onChange(next)
    setOpen(false)
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        'w-full overflow-hidden rounded-lg border bg-white shadow-sm transition',
        disabled && 'pointer-events-none opacity-55',
        open && !disabled ? 'border-brand' : 'border-ink/15',
      )}
    >
      <p className="px-3 pt-2 text-sm font-bold leading-snug text-ink">{label}</p>
      <button
        type="button"
        name={name}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex h-9 w-full items-center justify-between gap-2 rounded-none border-0 bg-transparent px-3 text-left text-sm text-ink outline-none disabled:cursor-not-allowed"
      >
        <span
          className={cn(
            'min-w-0 truncate',
            value ? 'font-medium text-ink' : 'text-muted',
          )}
        >
          {selectedLabel || placeholder}
        </span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-muted" aria-hidden />
        )}
      </button>

      {open && !disabled ? (
        <>
          <div className="mx-auto h-px w-[70%] bg-ink" aria-hidden />
          <div
            role="listbox"
            aria-label={listLabel}
            className="relative max-h-56 overflow-y-auto py-1"
          >
            {groups
              ? groups.map((group) => (
                  <div key={group.label} className="pt-1">
                    <p className="px-3 py-1 text-sm font-bold text-ink">{group.label}</p>
                    {group.options.map((option) => {
                      const selected = value === option.value
                      return (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={selected}
                          onClick={() => pick(option.value)}
                          className={cn(
                            'group flex w-full items-start gap-2 py-1.5 text-left text-sm text-ink transition-colors hover:bg-ink/5',
                            option.depth ? 'pl-10 pr-3' : 'px-3 pl-7',
                          )}
                        >
                          <PreviewOptionCheck checked={selected} />
                          <span
                            className={cn(
                              'min-w-0 leading-snug group-hover:underline group-hover:decoration-ink group-hover:underline-offset-4',
                              selected && 'font-medium',
                            )}
                          >
                            {option.label}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                ))
              : null}

            {flatOptions
              ? flatOptions.map((option) => {
                  const selected = value === option.value
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => pick(option.value)}
                      className="group flex w-full items-start gap-2 px-3 py-1.5 text-left text-sm text-ink transition-colors hover:bg-ink/5"
                    >
                      <PreviewOptionCheck checked={selected} />
                      <span
                        className={cn(
                          'min-w-0 leading-snug group-hover:underline group-hover:decoration-ink group-hover:underline-offset-4',
                          selected && 'font-medium',
                        )}
                      >
                        {option.label}
                      </span>
                    </button>
                  )
                })
              : null}
          </div>
        </>
      ) : null}
    </div>
  )
}

export function AdvertiseFilterPanel({
  className,
  style,
  filters: filtersProp,
  onFiltersChange,
  onBannerSizeHover,
  previewPage = '',
  previewPlacement = '',
  onPreviewPageChange,
  onPreviewPlacementChange,
}: {
  className?: string
  style?: CSSProperties
  filters?: AdvertiseFilters
  onFiltersChange?: (next: AdvertiseFilters) => void
  /** Temporary preview while hovering an Ad-Type option (null = clear). */
  onBannerSizeHover?: (value: string | null) => void
  /** Temporary page-context preview filters (separate from targeting). */
  previewPage?: string
  previewPlacement?: string
  onPreviewPageChange?: (page: string) => void
  onPreviewPlacementChange?: (placement: string) => void
}) {
  const [internalFilters, setInternalFilters] = useState<AdvertiseFilters>(EMPTY_FILTERS)
  const [serviceFilters, setServiceFilters] = useState<HeroFiltersState>(DEFAULT_FILTERS)
  const filters = filtersProp ?? internalFilters
  const distance = Number(serviceFilters.radius || SERVICE_DISTANCE_MIN)
  const placementOptions = placementsForPage(previewPage)

  function setFilter<K extends keyof AdvertiseFilters>(key: K, next: AdvertiseFilters[K]) {
    const updated = { ...filters, [key]: next }
    if (onFiltersChange) onFiltersChange(updated)
    else setInternalFilters(updated)
  }

  function handleLandingChange<K extends keyof LandingFilterValues>(
    key: K,
    next: LandingFilterValues[K],
  ) {
    setServiceFilters((prev) => {
      if (key === 'zip') return { ...prev, zip: next as string }
      if (key === 'radius') return { ...prev, radius: next as string }

      const list = next as string[]
      if (key === 'find') {
        const mapped = list.map((label) => {
          if (label === 'Service') return 'service'
          if (label === 'Profile') return 'profile'
          if (label === 'Office') return 'agency'
          return label
        })
        return { ...prev, find: joinCsv(mapped) }
      }

      if (key === 'psp') {
        const updated: HeroFiltersState = { ...prev, pspCategory: joinCsv(list) }
        const stillAgentProfile = list.some(
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
        if (!stillAgentProfile) {
          updated.representation = ''
          updated.financing = ''
          updated.tagSkill = ''
        }
        if (!isMortgagePsp(list)) {
          updated.institution = ''
          updated.purchaseExperience = ''
          updated.loanExperience = ''
          updated.whichService = ''
          updated.govAgencies = ''
          updated.charge = ''
          updated.income = ''
          updated.dti = ''
          updated.ltv = ''
          updated.loanTypes = ''
          updated.loanRateType = ''
          updated.prepaymentPenalty = ''
          updated.timeDuration = ''
          updated.lengthToClose = ''
          updated.creditCheck = ''
        }
        return updated
      }

      if (key === 'representation') {
        return { ...prev, representation: joinCsv(list), financing: '' }
      }

      const heroKey =
        key === 'references' ? 'referral' : (key as keyof HeroFiltersState)
      return { ...prev, [heroKey]: joinCsv(list) }
    })
  }

  function setServiceList(key: keyof HeroFiltersState, next: string[]) {
    setServiceFilters((prev) => ({ ...prev, [key]: joinCsv(next) }))
  }

  return (
    <aside
      style={style}
      className={cn(
        'flex min-h-0 w-full max-w-[21rem] shrink-0 flex-col overflow-hidden rounded-xl border border-line bg-mist/50',
        className,
      )}
    >
      <div className="network-hide-scroll flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto overscroll-contain px-3 py-3">
      {/* Temporary: page + placement for live on-page preview — keep separate from targeting filters below */}
      <div className="w-full shrink-0 space-y-2 rounded-lg border border-brand/20 bg-white/80 p-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-ink">
          Preview on page
        </p>
        <InlinePreviewSelect
          name="previewPage"
          label="Choose Page"
          listLabel="Choose Page"
          value={previewPage}
          onChange={(next) => onPreviewPageChange?.(next)}
          placeholder="Select a page…"
          groups={PREVIEW_PAGE_GROUPS.map((group) => ({
            label: group.label,
            options: group.pages.map((page) => ({
              value: page.value,
              label: page.label,
              depth: page.depth,
            })),
          }))}
        />
        <InlinePreviewSelect
          name="previewPlacement"
          label="Placement"
          listLabel="Placement"
          value={previewPlacement}
          onChange={(next) => onPreviewPlacementChange?.(next)}
          placeholder={
            previewPage ? 'Select placement…' : 'Choose a page first…'
          }
          flatOptions={placementOptions.map((option) => ({
            value: option.value,
            label: option.label,
          }))}
          disabled={!previewPage || placementOptions.length === 0}
        />
      </div>

      <div className="w-full shrink-0">
        <p className="text-sm font-bold leading-snug text-ink">Ad-Type:</p>
        <div
          className="mt-1 space-y-0.5"
          role="radiogroup"
          aria-label="Ad-Type"
          onMouseLeave={() => onBannerSizeHover?.(null)}
        >
          {BANNER_SIZE_OPTIONS.map((option) => {
            if (option === 'Video') {
              const videoSelected = filters.bannerSize.some((value) =>
                value.startsWith('Video > '),
              )
              return (
                <div key={option}>
                  <p
                    className={cn(
                      'cursor-default py-1.5 text-sm leading-snug text-ink hover:underline hover:decoration-ink hover:underline-offset-4',
                      videoSelected && 'font-medium',
                    )}
                    onMouseEnter={() => onBannerSizeHover?.('Video > Video')}
                  >
                    {option}
                  </p>
                  <div className="ml-4 space-y-0.5 border-l border-ink/15 pl-3">
                    {BANNER_VIDEO_NESTED_OPTIONS.map((child) => {
                      const value = `Video > ${child}`
                      const checked = filters.bannerSize.includes(value)
                      return (
                        <label
                          key={value}
                          className="group flex w-full cursor-pointer items-start gap-x-3"
                          onMouseEnter={() => onBannerSizeHover?.(value)}
                        >
                          <span className="inline-flex items-center justify-center self-start py-1.5 pl-0.5">
                            <span
                              className={cn(
                                'inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-[1.55px]',
                                checked ? 'border-ink' : 'border-ink/40 bg-white',
                              )}
                              aria-hidden
                            >
                              {checked ? (
                                <span className="h-2 w-2 rounded-full bg-ink" />
                              ) : null}
                            </span>
                          </span>
                          <input
                            type="radio"
                            name="advertise-banner-size"
                            value={value}
                            checked={checked}
                            onChange={() => setFilter('bannerSize', [value])}
                            className="sr-only"
                          />
                          <span
                            className={cn(
                              'min-w-0 flex-1 whitespace-normal break-words py-1.5 pr-1 text-left text-sm leading-snug text-ink group-hover:underline group-hover:decoration-ink group-hover:underline-offset-4',
                              checked && 'font-medium',
                            )}
                          >
                            {child}
                          </span>
                        </label>
                      )
                    })}

                    <div className="pt-1">
                      <p className="py-1 text-sm font-medium leading-snug text-ink">
                        How Long:
                      </p>
                      <div
                        className="space-y-0.5"
                        role="radiogroup"
                        aria-label="Video How Long"
                      >
                        {VIDEO_LENGTH_OPTIONS.map((length) => {
                          const checked = filters.videoLength.includes(length)
                          const isCustom = length === 'Custom Length'
                          return (
                            <div key={length}>
                              <label className="group flex w-full cursor-pointer items-start gap-x-3">
                                <span className="inline-flex items-center justify-center self-start py-1.5 pl-0.5">
                                  <span
                                    className={cn(
                                      'inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-[1.55px]',
                                      checked ? 'border-ink' : 'border-ink/40 bg-white',
                                    )}
                                    aria-hidden
                                  >
                                    {checked ? (
                                      <span className="h-2 w-2 rounded-full bg-ink" />
                                    ) : null}
                                  </span>
                                </span>
                                <input
                                  type="radio"
                                  name="advertise-video-length"
                                  value={length}
                                  checked={checked}
                                  onChange={() => setFilter('videoLength', [length])}
                                  className="sr-only"
                                />
                                <span
                                  className={cn(
                                    'min-w-0 flex-1 whitespace-normal break-words py-1.5 pr-1 text-left text-sm leading-snug text-ink group-hover:underline group-hover:decoration-ink group-hover:underline-offset-4',
                                    checked && 'font-medium',
                                  )}
                                >
                                  {length}
                                </span>
                              </label>
                              {isCustom && checked ? (
                                <div className="mb-1 ml-7 mt-0.5">
                                  <Input
                                    name="advertise-custom-video-seconds"
                                    type="number"
                                    min={1}
                                    inputMode="numeric"
                                    value={filters.customVideoSeconds}
                                    onChange={(e) =>
                                      setFilter('customVideoSeconds', e.target.value)
                                    }
                                    placeholder="Seconds"
                                    className="h-9 text-[13px]"
                                  />
                                </div>
                              ) : null}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }

            if (option === 'Custom') {
              const checked = filters.bannerSize.includes('Custom')
              return (
                <div key={option}>
                  <label
                    className="group flex w-full cursor-pointer items-start gap-x-3"
                    onMouseEnter={() => onBannerSizeHover?.('Custom')}
                  >
                    <span className="inline-flex items-center justify-center self-start py-1.5 pl-0.5">
                      <span
                        className={cn(
                          'inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-[1.55px]',
                          checked ? 'border-ink' : 'border-ink/40 bg-white',
                        )}
                        aria-hidden
                      >
                        {checked ? <span className="h-2 w-2 rounded-full bg-ink" /> : null}
                      </span>
                    </span>
                    <input
                      type="radio"
                      name="advertise-banner-size"
                      value="Custom"
                      checked={checked}
                      onChange={() => setFilter('bannerSize', ['Custom'])}
                      className="sr-only"
                    />
                    <span
                      className={cn(
                        'min-w-0 flex-1 whitespace-normal break-words py-1.5 pr-1 text-left text-sm leading-snug text-ink group-hover:underline group-hover:decoration-ink group-hover:underline-offset-4',
                        checked && 'font-medium',
                      )}
                    >
                      Custom
                    </span>
                  </label>
                  {checked ? (
                    <div className="mb-1 ml-7 mt-0.5 grid grid-cols-2 gap-2">
                      <Input
                        name="advertise-custom-width"
                        type="number"
                        min={1}
                        inputMode="numeric"
                        value={filters.customBannerWidth}
                        onChange={(e) => setFilter('customBannerWidth', e.target.value)}
                        placeholder="Width"
                        className="h-9 text-[13px]"
                        label="Width (px)"
                      />
                      <Input
                        name="advertise-custom-height"
                        type="number"
                        min={1}
                        inputMode="numeric"
                        value={filters.customBannerHeight}
                        onChange={(e) => setFilter('customBannerHeight', e.target.value)}
                        placeholder="Height"
                        className="h-9 text-[13px]"
                        label="Height (px)"
                      />
                    </div>
                  ) : null}
                </div>
              )
            }

            const checked = filters.bannerSize.includes(option)
            return (
              <label
                key={option}
                className="group flex w-full cursor-pointer items-start gap-x-3"
                onMouseEnter={() => onBannerSizeHover?.(option)}
              >
                <span className="inline-flex items-center justify-center self-start py-1.5 pl-0.5">
                  <span
                    className={cn(
                      'inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-[1.55px]',
                      checked ? 'border-ink' : 'border-ink/40 bg-white',
                    )}
                    aria-hidden
                  >
                    {checked ? <span className="h-2 w-2 rounded-full bg-ink" /> : null}
                  </span>
                </span>
                <input
                  type="radio"
                  name="advertise-banner-size"
                  value={option}
                  checked={checked}
                  onChange={() => setFilter('bannerSize', [option])}
                  className="sr-only"
                />
                <span
                  className={cn(
                    'min-w-0 flex-1 whitespace-normal break-words py-1.5 pr-1 text-left text-sm leading-snug text-ink group-hover:underline group-hover:decoration-ink group-hover:underline-offset-4',
                    checked && 'font-medium',
                  )}
                >
                  {option}
                </span>
              </label>
            )
          })}
        </div>
      </div>

      <HeroFilterSelect
        compact
        label="A-Z Psp's: "
        placeholder="Ex. (Architect, Lawn Service, etc)"
        optionsByLetter={PSP_BY_LETTER}
        nestedTrees={PSP_NESTED_TREES}
        showLetterSuggest
        value={splitCsv(serviceFilters.pspCategory)}
        onChange={(next) => handleLandingChange('psp', next)}
      />

      <HeroFilterSelect
        compact
        label="Search By: "
        placeholder="Ex. (Service, Profile, Office)"
        options={[...FIND_FILTER_OPTIONS]}
        value={toLandingValues(serviceFilters).find}
        onChange={(next) => handleLandingChange('find', next)}
      />

      <HeroFilterSelect
        compact
        label="Choose Module:"
        placeholder="Ex. (Referral, Crowdfunding, etc.)"
        options={[...ADVERTISE_MODULES]}
        value={filters.module}
        onChange={(next) => setFilter('module', next)}
      />

      <HeroFilterSelect
        compact
        label="Age Requirements:"
        placeholder="Ex. (25–34, 35–44, etc.)"
        options={[...AGE_REQUIREMENT_OPTIONS]}
        value={filters.ageRequirements}
        onChange={(next) => setFilter('ageRequirements', next)}
      />

      <HeroFilterSelect
        compact
        label="Time:"
        placeholder="Ex. (Sunday, Monday, etc.)"
        options={[...ADVERTISE_TIME_OPTIONS]}
        value={filters.whatTime}
        onChange={(next) => setFilter('whatTime', next)}
      />

      <HeroFilterSelect
        compact
        label="Future: Advertise other people's websites?"
        placeholder="Ex. (Yes — Future, No, etc.)"
        options={[...ADVERTISE_OTHER_WEBSITES_OPTIONS]}
        value={filters.otherWebsites}
        onChange={(next) => setFilter('otherWebsites', next)}
      />

      <HeroFilterSelect
        compact
        label="Advertise inside LC Eco-System features & platforms?"
        placeholder="Ex. (Yes, No, Learn More, etc.)"
        options={[...LC_ECOSYSTEM_AD_OPTIONS]}
        value={filters.lcEcosystem}
        onChange={(next) => setFilter('lcEcosystem', next)}
      />

      <HeroFilterSelect
        compact
        label="Geographics:"
        placeholder="Ex. (Zillow Style, Map Overlay, etc.)"
        options={[...GEOGRAPHICS_STYLE_OPTIONS]}
        value={filters.geographicsStyle}
        onChange={(next) => setFilter('geographicsStyle', next)}
      />

      <SectionLabel>Module Placements</SectionLabel>

      <HeroFilterSelect
        compact
        label="Crowdfund:"
        placeholder="Ex. (Priority Index, LCRE, etc.)"
        options={[...CROWDFUND_AD_OPTIONS]}
        value={filters.crowdfund}
        onChange={(next) => setFilter('crowdfund', next)}
      />

      <HeroFilterSelect
        compact
        label="Network:"
        placeholder="Ex. (Feed Ads, Marketplace Ads, etc.)"
        options={[...NETWORK_AD_OPTIONS]}
        value={filters.network}
        onChange={(next) => setFilter('network', next)}
      />

      <div className="mt-2 border-t border-line pt-3">
        <LandingFilterFields
          hideLocation
          stopBeforeLanguage
          hideSearchBy
          hidePsp
          value={toLandingValues(serviceFilters)}
          onChange={handleLandingChange}
        />
        <div className="mt-1">
          <h3 className="mb-1.5 inline-flex items-center gap-1 text-sm font-semibold text-ink">
            Languages Spoken:
            <FieldQaMark field="Languages Spoken:" />
          </h3>
          <HeroFilterSelect
            compact
            inlineMenu
            hideLabel
            label="Languages Spoken:"
            placeholder="Ex. (Mandrin, English, Spanish, etc.,)"
            optionsByLetter={LANGUAGE_BY_LETTER}
            value={splitCsv(serviceFilters.language)}
            onChange={(next) => setServiceList('language', next)}
          />
        </div>
      </div>
      <div className="-mx-3">
        <ResultsBelowLanguageFields
          filters={serviceFilters}
          onChange={(key, value) =>
            setServiceFilters((prev) => ({ ...prev, [key]: value }))
          }
        />
      </div>
      </div>

      <div className="shrink-0 space-y-3 border-t border-line bg-white px-3 py-3">
        <div>
          <h3 className="mb-1.5 text-sm font-semibold text-ink">Zipcode</h3>
          <Input
            name="advertise-zip"
            value={serviceFilters.zip}
            onChange={(e) =>
              setServiceFilters((prev) => ({ ...prev, zip: e.target.value }))
            }
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
            onChange={(miles) =>
              setServiceFilters((prev) => ({ ...prev, radius: String(miles) }))
            }
          />
        </div>
      </div>
    </aside>
  )
}
