import { useMemo, type ReactNode } from 'react'
import { HeroFilterSelect } from '@/features/search'
import {
  EMPTY_FORUM_FILTERS,
  FORUM_COMMUNITY_OPTIONS,
  FORUM_CONDITION_OPTIONS,
  FORUM_DEED_LIEN_NOTE_OPTIONS,
  FORUM_FIELD_OPTIONS,
  FORUM_LANGUAGE_BY_LETTER,
  FORUM_MOTIVE_OPTIONS,
  FORUM_OWNERSHIP_OPTIONS,
  FORUM_PRICE_DEMOGRAPHY_OPTIONS,
  FORUM_REPRESENTATION_OPTIONS,
  FORUM_ROLE_OPTIONS,
  FORUM_SUGGESTED_TOPIC_GROUPS,
  FORUM_TOOLS_OPTIONS,
  getForumSubFieldPaths,
  getForumSubFieldTree,
  type ForumFiltersState,
} from '@/features/network/data/forumFilters'
import type { ForumSortId } from '@/features/network/data/forums'
import { cn } from '@/shared/lib/cn'

export type { ForumFiltersState }

type ForumFilterPanelProps = {
  filters: ForumFiltersState
  onChange: (next: ForumFiltersState) => void
  onSuggest?: (sort: ForumSortId, topic: string) => void
  className?: string
}

function ForumSelect({
  label,
  placeholder,
  options,
  tree,
  optionsByLetter,
  letterHeading,
  value,
  onChange,
}: {
  label: string
  placeholder: string
  options?: string[]
  tree?: Parameters<typeof HeroFilterSelect>[0]['tree']
  optionsByLetter?: Record<string, string[]>
  letterHeading?: 'bar' | 'underline'
  value: string[]
  onChange: (next: string[]) => void
}) {
  return (
    <HeroFilterSelect
      compact
      dense
      wrapLabel
      label={label}
      placeholder={placeholder}
      options={options}
      tree={tree}
      optionsByLetter={optionsByLetter}
      letterHeading={letterHeading}
      value={value}
      onChange={onChange}
    />
  )
}

export function ForumFilterPanel({
  filters,
  onChange,
  onSuggest,
  className,
}: ForumFilterPanelProps) {
  const subFieldTree = useMemo(
    () => getForumSubFieldTree(filters.field),
    [filters.field],
  )

  function setFilter<K extends keyof ForumFiltersState>(key: K, next: string[]) {
    let updated: ForumFiltersState = { ...filters, [key]: next }

    if (key === 'field') {
      const allowed = new Set(getForumSubFieldPaths(next))
      updated = {
        ...updated,
        subField: filters.subField.filter((value) => allowed.has(value)),
      }
    }

    onChange(updated)
  }

  function clearAll() {
    onChange(EMPTY_FORUM_FILTERS)
  }

  const hasActive = Object.values(filters).some((value) => value.length > 0)

  return (
    <aside
      className={cn(
        'flex w-full max-w-[21rem] shrink-0 flex-col overflow-hidden rounded-xl border border-line bg-mist/50',
        className,
      )}
    >
      <div className="network-hide-scroll flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain px-3 py-3">
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display text-base font-semibold leading-snug text-ink">
            Forum: Commercial Real Estate Agents
          </h2>
          {hasActive ? (
            <button
              type="button"
              onClick={clearAll}
              className="shrink-0 text-[11px] font-semibold text-brand hover:underline"
            >
              Clear
            </button>
          ) : null}
        </div>

        <ForumSelect
          label="Communitie's Based On Your Search Result's: *"
          placeholder="Ex. (County, City, State, etc.)"
          options={[...FORUM_COMMUNITY_OPTIONS]}
          value={filters.community}
          onChange={(next) => setFilter('community', next)}
        />

        <ForumSelect
          label="ROLE;"
          placeholder="Ex. (Agent, Broker, Investor, etc.)"
          options={[...FORUM_ROLE_OPTIONS]}
          value={filters.role}
          onChange={(next) => setFilter('role', next)}
        />

        <ForumSelect
          label="Field *"
          placeholder="Ex. (Commercial, Multi-Unit, Residential, etc.)"
          options={[...FORUM_FIELD_OPTIONS]}
          value={filters.field}
          onChange={(next) => setFilter('field', next)}
        />

        <ForumSelect
          label="Sub-Field"
          placeholder="Ex. (Recreational, Retail, Single's, Extra's, etc.)"
          tree={subFieldTree}
          value={filters.subField}
          onChange={(next) => setFilter('subField', next)}
        />

        <ForumSelect
          label="Price Demography *"
          placeholder="Ex. (Luxury, Mid High, Mid Mid, Economic)"
          options={[...FORUM_PRICE_DEMOGRAPHY_OPTIONS]}
          value={filters.priceDemography}
          onChange={(next) => setFilter('priceDemography', next)}
        />

        <ForumSelect
          label="Representation *"
          placeholder="Ex. (Selling, Sell-To-Buy, Buy, etc.)"
          options={[...FORUM_REPRESENTATION_OPTIONS]}
          value={filters.representation}
          onChange={(next) => setFilter('representation', next)}
        />

        <ForumSelect
          label="Condition: *"
          placeholder="Ex. (TLC, Run-Down, New Construction, etc.)"
          options={[...FORUM_CONDITION_OPTIONS]}
          value={filters.condition}
          onChange={(next) => setFilter('condition', next)}
        />

        <ForumSelect
          label="DEED, LIEN, NOTE *"
          placeholder="Ex. (Free And Clear, Lien, REO, HUD, etc.)"
          options={[...FORUM_DEED_LIEN_NOTE_OPTIONS]}
          value={filters.deedLienNote}
          onChange={(next) => setFilter('deedLienNote', next)}
        />

        <ForumSelect
          label="Ownership *"
          placeholder="Ex. (Mom And Pop, JV, REIT, Corporate, etc.)"
          options={[...FORUM_OWNERSHIP_OPTIONS]}
          value={filters.ownership}
          onChange={(next) => setFilter('ownership', next)}
        />

        <ForumSelect
          label="Tool's"
          placeholder="Ex. (App's, Book's, Software, CRM, Shop)"
          options={[...FORUM_TOOLS_OPTIONS]}
          value={filters.tools}
          onChange={(next) => setFilter('tools', next)}
        />

        <ForumSelect
          label="LANGUAGE: *"
          placeholder="Ex. (English, Spanish, Italiano, etc.)"
          optionsByLetter={FORUM_LANGUAGE_BY_LETTER}
          letterHeading="underline"
          value={filters.language}
          onChange={(next) => setFilter('language', next)}
        />

        <ForumSelect
          label="Motive's"
          placeholder="Ex. (A. Have too, D. Wasting Time, etc.)"
          options={[...FORUM_MOTIVE_OPTIONS]}
          value={filters.motives}
          onChange={(next) => setFilter('motives', next)}
        />

        <SuggestedTopics
          onPick={(sort, topic) => {
            onChange({
              ...filters,
              field: ['Commercial'],
              subField: topic.toLowerCase().includes('recreational')
                ? ['Recreational']
                : filters.subField,
            })
            onSuggest?.(sort, topic)
          }}
        />
      </div>
    </aside>
  )
}

function SuggestedTopics({
  onPick,
}: {
  onPick: (sort: ForumSortId, topic: string) => void
}): ReactNode {
  return (
    <div className="mt-1 border-t border-line pt-2">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted">
        Suggested Topic&apos;s
      </p>
      <ul className="mt-1.5 space-y-2">
        {FORUM_SUGGESTED_TOPIC_GROUPS.map((group) => (
          <li key={group.id}>
            <p className="text-[10px] font-bold uppercase tracking-wide text-ink">
              {group.label}
            </p>
            <ul className="mt-0.5 space-y-0.5">
              {group.topics.map((topic) => (
                <li key={`${group.id}-${topic}`}>
                  <button
                    type="button"
                    className="text-left text-[11px] font-medium text-brand hover:underline"
                    onClick={() => onPick(group.id as ForumSortId, topic)}
                  >
                    {topic}
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
