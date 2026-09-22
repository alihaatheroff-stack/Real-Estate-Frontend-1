import { useEffect, useRef, useState } from 'react'
import type { ForumReactionCounts, ForumReactionId } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

export const FORUM_REACTION_OPTIONS: {
  id: ForumReactionId
  emoji: string
  label: string
  activeClass: string
}[] = [
  { id: 'like', emoji: '👍', label: 'Like', activeClass: 'text-[#2078F4]' },
  { id: 'love', emoji: '❤️', label: 'Love', activeClass: 'text-[#F33E58]' },
  { id: 'haha', emoji: '😆', label: 'Haha', activeClass: 'text-[#F7B125]' },
  { id: 'wow', emoji: '😮', label: 'Wow', activeClass: 'text-[#F7B125]' },
  { id: 'sad', emoji: '😢', label: 'Sad', activeClass: 'text-[#F7B125]' },
  { id: 'angry', emoji: '😡', label: 'Angry', activeClass: 'text-[#E9710F]' },
]

export function reactionTotal(
  reactions: ForumReactionCounts | undefined,
  fallbackLikes = 0,
) {
  if (!reactions) return fallbackLikes
  const sum = FORUM_REACTION_OPTIONS.reduce(
    (acc, option) => acc + (reactions[option.id] ?? 0),
    0,
  )
  return sum > 0 ? sum : fallbackLikes
}

export function applyReactionChange(
  current: ForumReactionCounts | undefined,
  prev: ForumReactionId | null,
  next: ForumReactionId | null,
): ForumReactionCounts {
  const counts: ForumReactionCounts = { ...current }
  if (prev) {
    counts[prev] = Math.max(0, (counts[prev] ?? 0) - 1)
    if (!counts[prev]) delete counts[prev]
  }
  if (next) {
    counts[next] = (counts[next] ?? 0) + 1
  }
  return counts
}

export function ForumReactions({
  reactions,
  likes,
  myReaction,
  onReact,
  size = 'md',
  className,
}: {
  reactions?: ForumReactionCounts
  likes?: number
  myReaction: ForumReactionId | null
  onReact: (next: ForumReactionId | null) => void
  size?: 'sm' | 'md'
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const hoverTimer = useRef<number | null>(null)
  const total = reactionTotal(reactions, likes ?? 0)
  const selected = FORUM_REACTION_OPTIONS.find((option) => option.id === myReaction)
  const summary = FORUM_REACTION_OPTIONS.filter((option) => (reactions?.[option.id] ?? 0) > 0).slice(
    0,
    3,
  )

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  function clearHoverTimer() {
    if (hoverTimer.current != null) {
      window.clearTimeout(hoverTimer.current)
      hoverTimer.current = null
    }
  }

  function openPicker() {
    clearHoverTimer()
    setOpen(true)
  }

  function scheduleClose() {
    clearHoverTimer()
    hoverTimer.current = window.setTimeout(() => setOpen(false), 180)
  }

  function choose(id: ForumReactionId) {
    onReact(myReaction === id ? null : id)
    setOpen(false)
  }

  function quickToggle() {
    onReact(myReaction ? null : 'like')
  }

  return (
    <div
      ref={rootRef}
      className={cn('relative inline-flex items-center gap-2', className)}
      onMouseEnter={openPicker}
      onMouseLeave={scheduleClose}
    >
      {open ? (
        <div
          className="absolute bottom-[calc(100%+6px)] left-0 z-30 flex items-center gap-0.5 rounded-full bg-white px-1.5 py-1 shadow-[0_12px_32px_rgba(15,31,26,0.16)] ring-1 ring-black/[0.06]"
          onMouseEnter={openPicker}
          onMouseLeave={scheduleClose}
          role="listbox"
          aria-label="Reactions"
        >
          {FORUM_REACTION_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              role="option"
              aria-selected={myReaction === option.id}
              title={option.label}
              onClick={() => choose(option.id)}
              className={cn(
                'grid size-9 place-items-center rounded-full text-xl transition hover:-translate-y-1 hover:scale-110 hover:bg-mist',
                myReaction === option.id && 'bg-mist',
              )}
            >
              <span aria-hidden>{option.emoji}</span>
              <span className="sr-only">{option.label}</span>
            </button>
          ))}
        </div>
      ) : null}

      <button
        type="button"
        onClick={quickToggle}
        onFocus={openPicker}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border font-semibold transition',
          size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs',
          myReaction
            ? cn('border-transparent bg-mist', selected?.activeClass)
            : 'border-line text-ink hover:border-brand/40',
        )}
      >
        <span className={size === 'sm' ? 'text-sm' : 'text-base'} aria-hidden>
          {selected?.emoji ?? '👍'}
        </span>
        {selected?.label ?? 'Like'}
      </button>

      {total > 0 ? (
        <span className="inline-flex items-center gap-1 text-xs text-muted">
          {summary.length > 0 ? (
            <span className="inline-flex -space-x-1" aria-hidden>
              {summary.map((option) => (
                <span
                  key={option.id}
                  className="grid size-5 place-items-center rounded-full bg-white text-[11px] ring-1 ring-line"
                >
                  {option.emoji}
                </span>
              ))}
            </span>
          ) : null}
          <span className="font-semibold text-ink">{total}</span>
        </span>
      ) : null}
    </div>
  )
}
