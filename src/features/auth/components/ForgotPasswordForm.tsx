import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const actionLinkClassName = cn(
  'inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white shadow-sm transition',
  'hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
)

export function ForgotPasswordForm() {
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">
          Forgot password
        </h1>
        <p className="text-sm leading-relaxed text-muted">
          Enter your email and we&apos;ll send reset instructions.
        </p>
      </div>

      {sent ? (
        <div className="space-y-4">
          <p className="rounded-xl border border-line bg-mist/60 px-4 py-3 text-sm leading-relaxed text-ink">
            If an account exists for that email, you&apos;ll receive reset instructions shortly.
          </p>
          <Link to={PATHS.signIn} className={actionLinkClassName}>
            Back to sign in
          </Link>
        </div>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault()
            const data = new FormData(e.currentTarget)
            const email = String(data.get('email') ?? '').trim()
            if (!email) {
              setError('Enter your email.')
              return
            }
            // UI-only — wire to auth API when backend is ready.
            setSent(true)
          }}
        >
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="you@email.com"
            required
            onChange={() => setError('')}
          />
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" className="w-full" size="lg">
            Send reset link
          </Button>
          <Link to={PATHS.signIn} className={actionLinkClassName}>
            Back to sign in
          </Link>
        </form>
      )}
    </div>
  )
}
