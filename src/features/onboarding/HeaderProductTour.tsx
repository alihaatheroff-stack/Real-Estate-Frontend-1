import { useEffect, useLayoutEffect, useState, type CSSProperties, type ComponentType } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Bot,
  GraduationCap,
  Heart,
  Info,
  LayoutDashboard,
  MessageCircle,
  Newspaper,
  Package,
  Sparkles,
  SquarePen,
  Star,
  User,
  Video,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { PATHS } from '@/app/router/paths'
import {
  completeHeaderTour,
  dismissHeaderTourForSession,
  useHeaderTourPending,
  useIsAuthenticated,
} from '@/features/auth'
import { AssistantFace } from '@/features/landing/components/LandingAssistantWidget'
import {
  HEADER_TOUR_STEPS,
  type HeaderTourStep,
} from '@/features/onboarding/headerTourSteps'
import { cn } from '@/shared/lib/cn'

type Rect = { top: number; left: number; width: number; height: number }

const PAD = 8
const TOOLTIP_GAP = 16
const TOOLTIP_WIDTH = 400
const HIGHLIGHT_MIN = 44

function toCenteredHole(rect: Rect): Rect {
  const size = Math.max(HIGHLIGHT_MIN, Math.max(rect.width, rect.height) + PAD * 2)
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  return {
    top: cy - size / 2,
    left: cx - size / 2,
    width: size,
    height: size,
  }
}

const TOUR_ICONS: Record<
  HeaderTourStep['icon'],
  ComponentType<{ className?: string; strokeWidth?: number }>
> = {
  newspaper: Newspaper,
  pen: SquarePen,
  star: Star,
  video: Video,
  learn: GraduationCap,
  messages: MessageCircle,
  bell: Bell,
  heart: Heart,
  package: Package,
  dashboard: LayoutDashboard,
  user: User,
  bot: Bot,
  sparkles: Sparkles,
}

function findTourTarget(tourId: string): HTMLElement | null {
  const nodes = document.querySelectorAll<HTMLElement>(`[data-tour-id="${tourId}"]`)
  for (const node of nodes) {
    const rect = node.getBoundingClientRect()
    if (rect.width > 0 && rect.height > 0) return node
  }
  return nodes[0] ?? null
}

function readRect(el: HTMLElement | null): Rect | null {
  if (!el) return null
  const rect = el.getBoundingClientRect()
  if (rect.width <= 0 || rect.height <= 0) return null
  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  }
}

function tooltipStyle(
  target: Rect | null,
  opts?: { targetId?: string },
): CSSProperties {
  if (!target) {
    return {
      position: 'fixed',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      width: `min(94vw, ${TOOLTIP_WIDTH}px)`,
    }
  }

  const viewportW = window.innerWidth
  const viewportH = window.innerHeight
  const panelW = Math.min(TOOLTIP_WIDTH, viewportW - 24)
  const estimatedPanelH = 420

  // Corner FAB (chat assistant): keep the panel clear to the left so the icon stays visible.
  if (opts?.targetId === 'landing-assistant') {
    const left = Math.max(12, target.left - panelW - TOOLTIP_GAP - 8)
    const top = Math.max(
      16,
      Math.min(
        target.top + target.height / 2 - estimatedPanelH / 2,
        viewportH - estimatedPanelH - 16,
      ),
    )
    return {
      position: 'fixed',
      top,
      left,
      width: `min(94vw, ${TOOLTIP_WIDTH}px)`,
    }
  }

  const preferredTop = target.top + target.height + PAD + TOOLTIP_GAP
  const placeBelow = preferredTop + estimatedPanelH < viewportH
  const top = placeBelow
    ? preferredTop
    : Math.max(16, target.top - PAD - TOOLTIP_GAP - estimatedPanelH)

  const centerX = target.left + target.width / 2
  const half = panelW / 2
  const left = Math.min(
    Math.max(12, centerX - half),
    viewportW - panelW - 12,
  )

  return {
    position: 'fixed',
    top,
    left,
    width: `min(94vw, ${TOOLTIP_WIDTH}px)`,
  }
}

function TourStepIllustration({ icon }: { icon: HeaderTourStep['icon'] }) {
  const Icon = TOUR_ICONS[icon]
  return (
    <div className="tour-step-illu relative mb-2 h-[4.5rem] w-[5.25rem] shrink-0" aria-hidden>
      <div className="tour-step-illu__glow absolute -left-1 top-0 h-14 w-16 rounded-[42%] bg-[#2f6fed]/30 blur-[6px]" />
      <div className="tour-step-illu__wash absolute left-0 top-2 h-12 w-14 rounded-[40%] bg-white/10" />
      <div className="tour-step-illu__tile absolute left-3 top-1 flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-[#071833] text-white shadow-[0_10px_24px_rgba(7,24,51,0.55)] ring-2 ring-white/70">
        {icon === 'bot' ? (
          <AssistantFace className="tour-step-illu__icon h-full w-full" />
        ) : (
          <Icon className="tour-step-illu__icon h-6 w-6" strokeWidth={1.85} />
        )}
      </div>
      <span className="tour-step-illu__spark tour-step-illu__spark--a absolute right-1 top-0 h-1.5 w-1.5 rounded-full bg-[#93c5fd]" />
      <span className="tour-step-illu__spark tour-step-illu__spark--b absolute right-3 top-2.5 h-1 w-1 rounded-full bg-[#bfdbfe]" />
      <span className="tour-step-illu__spark tour-step-illu__spark--c absolute right-0 top-3.5 h-1 w-3 -rotate-12 rounded-full bg-[#60a5fa]" />
    </div>
  )
}

export function HeaderProductTour() {
  const isAuthenticated = useIsAuthenticated()
  const pending = useHeaderTourPending()
  const [stepIndex, setStepIndex] = useState(0)
  const [targetRect, setTargetRect] = useState<Rect | null>(null)
  const [ready, setReady] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const active = isAuthenticated && pending
  const step = HEADER_TOUR_STEPS[stepIndex] ?? HEADER_TOUR_STEPS[0]
  const isLast = stepIndex >= HEADER_TOUR_STEPS.length - 1
  const total = HEADER_TOUR_STEPS.length

  function closeTour() {
    if (dontShowAgain || isLast) completeHeaderTour()
    else dismissHeaderTourForSession()
  }

  useEffect(() => {
    if (!active) {
      setStepIndex(0)
      setReady(false)
      setTargetRect(null)
      setDontShowAgain(false)
      return
    }

    const timer = window.setTimeout(() => setReady(true), 350)
    return () => window.clearTimeout(timer)
  }, [active])

  useLayoutEffect(() => {
    if (!active || !ready) return

    function measure() {
      if (!step.targetId) {
        setTargetRect(null)
        return
      }
      setTargetRect(readRect(findTourTarget(step.targetId)))
    }

    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, true)
    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure, true)
    }
  }, [active, ready, step])

  useEffect(() => {
    if (!active || !ready) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        if (dontShowAgain || isLast) completeHeaderTour()
        else dismissHeaderTourForSession()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [active, ready, dontShowAgain, isLast])

  if (!active || !ready) return null

  const highlight = step.targetId ? targetRect : null
  const hole = highlight ? toCenteredHole(highlight) : null
  const StepIcon = TOUR_ICONS[step.icon]

  return createPortal(
    <div
      className="fixed inset-0 z-[2200]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="header-tour-title"
      aria-describedby="header-tour-body"
    >
      {hole ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div
            className="absolute inset-x-0 top-0 bg-[#071833]/95"
            style={{ height: Math.max(0, hole.top) }}
          />
          <div
            className="absolute inset-x-0 bg-[#071833]/95"
            style={{ top: hole.top + hole.height, bottom: 0 }}
          />
          <div
            className="absolute bg-[#071833]/95"
            style={{
              top: hole.top,
              left: 0,
              width: Math.max(0, hole.left),
              height: hole.height,
            }}
          />
          <div
            className="absolute bg-[#071833]/95"
            style={{
              top: hole.top,
              left: hole.left + hole.width,
              right: 0,
              height: hole.height,
            }}
          />
          <div
            className={cn(
              'absolute flex items-center justify-center bg-white ring-[3px] ring-[#2f6fed] shadow-[0_0_0_6px_rgba(47,111,237,0.22)]',
              step.icon === 'bot' ? 'rounded-full' : 'rounded-xl',
            )}
            style={{
              top: hole.top,
              left: hole.left,
              width: hole.width,
              height: hole.height,
            }}
          >
            {step.icon === 'bot' ? (
              <span className="relative inline-flex h-[88%] w-[88%] overflow-hidden rounded-full">
                <AssistantFace className="h-full w-full" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-400" />
              </span>
            ) : (
              <StepIcon className="h-[1.35rem] w-[1.35rem] text-ink" strokeWidth={1.5} />
            )}
          </div>
          {step.icon === 'bot' ? null : (
            <div
              className="absolute rounded-b-sm bg-[#2f6fed]"
              style={{
                top: hole.top + hole.height - 3,
                left: hole.left + 6,
                width: Math.max(0, hole.width - 12),
                height: 3,
              }}
            />
          )}
        </div>
      ) : (
        <button
          type="button"
          className="absolute inset-0 bg-[#071833]/95 backdrop-blur-[2px]"
          aria-label="Close tour"
          onClick={closeTour}
        />
      )}

      <div
        className={cn(
          'z-[1] overflow-hidden rounded-[1.35rem] border-2 border-white bg-[#071833]',
          'shadow-[0_24px_60px_rgba(0,0,0,0.45)]',
          !hole && 'relative mx-auto',
        )}
        style={tooltipStyle(hole, { targetId: step.targetId })}
      >
        <div className="relative px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
          <div className="absolute right-3 top-3 flex items-center gap-2 sm:right-4 sm:top-4">
            <span className="rounded-full border border-white/40 bg-white/10 px-2.5 py-1 text-[11px] font-semibold tabular-nums text-white">
              {stepIndex + 1} / {total}
            </span>
            <button
              type="button"
              onClick={closeTour}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close tour"
            >
              <X className="h-4 w-4" strokeWidth={2.25} />
            </button>
          </div>

          <TourStepIllustration key={step.id} icon={step.icon} />

          <span className="mt-1 inline-flex rounded-full border border-white/35 bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
            Quick tour
          </span>

          <h2
            id="header-tour-title"
            className="mt-3 pr-20 font-sans text-[1.45rem] font-bold leading-tight tracking-tight text-white sm:text-[1.65rem]"
          >
            {step.title}
          </h2>
          <p
            id="header-tour-body"
            className="mt-2.5 max-w-[34ch] text-[15px] leading-relaxed text-white/85"
          >
            {step.body}
          </p>

          {isLast ? (
            <div className="mt-3 rounded-xl border border-white/35 bg-white/10 px-3 py-2.5 text-sm text-white">
              <div className="flex items-start gap-3">
                <span className="relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/40">
                  <AssistantFace className="h-full w-full" />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#071833] bg-emerald-400" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-snug">Need help?</p>
                  <p className="mt-1 text-white/85 leading-relaxed">
                    Tap the chat assistant robot anytime for quick answers, or{' '}
                    <Link
                      to={PATHS.contact}
                      className="font-semibold text-white underline underline-offset-2 hover:text-white/90"
                      onClick={() => completeHeaderTour()}
                    >
                      Contact us
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {isLast ? (
            <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-white">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(event) => setDontShowAgain(event.target.checked)}
                className="h-4 w-4 shrink-0 rounded border-white bg-white accent-[#071833]"
              />
              <span className="flex-1 font-medium">Don&apos;t show again</span>
              <span
                className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/50 text-white"
                title="Hide this tour permanently when checked"
              >
                <Info className="h-3 w-3" strokeWidth={2.25} />
              </span>
            </label>
          ) : null}

          <div className="mt-4 grid grid-cols-3 gap-2.5">
            <Button
              type="button"
              variant="ghost"
              size="md"
              className="w-full border-2 border-white bg-transparent px-2 text-white no-underline hover:border-white hover:bg-white/10 hover:text-white hover:no-underline disabled:opacity-40"
              leftIcon={<ArrowLeft className="h-4 w-4" strokeWidth={2.25} />}
              disabled={stepIndex === 0}
              onClick={() => setStepIndex((i) => Math.max(i - 1, 0))}
            >
              Back
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="md"
              className="w-full border-2 border-white bg-transparent px-2 text-white no-underline hover:border-white hover:bg-white/10 hover:text-white hover:underline hover:underline-offset-4"
              onClick={closeTour}
            >
              Skip
            </Button>
            <Button
              type="button"
              size="md"
              className="w-full border-2 border-white bg-white px-2 text-[#071833] shadow-none hover:bg-white/90 hover:text-[#071833]"
              rightIcon={<ArrowRight className="h-4 w-4" strokeWidth={2.25} />}
              onClick={() => {
                if (isLast) {
                  completeHeaderTour()
                  return
                }
                setStepIndex((i) => Math.min(i + 1, total - 1))
              }}
            >
              {isLast ? 'Got it' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
