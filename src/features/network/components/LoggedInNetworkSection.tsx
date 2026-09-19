import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'

export function LoggedInNetworkSection() {
  return (
    <Section id="network" className="scroll-mt-24 bg-mist/70 pt-8 sm:pt-10" containerClassName="max-w-none">
      <div className="mb-8 w-full space-y-2">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          3. Network
        </h2>
        <p className="text-base leading-snug text-muted sm:text-lg">
          Forums, groups, articles, and people to greet
        </p>
      </div>

      <div id="network-learn-more" className="mt-2 flex flex-wrap gap-3 scroll-mt-24">
        <Link to={PATHS.networkFeed}>
          <Button size="lg">Open the network</Button>
        </Link>
        <Link to={PATHS.network}>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </Link>
      </div>
    </Section>
  )
}
