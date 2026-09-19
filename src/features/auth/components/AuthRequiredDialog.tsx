import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'

export function AuthRequiredDialog({
  open,
  onClose,
  action = 'vote or save',
}: {
  open: boolean
  onClose: () => void
  /** Short phrase shown in the message, e.g. "vote" or "save favorites". */
  action?: string
}) {
  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[2100] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-required-title"
        className="relative w-full max-w-md overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
      >
        <header className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
          <div>
            <p id="auth-required-title" className="text-sm font-semibold text-ink">
              Register or log in
            </p>
            <p className="mt-1 text-sm leading-snug text-muted">
              You need an account to {action}. Sign in if you already have one, or register to get
              started.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-mist hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex flex-col gap-2 px-4 py-4 sm:flex-row sm:justify-end">
          <Button variant="ghost" size="sm" onClick={onClose} className="sm:order-1">
            Cancel
          </Button>
          <Link to={PATHS.signIn} onClick={onClose} className="sm:order-2">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">
              Log in
            </Button>
          </Link>
          <Link to={PATHS.registerPsp} onClick={onClose} className="sm:order-3">
            <Button size="sm" className="w-full sm:w-auto">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  )
}
