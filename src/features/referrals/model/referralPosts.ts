export type ReferralPost = {
  id: string
  text: string
  images: string[]
  authorId: string
  authorName: string
  createdAt: string
}

const STORAGE_KEY = 'lcre.referralPosts'

type SaveReferralPostInput = {
  text: string
  images: string[]
  authorId: string
  authorName: string
}

function readPosts(): ReferralPost[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as ReferralPost[]
    return Array.isArray(parsed) ? parsed : []
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
  const post: ReferralPost = {
    id: `referral-post-${Date.now()}`,
    text: input.text,
    images: input.images.slice(0, 5),
    authorId: input.authorId,
    authorName: input.authorName,
    createdAt: new Date().toISOString(),
  }
  writePosts([post, ...readPosts()])
  return post
}
