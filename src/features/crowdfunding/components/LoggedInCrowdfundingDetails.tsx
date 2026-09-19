import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  BENEFIT_AUDIENCES,
  CROWDFUNDING_INDEX,
  CROWDFUNDING_INTRO,
  CROWDFUNDING_QA,
  DIFFERENTIATORS,
  PLEDGE_SECTION,
} from '@/features/crowdfunding/data/loggedInCrowdfunding'
import { BoardInviteSection } from '@/features/crowdfunding/components/BoardInviteSection'
import { cn } from '@/shared/lib/cn'

function BenefitsSlider() {
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
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [])

  function scrollByCard(direction: 1 | -1) {
    const el = scrollerRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>('[data-benefit-card]')
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.7
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  const arrowClass =
    'absolute top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-soft transition hover:border-brand/40 hover:text-brand'

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {BENEFIT_AUDIENCES.map((audience) => (
          <article
            key={audience.id}
            data-benefit-card
            className="w-[min(78vw,17rem)] shrink-0 rounded-2xl border border-line bg-mist/30 p-5 sm:w-[calc((100%-2rem)/2.2)] lg:w-[calc((100%-3rem)/3.15)]"
          >
            <h4 className="font-display text-base font-semibold tracking-tight text-ink">
              {audience.title}
            </h4>
            <ul className="mt-3 space-y-2">
              {audience.points.map((point) => (
                <li key={point} className="flex gap-2 text-sm leading-relaxed text-muted">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {canScrollPrev ? (
        <button
          type="button"
          aria-label="Previous benefits"
          onClick={() => scrollByCard(-1)}
          className={cn(arrowClass, 'left-1')}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      ) : null}
      {canScrollNext ? (
        <button
          type="button"
          aria-label="More benefits"
          onClick={() => scrollByCard(1)}
          className={cn(arrowClass, 'right-1')}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      ) : null}
    </div>
  )
}

function NestedQaSection() {
  const [openId, setOpenId] = useState<string | null>(CROWDFUNDING_QA[0]?.id ?? null)
  const panelId = useId()

  return (
    <div className="space-y-3">
      <h4 className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
        Q &amp; A&apos;S
      </h4>
      <div className="overflow-hidden rounded-2xl border border-line bg-paper">
        {CROWDFUNDING_QA.map((item) => {
          const open = openId === item.id
          return (
            <div key={item.id} className="border-b border-line last:border-b-0">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${panelId}-${item.id}`}
                onClick={() => setOpenId((current) => (current === item.id ? null : item.id))}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left transition hover:bg-mist/60"
              >
                <span className="text-sm font-semibold text-ink">{item.label}</span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-muted transition',
                    open && 'rotate-180',
                  )}
                  aria-hidden
                />
              </button>
              {open ? (
                <div
                  id={`${panelId}-${item.id}`}
                  className="space-y-3 border-t border-line/70 bg-mist/20 px-4 py-4"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      Question
                    </p>
                    <p className="mt-1 text-sm font-medium text-ink">{item.question}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                      Answer
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{item.answer}</p>
                  </div>
                  {item.whyItMatters ? (
                    <p className="text-sm leading-relaxed text-ink-soft">
                      <span className="font-semibold text-ink">Why this matters:</span>{' '}
                      {item.whyItMatters}
                    </p>
                  ) : null}
                </div>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function NestedIndexSection() {
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <div className="space-y-3">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-3 rounded-2xl border border-line bg-paper px-4 py-3.5 text-left transition hover:bg-mist/60"
      >
        <h4 className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
          Index
        </h4>
        <ChevronDown
          className={cn('h-4 w-4 shrink-0 text-muted transition', open && 'rotate-180')}
          aria-hidden
        />
      </button>
      {open ? (
        <div
          id={panelId}
          className="rounded-2xl border border-line bg-mist/20 px-4 py-4"
        >
          <ul className="space-y-3">
            {CROWDFUNDING_INDEX.map((item) => (
              <li key={item.id}>
                <p className="text-sm font-semibold text-ink">{item.label}</p>
                {'children' in item && item.children ? (
                  <ul className="mt-2 space-y-1.5 border-l border-line pl-4">
                    {item.children.map((child) => (
                      <li key={child.id} className="text-sm leading-relaxed text-muted">
                        {child.label}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

type LoggedInCrowdfundingDetailsProps = {
  className?: string
  showBoardInvite?: boolean
  showQaAndIndex?: boolean
}

export function LoggedInCrowdfundingDetails({
  className,
  showBoardInvite = true,
  showQaAndIndex = false,
}: LoggedInCrowdfundingDetailsProps) {
  return (
    <div className={cn('space-y-10', className)}>
      <div className="max-w-3xl">
        <h3 className="font-display text-lg font-semibold tracking-tight text-ink sm:text-xl">
          {CROWDFUNDING_INTRO.headline}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{CROWDFUNDING_INTRO.body}</p>
      </div>

      <div className="max-w-3xl space-y-4">
        <h4 className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
          Until SEC approval: join the pledge & interest list
        </h4>
        <p className="text-sm leading-relaxed text-muted">{PLEDGE_SECTION.lead}</p>
        <p className="text-sm font-medium text-ink">{PLEDGE_SECTION.untilApproval}</p>
        <ul className="space-y-2">
          {PLEDGE_SECTION.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-muted">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <p className="text-xs leading-relaxed text-muted">{PLEDGE_SECTION.disclaimer}</p>
      </div>

      <div className="space-y-4">
        <h4 className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
          Why we&apos;ll be different, unique, if SEC-approved
        </h4>
        <ul className="max-w-3xl space-y-4">
          {DIFFERENTIATORS.map((item) => (
            <li key={item.id}>
              <p className="font-display text-base font-semibold text-ink">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <h4 className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
          Benefit&apos;s (matrix chart)
        </h4>
        <BenefitsSlider />
      </div>

      {showQaAndIndex ? (
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <NestedQaSection />
          <NestedIndexSection />
        </div>
      ) : null}

      {showBoardInvite ? <BoardInviteSection /> : null}
    </div>
  )
}
