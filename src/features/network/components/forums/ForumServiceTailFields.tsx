import { RangeSlider } from '@/components/ui/RangeSlider'
import {
  HeroFilterSelect,
  AR_MEASUREMENT_TOOLS_OPTIONS,
  EDUCATION_ARCHIVE_OPTIONS,
  PAYMENT_METHODS_TREE,
  PAYMENT_PACKET_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  SERVICE_DISTANCE_DEFAULT,
  SERVICE_DISTANCE_MAX,
  SERVICE_DISTANCE_MIN,
  TIER_SELECTION_OPTIONS,
  WILLING_TO_TRAIN_FILTER_OPTIONS,
} from '@/features/search'
import type { ForumFiltersState } from '@/features/network/data/forumFilters'

type ForumServiceTailFieldsProps = {
  filters: ForumFiltersState
  onChange: (next: ForumFiltersState) => void
  selectedPrefix?: string
}

/**
 * Service-results filters from Willing to Train through Mile Radius,
 * appended at the bottom of the forums left rail.
 */
export function ForumServiceTailFields({
  filters,
  onChange,
  selectedPrefix = 'Selected: ',
}: ForumServiceTailFieldsProps) {
  const radiusMiles = Number(filters.radius || SERVICE_DISTANCE_DEFAULT)

  function setList<K extends keyof ForumFiltersState>(key: K, next: ForumFiltersState[K]) {
    onChange({ ...filters, [key]: next })
  }

  return (
    <div className="mt-1 flex flex-col gap-1 border-t border-line pt-2">
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Willing to Train:"
        placeholder="Ex. (Yes; Recorded, Reach out, etc.,)"
        options={WILLING_TO_TRAIN_FILTER_OPTIONS.map((option) => option.label)}
        value={filters.willingToTrain}
        onChange={(next) => setList('willingToTrain', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="EDUCATION + ARCHIVE + video playlists:"
        placeholder="Ex. (Negotiation's, Hiring Appraisers)"
        options={EDUCATION_ARCHIVE_OPTIONS}
        value={filters.educationArchive}
        onChange={(next) => setList('educationArchive', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="AR Measurement Tools:"
        placeholder="Ex. (Doors, Windows, Land, etc.,)"
        options={AR_MEASUREMENT_TOOLS_OPTIONS}
        value={filters.arMeasurementTools}
        onChange={(next) => setList('arMeasurementTools', next)}
      />

      <p className="pt-1 text-[11px] font-semibold text-brand underline">Membership</p>

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Payment Methods:"
        placeholder="Ex. (Cash, Credit)"
        tree={PAYMENT_METHODS_TREE}
        value={filters.paymentMethods}
        onChange={(next) => setList('paymentMethods', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Payment Packet:"
        placeholder="Ex. (Monthly, Yearly, etc.,)"
        options={PAYMENT_PACKET_OPTIONS}
        value={filters.paymentPacket}
        onChange={(next) => setList('paymentPacket', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Tier Selection:"
        placeholder="Ex. (Basic-Lux Tier)"
        options={TIER_SELECTION_OPTIONS}
        value={filters.tierSelection}
        onChange={(next) => setList('tierSelection', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        label="Payment Terms:"
        placeholder="Ex. (Before, After, etc.,)"
        options={PAYMENT_TERMS_OPTIONS}
        value={filters.paymentTerms}
        onChange={(next) => setList('paymentTerms', next)}
      />

      <div className="mt-2 space-y-2">
        <div className="rounded-xl border border-black px-3 py-2.5 text-black">
          <p className="text-left text-[12px] underline sm:text-[13px]">
            🌐 RE Network Complementry tools based on your Search:
          </p>

          <div className="mt-2 text-[12px] sm:text-[13px]">
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

          <div className="mt-2 text-[12px] sm:text-[13px]">
            <p className="font-bold underline">🗣️ Network:</p>
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

        <div className="rounded-xl border border-black px-3 py-2.5 text-black">
          <p className="text-left text-[12px] font-bold underline sm:text-[13px]">
            🛍️ Shop Based on your search:
          </p>
          <ul className="mt-2 list-disc pl-5 text-[12px] sm:text-[13px]">
            <li className="underline">
              Real Estate (Property), Home, Improvement 👉
            </li>
            <li className="underline">
              Curated digital tools, templates, AI prompts, downloads
            </li>
            <li className="underline">Explore</li>
          </ul>
        </div>

        <div className="rounded-xl border border-black px-3 py-2.5 text-black">
          <p className="text-left text-[12px] font-bold underline sm:text-[13px]">
            🧑‍💻 REMOTE FREELANCE:
          </p>
          <p className="mt-2 text-[12px] font-bold underline sm:text-[13px]">
            Based of Your Trade/Profession:
          </p>
          <ul className="mt-1 list-disc pl-5 text-[12px] sm:text-[13px]">
            <li className="underline">Explore</li>
          </ul>
        </div>

        <p className="text-[12px] text-black underline sm:text-[13px]">Advertise</p>
      </div>

      <div className="relative shrink-0 overflow-visible">
        <label className="block truncate text-xs font-bold leading-4 text-black">
          Zipcode
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={filters.zip}
          onChange={(e) => setList('zip', e.target.value)}
          placeholder="Zipcode..."
          className="mt-0.5 h-7 w-full rounded-md border border-black bg-white px-2 text-[11px] text-ink outline-none placeholder:text-[11px] placeholder:text-ink/55 focus:ring-1 focus:ring-brand/30"
        />
      </div>

      <div className="relative shrink-0 overflow-visible pb-1">
        <div className="flex items-baseline justify-between gap-2">
          <label className="block truncate text-xs font-bold leading-4 text-black">
            Mile Radius
          </label>
          <span className="shrink-0 text-[11px] font-medium text-ink/70">
            {radiusMiles} mi
          </span>
        </div>
        <RangeSlider
          variant="freeio"
          min={SERVICE_DISTANCE_MIN}
          max={SERVICE_DISTANCE_MAX}
          value={radiusMiles}
          onChange={(miles) => setList('radius', String(miles))}
          className="mt-1 space-y-0 px-1.5 py-0.5"
        />
      </div>
    </div>
  )
}
