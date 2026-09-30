import { useEffect, useRef, useState } from 'react'
import { cn } from '@/shared/lib/cn'

const SPECIALTIES = [
  'Listing Services',
  'Profile Specialty',
  'Office Specialty',
] as const

function progressToShift(progress: number, itemIndex: number) {
  // Stagger each line slightly so they fly in sequence.
  const lag = itemIndex * 0.06
  const p = Math.min(1, Math.max(0, (progress - lag) / (1 - lag * 0.5)))

  if (p < 0.32) {
    const t = p / 0.32
    const eased = 1 - (1 - t) ** 3
    return (1 - eased) * 110
  }
  if (p > 0.68) {
    const t = (p - 0.68) / 0.32
    const eased = t ** 3
    return -eased * 110
  }
  return 0
}

function progressToOpacity(progress: number, itemIndex: number) {
  const lag = itemIndex * 0.06
  const p = Math.min(1, Math.max(0, (progress - lag) / (1 - lag * 0.5)))
  if (p < 0.12) return p / 0.12
  if (p > 0.88) return (1 - p) / 0.12
  return 1
}

export function HireScratchOffSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0.5)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReducedMotion(media.matches)
    sync()
    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const node = ref.current
    if (!node) return

    let raf = 0

    const update = () => {
      raf = 0
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight
      const travel = vh + rect.height
      if (travel <= 0) return
      const raw = (vh - rect.top) / travel
      setProgress(Math.min(1, Math.max(0, raw)))
    }

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reducedMotion])

  const lines = [
    { key: 'lead', content: 'Find Active', kind: 'lead' as const },
    ...SPECIALTIES.map((label) => ({
      key: label,
      content: label,
      kind: 'item' as const,
    })),
  ]

  return (
    <div
      ref={ref}
      id="hire-scratch-off"
      className="relative overflow-x-clip py-2 sm:py-4"
    >
      <div className="space-y-4 sm:space-y-5">
        {lines.map((line, index) => {
          const shift = reducedMotion ? 0 : progressToShift(progress, index)
          const opacity = reducedMotion ? 1 : progressToOpacity(progress, index)

          return (
            <div
              key={line.key}
              className={cn(
                'will-change-transform',
                line.kind === 'item' && 'pl-1 sm:pl-2',
              )}
              style={{
                transform: `translate3d(${shift}%, 0, 0)`,
                opacity,
              }}
            >
              {line.kind === 'lead' ? (
                  <p className="max-w-2xl text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                    {line.content}
                  </p>
                ) : null}
                {line.kind === 'item' ? (
                <p className="flex items-start gap-3 text-sm font-semibold leading-snug text-ink sm:text-base">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{line.content}</span>
                </p>
              ) : null}
            </div>
          )
        })}
      </div>
    </div>
  )
}
