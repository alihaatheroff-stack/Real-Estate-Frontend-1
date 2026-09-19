import { getCurrentMember, getMember } from '@/features/network/data/members'
import type { NetworkChat, NetworkMember } from '@/features/network/data/types'

export type ChatIdentity = {
  title: string
  subtitle: string
  online: boolean
  member?: NetworkMember
  avatars: NetworkMember[]
  isGroup: boolean
  groupAvatar?: string
}

export function getChatIdentity(chat: NetworkChat): ChatIdentity {
  if (chat.kind === 'group') {
    const avatars = (chat.groupMemberIds ?? [])
      .map((id) => getMember(id))
      .filter((member): member is NetworkMember => member != null)
      .slice(0, 2)
    const count = chat.groupMemberIds?.length ?? avatars.length
    return {
      title: chat.groupName ?? 'Group',
      subtitle: `${count} members`,
      online: false,
      avatars,
      isGroup: true,
      groupAvatar: chat.groupAvatar,
    }
  }

  const member = chat.memberId ? getMember(chat.memberId) : undefined
  return {
    title: member?.name ?? 'Conversation',
    subtitle: member?.online ? 'Active now' : (member?.title ?? 'Direct message'),
    online: member?.online ?? false,
    member,
    avatars: member ? [member] : [],
    isGroup: false,
  }
}

export function matchesChatQuery(chat: NetworkChat, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const identity = getChatIdentity(chat)
  return (
    identity.title.toLowerCase().includes(q) ||
    chat.preview.toLowerCase().includes(q)
  )
}

export function getMessageAuthor(chat: NetworkChat, fromMemberId?: string) {
  if (fromMemberId) return getMember(fromMemberId)
  if (chat.memberId) return getMember(chat.memberId)
  return getChatIdentity(chat).member
}

export function getMe() {
  return getCurrentMember()
}
