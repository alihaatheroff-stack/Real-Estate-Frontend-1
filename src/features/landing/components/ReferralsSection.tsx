import { useId, useState, type ComponentType } from 'react'
import {
  ChevronDown,
  GraduationCap,
  HandCoins,
  Presentation,
  RefreshCw,
  Satellite,
} from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
import { useIsAuthenticated } from '@/features/auth'
import { FieldsGrid } from '@/features/landing/components/FieldsGrid'
import { ReferralAwards } from '@/features/landing/components/ReferralAwards'
import { ReferralMemberHub } from '@/features/landing/components/ReferralMemberHub'
import { SectionCtas } from '@/features/landing/components/SectionCtas'
import {
  GUEST_ITEMS,
  HOW_IT_WORKS_STEPS,
  LEARN_MORE_TABS,
  REFERRAL_BENEFITS,
  USER_JOURNEY_STEPS,
  type GuestItemIcon,
  type LearnMoreTab,
} from '@/features/landing/data/referralsLearnMore'
import { cn } from '@/shared/lib/cn'

const GUEST_ICONS: Record<GuestItemIcon, ComponentType<{ className?: string }>> = {
  RefreshCw,
  GraduationCap,
  Presentation,
  HandCoins,
  Satellite,
}

function BenefitsPanel() {
  return (
    <div className="space-y-8">
      <p>
        Benefits for new, seasonal, and experienced persons (drawn from the provided text on the
        referral network for agents/senders, recipients, clients, and the overall network):
      </p>

      {REFERRAL_BENEFITS.map((group) => (
        <div key={group.title} className="space-y-3">
          <h3 className="font-display text-base font-semibold tracking-tight text-ink">
            {group.title}
          </h3>
          <ul className="list-disc space-y-2 pl-5">
            {group.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

function UserStoryPanel() {
  return (
    <div className="space-y-6">
      <p>
        Our platform is designed to make your experience simple, transparent, and rewarding. Here’s
        how a typical journey looks for Property Service Providers (PSPs):
      </p>

      <ol className="space-y-5">
        {USER_JOURNEY_STEPS.map((step) => (
          <li key={step.title} className="space-y-2">
            <h4 className="text-sm font-semibold tracking-tight text-ink sm:text-base">
              {step.title}
            </h4>
            {'text' in step && step.text ? <p>{step.text}</p> : null}
            {'items' in step && step.items ? (
              <ul className="list-disc space-y-1.5 pl-5">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}

function HowItWorksPanel() {
  return (
    <div className="space-y-6">
      <p>
        Getting started with our network is simple and designed to save you time while delivering
        real results.
      </p>

      <ol className="space-y-5">
        {HOW_IT_WORKS_STEPS.map((step) => (
          <li key={step.title} className="space-y-2">
            <h4 className="text-sm font-semibold tracking-tight text-ink sm:text-base">
              {step.title}
            </h4>
            {'text' in step && step.text ? <p>{step.text}</p> : null}
            {'items' in step && step.items ? (
              <ul className="list-disc space-y-1.5 pl-5">
                {step.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  )
}

function LearnMoreSection({ className }: { className?: string }) {
  const [learnMoreOpen, setLearnMoreOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<LearnMoreTab>('how-it-works')
  const panelId = useId()

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-center">
        <button
          type="button"
          aria-expanded={learnMoreOpen}
          aria-controls={panelId}
          onClick={() => setLearnMoreOpen((open) => !open)}
          className="inline-flex items-center gap-2 text-base font-semibold tracking-tight text-brand transition hover:text-brand-dark"
        >
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 transition-transform duration-200',
              learnMoreOpen && 'rotate-180',
            )}
            aria-hidden
          />
          <span className="underline underline-offset-4">Learn More</span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 transition-transform duration-200',
              learnMoreOpen && 'rotate-180',
            )}
            aria-hidden
          />
        </button>
      </div>

      {learnMoreOpen ? (
        <div
          id={panelId}
          className="mt-5 w-full overflow-hidden rounded-2xl border border-line bg-paper shadow-sm"
        >
          <div
            role="tablist"
            aria-label="Learn more topics"
            className="grid grid-cols-3 border-b border-line"
          >
            {LEARN_MORE_TABS.map((tab) => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-2 py-3 text-center text-sm font-semibold transition sm:px-4',
                    active
                      ? 'bg-brand text-white'
                      : 'bg-mist/60 text-ink hover:bg-mist hover:text-brand',
                  )}
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          <div className="px-4 py-6 text-sm leading-relaxed text-ink-soft sm:px-6">
            {activeTab === 'how-it-works' ? <HowItWorksPanel /> : null}
            {activeTab === 'user-journey' ? <UserStoryPanel /> : null}
            {activeTab === 'benefits' ? <BenefitsPanel /> : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function GuestReferralsContent() {
  return (
    <>
      <FieldsGrid embedded className="mb-12" />

      <div className="mb-10 w-full">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          1. Referral
        </h2>
      </div>

      <ReferralAwards embedded showHeading={false} className="mb-10 w-full" />

      <div className="mb-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
        {GUEST_ITEMS.map(({ icon, title, text }) => {
          const Icon = GUEST_ICONS[icon]
          return (
            <article
              key={title}
              className="group flex h-full min-w-0 flex-col rounded-2xl border border-line bg-paper/90 p-5 transition duration-300 hover:border-brand/25 hover:bg-paper"
            >
              <div className="mb-4 inline-flex w-fit rounded-xl bg-brand-light p-2.5 text-brand transition duration-300 group-hover:bg-brand group-hover:text-white">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-base font-semibold tracking-tight text-ink">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{text}</p>
            </article>
          )
        })}
      </div>

      <LearnMoreSection className="mb-10" />

      <SectionCtas exploreTo={PATHS.results} label="Explore Referrals" />
    </>
  )
}

function AuthenticatedReferralsContent() {
  return (
    <>
      <div className="mb-10 w-full">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          1. Referral
        </h2>
      </div>

      <ReferralMemberHub className="mb-12" />

      <LearnMoreSection className="mt-10" />
    </>
  )
}

export function ReferralsSection() {
  const isAuthenticated = useIsAuthenticated()

  return (
    <Section className="bg-mist/70 py-10 pb-8 sm:py-12 sm:pb-10" containerClassName="max-w-none">
      {isAuthenticated ? <AuthenticatedReferralsContent /> : <GuestReferralsContent />}
    </Section>
  )
}
