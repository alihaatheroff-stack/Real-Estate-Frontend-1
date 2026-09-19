import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Clock } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

type Period = 'AM' | 'PM'

type TimeParts = {
  hour12: number
  minute: number
  second: number
  period: Period
}

type TimeInputProps = {
  value: string
  onChange: (value: string) => void
  name?: string
  id?: string
  className?: string
  inputClassName?: string
  disabled?: boolean
  required?: boolean
  /** Match date field: underline row with clock icon on the right */
  variant?: 'default' | 'underline'
  showSeconds?: boolean
  live?: boolean
  'aria-label'?: string
  'aria-invalid'?: boolean
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 1)
const MINUTES = Array.from({ length: 60 }, (_, i) => i)
const SECONDS = Array.from({ length: 60 }, (_, i) => i)
const PERIODS: Period[] = ['AM', 'PM']

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function parseTime(value: string): TimeParts | null {
  const match = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(value.trim())
  if (!match) return null
  const hour24 = Number(match[1])
  const minute = Number(match[2])
  const second = match[3] != null ? Number(match[3]) : 0
  if (
    Number.isNaN(hour24) ||
    Number.isNaN(minute) ||
    Number.isNaN(second) ||
    hour24 < 0 ||
    hour24 > 23 ||
    minute < 0 ||
    minute > 59 ||
    second < 0 ||
    second > 59
  ) {
    return null
  }
  const period: Period = hour24 >= 12 ? 'PM' : 'AM'
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12
  return { hour12, minute, second, period }
}

function toValue({ hour12, minute, second, period }: TimeParts, withSeconds: boolean) {
  let hour24 = hour12 % 12
  if (period === 'PM') hour24 += 12
  return withSeconds
    ? `${pad(hour24)}:${pad(minute)}:${pad(second)}`
    : `${pad(hour24)}:${pad(minute)}`
}

function formatDisplay(parts: TimeParts | null, withSeconds: boolean) {
  if (!parts) return ''
  const clock = withSeconds
    ? `${pad(parts.hour12)}:${pad(parts.minute)}:${pad(parts.second)}`
    : `${pad(parts.hour12)}:${pad(parts.minute)}`
  return `${clock} ${parts.period}`
}

function defaultParts(): TimeParts {
  const now = new Date()
  return (
    parseTime(
      `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`,
    ) ?? {
      hour12: 12,
      minute: 0,
      second: 0,
      period: 'AM',
    }
  )
}

function Column({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex min-w-[3.25rem] flex-col">
      <p className="px-1 pb-1 text-center text-[10px] font-semibold uppercase tracking-wide text-muted">
        {label}
      </p>
      <div className="max-h-44 overflow-y-auto overscroll-contain rounded-lg bg-mist/50 py-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </div>
  )
}

function OptionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
}) {
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({ block: 'nearest' })
    }
  }, [selected])

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        'mx-1 flex h-8 w-[2.75rem] items-center justify-center rounded-md text-sm font-medium transition',
        selected ? 'bg-brand text-white' : 'text-ink hover:bg-brand-light/70',
      )}
    >
      {children}
    </button>
  )
}

export function TimeInput({
  value,
  onChange,
  name,
  id,
  className,
  inputClassName,
  disabled,
  required,
  variant = 'default',
  showSeconds = false,
  live = false,
  'aria-label': ariaLabel,
  'aria-invalid': ariaInvalid,
}: TimeInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const parts = parseTime(value)
  const active = parts ?? defaultParts()

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  function commit(next: TimeParts) {
    onChange(toValue(next, showSeconds))
  }

  function toggleOpen() {
    if (!disabled && !live) setOpen((prev) => !prev)
  }

  const picker = open ? (
    <div
      role="dialog"
      aria-label="Time picker"
      className="absolute left-0 top-[calc(100%+0.35rem)] z-40 flex gap-1 rounded-xl border border-line bg-paper p-2 shadow-panel"
    >
      <Column label="Hour">
        {HOURS.map((hour) => (
          <OptionButton
            key={hour}
            selected={active.hour12 === hour}
            onClick={() => commit({ ...active, hour12: hour })}
          >
            {pad(hour)}
          </OptionButton>
        ))}
      </Column>
      <Column label="Min">
        {MINUTES.map((minute) => (
          <OptionButton
            key={minute}
            selected={active.minute === minute}
            onClick={() => commit({ ...active, minute })}
          >
            {pad(minute)}
          </OptionButton>
        ))}
      </Column>
      {showSeconds ? (
        <Column label="Sec">
          {SECONDS.map((second) => (
            <OptionButton
              key={second}
              selected={active.second === second}
              onClick={() => commit({ ...active, second })}
            >
              {pad(second)}
            </OptionButton>
          ))}
        </Column>
      ) : null}
      <Column label="Period">
        {PERIODS.map((period) => (
          <OptionButton
            key={period}
            selected={active.period === period}
            onClick={() => commit({ ...active, period })}
          >
            {period}
          </OptionButton>
        ))}
      </Column>
    </div>
  ) : null

  if (variant === 'underline') {
    return (
      <div ref={rootRef} className={cn('relative', className)}>
        <input type="hidden" name={name} value={value} required={required} readOnly />
        <div className="relative flex items-end gap-2 border-b-2 border-ink/30 focus-within:border-brand">
          {live ? (
            <span
              id={inputId}
              aria-label={ariaLabel ?? 'Current time'}
              aria-live="polite"
              aria-atomic="true"
              className={cn(
                'flex h-12 min-w-0 flex-1 items-center bg-transparent px-2 text-left text-base tabular-nums text-ink sm:h-14 sm:text-lg',
                !parts && 'text-muted/50',
                inputClassName,
              )}
            >
              {formatDisplay(parts, showSeconds) || (showSeconds ? 'HH:MM:SS AM' : 'HH:MM AM')}
            </span>
          ) : (
            <button
              type="button"
              id={inputId}
              disabled={disabled}
              aria-label={ariaLabel ?? 'Select time'}
              aria-invalid={ariaInvalid}
              aria-expanded={open}
              aria-haspopup="dialog"
              onClick={toggleOpen}
              className={cn(
                'h-12 min-w-0 flex-1 border-0 bg-transparent px-2 text-left text-base tabular-nums text-ink outline-none transition sm:h-14 sm:text-lg',
                !parts && 'text-muted/50',
                disabled && 'cursor-not-allowed opacity-60',
                inputClassName,
              )}
            >
              {formatDisplay(parts, showSeconds) || (showSeconds ? 'HH:MM:SS AM' : 'HH:MM AM')}
            </button>
          )}
          {live ? (
            <span
              className="mb-2 inline-flex h-9 w-9 shrink-0 items-center justify-center text-muted"
              aria-hidden
            >
              <Clock className="h-5 w-5" strokeWidth={1.75} />
            </span>
          ) : (
            <button
              type="button"
              disabled={disabled}
              onClick={toggleOpen}
              className="mb-2 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-mist hover:text-brand disabled:opacity-60"
              aria-label="Open time picker"
            >
              <Clock className="h-5 w-5" strokeWidth={1.75} />
            </button>
          )}
        </div>
        {live ? null : picker}
      </div>
    )
  }

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <input type="hidden" name={name} value={value} required={required} readOnly />
      <div
        className={cn(
          'flex h-11 w-full items-center overflow-hidden rounded-xl border border-line bg-paper transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20',
          ariaInvalid && 'border-danger focus-within:border-danger focus-within:ring-danger/20',
          disabled && 'cursor-not-allowed opacity-60',
          inputClassName,
        )}
      >
        <button
          type="button"
          id={inputId}
          disabled={disabled}
          aria-label={ariaLabel ?? 'Select time'}
          aria-invalid={ariaInvalid}
          aria-expanded={open}
          aria-haspopup="dialog"
          onClick={toggleOpen}
          className={cn(
            'h-full min-w-0 flex-1 bg-transparent px-3 text-left text-sm text-ink outline-none',
            !parts && 'text-muted/70',
          )}
        >
          {formatDisplay(parts, showSeconds) || (showSeconds ? 'HH:MM:SS AM' : 'HH:MM AM')}
        </button>
        <button
          type="button"
          disabled={disabled}
          onClick={toggleOpen}
          className="inline-flex h-full w-10 shrink-0 items-center justify-center text-muted transition hover:text-brand disabled:opacity-60"
          aria-label="Open time picker"
        >
          <Clock className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
      {picker}
    </div>
  )
}
