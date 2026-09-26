import type { ComponentType } from 'react'
import { Building2, Landmark, ShieldCheck, Target } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { TopProvidersSection } from '@/features/landing/components/TopProvidersSection'
import { RecreationalCrowdfunding } from '@/features/crowdfunding/components/RecreationalCrowdfunding'
import { LoggedInCrowdfundingDetails } from '@/features/crowdfunding/components/LoggedInCrowdfundingDetails'
import {
  CROWDFUNDING_TEASER_ITEMS,
  type CrowdfundingTeaserIcon,
} from '@/features/crowdfunding/data/crowdfundingTeaser'
import { SectionCtas } from '@/features/landing/components/SectionCtas'

const TEASER_ICONS: Record<CrowdfundingTeaserIcon, ComponentType<{ className?: string }>> = {
  Target,
  Landmark,
  Building2,
  ShieldCheck,
}

export function CrowdfundingTeaser() {
  return (
    <Section id="crowdfunding" className="scroll-mt-24 py-8 sm:py-10" containerClassName="max-w-none">
      <ScrollReveal>
        <SectionHeading
          title="2. Crowdfund"
          subtitle="Invest with Purpose. Build Legacy."
          className="mb-8 w-full items-start sm:flex-col sm:items-start [&>div]:max-w-none"
        />
      </ScrollReveal>
      <ScrollReveal delay={70} className="mb-10">
        <RecreationalCrowdfunding embedded variant="carousel" showCaptions />
      </ScrollReveal>
      <ScrollReveal className="mb-12">
        <LoggedInCrowdfundingDetails showBoardInvite={false} showQaAndIndex />
      </ScrollReveal>
      <TopProvidersSection
        module="crowdfunding"
        embedded
        className="mb-12"
        listHref={PATHS.profileResults}
        listLabel="Meet Other Participants"
      />
      <div className="mb-0 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {CROWDFUNDING_TEASER_ITEMS.map(({ icon, title, text }, index) => {
          const Icon = TEASER_ICONS[icon]
          return (
            <ScrollReveal key={title} delay={index * 80}>
              <article className="group">
                <div className="mb-3 inline-flex rounded-xl bg-brand-light p-2.5 text-brand transition duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            </ScrollReveal>
          )
        })}
      </div>

      <SectionCtas
        id="crowdfunding-explore"
        exploreTo={PATHS.crowdfunding}
        label="Explore Crowdfunding"
      />
    </Section>
  )
}
