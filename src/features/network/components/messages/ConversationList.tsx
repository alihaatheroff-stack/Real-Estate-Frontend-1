import { useEffect, useRef, useState } from 'react'
import { CheckCheck, PanelLeftClose, Search, SquarePen, UsersRound } from 'lucide-react'
import { ConversationAvatar } from '@/features/network/components/messages/ConversationAvatar'
import { getChatIdentity } from '@/features/network/components/messages/chatIdentity'
import { useNicknameVersion } from '@/features/network/model/nicknames'
import type { NetworkChat } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

export type InboxTab = 'all' | 'direct' | 'groups' | 'unread'

export function ConversationList({
  chats,
  activeId,
  tab,
  filter,
  counts,
  onTab,
  onFilter,
  onOpen,
  onCompose,
  onNewGroup,
  onCollapse,
}: {
  chats: NetworkChat[]
  activeId: string
  tab: InboxTab
  filter: string
  counts: { all: number; direct: number; groups: number; unread: number }
  onTab: (tab: InboxTab) => void
  onFilter: (value: string) => void
  onOpen: (id: string) => void
  onCompose: () => void
  onNewGroup: () => void
  onCollapse?: () => void
}) {
  const recent = chats.filter((chat) => chat.section !== 'earlier')
  const earlier = chats.filter((chat) => chat.section === 'earlier')
  const [composeOpen, setComposeOpen] = useState(false)
  const composeRef = useRef<HTMLDivElement>(null)
  useNicknameVersion()

  useEffect(() => {
    if (!composeOpen) return
    function onPointerDown(event: MouseEvent) {
      if (!composeRef.current?.contains(event.target as Node)) setComposeOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [composeOpen])

  const tabs: { id: InboxTab; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'direct', label: 'Direct', count: counts.direct },
    { id: 'groups', label: 'Groups', count: counts.groups },
    { id: 'unread', label: 'Unread', count: counts.unread },
  ]

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-5 pt-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-[28px] leading-none font-semibold text-ink">Messages</h1>
            <p className="mt-1.5 text-sm text-muted">Stay in touch with your team and community</p>
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            {onCollapse ? (
              <button
                type="button"
                onClick={onCollapse}
                className="hidden size-10 place-items-center rounded-xl text-muted transition hover:bg-mist md:grid"
                aria-label="Hide conversations"
                title="Hide conversations"
              >
                <PanelLeftClose className="size-5" strokeWidth={1.85} />
              </button>
            ) : null}
            <div ref={composeRef} className="relative">
              <button
                type="button"
                onClick={() => setComposeOpen((open) => !open)}
                className="grid size-10 shrink-0 place-items-center rounded-xl text-brand transition hover:bg-brand-light"
                aria-label="New message"
                aria-expanded={composeOpen}
              >
                <SquarePen className="size-5" strokeWidth={1.85} />
              </button>
              {composeOpen ? (
                <div className="absolute top-full right-0 z-20 mt-1.5 w-48 overflow-hidden rounded-2xl bg-white py-1.5 shadow-[0_12px_40px_rgba(15,31,26,0.12)] ring-1 ring-black/[0.06]">
                  <button
                    type="button"
                    onClick={() => {
                      setComposeOpen(false)
                      onCompose()
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-ink transition hover:bg-mist"
                  >
                    <SquarePen className="size-4 text-brand" strokeWidth={1.85} />
                    New message
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setComposeOpen(false)
                      onNewGroup()
                    }}
                    className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-sm font-medium text-ink transition hover:bg-mist"
                  >
                    <UsersRound className="size-4 text-brand" strokeWidth={1.85} />
                    New group
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4 flex w-full gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onTab(item.id)}
              className={cn(
                'inline-flex h-10 min-w-0 flex-1 items-center justify-center gap-1 rounded-full px-1.5 text-[17px] leading-none whitespace-nowrap transition',
                tab === item.id
                  ? 'bg-brand font-bold text-white'
                  : 'bg-[#F3F6F4] font-medium text-ink hover:bg-mist',
              )}
            >
              {item.label}
              {item.count > 0 ? (
                <span
                  className={cn(
                    'grid h-[18px] min-w-[18px] shrink-0 place-items-center rounded-full px-1 text-[10px] font-bold leading-none',
                    tab === item.id ? 'bg-white text-brand' : 'bg-brand text-white',
                  )}
                >
                  {item.count}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            id="network-conversation-search"
            value={filter}
            onChange={(event) => onFilter(event.target.value)}
            placeholder="Search conversations"
            className="h-11 w-full rounded-full bg-[#F3F6F4] pl-10 pr-4 text-sm text-ink outline-none ring-1 ring-transparent transition placeholder:text-muted focus:bg-white focus:ring-brand/30"
          />
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4 network-hide-scroll">
        {recent.length === 0 && earlier.length === 0 ? (
          <p className="px-2 py-10 text-center text-sm text-muted">No conversations match that search.</p>
        ) : null}

        <ConversationGroup chats={recent} activeId={activeId} onOpen={onOpen} />

        {earlier.length > 0 ? (
          <>
            <p className="px-3 pt-4 pb-2 text-xs font-semibold tracking-wide text-muted uppercase">Earlier</p>
            <ConversationGroup chats={earlier} activeId={activeId} onOpen={onOpen} />
          </>
        ) : null}
      </div>
    </div>
  )
}

function ConversationGroup({
  chats,
  activeId,
  onOpen,
}: {
  chats: NetworkChat[]
  activeId: string
  onOpen: (id: string) => void
}) {
  return (
    <ul className="space-y-1">
      {chats.map((chat) => {
        const identity = getChatIdentity(chat)
        const active = chat.id === activeId
        return (
          <li key={chat.id}>
            <button
              type="button"
              onClick={() => onOpen(chat.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition',
                active ? 'bg-brand-light/80' : 'hover:bg-mist/80',
              )}
            >
              <ConversationAvatar
                avatars={identity.avatars}
                title={identity.title}
                online={identity.online}
                isGroup={identity.isGroup}
                groupAvatar={identity.groupAvatar}
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate text-[15px] font-semibold text-ink">{identity.title}</span>
                  <span className="shrink-0 text-[11px] font-medium text-muted">{chat.timeAgo}</span>
                </span>
                <span className="mt-0.5 flex items-center gap-2">
                  <span
                    className={cn(
                      'min-w-0 flex-1 truncate text-sm',
                      chat.unread ? 'font-medium text-ink' : 'text-muted',
                    )}
                  >
                    {chat.preview}
                  </span>
                  {chat.unread ? (
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
                      {chat.unread}
                    </span>
                  ) : (
                    <CheckCheck className="size-4 shrink-0 text-brand" strokeWidth={2.2} />
                  )}
                </span>
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
