import { Link } from 'react-router-dom'
import { GraduationCap, HandCoins, RefreshCw, Sparkles } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/app/router/paths'

const ITEMS = [
  {
    icon: RefreshCw,
    title: 'Refer',
    text: 'Send or receive trusted introductions with clear percentage share.',
  },
  {
    icon: GraduationCap,
    title: 'Learn',
    text: 'Optional mentorship and deal shadowing baked into eligible services.',
  },
  {
    icon: HandCoins,
    title: 'Earn',
    text: 'Structured splits for senders, recipients, and platform fees.',
  },
  {
    icon: Sparkles,
    title: 'Verify',
    text: 'GPS-aware workflows and credential checks designed for real property work.',
  },
]

export function ReferralsSection() {
  return (
    <Section className="bg-mist/70" containerClassName="max-w-none">
      <SectionHeading
        title="1. Referrals"
        subtitle="A smooth marketplace for property work"
        description="Find PSPs by category, ZIP radius, and referral terms — then hire packaged services with clear scope."
        className="w-full items-start sm:flex-col sm:items-start [&>div]:max-w-none"
        action={
          <Link to={PATHS.results}>
            <Button variant="secondary">Open referrals</Button>
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
