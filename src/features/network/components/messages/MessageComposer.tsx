import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Camera, FileText, ImagePlus, Paperclip, Send, Smile, Video, X } from 'lucide-react'
import { EMOJI_CATEGORIES } from '@/features/network/components/messages/emojiCategories'
import type { ChatAttachment } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

type Picker = 'none' | 'emoji' | 'attach'

type FileInputMode = 'image' | 'video' | 'file' | 'camera'

export function MessageComposer({
  draft,
  onDraft,
  onSend,
}: {
  draft: string
  onDraft: (value: string) => void
  onSend: (payload: { text: string; attachments: ChatAttachment[] }) => void
}) {
  const [picker, setPicker] = useState<Picker>('none')
  const [emojiTab, setEmojiTab] = useState<(typeof EMOJI_CATEGORIES)[number]['id']>('smileys')
  const [pending, setPending] = useState<ChatAttachment[]>([])
  const rootRef = useRef<HTMLFormElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setPicker('none')
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setPicker('none')
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function toggle(next: Picker) {
    setPicker((current) => (current === next ? 'none' : next))
  }

  function insertEmoji(emoji: string) {
    onDraft(`${draft}${emoji}`)
    inputRef.current?.focus()
  }

  function openFiles(mode: FileInputMode) {
    setPicker('none')
    const input = fileRef.current
    if (!input) return
    input.accept =
      mode === 'image' || mode === 'camera'
        ? 'image/*'
        : mode === 'video'
          ? 'video/*'
          : '.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip'
    input.multiple = mode !== 'camera'
    if (mode === 'camera') input.setAttribute('capture', 'environment')
    else input.removeAttribute('capture')
    input.click()
  }

  function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return
    const next = files.map((file) => fileToAttachment(file))
    setPending((current) => [...current, ...next])
  }

  function removePending(id: string) {
    setPending((current) => {
      const target = current.find((item) => item.id === id)
      if (target?.url) URL.revokeObjectURL(target.url)
      return current.filter((item) => item.id !== id)
    })
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    const text = draft.trim()
    if (!text && pending.length === 0) return
    onSend({ text, attachments: pending })
    setPending([])
    setPicker('none')
  }

  const canSend = Boolean(draft.trim() || pending.length)

  return (
    <form ref={rootRef} onSubmit={submit} className="relative shrink-0 border-t border-black/[0.04] bg-white px-3 py-3 sm:px-4">
      <input
        ref={fileRef}
        type="file"
        className="sr-only"
        onChange={onFiles}
      />

      {picker === 'attach' ? (
        <div className="absolute bottom-[calc(100%-8px)] left-3 z-20 w-[220px] overflow-hidden rounded-2xl bg-white py-1 shadow-[0_16px_40px_rgba(15,31,26,0.14)] ring-1 ring-black/[0.06]">
          <AttachOption icon={ImagePlus} label="Photos" hint="JPG, PNG, WEBP" onClick={() => openFiles('image')} />
          <AttachOption icon={Video} label="Videos" hint="MP4, MOV" onClick={() => openFiles('video')} />
          <AttachOption icon={FileText} label="Documents" hint="PDF, Word, Excel" onClick={() => openFiles('file')} />
          <AttachOption icon={Camera} label="Camera" hint="Take a photo" onClick={() => openFiles('camera')} />
        </div>
      ) : null}

      {picker === 'emoji' ? (
        <div className="absolute right-3 bottom-[calc(100%-8px)] left-3 z-20 overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_rgba(15,31,26,0.14)] ring-1 ring-black/[0.06] sm:left-auto sm:w-[340px]">
          <div className="flex gap-1 border-b border-black/[0.06] px-2 pt-2">
            {EMOJI_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setEmojiTab(category.id)}
                className={cn(
                  'h-8 rounded-full px-3 text-xs font-semibold',
                  emojiTab === category.id ? 'bg-brand text-white' : 'text-muted hover:bg-mist',
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
          <div className="grid max-h-52 grid-cols-8 gap-1 overflow-y-auto p-2 network-thin-scroll">
            {EMOJI_CATEGORIES.find((category) => category.id === emojiTab)?.emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                className="grid size-9 place-items-center rounded-lg text-lg hover:bg-mist"
                onClick={() => insertEmoji(emoji)}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {pending.length > 0 ? (
        <ul className="mb-2 flex gap-2 overflow-x-auto pb-1 network-hide-scroll">
          {pending.map((file) => (
            <li
              key={file.id}
              className="relative flex min-w-0 shrink-0 items-center gap-2 rounded-2xl bg-[#F3F6F4] py-1.5 pr-8 pl-1.5 ring-1 ring-black/[0.04]"
            >
              {file.kind === 'image' && file.url ? (
                <img src={file.url} alt="" className="size-10 rounded-xl object-cover" />
              ) : (
                <span className="grid size-10 place-items-center rounded-xl bg-white text-brand">
                  {file.kind === 'video' ? <Video className="size-4" /> : <FileText className="size-4" />}
                </span>
              )}
              <span className="max-w-[120px]">
                <span className="block truncate text-xs font-semibold text-ink">{file.name}</span>
                <span className="block text-[11px] text-muted">{file.sizeLabel}</span>
              </span>
              <button
                type="button"
                className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-white text-muted hover:text-ink"
                aria-label={`Remove ${file.name}`}
                onClick={() => removePending(file.id)}
              >
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="flex items-center gap-2">
        <button
          type="button"
          className={cn(
            'grid size-10 shrink-0 place-items-center rounded-full transition',
            picker === 'attach' ? 'bg-brand-light text-brand' : 'text-muted hover:bg-mist hover:text-ink',
          )}
          aria-label="Attach file"
          aria-expanded={picker === 'attach'}
          onClick={() => toggle('attach')}
        >
          <Paperclip className="size-[18px]" />
        </button>
        <div className="relative min-w-0 flex-1">
          <input
            ref={inputRef}
            value={draft}
            onChange={(event) => onDraft(event.target.value)}
            placeholder="Type a message..."
            className="h-12 w-full rounded-full bg-[#F3F6F4] py-2 pr-12 pl-4 text-sm outline-none ring-1 ring-transparent transition placeholder:text-muted focus:bg-white focus:ring-brand/30"
          />
          <button
            type="button"
            className={cn(
              'absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full',
              picker === 'emoji' ? 'bg-white text-brand' : 'text-muted hover:bg-white hover:text-ink',
            )}
            aria-label="Emoji"
            aria-expanded={picker === 'emoji'}
            onClick={() => toggle('emoji')}
          >
            <Smile className="size-[18px]" />
          </button>
        </div>
        <button
          type="submit"
          disabled={!canSend}
          className="grid size-12 shrink-0 place-items-center rounded-full bg-brand text-white shadow-sm transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:bg-mist disabled:text-muted"
          aria-label="Send message"
        >
          <Send className="size-[18px]" />
        </button>
      </div>
    </form>
  )
}

function AttachOption({
  icon: Icon,
  label,
  hint,
  onClick,
}: {
  icon: typeof ImagePlus
  label: string
  hint: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-3 py-2.5 text-left hover:bg-mist"
    >
      <span className="grid size-9 place-items-center rounded-full bg-brand-light text-brand">
        <Icon className="size-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="block text-[11px] text-muted">{hint}</span>
      </span>
    </button>
  )
}

function fileToAttachment(file: File): ChatAttachment {
  const kind: ChatAttachment['kind'] = file.type.startsWith('image/')
    ? 'image'
    : file.type.startsWith('video/')
      ? 'video'
      : 'file'
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
    name: file.name,
    kind,
    url: kind === 'image' || kind === 'video' ? URL.createObjectURL(file) : undefined,
    sizeLabel: formatSize(file.size),
  }
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
