import { useEffect, useRef, useState, type ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Compass,
  FileText,
  Heart,
  RefreshCw,
  Sparkles,
} from 'lucide-react'
import { Container } from '@/components/layout/Container'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import {
  HOME_ACTION_CARDS,
  HOME_PROVIDER_STRIPS,
  HOME_QUICK_LINKS,
  HOME_SERVICE_STRIPS,
  LOGGED_IN_MEMBER,
  PICKUP_TABS,
  type PickupTabId,
} from '@/features/landing/data/loggedInHome'
import {
  getLoggedInReferralProviders,
  getLoggedInReferralServices,
  LOGGED_IN_REFERRAL_STRIPS,
} from '@/features/landing/data/loggedInReferralProfiles'
import { ProviderCard, ServiceCard } from '@/features/referrals'
import type { Provider, Service } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

const PICKUP_ICONS: Record<PickupTabId, ComponentType<{ className?: string }>> = {
  'keep-exploring': Compass,
  'buy-again': RefreshCw,
  saved: Heart,
  recommendations: Sparkles,
}

function WelcomeActionCards() {
  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2 md:gap-4">
      {HOME_ACTION_CARDS.map((card, index) => (
        <ScrollReveal key={card.id} delay={80 + index * 70} y={18} variant="up">
          {card.kind === 'cta' ? (
            <article className="logged-in-action-card group flex h-full flex-col justify-between gap-3 rounded-2xl border border-freeio-border-soft bg-white/95 p-4 shadow-[0_6px_22px_rgba(15,31,26,0.05)] sm:flex-row sm:items-center sm:gap-5 sm:p-4">
              <div className="flex min-w-0 gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-freeio-soft text-freeio">
                  <FileText className="h-4 w-4" strokeWidth={2.1} />
                </span>
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted">
                    {card.eyebrow}
                  </p>
                  <h2 className="mt-0.5 font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
                    {card.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted">
                    {card.description}
                  </p>
                </div>
              </div>
              <Link
                to={card.href}
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 sm:self-center"
              >
                {card.ctaLabel}
              </Link>
            </article>
          ) : (
            <article className="logged-in-action-card group flex h-full flex-col justify-between gap-3 rounded-2xl border border-freeio-border-soft bg-white/95 p-4 shadow-[0_6px_22px_rgba(15,31,26,0.05)] sm:flex-row sm:items-center sm:gap-5 sm:p-4">
              <div className="flex min-w-0 gap-3">
                <img
                  src={card.avatarSrc}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white shadow-sm"
                />
                <div className="min-w-0">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-muted">
                    {card.eyebrow}
                  </p>
                  <h2 className="mt-0.5 font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
                    Reply to {card.senderHandle}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm leading-snug text-muted">
                    <span className="font-semibold text-ink-soft">{card.senderName}: </span>
                    {card.preview}
                  </p>
                </div>
              </div>
              <Link
                to={card.href}
                className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-line bg-paper/80 px-4 text-sm font-semibold text-ink transition hover:border-brand hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 sm:self-center"
              >
                {card.ctaLabel}
              </Link>
            </article>
          )}
        </ScrollReveal>
      ))}
    </div>
  )
}

function ServiceRowCarousel({
  services,
  initiallySaved,
}: {
  services: Service[]
  initiallySaved?: boolean
}) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  function updateScrollState() {
    const el = scrollerRef.current
    if (!el) {
      setCanScrollPrev(false)
      setCanScrollNext(false)
      return
    }
    setCanScrollPrev(el.scrollLeft > 8)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => updateScrollState()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [services.length])

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-pickup-card]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.72
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className="relative min-w-0 flex-1">
      <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous services"
          disabled={!canScrollPrev}
          onClick={() => scrollByCard(-1)}
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink transition',
            canScrollPrev
              ? 'hover:border-brand/35 hover:text-brand'
              : 'cursor-not-allowed opacity-35',
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next services"
          disabled={!canScrollNext}
          onClick={() => scrollByCard(1)}
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink transition',
            canScrollNext
              ? 'hover:border-brand/35 hover:text-brand'
              : 'cursor-not-allowed opacity-35',
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            data-pickup-card
            className="logged-in-gig-card w-[min(70vw,14.75rem)] shrink-0 sm:w-[14.25rem] lg:w-[14.75rem]"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <ServiceCard
              service={service}
              variant="gig"
              initiallySaved={initiallySaved}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function PickupWhereLeftOff() {
  const [activeTab, setActiveTab] = useState<PickupTabId>('keep-exploring')
  const active = PICKUP_TABS.find((tab) => tab.id === activeTab) ?? PICKUP_TABS[0]
  const strip =
    LOGGED_IN_REFERRAL_STRIPS.find((item) => item.id === active.stripId) ??
    LOGGED_IN_REFERRAL_STRIPS[0]
  const services = getLoggedInReferralServices(strip.serviceIds ?? [])

  return (
    <section className="border-t border-freeio-border-soft bg-white pt-6 pb-4 sm:pt-8 sm:pb-5">
      <Container>
        <ScrollReveal y={16}>
          <h2 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            Pick up where you left off
          </h2>
        </ScrollReveal>

        <div className="relative mt-5 flex flex-col gap-5 lg:flex-row lg:gap-6">
          <nav
            aria-label="Activity shortcuts"
            className="flex shrink-0 gap-2 overflow-x-auto pb-1 lg:w-48 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {PICKUP_TABS.map((tab) => {
              const Icon = PICKUP_ICONS[tab.id]
              const selected = tab.id === activeTab
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'inline-flex shrink-0 items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold transition',
                    selected
                      ? 'bg-mist text-ink shadow-[inset_0_0_0_1px_rgb(213_221_216_/_0.9)]'
                      : 'text-muted hover:bg-mist/70 hover:text-ink',
                  )}
                >
                  <Icon className={cn('h-4 w-4', selected ? 'text-freeio' : 'text-muted')} />
                  {tab.label}
                </button>
              )
            })}
          </nav>

          <ServiceRowCarousel
            key={activeTab}
            services={services}
            initiallySaved={active.initiallySaved}
          />
        </div>
      </Container>
    </section>
  )
}

function ProviderRowCarousel({ providers }: { providers: Provider[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  function updateScrollState() {
    const el = scrollerRef.current
    if (!el) {
      setCanScrollPrev(false)
      setCanScrollNext(false)
      return
    }
    setCanScrollPrev(el.scrollLeft > 8)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollerRef.current
    if (!el) return
    const onScroll = () => updateScrollState()
    el.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [providers.length])

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-provider-card]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.72
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <div className="relative min-w-0 flex-1">
      <div className="mb-3 flex justify-end gap-2">
        <button
          type="button"
          aria-label="Previous providers"
          disabled={!canScrollPrev}
          onClick={() => scrollByCard(-1)}
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink transition',
            canScrollPrev
              ? 'hover:border-brand/35 hover:text-brand'
              : 'cursor-not-allowed opacity-35',
          )}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next providers"
          disabled={!canScrollNext}
          onClick={() => scrollByCard(1)}
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white text-ink transition',
            canScrollNext
              ? 'hover:border-brand/35 hover:text-brand'
              : 'cursor-not-allowed opacity-35',
          )}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
      >
        {providers.map((provider, index) => (
          <div
            key={provider.id}
            data-provider-card
            className="logged-in-gig-card w-[min(72vw,16rem)] shrink-0 sm:w-[15.5rem] lg:w-[16rem]"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <ProviderCard provider={provider} variant="marketplace" />
          </div>
        ))}
      </div>
    </div>
  )
}

function HomeServiceStrips() {
  type BuyerRow =
    | { kind: 'services'; index: number; strip: (typeof HOME_SERVICE_STRIPS)[number] }
    | { kind: 'providers'; index: number; strip: (typeof HOME_PROVIDER_STRIPS)[number] }

  /** Interleave seller rows after search-inspired service rows (Fiverr buyer home rhythm). */
  const rows: BuyerRow[] = [
    { kind: 'services', index: 0, strip: HOME_SERVICE_STRIPS[0] }, // Recently viewed
    { kind: 'services', index: 1, strip: HOME_SERVICE_STRIPS[1] }, // Inspired by search
    { kind: 'services', index: 2, strip: HOME_SERVICE_STRIPS[2] }, // Inspired by activity
    { kind: 'providers', index: 3, strip: HOME_PROVIDER_STRIPS[0] }, // Top rated sellers
    { kind: 'services', index: 4, strip: HOME_SERVICE_STRIPS[3] }, // Recommended
    { kind: 'services', index: 5, strip: HOME_SERVICE_STRIPS[4] }, // Buy again
    { kind: 'providers', index: 6, strip: HOME_PROVIDER_STRIPS[1] }, // Verified Pro
    { kind: 'services', index: 7, strip: HOME_SERVICE_STRIPS[5] }, // You may like
    { kind: 'providers', index: 8, strip: HOME_PROVIDER_STRIPS[2] }, // Sellers in area
    { kind: 'services', index: 9, strip: HOME_SERVICE_STRIPS[6] }, // Saved
  ]

  return (
    <section className="bg-white pb-8 sm:pb-10">
      <Container>
        <div className="space-y-9 sm:space-y-11">
          {rows.map((row) => {
            if (row.kind === 'services') {
              const services = getLoggedInReferralServices(row.strip.serviceIds)
              if (services.length === 0) return null
              return (
                <ScrollReveal key={row.strip.id} delay={row.index * 40} y={18}>
                  <div>
                    <div className="mb-1">
                      <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                        {row.strip.title}
                      </h3>
                      {row.strip.description ? (
                        <p className="mt-1 text-sm text-muted">{row.strip.description}</p>
                      ) : null}
                    </div>
                    <ServiceRowCarousel
                      services={services}
                      initiallySaved={row.strip.initiallySaved}
                    />
                  </div>
                </ScrollReveal>
              )
            }

            const providers = getLoggedInReferralProviders(row.strip.providerIds)
            if (providers.length === 0) return null
            return (
              <ScrollReveal key={row.strip.id} delay={row.index * 40} y={18}>
                <div>
                  <div className="mb-1">
                    <h3 className="font-display text-xl font-semibold tracking-tight text-ink sm:text-2xl">
                      {row.strip.title}
                    </h3>
                    {row.strip.description ? (
                      <p className="mt-1 text-sm text-muted">{row.strip.description}</p>
                    ) : null}
                  </div>
                  <ProviderRowCarousel providers={providers} />
                </div>
              </ScrollReveal>
            )
          })}
        </div>

        <ScrollReveal delay={80} y={14} className="mt-8">
          <div className="flex flex-wrap items-center gap-2 border-t border-freeio-border-soft pt-5">
            <span className="mr-1 text-xs font-bold uppercase tracking-[0.14em] text-muted">
              Jump to
            </span>
            {HOME_QUICK_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="rounded-full border border-line bg-paper px-3.5 py-1.5 text-sm font-medium text-ink-soft transition hover:border-brand/30 hover:bg-white hover:text-brand"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}

export function LoggedInHomeHub() {
  return (
    <div className="logged-in-home">
      <section className="relative overflow-hidden pb-3 pt-5 sm:pb-4 sm:pt-6">
        <div aria-hidden className="logged-in-home-glow pointer-events-none absolute inset-0" />
        <Container className="relative z-[1]">
          <ScrollReveal y={12} variant="fade">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-accent">
              Your personalized home
            </p>
            <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Welcome back, {LOGGED_IN_MEMBER.displayName}
            </h1>
            <p className="mt-1 max-w-2xl text-sm leading-snug text-muted">
              Built from your searches, views, hires, and saved activity across LCREN.
            </p>
          </ScrollReveal>

          <WelcomeActionCards />
        </Container>
      </section>

      <PickupWhereLeftOff />
      <HomeServiceStrips />
    </div>
  )
}
