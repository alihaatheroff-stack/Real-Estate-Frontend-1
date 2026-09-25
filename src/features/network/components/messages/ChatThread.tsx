import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import {
  CheckCheck,
  ChevronLeft,
  Ellipsis,
  FileText,
  PanelLeftOpen,
  Pause,
  PenLine,
  Phone,
  Play,
  Trash2,
  Video,
} from 'lucide-react'
import { ConversationAvatar } from '@/features/network/components/messages/ConversationAvatar'
import { getChatIdentity, getMe, getMessageAuthor } from '@/features/network/components/messages/chatIdentity'
import { MessageComposer } from '@/features/network/components/messages/MessageComposer'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import type { ChatAttachment, ChatMessage, NetworkChat } from '@/features/network/data/types'
import { useNicknameVersion, useNicknames } from '@/features/network/model/nicknames'
import { cn } from '@/shared/lib/cn'

export function ChatThread({
  chat,
  messages,
  draft,
  onDraft,
  onSend,
  onDeleteMessage,
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
  onDeleteMessage: (messageId: string, mode: 'me' | 'everyone') => void
  onBack: () => void
  listCollapsed?: boolean
  onExpandList?: () => void
  onOpenInfo?: () => void
}) {
  useNicknameVersion()
  const { getNickname, setNickname, clearNickname } = useNicknames()
  const identity = getChatIdentity(chat)
  const me = getMe()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const moreRef = useRef<HTMLDivElement>(null)
  const [moreOpen, setMoreOpen] = useState(false)
  const [nicknameOpen, setNicknameOpen] = useState(false)
  const visibleMessages = messages.filter((message) => !message.deletedForMe)
  const showTyping = Boolean(chat.typing && identity.member && !visibleMessages.at(-1)?.fromMe)
  const canNickname = chat.kind === 'direct' && Boolean(chat.memberId)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (scroller) scroller.scrollTop = scroller.scrollHeight
  }, [visibleMessages.length, chat.id, showTyping])

  useEffect(() => {
    if (!moreOpen) return
    function onPointerDown(event: MouseEvent) {
      if (!moreRef.current?.contains(event.target as Node)) setMoreOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [moreOpen])

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
            onClick={canNickname ? () => setNicknameOpen(true) : onOpenInfo}
            disabled={!canNickname && !onOpenInfo}
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
                  'block truncate text-xs font-medium',
                  identity.realName ? 'text-muted' : identity.online ? 'text-brand' : 'text-muted',
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
          <div ref={moreRef} className="relative">
            <IconButton
              label="More"
              onClick={() => {
                if (canNickname) setMoreOpen((open) => !open)
                else onOpenInfo?.()
              }}
            >
              <Ellipsis className="size-[18px]" />
            </IconButton>
            {moreOpen && canNickname ? (
              <div className="absolute top-full right-0 z-30 mt-1 w-48 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-soft">
                <button
                  type="button"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-mist"
                  onClick={() => {
                    setMoreOpen(false)
                    setNicknameOpen(true)
                  }}
                >
                  <PenLine className="size-4 text-muted" />
                  Set nickname
                </button>
                {onOpenInfo ? (
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-mist"
                    onClick={() => {
                      setMoreOpen(false)
                      onOpenInfo()
                    }}
                  >
                    Contact info
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <div
        ref={scrollerRef}
        className="network-hide-scroll min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#F7FAF8] px-4 py-5 sm:px-6"
      >
        <div className="flex justify-center">
          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-muted shadow-sm">
            {chat.section === 'earlier' ? 'Earlier' : 'Today'}
          </span>
        </div>

        {visibleMessages.map((message) => {
          const author = message.fromMe ? me : getMessageAuthor(chat, message.fromMemberId)
          const authorNickname = author && !message.fromMe ? getNickname(author.id) : undefined
          return (
            <MessageBubble
              key={message.id}
              message={message}
              authorName={authorNickname || author?.name || 'Member'}
              authorAvatar={author?.avatar}
              authorId={author?.id}
              onDelete={onDeleteMessage}
            />
          )
        })}

        {showTyping && identity.member ? (
          <div className="flex items-end gap-2">
            <MemberAvatar
              name={identity.title}
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

      {nicknameOpen && chat.memberId ? (
        <NicknameDialog
          memberName={identity.member?.name ?? 'Contact'}
          initialValue={getNickname(chat.memberId) ?? ''}
          onClose={() => setNicknameOpen(false)}
          onSave={(value) => {
            if (value.trim()) setNickname(chat.memberId!, value)
            else clearNickname(chat.memberId!)
            setNicknameOpen(false)
          }}
          onClear={() => {
            clearNickname(chat.memberId!)
            setNicknameOpen(false)
          }}
        />
      ) : null}
    </div>
  )
}

function NicknameDialog({
  memberName,
  initialValue,
  onClose,
  onSave,
  onClear,
}: {
  memberName: string
  initialValue: string
  onClose: () => void
  onSave: (value: string) => void
  onClear: () => void
}) {
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)
  const titleId = useId()

  useEffect(() => {
    inputRef.current?.focus()
    inputRef.current?.select()
  }, [])

  function submit(event: FormEvent) {
    event.preventDefault()
    onSave(value)
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink/50 p-3 backdrop-blur-sm sm:items-center">
      <form
        onSubmit={submit}
        className="w-full max-w-sm overflow-hidden rounded-[24px] bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="border-b border-black/[0.06] px-4 py-3">
          <h2 id={titleId} className="text-sm font-semibold text-ink">
            Nickname
          </h2>
          <p className="mt-1 text-xs text-muted">
            Only you will see this name for {memberName}.
          </p>
        </div>
        <div className="px-4 py-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-muted">Nickname</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder={memberName}
              maxLength={40}
              className="h-11 w-full rounded-xl border border-line bg-[#F7FAF8] px-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/20"
            />
          </label>
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-black/[0.06] px-4 py-3">
          <button
            type="button"
            className="rounded-full px-3 py-2 text-sm font-medium text-muted hover:bg-mist hover:text-ink"
            onClick={onClose}
          >
            Cancel
          </button>
          <div className="flex items-center gap-2">
            {initialValue ? (
              <button
                type="button"
                className="rounded-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-mist"
                onClick={onClear}
              >
                Remove
              </button>
            ) : null}
            <button
              type="submit"
              className="rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

function MessageBubble({
  message,
  authorName,
  authorAvatar,
  authorId,
  onDelete,
}: {
  message: ChatMessage
  authorName: string
  authorAvatar?: string
  authorId?: string
  onDelete: (messageId: string, mode: 'me' | 'everyone') => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!menuOpen) return

    function handlePointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [menuOpen])

  if (message.deletedForEveryone) {
    return (
      <div className={cn('flex items-end gap-2', message.fromMe ? 'justify-end' : 'justify-start')}>
        {!message.fromMe ? <span className="size-7 shrink-0" /> : null}
        <div
          className={cn(
            'max-w-[78%] rounded-[22px] px-4 py-2.5 text-[13px] italic text-muted ring-1 ring-black/[0.04] sm:max-w-[70%]',
            message.fromMe ? 'rounded-br-md bg-brand/10' : 'rounded-bl-md bg-white',
          )}
        >
          This message was deleted
        </div>
        {message.fromMe ? <span className="size-7 shrink-0" /> : null}
      </div>
    )
  }

  return (
    <div
      className={cn(
        'group flex items-end gap-2',
        message.fromMe ? 'justify-end' : 'justify-start',
      )}
    >
      {!message.fromMe ? (
        authorId ? (
          <MemberAvatar name={authorName} src={authorAvatar} memberId={authorId} size="xs" />
        ) : (
          <span className="size-7" />
        )
      ) : null}

      <div className={cn('relative max-w-[78%] sm:max-w-[70%]', message.fromMe ? 'items-end' : 'items-start')}>
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

        <div
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
        </div>

        <div
          ref={menuRef}
          className={cn(
            'absolute top-0 z-20',
            message.fromMe ? 'right-full mr-1' : 'left-full ml-1',
          )}
        >
          <button
            type="button"
            className={cn(
              'grid size-7 place-items-center rounded-full bg-white text-muted shadow-sm ring-1 ring-black/[0.06] transition',
              'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100',
              menuOpen && 'opacity-100',
            )}
            aria-label="Message options"
            aria-expanded={menuOpen}
            aria-haspopup="menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Ellipsis className="size-3.5" />
          </button>
          {menuOpen ? (
            <div
              role="menu"
              className={cn(
                'absolute top-full z-30 mt-1 w-48 overflow-hidden rounded-xl border border-line bg-white py-1 shadow-soft',
                message.fromMe ? 'right-0' : 'left-0',
              )}
            >
              <button
                type="button"
                role="menuitem"
                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-mist"
                onClick={() => {
                  onDelete(message.id, 'me')
                  setMenuOpen(false)
                }}
              >
                <Trash2 className="size-4 text-muted" />
                Delete for me
              </button>
              {message.fromMe ? (
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm font-semibold text-red-600 hover:bg-mist"
                  onClick={() => {
                    onDelete(message.id, 'everyone')
                    setMenuOpen(false)
                  }}
                >
                  <Trash2 className="size-4" />
                  Delete for everyone
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      {message.fromMe ? (
        <MemberAvatar name={authorName} src={authorAvatar} memberId={authorId} size="xs" />
      ) : null}
    </div>
  )
}

function AttachmentBubble({ file, fromMe }: { file: ChatAttachment; fromMe: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)

  if (file.kind === 'image' && file.url) {
    return (
      <a href={file.url} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl">
        <img src={file.url} alt={file.name} className="max-h-52 w-full object-cover" />
      </a>
    )
  }

  if (file.kind === 'video-note' && file.url) {
    return (
      <div className="p-2">
        <div className="relative size-44 overflow-hidden rounded-full bg-ink ring-2 ring-white/20 sm:size-52">
          <video
            src={file.url}
            className="size-full object-cover"
            controls
            playsInline
            preload="metadata"
          />
        </div>
        <p className={cn('mt-1.5 text-center text-[11px]', fromMe ? 'text-white/80' : 'text-muted')}>
          {file.sizeLabel}
        </p>
      </div>
    )
  }

  if (file.kind === 'audio' && file.url) {
    return (
      <div className="flex min-w-[220px] items-center gap-2 px-3 py-2.5">
        <button
          type="button"
          className={cn(
            'grid size-10 shrink-0 place-items-center rounded-full',
            fromMe ? 'bg-white/20 text-white' : 'bg-brand-light text-brand',
          )}
          aria-label={playing ? 'Pause voice note' : 'Play voice note'}
          onClick={() => {
            const audio = audioRef.current
            if (!audio) return
            if (audio.paused) {
              void audio.play()
              setPlaying(true)
            } else {
              audio.pause()
              setPlaying(false)
            }
          }}
        >
          {playing ? (
            <Pause className="size-4" fill="currentColor" />
          ) : (
            <Play className="size-4" fill="currentColor" />
          )}
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex h-6 items-center gap-0.5">
            {Array.from({ length: 22 }).map((_, index) => (
              <span
                key={index}
                className={cn('w-1 rounded-full', fromMe ? 'bg-white/55' : 'bg-brand/35')}
                style={{ height: `${5 + ((index * 5) % 12)}px` }}
              />
            ))}
          </div>
          <p className={cn('mt-0.5 text-[11px] tabular-nums', fromMe ? 'text-white/80' : 'text-muted')}>
            {file.sizeLabel || file.name}
          </p>
        </div>
        <audio
          ref={audioRef}
          src={file.url}
          preload="metadata"
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          onPlay={() => setPlaying(true)}
        />
      </div>
    )
  }

  if (file.kind === 'video' && file.url) {
    return (
      <div className="overflow-hidden rounded-2xl">
        <video src={file.url} controls playsInline className="max-h-52 w-full bg-ink" preload="metadata" />
      </div>
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
        <span className={cn('block text-[11px]', fromMe ? 'text-white/80' : 'text-muted')}>
          {file.sizeLabel}
        </span>
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
