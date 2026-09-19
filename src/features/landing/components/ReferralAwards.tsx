import { Link } from 'react-router-dom'
import { ArrowUpRight, Award, BadgeCheck, MapPin } from 'lucide-react'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { Button } from '@/components/ui/Button'
import { AWARD_WINNERS } from '@/features/landing/data/awardWinners'
import { PATHS, providerPath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

type ReferralAwardsProps = {
  embedded?: boolean
  className?: string
  /** When false, only the profile cards render (heading is placed elsewhere). */
  showHeading?: boolean
}

export function ReferralAwards({
  embedded = false,
  className,
  showHeading = true,
}: ReferralAwardsProps) {
  const content = (
    <div className={cn(embedded && 'mt-2', className)}>
      <div className={cn('flex gap-4 overflow-x-auto pb-1 lg:gap-5', showHeading && 'mb-6')}>
        {AWARD_WINNERS.map((winner) => (
          <article
            key={winner.id}
            className="group flex w-[min(72vw,15rem)] shrink-0 flex-col items-center rounded-2xl border border-ink/8 bg-paper/80 px-4 py-5 text-center transition duration-300 hover:border-brand/25 hover:bg-paper sm:w-[13.5rem]"
          >
            <div className="relative">
              <img
                src={winner.image}
                alt={winner.name}
                className="h-20 w-20 rounded-full object-cover object-[center_18%] ring-2 ring-paper transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
              {winner.verified ? (
                <span className="absolute -bottom-0.5 -right-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white shadow-sm">
                  <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              ) : null}
            </div>

            <h3 className="mt-4 w-full truncate font-display text-base font-semibold tracking-tight text-ink">
              {winner.name}
            </h3>
            <p className="mt-0.5 w-full truncate text-xs text-muted">{winner.title}</p>
            <p className="mt-1 text-[0.7rem] font-semibold text-brand underline underline-offset-2">
              {winner.rank}
            </p>

            <p className="mt-2 inline-flex items-center gap-1 text-[0.7rem] text-muted">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {winner.city}, {winner.state}
              </span>
            </p>

            <div className="mt-3 inline-flex max-w-full items-center gap-1.5 rounded-lg bg-brand-light px-2.5 py-1.5 text-brand">
              <Award className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate text-[0.7rem] font-semibold leading-tight">
                {winner.award}
              </span>
            </div>
            <p className="mt-1.5 text-[0.65rem] font-medium uppercase tracking-[0.14em] text-muted">
              {winner.year}
            </p>

            <div className="mt-3 w-full space-y-1 text-xs text-ink-soft">
              <p>
                <span className="font-medium text-ink">Share:</span> {winner.percentageShare}%
              </p>
              <p>
                <span className="font-medium text-ink">Rate:</span> ${winner.hourlyRateMin} – $
                {winner.hourlyRateMax} / hr
              </p>
            </div>

            <Link to={providerPath(winner.id)} className="mt-4 w-full">
              <Button variant="outline" size="sm" className="w-full">
                View profile
              </Button>
            </Link>
          </article>
        ))}
      </div>
      {showHeading ? (
        <SectionHeading
          eyebrow="Awards"
          title="Reward earners"
          description="PSPs recognized for referral volume, mentorship, and standout deal work across the network."
          size={embedded ? 'subsection' : 'section'}
          className="mb-0 w-full [&>div]:max-w-none"
        />
      ) : null}

      <div className="mt-5 flex justify-end">
        <Link
          to={PATHS.profileResults}
          className="inline-flex items-center gap-1.5 font-display text-sm font-semibold tracking-tight text-brand underline underline-offset-4 transition hover:text-brand-dark"
        >
          See Entire List
          <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
        </Link>
      </div>
    </div>
  )

  if (embedded) return content

  return <Section containerClassName="max-w-none">{content}</Section>
}
