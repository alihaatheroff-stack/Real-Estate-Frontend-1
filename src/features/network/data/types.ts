export type PostAudience = 'Public' | 'Friends' | 'Unanimous'

export type NetworkMember = {
  id: string
  name: string
  firstName: string
  handle: string
  title: string
  company: string
  city: string
  state: string
  avatar: string
  cover: string
  verified: boolean
  online: boolean
  bio: string
  buyBox: string
  friendsCount: number
  mutualCount: number
  joined: string
  languages: string[]
  friendIds: string[]
}

export type NetworkStory = {
  id: string
  memberId: string
  image: string
  viewed?: boolean
}

export type NetworkComment = {
  id: string
  memberId: string
  text: string
  timeAgo: string
  likes: number
  /** When true, show as Unanimous member instead of the real profile. */
  anonymous?: boolean
  /** Nested reply under another comment on the same post. */
  parentId?: string
}

export type NetworkPost = {
  id: string
  memberId: string
  timeAgo: string
  audience: PostAudience
  text: string
  image?: string
  images?: string[]
  videoLabel?: string
  feeling?: string
  location?: string
  likes: number
  comments: NetworkComment[]
  shares: number
  likedByMe?: boolean
}

export type NetworkGroup = {
  id: string
  name: string
  cover: string
  members: number
  privacy: 'Public' | 'Private'
  category: string
  description: string
  lastActive: string
  memberIds: string[]
}

export type NetworkForumThreadFilters = {
  /** A–Z PSP category (falls back to role when unset). */
  psp?: string
  community?: string
  role?: string
  field?: string
  /** Nested path, e.g. Recreational > Water Park or Lifestyle > Health > Clinic */
  subField?: string
  priceDemography?: string
  representation?: string
  condition?: string
  deedLienNote?: string
  ownership?: string
  tools?: string
  language?: string
  motives?: string
}

export type ForumReactionId = 'like' | 'love' | 'haha' | 'wow' | 'sad' | 'angry'

export type ForumReactionCounts = Partial<Record<ForumReactionId, number>>

export type NetworkForumReply = {
  id: string
  threadId: string
  authorId: string
  body: string
  createdAt: string
  /** Milliseconds for sorting */
  createdAtMs: number
  likes: number
  parentId?: string
  attachments?: ChatAttachment[]
  reactions?: ForumReactionCounts
}

export type NetworkForumThread = {
  id: string
  title: string
  category: string
  replies: number
  views: number
  lastPost: string
  /** Milliseconds for sorting “latest” */
  lastPostAt: number
  authorId: string
  excerpt: string
  body: string
  likes?: number
  reactions?: ForumReactionCounts
  pinned?: boolean
  recommended?: boolean
  winner?: boolean
  /** Commercial-forum facet tags used by search filters. */
  filters?: NetworkForumThreadFilters
}

export type NetworkArticle = {
  id: string
  title: string
  excerpt: string
  cover: string
  authorId: string
  readTime: string
  published: string
  tags: string[]
  body: string[]
  takeaways?: string[]
  requirements?: string[]
}

export type NetworkEvent = {
  id: string
  title: string
  date: string
  time: string
  location: string
  cover: string
  going: number
  interested: number
  hostId: string
  description: string
}

export type NetworkListing = {
  id: string
  title: string
  price: string
  location: string
  image: string
  sellerId: string
  category: string
}

export type ChatAttachment = {
  id: string
  name: string
  kind: 'image' | 'video' | 'file'
  url?: string
  sizeLabel: string
}

export type ChatMessage = {
  id: string
  fromMe: boolean
  fromMemberId?: string
  text: string
  time: string
  read?: boolean
  attachments?: ChatAttachment[]
}

export type NetworkChat = {
  id: string
  memberId?: string
  groupName?: string
  groupAvatar?: string
  groupMemberIds?: string[]
  preview: string
  timeAgo: string
  unread: number
  kind: 'direct' | 'group'
  section: 'recent' | 'earlier'
  typing?: boolean
  messages: ChatMessage[]
}

export type NetworkNotice = {
  id: string
  memberId: string
  text: string
  timeAgo: string
  unread: boolean
  href: string
  kind: 'like' | 'comment' | 'friend' | 'group' | 'event'
}

export type FriendRequest = {
  id: string
  memberId: string
  mutual: number
}

export type NetworkNote = {
  id: string
  title: string
  body: string
  tags: string[]
  pinned: boolean
  relatedMemberId?: string
  updatedAt: string
  createdAt: string
}
