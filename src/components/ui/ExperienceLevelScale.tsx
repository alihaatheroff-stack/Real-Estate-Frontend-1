import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { FieldSaveMark } from '@/features/auth/components/FieldSaveContext'
import { cn } from '@/shared/lib/cn'

const LEVELS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const
const COLS = { gridTemplateColumns: `repeat(${LEVELS.length}, minmax(0, 1fr))` }

/** Pull a 1–10 value from stored filter strings like "5" or "1 — Low experience". */
export function parseExperienceLevel(values: string[]): number | null {
  for (const value of values) {
    const match = value.trim().match(/^(\d{1,2})/)
    if (!match) continue
    const n = Number(match[1])
    if (n >= 1 && n <= 10) return n
  }
  return null
}

export function ExperienceLevelScale({
  label = 'Experience Level:',
  value,
  onChange,
  name = 'experienceLevel',
  className,
  showQaMark = true,
}: {
  label?: string
  value: number | null
  onChange: (next: number | null) => void
  name?: string
  className?: string
  showQaMark?: boolean
}) {
  return (
    <div className={cn('space-y-2', className)}>
      {label ? (
        <span className="inline-flex items-center gap-1 text-sm font-bold leading-snug text-ink">
          {label}
          {showQaMark ? (
            <FieldQaMark field={label} />
          ) : (
            <FieldSaveMark fieldId={name} />
          )}
        </span>
      ) : null}

      <div className="w-full max-w-xl space-y-1">
        <div className="flex items-start justify-between gap-3 text-[11px] font-semibold leading-snug text-muted sm:text-xs">
          <span>1= New.</span>
          <span>10+= Experienced.</span>
        </div>

        <div
          role="radiogroup"
          aria-label={label.replace(/:\s*$/, '') || 'Experience level'}
        >
          {/* Numbers */}
          <div className="grid" style={COLS}>
            {LEVELS.map((level) => (
              <button
                key={`n-${level}`}
                type="button"
                onClick={() => onChange(value === level ? null : level)}
                className={cn(
                  'flex h-5 items-center justify-center text-xs font-semibold tabular-nums leading-none sm:text-sm',
                  value === level ? 'text-brand' : 'text-ink',
                )}
                aria-label={`Select level ${level}`}
              >
                {level}
              </button>
            ))}
          </div>

          {/* Ruler line + ticks */}
          <div className="relative mt-1.5 h-3">
            <div
              className="absolute top-1/2 h-px -translate-y-1/2 bg-ink/65"
              style={{ left: '5%', right: '5%' }}
              aria-hidden
            />
            <div className="relative grid h-full" style={COLS}>
              {LEVELS.map((level) => (
                <span
                  key={`t-${level}`}
                  className="flex items-center justify-center"
                  aria-hidden
                >
                  <span className="h-3 w-px bg-ink/65" />
                </span>
              ))}
            </div>
          </div>

          {/* Selection dots — below the line */}
          <div className="mt-1.5 grid" style={COLS}>
            {LEVELS.map((level) => {
              const selected = value === level
              return (
                <label
                  key={`c-${level}`}
                  className="relative flex h-5 cursor-pointer items-center justify-center"
                >
                  <input
                    type="radio"
                    name={name}
                    value={level}
                    checked={selected}
                    onChange={() => onChange(level)}
                    onClick={() => {
                      if (selected) onChange(null)
                    }}
                    className="peer absolute inset-0 z-10 m-0 cursor-pointer opacity-0"
                    aria-label={`Level ${level}`}
                  />
                  <span
                    className={cn(
                      'pointer-events-none block h-3.5 w-3.5 rounded-full transition',
                      selected
                        ? 'bg-brand shadow-[0_0_0_2px_#fff,0_0_0_3.5px_theme(colors.brand)]'
                        : 'border-[1.5px] border-ink/40 bg-paper',
                      'peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand/40',
                    )}
                    aria-hidden
                  />
                </label>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
