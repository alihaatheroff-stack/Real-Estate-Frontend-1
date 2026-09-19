import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/app/router/paths'

export function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-3 text-muted">That route is not part of this build yet.</p>
      <div className="mt-6 flex gap-2">
        <Link to={PATHS.home}>
          <Button>Home</Button>
        </Link>
        <Link to={PATHS.results}>
          <Button variant="outline">Referrals</Button>
        </Link>
      </div>
    </div>
  )
}
