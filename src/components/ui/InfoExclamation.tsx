import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import type { GlossarySnippet } from '@/features/glossary/glossary'
import { cn } from '@/shared/lib/cn'

type InfoExclamationProps = {
  entry: GlossarySnippet
  className?: string
}

/**
 * Exclamation mark for a landing filter category or option.
 * Hover explains why the question is asked. Learn more opens the glossary.
 */
export function InfoExclamation({ entry, className }: InfoExclamationProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const tipRef = useRef<HTMLDivElement>(null)
  const hideTimer = useRef(0)
  const [open, setOpen] = useState(false)
  const [pos, setPos] = useState({ top: 0, left: 0, above: false })

  function place() {
    const rect = buttonRef.current?.getBoundingClientRect()
    if (!rect) return
    const width = 256
    const left = Math.min(
      Math.max(8, rect.left + rect.width / 2 - width / 2),
      window.innerWidth - width - 8,
    )
    const belowTop = rect.bottom + 6
    const above = belowTop + 160 > window.innerHeight && rect.top > 180
    setPos({
      top: above ? rect.top - 6 : belowTop,
      left,
      above,
    })
  }

  function show() {
    window.clearTimeout(hideTimer.current)
    place()
    setOpen(true)
  }

  function hideSoon() {
    window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => {
      const active = document.activeElement
      if (buttonRef.current?.contains(active) || tipRef.current?.contains(active)) return
      setOpen(false)
    }, 180)
  }

  useEffect(() => {
    return () => window.clearTimeout(hideTimer.current)
  }, [])

  useEffect(() => {
    if (!open) return
    function hide() {
      setOpen(false)
    }
    window.addEventListener('scroll', hide, true)
    window.addEventListener('resize', hide)
    return () => {
      window.removeEventListener('scroll', hide, true)
      window.removeEventListener('resize', hide)
    }
  }, [open])

  function stop(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
  }

  const href = entry.id ? `${PATHS.glossary}#${entry.id}` : PATHS.glossary

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          'inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center text-black',
          'hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/25',
          className,
        )}
        aria-label={entry.question}
        aria-describedby={open ? `${entry.id || 'info'}-tip` : undefined}
        onMouseEnter={show}
        onMouseLeave={hideSoon}
        onFocus={show}
        onBlur={hideSoon}
        onMouseDown={stop}
        onClick={stop}
      >
        <svg viewBox="0 0 24 24" className="h-full w-full" aria-hidden>
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.35" />
          <circle cx="12" cy="8.1" r="1.05" fill="currentColor" />
          <path
            d="M12 11.15v5.7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {open
        ? createPortal(
            <div
              ref={tipRef}
              id={`${entry.id || 'info'}-tip`}
              role="tooltip"
              style={{
                top: pos.above ? undefined : pos.top,
                bottom: pos.above ? window.innerHeight - pos.top : undefined,
                left: pos.left,
              }}
              className="fixed z-[80] w-64"
              onMouseEnter={show}
              onMouseLeave={hideSoon}
              onMouseDown={(event) => event.stopPropagation()}
              onBlur={hideSoon}
            >
              <div className="rounded-lg bg-ink px-3 py-2.5 text-left text-[12px] font-normal leading-snug text-white shadow-lg">
                <p className="font-semibold">Why we ask this</p>
                <p className="mt-1 text-white/90">{entry.answer}</p>
                <Link
                  to={href}
                  className="mt-2 inline-block font-semibold text-white underline underline-offset-2 hover:text-white/80"
                  onMouseDown={(event) => event.stopPropagation()}
                  onClick={(event) => event.stopPropagation()}
                >
                  Learn more
                </Link>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  )
}
