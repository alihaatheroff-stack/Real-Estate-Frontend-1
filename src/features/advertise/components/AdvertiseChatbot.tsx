import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import {
  ArrowUp,
  Camera,
  FileText,
  ImagePlus,
  Link2,
  Plus,
  X,
} from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import type { AdvertisementDraft } from '@/features/advertise/types'

type ChatMessage = {
  id: string
  role: 'bot' | 'user'
  text: string
}

type AttachKind = 'url' | 'pdf' | 'image' | 'camera' | 'file'

const ATTACH_OPTIONS: {
  kind: AttachKind
  label: string
  icon: typeof Link2
  accept?: string
  capture?: boolean
}[] = [
  { kind: 'url', label: 'Add URL / link', icon: Link2 },
  { kind: 'pdf', label: 'Upload PDF', icon: FileText, accept: '.pdf,application/pdf' },
  { kind: 'image', label: 'Upload image', icon: ImagePlus, accept: 'image/*' },
  { kind: 'camera', label: 'Take photo', icon: Camera, accept: 'image/*', capture: true },
  { kind: 'file', label: 'Upload file', icon: FileText, accept: '.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip' },
]

function buildReviewReply(draft: AdvertisementDraft): string {
  const title = draft.title.trim()
  const description = draft.description.trim()
  const cta = draft.cta.trim()
  const imageCount = draft.images.length
  const suggestions: string[] = []

  if (!title) {
    suggestions.push('Add a clear headline — one benefit-led line works best.')
  } else if (title.length < 12) {
    suggestions.push(`Tighten the headline (“${title}”) so it sells the outcome, not just the topic.`)
  } else {
    suggestions.push(`Strong start with “${title}”. Try a punchier opener like “${title} — start today.”`)
  }

  if (!description) {
    suggestions.push('Write a short description (2–4 sentences) covering offer, audience, and next step.')
  } else if (description.length < 40) {
    suggestions.push('Expand the copy a bit — add who it’s for and what happens after they click.')
  } else if (description.length > 320) {
    suggestions.push('Trim the description; keep the hook in the first two lines and move detail below.')
  } else {
    suggestions.push('Description length looks good. Lead with the benefit, then the proof point.')
  }

  if (imageCount === 0) {
    suggestions.push('Add at least one image so the ad feels tangible in placement previews.')
  } else if (imageCount === 1) {
    suggestions.push('One image is fine for banners; a second crop can help mobile placements.')
  } else {
    suggestions.push(`${imageCount} images attached — pick the strongest as the primary creative.`)
  }

  if (!cta) {
    suggestions.push('Add a CTA / destination URL so viewers know where to go.')
  } else {
    suggestions.push('CTA looks set — match the button label to the promise in the headline.')
  }

  suggestions.push('Align module and demographics on the left so this creative matches who sees it.')

  return `Here’s a quick review of your draft:\n\n${suggestions.map((item, index) => `${index + 1}. ${item}`).join('\n')}`
}

function buildGenericReply(draft: AdvertisementDraft): string {
  const hasDraft = Boolean(
    draft.title.trim() || draft.description.trim() || draft.images.length || draft.cta.trim(),
  )
  if (!hasDraft) {
    return 'Got it. Fill in the Create Advertisement form, then ask me to review — or keep refining targeting on the left.'
  }
  const bits: string[] = []
  if (draft.title.trim()) bits.push(`headline “${draft.title.trim()}”`)
  if (draft.images.length) bits.push(`${draft.images.length} image${draft.images.length === 1 ? '' : 's'}`)
  if (draft.description.trim()) bits.push('description copy')
  return `Noted. I can see your draft (${bits.join(', ')}). Ask “review my ad” anytime for suggestions.`
}

function looksLikeReviewRequest(text: string) {
  const lower = text.toLowerCase()
  return (
    lower.includes('review') ||
    lower.includes('suggest') ||
    lower.includes('feedback') ||
    lower.includes('is this ok') ||
    lower.includes('is this okay') ||
    lower.includes('check my ad') ||
    lower.includes('check this')
  )
}

export function AdvertiseChatbot({
  draft,
  reviewRequestId = 0,
  className,
  compactHeader = false,
}: {
  draft: AdvertisementDraft
  reviewRequestId?: number
  className?: string
  /** Hide title row when wrapped in floating widget chrome. */
  compactHeader?: boolean
}) {
  const [draftState, setDraft] = useState('')
  const [attachOpen, setAttachOpen] = useState(false)
  const [urlPrompt, setUrlPrompt] = useState(false)
  const [urlValue, setUrlValue] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Hi — fill in your ad creative, then ask me if the copy is ready. I can suggest improvements.',
    },
  ])
  const rootRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const lastReviewIdRef = useRef(0)
  const fileInputId = useId()

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setAttachOpen(false)
        setUrlPrompt(false)
      }
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setAttachOpen(false)
        setUrlPrompt(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (!reviewRequestId || reviewRequestId === lastReviewIdRef.current) return
    lastReviewIdRef.current = reviewRequestId
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-user-review`, role: 'user', text: 'Please review my advertisement draft.' },
      { id: `${Date.now()}-bot-review`, role: 'bot', text: buildReviewReply(draft) },
    ])
  }, [reviewRequestId, draft])

  function pushUser(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    const botText = looksLikeReviewRequest(trimmed)
      ? buildReviewReply(draft)
      : buildGenericReply(draft)
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-user`, role: 'user', text: trimmed },
      { id: `${Date.now()}-bot`, role: 'bot', text: botText },
    ])
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (!draftState.trim()) return
    pushUser(draftState)
    setDraft('')
    setAttachOpen(false)
  }

  function openFiles(option: (typeof ATTACH_OPTIONS)[number]) {
    if (option.kind === 'url') {
      setAttachOpen(false)
      setUrlPrompt(true)
      return
    }
    const input = fileRef.current
    if (!input) return
    input.accept = option.accept ?? '*/*'
    if (option.capture) input.setAttribute('capture', 'environment')
    else input.removeAttribute('capture')
    setAttachOpen(false)
    input.click()
  }

  function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    pushUser(`Attached: ${file.name}`)
  }

  function submitUrl() {
    const value = urlValue.trim()
    if (!value) return
    pushUser(`Link: ${value}`)
    setUrlValue('')
    setUrlPrompt(false)
  }

  const canSend = Boolean(draftState.trim())
  const hasDraftContent = Boolean(
    draft.title.trim() || draft.description.trim() || draft.images.length,
  )
  const previewThumb = draft.images[0]?.previewUrl
  const previewDescription =
    draft.description.trim().length > 90
      ? `${draft.description.trim().slice(0, 90)}…`
      : draft.description.trim()

  return (
    <section
      ref={rootRef}
      className={cn(
        'flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm',
        className,
      )}
    >
      <div className="border-b border-dashed border-brand/35 bg-brand/5 px-4 py-4">
        {compactHeader ? null : (
          <p className="text-sm font-medium text-ink">AI ad assistant</p>
        )}
        {hasDraftContent ? (
          <div className={cn('flex gap-3 text-left', !compactHeader && 'mt-3')}>
            {previewThumb ? (
              <img
                src={previewThumb}
                alt=""
                className="h-14 w-14 shrink-0 rounded-lg object-cover ring-1 ring-black/[0.06]"
              />
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white text-xs text-muted ring-1 ring-black/[0.06]">
                No image
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {draft.title.trim() || 'Untitled draft'}
              </p>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted">
                {previewDescription || 'No description yet.'}
              </p>
              {draft.images.length > 1 ? (
                <p className="mt-1 text-[11px] text-muted">
                  +{draft.images.length - 1} more image{draft.images.length - 1 === 1 ? '' : 's'}
                </p>
              ) : null}
            </div>
          </div>
        ) : (
          <p className={cn('text-xs text-muted', !compactHeader && 'mt-1')}>
            Draft summary appears here as you fill Create Advertisement.
          </p>
        )}
      </div>

      <div
        ref={listRef}
        className="network-hide-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto bg-[#F7FAF8] px-4 py-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              'max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm leading-relaxed',
              message.role === 'bot'
                ? 'self-start bg-white text-ink shadow-sm ring-1 ring-black/[0.04]'
                : 'self-end bg-brand text-white',
            )}
          >
            {message.text}
          </div>
        ))}
      </div>

      <div className="relative shrink-0 border-t border-black/[0.04] bg-white px-3 py-3">
        <input
          id={fileInputId}
          ref={fileRef}
          type="file"
          className="sr-only"
          onChange={onFiles}
        />

        {attachOpen ? (
          <div className="absolute bottom-[calc(100%+14px)] left-3 z-20 w-[13.5rem] overflow-hidden rounded-2xl bg-white py-1.5 shadow-[0_16px_40px_rgba(15,31,26,0.14)] ring-1 ring-black/[0.06]">
            {ATTACH_OPTIONS.map((option) => (
              <button
                key={option.kind}
                type="button"
                onClick={() => openFiles(option)}
                className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm text-ink transition hover:bg-mist"
              >
                <option.icon className="h-4 w-4 shrink-0 text-[#3B82F6]" strokeWidth={1.75} />
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        ) : null}

        {urlPrompt ? (
          <div className="absolute bottom-[calc(100%+14px)] left-3 right-3 z-20 flex gap-2 rounded-2xl bg-white p-2.5 shadow-[0_16px_40px_rgba(15,31,26,0.14)] ring-1 ring-black/[0.06]">
            <input
              type="url"
              value={urlValue}
              onChange={(event) => setUrlValue(event.target.value)}
              placeholder="https://"
              className="min-w-0 flex-1 rounded-xl bg-[#F0F2F5] px-3 py-2 text-sm text-ink outline-none"
              autoFocus
            />
            <button
              type="button"
              onClick={submitUrl}
              className="rounded-xl bg-brand px-3 text-sm font-semibold text-white"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => {
                setUrlPrompt(false)
                setUrlValue('')
              }}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#F0F2F5] text-ink"
              aria-label="Cancel URL"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ) : null}

        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 rounded-full bg-[#F0F2F5] px-1.5 py-1.5"
        >
          <button
            type="button"
            onClick={() => {
              setUrlPrompt(false)
              setAttachOpen((open) => !open)
            }}
            className={cn(
              'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-sm transition hover:bg-mist',
              attachOpen && 'ring-2 ring-brand/25',
            )}
            aria-label="Attach"
            aria-expanded={attachOpen}
          >
            <Plus className="h-5 w-5" strokeWidth={2} />
          </button>

          <input
            value={draftState}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask for a review or send a note…"
            className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-ink outline-none placeholder:text-muted"
          />

          <button
            type="submit"
            disabled={!canSend}
            className={cn(
              'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm transition',
              canSend
                ? 'bg-brand text-white hover:bg-brand-dark'
                : 'cursor-not-allowed bg-white text-ink/35',
            )}
            aria-label="Send"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={2} />
          </button>
        </form>
      </div>
    </section>
  )
}
