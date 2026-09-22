import {
  EMPTY_FORUM_FILTERS,
  FORUM_COMMERCIAL_SUB_FIELD_TREE,
  FORUM_DEMOGRAPHIC_COLUMNS,
  type ForumFiltersState,
} from '@/features/network/data/forumFilters'
import type { FilterTreeNode } from '@/features/search/data/landingFilterOptions'
import { cn } from '@/shared/lib/cn'

type ForumTaxonomyPanelProps = {
  filters: ForumFiltersState
  onChange: (next: ForumFiltersState) => void
  className?: string
}

function toggleValue(list: string[], item: string): string[] {
  return list.includes(item) ? list.filter((value) => value !== item) : [...list, item]
}

function TaxonomyOption({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <li className="text-center">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          'text-center text-[11px] font-semibold uppercase tracking-wide underline-offset-2 transition',
          'no-underline hover:underline hover:decoration-brand',
          active ? 'text-brand' : 'text-ink hover:text-brand',
        )}
      >
        {label}
      </button>
    </li>
  )
}

/**
 * One Fields column. Nested parents (e.g. Health under Lifestyle) render
 * as centered sub-headings with hierarchy.
 */
function SubFieldColumn({
  node,
  selected,
  onToggle,
}: {
  node: FilterTreeNode
  selected: string[]
  onToggle: (path: string) => void
}) {
  const children = node.children ?? []

  return (
    <div className="min-w-0 flex-1 text-center">
      <button
        type="button"
        onClick={() => onToggle(node.label)}
        className={cn(
          'text-center text-[11px] font-bold uppercase tracking-wide underline decoration-ink/40 underline-offset-2 transition',
          selected.includes(node.label) ||
            selected.some((value) => value.startsWith(`${node.label} > `))
            ? 'text-brand decoration-brand'
            : 'text-ink hover:text-brand hover:decoration-brand',
        )}
      >
        {node.label}
      </button>
      <ul className="mt-1.5 space-y-1">
        {children.map((child) => {
          const path = `${node.label} > ${child.label}`
          const nested = child.children ?? []

          if (nested.length > 0) {
            return (
              <li key={path} className="pt-0.5 text-center">
                <p className="text-[11px] font-bold uppercase tracking-wide text-ink underline decoration-ink/40 underline-offset-2">
                  {child.label}
                </p>
                <ul className="mt-1 space-y-1 border-t border-line pt-1">
                  {nested.map((leaf) => {
                    const leafPath = `${path} > ${leaf.label}`
                    const active =
                      selected.includes(leafPath) ||
                      selected.includes(leaf.label) ||
                      selected.includes(path)
                    return (
                      <TaxonomyOption
                        key={leafPath}
                        label={leaf.label}
                        active={active}
                        onClick={() => onToggle(leafPath)}
                      />
                    )
                  })}
                </ul>
              </li>
            )
          }

          const active =
            selected.includes(path) ||
            selected.includes(child.label) ||
            selected.some((value) => value.startsWith(`${path} > `))

          return (
            <TaxonomyOption
              key={path}
              label={child.label}
              active={active}
              onClick={() => onToggle(path)}
            />
          )
        })}
      </ul>
    </div>
  )
}

export function ForumTaxonomyPanel({
  filters: filtersProp,
  onChange,
  className,
}: ForumTaxonomyPanelProps) {
  const filters = { ...EMPTY_FORUM_FILTERS, ...filtersProp }

  function toggleSubField(path: string) {
    // Exclusive select so Fields clicks clearly filter one category at a time.
    const next = filters.subField.includes(path) ? [] : [path]
    onChange({
      ...filters,
      field: filters.field.includes('Commercial')
        ? filters.field
        : [...filters.field, 'Commercial'],
      subField: next,
    })
  }

  function toggleFacet(key: keyof ForumFiltersState, value: string) {
    const current = filters[key]
    if (!Array.isArray(current)) return
    onChange({ ...filters, [key]: toggleValue(current, value) })
  }

  return (
    <section className={cn('bg-white', className)}>
      <div className="space-y-6 px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
        <div>
          <h3 className="text-center text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Fields
          </h3>
          <div className="mt-3 grid w-full grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 lg:grid-cols-8">
            {FORUM_COMMERCIAL_SUB_FIELD_TREE.map((node) => (
              <SubFieldColumn
                key={node.label}
                node={node}
                selected={filters.subField}
                onToggle={toggleSubField}
              />
            ))}
          </div>
        </div>

        <div className="pt-5">
          <h3 className="text-center text-xs font-bold uppercase tracking-[0.14em] text-muted">
            Demographic
          </h3>
          <div className="mt-3 grid w-full grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 lg:grid-cols-8">
            {FORUM_DEMOGRAPHIC_COLUMNS.map((column) => (
              <div key={column.id} className="min-w-0 text-center">
                <h4 className="text-[11px] font-bold uppercase tracking-wide text-ink underline decoration-ink/40 underline-offset-2">
                  {column.title}
                </h4>
                {column.options.length === 0 ? (
                  <p className="mt-1.5 text-[11px] text-muted">—</p>
                ) : (
                  <ul className="mt-1.5 space-y-1">
                    {column.options.map((option) => {
                      const key = column.filterKey
                      const selected = key ? filters[key] : null
                      const active =
                        Array.isArray(selected) && selected.includes(option)
                      return (
                        <TaxonomyOption
                          key={`${column.id}-${option}`}
                          label={option}
                          active={active}
                          onClick={() => {
                            if (!key) return
                            toggleFacet(key, option)
                          }}
                        />
                      )
                    })}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
