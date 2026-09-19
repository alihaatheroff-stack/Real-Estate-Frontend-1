import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { cn } from '@/shared/lib/cn'

type FieldQaMarkProps = {
  /** Field label — used for accessibility and help copy. */
  field: string
  className?: string
}

/**
 * Trailing info icon (ⓘ) on form field labels. Explains why the question is asked
 * so matching, verification, and search can use the right details.
 */
export function FieldQaMark({ field, className }: FieldQaMarkProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLSpanElement>(null)
  const question = field.replace(/:\s*$/, '')

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    e.stopPropagation()
    setOpen((current) => !current)
  }

  return (
    <span ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        onClick={handleClick}
        aria-label={`Why is “${question}” asked?`}
        aria-expanded={open}
        title="Why is this question asked?"
        className={cn(
          'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-ink bg-white text-[0.65rem] font-normal leading-none text-ink transition',
          'hover:bg-mist hover:border-ink hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/20',
          className,
        )}
      >
        i
      </button>
      {open ? (
        <span
          role="tooltip"
          className="absolute top-[calc(100%+6px)] left-1/2 z-30 w-56 -translate-x-1/2 rounded-lg bg-ink px-2.5 py-2 text-left text-[11px] font-normal leading-snug text-white shadow-lg"
        >
          We ask “{question}” so matching, verification, and search can use the right details.
        </span>
      ) : null}
    </span>
  )
}

export function FieldLabelWithQa({
  label,
  className,
  required,
  invalid,
}: {
  label: string
  className?: string
  required?: boolean
  invalid?: boolean
}) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <span className={cn(invalid ? 'text-danger' : undefined)}>
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </span>
      <FieldQaMark field={label} />
    </span>
  )
}
