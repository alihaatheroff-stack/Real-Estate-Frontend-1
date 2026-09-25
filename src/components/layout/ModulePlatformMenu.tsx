import { useEffect, useId, useRef, useState, type ComponentType, type MouseEvent, type ReactNode } from 'react'
import { ArrowUp, ChevronRight, LayoutGrid } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { GuestAuthPopover } from '@/components/layout/GuestAuthPopover'
import { cn } from '@/shared/lib/cn'

export type ModulePlatformDetail = {
  id: string
  title: string
  subtitle: string
  timeAgo: string
  avatarSrc?: string
  /** When set, clicking the row navigates here (e.g. full chat). */
  href?: string
}

export type ModulePlatformRow = {
  id: string
  label: string
  summary: string
  timeAgo: string
  unreadCount: number
  items: ModulePlatformDetail[]
}

type ModulePlatformMenuProps = {
  className?: string
  triggerClassName?: string
  TriggerIcon: ComponentType<{ className?: string }>
  HeaderIcon: ComponentType<{ className?: string; strokeWidth?: number }>
  triggerLabel: string
  panelTitle: string
  panelSubtitle: string
  footerLabel: string
  platforms: ModulePlatformRow[]
  badgeCount?: number
  /** Inbox / Notifications: list rows use circled arrows + count around the module name. */
  circledListRows?: boolean
  /** Optional footer destination (e.g. full messages page). */
  footerHref?: string
  /** Guest / non-registered: show demo/example framing */
  demo?: boolean
  /** Guest / non-registered: keep the icon, block the feature */
  locked?: boolean
  footer?: ReactNode
}

function PlatformIcon() {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mist text-ink">
      <LayoutGrid className="h-5 w-5" strokeWidth={1.75} aria-hidden />
    </span>
  )
}

function CircledArrowButton({
  onClick,
  label,
  className,
}: {
  onClick: (event: MouseEvent) => void
  label: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[2.5px] border-ink text-ink transition hover:bg-mist',
        className,
      )}
      aria-label={label}
    >
      <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.25} aria-hidden />
    </button>
  )
}

function CircledCount({ count }: { count: number }) {
  return (
    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink text-xs font-semibold tabular-nums text-ink">
      {count}
    </span>
  )
}

function platformRowCount(platform: ModulePlatformRow) {
  const match = platform.summary.match(/\d+/)
  if (match) return Number(match[0])
  return platform.unreadCount > 0 ? platform.unreadCount : platform.items.length
}

function DetailRow({
  item,
  onOpen,
}: {
  item: ModulePlatformDetail
  onOpen: (item: ModulePlatformDetail) => void
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-mist/80"
    >
      {item.avatarSrc ? (
        <img
          src={item.avatarSrc}
          alt=""
          className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover object-[center_18%]"
        />
      ) : (
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mist text-xs font-semibold text-muted">
          {item.title.slice(0, 1)}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-semibold text-ink">{item.title}</span>
        <span className="mt-0.5 line-clamp-2 block text-sm leading-snug text-ink-soft">
          {item.subtitle}
        </span>
      </span>
      <span className="mt-0.5 shrink-0 text-xs text-muted">{item.timeAgo}</span>
    </button>
  )
}

function PlatformRow({
  platform,
  onOpen,
  onPrev,
  onNext,
  circledMeta = false,
}: {
  platform: ModulePlatformRow
  onOpen: () => void
  onPrev?: () => void
  onNext?: () => void
  circledMeta?: boolean
}) {
  if (circledMeta) {
    const count = platformRowCount(platform)

    return (
      <div className="flex w-full items-center gap-2.5 px-3 py-3">
        <CircledArrowButton
          label={`Previous module from ${platform.label}`}
          onClick={(event) => {
            event.stopPropagation()
            onPrev?.()
          }}
        />
        <CircledCount count={count} />
        <button
          type="button"
          onClick={onOpen}
          className="min-w-0 flex-1 text-center transition hover:opacity-80"
        >
          <span className="block truncate text-sm font-bold uppercase tracking-wide text-ink underline decoration-ink decoration-2 underline-offset-4">
            {platform.label}
          </span>
          <span className="mt-1 block truncate text-xs font-medium text-ink underline decoration-ink underline-offset-2">
            {platform.summary}
          </span>
        </button>
        <CircledCount count={count} />
        <CircledArrowButton
          label={`Next module from ${platform.label}`}
          onClick={(event) => {
            event.stopPropagation()
            onNext?.()
          }}
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition hover:bg-mist/80"
    >
      <PlatformIcon />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-ink">{platform.label}</span>
        <span className="mt-0.5 block text-xs text-muted">{platform.summary}</span>
      </span>
      <span className="flex shrink-0 items-center gap-2">
        {platform.unreadCount > 0 ? (
          <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand px-1.5 text-[10px] font-bold leading-none text-white">
            {platform.unreadCount}
          </span>
        ) : null}
        <ChevronRight className="h-4 w-4 text-muted" aria-hidden />
        <span className="min-w-[2.25rem] text-right text-xs text-muted">{platform.timeAgo}</span>
      </span>
    </button>
  )
}

function ActivePlatformHeader({
  platform,
  onBack,
  onPrev,
  onNext,
}: {
  platform: ModulePlatformRow
  onBack: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const count = platformRowCount(platform)

  return (
    <div className="border-b border-line px-3 py-3">
      <div className="flex items-center gap-2.5">
        <CircledArrowButton label="Previous module" onClick={() => onPrev()} />
        <CircledCount count={count} />
        <button
          type="button"
          onClick={onBack}
          className="min-w-0 flex-1 text-center transition hover:opacity-80"
          title="Back to all platforms"
        >
          <span className="block truncate text-base font-bold uppercase tracking-wide text-ink underline decoration-ink decoration-2 underline-offset-4">
            {platform.label}
          </span>
          <span className="mt-1.5 block truncate text-xs font-medium text-ink underline decoration-ink underline-offset-2">
            {platform.summary}
          </span>
        </button>
        <CircledCount count={count} />
        <CircledArrowButton label="Next module" onClick={() => onNext()} />
      </div>
    </div>
  )
}

export function ModulePlatformMenu({
  className,
  triggerClassName,
  TriggerIcon,
  triggerLabel,
  locked = false,
  ...panelProps
}: ModulePlatformMenuProps) {
  if (locked) {
    return (
      <GuestAuthPopover
        className={className}
        triggerClassName={triggerClassName}
        triggerLabel={triggerLabel}
        icon={TriggerIcon}
      />
    )
  }

  return (
    <UnlockedPlatformMenu
      className={className}
      triggerClassName={triggerClassName}
      TriggerIcon={TriggerIcon}
      triggerLabel={triggerLabel}
      {...panelProps}
    />
  )
}

function UnlockedPlatformMenu({
  className,
  triggerClassName,
  TriggerIcon,
  HeaderIcon,
  triggerLabel,
  panelTitle,
  panelSubtitle,
  footerLabel,
  platforms,
  badgeCount = 0,
  circledListRows = false,
  footerHref,
  demo = false,
  footer,
}: Omit<ModulePlatformMenuProps, 'locked'>) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [activePlatformId, setActivePlatformId] = useState<string | null>(null)
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)

  const activePlatform =
    activePlatformId == null
      ? null
      : (platforms.find((platform) => platform.id === activePlatformId) ?? null)

  const activeIndex =
    activePlatformId == null ? -1 : platforms.findIndex((platform) => platform.id === activePlatformId)

  function closeMenu() {
    setOpen(false)
    setActivePlatformId(null)
  }

  function cyclePlatform(fromIndex: number, delta: number) {
    if (platforms.length === 0) return
    const nextIndex = (fromIndex + delta + platforms.length) % platforms.length
    setActivePlatformId(platforms[nextIndex]!.id)
  }

  function openDetail(item: ModulePlatformDetail) {
    if (item.href) {
      closeMenu()
      navigate(item.href)
      return
    }
  }

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: globalThis.MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu()
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (activePlatformId) setActivePlatformId(null)
        else closeMenu()
      }
      if (activePlatformId && platforms.length > 1) {
        if (event.key === 'ArrowLeft') {
          event.preventDefault()
          cyclePlatform(activeIndex, -1)
        }
        if (event.key === 'ArrowRight') {
          event.preventDefault()
          cyclePlatform(activeIndex, 1)
        }
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, activePlatformId, activeIndex, platforms])

  return (
    <div ref={rootRef} className={cn('relative', className)}>
      <button
        type="button"
        className={cn(
          'relative inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist',
          triggerClassName,
          open && 'bg-mist',
        )}
        aria-label={triggerLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => {
          if (open) closeMenu()
          else setOpen(true)
        }}
      >
        <TriggerIcon className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" />
        {badgeCount > 0 ? (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-brand ring-2 ring-paper" />
        ) : null}
      </button>

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label={activePlatform?.label ?? panelTitle}
          className="absolute right-0 top-full z-50 mt-2 flex w-[min(92vw,22.5rem)] flex-col overflow-hidden rounded-xl border border-line bg-white shadow-soft sm:w-[24rem]"
        >
          {activePlatform ? (
            <>
              <ActivePlatformHeader
                platform={activePlatform}
                onBack={() => setActivePlatformId(null)}
                onPrev={() => cyclePlatform(activeIndex, -1)}
                onNext={() => cyclePlatform(activeIndex, 1)}
              />

              <div className="max-h-[min(70vh,26rem)] divide-y divide-line overflow-y-auto">
                {activePlatform.items.length > 0 ? (
                  activePlatform.items.map((item) => (
                    <DetailRow key={item.id} item={item} onOpen={openDetail} />
                  ))
                ) : (
                  <p className="px-4 py-8 text-center text-sm text-muted">
                    No saved items in {activePlatform.label} yet.
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="border-b border-line px-4 py-3">
                <div className="flex items-center gap-2">
                  <HeaderIcon className="h-4 w-4 text-ink" strokeWidth={1.75} />
                  <p className="text-sm font-semibold text-ink">{panelTitle}</p>
                </div>
                <p className="mt-1 text-xs text-muted">{panelSubtitle}</p>
                {demo ? (
                  <p className="mt-2 rounded-lg bg-mist px-2.5 py-1.5 text-[11px] font-medium leading-snug text-muted">
                    Demo / example preview — sign in to see your real activity.
                  </p>
                ) : null}
              </div>

              <div className="max-h-[min(70vh,26rem)] divide-y divide-line overflow-y-auto">
                {platforms.map((platform, index) => (
                  <PlatformRow
                    key={platform.id}
                    platform={platform}
                    circledMeta={circledListRows}
                    onOpen={() => setActivePlatformId(platform.id)}
                    onPrev={() => cyclePlatform(index, -1)}
                    onNext={() => cyclePlatform(index, 1)}
                  />
                ))}
              </div>

              <div className="border-t border-line px-4 py-2.5 text-center">
                {footer ?? (
                  <button
                    type="button"
                    className="text-sm font-medium text-brand transition hover:underline"
                    onClick={() => {
                      if (footerHref) {
                        closeMenu()
                        navigate(footerHref)
                        return
                      }
                      closeMenu()
                    }}
                  >
                    {footerLabel}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      ) : null}
    </div>
  )
}
