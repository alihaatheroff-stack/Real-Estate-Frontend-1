import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { ArrowUp, X } from 'lucide-react'
import { LANDING_FAQS } from '@/features/landing/data/landingFaq'
import { cn } from '@/shared/lib/cn'

type ChatMessage = {
  id: string
  role: 'bot' | 'user'
  text: string
}

const QUICK_PROMPTS = [
  'How do I get started?',
  'What payment methods are supported?',
  'Can I cancel at any time?',
] as const

export function AssistantFace({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      focusable="false"
    >
      <circle cx="32" cy="32" r="32" fill="currentColor" className="text-brand" />
      <circle cx="32" cy="30" r="22" fill="#f4ebe0" />
      <ellipse cx="32" cy="48" rx="16" ry="10" fill="#0b1f3a" opacity="0.12" />
      <circle cx="24" cy="28" r="3.2" fill="#0b1f3a" />
      <circle cx="40" cy="28" r="3.2" fill="#0b1f3a" />
      <circle cx="25.1" cy="26.9" r="0.9" fill="#fff" />
      <circle cx="41.1" cy="26.9" r="0.9" fill="#fff" />
      <path
        d="M24 38c2.4 3.6 6 5.4 8 5.4s5.6-1.8 8-5.4"
        fill="none"
        stroke="#0b1f3a"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M18 20c3.5-4 8-6 14-6s10.5 2 14 6"
        fill="none"
        stroke="#0b1f3a"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  )
}

function replyFor(text: string): string {
  const lower = text.toLowerCase()

  if (lower.includes('start') || lower.includes('join') || lower.includes('sign up')) {
    return 'Use Sign up in the header to create a client or provider account. After you register, you can browse referrals, hire providers, and join the network from the landing page.'
  }

  const faqHit = LANDING_FAQS.find(
    (item) =>
      lower.includes(item.question.toLowerCase().slice(0, 18)) ||
      item.question
        .toLowerCase()
        .split(/\s+/)
        .filter((word) => word.length > 4)
        .some((word) => lower.includes(word)),
  )
  if (faqHit) return faqHit.answer

  if (lower.includes('payment') || lower.includes('pay') || lower.includes('card')) {
    return LANDING_FAQS[0]?.answer ?? 'We accept major credit cards and ACH transfers.'
  }
  if (lower.includes('cancel') || lower.includes('refund')) {
    return LANDING_FAQS[1]?.answer ?? 'You may cancel before work begins for a full refund.'
  }
  if (lower.includes('receipt') || lower.includes('invoice')) {
    return LANDING_FAQS[2]?.answer ?? 'A receipt is emailed automatically after payment.'
  }
  if (lower.includes('access') || lower.includes('after purchase') || lower.includes('booking')) {
    return LANDING_FAQS[3]?.answer ?? 'After payment clears, the provider will contact you to begin.'
  }
  if (lower.includes('help') || lower.includes('human') || lower.includes('support')) {
    return 'I can answer common questions about payments, cancellations, receipts, and getting started. For account-specific help, sign in and open Messages from the header.'
  }

  return 'Thanks for reaching out. Ask about getting started, payments, cancellations, receipts, or access after purchase — or tap a quick question below.'
}

/**
 * Floating site assistant — facial FAB opens a lightweight help chat.
 */
export function LandingAssistantWidget() {
  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [hintVisible, setHintVisible] = useState(true)
  const [hintHovered, setHintHovered] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'bot',
      text: 'Hi — I’m here to help. Ask about membership, payments, or how to get started.',
    },
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const inputId = useId()

  useEffect(() => {
    if (!open) return
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, open])

  useEffect(() => {
    const timer = window.setTimeout(() => setHintVisible(false), 4500)
    return () => window.clearTimeout(timer)
  }, [])

  const showHint = !open && (hintVisible || hintHovered)

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMessages((prev) => [
      ...prev,
      { id: `${Date.now()}-user`, role: 'user', text: trimmed },
      { id: `${Date.now()}-bot`, role: 'bot', text: replyFor(trimmed) },
    ])
    setDraft('')
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    send(draft)
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 overflow-visible sm:bottom-6 sm:right-6">
      {open ? (
        <div
          className={cn(
            'pointer-events-auto flex h-[min(70vh,32rem)] w-[min(calc(100vw-1.5rem),22.5rem)] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_20px_50px_rgba(15,31,26,0.22)]',
          )}
          role="dialog"
          aria-label="Site assistant chat"
        >
          <div className="flex items-center gap-3 border-b border-line bg-brand px-3 py-2.5 text-white">
            <span className="relative inline-flex h-10 w-10 shrink-0 overflow-hidden rounded-full ring-2 ring-white/35">
              <AssistantFace className="h-full w-full" />
              <span className="absolute bottom-0.5 right-0.5 h-2.5 w-2.5 rounded-full border-2 border-brand bg-emerald-400" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold leading-tight">LCRE Assistant</p>
              <p className="text-[11px] text-white/75">Online · usually replies instantly</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/25"
              aria-label="Close assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-mist/40 px-3 py-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-2',
                  message.role === 'user' ? 'justify-end' : 'justify-start',
                )}
              >
                {message.role === 'bot' ? (
                  <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 overflow-hidden rounded-full">
                    <AssistantFace className="h-full w-full" />
                  </span>
                ) : null}
                <p
                  className={cn(
                    'max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
                    message.role === 'user'
                      ? 'rounded-br-md bg-brand text-white'
                      : 'rounded-bl-md border border-line bg-white text-ink',
                  )}
                >
                  {message.text}
                </p>
              </div>
            ))}

            <div className="flex flex-wrap gap-1.5 pt-1">
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => send(prompt)}
                  className="rounded-full border border-brand/25 bg-white px-2.5 py-1 text-[11px] font-medium text-brand transition hover:border-brand/50 hover:bg-brand-light/50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={onSubmit} className="border-t border-line bg-white p-2.5">
            <label htmlFor={inputId} className="sr-only">
              Message the assistant
            </label>
            <div className="flex items-end gap-2 rounded-xl border border-line bg-paper px-2 py-1.5 focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/15">
              <textarea
                id={inputId}
                rows={1}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && !event.shiftKey) {
                    event.preventDefault()
                    send(draft)
                  }
                }}
                placeholder="Ask a question…"
                className="max-h-24 min-h-[2rem] flex-1 resize-none bg-transparent px-1 py-1 text-sm text-ink outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Send message"
              >
                <ArrowUp className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div
        className="pointer-events-auto relative"
        onMouseEnter={() => setHintHovered(true)}
        onMouseLeave={() => setHintHovered(false)}
      >
        {showHint ? (
          <span className="absolute top-1/2 right-full mr-3 hidden -translate-y-1/2 whitespace-nowrap rounded-full border border-line bg-white px-3 py-1.5 text-xs font-medium text-ink shadow-md sm:inline-flex">
            Need help? Chat with us
            <span
              aria-hidden
              className="absolute top-1/2 -right-1.5 h-3 w-3 -translate-y-1/2 rotate-45 border-r border-t border-line bg-white"
            />
          </span>
        ) : null}
        <button
          type="button"
          data-tour-id="landing-assistant"
          onClick={() => setOpen((value) => !value)}
          className={cn(
            'relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white text-brand shadow-[0_12px_28px_rgba(11,31,58,0.35)] ring-2 ring-brand/15 transition hover:scale-[1.03] hover:ring-brand/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2',
            open && 'ring-brand/40',
          )}
          aria-label={open ? 'Close site assistant' : 'Open site assistant'}
          aria-expanded={open}
        >
          {open ? (
            <X className="h-6 w-6 text-brand" strokeWidth={2} />
          ) : (
            <span className="inline-flex h-full w-full overflow-hidden rounded-full">
              <AssistantFace className="h-full w-full" />
            </span>
          )}
          {!open ? (
            <span className="absolute -bottom-0.5 -right-0.5 z-10 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400 shadow-sm" />
          ) : null}
        </button>
      </div>
    </div>
  )
}
