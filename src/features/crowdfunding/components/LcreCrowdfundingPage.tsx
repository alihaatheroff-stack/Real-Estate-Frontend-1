import { useId, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Compass,
  Eye,
  Handshake,
  HeartHandshake,
  Landmark,
  Scale,
  Trees,
  Users,
  Vote,
} from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import {
  LCRE_ABOUT,
  LCRE_ACKNOWLEDGEMENTS,
  LCRE_BENEFITS,
  LCRE_BOARD,
  LCRE_DIFFERENTIATORS,
  LCRE_FINE_PRINT,
  LCRE_HERO,
  LCRE_INDEX,
  LCRE_JOIN,
  LCRE_LEGAL_FUND,
  LCRE_LEGAL_PREP,
  LCRE_LONG_TERM,
  LCRE_PHASE_ONE,
  LCRE_PROJECTS,
  LCRE_QA,
  LCRE_SEC_NOTICE,
  LCRE_SUPPORTERS,
  LCRE_UPDATES,
} from '@/features/crowdfunding/data/lcreCrowdfunding'
import { cn } from '@/shared/lib/cn'

const DIFF_ICONS = {
  values: HeartHandshake,
  community: Vote,
  transparent: Eye,
  recreation: Trees,
} as const

const shell = 'max-w-none'
const block = 'py-16 sm:py-24'

function formatUsd(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

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

function AckCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-base text-ink">
      <span
        className={cn(
          'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition',
          checked
            ? 'border-brand bg-brand text-white'
            : 'border-ink/45 bg-white text-transparent hover:border-brand',
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </span>
      <input
        id={id}
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="leading-relaxed">{label}</span>
    </label>
  )
}

function LegalFundPanel() {
  const progress = Math.min(100, (LCRE_LEGAL_FUND.raised / LCRE_LEGAL_FUND.goal) * 100)
  const [acks, setAcks] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const [processor, setProcessor] = useState<'Stripe' | 'Square' | null>(null)
  const formId = useId()

  const requiredOk = LCRE_ACKNOWLEDGEMENTS.filter((item) => item.required).every(
    (item) => acks[item.id],
  )

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!requiredOk || !processor) return
    setSubmitted(true)
  }

  return (
    <div>
      <div className="flex items-center gap-2.5">
        <Scale className="h-5 w-5 shrink-0 text-brand" />
        <SectionEyebrow>Legal &amp; Compliance</SectionEyebrow>
      </div>
      <SectionTitle>{LCRE_LEGAL_FUND.title}</SectionTitle>
      <p className="mt-5 text-base leading-relaxed text-muted">{LCRE_LEGAL_FUND.body}</p>

      <p className="mt-10 text-xs font-semibold uppercase tracking-[0.14em] text-ink">Important</p>
      <ul className="mt-4 space-y-3.5">
        {LCRE_LEGAL_FUND.important.map((item) => (
          <li key={item} className="flex gap-2.5 text-base leading-relaxed text-muted">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <p className="font-display text-xl font-semibold leading-relaxed text-ink sm:text-2xl">
            {formatUsd(LCRE_LEGAL_FUND.raised)}
            <span className="text-base font-medium text-muted">
              {' '}
              / {formatUsd(LCRE_LEGAL_FUND.goal)}
            </span>
          </p>
          <p className="text-sm font-medium text-muted">{progress.toFixed(0)}% raised</p>
        </div>
        <div
          className="mt-3 h-2.5 overflow-hidden rounded-full bg-mist"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label="Legal fund progress"
        >
          <div
            className="h-full rounded-full bg-brand transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-12 space-y-10">
        <div>
          <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
            Before You Donate, Please Acknowledge
          </h3>
          <div className="mt-5 space-y-4">
            {LCRE_ACKNOWLEDGEMENTS.map((item) => (
              <AckCheckbox
                key={item.id}
                id={`${formId}-${item.id}`}
                label={item.label}
                checked={Boolean(acks[item.id])}
                onChange={(value) => setAcks((current) => ({ ...current, [item.id]: value }))}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-base font-semibold text-ink">{LCRE_LEGAL_FUND.donateCta}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-6">
            {LCRE_LEGAL_FUND.processors.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setProcessor(name)}
                className={cn(
                  'w-fit border-b-2 pb-1 text-base font-semibold transition',
                  processor === name
                    ? 'border-brand text-brand-dark'
                    : 'border-transparent text-ink hover:text-brand',
                )}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {submitted ? (
          <p className="text-base leading-relaxed text-ink">
            Thank you. Your acknowledgement was recorded. Payment checkout via {processor} will
            connect once processors are wired.
          </p>
        ) : (
          <Button type="submit" size="lg" disabled={!requiredOk || !processor}>
            Submit &amp; Continue to Donate
          </Button>
        )}

        <p className="text-sm leading-relaxed text-muted">{LCRE_LEGAL_FUND.disclaimer}</p>
      </form>
    </div>
  )
}

function QaAccordion() {
  const [openId, setOpenId] = useState<string | null>(LCRE_QA[0]?.id ?? null)
  const panelId = useId()

  return (
    <div className="divide-y divide-line border-y border-line">
      {LCRE_QA.map((item) => {
        const open = openId === item.id
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={open}
              aria-controls={`${panelId}-${item.id}`}
              onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
              className="flex w-full items-start justify-between gap-3 py-6 text-left transition hover:text-brand"
            >
              <span>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                  {item.category}
                </span>
                <span className="mt-2 block text-base font-semibold leading-relaxed text-ink">
                  {item.question}
                </span>
              </span>
              <ChevronDown
                className={cn('mt-1 h-4 w-4 shrink-0 text-muted transition', open && 'rotate-180')}
                aria-hidden
              />
            </button>
            {open ? (
              <div
                id={`${panelId}-${item.id}`}
                className="pb-6 text-base leading-relaxed text-muted"
              >
                {item.answer}
              </div>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export function LcreCrowdfundingPage() {
  return (
    <div className="bg-paper pb-20 sm:pb-24">
      <Section className="pt-16 sm:pt-24 pb-16 sm:pb-20" containerClassName={shell}>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          {LCRE_HERO.eyebrow}
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {LCRE_HERO.brand}
        </h1>
        <p className="mt-4 font-display text-xl font-medium leading-relaxed text-ink-soft sm:text-2xl">
          {LCRE_HERO.tagline}
        </p>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{LCRE_HERO.lead}</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#legal-fund">
            <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              {LCRE_LEGAL_PREP.cta}
            </Button>
          </a>
          <a href="#interest-list">
            <Button size="lg" variant="outline">
              {LCRE_PHASE_ONE.cta}
            </Button>
          </a>
        </div>
        <p className="mt-10 border-l-2 border-accent pl-4 text-base leading-relaxed text-muted">
          {LCRE_SEC_NOTICE}
        </p>
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>Newsroom</SectionEyebrow>
        <SectionTitle>{LCRE_UPDATES.title}</SectionTitle>
        <p className="mt-5 text-base leading-relaxed text-muted">{LCRE_UPDATES.body}</p>
        <Button className="mt-8" variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
          {LCRE_UPDATES.cta}
        </Button>
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>Who we are</SectionEyebrow>
        <SectionTitle>{LCRE_ABOUT.title}</SectionTitle>
        <p className="mt-5 text-base leading-relaxed text-muted">{LCRE_ABOUT.body}</p>
        <ul className="mt-6 space-y-3">
          {LCRE_ABOUT.partners.map((partner) => (
            <li key={partner} className="text-base font-medium leading-relaxed text-ink">
              {partner}
            </li>
          ))}
        </ul>
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>Difference</SectionEyebrow>
        <SectionTitle>What Makes LCREC Different</SectionTitle>
        <div className="mt-10 space-y-10">
          {LCRE_DIFFERENTIATORS.map((item) => {
            const Icon = DIFF_ICONS[item.id as keyof typeof DIFF_ICONS]
            return (
              <article key={item.id}>
                <div className="flex items-center gap-2.5">
                  <Icon className="h-5 w-5 shrink-0 text-brand" />
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-3 text-base leading-relaxed text-muted">{item.text}</p>
              </article>
            )
          })}
        </div>
      </Section>

      <Section className={block} containerClassName={shell}>
        <div className="flex items-center gap-2.5">
          <Landmark className="h-5 w-5 shrink-0 text-brand" />
          <SectionTitle className="mt-0">{LCRE_LEGAL_PREP.title}</SectionTitle>
        </div>
        <p className="mt-5 text-base leading-relaxed text-muted">{LCRE_LEGAL_PREP.body}</p>
        <a href="#legal-fund" className="mt-8 inline-block">
          <Button size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
            {LCRE_LEGAL_PREP.cta}
          </Button>
        </a>
      </Section>

      <Section id="legal-fund" className={block} containerClassName={shell}>
        <LegalFundPanel />
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>Horizon</SectionEyebrow>
        <SectionTitle>{LCRE_LONG_TERM.title}</SectionTitle>
        <p className="mt-5 text-base leading-relaxed text-muted">{LCRE_LONG_TERM.body}</p>
        <p className="mt-5 text-base font-medium leading-relaxed text-ink">{LCRE_LONG_TERM.notice}</p>
      </Section>

      <Section id="interest-list" className={block} containerClassName={shell}>
        <SectionEyebrow>Phase I</SectionEyebrow>
        <SectionTitle>{LCRE_PHASE_ONE.title}</SectionTitle>
        <p className="mt-5 text-base leading-relaxed text-muted">{LCRE_PHASE_ONE.body}</p>
        <ul className="mt-6 space-y-3.5">
          {LCRE_PHASE_ONE.requirements.map((item) => (
            <li key={item} className="flex gap-2.5 text-base leading-relaxed text-ink">
              <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base leading-relaxed text-muted">{LCRE_PHASE_ONE.close}</p>
        <Button className="mt-8" size="lg" rightIcon={<Users className="h-4 w-4" />}>
          {LCRE_PHASE_ONE.cta}
        </Button>
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>After qualification</SectionEyebrow>
        <SectionTitle>{LCRE_BENEFITS.title}</SectionTitle>
        <div className="mt-8 overflow-x-auto">
          <table className="min-w-full text-left text-base leading-relaxed">
            <thead className="border-b border-line text-xs uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="py-3.5 pr-4 font-semibold">Benefit</th>
                <th className="py-3.5 pr-4 font-semibold">Accredited</th>
                <th className="py-3.5 font-semibold">Non-Accredited</th>
              </tr>
            </thead>
            <tbody>
              {LCRE_BENEFITS.rows.map((row) => (
                <tr key={row.benefit} className="border-b border-line/70">
                  <td className="py-4 pr-4 font-medium text-ink">{row.benefit}</td>
                  <td className="py-4 pr-4 text-brand">
                    {row.accredited ? <Check className="h-4 w-4" aria-label="Yes" /> : '—'}
                  </td>
                  <td className="py-4 text-brand">
                    {row.nonAccredited ? <Check className="h-4 w-4" aria-label="Yes" /> : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-6 text-sm leading-relaxed text-muted">{LCRE_BENEFITS.note}</p>
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>Community</SectionEyebrow>
        <SectionTitle>Recent Supporters</SectionTitle>
        <p className="mt-5 text-base leading-relaxed text-muted">
          Donor names displayed only with explicit consent.
        </p>
        <ul className="mt-8 space-y-6">
          {LCRE_SUPPORTERS.map((supporter) => (
            <li key={supporter.id} className="flex items-baseline justify-between gap-4">
              <div>
                <p className="text-base font-medium leading-relaxed text-ink">{supporter.name}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{supporter.when}</p>
              </div>
              <p className="text-base font-semibold tabular-nums text-brand">
                {formatUsd(supporter.amount)}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section className={block} containerClassName={shell}>
        <div className="flex items-center gap-2.5">
          <Handshake className="h-4 w-4 shrink-0 text-brand" />
          <SectionEyebrow>Leadership</SectionEyebrow>
        </div>
        <SectionTitle>{LCRE_BOARD.title}</SectionTitle>
        <p className="mt-5 text-base leading-relaxed text-muted">{LCRE_BOARD.body}</p>
        <Button className="mt-8" variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
          {LCRE_BOARD.cta}
        </Button>
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>Navigate</SectionEyebrow>
        <SectionTitle>{LCRE_INDEX.title}</SectionTitle>
        <ul className="mt-8 space-y-5">
          {LCRE_INDEX.items.map((item) => (
            <li key={item.id} className="leading-relaxed">
              {'href' in item && item.href ? (
                <Link to={item.href} className="text-base font-semibold text-ink transition hover:text-brand">
                  {item.label}
                </Link>
              ) : (
                <span className="text-base font-semibold text-ink">{item.label}</span>
              )}
              <span className="mt-1 block text-sm text-muted">{item.note}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>Community</SectionEyebrow>
        <SectionTitle>{LCRE_JOIN.title}</SectionTitle>
        <ul className="mt-8 space-y-4">
          {LCRE_JOIN.links.map((link) => (
            <li key={link.id}>
              <Link
                to={link.href}
                className="inline-flex items-center gap-2 text-base font-semibold leading-relaxed text-ink transition hover:text-brand"
              >
                <Compass className="h-4 w-4 text-brand" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>Help</SectionEyebrow>
        <SectionTitle>Questions &amp; Answers</SectionTitle>
        <div className="mt-8">
          <QaAccordion />
        </div>
      </Section>

      <Section className={block} containerClassName={shell}>
        <SectionEyebrow>Pipeline</SectionEyebrow>
        <SectionTitle>{LCRE_PROJECTS.title}</SectionTitle>
        <Link to={PATHS.crowdfunding} className="mt-8 inline-block">
          <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
            {LCRE_PROJECTS.browseCta}
          </Button>
        </Link>
        <div className="mt-10 overflow-x-auto">
          <table className="min-w-full text-left text-base leading-relaxed">
            <thead className="border-b border-line text-xs uppercase tracking-[0.12em] text-muted">
              <tr>
                <th className="py-3.5 pr-4 font-semibold">Project</th>
                <th className="py-3.5 pr-4 font-semibold">Location</th>
                <th className="py-3.5 pr-4 font-semibold">Type</th>
                <th className="py-3.5 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {LCRE_PROJECTS.items.map((item) => (
                <tr key={item.id} className="border-b border-line/70">
                  <td className="py-4 pr-4 font-medium text-ink">{item.project}</td>
                  <td className="py-4 pr-4 text-muted">{item.location}</td>
                  <td className="py-4 pr-4 text-muted">{item.type}</td>
                  <td className="py-4 text-ink">{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section className="border-t border-line pt-16 sm:pt-20 pb-4" containerClassName={shell}>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Fine Print</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">{LCRE_FINE_PRINT}</p>
      </Section>
    </div>
  )
}
