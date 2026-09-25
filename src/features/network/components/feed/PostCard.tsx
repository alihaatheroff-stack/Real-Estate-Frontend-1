import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import {
  Bookmark,
  Earth,
  Ellipsis,
  Lock,
  MessageCircle,
  Share2,
  ThumbsUp,
  Trash2,
  UserRound,
  Users,
} from 'lucide-react'
import { FavoriteActionDialogs } from '@/features/favorites/FavoriteActionDialogs'
import {
  networkPostFavoriteDraft,
  useFavoriteToggle,
} from '@/features/favorites/useFavoriteToggle'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { VerifiedName } from '@/features/network/components/shared/VerifiedName'
import { getCurrentMember, getMember } from '@/features/network/data/members'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import type { NetworkComment, NetworkMember, NetworkPost } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

const audienceIcon = {
  Public: Earth,
  Friends: Users,
  Unanimous: Lock,
}

export function PostCard({ post }: { post: NetworkPost }) {
  const author = getMember(post.memberId)
  const me = getCurrentMember()
  const { toggleLike, addComment, deletePost } = useNetworkSocial()
  const [comment, setComment] = useState('')
  const [commentAnonymous, setCommentAnonymous] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')
  const [replyAnonymous, setReplyAnonymous] = useState(false)
  const [showComments, setShowComments] = useState(post.comments.length > 0 && post.comments.length < 3)
  const [shared, setShared] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const isMine = post.memberId === me.id
  const draft = useMemo(
    () =>
      networkPostFavoriteDraft(
        post,
        post.audience === 'Unanimous' ? { name: 'Unanimous member', avatar: '' } : author,
      ),
    [author, post],
  )
  const favorite = useFavoriteToggle(draft)

  const topLevelComments = useMemo(
    () => post.comments.filter((item) => !item.parentId),
    [post.comments],
  )
  const repliesByParent = useMemo(() => {
    const map = new Map<string, NetworkComment[]>()
    for (const item of post.comments) {
      if (!item.parentId) continue
      const list = map.get(item.parentId) ?? []
      list.push(item)
      map.set(item.parentId, list)
    }
    return map
  }, [post.comments])

  useEffect(() => {
    if (!menuOpen) return
    function onPointerDown(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  if (!author) return null

  const AudienceIcon = audienceIcon[post.audience]
  const displayName = post.audience === 'Unanimous' ? 'Unanimous member' : author.name
  const photos = post.images ?? (post.image ? [post.image] : [])

  function submitComment(event: FormEvent) {
    event.preventDefault()
    addComment(post.id, comment, { anonymous: commentAnonymous })
    setComment('')
    setCommentAnonymous(false)
    setShowComments(true)
  }

  function submitReply(event: FormEvent, parentId: string) {
    event.preventDefault()
    addComment(post.id, replyText, { anonymous: replyAnonymous, parentId })
    setReplyText('')
    setReplyAnonymous(false)
    setReplyingTo(null)
    setShowComments(true)
  }

  function startReply(commentId: string) {
    setReplyingTo(commentId)
    setReplyText('')
    setReplyAnonymous(false)
    setShowComments(true)
  }

  return (
    <NetworkCard padded={false}>
      <div className="flex items-start gap-3 px-4 pt-3">
        {post.audience === 'Unanimous' ? (
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper">
            <Lock className="h-4 w-4" />
          </span>
        ) : (
          <MemberAvatar name={author.name} src={author.avatar} memberId={author.id} online={author.online} />
        )}
        <div className="min-w-0 flex-1">
          {post.audience === 'Unanimous' ? (
            <p className="font-semibold text-ink">Unanimous member</p>
          ) : (
            <VerifiedName name={displayName} memberId={author.id} verified={author.verified} />
          )}
          <p className="flex flex-wrap items-center gap-1 text-[13px] text-muted">
            <span>{post.timeAgo}</span>
            <span aria-hidden>·</span>
            <AudienceIcon className="h-3.5 w-3.5" />
            <span>{post.audience}</span>
            {post.location ? (
              <>
                <span aria-hidden>·</span>
                <span>{post.location}</span>
              </>
            ) : null}
            {post.feeling ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  {/^\d+\/10$/.test(post.feeling) ? `feeling ${post.feeling}` : `is ${post.feeling}`}
                </span>
              </>
            ) : null}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={favorite.toggleSave}
            className="rounded-full p-2 text-muted hover:bg-mist"
            aria-label={favorite.saved ? 'Unsave post' : 'Save post'}
            aria-pressed={favorite.saved}
          >
            <Bookmark className={cn('h-5 w-5', favorite.saved && 'fill-brand text-brand')} />
          </button>
          <div ref={menuRef} className="relative">
            <button
              type="button"
              className="rounded-full p-2 text-muted hover:bg-mist"
              aria-label="Post options"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <Ellipsis className="h-5 w-5" />
            </button>
            {menuOpen && isMine ? (
              <div
                role="menu"
                className="absolute right-0 top-full z-20 mt-1 w-40 overflow-hidden rounded-lg border border-line bg-white py-1 shadow-soft"
              >
                <button
                  type="button"
                  role="menuitem"
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-semibold text-red-600 hover:bg-mist"
                  onClick={() => deletePost(post.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  Delete post
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <p className="whitespace-pre-wrap px-4 py-3 text-[15px] leading-relaxed text-ink">{post.text}</p>

      {photos.length === 1 ? (
        <div className="relative bg-mist">
          <img src={photos[0]} alt="" className="max-h-[520px] w-full object-cover" />
          {post.videoLabel ? (
            <span className="absolute bottom-3 left-3 rounded-md bg-ink/80 px-2 py-1 text-xs font-semibold text-white">
              {post.videoLabel}
            </span>
          ) : null}
        </div>
      ) : null}

      {photos.length > 1 ? (
        <div className="grid grid-cols-2 gap-0.5 bg-mist">
          {photos.map((src) => (
            <img key={src} src={src} alt="" className="h-56 w-full object-cover" />
          ))}
        </div>
      ) : null}

      <div className="flex items-center justify-between px-4 py-2.5 text-[13px] text-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-white">
            <ThumbsUp className="h-3 w-3" />
          </span>
          {post.likes}
        </span>
        <span className="inline-flex gap-3">
          <button type="button" className="hover:underline" onClick={() => setShowComments(true)}>
            {post.comments.length} comments
          </button>
          <span>
            {post.shares + (shared ? 1 : 0)} shares
          </span>
        </span>
      </div>

      <div className="mx-3 grid grid-cols-3 border-y border-line/80">
        <button
          type="button"
          onClick={() => toggleLike(post.id)}
          className={cn(
            'inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition hover:bg-mist',
            post.likedByMe ? 'text-brand' : 'text-muted',
          )}
        >
          <ThumbsUp className={cn('h-5 w-5', post.likedByMe && 'fill-brand')} />
          Like
        </button>
        <button
          type="button"
          onClick={() => setShowComments(true)}
          className="inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-muted hover:bg-mist"
        >
          <MessageCircle className="h-5 w-5" />
          Comment
        </button>
        <button
          type="button"
          onClick={() => setShared(true)}
          className={cn(
            'inline-flex items-center justify-center gap-2 py-2.5 text-sm font-semibold hover:bg-mist',
            shared ? 'text-brand' : 'text-muted',
          )}
        >
          <Share2 className="h-5 w-5" />
          {shared ? 'Shared' : 'Share'}
        </button>
      </div>

      {showComments ? (
        <div className="space-y-3 px-4 py-3">
          {topLevelComments.map((item) => {
            const nested = repliesByParent.get(item.id) ?? []
            return (
              <div key={item.id} className="space-y-2">
                <CommentRow item={item} onReply={() => startReply(item.id)} />
                {nested.length > 0 ? (
                  <div className="ml-8 space-y-2 sm:ml-10">
                    {nested.map((reply) => (
                      <CommentRow
                        key={reply.id}
                        item={reply}
                        onReply={() => startReply(item.id)}
                      />
                    ))}
                  </div>
                ) : null}
                {replyingTo === item.id ? (
                  <div className="ml-8 sm:ml-10">
                    <CommentForm
                      me={me}
                      value={replyText}
                      onChange={setReplyText}
                      onSubmit={(event) => submitReply(event, item.id)}
                      anonymous={replyAnonymous}
                      onAnonymousChange={setReplyAnonymous}
                      placeholder="Write a reply…"
                      onCancel={() => {
                        setReplyingTo(null)
                        setReplyText('')
                        setReplyAnonymous(false)
                      }}
                    />
                  </div>
                ) : null}
              </div>
            )
          })}
          <CommentForm
            me={me}
            value={comment}
            onChange={setComment}
            onSubmit={submitComment}
            anonymous={commentAnonymous}
            onAnonymousChange={setCommentAnonymous}
          />
        </div>
      ) : (
        <div className="px-4 py-3">
          <CommentForm
            me={me}
            value={comment}
            onChange={setComment}
            onSubmit={submitComment}
            anonymous={commentAnonymous}
            onAnonymousChange={setCommentAnonymous}
          />
        </div>
      )}
      <FavoriteActionDialogs favorite={favorite} />
    </NetworkCard>
  )
}

function CommentRow({
  item,
  onReply,
}: {
  item: NetworkComment
  onReply: () => void
}) {
  const commenter = getMember(item.memberId)
  if (!commenter && !item.anonymous) return null

  const isAnonymous = Boolean(item.anonymous)
  const name = isAnonymous ? 'Unanimous member' : (commenter?.name ?? 'Member')

  return (
    <div className="flex gap-2">
      {isAnonymous ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
          <Lock className="h-3.5 w-3.5" />
        </span>
      ) : (
        <MemberAvatar
          name={name}
          src={commenter?.avatar ?? ''}
          memberId={commenter?.id}
          size="sm"
        />
      )}
      <div className="min-w-0">
        <div className="rounded-2xl bg-[#F0F2F5] px-3 py-2">
          {isAnonymous ? (
            <p className="text-[13px] font-semibold text-ink">{name}</p>
          ) : (
            <VerifiedName
              name={name}
              memberId={commenter?.id ?? item.memberId}
              verified={commenter?.verified}
              className="text-[13px]"
            />
          )}
          <p className="text-[13px] leading-snug text-ink">{item.text}</p>
        </div>
        <p className="mt-1 flex flex-wrap items-center gap-1 px-2 text-[12px] font-semibold text-muted">
          <button type="button" className="hover:underline">
            Like
          </button>
          <span aria-hidden>·</span>
          <button type="button" className="hover:underline" onClick={onReply}>
            Reply
          </button>
          <span aria-hidden>·</span>
          <span>{item.timeAgo}</span>
          {isAnonymous ? (
            <>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-0.5">
                <Lock className="h-3 w-3" />
                Unanimous
              </span>
            </>
          ) : null}
        </p>
      </div>
    </div>
  )
}

function CommentForm({
  me,
  value,
  onChange,
  onSubmit,
  anonymous,
  onAnonymousChange,
  placeholder = 'Write a comment…',
  onCancel,
}: {
  me: NetworkMember
  value: string
  onChange: (value: string) => void
  onSubmit: (event: FormEvent) => void
  anonymous: boolean
  onAnonymousChange: (value: boolean) => void
  placeholder?: string
  onCancel?: () => void
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-1.5">
      <div className="flex items-center gap-2">
        {anonymous ? (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-paper">
            <Lock className="h-3.5 w-3.5" />
          </span>
        ) : (
          <MemberAvatar name={me.name} src={me.avatar} size="sm" />
        )}
        <div className="relative flex min-w-0 flex-1 items-center">
          <button
            type="button"
            aria-label={anonymous ? 'Post as yourself' : 'Reply anonymously'}
            aria-pressed={anonymous}
            title={anonymous ? 'Posting as Unanimous' : 'Reply anonymously'}
            onClick={() => onAnonymousChange(!anonymous)}
            className={cn(
              'absolute left-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full transition',
              anonymous ? 'bg-brand-light text-brand' : 'text-muted hover:bg-white hover:text-brand',
            )}
          >
            {anonymous ? <Lock className="h-4 w-4" /> : <UserRound className="h-4 w-4" />}
          </button>
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={anonymous ? 'Write anonymously…' : placeholder}
            className="h-9 w-full rounded-full border border-[#C5CDD3] bg-[#F0F2F5] py-0 pl-11 pr-4 text-sm outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/25"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 pl-10">
        {anonymous ? (
          <p className="text-[11px] font-medium text-muted">
            Replying as <span className="text-ink">Unanimous member</span>
          </p>
        ) : (
          <p className="text-[11px] text-muted">Tap the icon to reply Anonymously</p>
        )}
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="ml-auto text-[12px] font-semibold text-muted hover:underline"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  )
}
