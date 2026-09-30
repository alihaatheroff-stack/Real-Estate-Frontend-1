import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  Check,
  Handshake,
  GraduationCap,
  Inbox,
  Send,
  Shield,
  Users,
} from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
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

const shell = 'max-w-none'

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-brand">{children}</p>
  )
}

function SectionTitle({ children, className }: { children: string; className?: string }) {
  return (
    <h2
      className={cn(
        'mt-2.5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl',
        className,
      )}
    >
      {children}
    </h2>
  )
}

function CapacityDot({ tone }: { tone: 'open' | 'limited' | 'unavailable' }) {
  return (
    <span
      className={cn(
        'inline-block h-2.5 w-2.5 rounded-full',
        tone === 'open' && 'animate-pulse bg-emerald-600',
        tone === 'limited' && 'bg-accent',
        tone === 'unavailable' && 'bg-muted',
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
      <ScrollReveal variant="left" className="relative overflow-hidden rounded-2xl border border-line bg-white/90 p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
            <p className="mt-0.5 text-sm text-muted">
              {profile.role} · {profile.location}
            </p>
          </div>
          {profile.verified ? (
            <span className="inline-flex items-center gap-1 rounded-lg bg-brand/8 px-2 py-1 text-xs font-semibold text-brand">
              <BadgeCheck className="h-3.5 w-3.5" />
              Verified
            </span>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {profile.specialties.map((item) => (
            <span
              key={item}
              className="rounded-lg border border-line bg-mist/60 px-2.5 py-1 text-xs font-medium text-ink"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-5 inline-flex items-center gap-2 rounded-lg border border-emerald-600/25 bg-emerald-50 px-3 py-1.5 text-sm font-semibold text-ink">
          <CapacityDot tone="open" />
          {profile.status}
        </div>
      </ScrollReveal>

      <ScrollReveal delay={120} variant="right" className="relative flex items-center">
        <div className="w-full rounded-2xl border border-brand/20 bg-brand px-4 py-4 text-white shadow-md sm:px-5">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15">
              <Bell className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
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
    <div className="rounded-2xl border border-line bg-white/85 p-4 shadow-sm backdrop-blur-sm sm:p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
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
    <Section id="what-you-can-do" className="py-16 sm:py-24" containerClassName={shell}>
      <ScrollReveal>
        <SectionEyebrow>What you can do here</SectionEyebrow>
        <SectionTitle>Three referral actions</SectionTitle>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          Why you should care right now — send work you cannot take, receive qualified intros, or
          train into unfamiliar deal types.
        </p>
      </ScrollReveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {REFERRAL_ACTIONS.map((action, index) => {
          const Icon = icons[action.id as keyof typeof icons]
          return (
            <ScrollReveal key={action.id} delay={index * 80}>
              <article>
                <div className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5 shrink-0 text-brand" />
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {action.title}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted">{action.lead}</p>
                <div className="mt-5 rounded-xl border border-dashed border-line bg-mist/40 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                    {action.visualLabel}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink">{action.visualDetail}</p>
                </div>
                <p className="mt-4 text-sm font-medium text-ink">{action.micro}</p>
                <p className="mt-4 border-l-2 border-accent pl-3 text-xs leading-relaxed text-muted">
                  {REFERRAL_ACTION_DISCLOSURE}
                </p>
              </article>
            </ScrollReveal>
          )
        })}
      </div>
    </Section>
  )
}

function FlowSection() {
  return (
    <Section id="how-it-works" className="border-y border-line bg-mist/30 py-16 sm:py-24" containerClassName={shell}>
      <ScrollReveal>
        <SectionEyebrow>How referral exchange works</SectionEyebrow>
        <SectionTitle>From profile to closed loop</SectionTitle>
      </ScrollReveal>

      <div className="mt-10 flex gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible lg:pb-0">
        {REFERRAL_FLOW_STEPS.map((step, index) => (
          <ScrollReveal key={step.id} delay={index * 60} className="min-w-[220px] flex-1 lg:min-w-0">
            <article className="h-full">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                Step {index + 1}
              </p>
              <h3 className="mt-2 font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.body}</p>
              <p className="mt-4 rounded-lg bg-white/80 px-3 py-2 text-xs leading-relaxed text-ink ring-1 ring-line">
                {step.uiNote}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={200} className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          Capacity signal
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {REFERRAL_CAPACITY_OPTIONS.map((option) => (
            <span
              key={option.id}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2 text-sm font-medium text-ink"
            >
              <CapacityDot tone={option.tone} />
              {option.label}
            </span>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  )
}

function ReputationSection() {
  return (
    <Section className="py-16 sm:py-24" containerClassName={shell}>
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
        <ScrollReveal>
          <SectionEyebrow>Reputation that travels</SectionEyebrow>
          <SectionTitle>Trust signals you can verify</SectionTitle>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Why would I trust a referral from a stranger on this platform?
          </p>
          <p className="mt-6 border-l-2 border-accent pl-4 text-base leading-relaxed text-ink">
            {REFERRAL_TRUST_MICRO}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {REFERRAL_BADGES.map((badge) => (
              <span
                key={badge.tier}
                className="rounded-lg border border-line bg-mist/50 px-2.5 py-1.5 text-xs font-semibold text-ink"
                title={badge.rule}
              >
                {badge.tier}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-display text-xl font-semibold text-ink">Maya Chen</p>
                <p className="mt-0.5 text-sm text-muted">Commercial Appraiser · Phoenix, AZ</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand">
                <BadgeCheck className="h-4 w-4" />
                Verified
              </span>
            </div>
            <dl className="mt-6 space-y-4">
              {REFERRAL_TRUST_SIGNALS.map((row) => (
                <div key={row.signal} className="grid gap-1 border-t border-line pt-4 first:border-t-0 first:pt-0 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-4">
                  <dt className="text-sm font-semibold text-ink">{row.signal}</dt>
                  <dd className="text-sm leading-relaxed text-muted">{row.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </ScrollReveal>
      </div>
    </Section>
  )
}

function ComplianceSection() {
  const columns = [
    REFERRAL_COMPLIANCE.allowed,
    REFERRAL_COMPLIANCE.prohibited,
    REFERRAL_COMPLIANCE.protect,
  ]

  return (
    <Section id="compliance" className="border-y border-line bg-brand/[0.03] py-16 sm:py-24" containerClassName={shell}>
      <ScrollReveal>
        <div className="flex items-center gap-2.5">
          <Shield className="h-5 w-5 text-brand" />
          <SectionEyebrow>Permissible referral exchange</SectionEyebrow>
        </div>
        <SectionTitle>{REFERRAL_COMPLIANCE.title}</SectionTitle>
      </ScrollReveal>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {columns.map((column, index) => (
          <ScrollReveal key={column.title} delay={index * 70}>
            <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-3">
              {column.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={160} className="mt-12">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Legal check</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-[auto_auto_minmax(0,1fr)] sm:items-center">
          <span className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink ring-1 ring-line">
            {REFERRAL_COMPLIANCE.flowchart.start}
          </span>
          <ArrowRight className="hidden h-4 w-4 text-muted sm:block" />
          <div className="space-y-3">
            <p className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-ink ring-1 ring-line">
              {REFERRAL_COMPLIANCE.flowchart.check}
            </p>
            <p className="rounded-xl border border-line bg-mist/50 px-4 py-3 text-sm leading-relaxed text-muted">
              {REFERRAL_COMPLIANCE.flowchart.mortgage}
            </p>
            <p className="rounded-xl border border-line bg-mist/50 px-4 py-3 text-sm leading-relaxed text-muted">
              {REFERRAL_COMPLIANCE.flowchart.nonMortgage}
            </p>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200} className="mt-10">
        <div className="flex flex-col gap-3 rounded-2xl border border-accent/40 bg-accent-soft/40 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div>
            <p className="text-sm font-semibold text-ink">⚠ {RESPA_BANNER.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted">{RESPA_BANNER.body}</p>
          </div>
          <a href="#compliance" className="shrink-0 text-sm font-semibold text-brand underline-offset-2 hover:underline">
            {RESPA_BANNER.learnMore}
          </a>
        </div>
      </ScrollReveal>
    </Section>
  )
}

function DashboardPreviewSection() {
  const data = REFERRAL_DASHBOARD_PREVIEW

  return (
    <Section className="py-16 sm:py-24" containerClassName={shell}>
      <ScrollReveal>
        <SectionEyebrow>Post-login tease</SectionEyebrow>
        <SectionTitle>{data.title}</SectionTitle>
        <p className="mt-4 text-base leading-relaxed text-muted">{data.micro}</p>
      </ScrollReveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        <ScrollReveal>
          <div className="rounded-2xl border border-line bg-white p-5">
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
                    <span className="rounded-lg bg-mist px-2 py-1 text-xs font-semibold text-ink">
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

        <ScrollReveal delay={80}>
          <div className="rounded-2xl border border-line bg-white p-5">
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
                            'inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium',
                            active && 'bg-brand text-white',
                            done && !active && 'bg-emerald-50 text-ink',
                            !done && !active && 'bg-mist text-muted',
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

        <ScrollReveal delay={120}>
          <div className="rounded-2xl border border-line bg-white p-5">
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
                    <CapacityDot
                      tone={partner.capacity === 'Open' ? 'open' : 'limited'}
                    />
                    {partner.capacity}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="rounded-2xl border border-line bg-white p-5">
            <h3 className="font-display text-base font-semibold text-ink">Referral stats</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {data.stats.map((stat) => (
                <div key={stat.label} className="rounded-xl bg-mist/60 px-3 py-3">
                  <p className="font-display text-xl font-semibold text-ink">{stat.value}</p>
                  <p className="mt-0.5 text-xs font-medium text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted">{data.earningsNote}</p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={180} className="mt-10">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
          Training preference (send modal)
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {REFERRAL_TRAINING_OPTIONS.map((option) => (
            <div key={option.id} className="rounded-xl border border-line bg-white px-3 py-3">
              <p className="text-sm font-semibold text-ink">{option.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{option.detail}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </Section>
  )
}

function TribeSection() {
  return (
    <Section className="border-y border-line bg-mist/30 py-16 sm:py-24" containerClassName={shell}>
      <ScrollReveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionEyebrow>Find your referral tribe</SectionEyebrow>
            <SectionTitle>Groups + forums preview</SectionTitle>
          </div>
          <Link to={PATHS.referralsForums}>
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Browse All Groups
            </Button>
          </Link>
        </div>
      </ScrollReveal>

      <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
        {REFERRAL_TRIBE_GROUPS.map((group, index) => (
          <ScrollReveal key={group.id} delay={index * 70} className="min-w-[260px] max-w-[300px] shrink-0">
            <article className="h-full rounded-2xl border border-line bg-white p-5">
              <Users className="h-5 w-5 text-brand" />
              <h3 className="mt-3 font-display text-base font-semibold tracking-tight text-ink">
                {group.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{group.focus}</p>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-brand">
                {group.members}
              </p>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  )
}

function FinalCtaSection() {
  const [roleId, setRoleId] = useState('')
  const selected = REFERRAL_ROLE_RULES.find((role) => role.id === roleId)

  return (
    <Section id="ready" className="py-16 sm:py-24" containerClassName={shell}>
      <ScrollReveal>
        <div className="flex items-center gap-2.5">
          <Handshake className="h-5 w-5 text-brand" />
          <SectionEyebrow>Ready to start exchanging?</SectionEyebrow>
        </div>
        <h2 className="mt-2.5 max-w-3xl font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
          {REFERRAL_FINAL_CTA.headline}
        </h2>
      </ScrollReveal>

      <ScrollReveal delay={80} className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to={PATHS.registerPsp}>
          <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
            {REFERRAL_FINAL_CTA.joinCta}
          </Button>
        </Link>
        <a href="#role-rules">
          <Button size="lg" variant="outline">
            {REFERRAL_FINAL_CTA.rulesCta}
          </Button>
        </a>
      </ScrollReveal>

      <ScrollReveal delay={120} id="role-rules" className="mt-10 max-w-xl scroll-mt-28">
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
          <p className="mt-4 rounded-xl border border-line bg-mist/50 px-4 py-3 text-sm leading-relaxed text-ink">
            {selected.summary}
          </p>
        ) : null}
      </ScrollReveal>

      <p className="mt-10 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
        {REFERRAL_FINAL_CTA.footerNote}
      </p>
    </Section>
  )
}

export function ReferralsExchangeLanding() {
  const hero = REFERRAL_EXCHANGE_HERO

  return (
    <div className="bg-paper pb-16 sm:pb-20">
      <Section
        className="relative overflow-hidden pt-14 sm:pt-20 pb-12 sm:pb-16"
        containerClassName={shell}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(11,31,58,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(201,162,39,0.12),transparent_50%)]"
        />
        <ScrollReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            {hero.eyebrow}
          </p>
          <p className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {hero.brand}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-2xl font-semibold tracking-tight text-ink-soft sm:text-3xl lg:text-4xl">
            {hero.headline}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {hero.subhead}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to={PATHS.registerPsp}>
              <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {hero.primaryCta}
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline">
                {hero.secondaryCta}
              </Button>
            </a>
          </div>
        </ScrollReveal>

        <div className="mt-10">
          <HeroVisual />
        </div>

        <ScrollReveal delay={140} className="mt-8">
          <ReferralFilterPanel />
        </ScrollReveal>
      </Section>

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
