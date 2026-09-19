import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { Calendar, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

type DateParts = {
  year: number
  month: number // 0-11
  day: number
}

type DateInputProps = {
  value: string
  onChange: (value: string) => void
  name?: string
  id?: string
  className?: string
  inputClassName?: string
  disabled?: boolean
  required?: boolean
  placeholder?: string
  variant?: 'default' | 'underline' | 'inline'
  'aria-label'?: string
  'aria-invalid'?: boolean
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] as const
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const

const YEAR_START = 1920
const YEAR_END = 2100
const YEARS = Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => YEAR_START + i)

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function parseDisplayDate(value: string): DateParts | null {
  const digits = value.replace(/\D/g, '')
  if (digits.length !== 8) return null
  const month = Number(digits.slice(0, 2))
  const day = Number(digits.slice(2, 4))
  const year = Number(digits.slice(4, 8))
  if (
    Number.isNaN(month) ||
    Number.isNaN(day) ||
    Number.isNaN(year) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    year < YEAR_START ||
    year > YEAR_END
  ) {
    return null
  }
  const maxDay = daysInMonth(year, month - 1)
  if (day > maxDay) return null
  return { year, month: month - 1, day }
}

function toDisplayDate({ year, month, day }: DateParts) {
  return `${pad(month + 1)}/${pad(day)}/${year}`
}

function formatTypedDate(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

function todayParts(): DateParts {
  const now = new Date()
  return { year: now.getFullYear(), month: now.getMonth(), day: now.getDate() }
}

function sameDay(a: DateParts | null, b: DateParts) {
  return Boolean(a && a.year === b.year && a.month === b.month && a.day === b.day)
}

function ScrollOption({
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
      ref.current?.scrollIntoView({ block: 'center' })
    }
  }, [selected])

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={cn(
        'mx-1 flex h-8 w-[calc(100%-0.5rem)] items-center justify-center rounded-md text-sm font-medium transition',
        selected
          ? 'text-ink underline decoration-ink underline-offset-4'
          : 'text-ink hover:underline hover:decoration-ink hover:underline-offset-4',
      )}
    >
      {children}
    </button>
  )
}

function HeaderSelectBox({
  label,
  selected,
  onClick,
  ariaLabel,
  className,
  buttonClassName,
  menuClassName,
  children,
}: {
  label: string
  selected: boolean
  onClick: () => void
  ariaLabel: string
  className?: string
  buttonClassName?: string
  menuClassName?: string
  children?: ReactNode
}) {
  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        aria-expanded={selected}
        className={cn(
          'inline-flex w-full items-center justify-between gap-1 rounded-lg border px-2 py-1.5 text-sm font-semibold transition',
          selected
            ? 'border-brand bg-brand-light/50 text-ink'
            : 'border-line bg-paper text-ink hover:bg-mist',
          buttonClassName,
        )}
      >
        <span className="whitespace-nowrap">{label}</span>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-muted transition', selected && 'rotate-180')}
          strokeWidth={2}
        />
      </button>
      {selected && children ? (
        <div
          role="listbox"
          className={cn(
            'absolute left-0 top-[calc(100%+0.25rem)] z-50 min-w-full rounded-lg border border-line bg-paper py-1 shadow-panel',
            menuClassName,
          )}
        >
          <div className="date-picker-scroll max-h-44 overflow-y-auto overscroll-contain pr-1">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function buildCalendarCells(viewYear: number, viewMonth: number) {
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const currentDays = daysInMonth(viewYear, viewMonth)
  const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1
  const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear
  const prevDays = daysInMonth(prevYear, prevMonth)
  const cells: Array<{ parts: DateParts; inMonth: boolean }> = []

  for (let i = firstWeekday - 1; i >= 0; i -= 1) {
    cells.push({
      parts: { year: prevYear, month: prevMonth, day: prevDays - i },
      inMonth: false,
    })
  }

  for (let day = 1; day <= currentDays; day += 1) {
    cells.push({
      parts: { year: viewYear, month: viewMonth, day },
      inMonth: true,
    })
  }

  const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1
  const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear
  let nextDay = 1
  while (cells.length % 7 !== 0 || cells.length < 42) {
    cells.push({
      parts: { year: nextYear, month: nextMonth, day: nextDay },
      inMonth: false,
    })
    nextDay += 1
    if (cells.length >= 42) break
  }

  return cells
}

export function DateInput({
  value,
  onChange,
  name,
  id,
  className,
  inputClassName,
  disabled,
  required,
  placeholder = 'MM/DD/YYYY',
  variant = 'default',
  'aria-label': ariaLabel,
  'aria-invalid': ariaInvalid,
}: DateInputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const rootRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<'calendar' | 'month' | 'year'>('calendar')

  const selected = parseDisplayDate(value)
  const fallback = todayParts()
  const [viewYear, setViewYear] = useState(selected?.year ?? fallback.year)
  const [viewMonth, setViewMonth] = useState(selected?.month ?? fallback.month)

  useEffect(() => {
    if (!open) return
    const next = parseDisplayDate(value) ?? todayParts()
    setViewYear(next.year)
    setViewMonth(next.month)
    setMode('calendar')
  }, [open, value])

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      if (mode !== 'calendar') {
        setMode('calendar')
        return
      }
      setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, mode])

  function toggleOpen() {
    if (disabled) return
    setOpen((prev) => !prev)
  }

  function selectDay(parts: DateParts) {
    onChange(toDisplayDate(parts))
    setViewYear(parts.year)
    setViewMonth(parts.month)
    setOpen(false)
  }

  function shiftMonth(delta: number) {
    const date = new Date(viewYear, viewMonth + delta, 1)
    setViewYear(date.getFullYear())
    setViewMonth(date.getMonth())
  }

  function clearDate() {
    onChange('')
    setOpen(false)
  }

  function selectToday() {
    const today = todayParts()
    onChange(toDisplayDate(today))
    setViewYear(today.year)
    setViewMonth(today.month)
    setMode('calendar')
    setOpen(false)
  }

  const cells = buildCalendarCells(viewYear, viewMonth)

  const picker = open ? (
    <div
      role="dialog"
      aria-label="Date picker"
      className="absolute left-0 top-[calc(100%+0.35rem)] z-50 w-[20rem] rounded-xl border border-line bg-paper p-3 shadow-panel"
    >
      <div className="mb-2 flex items-center gap-1.5">
        <HeaderSelectBox
          label={String(viewYear)}
          selected={mode === 'year'}
          onClick={() => setMode((prev) => (prev === 'year' ? 'calendar' : 'year'))}
          ariaLabel="Choose year"
          className="w-[4.5rem] shrink-0"
          buttonClassName="px-1.5"
          menuClassName="w-[6.75rem]"
        >
          {YEARS.map((year) => (
            <ScrollOption
              key={year}
              selected={viewYear === year}
              onClick={() => {
                setViewYear(year)
                setMode('calendar')
              }}
            >
              {year}
            </ScrollOption>
          ))}
        </HeaderSelectBox>
        <HeaderSelectBox
          label={MONTHS[viewMonth]}
          selected={mode === 'month'}
          onClick={() => setMode((prev) => (prev === 'month' ? 'calendar' : 'month'))}
          ariaLabel="Choose month"
          className="min-w-0 flex-1"
        >
          {MONTHS.map((label, index) => (
            <ScrollOption
              key={label}
              selected={viewMonth === index}
              onClick={() => {
                setViewMonth(index)
                setMode('calendar')
              }}
            >
              {label}
            </ScrollOption>
          ))}
        </HeaderSelectBox>
        <div className="flex shrink-0 items-center gap-0.5">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-mist hover:text-brand"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:bg-mist hover:text-brand"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="flex h-8 items-center justify-center text-[11px] font-semibold uppercase text-muted"
          >
            {day}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map(({ parts, inMonth }) => {
          const isSelected = sameDay(selected, parts)
          const isToday = sameDay(todayParts(), parts)
          return (
            <button
              key={`${parts.year}-${parts.month}-${parts.day}-${inMonth ? 'in' : 'out'}`}
              type="button"
              onClick={() => selectDay(parts)}
              className={cn(
                'flex h-9 items-center justify-center rounded-lg text-sm font-medium transition',
                !inMonth && 'text-muted/45',
                inMonth && !isSelected && 'text-ink hover:bg-brand-light/70',
                isSelected && 'bg-brand text-white',
                isToday && !isSelected && 'ring-1 ring-brand/40',
              )}
            >
              {parts.day}
            </button>
          )
        })}
      </div>

      <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
        <button
          type="button"
          onClick={clearDate}
          className="rounded-lg px-2 py-1 text-sm font-semibold text-brand transition hover:bg-brand-light/60"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={selectToday}
          className="rounded-lg px-2 py-1 text-sm font-semibold text-brand transition hover:bg-brand-light/60"
        >
          Today
        </button>
      </div>
    </div>
  ) : null

  if (variant === 'underline' || variant === 'inline') {
    const isInline = variant === 'inline'
    return (
      <div ref={rootRef} className={cn('relative min-w-0', isInline && 'flex-1', className)}>
        <input type="hidden" name={name} value={value} required={required} readOnly />
        <div
          className={cn(
            'relative flex items-end bg-transparent transition',
            isInline ? 'gap-1 border-b-2' : 'gap-2 border-b-2',
            ariaInvalid
              ? 'border-danger focus-within:border-danger'
              : 'border-ink/30 focus-within:border-brand',
          )}
        >
          <input
            type="text"
            id={inputId}
            inputMode="numeric"
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            maxLength={10}
            aria-label={ariaLabel}
            aria-invalid={ariaInvalid}
            onChange={(e) => onChange(formatTypedDate(e.target.value))}
            className={cn(
              'min-w-0 flex-1 border-0 bg-transparent outline-none transition placeholder:text-muted/50',
              isInline
                ? 'pb-1.5 text-sm'
                : 'h-12 px-2 text-base sm:h-14 sm:text-lg',
              ariaInvalid ? 'text-danger' : 'text-ink',
              disabled && 'cursor-not-allowed opacity-60',
              inputClassName,
            )}
          />
          <button
            type="button"
            disabled={disabled}
            onClick={toggleOpen}
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-mist hover:text-brand disabled:opacity-60',
              isInline ? 'mb-0.5 h-7 w-7' : 'mb-2 h-9 w-9',
            )}
            aria-label="Open calendar"
            aria-expanded={open}
            aria-haspopup="dialog"
          >
            <Calendar className={isInline ? 'h-4 w-4' : 'h-5 w-5'} strokeWidth={1.75} />
          </button>
        </div>
        {picker}
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
        )}
      >
        <input
          type="text"
          id={inputId}
          inputMode="numeric"
          disabled={disabled}
          placeholder={placeholder}
          value={value}
          maxLength={10}
          aria-label={ariaLabel}
          aria-invalid={ariaInvalid}
          onChange={(e) => onChange(formatTypedDate(e.target.value))}
          className={cn(
            'h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-muted/70',
            inputClassName,
          )}
        />
        <button
          type="button"
          disabled={disabled}
          onClick={toggleOpen}
          className="inline-flex h-full w-10 shrink-0 items-center justify-center text-muted transition hover:text-brand disabled:opacity-60"
          aria-label="Open calendar"
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <Calendar className="h-4 w-4" strokeWidth={1.75} />
        </button>
      </div>
      {picker}
    </div>
  )
}
