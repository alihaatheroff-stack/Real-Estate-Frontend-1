import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/Button'
import { LoggedInCrowdfundingDetails } from '@/features/crowdfunding/components/LoggedInCrowdfundingDetails'
import { RecreationalCrowdfunding } from '@/features/crowdfunding/components/RecreationalCrowdfunding'

export function LoggedInCrowdfundingSection() {
  return (
    <Section id="crowdfunding" className="scroll-mt-24 py-8 sm:py-10" containerClassName="max-w-none">
      <SectionHeading
        title="2. Crowdfund"
        className="mb-8 w-full items-start sm:flex-col sm:items-start [&>div]:max-w-none"
      />

      <RecreationalCrowdfunding embedded className="mb-8" />
      <LoggedInCrowdfundingDetails className="mb-10" />

      <div id="crowdfunding-explore" className="mt-2 scroll-mt-24">
        <Link to={PATHS.crowdfunding}>
          <Button size="lg">Vote</Button>
        </Link>
      </div>
    </Section>
  )
}
