import { useState, type CSSProperties } from 'react'
import { HeroFilterSelect } from '@/features/search'
import { cn } from '@/shared/lib/cn'
import {
  ADVERTISE_GEOGRAPHIC_OPTIONS,
  ADVERTISE_MODULES,
  ADVERTISE_OTHER_WEBSITES_OPTIONS,
  ADVERTISE_TIME_OPTIONS,
  ADVERTISE_TO_OPTIONS,
  AGE_REQUIREMENT_OPTIONS,
  BANNER_SIZE_OPTIONS,
  CROWDFUND_AD_OPTIONS,
  GEOGRAPHICS_STYLE_OPTIONS,
  INVESTOR_TARGET_OPTIONS,
  LC_ECOSYSTEM_AD_OPTIONS,
  LOAN_CONSULTANT_TARGET_OPTIONS,
  NETWORK_AD_OPTIONS,
  VIDEO_LENGTH_OPTIONS,
} from '@/features/advertise/data/advertiseFilterOptions'

type AdvertiseFilters = {
  module: string[]
  loanConsultantTarget: string[]
  investorTarget: string[]
  advertiseTo: string[]
  geographicTarget: string[]
  ageRequirements: string[]
  whatTime: string[]
  otherWebsites: string[]
  lcEcosystem: string[]
  geographicsStyle: string[]
  bannerSize: string[]
  videoLength: string[]
  crowdfund: string[]
  network: string[]
}

export type { AdvertiseFilters }

export const EMPTY_ADVERTISE_FILTERS: AdvertiseFilters = {
  module: [],
  loanConsultantTarget: [],
  investorTarget: [],
  advertiseTo: [],
  geographicTarget: [],
  ageRequirements: [],
  whatTime: [],
  otherWebsites: [],
  lcEcosystem: [],
  geographicsStyle: [],
  bannerSize: [],
  videoLength: [],
  crowdfund: [],
  network: [],
}

const EMPTY_FILTERS = EMPTY_ADVERTISE_FILTERS

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
}: {
  className?: string
  style?: CSSProperties
  filters?: AdvertiseFilters
  onFiltersChange?: (next: AdvertiseFilters) => void
}) {
  const [internalFilters, setInternalFilters] = useState<AdvertiseFilters>(EMPTY_FILTERS)
  const filters = filtersProp ?? internalFilters

  function setFilter<K extends keyof AdvertiseFilters>(key: K, next: string[]) {
    const updated = { ...filters, [key]: next }
    if (onFiltersChange) onFiltersChange(updated)
    else setInternalFilters(updated)
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
      <p className="text-[11px] font-medium text-muted">
        Choose module, demographics, and placement.
      </p>

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Choose Module:"
        placeholder="Ex. (Referral, Crowdfunding, etc.)"
        options={[...ADVERTISE_MODULES]}
        value={filters.module}
        onChange={(next) => setFilter('module', next)}
      />

      <SectionLabel>Demographics</SectionLabel>

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="If you're a loan consultant, do you want to target agents?"
        placeholder="Ex. (Yes — Target Agents, No)"
        options={[...LOAN_CONSULTANT_TARGET_OPTIONS]}
        value={filters.loanConsultantTarget}
        onChange={(next) => setFilter('loanConsultantTarget', next)}
      />

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="If you're an investor, do you want to target scrapers?"
        placeholder="Ex. (Freelancer Scrapers, etc.)"
        options={[...INVESTOR_TARGET_OPTIONS]}
        value={filters.investorTarget}
        onChange={(next) => setFilter('investorTarget', next)}
      />

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Who do you want to advertise to?"
        placeholder="Ex. (Agents, Investors, etc.)"
        options={[...ADVERTISE_TO_OPTIONS]}
        value={filters.advertiseTo}
        onChange={(next) => setFilter('advertiseTo', next)}
      />

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Which geographic do you want to advertise to?"
        placeholder="Ex. (City, County, Zip, etc.)"
        options={[...ADVERTISE_GEOGRAPHIC_OPTIONS]}
        value={filters.geographicTarget}
        onChange={(next) => setFilter('geographicTarget', next)}
      />

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Age Requirements:"
        placeholder="Ex. (25–34, 35–44, etc.)"
        options={[...AGE_REQUIREMENT_OPTIONS]}
        value={filters.ageRequirements}
        onChange={(next) => setFilter('ageRequirements', next)}
      />

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="What Time:"
        placeholder="Ex. (Morning, Evening, etc.)"
        options={[...ADVERTISE_TIME_OPTIONS]}
        value={filters.whatTime}
        onChange={(next) => setFilter('whatTime', next)}
      />

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Future: Advertise other people's websites?"
        placeholder="Ex. (Yes — Future, No, etc.)"
        options={[...ADVERTISE_OTHER_WEBSITES_OPTIONS]}
        value={filters.otherWebsites}
        onChange={(next) => setFilter('otherWebsites', next)}
      />

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Advertise inside LC Eco-System features & platforms?"
        placeholder="Ex. (Yes, No, Learn More, etc.)"
        options={[...LC_ECOSYSTEM_AD_OPTIONS]}
        value={filters.lcEcosystem}
        onChange={(next) => setFilter('lcEcosystem', next)}
      />

      <p className="rounded-md bg-white/70 px-2 py-1 text-[11px] leading-snug text-muted">
        Learning: possible with Revie AdServer — given idea.
      </p>

      <SectionLabel>Geographics</SectionLabel>

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Geographics:"
        placeholder="Ex. (Zillow Style, Map Overlay, etc.)"
        options={[...GEOGRAPHICS_STYLE_OPTIONS]}
        value={filters.geographicsStyle}
        onChange={(next) => setFilter('geographicsStyle', next)}
      />

      <SectionLabel>Creative</SectionLabel>

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        singleSelect
        label="Size of Banner:"
        placeholder="Ex. (Leaderboard, Medium Rectangle, etc.)"
        options={[...BANNER_SIZE_OPTIONS]}
        value={filters.bannerSize}
        onChange={(next) => setFilter('bannerSize', next)}
      />

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Video — How Long:"
        placeholder="Ex. (15 seconds, 30 seconds, etc.)"
        options={[...VIDEO_LENGTH_OPTIONS]}
        value={filters.videoLength}
        onChange={(next) => setFilter('videoLength', next)}
      />

      <SectionLabel>Module Placements</SectionLabel>

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Crowdfund:"
        placeholder="Ex. (Priority Index, LCRE, etc.)"
        options={[...CROWDFUND_AD_OPTIONS]}
        value={filters.crowdfund}
        onChange={(next) => setFilter('crowdfund', next)}
      />

      <HeroFilterSelect
        compact
        dense
        wrapLabel
        label="Network:"
        placeholder="Ex. (Feed Ads, Marketplace Ads, etc.)"
        options={[...NETWORK_AD_OPTIONS]}
        value={filters.network}
        onChange={(next) => setFilter('network', next)}
      />
      </div>
    </aside>
  )
}
