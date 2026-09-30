import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

const optionClassName = cn(
  'flex w-full flex-col items-start gap-2 rounded-2xl border border-line bg-paper px-6 py-7 text-left shadow-sm transition',
  'hover:border-brand hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40',
)

export function RegisterRoleSelect() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8">
      <div className="space-y-2 text-center sm:text-left">
        <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl lg:text-4xl">
          Register
        </h1>
        <p className="text-sm leading-relaxed text-muted sm:text-base">
          Choose how you want to join the platform.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        <Link to={PATHS.registerCustomer} className={optionClassName}>
          <span className="font-display text-lg font-bold text-ink sm:text-xl">
            Register as a Client
          </span>
          <span className="text-sm leading-relaxed text-muted">
            Create a client account with identification and login credentials.
          </span>
        </Link>

        <Link to={PATHS.registerPsp} className={optionClassName}>
          <span className="font-display text-lg font-bold text-ink sm:text-xl">
            Register as a Property Service Provider
          </span>
          <span className="text-sm leading-relaxed text-muted">
            Full provider registration including business, licenses, and membership.
          </span>
        </Link>
      </div>

      <p className="text-center text-sm text-muted sm:text-left">
        Already have an account?{' '}
        <Link to={PATHS.signIn} className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
