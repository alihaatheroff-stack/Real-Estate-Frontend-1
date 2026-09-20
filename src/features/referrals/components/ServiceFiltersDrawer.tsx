import { useEffect, useState, type ReactNode } from 'react'
import {
  ArrowLeftToLine,
  ArrowUpRight,
  Plus,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { RangeSlider } from '@/components/ui/RangeSlider'
import { ReferralShareInput } from '@/components/ui/ReferralShareInput'
import {
  HeroFilterSelect,
  ENGLISH_LEVEL_OPTIONS,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
  type HeroFiltersState,
  BUYING_TREE,
  CLIENT_EXPERIENCE_TREE,
  CLIENT_MOTIVE_OPTIONS,
  FIELD_TREE,
  FIND_FILTER_OPTIONS,
  LANGUAGE_BY_LETTER,
  EDUCATION_ARCHIVE_OPTIONS,
  AR_MEASUREMENT_TOOLS_OPTIONS,
  PAYMENT_METHODS_TREE,
  PAYMENT_PACKET_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  PRICE_DEMOGRAPHY_OPTIONS,
  PROPERTY_CONDITION_OPTIONS,
  PSP_BY_LETTER,
  PSP_NESTED_TREES,
  REPRESENTATION_TOP_TREE,
  SALE_TYPE_TREE,
  TIER_SELECTION_OPTIONS,
  TITLE_OPTIONS,
  VACANCY_OPTIONS,
  YOUR_EXPERIENCE_OPTIONS,
  joinCsv,
  splitCsv,
} from '@/features/search'
import { cn } from '@/shared/lib/cn'
import { WILLING_TO_TRAIN_FILTER_OPTIONS } from '@/features/referrals/data/filterOptions'


type ServiceFiltersDrawerProps = {
  open: boolean
  onClose: () => void
  filters: HeroFiltersState
  onChange: <K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) => void
  onReset: () => void
  onApply: () => void
}

type FilterSectionProps = {
  title: string
  children: ReactNode
}

function FilterSection({ title, children }: FilterSectionProps) {
  return (
    <section className="px-6 py-2">
      <h3 className="mb-1.5 text-sm font-semibold text-ink">{title}</h3>
      {children}
    </section>
  )
}

function CheckboxRow({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-[13px] text-ink-soft hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 rounded border-line text-brand focus:ring-brand/30"
      />
      <span>{label}</span>
    </label>
  )
}

function ExpandableCheckboxList({
  options,
  selected,
  onToggle,
  initialVisible = 5,
}: {
  options: { label: string; value: string }[]
  selected: string
  onToggle: (value: string) => void
  initialVisible?: number
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? options : options.slice(0, initialVisible)
  const hiddenCount = options.length - initialVisible

  return (
    <div>
      <div className="space-y-0.5">
        {visible.map((option) => (
          <CheckboxRow
            key={option.value}
            label={option.label}
            checked={selected === option.value}
            onChange={() =>
              onToggle(selected === option.value ? '' : option.value)
            }
          />
        ))}
      </div>
      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-brand hover:text-brand-dark"
        >
          <Plus className={cn('h-4 w-4 transition', expanded && 'rotate-45')} />
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      ) : null}
    </div>
  )
}

const landingSelectClassName = '[&>label]:hidden'

export function ServiceFiltersDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
  onApply,
}: ServiceFiltersDrawerProps) {
  const distance = Number(filters.radius || SERVICE_DISTANCE_MIN)

  const findLabels = splitCsv(filters.find).map((value) => {
    if (value === 'service') return 'Service'
    if (value === 'profile') return 'Profile'
    if (value === 'agency') return 'Office'
    return value
  })
  const representation = splitCsv(filters.representation)
  const selectedPsp = splitCsv(filters.pspCategory)
  const selectedFields = splitCsv(filters.field)
  const showRepresentation = selectedPsp.some(
    (value) => value === 'Agent' || value.startsWith('Agent > '),
  )
  const showBuying = representation.some(
    (value) => value === 'Buying' || value === 'Mortgage',
  )

  function setFilterList(key: keyof HeroFiltersState, next: string[]) {
    if (key === 'find') {
      const mapped = next.map((label) => {
        if (label === 'Service') return 'service'
        if (label === 'Profile') return 'profile'
        if (label === 'Office') return 'agency'
        return label
      })
      onChange(key, joinCsv(mapped) as HeroFiltersState[typeof key])
      return
    }
    if (key === 'pspCategory') {
      onChange(key, joinCsv(next) as HeroFiltersState[typeof key])
      const stillAgent = next.some(
        (value) => value === 'Agent' || value.startsWith('Agent > '),
      )
      if (!stillAgent) {
        onChange('representation', '')
        onChange('financing', '')
      }
      return
    }
    if (key === 'representation') {
      onChange(key, joinCsv(next) as HeroFiltersState[typeof key])
      const stillBuying = next.some(
        (value) => value === 'Buying' || value === 'Mortgage',
      )
      if (!stillBuying) onChange('financing', '')
      return
    }
    onChange(key, joinCsv(next) as HeroFiltersState[typeof key])
  }

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
        className="relative flex h-full w-full max-w-[360px] flex-col bg-paper shadow-2xl animate-drawer-in"
        aria-label="All filters"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div>
            <h2 className="text-lg font-bold text-ink">All Filters</h2>
            <button
              type="button"
              onClick={onReset}
              className="mt-1 text-[13px] font-medium text-muted hover:text-brand hover:underline"
            >
              Reset all
            </button>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-light text-muted transition hover:text-brand"
            aria-label="Close filters"
          >
            <ArrowLeftToLine className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <FilterSection title="Search By:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Search By: "
              placeholder="Ex. (Service, Profile, Office)"
              options={FIND_FILTER_OPTIONS}
              value={findLabels}
              onChange={(next) => setFilterList('find', next)}
            />
          </FilterSection>

          <FilterSection title="A-Z Psp's:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="A-Z Psp's: "
              placeholder="Ex. (Agent, Architect, Real Estate, etc.,)"
              optionsByLetter={PSP_BY_LETTER}
              nestedTrees={PSP_NESTED_TREES}
              value={selectedPsp}
              onChange={(next) => setFilterList('pspCategory', next)}
            />
          </FilterSection>

          {showRepresentation ? (
            <FilterSection title="Representation (If RE Agent Selected): *">
              <HeroFilterSelect
                compact
                inlineMenu
                className={landingSelectClassName}
                label="Representation (If RE Agent Selected): *"
                placeholder="Ex. (Buying, Mortgage, etc.,)"
                tree={REPRESENTATION_TOP_TREE}
                value={representation}
                onChange={(next) => setFilterList('representation', next)}
              />
            </FilterSection>
          ) : null}

          {showBuying ? (
            <FilterSection title="Buying (If Buying, Mortgage get Selected):">
              <HeroFilterSelect
                compact
                inlineMenu
                className={landingSelectClassName}
                label="Buying (If Buying, Mortgage get Selected):"
                placeholder="Ex. (Buying, Mortgage, etc.,)"
                tree={BUYING_TREE}
                value={splitCsv(filters.financing)}
                onChange={(next) => setFilterList('financing', next)}
              />
            </FilterSection>
          ) : null}

          <FilterSection title="Price Demography:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Price Demography: "
              placeholder="Ex. (Affordable, Mid-Range, Luxury etc.,)"
              options={PRICE_DEMOGRAPHY_OPTIONS}
              value={splitCsv(filters.priceBand)}
              onChange={(next) => setFilterList('priceBand', next)}
            />
          </FilterSection>

          <FilterSection title="Fields:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Fields: "
              placeholder="Ex. (Commercial, Agriculture, etc.,)"
              tree={FIELD_TREE}
              value={selectedFields}
              onChange={(next) => setFilterList('field', next)}
            />
          </FilterSection>

          <FilterSection title="Client Experience:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Client Experience:"
              placeholder="Ex. (Beginner, Intermediate, Expert etc.,)"
              tree={CLIENT_EXPERIENCE_TREE}
              value={splitCsv(filters.clientExperience)}
              onChange={(next) => setFilterList('clientExperience', next)}
            />
          </FilterSection>

          <FilterSection title="Property Condition:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Property Condition:"
              placeholder="Ex. (New Construction, Burned down, etc.,)"
              options={PROPERTY_CONDITION_OPTIONS}
              value={splitCsv(filters.condition)}
              onChange={(next) => setFilterList('condition', next)}
            />
          </FilterSection>

          <FilterSection title="Vacancy:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Vacancy:"
              placeholder="Ex. (Vacant, Tenant-Occupied, etc.,)"
              options={VACANCY_OPTIONS}
              value={splitCsv(filters.vacancy)}
              onChange={(next) => setFilterList('vacancy', next)}
            />
          </FilterSection>

          <FilterSection title="Title:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Title:"
              placeholder="Ex. (Partnership, Tenancy, Sole,  etc.,)"
              options={TITLE_OPTIONS}
              value={splitCsv(filters.propertyTitle)}
              onChange={(next) => setFilterList('propertyTitle', next)}
            />
          </FilterSection>

          <FilterSection title="Sale Type:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Sale Type:"
              placeholder="Ex. (Standard, Clear, Lien, etc.,)"
              tree={SALE_TYPE_TREE}
              value={splitCsv(filters.saleType)}
              onChange={(next) => setFilterList('saleType', next)}
            />
          </FilterSection>

          <FilterSection title="Recipient Experience:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Recipient Experience:"
              placeholder="Ex. (Expert, Intermediate, Beginner, etc.,)"
              options={YOUR_EXPERIENCE_OPTIONS}
              value={splitCsv(filters.yourExperience)}
              onChange={(next) => setFilterList('yourExperience', next)}
            />
          </FilterSection>

          <FilterSection title="Motive's:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Motive's:"
              placeholder="Ex. (A.Have to, D.Wasting Time, etc.,)"
              options={CLIENT_MOTIVE_OPTIONS}
              value={splitCsv(filters.motive)}
              onChange={(next) => setFilterList('motive', next)}
            />
          </FilterSection>

          <FilterSection title="Languages Spoken:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Languages Spoken:"
              placeholder="Ex. (Mandrin, English, Spanish, etc.,)"
              optionsByLetter={LANGUAGE_BY_LETTER}
              value={splitCsv(filters.language)}
              onChange={(next) => setFilterList('language', next)}
            />
          </FilterSection>

          <FilterSection title="English Level:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="English Level:"
              placeholder="Ex. (Low, Middle, High, etc.,)"
              options={ENGLISH_LEVEL_OPTIONS.map((option) => option.label)}
              value={splitCsv(filters.englishLevel)}
              onChange={(next) => setFilterList('englishLevel', next)}
            />
          </FilterSection>

          <FilterSection title="Referral Share:">
            <ReferralShareInput
              compact
              hideLabel
              value={filters.percentageShare}
              onChange={(value) => onChange('percentageShare', value)}
            />
          </FilterSection>

          <FilterSection title="Willing to train">
            <ExpandableCheckboxList
              options={WILLING_TO_TRAIN_FILTER_OPTIONS}
              selected={filters.willingToTrain}
              onToggle={(value) => onChange('willingToTrain', value)}
              initialVisible={3}
            />
          </FilterSection>

          <FilterSection title="EDUCATION, + Archive, + video playlists based on search:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="EDUCATION + ARCHIVE + video playlists based on search:"
              placeholder="Ex. (Negotiation's, Hiring Appraisers)"
              options={EDUCATION_ARCHIVE_OPTIONS}
              value={splitCsv(filters.educationArchive)}
              onChange={(next) => setFilterList('educationArchive', next)}
            />
          </FilterSection>

          <FilterSection title="AR Measurement Tools:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={cn(
                landingSelectClassName,
                '[&_label_span]:underline',
              )}
              label="AR MEASUREMENT TOOLS"
              placeholder="Ex. (Doors, Windows, Land, etc.,)"
              options={AR_MEASUREMENT_TOOLS_OPTIONS}
              value={splitCsv(filters.arMeasurementTools)}
              onChange={(next) => setFilterList('arMeasurementTools', next)}
            />
          </FilterSection>

          <section className="px-6 py-2">
            <p className="mb-1.5 text-[13px] text-blue-600 underline">
              Membership
            </p>
            <h3 className="mb-1.5 text-sm font-semibold text-ink">
              Payment Methods:
            </h3>
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Payment Methods:"
              placeholder="Ex. (Cash, Credit)"
              tree={PAYMENT_METHODS_TREE}
              value={splitCsv(filters.paymentMethods)}
              onChange={(next) => setFilterList('paymentMethods', next)}
            />
          </section>

          <FilterSection title="Payment Packet:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Payment Packet:"
              placeholder="Ex. (Monthly, Yearly, etc.,)"
              options={PAYMENT_PACKET_OPTIONS}
              value={splitCsv(filters.paymentPacket)}
              onChange={(next) => setFilterList('paymentPacket', next)}
            />
          </FilterSection>

          <FilterSection title="Tier Selection:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Tier Selection:"
              placeholder="Ex. (Basic-Lux Tier)"
              options={TIER_SELECTION_OPTIONS}
              value={splitCsv(filters.tierSelection)}
              onChange={(next) => setFilterList('tierSelection', next)}
            />
          </FilterSection>

          <FilterSection title="Payment Terms:">
            <HeroFilterSelect
              compact
              inlineMenu
              className={landingSelectClassName}
              label="Payment Terms:"
              placeholder="Ex. (Before, After, etc.,)"
              options={PAYMENT_TERMS_OPTIONS}
              value={splitCsv(filters.paymentTerms)}
              onChange={(next) => setFilterList('paymentTerms', next)}
            />
          </FilterSection>

          <section className="px-6 py-3">
            <div className="rounded-xl border border-black px-4 py-3 text-black">
              <p className="text-left text-sm underline">
                🌐 RE Network Complementry tools based on your Search:
              </p>

              <div className="mt-3 text-sm">
                <p className="font-bold underline">Crowdfund:</p>
                <ul className="list-disc pl-5">
                  <li className="underline">Commercial
                    <ul className="list-disc pl-5">
                      <li className="underline">Recreational</li>
                    </ul>
                  </li>
                  <li className="underline">Residential</li>
                  <li className="underline">Explore</li>
                </ul>
              </div>

              <div className="mt-2 text-sm">
                <p className="font-bold underline">
                  🗣️ Network:
                </p>
                <ul className="list-disc pl-5">
                  <li className="underline">
                    🗞️ Articles (Blogs) — relevant, curated by user search context
                  </li>
                  <li className="underline">
                    📰 Forums — trending and active discussions
                  </li>
                  <li className="underline">
                    🧑‍🤝‍🧑 Groups — top community groups
                  </li>
                  <li className="underline">💫 Explore</li>
                </ul>
              </div>
            </div>

            <div className="mt-3 rounded-xl border border-black px-4 py-3 text-black">
              <p className="text-left text-sm font-bold underline">
                🛍️ Shop Based on your search:
              </p>
              <ul className="mt-2 list-disc pl-5 text-sm">
                <li className="underline">
                  Real Estate (Property), Home, Improvement 👉
                </li>
                <li className="underline">
                  Curated digital tools, templates, AI prompts, downloads
                </li>
                <li className="underline">Explore</li>
              </ul>
            </div>

            <div className="mt-3 rounded-xl border border-black px-4 py-3 text-black">
              <p className="text-left text-sm font-bold underline">
                🧑‍💻 REMOTE FREELANCE:
              </p>
              <p className="mt-2 text-sm font-bold underline">
                Based of Your Trade/Profession:
              </p>
              <ul className="mt-1 list-disc pl-5 text-sm">
                <li className="underline">Explore</li>
              </ul>
            </div>

            <p className="mt-3 text-[13px] text-black underline">
              Advertise
            </p>
          </section>        </div>

        <div className="shrink-0 space-y-3 border-t border-line bg-paper px-6 py-4">
          <div>
            <h3 className="mb-1.5 text-sm font-semibold text-ink">Zipcode</h3>
            <Input
              name="location"
              value={filters.zip}
              onChange={(e) => onChange('zip', e.target.value)}
              placeholder="Enter location or ZIP"
              className="text-[13px]"
            />
          </div>

          <div>
            <h3 className="mb-1.5 text-sm font-semibold text-ink">
              Mile Radius
            </h3>
            <p className="mb-3 text-[13px] text-muted">
              Distance: {distance} miles
            </p>
            <RangeSlider
              min={SERVICE_DISTANCE_MIN}
              max={SERVICE_DISTANCE_MAX}
              value={distance}
              onChange={(value) => onChange('radius', String(value))}
            />
          </div>

          <Button
            className="h-12 w-full rounded-xl text-base"
            rightIcon={<ArrowUpRight className="h-4 w-4" />}
            onClick={() => {
              onApply()
              onClose()
            }}
          >
            Find Service
          </Button>
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
