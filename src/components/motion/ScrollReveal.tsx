import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  id?: string
  /** Extra delay in milliseconds, for staggered siblings. */
  delay?: number
  /** Upward travel distance in pixels (also used as base for left/right). */
  y?: number
  /**
   * Reveal motion — Freeio/Elementor-style entrances:
   * up (slide-up), fade, left, right, scale.
   */
  variant?: 'up' | 'fade' | 'left' | 'right' | 'scale'
}

export function ScrollReveal({
  children,
  className,
  id,
  delay = 0,
  y = 40,
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
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const style: CSSProperties & {
    '--reveal-delay': string
    '--reveal-y': string
    '--reveal-x': string
  } = {
    '--reveal-delay': `${delay}ms`,
    '--reveal-y': `${y}px`,
    '--reveal-x': `${Math.round(y * 0.9)}px`,
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
