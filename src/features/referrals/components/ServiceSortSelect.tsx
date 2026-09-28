import { Fragment, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import type { ServiceSortKey } from '@/features/referrals/hooks/useServiceResults'
import { cn } from '@/shared/lib/cn'

const TOP_OPTIONS = [
  'Latest',
  'Referrals; Highest to Lowest:',
  'Referrals; Lowest to Highest:',
  'referals',
  'Willing to train',
  'High to low price',
  'Low to high price',
] as const

const PRIMARY_SORT_OPTIONS = [
  'Latest',
  'Referrals; Highest to Lowest:',
  'Referrals; Lowest to Highest:',
  'High to low price',
  'Low to high price',
] as const

const REFERRAL_OPTIONS = ['50%', '40%', '30%', '20%', '10%', '0%']
const TRAIN_OPTIONS = ['Yes', 'Maybe', 'no']

const TOP_TO_KEY: Record<(typeof TOP_OPTIONS)[number], ServiceSortKey> = {
  Latest: 'latest',
  'Referrals; Highest to Lowest:': 'referral-desc',
  'Referrals; Lowest to Highest:': 'referral-asc',
  'High to low price': 'price-desc',
  'Low to high price': 'price-asc',
  'referals': 'referrals',
  'Willing to train': 'willing-to-train',
}

const REFERRAL_TO_KEY: Record<string, ServiceSortKey> = {
  '50%': 'referral-50',
  '40%': 'referral-40',
  '30%': 'referral-30',
  '20%': 'referral-20',
  '10%': 'referral-10',
  '0%': 'referral-0',
}

const TRAIN_TO_KEY: Record<string, ServiceSortKey> = {
  Yes: 'train-yes',
  Maybe: 'train-maybe',
  no: 'train-no',
}

const KEY_TO_TOP = Object.fromEntries(
  Object.entries(TOP_TO_KEY).map(([label, key]) => [key, label]),
) as Record<ServiceSortKey, string>

/** Keep at most one selected item from a group. */
function selectSingleInGroup(list: string[], item: string, group: readonly string[]) {
  if (list.includes(item)) return list.filter((value) => value !== item)
  return [...list.filter((value) => !group.includes(value)), item]
}

const NESTED_PARENTS = new Set(['referals', 'Willing to train'])

function keysToSelection(value: ServiceSortKey[]) {
  const top: string[] = []
  const referral: string[] = []
  const train: string[] = []

  value.forEach((key) => {
    const topLabel = KEY_TO_TOP[key]
    if (topLabel && !NESTED_PARENTS.has(topLabel)) top.push(topLabel)
    const referralLabel = Object.entries(REFERRAL_TO_KEY).find(([, k]) => k === key)?.[0]
    if (referralLabel) referral.push(referralLabel)
    const trainLabel = Object.entries(TRAIN_TO_KEY).find(([, k]) => k === key)?.[0]
    if (trainLabel) train.push(trainLabel)
  })

  return { top, referral, train }
}

function selectionToKeys(top: string[], referral: string[], train: string[]) {
  const keys: ServiceSortKey[] = []

  top.forEach((label) => {
    if (NESTED_PARENTS.has(label)) return
    const key = TOP_TO_KEY[label as (typeof TOP_OPTIONS)[number]]
    if (key) keys.push(key)
  })
  referral.forEach((label) => {
    const key = REFERRAL_TO_KEY[label]
    if (key) keys.push(key)
  })
  train.forEach((label) => {
    const key = TRAIN_TO_KEY[label]
    if (key) keys.push(key)
  })

  return keys
}

type ServiceSortSelectProps = {
  value: ServiceSortKey[]
  onChange: (value: ServiceSortKey[]) => void
  className?: string
  variant?: 'box' | 'underline'
}

const DROPDOWN_WIDTH = '14rem'
const DROPDOWN_GAP = '0.5rem'

function SortAscIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5 shrink-0">
      <path
        d="M5 12.5V3.5M5 3.5L2.75 5.75M5 3.5L7.25 5.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 3.5V12.5M11 12.5L8.75 10.25M11 12.5L13.25 10.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SortDescIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5 shrink-0">
      <path
        d="M5 3.5V12.5M5 12.5L2.75 10.25M5 12.5L7.25 10.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 12.5V3.5M11 3.5L8.75 5.75M11 3.5L13.25 5.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SortNewestIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5 shrink-0">
      <circle cx="8" cy="8.25" r="5.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 5.75V8.5L9.75 9.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.75 2.25L12.35 3.65L13.75 4.25L12.35 4.85L11.75 6.25L11.15 4.85L9.75 4.25L11.15 3.65L11.75 2.25Z"
        fill="currentColor"
      />
    </svg>
  )
}

function SortPriceIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5 shrink-0">
      <path
        d="M8 2.6v10.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M10.85 5.2C10.4 4.25 9.3 3.65 8 3.65 6.3 3.65 5.15 4.55 5.15 5.85c0 1.2.9 1.8 2.95 2.3 2 .48 3.05 1.2 3.05 2.6 0 1.5-1.4 2.55-3.2 2.55-1.45 0-2.6-.65-3.05-1.75"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SortPercentIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5 shrink-0">
      <circle cx="5" cy="5" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="11" cy="11" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12.25 3.75 3.75 12.25"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

function SortTrainIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className="h-3.5 w-3.5 shrink-0">
      <path
        d="M2.5 6.25 8 3.5l5.5 2.75L8 9 2.5 6.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 7.35V11c0 .9 1.7 1.75 3.75 1.75s3.75-.85 3.75-1.75V7.35"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M13.5 6.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function optionIconForLabel(label: string): ReactNode {
  switch (label) {
    case 'Latest':
      return <SortNewestIcon />
    case 'Referrals; Highest to Lowest:':
      return <SortDescIcon />
    case 'Referrals; Lowest to Highest:':
      return <SortAscIcon />
    case 'High to low price':
    case 'Low to high price':
      return <SortPriceIcon />
    case 'referals':
      return <SortPercentIcon />
    case 'Willing to train':
      return <SortTrainIcon />
    default:
      return null
  }
}

function OptionLabel({ label }: { label: string }) {
  const icon = optionIconForLabel(label)
  return (
    <span className="inline-flex items-center gap-1.5">
      {icon}
      <span className="group-hover:underline group-focus-visible:underline decoration-brand underline-offset-[3px]">
        {label}
      </span>
    </span>
  )
}

function NestBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn('mt-0.5 space-y-0.5 pl-4', className)}
      data-nested
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

/** Non-selectable heading for parents that have nested options. */
function GroupHeadingRow({ item }: { item: string }) {
  return (
    <div className="flex items-start gap-1.5 rounded-lg px-2 py-1.5">
      <span className="inline-block w-5 shrink-0" aria-hidden />
      <span className="inline-flex items-center gap-1.5 whitespace-normal break-words text-sm font-semibold leading-snug text-ink">
        {optionIconForLabel(item)}
        {item}
      </span>
    </div>
  )
}

function OptionRow({
  item,
  checked,
  onToggle,
}: {
  item: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={cn(
        'flex items-start gap-1.5 rounded-lg px-2 py-1.5 hover:bg-mist',
        checked && 'bg-brand/10',
      )}
    >
      <span className="inline-block w-5 shrink-0" aria-hidden />
      <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-line text-brand focus:ring-brand/30"
        />
        <span className="inline-flex min-w-0 items-center gap-1.5 whitespace-normal break-words text-sm leading-snug text-ink">
          {optionIconForLabel(item)}
          {item}
        </span>
      </label>
    </div>
  )
}

export function ServiceSortSelect({
  value,
  onChange,
  className,
  variant = 'box',
}: ServiceSortSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const underline = variant === 'underline'
  const [menuPos, setMenuPos] = useState<{ top: number; left: number; minWidth: number } | null>(
    null,
  )

  const selection = useMemo(() => keysToSelection(value), [value])

  useEffect(() => {
    if (!open) return

    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }

    function syncMenuPos() {
      if (!underline) return
      const trigger = rootRef.current?.querySelector('button')
      if (!trigger) return
      const rect = trigger.getBoundingClientRect()
      const minWidth = Math.max(rect.width, 280)
      const left = Math.min(rect.left, window.innerWidth - minWidth - 8)
      setMenuPos({ top: rect.bottom + 4, left: Math.max(8, left), minWidth })
    }

    syncMenuPos()
    document.addEventListener('mousedown', onPointerDown)
    if (underline) {
      window.addEventListener('resize', syncMenuPos)
      window.addEventListener('scroll', syncMenuPos, true)
    }
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      if (underline) {
        window.removeEventListener('resize', syncMenuPos)
        window.removeEventListener('scroll', syncMenuPos, true)
      }
    }
  }, [open, underline])

  function updateSelection(nextTop: string[], nextReferral: string[], nextTrain: string[]) {
    onChange(selectionToKeys(nextTop, nextReferral, nextTrain))
  }

  function renderNestedOptions(
    parent: string,
    options: string[],
    nestedValue: string[],
  ) {
    return (
      <div key={parent}>
        <GroupHeadingRow item={parent} />
        <NestBlock className="ml-5">
          {options.map((child) => (
            <OptionRow
              key={child}
              item={child}
              checked={nestedValue.includes(child)}
              onToggle={() => {
                const nextNested = nestedValue.includes(child) ? [] : [child]
                if (parent === 'referals') {
                  updateSelection(selection.top, nextNested, selection.train)
                } else {
                  updateSelection(selection.top, selection.referral, nextNested)
                }
              }}
            />
          ))}
        </NestBlock>
      </div>
    )
  }

  function renderUnderlineNested(
    parent: string,
    options: string[],
    nestedValue: string[],
  ) {
    return (
      <Fragment key={parent}>
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-[13px] font-bold text-brand">
          {optionIconForLabel(parent)}
          <span>{parent}</span>
        </div>
        {options.map((child) => {
          const active = nestedValue.includes(child)
          return (
            <button
              key={`${parent}-${child}`}
              type="button"
              role="option"
              aria-selected={active}
              data-active={active ? 'true' : undefined}
              data-nested="true"
              onClick={() => {
                const nextNested = active ? [] : [child]
                if (parent === 'referals') {
                  updateSelection(selection.top, nextNested, selection.train)
                } else {
                  updateSelection(selection.top, selection.referral, nextNested)
                }
              }}
              className="group whitespace-nowrap"
            >
              {child}
            </button>
          )
        })}
      </Fragment>
    )
  }

  const underlineSummary = useMemo(() => {
    const parts = [
      ...selection.top,
      ...selection.referral,
      ...selection.train,
    ]
    if (parts.length === 0) return null
    return parts.join(', ')
  }, [selection.referral, selection.top, selection.train])

  if (underline) {
    return (
      <div className={cn('inline-flex items-center gap-1.5 text-sm', className)}>
        <span className="shrink-0 whitespace-nowrap font-semibold text-ink">Sort By:</span>
        <div ref={rootRef} className="relative z-20 w-auto min-w-0">
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Sort by"
            aria-expanded={open}
            aria-haspopup="listbox"
            className="inline-flex min-w-24 max-w-[14rem] items-center justify-between gap-1.5 border-0 border-b-2 border-ink/35 bg-transparent py-0.5 text-left text-sm font-semibold leading-none text-ink outline-none transition hover:border-brand"
          >
            <span
              className={cn(
                'min-w-0 truncate',
                underlineSummary ? 'text-sky-500' : 'font-medium text-ink/55',
              )}
            >
              {underlineSummary ?? '\u00a0'}
            </span>
            <span
              aria-hidden
              className={cn(
                'mb-0.5 shrink-0 text-[9px] leading-none transition',
                open && 'rotate-180',
              )}
            >
              ▼
            </span>
          </button>
          <div
            className={cn(
              'settings-paste-menu settings-paste-menu--underline network-thin-scroll max-h-56 overflow-y-auto',
              open ? 'is-open z-[60]' : 'pointer-events-none',
            )}
            style={
              menuPos
                ? {
                    position: 'fixed',
                    top: menuPos.top,
                    left: menuPos.left,
                    minWidth: menuPos.minWidth,
                    width: 'auto',
                  }
                : undefined
            }
            role="listbox"
          >
            {TOP_OPTIONS.map((item) => {
              if (item === 'referals') {
                return renderUnderlineNested(item, REFERRAL_OPTIONS, selection.referral)
              }
              if (item === 'Willing to train') {
                return renderUnderlineNested(item, TRAIN_OPTIONS, selection.train)
              }
              const active = selection.top.includes(item)
              return (
                <button
                  key={item}
                  type="button"
                  role="option"
                  aria-selected={active}
                  data-active={active ? 'true' : undefined}
                  onClick={() =>
                    updateSelection(
                      selectSingleInGroup(selection.top, item, PRIMARY_SORT_OPTIONS),
                      selection.referral,
                      selection.train,
                    )
                  }
                  className="group whitespace-nowrap"
                >
                  <OptionLabel label={item} />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        'relative ml-auto shrink-0 transition-transform duration-200 ease-out',
        open && 'z-50 translate-x-[calc(-14rem-0.5rem)]',
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Sort by"
        aria-expanded={open}
        className="inline-flex h-11 items-center gap-3 rounded-lg border border-freeio-border bg-white px-3 text-[15px] font-medium text-freeio-ink outline-none transition hover:border-freeio focus:border-freeio"
      >
        <span className="truncate">Sort by</span>
        <span
          aria-hidden
          className={cn(
            'shrink-0 text-[10px] leading-none text-freeio-ink transition',
            open && 'rotate-180',
          )}
        >
          ▼
        </span>
      </button>

      {open ? (
        <div
          className="absolute left-full top-0 z-50 overflow-hidden rounded-xl border border-freeio-border bg-white py-1 shadow-[0_12px_40px_rgba(0,0,0,0.1)]"
          style={{ width: DROPDOWN_WIDTH, marginLeft: DROPDOWN_GAP }}
        >
          <div className="max-h-72 overflow-y-auto p-1">
            {TOP_OPTIONS.map((item) => {
              if (item === 'referals') {
                return renderNestedOptions(item, REFERRAL_OPTIONS, selection.referral)
              }
              if (item === 'Willing to train') {
                return renderNestedOptions(item, TRAIN_OPTIONS, selection.train)
              }
              return (
                <OptionRow
                  key={item}
                  item={item}
                  checked={selection.top.includes(item)}
                  onToggle={() =>
                    updateSelection(
                      selectSingleInGroup(selection.top, item, PRIMARY_SORT_OPTIONS),
                      selection.referral,
                      selection.train,
                    )
                  }
                />
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}
