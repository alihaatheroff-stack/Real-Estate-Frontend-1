import { ArrowUpRight } from 'lucide-react'
import { MEMBERSHIP_PLANS } from '@/pages/about/membershipPlanData'
import { cn } from '@/shared/lib/cn'

export function PlanCards() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-center font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Membership Plans
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm text-muted sm:text-base">
        Monthly plans for referrals, advertising, and the network. Billed quarterly. A referred deal also pays 25–30% when it closes.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {MEMBERSHIP_PLANS.map((plan) => (
          <article
            key={plan.id}
            className={cn(
              'flex flex-col items-center rounded-lg bg-white px-6 py-8 text-center shadow-[0_10px_32px_rgba(15,23,42,0.06)]',
              plan.featured && 'shadow-[0_16px_40px_rgba(27,107,79,0.14)]',
            )}
          >
            <p className="font-display text-4xl font-bold tracking-tight text-ink">
              {plan.price}
              <span className="ml-1 text-base font-semibold text-muted">/mo</span>
            </p>
            <h2 className="mt-3 text-lg font-bold text-ink">{plan.name}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{plan.description}</p>
            <ul className="mb-8 mt-8 space-y-4 text-sm text-ink">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <button
              type="button"
              className={cn(
                'mt-auto inline-flex h-11 w-full max-w-[11.5rem] items-center justify-center gap-2 rounded-full text-sm font-semibold transition',
                plan.featured
                  ? 'bg-brand text-white hover:bg-brand-dark'
                  : 'bg-brand-light text-brand-dark hover:bg-brand hover:text-white',
              )}
            >
              Add To Cart
              <ArrowUpRight className="h-4 w-4" strokeWidth={2} aria-hidden />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
