import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Check,
  GraduationCap,
  Handshake,
  Inbox,
  Send,
  Shield,
  Users,
} from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import {
  REFERRAL_ACTION_DISCLOSURE,
  REFERRAL_ACTIONS,
  REFERRAL_BADGES,
  REFERRAL_CAPACITY_OPTIONS,
  REFERRAL_COMPLIANCE,
  REFERRAL_DASHBOARD_PREVIEW,
  REFERRAL_EXCHANGE_HERO,
  REFERRAL_EXCHANGE_HERO_IMAGE,
  REFERRAL_FILTER_OPTIONS,
  REFERRAL_FINAL_CTA,
  REFERRAL_FLOW_STEPS,
  REFERRAL_ROLE_RULES,
  REFERRAL_TIMELINE,
  REFERRAL_TRAINING_OPTIONS,
  REFERRAL_TRIBE_GROUPS,
  REFERRAL_TRUST_MICRO,
  REFERRAL_TRUST_SIGNALS,
  RESPA_BANNER,
} from '@/features/referrals/data/referralsExchange'
import { cn } from '@/shared/lib/cn'

const shell = 'mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8'

function SectionEyebrow({
  children,
  onDark = false,
}: {
  children: string
  onDark?: boolean
}) {
  return (
    <p
      className={cn(
        'inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]',
        onDark ? 'text-accent' : 'text-accent',
      )}
    >
      <span className="h-px w-8 bg-accent" aria-hidden />
      {children}
    </p>
  )
}

function CapacityDot({ tone }: { tone: 'open' | 'limited' | 'unavailable' }) {
  return (
    <span
      className={cn(
        'inline-block h-2.5 w-2.5 rounded-full',
        tone === 'open' && 'animate-pulse bg-emerald-500',
        tone === 'limited' && 'bg-accent',
        tone === 'unavailable' && 'bg-white/40',
      )}
      aria-hidden
    />
  )
}

function HeroVisual() {
  const profile = REFERRAL_EXCHANGE_HERO.profileCard
  const note = REFERRAL_EXCHANGE_HERO.notification

  return (
    <div className="relative grid gap-4 lg:grid-cols-2">
      <ScrollReveal variant="left" y={36} className="relative border border-white/15 bg-white/95 p-5 shadow-[0_16px_48px_rgba(11,31,58,0.28)] backdrop-blur-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
            <p className="mt-0.5 text-sm text-muted">
              {profile.role} · {profile.location}
            </p>
          </div>
          {profile.verified ? (
            <span className="inline-flex items-center gap-1 bg-freeio-navy px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
              <BadgeCheck className="h-3.5 w-3.5 text-accent" />
              Verified
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.specialties.map((item) => (
            <span
              key={item}
              className="border border-line bg-freeio-wash px-2.5 py-1 text-xs font-medium text-ink"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-5 inline-flex items-center gap-2 border border-emerald-600/25 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-ink">
          <CapacityDot tone="open" />
          {profile.status}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={140} variant="right" y={36} className="relative flex items-center">
        <div className="w-full border border-accent/40 bg-freeio-navy px-4 py-4 text-white shadow-[0_16px_48px_rgba(11,31,58,0.35)] sm:px-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center bg-accent text-ink">
              <Bell className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                {note.title}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/95">{note.body}</p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}

function ReferralFilterPanel() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    referralType: '',
    specialty: '',
    geography: '',
    trainingWillingness: '',
    reputationTier: '',
  })

  function update(key: keyof typeof filters, value: string) {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  function onSearch() {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    const query = params.toString()
    navigate(query ? `${PATHS.profileResults}?${query}` : PATHS.profileResults)
  }

  return (
    <div className="border border-white/10 bg-white p-4 shadow-[0_20px_60px_rgba(11,31,58,0.35)] sm:p-5">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
        Find referral partners
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Select
          label="Referral Type"
          placeholder="Any type"
          options={[...REFERRAL_FILTER_OPTIONS.referralType]}
          value={filters.referralType}
          onChange={(event) => update('referralType', event.target.value)}
        />
        <Select
          label="Specialty"
          placeholder="Any specialty"
          options={[...REFERRAL_FILTER_OPTIONS.specialty]}
          value={filters.specialty}
          onChange={(event) => update('specialty', event.target.value)}
        />
        <Select
          label="Geography"
          placeholder="Any geography"
          options={[...REFERRAL_FILTER_OPTIONS.geography]}
          value={filters.geography}
          onChange={(event) => update('geography', event.target.value)}
        />
        <Select
          label="Training Willingness"
          placeholder="Any"
          options={[...REFERRAL_FILTER_OPTIONS.trainingWillingness]}
          value={filters.trainingWillingness}
          onChange={(event) => update('trainingWillingness', event.target.value)}
        />
        <Select
          label="Reputation Tier"
          placeholder="Any tier"
          options={[...REFERRAL_FILTER_OPTIONS.reputationTier]}
          value={filters.reputationTier}
          onChange={(event) => update('reputationTier', event.target.value)}
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Button onClick={onSearch} rightIcon={<ArrowRight className="h-4 w-4" />}>
          Search partners
        </Button>
        <p className="text-sm text-muted">Browse verified PSPs open to referral exchange.</p>
      </div>
    </div>
  )
}

function ActionsSection() {
  const icons = {
    send: Send,
    receive: Inbox,
    train: GraduationCap,
  } as const

  return (
    <section id="what-you-can-do" className="w-full bg-white">
      <div className={cn(shell, 'py-12 sm:py-16')}>
        <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" y={36}>
          <SectionEyebrow>What You Can Do Here</SectionEyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            Three referral actions
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Why you should care right now — send work you cannot take, receive qualified intros, or
            train into unfamiliar deal types.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {REFERRAL_ACTIONS.map((action, index) => {
            const Icon = icons[action.id as keyof typeof icons]
            return (
              <ScrollReveal
                key={action.id}
                delay={Math.min(index, 3) * 100}
                y={40}
                className="h-full"
              >
                <article className="flex h-full flex-col border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center bg-accent text-ink">
                      <Icon className="h-5 w-5" strokeWidth={2.5} />
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                      {action.title}
                    </h3>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                    {action.lead}
                  </p>
                  <div className="mt-5 border border-dashed border-line bg-freeio-wash px-4 py-3">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
                      {action.visualLabel}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">{action.visualDetail}</p>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-ink">{action.micro}</p>
                  <p className="mt-4 border-l-4 border-accent pl-3 text-xs leading-relaxed text-muted">
                    {REFERRAL_ACTION_DISCLOSURE}
                  </p>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FlowSection() {
  return (
    <section id="how-it-works" className="w-full scroll-mt-24 bg-freeio-navy">
      <div className={cn(shell, 'py-12 sm:py-16')}>
        <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" y={36}>
          <SectionEyebrow onDark>How Referral Exchange Works</SectionEyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">
            From profile to closed loop
          </h2>
        </ScrollReveal>

        <div className="flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
          {REFERRAL_FLOW_STEPS.map((step, index) => (
            <ScrollReveal
              key={step.id}
              delay={index * 70}
              y={32}
              className="min-w-[240px] flex-1 lg:min-w-0"
            >
              <article className="h-full border border-white/10 bg-white/[0.04] p-4 sm:p-5">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  Step {index + 1}
                </p>
                <h3 className="mt-2 font-display text-base font-semibold tracking-tight text-white sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{step.body}</p>
                <p className="mt-4 border-l-2 border-accent bg-white/5 px-3 py-2 text-xs leading-relaxed text-white/85">
                  {step.uiNote}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={220} className="mt-10" y={28}>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Capacity signal
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            {REFERRAL_CAPACITY_OPTIONS.map((option) => (
              <span
                key={option.id}
                className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white"
              >
                <CapacityDot tone={option.tone} />
                {option.label}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function ReputationSection() {
  return (
    <section className="w-full bg-freeio-wash">
      <div className={cn(shell, 'grid gap-10 py-12 sm:py-16 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12')}>
        <ScrollReveal y={40}>
          <SectionEyebrow>Reputation That Travels</SectionEyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            Trust signals you can verify
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
            Why would I trust a referral from a stranger on this platform?
          </p>
          <p className="mt-6 border-l-4 border-accent pl-4 text-base leading-relaxed text-ink">
            {REFERRAL_TRUST_MICRO}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {REFERRAL_BADGES.map((badge) => (
              <span
                key={badge.tier}
                className="border border-line bg-white px-3 py-2 text-xs font-semibold text-ink"
                title={badge.rule}
              >
                {badge.tier}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120} y={40}>
          <div className="border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-semibold text-ink">Maya Chen</p>
                <p className="mt-0.5 text-sm text-muted">Commercial Appraiser · Phoenix, AZ</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-bold uppercase tracking-wide text-freeio-navy">
                <BadgeCheck className="h-4 w-4 text-accent" />
                Verified
              </span>
            </div>
            <dl className="mt-6 space-y-4">
              {REFERRAL_TRUST_SIGNALS.map((row) => (
                <div
                  key={row.signal}
                  className="grid gap-1 border-t border-line pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4"
                >
                  <dt className="text-sm font-semibold text-ink">{row.signal}</dt>
                  <dd className="text-sm leading-relaxed text-muted">{row.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function ComplianceSection() {
  const columns = [
    REFERRAL_COMPLIANCE.allowed,
    REFERRAL_COMPLIANCE.prohibited,
    REFERRAL_COMPLIANCE.protect,
  ]

  return (
    <section id="compliance" className="w-full scroll-mt-24 bg-white">
      <div className={cn(shell, 'py-12 sm:py-16')}>
        <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" y={36}>
          <div className="flex items-center gap-2.5">
            <Shield className="h-5 w-5 text-freeio-navy" />
            <SectionEyebrow>Permissible Referral Exchange</SectionEyebrow>
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            {REFERRAL_COMPLIANCE.title}
          </h2>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {columns.map((column, index) => (
            <ScrollReveal key={column.title} delay={index * 80} y={32} className="h-full">
              <article className="h-full border border-line bg-freeio-wash p-5 sm:p-6">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {column.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span
                        aria-hidden
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={160} className="mt-10" y={28}>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Legal check</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:items-center">
            <span className="border border-line bg-white px-4 py-3 text-sm font-semibold text-ink">
              {REFERRAL_COMPLIANCE.flowchart.start}
            </span>
            <ArrowRight className="hidden h-4 w-4 text-muted sm:block" />
            <div className="space-y-3">
              <p className="border border-line bg-white px-4 py-3 text-sm font-semibold text-ink">
                {REFERRAL_COMPLIANCE.flowchart.check}
              </p>
              <p className="border border-line bg-freeio-wash px-4 py-3 text-sm leading-relaxed text-muted">
                {REFERRAL_COMPLIANCE.flowchart.mortgage}
              </p>
              <p className="border border-line bg-freeio-wash px-4 py-3 text-sm leading-relaxed text-muted">
                {REFERRAL_COMPLIANCE.flowchart.nonMortgage}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200} className="mt-10" y={24}>
          <div className="flex flex-col gap-3 border border-accent/50 bg-accent/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-sm font-semibold text-ink">⚠ {RESPA_BANNER.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{RESPA_BANNER.body}</p>
            </div>
            <a
              href="#compliance"
              className="shrink-0 text-sm font-bold uppercase tracking-wide text-freeio-navy underline-offset-4 hover:underline"
            >
              {RESPA_BANNER.learnMore}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function DashboardPreviewSection() {
  const data = REFERRAL_DASHBOARD_PREVIEW

  return (
    <section className="w-full bg-freeio-wash">
      <div className={cn(shell, 'py-12 sm:py-16')}>
        <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" y={36}>
          <SectionEyebrow>Your Referral Dashboard</SectionEyebrow>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            {data.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{data.micro}</p>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <ScrollReveal y={32}>
            <div className="border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-6">
              <h3 className="font-display text-base font-semibold text-ink">Incoming referrals</h3>
              <ul className="mt-4 space-y-3">
                {data.incoming.map((item) => (
                  <li
                    key={item.sender + item.need}
                    className="flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 last:border-b-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-semibold text-ink">{item.sender}</p>
                      <p className="text-sm text-muted">{item.need}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-freeio-wash px-2 py-1 text-xs font-semibold text-ink">
                        {item.status}
                      </span>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80} y={32}>
            <div className="border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-6">
              <h3 className="font-display text-base font-semibold text-ink">Sent referrals</h3>
              <ul className="mt-4 space-y-3">
                {data.sent.map((item) => (
                  <li key={item.recipient}>
                    <p className="text-sm font-semibold text-ink">{item.recipient}</p>
                    <p className="text-sm text-muted">{item.need}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {REFERRAL_TIMELINE.map((stage, index) => {
                        const active = stage === item.stage
                        const done = index < 3
                        return (
                          <span
                            key={stage}
                            className={cn(
                              'inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium',
                              active && 'bg-freeio-navy text-white',
                              done && !active && 'bg-emerald-50 text-ink',
                              !done && !active && 'bg-freeio-wash text-muted',
                            )}
                          >
                            {done || active ? <Check className="h-3 w-3" /> : null}
                            {stage}
                          </span>
                        )
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={120} y={32}>
            <div className="border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-6">
              <h3 className="font-display text-base font-semibold text-ink">Training & partners</h3>
              <ul className="mt-4 space-y-2">
                {data.training.map((item) => (
                  <li key={item.label} className="flex justify-between gap-3 text-sm">
                    <span className="text-ink">{item.label}</span>
                    <span className="font-semibold text-muted">{item.status}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 space-y-2 border-t border-line pt-4">
                {data.partners.map((partner) => (
                  <li key={partner.name} className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-medium text-ink">{partner.name}</span>
                    <span className="inline-flex items-center gap-1.5 text-muted">
                      <span
                        className={cn(
                          'inline-block h-2.5 w-2.5 rounded-full',
                          partner.capacity === 'Open' && 'animate-pulse bg-emerald-600',
                          partner.capacity === 'Limited' && 'bg-accent',
                        )}
                      />
                      {partner.capacity}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={160} y={32}>
            <div className="border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-6">
              <h3 className="font-display text-base font-semibold text-ink">Referral stats</h3>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {data.stats.map((stat) => (
                  <div key={stat.label} className="bg-freeio-wash px-3 py-3">
                    <p className="font-display text-xl font-semibold text-ink">{stat.value}</p>
                    <p className="mt-0.5 text-xs font-medium text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{data.earningsNote}</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={180} className="mt-10" y={28}>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
            Training preference (send modal)
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {REFERRAL_TRAINING_OPTIONS.map((option) => (
              <div key={option.id} className="border border-line bg-white px-3 py-3">
                <p className="text-sm font-semibold text-ink">{option.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{option.detail}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function TribeSection() {
  return (
    <section className="w-full bg-white">
      <div className={cn(shell, 'py-12 sm:py-16')}>
        <ScrollReveal className="mb-8" y={36}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <SectionEyebrow>Find Your Referral Tribe</SectionEyebrow>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
                Groups + forums preview
              </h2>
            </div>
            <Link
              to={PATHS.referralsForums}
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-freeio-navy transition hover:text-brand"
            >
              Browse All Groups
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {REFERRAL_TRIBE_GROUPS.map((group, index) => (
            <ScrollReveal
              key={group.id}
              delay={index * 70}
              y={32}
              className="min-w-[260px] max-w-[300px] shrink-0"
            >
              <article className="h-full border border-line bg-freeio-wash p-5 shadow-[0_12px_40px_rgba(11,31,58,0.04)]">
                <span className="inline-flex h-10 w-10 items-center justify-center bg-accent text-ink">
                  <Users className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold tracking-tight text-ink">
                  {group.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{group.focus}</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-accent">
                  {group.members}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCtaSection() {
  const [roleId, setRoleId] = useState('')
  const selected = REFERRAL_ROLE_RULES.find((role) => role.id === roleId)

  return (
    <section id="ready" className="w-full scroll-mt-24 bg-freeio-navy">
      <div className={cn(shell, 'py-12 sm:py-16')}>
        <ScrollReveal y={40}>
          <div className="flex items-center gap-2.5">
            <Handshake className="h-5 w-5 text-accent" />
            <SectionEyebrow onDark>Ready to Start Exchanging?</SectionEyebrow>
          </div>
          <h2 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            {REFERRAL_FINAL_CTA.headline}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={80} className="mt-8 flex flex-col gap-3 sm:flex-row" y={28}>
          <Link to={PATHS.registerPsp}>
            <Button size="lg" variant="accent" rightIcon={<ArrowRight className="h-4 w-4" />}>
              {REFERRAL_FINAL_CTA.joinCta}
            </Button>
          </Link>
          <a href="#role-rules">
            <Button
              size="lg"
              variant="outline"
              className="border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
            >
              {REFERRAL_FINAL_CTA.rulesCta}
            </Button>
          </a>
        </ScrollReveal>

        <ScrollReveal delay={120} id="role-rules" className="mt-10 max-w-xl scroll-mt-28" y={28}>
          <div className="border border-white/15 bg-white p-4 sm:p-5">
            <Select
              label="Your PSP role"
              placeholder="Select a role"
              options={REFERRAL_ROLE_RULES.map((role) => ({
                label: role.label,
                value: role.id,
              }))}
              value={roleId}
              onChange={(event) => setRoleId(event.target.value)}
            />
            {selected ? (
              <p className="mt-4 border border-line bg-freeio-wash px-4 py-3 text-sm leading-relaxed text-ink">
                {selected.summary}
              </p>
            ) : null}
          </div>
        </ScrollReveal>

        <p className="mt-10 border-l-4 border-accent pl-4 text-sm leading-relaxed text-white/70">
          {REFERRAL_FINAL_CTA.footerNote}
        </p>
      </div>
    </section>
  )
}

export function ReferralsExchangeLanding() {
  const hero = REFERRAL_EXCHANGE_HERO

  return (
    <div className="bg-white">
      <section
        className="relative isolate overflow-hidden"
        aria-label="Referral exchange hero"
      >
        <img
          src={REFERRAL_EXCHANGE_HERO_IMAGE}
          alt=""
          className="hire-hero-photo absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-freeio-navy via-freeio-navy/92 to-freeio-navy/55"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-freeio-navy via-freeio-navy/40 to-freeio-navy/25"
        />

        <div className={cn(shell, 'relative z-[1] pb-12 pt-14 sm:pb-16 sm:pt-20 lg:pt-24')}>
          <ScrollReveal y={48}>
            <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {hero.brand}
            </p>
            <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
              {hero.eyebrow}
            </p>

            <h1 className="mt-8 max-w-3xl font-display text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl">
              {hero.headline}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
              {hero.subhead}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to={PATHS.registerPsp}>
                <Button size="lg" variant="accent" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  {hero.primaryCta}
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/35 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
                >
                  {hero.secondaryCta}
                </Button>
              </a>
            </div>
          </ScrollReveal>

          <div className="mt-10">
            <HeroVisual />
          </div>

          <ScrollReveal delay={160} className="mt-8" y={36}>
            <ReferralFilterPanel />
          </ScrollReveal>
        </div>
      </section>

      <ActionsSection />
      <FlowSection />
      <ReputationSection />
      <ComplianceSection />
      <DashboardPreviewSection />
      <TribeSection />
      <FinalCtaSection />
    </div>
  )
}
