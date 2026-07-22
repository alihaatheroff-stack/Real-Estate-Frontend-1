import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { PATHS } from '@/app/router/paths'

export function SignInPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-2xl font-bold text-ink">Sign in</h1>
        <p className="mt-1 text-sm text-muted">Access referrals, messages, and your dashboard.</p>
      </div>
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <Input label="Email" name="email" type="email" placeholder="you@email.com" />
        <Input label="Password" name="password" type="password" placeholder="••••••••" />
        <Button type="submit" className="w-full" size="lg">
          Sign in
        </Button>
      </form>
      <p className="text-center text-sm text-muted">
        New provider?{' '}
        <Link to={PATHS.registerPsp} className="font-semibold text-brand hover:underline">
          Register as PSP
        </Link>
      </p>
    </div>
  )
}
