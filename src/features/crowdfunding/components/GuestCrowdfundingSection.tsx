import { Link } from 'react-router-dom'
import {
  type LucideIcon,
  ArrowRight,
  Building2,
  Check,
  Landmark,
  ShieldCheck,
  Target,
} from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import {
  GUEST_CROWDFUNDING_BENEFITS,
  GUEST_CROWDFUNDING_CTA,
  GUEST_CROWDFUNDING_DIFFERENTIATORS,
  GUEST_CROWDFUNDING_PLEDGE,
  GUEST_CROWDFUNDING_PLEDGE_IMAGE,
  GUEST_CROWDFUNDING_QA,
  GUEST_CROWDFUNDING_SEC_NOTICE,
  GUEST_CROWDFUNDING_SIDE_IMAGE,
  GUEST_CROWDFUNDING_STEPS,
  GUEST_CROWDFUNDING_VENUES,
} from '@/features/crowdfunding/data/guestCrowdfunding'
import type { CrowdfundingTeaserIcon } from '@/features/crowdfunding/data/crowdfundingTeaser'
import { cn } from '@/shared/lib/cn'

const STEP_ICONS: Record<CrowdfundingTeaserIcon, LucideIcon> = {
  Target,
  Landmark,
  Building2,
  ShieldCheck,
}

function SectionEyebrow({ children }: { children: string }) {
  return (
    <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-accent">
      <span className="h-px w-8 bg-accent" aria-hidden />
      {children}
    </p>
  )
}

export function GuestCrowdfundingSection() {
  const cta = GUEST_CROWDFUNDING_CTA

  return (
    <section id="guest-crowdfunding" className="w-full bg-white">
      {/* How it works */}
      <div className="border-t border-line bg-freeio-wash">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" y={36}>
            <SectionEyebrow>How It Works</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Invest with purpose. Build legacy.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              From interest list to compliant offerings — signal demand, track legal
              progress, and back venues designed for community impact.
            </p>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {GUEST_CROWDFUNDING_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[step.icon]
              return (
                <ScrollReveal
                  key={step.title}
                  delay={Math.min(index, 4) * 80}
                  y={28}
                  className="h-full"
                >
                  <article className="h-full border border-line bg-white px-4 py-5 sm:px-5 sm:py-6">
                    <span className="inline-flex h-11 w-11 items-center justify-center bg-accent text-ink">
                      <Icon className="h-5 w-5" strokeWidth={2.5} />
                    </span>
                    <h4 className="mt-4 font-display text-lg font-semibold tracking-tight text-ink">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                  </article>
                </ScrollReveal>
              )
            })}
          </div>
        </div>
      </div>

      {/* Venues */}
      <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ScrollReveal className="mb-8 max-w-2xl sm:mb-10" y={36}>
          <SectionEyebrow>Recreational Venues</SectionEyebrow>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            Projects the community can shape
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            Faith-aligned recreation and entertainment spaces — bowling, splash pads,
            sports complexes, and more.
          </p>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {GUEST_CROWDFUNDING_VENUES.map((venue, index) => (
            <ScrollReveal
              key={venue.id}
              delay={Math.min(index, 5) * 100}
              y={48}
              className="h-full"
            >
              <article className="hire-benefit-card group h-full border border-line bg-white shadow-[0_12px_40px_rgba(11,31,58,0.06)]">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={venue.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="hire-benefit-card__media h-full w-full object-cover"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-freeio-navy/35 via-transparent to-transparent"
                  />
                </div>
                <div className="relative space-y-2 px-5 pb-6 pt-5">
                  <h4 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {venue.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted">{venue.text}</p>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    {venue.location}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Pledge */}
      <div className="bg-freeio-navy">
        <div className="mx-auto grid w-full max-w-[90rem] gap-0 lg:grid-cols-2">
          <ScrollReveal
            variant="left"
            y={48}
            className="relative min-h-[22rem] overflow-hidden lg:min-h-full"
          >
            <img
              src={GUEST_CROWDFUNDING_PLEDGE_IMAGE}
              alt=""
              className="hire-panel-card__media absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-freeio-navy via-freeio-navy/45 to-transparent"
            />
            <div className="relative z-[1] flex h-full min-h-[22rem] items-end p-6 sm:p-8">
              <div>
                <SectionEyebrow>Until SEC Approval</SectionEyebrow>
                <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Join the pledge &amp; interest list
                </h3>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal
            variant="right"
            delay={160}
            y={48}
            className="flex flex-col justify-center px-4 py-12 sm:px-8 sm:py-16 lg:px-12"
          >
            <p className="text-sm leading-relaxed text-white/80 sm:text-base">
              {GUEST_CROWDFUNDING_PLEDGE.lead}
            </p>
            <p className="mt-6 text-sm font-semibold tracking-wide text-accent sm:text-base">
              {GUEST_CROWDFUNDING_PLEDGE.untilApproval}
            </p>
            <div className="mt-5">
              <ul className="space-y-3">
                {GUEST_CROWDFUNDING_PLEDGE.bullets.map((item, index) => (
                  <ScrollReveal key={item} delay={index * 80} y={20}>
                    <li className="flex items-start gap-3 text-sm leading-snug text-white/90 sm:text-base">
                      <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-white/55">
              {GUEST_CROWDFUNDING_PLEDGE.disclaimer}
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Differentiators */}
      <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" y={36}>
          <SectionEyebrow>Why We&apos;re Different</SectionEyebrow>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            Unique if SEC-approved
          </h3>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {GUEST_CROWDFUNDING_DIFFERENTIATORS.map((item, index) => (
            <ScrollReveal
              key={item.id}
              delay={Math.min(index, 8) * 60}
              y={28}
              className="h-full"
            >
              <div className="h-full border border-line bg-white px-4 py-4 sm:px-5 sm:py-5">
                <p className="text-sm font-semibold text-ink sm:text-base">{item.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-freeio-wash">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <ScrollReveal className="mb-8 max-w-2xl sm:mb-10" y={36}>
            <SectionEyebrow>Benefits</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Who crowdfunding serves
            </h3>
          </ScrollReveal>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {GUEST_CROWDFUNDING_BENEFITS.map((audience, index) => (
              <ScrollReveal
                key={audience.id}
                delay={Math.min(index, 5) * 100}
                y={40}
                className="h-full"
              >
                <article className="flex h-full flex-col border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-6">
                  <h4 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {audience.title}
                  </h4>
                  <ul className="mt-4 flex-1 space-y-2.5">
                    {audience.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Q&A */}
      <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <ScrollReveal className="mb-8 max-w-2xl sm:mb-10" y={36}>
          <SectionEyebrow>Questions &amp; Answers</SectionEyebrow>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            Common questions from visitors
          </h3>
        </ScrollReveal>

        <div className="grid gap-4 lg:grid-cols-2">
          {GUEST_CROWDFUNDING_QA.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 80} y={32} className="h-full">
              <article className="h-full border border-line bg-white px-5 py-5 sm:px-6 sm:py-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
                  {item.label}
                </p>
                <h4 className="mt-3 font-display text-lg font-semibold tracking-tight text-ink">
                  {item.question}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
                {item.whyItMatters ? (
                  <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                    <span className="font-semibold text-ink">Why this matters:</span>{' '}
                    {item.whyItMatters}
                  </p>
                ) : null}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Get involved cross-links */}
      <div className="border-t border-line bg-freeio-wash">
        <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <ScrollReveal className="mb-8 max-w-3xl sm:mb-10" y={36}>
            <SectionEyebrow>Jesus Network Ventures LLC</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Related real estate endeavors
            </h3>
          </ScrollReveal>

          <div className="grid gap-5 lg:grid-cols-2">
            <ScrollReveal y={40} className="h-full">
              <article className="flex h-full flex-col border border-line bg-white p-5 shadow-[0_12px_40px_rgba(11,31,58,0.06)] sm:p-7">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Get involved
                </p>
                <h4 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                  1. Hire Professionals
                </h4>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                  Filter through verified Property Service Providers by representation,
                  condition, experience, and location.
                </p>
                <Link
                  to={PATHS.hire}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-freeio-navy transition hover:text-brand"
                >
                  Open hire
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
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">
                  Join exchanged conversations across articles, forums, and community
                  updates from tradesmen, investors, and customers.
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
            <SectionEyebrow>{cta.eyebrow}</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              {cta.title}
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              {cta.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to={cta.primaryHref}
                className="inline-flex items-center bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink transition hover:-translate-y-0.5 hover:shadow-soft"
              >
                {cta.primaryLabel}
              </Link>
              <Link
                to={cta.secondaryHref}
                className="inline-flex items-center border border-freeio-navy px-5 py-3 text-sm font-bold uppercase tracking-wide text-freeio-navy transition hover:-translate-y-0.5 hover:bg-freeio-navy hover:text-white"
              >
                {cta.secondaryLabel}
              </Link>
            </div>
            <Link
              to={cta.signInHref}
              className="mt-5 inline-flex text-sm font-semibold text-freeio-navy underline underline-offset-4 transition hover:text-brand"
            >
              {cta.signInLabel}
            </Link>
            <p className="mt-6 max-w-xl border-l-4 border-accent pl-4 text-xs leading-relaxed text-muted sm:text-sm">
              {GUEST_CROWDFUNDING_SEC_NOTICE}
            </p>
          </ScrollReveal>
          <ScrollReveal
            variant="scale"
            delay={200}
            className="relative min-h-[16rem] overflow-hidden lg:min-h-full"
          >
            <img
              src={GUEST_CROWDFUNDING_SIDE_IMAGE}
              alt="Recreational crowdfunding venue"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition duration-700 hover:scale-[1.03]"
            />
            <div
              aria-hidden
              className={cn('absolute inset-0 bg-freeio-navy/20')}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
