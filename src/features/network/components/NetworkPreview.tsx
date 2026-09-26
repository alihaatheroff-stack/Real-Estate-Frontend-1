import type { ComponentType } from 'react'
import { FileText, MessagesSquare, Newspaper, Users } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { TopProvidersSection } from '@/features/landing/components/TopProvidersSection'
import { SectionCtas } from '@/features/landing/components/SectionCtas'
import {
  NETWORK_PREVIEW_ITEMS,
  type NetworkPreviewIcon,
} from '@/features/network/data/networkPreview'

const PREVIEW_ICONS: Record<NetworkPreviewIcon, ComponentType<{ className?: string }>> = {
  Users,
  MessagesSquare,
  FileText,
  Newspaper,
}

export function NetworkPreview() {
  return (
    <Section id="network" className="scroll-mt-24 bg-mist/70 pt-8 sm:pt-10" containerClassName="max-w-none">
      <ScrollReveal className="mb-6 w-full space-y-2">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          3. Network
        </h2>
        <p className="text-base leading-snug text-muted sm:text-lg">
          Social patterns. Real estate outcomes.
        </p>
      </ScrollReveal>

      <TopProvidersSection module="network" embedded showHeading={false} className="mb-8" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {NETWORK_PREVIEW_ITEMS.map(({ icon, title, text }, index) => {
          const Icon = PREVIEW_ICONS[icon]
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
        id="network-learn-more"
        exploreTo={PATHS.networkFeed}
        label="Explore Network"
      />
    </Section>
  )
}
