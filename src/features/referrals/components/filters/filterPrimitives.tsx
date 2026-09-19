import { useState, type ReactNode } from 'react'
import { ChevronDown, Plus, Search } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

export function toggleFilterValue<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value]
}

type FilterSectionProps = {
  title: string
  children: ReactNode
  className?: string
  /** jobs drawer style vs projects sidebar spacing */
  variant?: 'jobs' | 'projects' | 'drawer'
}

export function FilterSection({
  title,
  children,
  className,
  variant = 'jobs',
}: FilterSectionProps) {
  if (variant === 'projects') {
    return (
      <div className={cn('mt-8 border-t border-freeio-border-soft pt-6 first:mt-0 first:border-t-0 first:pt-0', className)}>
        <h3 className="text-base font-bold text-freeio-ink">{title}</h3>
        <div className="mt-4">{children}</div>
      </div>
    )
  }

  if (variant === 'drawer') {
    return (
      <section className={cn('border-b border-freeio-border-soft px-6 py-5', className)}>
        <h3 className="mb-4 text-lg font-bold text-freeio-ink">{title}</h3>
        {children}
      </section>
    )
  }

  return (
    <section className={cn('border-b border-freeio-border-soft py-6', className)}>
      <h3 className="mb-4 text-lg font-bold text-freeio-ink">{title}</h3>
      {children}
    </section>
  )
}

type FilterSelectFieldProps = {
  value: string
  placeholder: string
  options: string[]
  onChange: (value: string) => void
  /** taller jobs select vs compact projects */
  size?: 'lg' | 'md'
}

export function FilterSelectField({
  value,
  placeholder,
  options,
  onChange,
  size = 'lg',
}: FilterSelectFieldProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn(
          'w-full appearance-none rounded-xl border border-freeio-border bg-white text-freeio-ink outline-none transition focus:border-freeio',
          size === 'lg'
            ? 'h-14 rounded-xl px-4 pr-11 text-[15px]'
            : 'h-12 rounded-lg px-4 pr-10 text-sm',
        )}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        className={cn(
          'pointer-events-none absolute top-1/2 -translate-y-1/2 text-freeio-subtle',
          size === 'lg' ? 'right-4 h-5 w-5' : 'right-3 h-4 w-4',
        )}
      />
    </div>
  )
}

type FilterCheckboxOption = string | { label: string; value: string }

type FilterCheckboxGroupProps = {
  options: FilterCheckboxOption[]
  selected: string[]
  onToggle: (value: string) => void
  initialVisible?: number
  /** plus/show-more (jobs) vs chevron (projects/employer) */
  expandStyle?: 'plus' | 'chevron'
  density?: 'comfortable' | 'compact'
  title?: string
}

function optionLabel(option: FilterCheckboxOption) {
  return typeof option === 'string' ? option : option.label
}

function optionValue(option: FilterCheckboxOption) {
  return typeof option === 'string' ? option : option.value
}

export function FilterCheckboxGroup({
  options,
  selected,
  onToggle,
  initialVisible = 4,
  expandStyle = 'plus',
  density = 'comfortable',
  title,
}: FilterCheckboxGroupProps) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? options : options.slice(0, initialVisible)
  const hiddenCount = Math.max(0, options.length - initialVisible)

  return (
    <div>
      {title ? <h3 className="text-base font-bold text-freeio-ink">{title}</h3> : null}
      <ul
        className={cn(
          density === 'compact' ? 'space-y-3' : 'space-y-1',
          title && 'mt-4',
        )}
      >
        {visible.map((option) => {
          const value = optionValue(option)
          const label = optionLabel(option)
          const checked = selected.includes(value)
          return (
            <li key={value}>
              <label
                className={cn(
                  'flex cursor-pointer items-center gap-3 text-freeio-ink',
                  density === 'compact'
                    ? 'text-sm text-freeio-muted'
                    : 'py-2 text-[15px]',
                )}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(value)}
                  className={cn(
                    'shrink-0 rounded-[3px] border border-freeio-check accent-freeio',
                    density === 'compact' ? 'h-[18px] w-[18px]' : 'h-5 w-5',
                  )}
                />
                <span
                  className={cn(
                    checked && 'font-medium',
                    density === 'compact' && checked && 'text-freeio-ink',
                  )}
                >
                  {label}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className={cn(
            'inline-flex items-center gap-1.5 font-medium transition',
            expandStyle === 'plus'
              ? 'mt-2 text-[15px] text-freeio hover:opacity-80'
              : 'mt-3 text-sm font-semibold text-freeio-ink hover:text-freeio',
          )}
        >
          {expandStyle === 'plus' ? (
            <>
              <Plus className={cn('h-4 w-4 transition', expanded && 'rotate-45')} />
              {expanded ? 'Show less' : 'Show More'}
            </>
          ) : (
            <>
              {expanded ? 'Show Less' : 'Show More'}
              <ChevronDown className={cn('h-4 w-4 transition', expanded && 'rotate-180')} />
            </>
          )}
        </button>
      ) : null}
    </div>
  )
}

type FilterSearchButtonProps = {
  onClick: () => void
  className?: string
  size?: 'lg' | 'md'
}

export function FilterSearchButton({
  onClick,
  className,
  size = 'lg',
}: FilterSearchButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex w-full items-center justify-center gap-2 font-semibold text-white transition hover:brightness-95 bg-freeio',
        size === 'lg'
          ? 'mt-4 h-14 rounded-xl text-[15px]'
          : 'mt-8 h-12 rounded-lg text-sm',
        className,
      )}
    >
      <Search className={size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} />
      Search
    </button>
  )
}

type FilterAsideProps = {
  children: ReactNode
  className?: string
  embedded?: boolean
}

export function FilterAside({ children, className, embedded = false }: FilterAsideProps) {
  return (
    <aside
      className={cn(
        embedded
          ? 'bg-white'
          : 'rounded-2xl border border-freeio-border-soft bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.03)]',
        className,
      )}
    >
      {children}
    </aside>
  )
}
