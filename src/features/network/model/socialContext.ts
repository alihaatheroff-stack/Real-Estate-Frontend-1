import { createContext } from 'react'
import type {
  ChatAttachment,
  ChatCallLog,
  NetworkChat,
  NetworkNote,
  NetworkPost,
  PostAudience,
} from '@/features/network/data/types'

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
  followingIds: string[]
  addPost: (input: {
    text: string
    audience: PostAudience
    image?: string
    feeling?: string
    location?: string
  }) => void
  deletePost: (postId: string) => void
  toggleLike: (postId: string) => void
  addComment: (
    postId: string,
    text: string,
    options?: { anonymous?: boolean; parentId?: string },
  ) => void
  markChatRead: (chatId: string) => void
  sendChatMessage: (chatId: string, payload: { text: string; attachments: ChatAttachment[] }) => void
  logChatCall: (chatId: string, call: ChatCallLog) => void
  deleteChatMessage: (chatId: string, messageId: string, mode: 'me' | 'everyone') => void
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
  toggleFollow: (memberId: string) => void
}

export const NetworkSocialContext = createContext<NetworkSocialValue | null>(null)
