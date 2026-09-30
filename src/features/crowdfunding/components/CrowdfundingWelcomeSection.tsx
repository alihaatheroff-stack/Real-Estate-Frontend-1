import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { GUEST_CROWDFUNDING_HERO, GUEST_CROWDFUNDING_HERO_IMAGE } from '@/features/crowdfunding/data/guestCrowdfunding'

export function CrowdfundingWelcomeSection() {
  const hero = GUEST_CROWDFUNDING_HERO

  return (
    <section
      id="crowdfunding-welcome"
      className="relative isolate min-h-[min(92vh,44rem)] overflow-hidden sm:min-h-[min(88vh,40rem)]"
    >
      <img
        src={GUEST_CROWDFUNDING_HERO_IMAGE}
        alt=""
        fetchPriority="high"
        decoding="async"
        className="hire-hero-photo absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-freeio-navy via-freeio-navy/90 to-freeio-navy/50"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-freeio-navy/70 via-transparent to-freeio-navy/20"
      />

      <ScrollReveal
        y={48}
        className="relative z-[1] mx-auto flex min-h-[min(92vh,44rem)] w-full max-w-[90rem] flex-col justify-end px-4 py-12 sm:min-h-[min(88vh,40rem)] sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      >
        <div className="max-w-3xl">
          <p className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {hero.brand}
          </p>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-accent sm:text-sm">
            {hero.eyebrow}
          </p>

          <h1 className="mt-8 font-display text-xl font-semibold leading-snug tracking-tight text-white sm:text-2xl lg:text-3xl">
            {hero.greeting}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base lg:text-lg">
            {hero.welcome}
          </p>

          <div className="mt-8 border-t border-white/20 pt-6">
            <p className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
              {hero.tagline}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {hero.lead}
            </p>
          </div>

          <div className="mt-8 border-t border-white/20 pt-6">
            <p className="text-sm font-semibold tracking-wide text-accent sm:text-base">
              {hero.complimentaryLabel}
            </p>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-3">
              {hero.complimentaryLines.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-3 text-sm leading-snug text-white/90 sm:text-base"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 border-t border-white/20 pt-6">
            <p className="text-sm font-semibold tracking-wide text-accent sm:text-base">
              {hero.filterLabel}
            </p>
            <p className="mt-2 text-sm font-semibold tracking-wide text-white sm:text-base">
              {hero.filterValue}
            </p>
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
