import { useEffect, useId, useRef, useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

export function GuestAuthPopover({
  className,
  triggerClassName,
  triggerLabel,
  title,
  description,
  icon: Icon,
}: {
  className?: string
  triggerClassName?: string
  triggerLabel: string
  title: string
  description: string
  icon: ComponentType<{ className?: string }>
}) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)

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

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist',
          triggerClassName,
          open && 'bg-mist',
        )}
        aria-label={triggerLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" />
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={title}
          className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,18rem)] overflow-hidden rounded-xl border border-line bg-white p-4 shadow-soft"
        >
          <p className="text-sm font-semibold text-ink">{title}</p>
          <p className="mt-1 text-sm leading-snug text-muted">{description}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link to={PATHS.signIn} onClick={() => setOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link to={PATHS.registerPsp} onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full">
                Register
              </Button>
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  )
}
