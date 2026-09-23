import { ReferralShareInput } from '@/components/ui/ReferralShareInput'
import {
  HeroFilterSelect,
  AR_MEASUREMENT_TOOLS_OPTIONS,
  EDUCATION_ARCHIVE_OPTIONS,
  ENGLISH_LEVEL_OPTIONS,
  LANGUAGE_BY_LETTER,
  PAYMENT_METHODS_TREE,
  PAYMENT_PACKET_OPTIONS,
  PAYMENT_TERMS_OPTIONS,
  TIER_SELECTION_OPTIONS,
  WILLING_TO_TRAIN_FILTER_OPTIONS,
} from '@/features/search'
import type { ForumFiltersState } from '@/features/network/data/forumFilters'

type ForumServiceTailFieldsProps = {
  filters: ForumFiltersState
  onChange: (next: ForumFiltersState) => void
  selectedPrefix?: string
  highlightSelected?: boolean
}

/**
 * Service-results filters from Languages Spoken through the payment notes.
 * Zipcode and Mile Radius are pinned under this list.
 * Selected values keep the forums/articles blue highlight.
 */
export function ForumServiceTailFields({
  filters,
  onChange,
  selectedPrefix = 'Selected: ',
  highlightSelected = true,
}: ForumServiceTailFieldsProps) {
  function setList<K extends keyof ForumFiltersState>(key: K, next: ForumFiltersState[K]) {
    onChange({ ...filters, [key]: next })
  }

  return (
    <div className="mt-1 flex flex-col gap-1 border-t border-line pt-2">
      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Languages Spoken:"
        placeholder="Ex. (Mandrin, English, Spanish, etc.,)"
        optionsByLetter={LANGUAGE_BY_LETTER}
        value={filters.language}
        onChange={(next) => setList('language', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="English Level:"
        placeholder="Ex. (Low, Middle, High, etc.,)"
        options={ENGLISH_LEVEL_OPTIONS.map((option) => option.label)}
        value={filters.englishLevel}
        onChange={(next) => setList('englishLevel', next)}
      />

      <ReferralShareInput
        compact
        value={filters.percentageShare[0] ?? ''}
        onChange={(value) => setList('percentageShare', value ? [value] : [])}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Willing to Train:"
        placeholder="Ex. (Yes; Recorded, Reach out, etc.,)"
        options={WILLING_TO_TRAIN_FILTER_OPTIONS.map((option) => option.label)}
        value={filters.willingToTrain}
        onChange={(next) => setList('willingToTrain', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="EDUCATION + ARCHIVE + video playlists:"
        placeholder="Ex. (Negotiation's, Hiring Appraisers)"
        options={EDUCATION_ARCHIVE_OPTIONS}
        value={filters.educationArchive}
        onChange={(next) => setList('educationArchive', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
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
        highlightSelected={highlightSelected}
        label="Payment Methods:"
        placeholder="Ex. (Cash, Credit)"
        tree={PAYMENT_METHODS_TREE}
        value={filters.paymentMethods}
        onChange={(next) => setList('paymentMethods', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Payment Packet:"
        placeholder="Ex. (Monthly, Yearly, etc.,)"
        options={PAYMENT_PACKET_OPTIONS}
        value={filters.paymentPacket}
        onChange={(next) => setList('paymentPacket', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
        label="Tier Selection:"
        placeholder="Ex. (Basic-Lux Tier)"
        options={TIER_SELECTION_OPTIONS}
        value={filters.tierSelection}
        onChange={(next) => setList('tierSelection', next)}
      />

      <HeroFilterSelect
        compact
        selectedPrefix={selectedPrefix}
        highlightSelected={highlightSelected}
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
    </div>
  )
}
