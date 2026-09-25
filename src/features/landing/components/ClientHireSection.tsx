import type { ComponentType } from 'react'
import {
  ArrowRight,
  BadgeCheck,
  Check,
  Clock3,
  Compass,
  MapPinned,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from 'lucide-react'
import {
  CLIENT_EDUCATION_LINKS,
  CLIENT_HIRE_AWARDS,
  CLIENT_HIRE_BENEFITS,
  CLIENT_HIRE_EDUCATION_IMAGE,
  CLIENT_HIRE_HERO_IMAGE,
  CLIENT_HIRE_PAYMENT_IMAGE,
  CLIENT_HIRE_SIDE_IMAGE,
  CLIENT_HIRE_TOOLS_IMAGE,
  CLIENT_HIRE_VERIFIED_IMAGE,
  CLIENT_PAYMENT_META,
  CLIENT_PAYMENT_PACKETS,
  CLIENT_REAL_ESTATE_TOOLS,
  CLIENT_TRUST_POINTS,
} from '@/features/landing/data/clientHire'
import { cn } from '@/shared/lib/cn'

const BENEFIT_ICONS: ComponentType<{ className?: string }>[] = [
  ShieldCheck,
  BadgeCheck,
  MapPinned,
  Compass,
  Clock3,
  WalletCards,
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
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-snug text-ink sm:text-base">
          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-ink">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function LinkRail({ items }: { items: readonly string[] }) {
  return (
    <ul className="divide-y divide-white/15 border border-white/15 bg-black/25">
      {items.map((item) => (
        <li key={item}>
          <button
            type="button"
            className="group flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent hover:text-ink"
          >
            <span>{item}</span>
            <ArrowRight className="h-4 w-4 shrink-0 opacity-70 transition group-hover:translate-x-0.5 group-hover:opacity-100" />
          </button>
        </li>
      ))}
    </ul>
  )
}

export function ClientHireSection() {
  return (
    <section id="client-hire" className="w-full bg-white">
      {/* Elevate-style full-bleed intro band */}
      <div className="relative isolate min-h-[22rem] overflow-hidden sm:min-h-[26rem]">
        <img
          src={CLIENT_HIRE_HERO_IMAGE}
          alt="Trades professional at work on a residential project"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-freeio-navy via-freeio-navy/88 to-freeio-navy/45"
        />
        <div className="relative z-[1] mx-auto flex min-h-[22rem] w-full max-w-[90rem] flex-col justify-end px-4 py-10 sm:min-h-[26rem] sm:px-6 sm:py-14 lg:px-8">
          <SectionEyebrow>Hire</SectionEyebrow>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
            From Tradesmen to Professionals
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Quality work and comparative pricing — hire verified providers with escrow
            protection, GPS matching, and clear upfront costs.
          </p>
        </div>
      </div>

      {/* What we offer — image service cards */}
      <div className="mx-auto w-full max-w-[90rem] px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <SectionEyebrow>Service Features</SectionEyebrow>
          <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
            What We Offer Clients
          </h3>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {CLIENT_HIRE_BENEFITS.map((benefit, index) => {
            const Icon = BENEFIT_ICONS[index] ?? Sparkles
            return (
              <article
                key={benefit.title}
                className="group border border-line bg-white shadow-[0_12px_40px_rgba(11,31,58,0.06)] transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(11,31,58,0.12)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={benefit.image}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-freeio-navy/55 via-transparent to-transparent"
                  />
                </div>
                <div className="relative space-y-2 px-5 pb-6 pt-8">
                  <span className="absolute -top-7 left-5 z-[2] inline-flex h-14 w-14 items-center justify-center border-4 border-white bg-accent text-ink shadow-[0_8px_24px_rgba(11,31,58,0.22)]">
                    <Icon className="h-7 w-7" strokeWidth={2.5} aria-hidden />
                  </span>
                  <h4 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {benefit.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-muted">{benefit.description}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {/* Why choose us — split image + checklist */}
      <div className="bg-freeio-wash">
        <div className="mx-auto grid w-full max-w-[90rem] gap-0 lg:grid-cols-2">
          <div className="relative min-h-[22rem] overflow-hidden lg:min-h-full">
            <img
              src={CLIENT_HIRE_VERIFIED_IMAGE}
              alt="Verified professional meeting a client"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-freeio-navy/25 mix-blend-multiply"
            />
            <div className="absolute bottom-6 left-6 right-6 border-l-4 border-accent bg-white/95 px-5 py-4 shadow-soft backdrop-blur-sm sm:max-w-sm">
              <p className="font-display text-2xl font-semibold tracking-tight text-ink">25+</p>
              <p className="text-sm font-medium uppercase tracking-wide text-muted">
                Verified service categories
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-4 py-12 sm:px-8 sm:py-16 lg:px-12">
            <SectionEyebrow>Why Choose Us</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Verified & Trusted
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              All our professionals go through a rigorous verification process to ensure
              quality and reliability — so you can hire tradesmen through professionals
              with confidence.
            </p>
            <div className="mt-8">
              <FeatureList items={CLIENT_TRUST_POINTS} />
            </div>
          </div>
        </div>
      </div>

      {/* Awards strip */}
      <div className="bg-freeio-navy">
        <div className="mx-auto grid w-full max-w-[90rem] gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {CLIENT_HIRE_AWARDS.map((award) => (
            <article
              key={award.title}
              className="bg-freeio-navy px-6 py-8 text-center transition hover:bg-freeio-navy/80"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-accent/50 text-accent">
                <BadgeCheck className="h-5 w-5" />
              </div>
              <p className="font-display text-base font-semibold leading-snug text-white">
                {award.title}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                {award.subtitle}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Education / Tools / Payment — image panels */}
      <div className="mx-auto grid w-full max-w-[90rem] gap-5 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-3 lg:px-8">
        {[
          {
            title: 'Get More Real Estate Educated',
            subtitle: 'Join the exchanged conversations',
            image: CLIENT_HIRE_EDUCATION_IMAGE,
            items: CLIENT_EDUCATION_LINKS,
          },
          {
            title: 'Real Estate Tools',
            subtitle: 'Measure indoors and outdoors',
            image: CLIENT_HIRE_TOOLS_IMAGE,
            items: CLIENT_REAL_ESTATE_TOOLS,
          },
          {
            title: 'Payment Packets',
            subtitle: 'Savings cadence & plan details',
            image: CLIENT_HIRE_PAYMENT_IMAGE,
            items: [...CLIENT_PAYMENT_PACKETS, ...CLIENT_PAYMENT_META],
          },
        ].map((panel) => (
          <article key={panel.title} className="relative min-h-[22rem] overflow-hidden">
            <img
              src={panel.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-freeio-navy via-freeio-navy/75 to-freeio-navy/35"
            />
            <div className="relative z-[1] flex h-full min-h-[22rem] flex-col justify-end p-5 sm:p-6">
              <SectionEyebrow>Explore</SectionEyebrow>
              <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {panel.title}
              </h3>
              <p className="mt-1 text-sm text-white/70">{panel.subtitle}</p>
              <div className="mt-5">
                <LinkRail items={panel.items} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Bottom CTA strip with side image */}
      <div className="border-t border-line bg-white">
        <div className="mx-auto grid w-full max-w-[90rem] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="flex flex-col justify-center px-4 py-10 sm:px-8 sm:py-14 lg:px-12">
            <SectionEyebrow>Ready to Hire</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
              Start your journey with industry experts
            </h3>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              From first match to final handover — protected payments, verified talent,
              and transparent pricing built for property clients.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <span className="inline-flex items-center bg-accent px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink">
                Hire a Professional
              </span>
              <span className="inline-flex items-center border border-freeio-navy px-5 py-3 text-sm font-bold uppercase tracking-wide text-freeio-navy">
                Compare Providers
              </span>
            </div>
          </div>
          <div className="relative min-h-[16rem] overflow-hidden lg:min-h-full">
            <img
              src={CLIENT_HIRE_SIDE_IMAGE}
              alt="Construction project in progress"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div
              aria-hidden
              className={cn('absolute inset-0 bg-freeio-navy/20')}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
