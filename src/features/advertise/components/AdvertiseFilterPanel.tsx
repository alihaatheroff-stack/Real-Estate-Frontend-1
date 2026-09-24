import { useState, type CSSProperties } from 'react'
import { Input } from '@/components/ui/Input'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { Select } from '@/components/ui/Select'
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
  PREVIEW_PAGE_OPTIONS,
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
        <Select
          label="Choose Page"
          name="previewPage"
          placeholder="Select a page…"
          options={PREVIEW_PAGE_OPTIONS.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          value={previewPage}
          onChange={(event) => onPreviewPageChange?.(event.target.value)}
          className="h-9 rounded-lg text-sm"
        />
        <Select
          label="Placement"
          name="previewPlacement"
          placeholder={previewPage ? 'Select placement…' : 'Choose a page first…'}
          options={placementOptions.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          value={previewPlacement}
          disabled={!previewPage || placementOptions.length === 0}
          onChange={(event) => onPreviewPlacementChange?.(event.target.value)}
          className="h-9 rounded-lg text-sm"
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
          <h3 className="mb-1.5 text-sm font-semibold text-ink">Languages Spoken:</h3>
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
