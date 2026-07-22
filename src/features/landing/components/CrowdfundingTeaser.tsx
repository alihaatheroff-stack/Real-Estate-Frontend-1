import { Link } from 'react-router-dom'
import { Building2, Landmark, ShieldCheck, Target } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/app/router/paths'

const ITEMS = [
  {
    icon: Target,
    title: 'Pledge',
    text: 'Signal demand for faith-aligned recreational projects before offerings go live.',
  },
  {
    icon: Landmark,
    title: 'Fund',
    text: 'Track legal and Reg A+ progress toward qualified investment opportunities.',
  },
  {
    icon: Building2,
    title: 'Build',
    text: 'Back venues designed for community impact — not speculative noise.',
  },
  {
    icon: ShieldCheck,
    title: 'Comply',
    text: 'Interest lists only until SEC approval. Not an offer to sell securities.',
  },
]

export function CrowdfundingTeaser() {
  return (
    <Section containerClassName="max-w-none">
      <SectionHeading
        title="2. Crowdfunding"
        subtitle="Invest with purpose. Build legacy."
        description="Faith-aligned recreational venues — pledge interest until SEC Reg A+ qualification, then be first when offerings go live."
        className="w-full items-start sm:flex-col sm:items-start [&>div]:max-w-none"
        action={
          <Link to={PATHS.crowdfunding}>
            <Button variant="secondary">View crowdfunding</Button>
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, text }) => (
          <article
            key={title}
            className="rounded-2xl border border-line bg-paper p-5 shadow-sm"
          >
            <div className="mb-3 inline-flex rounded-xl bg-brand-light p-2.5 text-brand">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
