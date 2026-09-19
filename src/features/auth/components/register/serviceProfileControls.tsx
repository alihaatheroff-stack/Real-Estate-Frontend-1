import { Children, useState, type ComponentProps, type ReactNode } from 'react'
import { ChevronDown, Plus } from 'lucide-react'
import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { HeroFilterSelect } from '@/features/search'
import { cn } from '@/shared/lib/cn'
import { WILLING_TO_TRAIN_FILTER_OPTIONS } from './constants'

export function RegisterFilterSelect(
  props: Omit<
    ComponentProps<typeof HeroFilterSelect>,
    'compact' | 'inlineMenu' | 'showQaMark' | 'showPriorityPanel' | 'alwaysShowPlaceholder'
  >,
) {
  return (
    <HeroFilterSelect
      {...props}
      compact
      inlineMenu
      showQaMark
      openOnHover
      showPriorityPanel
      alwaysShowPlaceholder
    />
  )
}

export function ProfileFilterGroup({
  title,
  defaultOpen = false,
  children,
}: {
  title: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl transition duration-200',
        open
          ? 'border border-b-brand/25 border-l-brand/25 border-r-brand/25 border-t-transparent bg-paper shadow-soft'
          : 'border border-line/80 bg-mist/20',
      )}
    >
      {open ? (
        <span
          className="absolute inset-y-0 left-0 w-1 bg-brand"
          aria-hidden
        />
      ) : null}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex w-full items-center justify-start gap-2 px-4 py-3 text-left outline-none transition',
          'hover:bg-mist/40 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/25',
          open && 'bg-brand-light/60 hover:bg-brand-light/80',
        )}
      >
        <span
          className={cn(
            'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition',
            open
              ? 'border-brand bg-brand-light text-brand'
              : 'border-ink bg-paper text-ink',
          )}
        >
          <ChevronDown
            className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
          />
        </span>
        <span className="text-sm font-bold text-ink">{title}</span>
      </button>
      {open ? (
        <div
          className="animate-slide-in w-full space-y-3 border-t border-line px-4 pb-4 pt-3"
          style={{ display: 'block' }}
        >
          {Children.map(children, (child) =>
            child == null ? null : (
              <div className="block w-full min-w-0" style={{ width: '100%' }}>
                {child}
              </div>
            ),
          )}
        </div>
      ) : null}
    </div>
  )
}

export function WillingToTrainSelect({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded
    ? WILLING_TO_TRAIN_FILTER_OPTIONS
    : WILLING_TO_TRAIN_FILTER_OPTIONS.slice(0, 3)
  const hiddenCount = WILLING_TO_TRAIN_FILTER_OPTIONS.length - 3

  return (
    <div className="space-y-1.5">
      <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted">
        Willing to train
        <FieldQaMark field="Willing to train" />
      </span>
      <div className="space-y-0.5">
        {visible.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2.5 py-1 text-sm text-ink-soft hover:text-ink"
          >
            <input
              type="checkbox"
              checked={value === option.value}
              onChange={() =>
                onChange(value === option.value ? '' : option.value)
              }
              className="h-3.5 w-3.5 rounded border-line text-brand focus:ring-brand/30"
            />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      {hiddenCount > 0 ? (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark"
        >
          <Plus className={cn('h-4 w-4 transition', expanded && 'rotate-45')} />
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      ) : null}
    </div>
  )
}
