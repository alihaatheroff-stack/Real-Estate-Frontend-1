import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Megaphone, UserRound } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { NEWS_TABS, type NewsTabId } from '@/features/landing/data/loggedInLanding'
import { cn } from '@/shared/lib/cn'

function formatLocalStamp(date = new Date()) {
  const time = date
    .toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })
    .toUpperCase()
  const day = date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
  })
  return { time, day }
}

function BulletIcon({ index }: { index: number }) {
  if (index === 0) return <Megaphone className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
  if (index === 1) return <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-ink" />
  return <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
}

const stampClass =
  'm-0 text-base font-semibold leading-snug tracking-tight text-ink underline decoration-ink/40 underline-offset-4'

function NewsStamp({ offsetMinutes = 0 }: { offsetMinutes?: number }) {
  const date = new Date()
  if (offsetMinutes) date.setMinutes(date.getMinutes() - offsetMinutes)
  const stamp = formatLocalStamp(date)

  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 sm:gap-x-6">
      <p className={cn(stampClass, 'shrink-0 tabular-nums')}>{stamp.time}</p>
      <p className={cn(stampClass, 'shrink-0')}>{stamp.day}</p>
    </div>
  )
}

function LiveDateTimeHeader({
  heading,
  children,
}: {
  heading: string
  children: ReactNode
}) {
  return (
    <div className="min-w-0">
      {heading ? <h3 className={stampClass}>{heading}</h3> : null}
      {children}
    </div>
  )
}

export function NewsUpdatesSection() {
  const [activeId, setActiveId] = useState<NewsTabId>('features')
  const activeTab = NEWS_TABS.find((tab) => tab.id === activeId) ?? NEWS_TABS[0]

  return (
    <section className="relative overflow-hidden bg-freeio-navy py-2.5 sm:py-3.5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
            radial-gradient(ellipse 70% 50% at 20% 80%, rgba(255,255,255,0.12), transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 20%, rgba(212,160,23,0.12), transparent 50%)
          `,
          backgroundSize: '48px 48px, 48px 48px, auto, auto',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 opacity-30"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 800 160\' fill=\'none\'%3E%3Cpath d=\'M0 120 C80 90 120 40 200 70 C280 100 320 130 400 90 C480 50 560 20 640 60 C720 100 760 110 800 80\' stroke=\'white\' stroke-width=\'2\'/%3E%3Cpath d=\'M0 140 C100 120 180 100 260 115 C340 130 420 150 500 120 C580 90 660 70 800 100\' stroke=\'white\' stroke-width=\'1.5\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom center',
          backgroundSize: 'cover',
        }}
      />

      <Container className="relative z-[1] max-w-none">
        <div className="flex w-full items-center justify-center gap-2 sm:gap-3">
          <h2 className="min-w-0 flex-1 text-center text-base font-bold uppercase tracking-wide text-white sm:text-lg md:text-xl">
            <span aria-hidden className="mr-1.5 inline-block text-[1.1em] leading-none sm:mr-2">
              📰
            </span>
            News
          </h2>
        </div>

        <div className="mt-1.5 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {NEWS_TABS.map((tab) => {
            const active = tab.id === activeId
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveId(tab.id)}
                className={cn(
                  'rounded-full border px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide transition sm:text-xs',
                  active
                    ? 'border-black bg-black text-white'
                    : 'border-white/80 bg-white text-black hover:bg-white/90',
                )}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </Container>

      <article className="relative z-[1] mt-2.5 w-full bg-white px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:px-6 sm:py-4 lg:px-8">
        <LiveDateTimeHeader heading={activeTab.heading}>
          <ul className={cn('space-y-4', activeTab.heading ? 'mt-3' : '')}>
            {activeTab.bullets.map((bullet, index) => (
              <li key={`${activeTab.id}-${index}`} className="min-w-0">
                <NewsStamp offsetMinutes={index * 3} />
                <div className="mt-1.5 flex gap-2.5">
                  <BulletIcon index={index} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug text-ink">
                      {bullet.text}
                    </p>
                    {bullet.children?.length ? (
                      <ul className="mt-1 space-y-0.5 border-l border-line pl-3">
                        {bullet.children.map((child) => (
                          <li key={child} className="text-sm leading-snug text-muted">
                            {child}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-3 m-0 text-base font-semibold leading-snug tracking-tight text-ink underline decoration-ink/40 underline-offset-4">
            New Members
          </p>

          <div className="mt-3">
            {activeTab.href ? (
              <Link
                to={activeTab.href}
                className="text-sm font-bold uppercase tracking-wide text-ink underline underline-offset-4 transition hover:text-brand"
              >
                Read more:
              </Link>
            ) : (
              <button
                type="button"
                className="text-sm font-bold uppercase tracking-wide text-ink underline underline-offset-4 transition hover:text-brand"
              >
                Read more:
              </button>
            )}
          </div>
        </LiveDateTimeHeader>
      </article>
    </section>
  )
}
