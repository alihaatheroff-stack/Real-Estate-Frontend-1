import { Link } from 'react-router-dom'
import {
  type LucideIcon,
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Compass,
  MapPinned,
  MessageSquareWarning,
  Ruler,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import {
  CLIENT_HIRE_AWARDS,
  CLIENT_HIRE_BENEFITS,
  CLIENT_HIRE_CRITERIA,
  CLIENT_HIRE_GAP_SUGGESTIONS,
  CLIENT_HIRE_MEASURE,
  CLIENT_HIRE_NETWORK_CHANNELS,
  CLIENT_HIRE_NETWORK_LINKS,
  CLIENT_HIRE_PENDING_ITEMS,
  CLIENT_HIRE_PAYMENT_IMAGE,
  CLIENT_HIRE_SIDE_IMAGE,
  CLIENT_HIRE_TAGLINE,
  CLIENT_HIRE_VERIFIED_IMAGE,
  CLIENT_PAYMENT_SAVINGS,
  CLIENT_PAYMENT_TERMS,
  CLIENT_PAYMENT_TIERS,
  CLIENT_TRUST_POINTS,
} from '@/features/landing/data/clientHire'
import { cn } from '@/shared/lib/cn'

const BENEFIT_ICONS: LucideIcon[] = [
  MapPinned,
  Clock3,
  Compass,
  WalletCards,
  ShieldCheck,
]

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-accent">
      <span className="h-px w-8 bg-accent" aria-hidden />
      {children}
    </p>
  )
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <ScrollReveal key={item} delay={index * 80} y={24}>
          <li className="flex items-start gap-3 text-sm leading-snug text-ink sm:text-base">
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
            <span>{item}</span>
          </li>
        </ScrollReveal>
      ))}
    </ul>
  )
}

function ChipList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="border border-line bg-white px-3 py-2 text-sm font-medium text-ink"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ClientHireSection() {
  return (
    <section id="client-hire" className="w-full bg-white">
      {/* Hire criteria */}
      <div className="border-t border-line bg-freeio-wash">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" y={36}>
            <SectionEyebrow>Match Criteria</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Features that shape your hire
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              Filter through representation, condition, title, experience, payment,
              demography, zipcode, and mile radius to find the right PSP.
            </p>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {CLIENT_HIRE_CRITERIA.map((criterion, index) => (
              <ScrollReveal
                key={criterion.label}
                delay={Math.min(index, 8) * 60}
                y={28}
                className="h-full"
              >
                <div className="h-full border border-line bg-white px-4 py-4 sm:px-5 sm:py-5">
                  <p className="text-sm font-semibold text-ink sm:text-base">
                    {criterion.label}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">
                    {criterion.example}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Service features */}
      <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ScrollReveal className="mb-8 max-w-2xl sm:mb-10" y={36}>
          <SectionEyebrow>Service Features</SectionEyebrow>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            What we offer clients
          </h3>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {CLIENT_HIRE_BENEFITS.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index] ?? Sparkles
            return (
              <ScrollReveal
                key={benefit.title}
                delay={Math.min(index, 5) * 120}
                y={48}
                className="h-full"
              >
                <article className="hire-benefit-card group h-full border border-line bg-white shadow-[0_12px_40px_rgba(11,31,58,0.06)]">
                  <div className="relative aspect-[16/11] overflow-hidden">
                    <img
                      src={benefit.image}
                      alt=""
                      className="hire-benefit-card__media h-full w-full object-cover"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-freeio-navy/55 via-transparent to-transparent"
                    />
                  </div>
                  <div className="relative space-y-2 px-5 pb-6 pt-8">
                    <span className="absolute -top-7 left-5 z-[2] inline-flex h-14 w-14 items-center justify-center border-4 border-white bg-accent text-ink shadow-[0_8px_24px_rgba(11,31,58,0.22)] transition duration-300 group-hover:scale-105">
                      <Icon className="h-7 w-7" strokeWidth={2.5} aria-hidden />
                    </span>
                    <h4 className="font-display text-lg font-semibold tracking-tight text-ink">
                      {benefit.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            )
          })}
        </div>
      </div>

      {/* Measure */}
      <div className="bg-freeio-navy">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <ScrollReveal className="mb-8 max-w-2xl" y={36}>
            <SectionEyebrow>Measure</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              Out-doors & in-doors
            </h3>
          </ScrollReveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {CLIENT_HIRE_MEASURE.map((item, index) => (
              <ScrollReveal
                key={item.title}
                delay={index * 140}
                variant="scale"
                className="h-full"
              >
                <article className="hire-panel-card relative min-h-[16rem] overflow-hidden sm:min-h-[18rem]">
                  <img
                    src={item.image}
                    alt=""
                    className="hire-panel-card__media absolute inset-0 h-full w-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-freeio-navy via-freeio-navy/50 to-transparent"
                  />
                  <div className="relative z-[1] flex h-full min-h-[16rem] items-end p-5 sm:min-h-[18rem] sm:p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center bg-accent text-ink">
                        <Ruler className="h-5 w-5" strokeWidth={2.5} />
                      </span>
                      <h4 className="font-display text-xl font-semibold text-white sm:text-2xl">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Payment packets */}
      <div className="mx-auto grid w-full max-w-[90rem] gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 lg:px-8">
        <ScrollReveal variant="left" y={40} className="relative min-h-[20rem] overflow-hidden">
          <img
            src={CLIENT_HIRE_PAYMENT_IMAGE}
            alt="Payment packets and savings plans"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-freeio-navy/80 via-freeio-navy/35 to-transparent"
          />
          <div className="relative z-[1] flex h-full min-h-[20rem] flex-col justify-end p-6">
            <SectionEyebrow>Payment Packets</SectionEyebrow>
            <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Savings, tiers & terms
            </h3>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="right" delay={120} y={40} className="space-y-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Savings
            </p>
            <div className="mt-3">
              <ChipList items={CLIENT_PAYMENT_SAVINGS} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Tier Selection
            </p>
            <div className="mt-3">
              <ChipList items={CLIENT_PAYMENT_TIERS} />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
              Payment Terms
            </p>
            <div className="mt-3">
              <ChipList items={CLIENT_PAYMENT_TERMS} />
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Verified & trusted */}
      <div className="bg-freeio-wash">
        <div className="mx-auto grid w-full max-w-[90rem] gap-0 lg:grid-cols-2">
          <ScrollReveal
            variant="left"
            y={48}
            className="relative min-h-[22rem] overflow-hidden lg:min-h-full"
          >
            <img
              src={CLIENT_HIRE_VERIFIED_IMAGE}
              alt="Verified professional meeting a client"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-freeio-navy/25 mix-blend-multiply"
            />
            <div className="absolute bottom-6 left-6 right-6 border-l-4 border-accent bg-white/95 px-5 py-4 shadow-soft backdrop-blur-sm sm:max-w-sm">
              <p className="font-display text-2xl font-semibold tracking-tight text-ink">
                Verified
              </p>
              <p className="text-sm font-medium uppercase tracking-wide text-muted">
                Check for the LCRE verification mark
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal
            variant="right"
            delay={200}
            y={48}
            className="flex flex-col justify-center px-4 py-12 sm:px-8 sm:py-16 lg:px-12"
          >
            <SectionEyebrow>Why Choose Us</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Verified & trusted professionals
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              To verify your provider went through LCRE&apos;s rigorous verification
              process and background checks, ensuring right quality and reliability.
            </p>
            <div className="mt-8">
              <FeatureList items={CLIENT_TRUST_POINTS} />
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Other JN ventures + network */}
      <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" y={36}>
          <SectionEyebrow>Jesus Network Ventures LLC</SectionEyebrow>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            Other endeavors related to real estate
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Are you a property service provider?{' '}
            <Link
              to={PATHS.registerPsp}
              className="font-semibold text-freeio-navy underline underline-offset-4 transition hover:text-brand"
            >
              Register as one here
            </Link>
            .
          </p>
        </ScrollReveal>

        <div className="grid gap-5 lg:grid-cols-2">
          <ScrollReveal y={40} className="h-full">
            <article className="flex h-full flex-col border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Get involved
              </p>
              <h4 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                2. Crowdfunding Real Estate
              </h4>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                Get involved in LCRE&apos;s other real estate initiatives through
                crowdfunding venues, votes, and project boards.
              </p>
              <Link
                to={PATHS.crowdfunding}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-freeio-navy transition hover:text-brand"
              >
                Explore crowdfunding
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={120} y={40} className="h-full">
            <article className="flex h-full flex-col border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Get involved
              </p>
              <h4 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                3. Network
              </h4>
              <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                Anonymously if choose to join the exchanged conversations. Post and
                comment through:
              </p>
              <ul className="mt-4 space-y-1.5 text-sm font-medium text-ink">
                {CLIENT_HIRE_NETWORK_CHANNELS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      aria-hidden
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Get more real estate educated. Stay current with posts and activity
                from tradesmen, investor&apos;s, professional&apos;s, and
                customer&apos;s across the network.
              </p>
              <Link
                to={PATHS.network}
                className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-freeio-navy transition hover:text-brand"
              >
                Open network
                <ArrowRight className="h-4 w-4" />
              </Link>
            </article>
          </ScrollReveal>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {CLIENT_HIRE_NETWORK_LINKS.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 90} y={32} className="h-full">
              <Link
                to={item.href}
                className="group flex h-full flex-col border border-line bg-freeio-wash px-4 py-5 transition hover:border-accent hover:bg-white"
              >
                <h5 className="font-display text-lg font-semibold tracking-tight text-ink">
                  {item.title}
                </h5>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-freeio-navy transition group-hover:text-brand">
                  Open
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Awards */}
      <div className="bg-freeio-navy">
        <div className="mx-auto max-w-[90rem] px-4 py-8 sm:px-6 lg:px-8">
          <ScrollReveal y={28}>
            <p className="max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
              JN&apos;s vetted network of top-rated real estate professionals ready to
              help you succeed — pre-vetted experts with tracked performance metrics.
              Earn rewards and get trained as you refer.
            </p>
          </ScrollReveal>
        </div>
        <div className="mx-auto grid w-full max-w-[90rem] gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENT_HIRE_AWARDS.map((award, index) => (
            <ScrollReveal key={award.title} delay={index * 120} y={36} className="h-full">
              <article className="hire-award-tile h-full bg-freeio-navy px-6 py-8 text-center hover:bg-freeio-navy/80">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 text-accent transition duration-300 hover:scale-110">
                  <BadgeCheck className="h-5 w-5" />
                </div>
                <p className="font-display text-base font-semibold leading-snug text-white">
                  {award.title}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  {award.subtitle}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Closing CTA */}
      <div className="border-t border-line bg-white">
        <div className="mx-auto grid w-full max-w-[90rem] lg:grid-cols-[1.1fr_0.9fr]">
          <ScrollReveal
            variant="left"
            y={40}
            className="flex flex-col justify-center px-4 py-10 sm:px-8 sm:py-14 lg:px-12"
          >
            <SectionEyebrow>Ready to Hire</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Start with industry experts
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {CLIENT_HIRE_TAGLINE}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={PATHS.results}
                className="inline-flex items-center bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                Hire a Professional
              </Link>
              <Link
                to={PATHS.profileResults}
                className="inline-flex items-center border border-freeio-navy px-5 py-3 text-sm font-bold uppercase tracking-wide text-freeio-navy transition hover:-translate-y-0.5 hover:bg-freeio-navy hover:text-white"
              >
                Compare Providers
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal
            variant="scale"
            delay={200}
            className="relative min-h-[16rem] overflow-hidden lg:min-h-full"
          >
            <img
              src={CLIENT_HIRE_SIDE_IMAGE}
              alt="Construction project in progress"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-105"
            />
            <div
              aria-hidden
              className={cn('absolute inset-0 bg-freeio-navy/20')}
            />
          </ScrollReveal>
        </div>
      </div>

      {/* Pending message box */}
      <div className="border-t border-line bg-freeio-wash">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <ScrollReveal y={36}>
            <div className="border border-dashed border-freeio-navy/30 bg-white px-5 py-6 sm:px-7 sm:py-8">
              <div className="flex flex-wrap items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center bg-accent text-ink">
                  <MessageSquareWarning className="h-5 w-5" strokeWidth={2.5} />
                </span>
                <div className="min-w-0 flex-1">
                  <SectionEyebrow>Message Box</SectionEyebrow>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                    Suggest whether we&apos;re missing anything
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                    Open questions and suggested gaps still pending for the hire
                    experience.
                  </p>
                </div>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                    Still pending
                  </p>
                  <ul className="mt-4 space-y-4">
                    {CLIENT_HIRE_PENDING_ITEMS.map((item) => (
                      <li key={item.title}>
                        <p className="text-sm font-semibold text-ink sm:text-base">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted">
                          {item.detail}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                    Suggested gaps
                  </p>
                  <ul className="mt-4 space-y-3">
                    {CLIENT_HIRE_GAP_SUGGESTIONS.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink sm:text-base"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
