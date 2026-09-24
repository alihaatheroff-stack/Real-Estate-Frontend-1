import { useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'
import { ReferralShareInput } from '@/components/ui/ReferralShareInput'
import {
  HeroFilterSelect,
  AR_MEASUREMENT_TOOLS_OPTIONS,
  EDUCATION_ARCHIVE_OPTIONS,
  ENGLISH_LEVEL_OPTIONS,
  PAYMENT_METHODS_TREE,
  PAYMENT_PACKET_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  TIER_SELECTION_OPTIONS,
  joinCsv,
  splitCsv,
  type HeroFiltersState,
} from '@/features/search'
import { WILLING_TO_TRAIN_FILTER_OPTIONS } from '@/features/referrals/data/filterOptions'
import { cn } from '@/shared/lib/cn'

type ResultsBelowLanguageFieldsProps = {
  filters: HeroFiltersState
  onChange: <K extends keyof HeroFiltersState>(
    key: K,
    value: HeroFiltersState[K],
  ) => void
}

function FilterSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
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

/** Dropdowns that sit under Languages Spoken on the service results filter. */
export function ResultsBelowLanguageFields({
  filters,
  onChange,
}: ResultsBelowLanguageFieldsProps) {
  function setFilterList(key: keyof HeroFiltersState, next: string[]) {
    onChange(key, joinCsv(next) as HeroFiltersState[typeof key])
  }

  return (
    <>
      <FilterSection title="English Level:">
        <HeroFilterSelect
          compact
          inlineMenu
          hideLabel
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
          hideLabel
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
          hideLabel
          label="AR MEASUREMENT TOOLS"
          placeholder="Ex. (Doors, Windows, Land, etc.,)"
          options={AR_MEASUREMENT_TOOLS_OPTIONS}
          value={splitCsv(filters.arMeasurementTools)}
          onChange={(next) => setFilterList('arMeasurementTools', next)}
        />
      </FilterSection>

      <section className="px-6 py-2">
        <p className="mb-1.5 text-[13px] text-blue-600 underline">Membership</p>
        <h3 className="mb-1.5 text-sm font-semibold text-ink">Payment Methods:</h3>
        <HeroFilterSelect
          compact
          inlineMenu
          hideLabel
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
          hideLabel
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
          hideLabel
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
          hideLabel
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
              <li className="underline">
                Commercial
                <ul className="list-disc pl-5">
                  <li className="underline">Recreational</li>
                </ul>
              </li>
              <li className="underline">Residential</li>
              <li className="underline">Explore</li>
            </ul>
          </div>

          <div className="mt-2 text-sm">
            <p className="font-bold underline">🗣️ Network:</p>
            <ul className="list-disc pl-5">
              <li className="underline">
                🗞️ Articles (Blogs) — relevant, curated by user search context
              </li>
              <li className="underline">📰 Forums — trending and active discussions</li>
              <li className="underline">🧑‍🤝‍🧑 Groups — top community groups</li>
              <li className="underline">💫 Explore</li>
            </ul>
          </div>
        </div>

        <div className="mt-3 rounded-xl border border-black px-4 py-3 text-black">
          <p className="text-left text-sm font-bold underline">
            🛍️ Shop Based on your search:
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm">
            <li className="underline">Real Estate (Property), Home, Improvement 👉</li>
            <li className="underline">
              Curated digital tools, templates, AI prompts, downloads
            </li>
            <li className="underline">Explore</li>
          </ul>
        </div>

        <div className="mt-3 rounded-xl border border-black px-4 py-3 text-black">
          <p className="text-left text-sm font-bold underline">🧑‍💻 REMOTE FREELANCE:</p>
          <p className="mt-2 text-sm font-bold underline">Based of Your Trade/Profession:</p>
          <ul className="mt-1 list-disc pl-5 text-sm">
            <li className="underline">Explore</li>
          </ul>
        </div>

        <p className="mt-3 text-[13px] text-black underline">Advertise</p>
      </section>
    </>
  )
}
