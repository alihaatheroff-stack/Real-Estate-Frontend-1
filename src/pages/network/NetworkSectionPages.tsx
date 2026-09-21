import type { ReactNode } from 'react'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'

export function NetworkSimpleSectionPage({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children?: ReactNode
}) {
  return (
    <NetworkPageFrame hideRight>
      <NetworkCard>
        <h1 className="font-display text-3xl font-semibold">{title}</h1>
        <p className="mt-1 text-sm text-muted">{description}</p>
        {children ? <div className="mt-5">{children}</div> : null}
      </NetworkCard>
    </NetworkPageFrame>
  )
}

export function NetworkEducationPage() {
  return (
    <NetworkSimpleSectionPage
      title="Education"
      description="Short lessons and playbooks for PSPs — underwriting, intros, and closing habits."
    >
      <ul className="space-y-3 text-sm text-ink">
        <li className="rounded-xl border border-line px-4 py-3">
          <p className="font-semibold">Reading a rent roll in 10 minutes</p>
          <p className="mt-0.5 text-muted">Basics · 8 min</p>
        </li>
        <li className="rounded-xl border border-line px-4 py-3">
          <p className="font-semibold">Warm intros that get a reply</p>
          <p className="mt-0.5 text-muted">Networking · 6 min</p>
        </li>
        <li className="rounded-xl border border-line px-4 py-3">
          <p className="font-semibold">DSCR vs conventional — when each wins</p>
          <p className="mt-0.5 text-muted">Capital · 12 min</p>
        </li>
      </ul>
    </NetworkSimpleSectionPage>
  )
}
