import { useEffect, useId, useRef, useState, type ComponentType, type ReactNode } from 'react'
import { ArrowLeft, ChevronRight, LayoutGrid } from 'lucide-react'
import { GuestAuthPopover } from '@/components/layout/GuestAuthPopover'
import { cn } from '@/shared/lib/cn'

export type ModulePlatformDetail = {
  id: string
  title: string
  subtitle: string
  timeAgo: string
  avatarSrc?: string
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

function DetailRow({ item }: { item: ModulePlatformDetail }) {
  return (
    <button
      type="button"
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
}: {
  platform: ModulePlatformRow
  onOpen: () => void
}) {
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
        title={triggerLabel}
        description={`Sign in or register to use ${triggerLabel.toLowerCase()}.`}
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
  demo = false,
  footer,
}: Omit<ModulePlatformMenuProps, 'locked'>) {
  const [open, setOpen] = useState(false)
  const [activePlatformId, setActivePlatformId] = useState<string | null>(null)
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)

  const activePlatform =
    activePlatformId == null
      ? null
      : (platforms.find((platform) => platform.id === activePlatformId) ?? null)

  function closeMenu() {
    setOpen(false)
    setActivePlatformId(null)
  }

  useEffect(() => {
    if (!open) return

    function handlePointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        closeMenu()
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (activePlatformId) setActivePlatformId(null)
        else closeMenu()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, activePlatformId])

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
              <div className="border-b border-line px-2 py-2.5">
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActivePlatformId(null)}
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-ink transition hover:bg-mist"
                    aria-label="Back to platforms"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <div className="min-w-0 flex-1 pr-2">
                    <p className="truncate text-sm font-semibold text-ink">{activePlatform.label}</p>
                    <p className="truncate text-xs text-muted">{activePlatform.summary}</p>
                  </div>
                </div>
              </div>

              <div className="max-h-[min(70vh,26rem)] divide-y divide-line overflow-y-auto">
                {activePlatform.items.length > 0 ? (
                  activePlatform.items.map((item) => <DetailRow key={item.id} item={item} />)
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
                {platforms.map((platform) => (
                  <PlatformRow
                    key={platform.id}
                    platform={platform}
                    onOpen={() => setActivePlatformId(platform.id)}
                  />
                ))}
              </div>

              <div className="border-t border-line px-4 py-2.5 text-center">
                {footer ?? (
                  <button
                    type="button"
                    className="text-sm font-medium text-brand transition hover:underline"
                    onClick={closeMenu}
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
