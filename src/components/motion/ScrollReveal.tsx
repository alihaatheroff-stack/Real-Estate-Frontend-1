import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  id?: string
  /** Extra delay in milliseconds, for staggered siblings. */
  delay?: number
  /** Upward travel distance in pixels. */
  y?: number
  /** Fade only — use when a child already animates its own transform. */
  variant?: 'up' | 'fade'
}

export function ScrollReveal({
  children,
  className,
  id,
  delay = 0,
  y = 28,
  variant = 'up',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (motion.matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return
        setVisible(true)
        observer.disconnect()
      },
      { threshold: 0, rootMargin: '0px 0px -48px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const style: CSSProperties & { '--reveal-delay': string; '--reveal-y': string } = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-y': `${y}px`,
  }

  return (
    <div
      ref={ref}
      id={id}
      data-reveal={variant}
      style={style}
      className={cn('scroll-reveal', visible && 'is-visible', className)}
    >
      {children}
    </div>
  )
}
