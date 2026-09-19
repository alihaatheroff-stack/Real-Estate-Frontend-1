import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PATHS } from '@/app/router/paths'
import { setAuthenticated } from '@/features/auth/session'

export function SignInForm() {
  const navigate = useNavigate()
  const [error, setError] = useState('')

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Sign in</h1>
        <p className="mt-1 text-sm text-muted">Access referrals, messages, and your dashboard.</p>
      </div>
      <form
        className="space-y-3"
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
        <Button type="submit" className="w-full" size="lg">
          Sign in
        </Button>
      </form>
      <p className="text-center text-sm text-muted">
        New provider?{' '}
        <Link to={PATHS.registerPsp} className="font-semibold text-brand hover:underline">
          Register As Property Service Provider (PSP)
        </Link>
      </p>
    </div>
  )
}
