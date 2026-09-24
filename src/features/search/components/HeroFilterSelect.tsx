import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown, ChevronUp, GripVertical, Plus, Send, X } from 'lucide-react'
import { FieldQaMark } from '@/components/ui/FieldQaMark'
import { cn } from '@/shared/lib/cn'
import type { FilterTreeNode } from '@/features/search/data/landingFilterOptions'

type HeroFilterSelectProps = {
  label: string
  placeholder: string
  options?: string[]
  /** Recursive nested checkbox tree (always shown indented when open). */
  tree?: FilterTreeNode[]
  value: string[]
  onChange: (next: string[]) => void
  optionsByLetter?: Record<string, string[]>
  /** Nested trees keyed by top-level option label (e.g. Agent → types). */
  nestedTrees?: Record<string, FilterTreeNode[]>
  /** Tighter spacing so all landing fields fit without panel scroll. */
  compact?: boolean
  /** Shorter trigger height + tighter label (side rails / forums). */
  dense?: boolean
  /** Render the menu in-flow (for scrollable drawers that clip absolute menus). */
  inlineMenu?: boolean
  /** Show trailing info icon for QA / why-this-question help. */
  showQaMark?: boolean
  /** Open the menu on hover and close when the pointer leaves. */
  openOnHover?: boolean
  /** Keep the Ex. placeholder in the trigger even when values are selected. */
  alwaysShowPlaceholder?: boolean
  /** Two-column menu: options left, draggable priority list right (register). */
  showPriorityPanel?: boolean
  /** A–Z section labels: boxed bar (default) or underline only, no borders. */
  letterHeading?: 'bar' | 'underline'
  /** After each A–Z letter group, show Suggest + E-Mail suggestion row (PSPs). */
  showLetterSuggest?: boolean
  /** Show a single Suggest + E-Mail row at the end of the menu (e.g. Fields). */
  showSuggest?: boolean
  /** Allow long labels to wrap instead of truncating with ellipsis. */
  wrapLabel?: boolean
  /** Only one option can be selected at a time (radio behavior). */
  singleSelect?: boolean
  invalid?: boolean
  className?: string
  /** Width/layout classes for the bordered trigger shell (not the label). */
  controlClassName?: string
  /** Omit the visible label when a heading already sits outside the control. */
  hideLabel?: boolean
  /** Prefix shown before selected values in the trigger (e.g. "Selected: "). */
  selectedPrefix?: string
  /**
   * Soft blue wash / border / text when values are selected.
   * Intended for forums (and similar network rails) — keep off on landing.
   */
  highlightSelected?: boolean
}

function toggleValue(list: string[], item: string) {
  return list.includes(item) ? list.filter((v) => v !== item) : [...list, item]
}

function selectSingleValue(list: string[], item: string) {
  return list.includes(item) ? [] : [item]
}

function moveItem(list: string[], from: number, to: number) {
  if (from === to || from < 0 || to < 0 || to >= list.length) return list
  const next = [...list]
  const [item] = next.splice(from, 1)
  next.splice(to, 0, item)
  return next
}

function preferenceLabel(value: string) {
  return value.split(' > ').join(' · ')
}

function parseExampleList(text: string) {
  const match = text.match(/^(.*\()(.*?)(\)\s*)$/)
  if (!match) return null
  const items = match[2]
    .replace(/(?:,\s*)?etc\.?,?\s*$/i, '')
    .replace(/,\s*$/, '')
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item && !/^etc\.?$/i.test(item))
  if (items.length === 0) return null
  return { prefix: match[1], items }
}

function fitVisibleEtc(
  text: string,
  maxWidth: number,
  measure: (value: string) => number,
) {
  if (maxWidth <= 0 || measure(text) <= maxWidth) return text

  const parsed = parseExampleList(text)
  if (parsed) {
    for (let count = parsed.items.length; count >= 1; count -= 1) {
      const candidate = `${parsed.prefix}${parsed.items.slice(0, count).join(', ')}, etc.)`
      if (measure(candidate) <= maxWidth) return candidate
    }
    const fallback = `${parsed.prefix}etc.)`
    if (measure(fallback) <= maxWidth) return fallback
  }

  const words = text
    .replace(/\s+etc\.?,?\s*\)?$/i, '')
    .split(/\s+/)
    .filter(Boolean)
  for (let count = words.length; count >= 1; count -= 1) {
    const candidate = `${words.slice(0, count).join(' ')} etc.`
    if (measure(candidate) <= maxWidth) return candidate
  }
  return 'etc.'
}

function FittedEtcText({
  text,
  className,
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [fitted, setFitted] = useState(text)

  useLayoutEffect(() => {
    const el = ref.current
    const ctx = document.createElement('canvas').getContext('2d')
    if (!el || !ctx) return
    const node = el
    const canvas = ctx

    function measure(value: string) {
      const styles = getComputedStyle(node)
      canvas.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`
      return canvas.measureText(value).width
    }

    function update() {
      const width = node.clientWidth
      if (width <= 0) return
      setFitted(fitVisibleEtc(text, width, measure))
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [text])

  return (
    <span ref={ref} className={className} title={text}>
      {fitted}
    </span>
  )
}

function formatPreferenceSummary(values: string[]) {
  return values
    .map((item, index) => `${index + 1}. ${preferenceLabel(item)}`)
    .join('  ·  ')
}

function PriorityRankList({
  value,
  onChange,
}: {
  value: string[]
  onChange: (next: string[]) => void
}) {
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)

  return (
    <div className="w-full" onMouseDown={(e) => e.stopPropagation()}>
      {value.length === 0 ? (
        <p className="px-2.5 py-2 text-sm text-muted">
          Select on the left in order of preference.
        </p>
      ) : (
        <div className="space-y-0.5">
          {value.map((item, index) => (
            <div
              key={item}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.setData('text/plain', String(index))
                setDragIndex(index)
              }}
              onDragOver={(e) => {
                e.preventDefault()
                e.dataTransfer.dropEffect = 'move'
                if (overIndex !== index) setOverIndex(index)
              }}
              onDragLeave={() => {
                if (overIndex === index) setOverIndex(null)
              }}
              onDrop={(e) => {
                e.preventDefault()
                const from = dragIndex ?? Number(e.dataTransfer.getData('text/plain'))
                if (!Number.isNaN(from)) onChange(moveItem(value, from, index))
                setDragIndex(null)
                setOverIndex(null)
              }}
              onDragEnd={() => {
                setDragIndex(null)
                setOverIndex(null)
              }}
              className={cn(
                'flex cursor-grab items-center gap-1 rounded-md px-1.5 py-2 text-sm leading-snug text-ink active:cursor-grabbing',
                overIndex === index && dragIndex !== null && dragIndex !== index
                  ? 'bg-brand-light/80 ring-1 ring-brand/30'
                  : 'hover:bg-mist/70',
                dragIndex === index && 'opacity-50',
              )}
            >
              <GripVertical
                className="h-3.5 w-3.5 shrink-0 text-muted"
                aria-hidden
              />
              <span className="min-w-0 flex-1 truncate">
                <span className="font-bold tabular-nums">{index + 1}.= -</span>
                <span className="font-medium text-brand">{preferenceLabel(item)}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function NestBlock({
  children,
  className,
  compact = false,
}: {
  children: ReactNode
  className?: string
  compact?: boolean
}) {
  return (
    <div
      className={cn(
        'mt-0.5 space-y-0.5 pl-2',
        !compact && 'border-l-2 border-black/25',
        className,
      )}
      data-nested
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  )
}

function OptionsAlignGrid({
  children,
  compact = false,
}: {
  children: ReactNode
  compact?: boolean
}) {
  if (!compact) return <>{children}</>
  return <div className="flex w-full flex-col">{children}</div>
}

/** Ballot-style checked box: rounded square with check breaking the top-right corner. */
function CheckedBallotIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12.25 3.1H4.6A2.1 2.1 0 0 0 2.5 5.2v6.2A2.1 2.1 0 0 0 4.6 13.5h6.2a2.1 2.1 0 0 0 2.1-2.1V7.15"
        stroke="currentColor"
        strokeWidth="1.55"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.35 8.05 6.9 10.55 13.55 2.85"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function OptionRow({
  item,
  checked,
  onToggle,
  compact = false,
  optionKey,
  hovered = false,
  singleSelect = false,
}: {
  item: string
  checked: boolean
  onToggle: () => void
  compact?: boolean
  optionKey?: string
  hovered?: boolean
  singleSelect?: boolean
}) {
  if (compact) {
    return (
      <div data-option-key={optionKey ?? item} className="flex w-full items-start gap-x-3">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center justify-center self-start py-2 pl-2.5"
          aria-label={checked ? `Unselect ${item}` : `Select ${item}`}
        >
          {singleSelect ? (
            <span
              className={cn(
                'inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border-[1.55px]',
                checked ? 'border-ink' : 'border-ink/40 bg-white',
              )}
              aria-hidden
            >
              {checked ? <span className="h-2 w-2 rounded-full bg-ink" /> : null}
            </span>
          ) : checked ? (
            <CheckedBallotIcon className="h-4 w-4 text-ink" />
          ) : (
            <span
              className="h-3.5 w-3.5 rounded-[4px] border-[1.55px] border-ink/40 bg-white"
              aria-hidden
            />
          )}
        </button>
        <button
          type="button"
          onClick={onToggle}
          data-option-key={optionKey ?? item}
          className={cn(
            'min-w-0 flex-1 whitespace-normal break-words py-2 pr-2.5 text-left text-sm leading-snug text-ink',
            checked && 'font-medium',
            hovered && 'underline decoration-ink underline-offset-4',
          )}
        >
          {item}
        </button>
      </div>
    )
  }

  return (
    <div
      data-option-key={optionKey ?? item}
      className={cn(
        'flex items-start gap-1.5 px-2 py-1.5 transition-colors rounded-sm hover:bg-ink/5',
        checked && 'bg-sky-400/20',
      )}
    >
      <span className="inline-block w-5 shrink-0" aria-hidden />
      <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-2">
        <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center">
          <input
            type={singleSelect ? 'radio' : 'checkbox'}
            checked={checked}
            onChange={onToggle}
            className={singleSelect ? undefined : 'register-check'}
          />
        </span>
        <span className="mt-0.5 min-w-0 flex-1 whitespace-normal break-words text-sm leading-snug text-black">
          {item}
        </span>
      </label>
    </div>
  )
}

/** Selectable heading row for parents that have nested options. */
function GroupHeadingRow({
  item,
  checked,
  onToggle,
  compact = false,
  dottedLeader = false,
  optionKey,
  hovered = false,
}: {
  item: string
  checked: boolean
  onToggle: () => void
  compact?: boolean
  dottedLeader?: boolean
  optionKey?: string
  hovered?: boolean
}) {
  if (compact) {
    return (
      <div data-option-key={optionKey ?? item} className="flex w-full items-center gap-x-3">
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center justify-center self-center py-2 pl-2.5"
          aria-label={checked ? `Unselect ${item}` : `Select ${item}`}
        >
          {checked ? (
            <CheckedBallotIcon className="h-4 w-4 text-ink" />
          ) : (
            <span
              className="h-3.5 w-3.5 rounded-[4px] border-[1.55px] border-ink/40 bg-white"
              aria-hidden
            />
          )}
        </button>
        <button
          type="button"
          onClick={onToggle}
          data-option-key={optionKey ?? item}
          className={cn(
            'flex min-w-0 items-start gap-2 py-2 pr-2.5 text-left text-sm font-semibold leading-snug text-ink',
            dottedLeader && 'flex-1',
          )}
        >
          <span
            className={cn(
              'whitespace-normal break-words',
              dottedLeader ? 'min-w-0 flex-1' : 'shrink-0',
              hovered && 'underline decoration-ink underline-offset-4',
            )}
          >
            {item}
          </span>
          {dottedLeader ? (
            <span
              className="mt-2.5 min-w-[2rem] flex-1 border-b border-dotted border-ink/45"
              aria-hidden
            />
          ) : null}
        </button>
      </div>
    )
  }

  return (
    <div
      data-option-key={optionKey ?? item}
      className={cn(
        'flex items-start gap-1.5 px-2 py-1.5 transition-colors rounded-sm hover:bg-ink/5',
        checked && 'bg-sky-400/20',
      )}
    >
      <span className="inline-block w-5 shrink-0" aria-hidden />
      <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2">
        <span className="relative mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center self-start">
          <input
            type="checkbox"
            checked={checked}
            onChange={onToggle}
            className="register-check"
          />
        </span>
        <span className="mt-0.5 shrink-0 whitespace-nowrap text-sm font-semibold leading-snug text-black">
          {item}
        </span>
        {dottedLeader ? (
          <span
            className="mt-2 min-w-[2rem] flex-1 border-b border-dotted border-black/40"
            aria-hidden
          />
        ) : null}
      </label>
    </div>
  )
}

function LinkRow({ item, href, compact = false }: { item: string; href: string; compact?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-start gap-1.5 px-2 py-1.5',
        compact ? 'rounded-lg px-2.5 py-2 hover:bg-mist' : 'rounded-sm hover:bg-ink/5',
      )}
    >
      <span className="inline-block w-5 shrink-0" aria-hidden />
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-0 flex-1 whitespace-normal break-words text-sm leading-snug text-brand underline underline-offset-2 hover:text-brand-dark"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        {item}
      </a>
    </div>
  )
}

function letterOf(label: string) {
  const match = label.match(/[A-Za-z]/)
  return (match?.[0] ?? '#').toUpperCase()
}

function groupNodesByLetter(nodes: FilterTreeNode[]) {
  const groups = new Map<string, FilterTreeNode[]>()
  const sorted = [...nodes].sort((a, b) =>
    a.label.localeCompare(b.label, undefined, { sensitivity: 'base' }),
  )
  for (const node of sorted) {
    const letter = letterOf(node.label)
    const list = groups.get(letter) ?? []
    list.push(node)
    groups.set(letter, list)
  }
  return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b))
}

function LetterHeading({
  letter,
  compact,
  variant = 'bar',
}: {
  letter: string
  compact: boolean
  variant?: 'bar' | 'underline'
}) {
  if (variant === 'underline') {
    return (
      <div
        className={cn(
          'px-3 py-1.5 text-xs font-bold uppercase tracking-wide',
          compact ? 'text-ink' : 'text-black/55',
        )}
      >
        <span className="underline decoration-ink underline-offset-4">
          {letter}...
        </span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'px-2 py-1.5 text-xs font-bold uppercase tracking-wide',
        compact
          ? 'bg-white px-3 py-1.5 text-ink'
          : 'bg-white text-black/55',
      )}
    >
      {letter}...
    </div>
  )
}

function LetterSuggestRow({
  letter,
  compact = false,
}: {
  letter: string
  compact?: boolean
}) {
  const [expanded, setExpanded] = useState(false)
  const [sent, setSent] = useState(false)
  const [suggest, setSuggest] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    if (!sent) return
    const timer = window.setTimeout(() => {
      setSent(false)
      setExpanded(false)
      setSuggest('')
      setEmail('')
    }, 4000)
    return () => window.clearTimeout(timer)
  }, [sent])

  function handleClose() {
    setExpanded(false)
    setSuggest('')
    setEmail('')
  }

  function handleSend() {
    if (!suggest.trim() || !email.trim()) return
    setExpanded(false)
    setSent(true)
  }

  const inputClass =
    'h-5 min-w-0 flex-1 border-0 border-b border-ink/40 bg-transparent px-0 py-0 text-[13px] leading-none text-ink outline-none'

  return (
    <div
      className={cn('flex w-full flex-col gap-1', compact ? 'px-2 py-1' : 'px-2 py-1')}
      onMouseDown={(event) => event.stopPropagation()}
    >
      {sent ? (
        <p className="px-1 py-0.5 text-[13px] font-semibold text-brand">
          Well; Appreciated!
        </p>
      ) : !expanded ? (
        <button
          type="button"
          onClick={() => {
            setSuggest('')
            setEmail('')
            setExpanded(true)
          }}
          className="inline-flex items-center gap-1.5 self-start rounded-md px-1 py-0.5 text-[13px] font-semibold text-ink transition hover:bg-mist"
          aria-label={`Add suggestion under ${letter}`}
        >
          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand">
            <Plus className="h-2.5 w-2.5 text-brand" strokeWidth={3} />
          </span>
          <span>Suggest</span>
        </button>
      ) : (
        <div className="flex w-full flex-col gap-1.5">
          <div className="flex w-full items-start gap-x-2.5">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] border-brand"
              aria-label="Close suggestion"
            >
              <X className="h-2.5 w-2.5 text-brand" strokeWidth={3} />
            </button>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-[13px] leading-tight text-ink">
              <span className="shrink-0 font-semibold">Suggest:</span>
              <input
                type="text"
                value={suggest}
                onChange={(event) => setSuggest(event.target.value)}
                className={inputClass}
                aria-label={`Suggest PSP under ${letter}`}
                autoFocus
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-0.5 pl-[1.65rem] text-[13px] leading-tight text-ink">
            <span className="shrink-0 font-semibold">E-Mail:</span>
            <div className="flex w-full items-end gap-1">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={inputClass}
                aria-label={`E-mail for suggestion under ${letter}`}
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!suggest.trim() || !email.trim()}
                className="mb-px inline-flex h-5 w-5 shrink-0 items-center justify-center text-brand transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send suggestion email"
              >
                <Send className="h-3.5 w-3.5" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function TreeNodes({
  nodes,
  value,
  onChange,
  path = '',
  compact = false,
  dottedLeader = false,
  groupByLetter = false,
  hoveredKey = null,
}: {
  nodes: FilterTreeNode[]
  value: string[]
  onChange: (next: string[]) => void
  path?: string
  compact?: boolean
  dottedLeader?: boolean
  groupByLetter?: boolean
  hoveredKey?: string | null
}) {
  function renderNode(node: FilterTreeNode, index: number) {
    const nodePath = path ? `${path} > ${node.label}` : node.label
    const checked = value.includes(nodePath)
    const hasChildren = Boolean(node.children?.length)

    if (!hasChildren && !node.href) {
      return (
        <OptionRow
          key={`${nodePath}-${index}`}
          item={node.label}
          checked={checked}
          compact={compact}
          optionKey={nodePath}
          hovered={hoveredKey === nodePath}
          onToggle={() => onChange(toggleValue(value, nodePath))}
        />
      )
    }

    return (
      <div key={`${nodePath}-${index}`}>
        {node.href ? (
          <LinkRow item={node.label} href={node.href} compact={compact} />
        ) : (
          <GroupHeadingRow
            item={node.label}
            checked={checked}
            compact={compact}
            dottedLeader={dottedLeader}
            optionKey={nodePath}
            hovered={hoveredKey === nodePath}
            onToggle={() => onChange(toggleValue(value, nodePath))}
          />
        )}
        {hasChildren ? (
          <NestBlock className={path ? 'ml-4' : 'ml-5'} compact={compact}>
            <TreeNodes
              nodes={node.children!}
              value={value}
              onChange={onChange}
              path={nodePath}
              compact={compact}
              dottedLeader={dottedLeader}
              groupByLetter={Boolean(node.groupByLetter)}
              hoveredKey={hoveredKey}
            />
          </NestBlock>
        ) : null}
      </div>
    )
  }

  if (groupByLetter) {
    return (
      <>
        {groupNodesByLetter(nodes).map(([letter, letterNodes]) => (
          <div key={letter} className={compact ? 'mb-2 last:mb-0' : 'mb-1'}>
            <LetterHeading letter={letter} compact={compact} />
            <div
              className={cn(
                'ml-2 pl-1',
                compact ? 'mt-1 pl-2' : 'border-l border-black/20',
              )}
            >
              <OptionsAlignGrid compact={compact}>
                {letterNodes.map((node, index) => renderNode(node, index))}
              </OptionsAlignGrid>
            </div>
          </div>
        ))}
      </>
    )
  }

  return (
    <OptionsAlignGrid compact={compact}>
      {nodes.map((node, index) => renderNode(node, index))}
    </OptionsAlignGrid>
  )
}

export function HeroFilterSelect({
  label,
  placeholder,
  options = [],
  tree,
  value = [],
  onChange,
  optionsByLetter,
  nestedTrees = {},
  compact = false,
  dense = false,
  inlineMenu = false,
  showQaMark = false,
  openOnHover = false,
  alwaysShowPlaceholder = false,
  showPriorityPanel = false,
  letterHeading = 'bar',
  showLetterSuggest = false,
  showSuggest = false,
  wrapLabel = false,
  singleSelect = false,
  invalid = false,
  className,
  controlClassName,
  selectedPrefix,
  highlightSelected = false,
  hideLabel = false,
}: HeroFilterSelectProps) {
  const [open, setOpen] = useState(false)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const lastPointRef = useRef({ x: 0, y: 0 })
  const closeTimerRef = useRef<number>(0)

  useEffect(() => {
    return () => window.clearTimeout(closeTimerRef.current)
  }, [])

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      const target = event.target as Element | null
      if (!target || rootRef.current?.contains(target)) return
      // Keep this menu open while the user selects/opens another category.
      if (target.closest('[data-hero-filter-select]')) return
      setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) setHoveredKey(null)
  }, [open])

  function updateHoveredFromPoint(x: number, y: number) {
    const el = document.elementFromPoint(x, y)
    const row = el?.closest('[data-option-key]') as HTMLElement | null
    setHoveredKey(row?.dataset.optionKey ?? null)
  }

  const selectedText = showPriorityPanel
    ? formatPreferenceSummary(value)
    : value.map(preferenceLabel).join(', ')
  const summary = alwaysShowPlaceholder
    ? placeholder
    : value.length > 0
      ? selectedPrefix
        ? `${selectedPrefix}${selectedText}`
        : selectedText
      : placeholder

  function pickOption(item: string) {
    onChange(singleSelect ? selectSingleValue(value, item) : toggleValue(value, item))
  }

  function renderTopItem(item: string) {
    const childTree = nestedTrees[item]
    const checked = value.includes(item)
    const hasNest = Boolean(childTree?.length)
    const dottedLeader = inlineMenu

    if (!hasNest) {
      return (
        <OptionRow
          key={item}
          item={item}
          checked={checked}
          compact={compact}
          optionKey={item}
          hovered={hoveredKey === item}
          singleSelect={singleSelect}
          onToggle={() => pickOption(item)}
        />
      )
    }

    return (
      <div key={item} className="relative">
        <GroupHeadingRow
          item={item}
          checked={checked}
          compact={compact}
          dottedLeader={dottedLeader}
          optionKey={item}
          hovered={hoveredKey === item}
          onToggle={() => pickOption(item)}
        />
        <NestBlock className="ml-5" compact={compact}>
          <TreeNodes
            nodes={childTree!}
            value={value}
            onChange={onChange}
            path={item}
            compact={compact}
            dottedLeader={dottedLeader}
            hoveredKey={hoveredKey}
          />
        </NestBlock>
      </div>
    )
  }

  const letterEntries = optionsByLetter
    ? Object.entries(optionsByLetter)
    : null

  // Register fields keep the title inside the same bordered shell as the trigger.
  const labelInsideShell = compact && inlineMenu && !hideLabel
  // Landing + register: one visible box for placeholder and open options.
  const unifiedShell = compact

  const labelNode = (
    <label
      className={cn(
        'inline-flex max-w-full items-start gap-1 font-bold transition-colors duration-150',
        compact
          ? cn(
              dense ? 'text-[11px] leading-tight' : 'text-sm leading-snug',
              invalid
                ? 'text-danger'
                : value.length > 0 && highlightSelected
                  ? 'text-[#6495ED]'
                  : 'text-ink',
            )
          : 'text-sm text-white',
        labelInsideShell && (dense ? 'px-2 pt-1' : 'px-2 pt-2'),
      )}
    >
      <span className={cn(compact && !wrapLabel && 'truncate', wrapLabel && 'whitespace-normal')}>
        {label}
      </span>
      {showQaMark ? <FieldQaMark field={label} /> : null}
    </label>
  )

  return (
    <div
      ref={rootRef}
      data-hero-filter-select
      className={cn(
        'relative overflow-visible',
        compact
          ? 'w-full shrink-0'
          : 'shrink-0 space-y-1',
        open && 'z-20',
        className,
      )}
      onMouseEnter={
        openOnHover
          ? () => {
            window.clearTimeout(closeTimerRef.current)
            setOpen(true)
          }
          : undefined
      }
    >
      {hideLabel || labelInsideShell ? null : labelNode}
      <div
        className={cn(
          labelInsideShell ? undefined : dense ? 'mt-0' : 'mt-0.5',
          unifiedShell &&
            cn(
              'relative overflow-hidden border shadow-sm transition duration-150',
              dense ? 'border' : 'border-2',
              // Selected: soft cornflower wash (forums / network rails only).
              !invalid &&
                highlightSelected &&
                value.length > 0 &&
                'bg-[rgba(100,149,237,0.08)] shadow-[inset_0_0_0_1px_rgba(100,149,237,0.14)]',
              (invalid || value.length === 0 || !highlightSelected) && 'bg-white',
              labelInsideShell
                ? invalid
                  ? dense ? 'rounded-lg border-danger' : 'rounded-xl border-danger'
                  : open || value.length > 0
                    ? cn(
                        // Sharp top corners so green never wraps the top curve; L/R/B stay brand.
                        // Top edge stays invisible (no gray/green line).
                        dense
                          ? 'rounded-b-lg rounded-t-none border-t-transparent'
                          : 'rounded-b-xl rounded-t-none border-t-transparent',
                        open
                          ? highlightSelected && value.length > 0
                            ? 'border-b-[rgba(100,149,237,0.7)] border-l-[rgba(100,149,237,0.7)] border-r-[rgba(100,149,237,0.7)]'
                            : 'border-b-brand border-l-brand border-r-brand'
                          : highlightSelected && value.length > 0
                            ? 'border-b-[rgba(100,149,237,0.45)] border-l-[rgba(100,149,237,0.45)] border-r-[rgba(100,149,237,0.45)]'
                            : 'border-b-brand/40 border-l-brand/40 border-r-brand/40',
                      )
                    : dense
                      ? 'rounded-lg border-ink/15'
                      : 'rounded-xl border-ink/15'
                : cn(
                    dense ? 'rounded-lg' : 'rounded-xl',
                    invalid
                      ? 'border-danger'
                      : open
                        ? highlightSelected && value.length > 0
                          ? 'border-[rgba(100,149,237,0.65)]'
                          : 'border-brand'
                        : highlightSelected && value.length > 0
                          ? 'border-[rgba(100,149,237,0.45)]'
                          : 'border-ink/15',
                  ),
            ),
          controlClassName,
        )}
      >
        {labelInsideShell ? labelNode : null}
        <button
          type="button"
          aria-label={hideLabel ? label : undefined}
          aria-expanded={open}
          onClick={() => {
            window.clearTimeout(closeTimerRef.current)
            if (openOnHover) {
              if (open) {
                setOpen(false)
                return
              }
              setOpen(true)
              return
            }
            setOpen((prev) => !prev)
          }}
          className={cn(
            'flex w-full min-w-0 items-center justify-between text-left outline-none transition duration-150',
            compact
              ? cn(
                'appearance-none shrink-0 px-2 leading-tight shadow-none',
                dense ? 'text-[11px]' : 'text-sm',
                value.length > 0 && !invalid ? 'bg-transparent' : 'bg-white',
                // Wrapped labels / long Ex. placeholders need room to grow past one line.
                wrapLabel
                  ? dense
                    ? 'min-h-7 items-start py-1'
                    : 'min-h-9 items-start py-1.5'
                  : dense
                    ? 'h-7 items-center overflow-hidden py-0'
                    : 'h-9 items-center overflow-hidden py-0',
                alwaysShowPlaceholder || value.length === 0
                  ? 'text-ink-soft'
                  : value.length > 0 && !invalid && highlightSelected
                    ? 'font-medium text-[#6495ED]'
                    : value.length > 0 && !invalid
                      ? 'font-medium text-ink'
                      : 'text-ink',
                unifiedShell
                  ? 'rounded-none border-0 ring-0 focus:border-transparent focus:ring-0'
                  : cn(
                    dense
                      ? 'rounded-lg border border-solid border-ink/15 focus:border-brand focus:ring-1 focus:ring-brand/25'
                      : 'rounded-xl border-2 border-solid border-ink/15 focus:border-brand focus:ring-2 focus:ring-brand/25',
                    value.length > 0 && highlightSelected
                      ? 'border-[rgba(100,149,237,0.45)] bg-[rgba(100,149,237,0.08)] font-medium text-[#6495ED]'
                      : null,
                    open &&
                      value.length === 0 &&
                      (dense
                        ? 'border-brand ring-1 ring-brand/25'
                        : 'border-brand ring-2 ring-brand/25'),
                    open &&
                      value.length > 0 &&
                      highlightSelected &&
                      (dense
                        ? 'border-[rgba(100,149,237,0.65)] ring-1 ring-[rgba(100,149,237,0.2)]'
                        : 'border-[rgba(100,149,237,0.65)] ring-2 ring-[rgba(100,149,237,0.2)]'),
                    open &&
                      value.length > 0 &&
                      !highlightSelected &&
                      (dense
                        ? 'border-brand ring-1 ring-brand/25'
                        : 'border-brand ring-2 ring-brand/25'),
                  ),
              )
              : cn(
                'h-8 rounded-full border-white bg-ink/35 px-3 py-2 text-sm focus:ring-1 focus:ring-white/40',
                value.length > 0 ? 'text-white' : 'text-white/60',
              ),
          )}
        >
          <span className="flex min-w-0 flex-1 items-center overflow-hidden pr-1.5">
            {wrapLabel ? (
              <span className="min-w-0 flex-1 whitespace-normal break-words leading-snug">
                {summary}
              </span>
            ) : alwaysShowPlaceholder || value.length === 0 ? (
              <FittedEtcText
                text={summary}
                className="block w-full min-w-0 overflow-hidden whitespace-nowrap leading-none"
              />
            ) : (
              <span className="min-w-0 flex-1 truncate" title={summary}>
                {summary}
              </span>
            )}
          </span>
          {open ? (
            <ChevronUp
              className={cn(
                'shrink-0',
                value.length > 0 && wrapLabel && !alwaysShowPlaceholder && 'mt-1',
                compact
                  ? cn(
                      dense ? 'h-3 w-3' : 'h-3.5 w-3.5',
                      value.length > 0 && !invalid && highlightSelected
                        ? 'text-[#6495ED]/75'
                        : 'text-brand',
                    )
                  : 'h-4 w-4 opacity-70',
              )}
            />
          ) : (
            <ChevronDown
              className={cn(
                'shrink-0',
                value.length > 0 && wrapLabel && !alwaysShowPlaceholder && 'mt-1',
                compact
                  ? cn(
                      dense ? 'h-3 w-3' : 'h-3.5 w-3.5',
                      value.length > 0 && !invalid && highlightSelected
                        ? 'text-[#6495ED]/65'
                        : 'text-ink-soft',
                    )
                  : 'h-4 w-4 opacity-70',
              )}
            />
          )}
        </button>

        {open && unifiedShell ? (
          <div className="mx-auto h-px w-[70%] bg-black" aria-hidden />
        ) : null}

        {open ? (
          <div
            className={cn(
              'z-[60] overflow-hidden animate-slide-in',
              unifiedShell
                ? 'relative mt-0 rounded-none border-0 bg-white shadow-none ring-0'
                : cn(
                  'mt-0.5 rounded-md border border-black bg-white shadow-md',
                  inlineMenu ? 'relative' : 'absolute left-0 right-0 top-full',
                ),
            )}
          >
          {showPriorityPanel ? (
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <p className="px-3 py-2 text-[11px] font-bold leading-snug text-ink">
                Select in order of preference. First pick is 1.
              </p>
              <div className="px-3 py-2">
                <p className="text-xs font-bold leading-snug text-ink">
                  Your Prioritized, Toggleable,{' '}
                  {label.replace(/:\s*$/, '').trim()} Option
                </p>
                <p className="pt-0.5 text-[10px] leading-snug text-muted">
                  Drag to change priority.
                </p>
              </div>
            </div>
          ) : null}
          <div
            ref={menuRef}
            className={cn(
              'landing-scroll-pane max-h-[20rem] overflow-x-hidden overflow-y-auto',
              compact ? 'space-y-0.5 px-1.5 py-1' : 'bg-white p-1',
            )}
            onMouseMove={(event) => {
              lastPointRef.current = { x: event.clientX, y: event.clientY }
              updateHoveredFromPoint(event.clientX, event.clientY)
            }}
            onScroll={() => {
              const { x, y } = lastPointRef.current
              updateHoveredFromPoint(x, y)
            }}
          >
            {(() => {
              const suggestContext = label.replace(/:\s*$/, '').trim() || 'option'
              const allOfTheAbove = 'All Of The Above'
              const suggestRow = showSuggest ? (
                <LetterSuggestRow letter={suggestContext} compact={compact} />
              ) : null

              let optionsPane: ReactNode
              if (tree) {
                const allIndex = tree.findIndex((node) => node.label === allOfTheAbove)
                const hasTrailingAll =
                  showSuggest && allIndex === tree.length - 1 && allIndex >= 0
                optionsPane = hasTrailingAll ? (
                  <>
                    <TreeNodes
                      nodes={tree.slice(0, -1)}
                      value={value}
                      onChange={onChange}
                      compact={compact}
                      dottedLeader={inlineMenu}
                      hoveredKey={hoveredKey}
                    />
                    {suggestRow}
                    <TreeNodes
                      nodes={tree.slice(-1)}
                      value={value}
                      onChange={onChange}
                      compact={compact}
                      dottedLeader={inlineMenu}
                      hoveredKey={hoveredKey}
                    />
                  </>
                ) : (
                  <>
                    <TreeNodes
                      nodes={tree}
                      value={value}
                      onChange={onChange}
                      compact={compact}
                      dottedLeader={inlineMenu}
                      hoveredKey={hoveredKey}
                    />
                    {suggestRow}
                  </>
                )
              } else if (letterEntries) {
                optionsPane = (
                  <>
                    {letterEntries.map(([letter, items]) => (
                      <div key={letter} className={compact ? 'mb-1 last:mb-0' : 'mb-1'}>
                        <LetterHeading
                          letter={letter}
                          compact={compact}
                          variant={letterHeading}
                        />
                        <div
                          className={cn(
                            'ml-2 pl-1',
                            compact ? 'mt-0.5 pl-2' : 'border-l border-black/20',
                            letterHeading === 'underline' && 'border-0',
                          )}
                        >
                          <OptionsAlignGrid compact={compact}>
                            {items.map((item) => renderTopItem(item))}
                          </OptionsAlignGrid>
                          {showLetterSuggest ? (
                            <LetterSuggestRow letter={letter} compact={compact} />
                          ) : null}
                        </div>
                      </div>
                    ))}
                    {suggestRow}
                  </>
                )
              } else {
                const allIndex = options.indexOf(allOfTheAbove)
                const hasTrailingAll =
                  showSuggest && allIndex === options.length - 1 && allIndex >= 0
                optionsPane = hasTrailingAll ? (
                  <>
                    <OptionsAlignGrid compact={compact}>
                      {options.slice(0, -1).map((item) => renderTopItem(item))}
                    </OptionsAlignGrid>
                    {suggestRow}
                    <OptionsAlignGrid compact={compact}>
                      {renderTopItem(allOfTheAbove)}
                    </OptionsAlignGrid>
                  </>
                ) : (
                  <>
                    <OptionsAlignGrid compact={compact}>
                      {options.map((item) => renderTopItem(item))}
                    </OptionsAlignGrid>
                    {suggestRow}
                  </>
                )
              }

              if (compact && showPriorityPanel) {
                return (
                  <div className="grid grid-cols-1 items-start gap-3 sm:grid-cols-2 sm:gap-0">
                    <div className="min-w-0">{optionsPane}</div>
                    <div className="sm:pl-2">
                      <PriorityRankList value={value} onChange={onChange} />
                    </div>
                  </div>
                )
              }

              return optionsPane
            })()}
          </div>
        </div>
      ) : null}
      </div>
    </div>
  )
}

type HeroFilterZipProps = {
  label?: string
  zip: string
  onZipChange: (zip: string) => void
  radius: string[]
  onRadiusChange: (next: string[]) => void
  radiusOptions: string[]
  className?: string
}

/** Zipcode text field with Mile Radius nested multi-select under it. */
export function HeroFilterZip({
  label = 'Zipcode',
  zip,
  onZipChange,
  radius,
  onRadiusChange,
  radiusOptions,
  className,
}: HeroFilterZipProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [open])

  const summary = zip
    ? radius.length > 0
      ? `${zip} · ${radius.join(', ')}`
      : zip
    : 'Enter zipcode...'

  return (
    <div ref={rootRef} className={cn('space-y-1', className)}>
      <label className="text-sm font-bold text-white">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex h-8 w-full min-w-0 items-center justify-between rounded-full border border-white bg-ink/35 px-3 py-2 text-left text-sm outline-none transition focus:ring-1 focus:ring-white/40',
          zip || radius.length > 0 ? 'text-white' : 'text-white/60',
        )}
      >
        <span className="truncate">{summary}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 opacity-70" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 opacity-70" />
        )}
      </button>

      {open ? (
        <div className="z-50 mt-1 w-full overflow-hidden rounded-md border border-white/40 bg-ink/95 shadow-md">
          <div className="landing-scroll-pane space-y-2 p-2">
            <div>
              <label className="mb-1 block px-2 text-xs font-semibold text-white/55">
                Zipcode
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={zip}
                onChange={(e) => onZipChange(e.target.value)}
                placeholder="93728"
                className="w-full rounded-md border border-white/40 bg-ink/50 px-3 py-2 text-sm text-white outline-none placeholder:text-white/40 focus:ring-1 focus:ring-white/40"
              />
            </div>
            <div>
              <div className="mb-1 px-2 text-xs font-semibold text-white/55">
                Mile Radius
              </div>
              <NestBlock className="ml-2">
                {radiusOptions.map((option) => (
                  <OptionRow
                    key={option}
                    item={option}
                    checked={radius.includes(option)}
                    onToggle={() =>
                      onRadiusChange(toggleValue(radius, option))
                    }
                  />
                ))}
              </NestBlock>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
