import { Link } from 'react-router-dom'
import { Handshake, MessagesSquare, Newspaper, Users } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/app/router/paths'

const ITEMS = [
  {
    icon: Newspaper,
    title: 'Newsfeed',
    text: 'Deal-oriented posts from trades, investors, and PSPs — not endless scrolling.',
  },
  {
    icon: Users,
    title: 'Groups',
    text: 'Find your tribe by strategy, geography, or role and stay deal-focused.',
  },
  {
    icon: MessagesSquare,
    title: 'Forums',
    text: 'Threaded strategy talks with clear topics — not scattered group chaos.',
  },
  {
    icon: Handshake,
    title: 'Connect',
    text: 'A professional graph for who you need next — partners, capital, and intros.',
  },
]

export function NetworkPreview() {
  return (
    <Section className="bg-mist/70" containerClassName="max-w-none">
      <SectionHeading
        title="3. Network"
        subtitle="Social patterns. Real estate outcomes."
        description="A professional graph for who you need next — partners, capital, and introductions across feed, groups, and forums."
        className="w-full items-start sm:flex-col sm:items-start [&>div]:max-w-none"
        action={
          <Link to={PATHS.networkFeed}>
            <Button variant="secondary">Open network</Button>
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
