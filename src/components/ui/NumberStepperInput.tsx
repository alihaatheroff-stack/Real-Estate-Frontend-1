import type { InputHTMLAttributes } from 'react'
import { Minus, Plus } from 'lucide-react'
import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { cn } from '@/shared/lib/cn'

type NumberStepperInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'type'
> & {
  label?: string
  value: string
  onChange: (value: string) => void
  min?: number
  max?: number
  step?: number
  unit?: string
  /** Show trailing info icon for QA / why-this-question help. */
  showQaMark?: boolean
}

function parseNumericValue(raw: string) {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return null
  return Number(digits)
}

function formatValue(value: number, unit: string) {
  return unit ? `${value}${unit}` : String(value)
}

export function NumberStepperInput({
  className,
  label,
  id,
  name,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 5,
  unit = '%',
  placeholder,
  disabled,
  showQaMark = false,
  ...props
}: NumberStepperInputProps) {
  const inputId = id ?? name
  const numericValue = parseNumericValue(value)

  function commit(next: number) {
    const clamped = Math.min(max, Math.max(min, next))
    onChange(formatValue(clamped, unit))
  }

  function adjust(delta: number) {
    const base = numericValue ?? (delta > 0 ? min : min)
    commit(base + delta)
  }

  function handleInputChange(raw: string) {
    if (!raw.trim()) {
      onChange('')
      return
    }
    const next = parseNumericValue(raw)
    if (next === null) return
    commit(next)
  }

  return (
    <label className="flex w-full flex-col gap-1.5 text-sm">
      {label ? (
        <span className="inline-flex items-center gap-1 font-bold text-ink">
          {label}
          {showQaMark ? <FieldQaMark field={label} /> : null}
        </span>
      ) : null}
      <div
        className={cn(
          'flex h-11 w-full items-stretch overflow-hidden rounded-xl border border-line bg-paper transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20',
          disabled && 'cursor-not-allowed opacity-60',
          className,
        )}
      >
        <button
          type="button"
          aria-label="Decrease value"
          disabled={disabled || (numericValue ?? min) <= min}
          onClick={() => adjust(-step)}
          className="flex w-11 shrink-0 items-center justify-center border-r border-line text-ink transition hover:bg-mist/60 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="h-4 w-4" />
        </button>
        <input
          id={inputId}
          name={name}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.target.value)}
          className="min-w-0 flex-1 border-0 bg-transparent px-3 text-center text-ink outline-none placeholder:text-muted/70"
          {...props}
        />
        <button
          type="button"
          aria-label="Increase value"
          disabled={disabled || (numericValue ?? min) >= max}
          onClick={() => adjust(step)}
          className="flex w-11 shrink-0 items-center justify-center border-l border-line text-ink transition hover:bg-mist/60 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </label>
  )
}
