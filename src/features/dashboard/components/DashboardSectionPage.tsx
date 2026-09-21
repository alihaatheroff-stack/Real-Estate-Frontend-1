import type { ReactNode } from 'react'

export function DashboardSectionPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
      <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_4px_18px_rgba(15,31,26,0.04)]">
        {children ?? (
          <p className="text-sm text-muted">
            Frontend placeholder — wire to API when backend is ready.
          </p>
        )}
      </div>
    </div>
  )
}
