import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { NETWORK_CHATS, NETWORK_POSTS } from '@/features/network/data/feed'
import { NETWORK_NOTES } from '@/features/network/data/notes'
import { CURRENT_MEMBER_ID, getCurrentMember, getMember } from '@/features/network/data/members'
import type { ChatAttachment, NetworkChat, NetworkNote, NetworkPost, PostAudience } from '@/features/network/data/types'
import {
  NetworkSocialContext,
  type FriendRequestAction,
  type NoteDraftInput,
} from '@/features/network/model/socialContext'

function sortNotes(notes: NetworkNote[]) {
  return [...notes].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  })
}

export function NetworkSocialProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<NetworkPost[]>(NETWORK_POSTS)
  const [chats, setChats] = useState<NetworkChat[]>(NETWORK_CHATS)
  const [notes, setNotes] = useState<NetworkNote[]>(() => sortNotes(NETWORK_NOTES))
  const [friendResponses, setFriendResponses] = useState<Record<string, FriendRequestAction>>({})
  const [followingIds, setFollowingIds] = useState<string[]>(() => getCurrentMember().friendIds)

  const addPost = useCallback(
    (input: {
      text: string
      audience: PostAudience
      image?: string
      feeling?: string
      location?: string
    }) => {
      const next: NetworkPost = {
        id: `local-${Date.now()}`,
        memberId: CURRENT_MEMBER_ID,
        timeAgo: 'Just now',
        audience: input.audience,
        text: input.text,
        image: input.image,
        feeling: input.feeling,
        location: input.location,
        likes: 0,
        shares: 0,
        comments: [],
        likedByMe: false,
      }
      setPosts((current) => [next, ...current])
    },
    [],
  )

  const deletePost = useCallback((postId: string) => {
    setPosts((current) => current.filter((post) => post.id !== postId))
  }, [])

  const toggleLike = useCallback((postId: string) => {
    setPosts((current) =>
      current.map((post) => {
        if (post.id !== postId) return post
        const likedByMe = !post.likedByMe
        return {
          ...post,
          likedByMe,
          likes: likedByMe ? post.likes + 1 : Math.max(0, post.likes - 1),
        }
      }),
    )
  }, [])

  const addComment = useCallback(
    (postId: string, text: string, options?: { anonymous?: boolean; parentId?: string }) => {
      const trimmed = text.trim()
      if (!trimmed) return
      setPosts((current) =>
        current.map((post) => {
          if (post.id !== postId) return post
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `lc-${Date.now()}`,
                memberId: CURRENT_MEMBER_ID,
                text: trimmed,
                timeAgo: 'Just now',
                likes: 0,
                anonymous: options?.anonymous || undefined,
                parentId: options?.parentId,
              },
            ],
          }
        }),
      )
    },
    [],
  )

  const markChatRead = useCallback((chatId: string) => {
    setChats((current) =>
      current.map((chat) => (chat.id === chatId && chat.unread > 0 ? { ...chat, unread: 0 } : chat)),
    )
  }, [])

  const sendChatMessage = useCallback(
    (chatId: string, payload: { text: string; attachments: ChatAttachment[] }) => {
      const text = payload.text.trim()
      if (!text && payload.attachments.length === 0) return
      const next = {
        id: `local-${Date.now()}`,
        fromMe: true as const,
        text,
        time: 'Now',
        read: true,
        attachments: payload.attachments.length ? payload.attachments : undefined,
      }
      const preview = text || payload.attachments[0]?.name || 'Attachment'
      setChats((current) => {
        const index = current.findIndex((item) => item.id === chatId)
        if (index < 0) return current
        const chat = current[index]
        if (!chat) return current
        const updated = {
          ...chat,
          messages: [...chat.messages, next],
          preview,
          timeAgo: 'Now',
          unread: 0,
          section: 'recent' as const,
        }
        if (index === 0) return [updated, ...current.slice(1)]
        return [updated, ...current.slice(0, index), ...current.slice(index + 1)]
      })
    },
    [],
  )

  const createGroupChat = useCallback((input: { name: string; memberIds: string[] }) => {
    const name = input.name.trim() || 'New group'
    const memberIds = [...new Set(input.memberIds.filter(Boolean))]
    const id = `chat-group-${Date.now()}`
    const next: NetworkChat = {
      id,
      kind: 'group',
      section: 'recent',
      groupName: name,
      groupMemberIds: memberIds,
      preview: 'You created this group',
      timeAgo: 'Now',
      unread: 0,
      messages: [
        {
          id: `g-local-${Date.now()}`,
          fromMe: true,
          text: `You created group “${name}”`,
          time: 'Now',
          read: true,
        },
      ],
    }
    setChats((current) => [next, ...current])
    return id
  }, [])

  const updateGroupChat = useCallback(
    (chatId: string, input: { name?: string; avatar?: string | null; addMemberIds?: string[] }) => {
      setChats((current) =>
        current.map((chat) => {
          if (chat.id !== chatId || chat.kind !== 'group') return chat

          const nextName =
            input.name !== undefined ? input.name.trim() || chat.groupName || 'Group' : chat.groupName
          const nextAvatar =
            input.avatar === undefined
              ? chat.groupAvatar
              : input.avatar === null
                ? undefined
                : input.avatar

          const existingIds = chat.groupMemberIds ?? []
          const addedIds = [...new Set((input.addMemberIds ?? []).filter(Boolean))].filter(
            (id) => !existingIds.includes(id),
          )
          const nextMemberIds = addedIds.length ? [...existingIds, ...addedIds] : existingIds

          const nameChanged = nextName !== chat.groupName
          const avatarChanged = nextAvatar !== chat.groupAvatar
          const membersChanged = addedIds.length > 0
          if (!nameChanged && !avatarChanged && !membersChanged) return chat

          const notices: string[] = []
          if (nameChanged) notices.push(`You changed the group name to “${nextName}”`)
          if (avatarChanged) notices.push('You updated the group photo')
          if (membersChanged) {
            const names = addedIds
              .map((id) => getMember(id)?.name)
              .filter((value): value is string => Boolean(value))
            notices.push(
              names.length === 1
                ? `You added ${names[0]}`
                : names.length > 1
                  ? `You added ${names.slice(0, -1).join(', ')} and ${names.at(-1)}`
                  : `You added ${addedIds.length} members`,
            )
          }

          const stamp = Date.now()
          return {
            ...chat,
            groupName: nextName,
            groupAvatar: nextAvatar,
            groupMemberIds: nextMemberIds,
            preview: notices.at(-1) ?? chat.preview,
            timeAgo: 'Now',
            section: 'recent' as const,
            messages: [
              ...chat.messages,
              ...notices.map((text, index) => ({
                id: `g-edit-${stamp}-${index}`,
                fromMe: true as const,
                text,
                time: 'Now',
                read: true,
              })),
            ],
          }
        }),
      )
    },
    [],
  )

  const addNote = useCallback((input: NoteDraftInput = {}) => {
    const now = new Date().toISOString()
    const id = `note-local-${Date.now()}`
    const next: NetworkNote = {
      id,
      title: input.title?.trim() ?? '',
      body: input.body?.trim() ?? '',
      tags: input.tags ?? [],
      pinned: Boolean(input.pinned),
      relatedMemberId: input.relatedMemberId || undefined,
      updatedAt: now,
      createdAt: now,
    }
    setNotes((current) => sortNotes([next, ...current]))
    return id
  }, [])

  const updateNote = useCallback((noteId: string, input: NoteDraftInput) => {
    setNotes((current) =>
      sortNotes(
        current.map((note) => {
          if (note.id !== noteId) return note
          const nextTitle = input.title !== undefined ? input.title : note.title
          const nextBody = input.body !== undefined ? input.body : note.body
          const nextTags = input.tags !== undefined ? input.tags : note.tags
          const nextPinned = input.pinned !== undefined ? input.pinned : note.pinned
          const nextRelated =
            input.relatedMemberId === undefined
              ? note.relatedMemberId
              : input.relatedMemberId || undefined

          const unchanged =
            nextTitle === note.title &&
            nextBody === note.body &&
            nextPinned === note.pinned &&
            nextRelated === note.relatedMemberId &&
            nextTags.length === note.tags.length &&
            nextTags.every((tag, index) => tag === note.tags[index])

          if (unchanged) return note

          return {
            ...note,
            title: nextTitle,
            body: nextBody,
            tags: nextTags,
            pinned: nextPinned,
            relatedMemberId: nextRelated,
            updatedAt: new Date().toISOString(),
          }
        }),
      ),
    )
  }, [])

  const deleteNote = useCallback((noteId: string) => {
    setNotes((current) => current.filter((note) => note.id !== noteId))
  }, [])

  const togglePinNote = useCallback((noteId: string) => {
    setNotes((current) =>
      sortNotes(
        current.map((note) =>
          note.id === noteId
            ? { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() }
            : note,
        ),
      ),
    )
  }, [])

  const respondToFriendRequest = useCallback((memberId: string, action: FriendRequestAction) => {
    setFriendResponses((current) => ({ ...current, [memberId]: action }))
    if (action === 'accepted') {
      setFollowingIds((current) => (current.includes(memberId) ? current : [...current, memberId]))
    }
  }, [])

  const toggleFollow = useCallback((memberId: string) => {
    setFollowingIds((current) =>
      current.includes(memberId) ? current.filter((id) => id !== memberId) : [...current, memberId],
    )
  }, [])

  const unreadMessageCount = useMemo(
    () => chats.reduce((sum, chat) => sum + chat.unread, 0),
    [chats],
  )

  const value = useMemo(
    () => ({
      posts,
      chats,
      notes,
      unreadMessageCount,
      friendResponses,
      followingIds,
      addPost,
      deletePost,
      toggleLike,
      addComment,
      markChatRead,
      sendChatMessage,
      createGroupChat,
      updateGroupChat,
      addNote,
      updateNote,
      deleteNote,
      togglePinNote,
      respondToFriendRequest,
      toggleFollow,
    }),
    [
      posts,
      chats,
      notes,
      unreadMessageCount,
      friendResponses,
      followingIds,
      addPost,
      deletePost,
      toggleLike,
      addComment,
      markChatRead,
      sendChatMessage,
      createGroupChat,
      updateGroupChat,
      addNote,
      updateNote,
      deleteNote,
      togglePinNote,
      respondToFriendRequest,
      toggleFollow,
    ],
  )

  return <NetworkSocialContext.Provider value={value}>{children}</NetworkSocialContext.Provider>
}
