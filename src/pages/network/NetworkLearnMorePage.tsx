import { Navigate, useNavigate } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { useIsAuthenticated } from '@/features/auth'
import { NETWORK_LEARN_MORE as C } from '@/features/network'
import { cn } from '@/shared/lib/cn'

export function NetworkLearnMorePage() {
  const isAuthenticated = useIsAuthenticated()
  if (isAuthenticated) return <Navigate to={PATHS.networkFeed} replace />
  return <NetworkLearnMoreContent />
}

function NetworkLearnMoreContent() {
  const navigate = useNavigate()

  return (
    <Section
      className="py-8 sm:py-10"
      containerClassName="max-w-none w-full px-5 sm:px-8 lg:px-10"
    >
      <div className="w-full">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {C.heading}
        </h1>

        <p className="mt-4 text-base font-medium leading-snug text-ink sm:text-lg">
          {C.intro}
        </p>

        <ul className="mt-4 w-full list-disc space-y-3 pl-6 text-base leading-relaxed text-muted marker:text-ink">
          {C.items.map((item) => (
            <li key={item.label} className="w-full pl-1">
              <span
                className={cn(
                  item.children ? 'font-semibold text-ink' : 'text-muted',
                )}
              >
                {item.label}
              </span>
              {item.children ? (
                <ul className="mt-2 w-full list-[circle] space-y-2 pl-6 marker:text-muted">
                  {item.children.map((child) => (
                    <li key={child} className="pl-1 text-muted">
                      {child}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Button
          variant="ghost"
          onClick={() =>
            navigate(PATHS.home, { state: { scrollToSection: 'network-learn-more' } })
          }
        >
          Back to home
        </Button>
      </div>
    </Section>
  )
}
