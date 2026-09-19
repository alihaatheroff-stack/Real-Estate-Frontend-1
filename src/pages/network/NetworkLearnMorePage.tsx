import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { Section } from '@/components/layout/Section'
import { Button } from '@/components/ui/Button'
import { NETWORK_LEARN_MORE as C } from '@/features/network'
import { cn } from '@/shared/lib/cn'

export function NetworkLearnMorePage() {
  const navigate = useNavigate()
  const [phase, setPhase] = useState<'intro' | 'leaving' | 'done'>('intro')

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => setPhase('leaving'), 2200)
    const doneTimer = window.setTimeout(() => setPhase('done'), 2600)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(doneTimer)
    }
  }, [])

  const revealing = phase !== 'done'
  const introActive = phase === 'intro'

  return (
    <div className="relative">
      <Section
        className={cn(
          'py-8 transition-[filter] duration-300 sm:py-10',
          introActive ? 'pointer-events-none select-none blur-[3px]' : 'blur-0',
        )}
        containerClassName="max-w-none"
      >
        <h1 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {C.title}
        </h1>

        <div className="mt-6 space-y-5">
          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.smartMatching.title}
            </h2>
            <p className="mt-1 text-base leading-relaxed text-muted">{C.smartMatching.text}</p>
          </article>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.verification.title}
            </h2>
            <ul className="mt-1 space-y-1">
              {C.verification.points.map((point) => (
                <li key={point} className="text-base leading-relaxed text-muted">
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <p className="text-base leading-relaxed text-ink">{C.expertAdvice}</p>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.searchFilters.title}
            </h2>
            <p className="mt-1 text-base leading-relaxed text-muted">{C.searchFilters.text}</p>
          </article>

          <blockquote className="border-l-2 border-brand pl-4 font-display text-lg font-medium leading-snug text-ink">
            “{C.quote}”
          </blockquote>

          <ul className="space-y-1">
            {C.connectActions.map((item) => (
              <li key={item} className="text-base leading-relaxed text-muted">
                {item}
              </li>
            ))}
          </ul>

          <p className="text-base leading-relaxed text-muted">{C.facebookIntro}</p>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.whatItIs.title}
            </h2>
            <div className="mt-1 space-y-2">
              {C.whatItIs.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.whyItMatters.title}
            </h2>
            <p className="mt-1 text-base leading-relaxed text-muted">{C.whyItMatters.text}</p>
          </article>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.dealFocused.title}
            </h2>
            <p className="mt-1 text-base leading-relaxed text-muted">{C.dealFocused.text}</p>
          </article>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.secureMessaging.title}
            </h2>
            <p className="mt-1 text-base leading-relaxed text-muted">{C.secureMessaging.text}</p>
          </article>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.groups.title}
            </h2>
            <ul className="mt-1 space-y-1">
              {C.groups.points.map((point) => (
                <li key={point} className="text-base leading-relaxed text-muted">
                  {point}
                </li>
              ))}
            </ul>
          </article>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.forums.title}
            </h2>
            <ul className="mt-1 space-y-1">
              {C.forums.points.map((point) => (
                <li key={point} className="text-base leading-relaxed text-muted">
                  {point}
                </li>
              ))}
            </ul>
            <a
              href={C.forums.link}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-block text-sm font-medium text-brand hover:underline"
            >
              {C.forums.link}
            </a>
          </article>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.articles.title}
            </h2>
            <p className="mt-1 text-base leading-relaxed text-muted">{C.articles.text}</p>
          </article>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.newsfeed.title}
            </h2>
          </article>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.pillars.title}
            </h2>
          </article>

          <p className="text-base leading-relaxed text-muted">{C.newsfeed.postingNote}</p>
          <p className="text-base leading-relaxed text-muted">{C.newsfeed.jumpIn}</p>
          <p className="text-base leading-relaxed text-muted">{C.newsfeed.powerful}</p>

          <p className="text-base font-medium text-ink">{C.vision.readCta}</p>

          <article>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">
              {C.vision.title}
            </h2>
            <p className="mt-1 text-base leading-relaxed text-muted">{C.vision.text}</p>
          </article>
        </div>

        <div className="mt-8">
          <Button
            variant="ghost"
            onClick={() =>
              navigate(PATHS.home, { state: { scrollToSection: 'network-learn-more' } })
            }
          >
            Back to home
          </Button>
        </div>
      </Section>

      {revealing ? (
        <div
          aria-live="polite"
          className={cn(
            'pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden transition-opacity duration-300',
            introActive ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="absolute inset-0 bg-paper/50 backdrop-blur-md" />
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-3xl sm:h-80 sm:w-80"
          />
          <div
            aria-hidden
            className="absolute left-[42%] top-[45%] h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-2xl"
          />

          <div
            className={cn(
              'relative mx-4 flex max-w-xl flex-col items-center text-center transition-all duration-300',
              introActive
                ? 'translate-y-0 scale-100 opacity-100'
                : 'translate-y-3 scale-95 opacity-0',
            )}
          >
            <p className="font-display text-5xl font-semibold tracking-tight text-ink sm:text-7xl">
              Coming Soon
            </p>
            <span
              aria-hidden
              className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-brand via-accent to-brand"
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}
