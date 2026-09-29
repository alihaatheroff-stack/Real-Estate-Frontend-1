import { Outlet, useLocation } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { SiteLogo } from '@/components/layout/SiteLogo'
import { cn } from '@/shared/lib/cn'

export function AuthLayout() {
  const { pathname } = useLocation()
  const isRegister = pathname.startsWith('/auth/register')

  return (
    <div className="flex min-h-screen flex-col bg-mist">
      <header className="border-b border-line bg-paper">
        <div
          className={cn(
            'flex h-16 items-center px-4 sm:h-[4.5rem] sm:px-6 lg:px-8',
            !isRegister && 'mx-auto max-w-2xl',
          )}
        >
          <SiteLogo
            to={PATHS.home}
            showTagline={isRegister}
            className="gap-3"
            markClassName="h-10 w-10 sm:h-11 sm:w-11"
            titleClassName="text-xl sm:text-2xl"
          />
        </div>
      </header>
      {isRegister ? (
        <main className="flex w-full flex-1 flex-col bg-gradient-to-b from-mist/40 to-paper">
          <div className="w-full flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
            <Outlet />
          </div>
        </main>
      ) : (
        <main className="flex flex-1 items-start justify-center px-4 py-8 sm:items-center sm:px-6 sm:py-10">
          <div className="w-full max-w-2xl rounded-2xl border border-line bg-paper p-6 shadow-soft sm:p-8">
            <Outlet />
          </div>
        </main>
      )}
    </div>
  )
}
