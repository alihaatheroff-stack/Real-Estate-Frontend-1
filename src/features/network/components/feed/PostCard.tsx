import { useMemo, useState, type FormEvent } from 'react'
import {
  Bookmark,
  Earth,
  Ellipsis,
  Lock,
  MessageCircle,
  Share2,
  ThumbsUp,
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
import type { NetworkMember, NetworkPost } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

const audienceIcon = {
  Public: Earth,
  Friends: Users,
  Unanimous: Lock,
}

export function PostCard({ post }: { post: NetworkPost }) {
  const author = getMember(post.memberId)
  const me = getCurrentMember()
  const { toggleLike, addComment } = useNetworkSocial()
  const [comment, setComment] = useState('')
  const [showComments, setShowComments] = useState(post.comments.length > 0 && post.comments.length < 3)
  const [shared, setShared] = useState(false)
  const draft = useMemo(
    () =>
      networkPostFavoriteDraft(
        post,
        post.audience === 'Unanimous' ? { name: 'Unanimous member', avatar: '' } : author,
      ),
    [author, post],
  )
  const favorite = useFavoriteToggle(draft)

  if (!author) return null

  const AudienceIcon = audienceIcon[post.audience]
  const displayName = post.audience === 'Unanimous' ? 'Unanimous member' : author.name
  const photos = post.images ?? (post.image ? [post.image] : [])

  function submitComment(event: FormEvent) {
    event.preventDefault()
    addComment(post.id, comment)
    setComment('')
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
                <span>is {post.feeling}</span>
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
          <button type="button" className="rounded-full p-2 text-muted hover:bg-mist" aria-label="Post options">
            <Ellipsis className="h-5 w-5" />
          </button>
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
          {post.comments.map((item) => {
            const commenter = getMember(item.memberId)
            if (!commenter) return null
            return (
              <div key={item.id} className="flex gap-2">
                <MemberAvatar name={commenter.name} src={commenter.avatar} memberId={commenter.id} size="sm" />
                <div className="min-w-0">
                  <div className="rounded-2xl bg-[#F0F2F5] px-3 py-2">
                    <VerifiedName
                      name={commenter.name}
                      memberId={commenter.id}
                      verified={commenter.verified}
                      className="text-[13px]"
                    />
                    <p className="text-[13px] leading-snug text-ink">{item.text}</p>
                  </div>
                  <p className="mt-1 px-2 text-[12px] font-semibold text-muted">
                    Like · Reply · {item.timeAgo}
                  </p>
                </div>
              </div>
            )
          })}
          <CommentForm me={me} value={comment} onChange={setComment} onSubmit={submitComment} />
        </div>
      ) : (
        <div className="px-4 py-3">
          <CommentForm me={me} value={comment} onChange={setComment} onSubmit={submitComment} />
        </div>
      )}
      <FavoriteActionDialogs favorite={favorite} />
    </NetworkCard>
  )
}

function CommentForm({
  me,
  value,
  onChange,
  onSubmit,
}: {
  me: NetworkMember
  value: string
  onChange: (value: string) => void
  onSubmit: (event: FormEvent) => void
}) {
  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <MemberAvatar name={me.name} src={me.avatar} size="sm" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write a comment…"
        className="h-9 flex-1 rounded-full border border-[#C5CDD3] bg-[#F0F2F5] px-4 text-sm outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/25"
      />
    </form>
  )
}
