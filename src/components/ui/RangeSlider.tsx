import { cn } from '@/shared/lib/cn'

type RangeSliderProps = {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  formatLabel?: (value: number) => string
  className?: string
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  formatLabel,
  className,
}: RangeSliderProps) {
  const percent = max === min ? 0 : ((value - min) / (max - min)) * 100

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative h-2 rounded-full bg-line">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-brand"
          style={{ width: `${percent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="range-slider absolute inset-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      </div>
      {formatLabel ? (
        <p className="text-[15px] font-medium text-ink">{formatLabel(value)}</p>
      ) : null}
    </div>
  )
}

type DualRangeSliderProps = {
  min: number
  max: number
  from: number
  to: number
  onChange: (from: number, to: number) => void
  formatLabel?: (from: number, to: number) => string
  className?: string
}

export function DualRangeSlider({
  min,
  max,
  from,
  to,
  onChange,
  formatLabel,
  className,
}: DualRangeSliderProps) {
  const safeFrom = Math.min(from, to)
  const safeTo = Math.max(from, to)
  const span = max - min || 1
  const left = ((safeFrom - min) / span) * 100
  const width = ((safeTo - safeFrom) / span) * 100

  return (
    <div className={cn('space-y-3', className)}>
      <div className="relative h-2 rounded-full bg-line">
        <div
          className="absolute inset-y-0 rounded-full bg-brand"
          style={{ left: `${left}%`, width: `${width}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={safeFrom}
          onChange={(event) => {
            const next = Number(event.target.value)
            onChange(Math.min(next, safeTo), safeTo)
          }}
          className="range-slider absolute inset-0 z-20 h-2 w-full cursor-pointer appearance-none bg-transparent"
          aria-label="Minimum value"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={safeTo}
          onChange={(event) => {
            const next = Number(event.target.value)
            onChange(safeFrom, Math.max(next, safeFrom))
          }}
          className="range-slider absolute inset-0 z-30 h-2 w-full cursor-pointer appearance-none bg-transparent"
          aria-label="Maximum value"
        />
      </div>
      {formatLabel ? (
        <p className="text-[15px] font-medium text-ink">{formatLabel(safeFrom, safeTo)}</p>
      ) : null}
    </div>
  )
}
