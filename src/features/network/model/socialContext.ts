import { createContext } from 'react'
import type { NetworkChat, NetworkNote, NetworkPost, PostAudience } from '@/features/network/data/types'

export type FriendRequestAction = 'accepted' | 'declined'

export type NoteDraftInput = {
  title?: string
  body?: string
  tags?: string[]
  pinned?: boolean
  relatedMemberId?: string | null
}

export type NetworkSocialValue = {
  posts: NetworkPost[]
  chats: NetworkChat[]
  notes: NetworkNote[]
  unreadMessageCount: number
  friendResponses: Record<string, FriendRequestAction>
  addPost: (input: { text: string; audience: PostAudience; image?: string }) => void
  toggleLike: (postId: string) => void
  addComment: (postId: string, text: string) => void
  markChatRead: (chatId: string) => void
  createGroupChat: (input: { name: string; memberIds: string[] }) => string
  updateGroupChat: (
    chatId: string,
    input: { name?: string; avatar?: string | null; addMemberIds?: string[] },
  ) => void
  addNote: (input?: NoteDraftInput) => string
  updateNote: (noteId: string, input: NoteDraftInput) => void
  deleteNote: (noteId: string) => void
  togglePinNote: (noteId: string) => void
  respondToFriendRequest: (memberId: string, action: FriendRequestAction) => void
}

export const NetworkSocialContext = createContext<NetworkSocialValue | null>(null)
