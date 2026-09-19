import { useEffect, useRef, type ReactNode } from 'react'
import { CheckCheck, ChevronLeft, Ellipsis, FileText, PanelLeftOpen, Phone, Video } from 'lucide-react'
import { ConversationAvatar } from '@/features/network/components/messages/ConversationAvatar'
import { getChatIdentity, getMe, getMessageAuthor } from '@/features/network/components/messages/chatIdentity'
import { MessageComposer } from '@/features/network/components/messages/MessageComposer'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import type { ChatAttachment, ChatMessage, NetworkChat } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

export function ChatThread({
  chat,
  messages,
  draft,
  onDraft,
  onSend,
  onBack,
  listCollapsed,
  onExpandList,
  onOpenInfo,
}: {
  chat: NetworkChat
  messages: ChatMessage[]
  draft: string
  onDraft: (value: string) => void
  onSend: (payload: { text: string; attachments: ChatAttachment[] }) => void
  onBack: () => void
  listCollapsed?: boolean
  onExpandList?: () => void
  onOpenInfo?: () => void
}) {
  const identity = getChatIdentity(chat)
  const me = getMe()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const showTyping = Boolean(chat.typing && identity.member && !messages.at(-1)?.fromMe)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) scroller.scrollTop = scroller.scrollHeight
  }, [messages.length, chat.id, showTyping])

  return (
    <div className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-black/[0.04] px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="rounded-full p-1 text-muted hover:bg-mist md:hidden"
            aria-label="Back to conversations"
            onClick={onBack}
          >
            <ChevronLeft className="size-5" />
          </button>
          {listCollapsed && onExpandList ? (
            <button
              type="button"
              className="hidden rounded-full p-1.5 text-muted transition hover:bg-mist md:inline-flex"
              aria-label="Show conversations"
              title="Show conversations"
              onClick={onExpandList}
            >
              <PanelLeftOpen className="size-5" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onOpenInfo}
            disabled={!onOpenInfo}
            className="flex min-w-0 items-center gap-3 rounded-2xl text-left transition enabled:hover:bg-mist/70 enabled:focus-visible:outline-none enabled:focus-visible:ring-2 enabled:focus-visible:ring-brand/30 disabled:cursor-default"
          >
            <ConversationAvatar
              avatars={identity.avatars}
              title={identity.title}
              online={identity.online}
              isGroup={identity.isGroup}
              groupAvatar={identity.groupAvatar}
              linked={!identity.isGroup}
            />
            <span className="min-w-0">
              <span className="block truncate font-semibold text-ink">{identity.title}</span>
              <span
                className={cn(
                  'block text-xs font-medium',
                  identity.online ? 'text-brand' : 'text-muted',
                )}
              >
                {identity.subtitle}
              </span>
            </span>
          </button>
        </div>
        <div className="flex items-center gap-0.5 text-brand">
          <IconButton label="Call">
            <Phone className="size-[18px]" />
          </IconButton>
          <IconButton label="Video">
            <Video className="size-[18px]" />
          </IconButton>
          <IconButton label="More" onClick={onOpenInfo}>
            <Ellipsis className="size-[18px]" />
          </IconButton>
        </div>
      </header>

      <div ref={scrollerRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#F7FAF8] px-4 py-5 sm:px-6 network-hide-scroll">
        <div className="flex justify-center">
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-muted shadow-sm">
            {chat.section === 'earlier' ? 'Earlier' : 'Today'}
          </span>
        </div>

        {messages.map((message) => {
          const author = message.fromMe ? me : getMessageAuthor(chat, message.fromMemberId)
          return (
            <div
              key={message.id}
              className={cn('flex items-end gap-2', message.fromMe ? 'justify-end' : 'justify-start')}
            >
              {!message.fromMe ? (
                author ? (
                  <MemberAvatar name={author.name} src={author.avatar} memberId={author.id} size="xs" />
                ) : (
                  <span className="size-7" />
                )
              ) : null}

              <div className={cn('max-w-[78%] sm:max-w-[70%]', message.fromMe ? 'items-end' : 'items-start')}>
                <div
                  className={cn(
                    'overflow-hidden rounded-[22px] text-[15px] leading-relaxed shadow-sm',
                    message.fromMe
                      ? 'rounded-br-md bg-brand text-white'
                      : 'rounded-bl-md bg-white text-ink ring-1 ring-black/[0.04]',
                  )}
                >
                  {message.attachments?.length ? (
                    <div className={cn('space-y-1.5', message.text ? 'p-1.5 pb-0' : 'p-1.5')}>
                      {message.attachments.map((file) => (
                        <AttachmentBubble key={file.id} file={file} fromMe={message.fromMe} />
                      ))}
                    </div>
                  ) : null}
                  {message.text ? <p className="px-4 py-2.5">{message.text}</p> : null}
                </div>
                <p
                  className={cn(
                    'mt-1 flex items-center gap-1 text-[11px] text-muted',
                    message.fromMe ? 'justify-end' : 'justify-start',
                  )}
                >
                  <span>{message.time}</span>
                  {message.fromMe ? (
                    <CheckCheck
                      className={cn('size-3.5', message.read ? 'text-brand' : 'text-muted')}
                      strokeWidth={2.2}
                    />
                  ) : null}
                </p>
              </div>

              {message.fromMe ? (
                <MemberAvatar name={me.name} src={me.avatar} memberId={me.id} size="xs" />
              ) : null}
            </div>
          )
        })}

        {showTyping && identity.member ? (
          <div className="flex items-end gap-2">
            <MemberAvatar
              name={identity.member.name}
              src={identity.member.avatar}
              memberId={identity.member.id}
              size="xs"
            />
            <div className="flex h-10 items-center gap-1 rounded-[22px] rounded-bl-md bg-white px-3.5 ring-1 ring-black/[0.04]">
              <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.2s]" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted" />
              <span className="size-1.5 animate-bounce rounded-full bg-muted [animation-delay:0.2s]" />
            </div>
          </div>
        ) : null}
      </div>

      <MessageComposer draft={draft} onDraft={onDraft} onSend={onSend} />
    </div>
  )
}

function AttachmentBubble({ file, fromMe }: { file: ChatAttachment; fromMe: boolean }) {
  if (file.kind === 'image' && file.url) {
    return (
      <a href={file.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl">
        <img src={file.url} alt={file.name} className="max-h-52 w-full object-cover" />
      </a>
    )
  }

  return (
    <a
      href={file.url}
      download={file.name}
      className={cn(
        'flex items-center gap-2 rounded-2xl px-3 py-2',
        fromMe ? 'bg-white/15' : 'bg-[#F3F6F4]',
      )}
    >
      <span
        className={cn(
          'grid size-9 place-items-center rounded-full',
          fromMe ? 'bg-white/20 text-white' : 'bg-white text-brand',
        )}
      >
        {file.kind === 'video' ? <Video className="size-4" /> : <FileText className="size-4" />}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{file.name}</span>
        <span className={cn('block text-[11px]', fromMe ? 'text-white/80' : 'text-muted')}>{file.sizeLabel}</span>
      </span>
    </a>
  )
}

function IconButton({
  label,
  children,
  onClick,
}: {
  label: string
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      className="grid size-10 place-items-center rounded-full transition hover:bg-brand-light"
      aria-label={label}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
