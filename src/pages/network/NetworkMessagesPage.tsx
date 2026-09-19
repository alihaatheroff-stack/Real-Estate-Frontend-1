import { useMemo, useState } from 'react'
import { ChatThread } from '@/features/network/components/messages/ChatThread'
import { ConversationList, type InboxTab } from '@/features/network/components/messages/ConversationList'
import { GroupInfoDialog } from '@/features/network/components/messages/GroupInfoDialog'
import { NewGroupDialog } from '@/features/network/components/messages/NewGroupDialog'
import { matchesChatQuery } from '@/features/network/components/messages/chatIdentity'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { cn } from '@/shared/lib/cn'
import type { ChatAttachment, ChatMessage } from '@/features/network/data/types'

export function NetworkMessagesPage() {
  const { chats, markChatRead, createGroupChat, updateGroupChat } = useNetworkSocial()
  const [activeId, setActiveId] = useState(chats[0]?.id ?? '')
  const [mobileThread, setMobileThread] = useState(false)
  const [listOpen, setListOpen] = useState(true)
  const [newGroupOpen, setNewGroupOpen] = useState(false)
  const [groupInfoOpen, setGroupInfoOpen] = useState(false)
  const [drafts, setDrafts] = useState<Record<string, ChatMessage[]>>({})
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('')
  const [tab, setTab] = useState<InboxTab>('all')

  const counts = useMemo(() => {
    const unreadMessages = chats.reduce((sum, chat) => sum + chat.unread, 0)
    return {
      all: unreadMessages,
      direct: chats.filter((chat) => chat.kind === 'direct' && chat.unread > 0).length,
      groups: chats.filter((chat) => chat.kind === 'group' && chat.unread > 0).length,
      unread: unreadMessages,
    }
  }, [chats])

  const visibleChats = useMemo(() => {
    return chats.filter((chat) => {
      if (!matchesChatQuery(chat, filter)) return false
      if (tab === 'direct') return chat.kind === 'direct'
      if (tab === 'groups') return chat.kind === 'group'
      if (tab === 'unread') return chat.unread > 0
      return true
    })
  }, [chats, filter, tab])

  const active = chats.find((chat) => chat.id === activeId) ?? visibleChats[0]
  const extra = active ? (drafts[active.id] ?? []) : []
  const thread = active ? [...active.messages, ...extra] : []

  function send(payload: { text: string; attachments: ChatAttachment[] }) {
    if (!active || (!payload.text && payload.attachments.length === 0)) return
    const next: ChatMessage = {
      id: `local-${Date.now()}`,
      fromMe: true,
      text: payload.text,
      time: 'Now',
      read: true,
      attachments: payload.attachments.length ? payload.attachments : undefined,
    }
    setDrafts((current) => ({ ...current, [active.id]: [...(current[active.id] ?? []), next] }))
    setText('')
  }

  function openChat(id: string) {
    markChatRead(id)
    setActiveId(id)
    setMobileThread(true)
    setText('')
  }

  function compose() {
    document.getElementById('network-conversation-search')?.focus()
  }

  function handleCreateGroup(input: { name: string; memberIds: string[] }) {
    const id = createGroupChat(input)
    setNewGroupOpen(false)
    setTab('groups')
    openChat(id)
    setListOpen(true)
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-1 gap-3 overflow-hidden bg-[#F3F6F4] p-3 pb-20 lg:gap-4 lg:p-4">
      <aside
        className={cn(
          'flex min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(15,31,26,0.06)] ring-1 ring-black/[0.04] md:w-[min(100%,440px)] md:shrink-0 md:transition-[width,opacity,margin] md:duration-200',
          mobileThread ? 'hidden md:flex' : 'flex',
          listOpen ? 'md:flex' : 'md:hidden',
        )}
      >
        <ConversationList
          chats={visibleChats}
          activeId={active?.id ?? ''}
          tab={tab}
          filter={filter}
          counts={counts}
          onTab={setTab}
          onFilter={setFilter}
          onOpen={openChat}
          onCompose={compose}
          onNewGroup={() => setNewGroupOpen(true)}
          onCollapse={() => setListOpen(false)}
        />
      </aside>

      <section
        className={cn(
          'min-h-0 min-w-0 flex-1 overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(15,31,26,0.06)] ring-1 ring-black/[0.04]',
          mobileThread ? 'flex flex-col' : 'hidden md:flex md:flex-col',
        )}
      >
        {active ? (
          <ChatThread
            chat={active}
            messages={thread}
            draft={text}
            onDraft={setText}
            onSend={send}
            onBack={() => setMobileThread(false)}
            listCollapsed={!listOpen}
            onExpandList={() => setListOpen(true)}
            onOpenInfo={active.kind === 'group' ? () => setGroupInfoOpen(true) : undefined}
          />
        ) : (
          <div className="grid flex-1 place-items-center text-sm text-muted">Select a conversation</div>
        )}
      </section>

      <NewGroupDialog
        open={newGroupOpen}
        onClose={() => setNewGroupOpen(false)}
        onCreate={handleCreateGroup}
      />

      <GroupInfoDialog
        open={groupInfoOpen}
        chat={active?.kind === 'group' ? active : null}
        onClose={() => setGroupInfoOpen(false)}
        onSave={(input) => {
          if (!active || active.kind !== 'group') return
          updateGroupChat(active.id, input)
        }}
      />
    </div>
  )
}
