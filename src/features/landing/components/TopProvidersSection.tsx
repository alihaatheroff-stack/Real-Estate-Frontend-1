import { Link } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/Button'
import { ProviderCard } from '@/features/referrals'
import { PROVIDERS } from '@/features/referrals/data/marketplace'
import { PATHS } from '@/app/router/paths'

export function TopProvidersSection() {
  const top = [...PROVIDERS].sort((a, b) => b.rating - a.rating).slice(0, 4)

  return (
    <Section containerClassName="max-w-none">
      <SectionHeading
        eyebrow="Highest rated"
        eyebrowClassName="text-base sm:text-lg"
        title="Top PSPs"
        description="Sales volume, deal count, awards, and specialty tabs — slider-ready marketplace cards."
        className="w-full items-start sm:flex-col sm:items-start [&>div]:max-w-none"
        action={
          <Link to={`${PATHS.results}?zip=93728&radius=50`}>
            <Button variant="outline">Browse all</Button>
          </Link>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {top.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </Section>
  )
}
