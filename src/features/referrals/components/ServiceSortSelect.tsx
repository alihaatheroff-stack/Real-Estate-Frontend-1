import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
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
  referals: 'referrals',
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
}

const DROPDOWN_WIDTH = '14rem'
const DROPDOWN_GAP = '0.5rem'

function NestBlock({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn('mt-0.5 space-y-0.5 border-l-2 border-brand/40 pl-2', className)}
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
      <span className="whitespace-normal break-words text-sm font-semibold leading-snug text-ink">
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
        <span className="whitespace-normal break-words text-sm leading-snug text-ink">
          {item}
        </span>
      </label>
    </div>
  )
}

export function ServiceSortSelect({ value, onChange, className }: ServiceSortSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const selection = useMemo(() => keysToSelection(value), [value])

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  const summary = 'Sort by'

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
        <span className="truncate">{summary}</span>
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
