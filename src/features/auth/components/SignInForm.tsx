import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PATHS } from '@/app/router/paths'
import { setAuthenticated } from '@/features/auth/session'
import { cn } from '@/shared/lib/cn'

const actionLinkClassName = cn(
  'inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand px-6 text-base font-semibold text-white shadow-sm transition',
  'hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
)

export function SignInForm() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="font-display text-3xl font-bold tracking-tight text-ink">Sign in</h1>
        <p className="text-sm leading-relaxed text-muted">
          Access referrals, messages, and your dashboard.
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          const data = new FormData(e.currentTarget)
          const email = String(data.get('email') ?? '').trim()
          const password = String(data.get('password') ?? '')
          if (!email || !password) {
            setError('Enter your email and password.')
            return
          }
          // UI-only — wire to auth API when backend is ready.
          setAuthenticated(true)
          navigate(PATHS.home)
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
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          onChange={() => setError('')}
        />
        {error ? <p className="text-sm text-danger">{error}</p> : null}
        <div className="space-y-3">
          <Button type="submit" className="w-full" size="lg">
            Sign in
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            size="sm"
            onClick={() => {
              setAuthenticated(true)
              navigate(PATHS.home)
            }}
          >
            Skip (testing)
          </Button>
          <Link to={PATHS.forgotPassword} className={actionLinkClassName}>
            Forgot password?
          </Link>
          <Link to={PATHS.register} className={actionLinkClassName}>
            Register
          </Link>
        </div>
      </form>
    </div>
  )
}
