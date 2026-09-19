import type { ComponentType } from 'react'
import { Link2, UserPlus, Zap } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import {
  MEMBERSHIP_ACTIONS,
  type MembershipActionIcon,
} from '@/features/landing/data/membershipActions'

const ACTION_ICONS: Record<MembershipActionIcon, ComponentType<{ className?: string }>> = {
  Zap,
  UserPlus,
  Link2,
}

export function MembershipActionsSection() {
  return (
    <Section className="py-10 sm:py-12" containerClassName="max-w-none">
      <div className="mb-8 w-full space-y-2">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Grow with RE Network
        </h2>
        <p className="text-base leading-snug text-muted sm:text-lg">
          Upgrade, invite, and share your affiliate link
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {MEMBERSHIP_ACTIONS.map(({ icon, title, text, cta }) => {
          const Icon = ACTION_ICONS[icon]
          return (
            <article
              key={title}
              className="flex flex-col rounded-2xl border border-line bg-mist/40 p-6"
            >
              <div className="mb-4 inline-flex w-fit rounded-xl bg-brand-light p-2.5 text-brand">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{text}</p>
              <Button className="mt-5 w-full sm:w-auto" variant="outline">
                {cta}
              </Button>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
