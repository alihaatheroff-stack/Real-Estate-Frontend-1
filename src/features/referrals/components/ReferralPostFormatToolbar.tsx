import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  Bold,
  ChevronDown,
  Italic,
  Link2,
  List,
  ListOrdered,
  ListTodo,
  Quote,
  Strikethrough,
  Underline,
} from 'lucide-react'
import { cn } from '@/shared/lib/cn'

type FormatCommand =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikeThrough'
  | 'insertUnorderedList'
  | 'insertOrderedList'
  | 'formatBlock'

type ToggleAction = {
  id: string
  label: string
  icon: ReactNode
  command: FormatCommand
  value?: string
}

const TOGGLE_ACTIONS: ToggleAction[] = [
  { id: 'bold', label: 'Bold', icon: <Bold className="h-4 w-4" />, command: 'bold' },
  { id: 'italic', label: 'Italic', icon: <Italic className="h-4 w-4" />, command: 'italic' },
  {
    id: 'underline',
    label: 'Underline',
    icon: <Underline className="h-4 w-4" />,
    command: 'underline',
  },
  {
    id: 'strike',
    label: 'Strikethrough',
    icon: <Strikethrough className="h-4 w-4" />,
    command: 'strikeThrough',
  },
  {
    id: 'quote',
    label: 'Quote',
    icon: <Quote className="h-4 w-4" />,
    command: 'formatBlock',
    value: 'blockquote',
  },
]

export type BulletStyleId = 'disc' | 'circle' | 'square' | 'dash' | 'arrow' | 'diamond'
export type NumberStyleId = 'decimal' | 'lower-alpha' | 'upper-alpha' | 'lower-roman' | 'upper-roman'
export type CheckStyleId = 'square' | 'round' | 'tick'

const BULLET_STYLES: { id: BulletStyleId; label: string; preview: string }[] = [
  { id: 'disc', label: 'Filled circle', preview: '●' },
  { id: 'circle', label: 'Hollow circle', preview: '○' },
  { id: 'square', label: 'Square', preview: '■' },
  { id: 'dash', label: 'Dash', preview: '–' },
  { id: 'arrow', label: 'Arrow', preview: '→' },
  { id: 'diamond', label: 'Diamond', preview: '◆' },
]

const NUMBER_STYLES: { id: NumberStyleId; label: string; preview: string }[] = [
  { id: 'decimal', label: '1, 2, 3', preview: '1.' },
  { id: 'lower-alpha', label: 'a, b, c', preview: 'a.' },
  { id: 'upper-alpha', label: 'A, B, C', preview: 'A.' },
  { id: 'lower-roman', label: 'i, ii, iii', preview: 'i.' },
  { id: 'upper-roman', label: 'I, II, III', preview: 'I.' },
]

const CHECK_STYLES: { id: CheckStyleId; label: string; preview: string }[] = [
  { id: 'square', label: 'Square checkbox', preview: '☐' },
  { id: 'round', label: 'Round checkbox', preview: '◯' },
  { id: 'tick', label: 'Tick box', preview: '☑' },
]

type OpenMenu = 'bullets' | 'numbers' | 'checklist' | null

type ReferralPostFormatToolbarProps = {
  editorRef: React.RefObject<HTMLDivElement | null>
  activeFormats: Record<string, boolean>
  onChange: () => void
  onSyncActive: () => void
}

function isFormatActive(action: ToggleAction, activeFormats: Record<string, boolean>) {
  return Boolean(activeFormats[action.id])
}

export function ReferralPostFormatToolbar({
  editorRef,
  activeFormats,
  onChange,
  onSyncActive,
}: ReferralPostFormatToolbarProps) {
  const [openMenu, setOpenMenu] = useState<OpenMenu>(null)
  const rootRef = useRef<HTMLDivElement>(null)
  const clickTimerRef = useRef<number | null>(null)

  function focusEditor() {
    editorRef.current?.focus()
  }

  function clearClickTimer() {
    if (clickTimerRef.current != null) {
      window.clearTimeout(clickTimerRef.current)
      clickTimerRef.current = null
    }
  }

  function undoFormat() {
    clearClickTimer()
    focusEditor()
    document.execCommand('undo')
    onChange()
  }

  function runAfterSingleClick(action: () => void) {
    clearClickTimer()
    clickTimerRef.current = window.setTimeout(() => {
      clickTimerRef.current = null
      action()
    }, 220)
  }

  function toggleFormat(action: ToggleAction) {
    focusEditor()
    if (action.command === 'formatBlock') {
      if (isFormatActive(action, activeFormats)) {
        document.execCommand('formatBlock', false, 'p')
      } else {
        document.execCommand('formatBlock', false, action.value)
      }
    } else {
      document.execCommand(action.command, false, action.value)
    }
    onChange()
  }

  function applyBulletStyle(style: BulletStyleId) {
    focusEditor()
    if (activeFormats.bullets || activeFormats.checklist) {
      // Switch current list type if needed.
      if (activeFormats.checklist) {
        document.execCommand('insertUnorderedList')
      }
    } else {
      document.execCommand('insertUnorderedList')
    }
    const selection = window.getSelection()
    const node = selection?.anchorNode
    const element = node instanceof Element ? node : node?.parentElement
    const list = element?.closest('ul, ol')
    if (list instanceof HTMLElement) {
      list.removeAttribute('data-checklist')
      list.removeAttribute('data-check-style')
      if (list.tagName === 'OL') {
        document.execCommand('insertUnorderedList')
      }
      const ul = (element?.closest('ul') ?? editorRef.current?.querySelector('ul:last-of-type')) as
        | HTMLElement
        | null
      if (ul) {
        ul.setAttribute('data-bullet-style', style)
        ul.style.listStyleType =
          style === 'disc' || style === 'circle' || style === 'square' ? style : 'none'
      }
    }
    setOpenMenu(null)
    onChange()
  }

  function applyNumberStyle(style: NumberStyleId) {
    focusEditor()
    if (!activeFormats.numbers) {
      document.execCommand('insertOrderedList')
    }
    const selection = window.getSelection()
    const node = selection?.anchorNode
    const element = node instanceof Element ? node : node?.parentElement
    const list = element?.closest('ol') ?? editorRef.current?.querySelector('ol:last-of-type')
    if (list instanceof HTMLElement) {
      list.setAttribute('data-number-style', style)
      list.style.listStyleType = style
    }
    setOpenMenu(null)
    onChange()
  }

  function applyChecklistStyle(style: CheckStyleId) {
    focusEditor()
    if (activeFormats.checklist) {
      const selection = window.getSelection()
      const node = selection?.anchorNode
      const element = node instanceof Element ? node : node?.parentElement
      const list = element?.closest('[data-checklist="true"]')
      if (list instanceof HTMLElement) {
        list.setAttribute('data-check-style', style)
      }
      setOpenMenu(null)
      onChange()
      return
    }

    const checkboxClass =
      style === 'round'
        ? 'rounded-full'
        : style === 'tick'
          ? 'accent-emerald-600'
          : ''

    document.execCommand(
      'insertHTML',
      false,
      `<ul data-checklist="true" data-check-style="${style}"><li><label contenteditable="false"><input type="checkbox" class="${checkboxClass}" /></label> List item</li></ul><p><br></p>`,
    )
    setOpenMenu(null)
    onChange()
  }

  function removeListOrChecklist() {
    focusEditor()
    if (activeFormats.checklist) {
      document.execCommand('insertUnorderedList')
      // Second toggle removes the list in most browsers.
      if (document.queryCommandState('insertUnorderedList')) {
        document.execCommand('insertUnorderedList')
      }
    } else if (activeFormats.bullets) {
      document.execCommand('insertUnorderedList')
    } else if (activeFormats.numbers) {
      document.execCommand('insertOrderedList')
    }
    onChange()
  }

  useEffect(() => {
    if (!openMenu) return
    function onPointerDown(event: PointerEvent) {
      const target = event.target
      if (!(target instanceof Node)) return
      if (rootRef.current?.contains(target)) return
      setOpenMenu(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openMenu])

  return (
    <div
      ref={rootRef}
      className="relative flex flex-wrap items-center gap-0.5 border-b border-line px-2 py-1.5"
      role="toolbar"
      aria-label="Text formatting"
      onMouseDown={(event) => event.preventDefault()}
    >
      {TOGGLE_ACTIONS.map((action) => (
        <button
          key={action.id}
          type="button"
          title={`${action.label} · double-click to undo`}
          aria-label={action.label}
          aria-pressed={isFormatActive(action, activeFormats)}
          onClick={() => runAfterSingleClick(() => toggleFormat(action))}
          onDoubleClick={(event) => {
            event.preventDefault()
            undoFormat()
          }}
          className={cn(
            'inline-flex h-8 w-8 items-center justify-center rounded-md text-ink transition hover:bg-mist',
            isFormatActive(action, activeFormats) && 'bg-mist text-brand',
          )}
        >
          {action.icon}
        </button>
      ))}

      <StyleMenuButton
        label="Bullet list"
        icon={<List className="h-4 w-4" />}
        pressed={Boolean(activeFormats.bullets)}
        open={openMenu === 'bullets'}
        onOpenMenu={() => setOpenMenu('bullets')}
        onToggleOpen={() =>
          runAfterSingleClick(() =>
            setOpenMenu((current) => (current === 'bullets' ? null : 'bullets')),
          )
        }
        onDoubleClick={undoFormat}
        onRemove={
          activeFormats.bullets
            ? () => runAfterSingleClick(removeListOrChecklist)
            : undefined
        }
      >
        <p className="px-2 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
          Bullet style
        </p>
        {BULLET_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm text-ink hover:bg-mist"
            onClick={() => applyBulletStyle(style.id)}
          >
            <span className="w-5 text-center text-base leading-none">{style.preview}</span>
            <span>{style.label}</span>
          </button>
        ))}
      </StyleMenuButton>

      <StyleMenuButton
        label="Numbered list"
        icon={<ListOrdered className="h-4 w-4" />}
        pressed={Boolean(activeFormats.numbers)}
        open={openMenu === 'numbers'}
        onOpenMenu={() => setOpenMenu('numbers')}
        onToggleOpen={() =>
          runAfterSingleClick(() =>
            setOpenMenu((current) => (current === 'numbers' ? null : 'numbers')),
          )
        }
        onDoubleClick={undoFormat}
        onRemove={
          activeFormats.numbers
            ? () => runAfterSingleClick(removeListOrChecklist)
            : undefined
        }
      >
        <p className="px-2 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
          Number style
        </p>
        {NUMBER_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm text-ink hover:bg-mist"
            onClick={() => applyNumberStyle(style.id)}
          >
            <span className="w-5 text-center text-sm font-semibold leading-none">{style.preview}</span>
            <span>{style.label}</span>
          </button>
        ))}
      </StyleMenuButton>

      <StyleMenuButton
        label="Checklist"
        icon={<ListTodo className="h-4 w-4" />}
        pressed={Boolean(activeFormats.checklist)}
        open={openMenu === 'checklist'}
        onOpenMenu={() => setOpenMenu('checklist')}
        onToggleOpen={() =>
          runAfterSingleClick(() =>
            setOpenMenu((current) => (current === 'checklist' ? null : 'checklist')),
          )
        }
        onDoubleClick={undoFormat}
        onRemove={
          activeFormats.checklist
            ? () => runAfterSingleClick(removeListOrChecklist)
            : undefined
        }
      >
        <p className="px-2 pb-1 pt-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted">
          Checkbox style
        </p>
        {CHECK_STYLES.map((style) => (
          <button
            key={style.id}
            type="button"
            className="flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left text-sm text-ink hover:bg-mist"
            onClick={() => applyChecklistStyle(style.id)}
          >
            <span className="w-5 text-center text-base leading-none">{style.preview}</span>
            <span>{style.label}</span>
          </button>
        ))}
      </StyleMenuButton>

      <button
        type="button"
        title="Insert link · double-click to undo"
        aria-label="Insert link"
        onClick={() =>
          runAfterSingleClick(() => {
            focusEditor()
            const url = window.prompt('Enter link URL', 'https://')
            if (!url) return
            document.execCommand('createLink', false, url)
            onChange()
          })
        }
        onDoubleClick={(event) => {
          event.preventDefault()
          undoFormat()
        }}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-ink transition hover:bg-mist"
      >
        <Link2 className="h-4 w-4" />
      </button>

      <span className="sr-only" aria-hidden onFocus={onSyncActive} />
    </div>
  )
}

function StyleMenuButton({
  label,
  icon,
  pressed,
  open,
  onToggleOpen,
  onOpenMenu,
  onDoubleClick,
  onRemove,
  children,
}: {
  label: string
  icon: ReactNode
  pressed: boolean
  open: boolean
  onToggleOpen: () => void
  onOpenMenu: () => void
  onDoubleClick: () => void
  onRemove?: () => void
  children: ReactNode
}) {
  return (
    <div className="relative">
      <div
        className={cn(
          'inline-flex items-center rounded-md transition hover:bg-mist',
          (pressed || open) && 'bg-mist text-brand',
        )}
      >
        <button
          type="button"
          title={`${label} · double-click to undo`}
          aria-label={label}
          aria-pressed={pressed}
          aria-expanded={open}
          onClick={() => {
            if (pressed && onRemove && !open) {
              onRemove()
              return
            }
            onToggleOpen()
          }}
          onDoubleClick={(event) => {
            event.preventDefault()
            onDoubleClick()
          }}
          className="inline-flex h-8 w-7 items-center justify-center rounded-l-md text-ink"
        >
          {icon}
        </button>
        <button
          type="button"
          title={`${label} styles`}
          aria-label={`${label} styles`}
          aria-expanded={open}
          onClick={onOpenMenu}
          className="inline-flex h-8 w-4 items-center justify-center rounded-r-md text-ink/70"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>

      {open ? (
        <div className="absolute left-0 top-full z-30 mt-1 min-w-[12.5rem] rounded-xl border border-line bg-white p-1 shadow-panel">
          {children}
        </div>
      ) : null}
    </div>
  )
}

export const EDITOR_LIST_STYLE_CLASSES = cn(
  '[&_ul]:my-2 [&_ul]:pl-6',
  '[&_ul:not([data-checklist="true"]):not([data-bullet-style])]:list-disc',
  '[&_ul[data-bullet-style="disc"]]:list-disc',
  '[&_ul[data-bullet-style="circle"]]:list-circle',
  '[&_ul[data-bullet-style="square"]]:list-square',
  '[&_ul[data-bullet-style="dash"]]:list-none',
  '[&_ul[data-bullet-style="dash"]>li]:before:mr-2 [&_ul[data-bullet-style="dash"]>li]:before:content-["–"]',
  '[&_ul[data-bullet-style="arrow"]]:list-none',
  '[&_ul[data-bullet-style="arrow"]>li]:before:mr-2 [&_ul[data-bullet-style="arrow"]>li]:before:content-["→"]',
  '[&_ul[data-bullet-style="diamond"]]:list-none',
  '[&_ul[data-bullet-style="diamond"]>li]:before:mr-2 [&_ul[data-bullet-style="diamond"]>li]:before:content-["◆"]',
  '[&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-6',
  '[&_ol[data-number-style="lower-alpha"]]:list-[lower-alpha]',
  '[&_ol[data-number-style="upper-alpha"]]:list-[upper-alpha]',
  '[&_ol[data-number-style="lower-roman"]]:list-[lower-roman]',
  '[&_ol[data-number-style="upper-roman"]]:list-[upper-roman]',
  '[&_ul[data-checklist="true"]]:list-none [&_ul[data-checklist="true"]]:pl-1',
  '[&_ul[data-checklist="true"]_li]:my-1.5 [&_ul[data-checklist="true"]_li]:flex [&_ul[data-checklist="true"]_li]:items-start [&_ul[data-checklist="true"]_li]:gap-2',
  '[&_ul[data-checklist="true"]_input]:mt-1.5 [&_ul[data-checklist="true"]_input]:h-4 [&_ul[data-checklist="true"]_input]:w-4 [&_ul[data-checklist="true"]_input]:shrink-0 [&_ul[data-checklist="true"]_input]:accent-brand',
  '[&_ul[data-check-style="round"]_input]:rounded-full',
)
