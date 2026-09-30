export type ReferralAttachmentKind = 'photo' | 'video' | 'pdf'

export type ReferralAttachment = {
  id: string
  kind: ReferralAttachmentKind
  name: string
  url: string
  mimeType: string
}

export type ReferralPost = {
  id: string
  text: string
  /** @deprecated Prefer `attachments`. Kept for older saved posts. */
  images: string[]
  attachments: ReferralAttachment[]
  authorId: string
  authorName: string
  createdAt: string
}

const STORAGE_KEY = 'lcre.referralPosts'
const MAX_ATTACHMENTS = 5

type SaveReferralPostInput = {
  text: string
  attachments: ReferralAttachment[]
  authorId: string
  authorName: string
}

function readPosts(): ReferralPost[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ReferralPost[]
    if (!Array.isArray(parsed)) return []
    return parsed.map((post) => {
      const attachments =
        post.attachments?.length > 0
          ? post.attachments
          : (post.images ?? []).map((url, index) => ({
              id: `${post.id}-img-${index}`,
              kind: 'photo' as const,
              name: `Photo ${index + 1}`,
              url,
              mimeType: 'image/*',
            }))
      return {
        ...post,
        attachments,
        images: attachments.filter((item) => item.kind === 'photo').map((item) => item.url),
      }
    })
  } catch {
    return []
  }
}

function writePosts(posts: ReferralPost[]) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  window.dispatchEvent(new CustomEvent('referral-posts-updated'))
}

export function listReferralPosts(): ReferralPost[] {
  return readPosts()
}

export function saveReferralPost(input: SaveReferralPostInput): ReferralPost {
  const attachments = input.attachments.slice(0, MAX_ATTACHMENTS)
  const post: ReferralPost = {
    id: `referral-post-${Date.now()}`,
    text: input.text,
    attachments,
    images: attachments.filter((item) => item.kind === 'photo').map((item) => item.url),
    authorId: input.authorId,
    authorName: input.authorName,
    createdAt: new Date().toISOString(),
  }
  writePosts([post, ...readPosts()])
  return post
}

export { MAX_ATTACHMENTS }
