import {
  DASHBOARD_NOTIFICATIONS,
  DASHBOARD_PAGE_VIEWS,
  DASHBOARD_STATS,
} from '@/features/dashboard/data/nav'

function PageViewsChart() {
  const max = Math.max(...DASHBOARD_PAGE_VIEWS.map((d) => d.value), 1)
  const width = 560
  const height = 220
  const padX = 24
  const padY = 20
  const innerW = width - padX * 2
  const innerH = height - padY * 2

  const points = DASHBOARD_PAGE_VIEWS.map((d, i) => {
    const x = padX + (i / (DASHBOARD_PAGE_VIEWS.length - 1)) * innerW
    const y = padY + innerH - (d.value / max) * innerH
    return `${x},${y}`
  }).join(' ')

  const area = `${padX},${padY + innerH} ${points} ${padX + innerW},${padY + innerH}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-56 w-full" role="img" aria-label="Page views">
      <defs>
        <linearGradient id="dashViewsFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1b6b4f" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#1b6b4f" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 0.5, 1].map((t) => {
        const y = padY + innerH * (1 - t)
        return (
          <line
            key={t}
            x1={padX}
            x2={padX + innerW}
            y1={y}
            y2={y}
            stroke="#d5ddd8"
            strokeWidth="1"
          />
        )
      })}
      <polygon points={area} fill="url(#dashViewsFill)" />
      <polyline
        points={points}
        fill="none"
        stroke="#1b6b4f"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted">
          Snapshot of your RE Network services, referrals, and activity.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.id}
              className="flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 shadow-[0_4px_18px_rgba(15,31,26,0.04)]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <p className="text-2xl font-semibold text-ink">{stat.value}</p>
                <p className="text-sm text-muted">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.6fr)_minmax(16rem,1fr)]">
        <section className="rounded-2xl border border-line bg-white p-5 shadow-[0_4px_18px_rgba(15,31,26,0.04)]">
          <h2 className="text-lg font-semibold text-ink">Page Views</h2>
          <p className="mt-0.5 text-xs text-muted">Profile and service listing traffic this week</p>
          <div className="mt-4">
            <PageViewsChart />
          </div>
        </section>

        <section className="rounded-2xl border border-line bg-white p-5 shadow-[0_4px_18px_rgba(15,31,26,0.04)]">
          <h2 className="text-lg font-semibold text-ink">Notifications</h2>
          <ul className="mt-4 space-y-4">
            {DASHBOARD_NOTIFICATIONS.map((item) => (
              <li key={item.id} className="flex gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/15 text-xs font-bold text-brand">
                  RE
                </span>
                <div className="min-w-0">
                  <p className="text-sm leading-snug text-ink">{item.text}</p>
                  <p className="mt-1 text-xs text-muted">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
