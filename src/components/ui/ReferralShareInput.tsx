import { useState } from 'react'
import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { cn } from '@/shared/lib/cn'

const SLOT_COUNT = 4

function digitsOf(value: string) {
  return value.replace(/\D/g, '').slice(0, SLOT_COUNT)
}

function formatShare(digits: string) {
  if (!digits) return ''
  const whole = digits.slice(0, Math.min(2, digits.length))
  const fraction = digits.slice(2)
  return fraction ? `${whole}.${fraction}%` : `${whole}%`
}

type ReferralShareInputProps = {
  value: string
  onChange: (value: string) => void
  label?: string
  name?: string
  compact?: boolean
  showQaMark?: boolean
  hideLabel?: boolean
  className?: string
}

export function ReferralShareInput({
  value,
  onChange,
  label = 'Referral Share:',
  name = 'referralShare',
  compact = false,
  showQaMark = false,
  hideLabel = false,
  className,
}: ReferralShareInputProps) {
  const [focused, setFocused] = useState(false)
  const digits = digitsOf(value)
  const slots = [0, 1, 2, 3].map((index) => digits[index] ?? '_')
  const activeIndex = Math.min(digits.length, SLOT_COUNT - 1)

  function handleRaw(raw: string) {
    onChange(formatShare(digitsOf(raw)))
  }

  return (
    <div className={cn(compact ? 'relative shrink-0 overflow-visible' : 'w-full', className)}>
      {hideLabel ? null : (
        <label
          htmlFor={name}
          className={cn(
            'inline-flex max-w-full items-center gap-1 font-bold',
            compact
              ? 'text-sm leading-snug text-ink'
              : 'mb-1.5 text-sm text-ink',
          )}
        >
          <span className={compact ? 'truncate' : undefined}>{label}</span>
          {showQaMark ? <FieldQaMark field={label} /> : null}
        </label>
      )}

      <div
        className={cn(
          'relative flex w-full cursor-text items-center bg-white text-left outline-none',
          compact
            ? 'mt-0.5 min-h-11 rounded-xl border-2 border-ink/15 px-2 py-1.5 shadow-sm focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/25'
            : 'h-11 rounded-xl border border-line px-3 focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20',
        )}
      >
        <input
          id={name}
          name={name}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          spellCheck={false}
          aria-label={label}
          value={digits}
          onChange={(event) => handleRaw(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="absolute inset-0 cursor-text opacity-0"
        />
        <span
          className={cn(
            'pointer-events-none flex items-baseline font-medium tabular-nums tracking-[0.18em] text-ink',
            compact ? 'gap-1 text-sm' : 'gap-1.5 text-base',
          )}
        >
          <Slot value={slots[0]} empty={!digits[0]} active={focused && activeIndex === 0} />
          <Slot value={slots[1]} empty={!digits[1]} active={focused && activeIndex === 1} />
          <span className="tracking-normal text-ink/70">.</span>
          <Slot value={slots[2]} empty={!digits[2]} active={focused && activeIndex === 2} />
          <Slot value={slots[3]} empty={!digits[3]} active={focused && activeIndex === 3} />
          <span className="ml-1 tracking-normal text-ink/70">%</span>
        </span>
      </div>
    </div>
  )
}

function Slot({
  value,
  empty,
  active,
}: {
  value: string
  empty: boolean
  active: boolean
}) {
  return (
    <span
      className={cn(
        'inline-block min-w-[0.7em] border-b text-center',
        empty ? 'text-ink/35' : 'text-ink',
        active ? 'border-brand' : 'border-transparent',
      )}
    >
      {value}
    </span>
  )
}
