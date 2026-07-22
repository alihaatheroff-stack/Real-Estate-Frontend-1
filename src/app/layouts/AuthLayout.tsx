import { Outlet, Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { SITE } from '@/shared/config/site'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-mist">
      <header className="border-b border-line bg-paper">
        <div className="mx-auto flex h-14 max-w-2xl items-center px-4">
          <Link to={PATHS.home} className="font-display text-lg font-extrabold text-ink">
            {SITE.name}
          </Link>
        </div>
      </header>
      <main className="flex flex-1 items-start justify-center px-4 py-10 sm:items-center">
        <div className="w-full max-w-2xl rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
