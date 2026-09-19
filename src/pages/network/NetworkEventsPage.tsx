import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NETWORK_EVENTS } from '@/features/network/data/community'
import { getMember } from '@/features/network/data/members'

export function NetworkEventsPage() {
  const [going, setGoing] = useState<Record<string, boolean>>({})

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <NetworkCard>
          <h1 className="font-display text-3xl font-semibold">Events</h1>
          <p className="mt-1 text-sm text-muted">Breakfasts, site walks, and office hours — the in-person layer of the graph.</p>
        </NetworkCard>
        <div className="grid gap-4">
          {NETWORK_EVENTS.map((event) => {
            const host = getMember(event.hostId)
            const isGoing = going[event.id]
            return (
              <article key={event.id} className="overflow-hidden rounded-xl bg-white shadow-sm sm:grid sm:grid-cols-[280px_minmax(0,1fr)]">
                <img src={event.cover} alt="" className="h-44 w-full object-cover sm:h-full" />
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {event.date} · {event.time}
                  </p>
                  <h2 className="mt-1 font-display text-2xl font-semibold">{event.title}</h2>
                  <p className="mt-1 text-sm text-muted">{event.location}</p>
                  <p className="mt-3 text-sm leading-relaxed">{event.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {host ? (
                      <span className="inline-flex items-center gap-2 text-sm">
                        <MemberAvatar name={host.name} src={host.avatar} size="sm" memberId={host.id} />
                        Hosted by {host.name}
                      </span>
                    ) : null}
                    <span className="text-xs text-muted">
                      {event.going + (isGoing ? 1 : 0)} going · {event.interested} interested
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button className="rounded-lg" onClick={() => setGoing((c) => ({ ...c, [event.id]: !isGoing }))}>
                      {isGoing ? 'Going' : 'Join'}
                    </Button>
                    <Button variant="outline" className="rounded-lg">
                      Interested
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </NetworkPageFrame>
  )
}
