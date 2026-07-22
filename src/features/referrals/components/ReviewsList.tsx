import { useMemo, useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { Review } from '@/entities/provider/types'
import { formatRating } from '@/shared/lib/format'
import { cn } from '@/shared/lib/cn'

type ReviewsListProps = {
  reviews: Review[]
  averageRating: number
  reviewCount: number
}

function Stars({
  value,
  size = 'md',
  interactive,
  onChange,
}: {
  value: number
  size?: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onChange?: (value: number) => void
}) {
  const sizeClass = size === 'lg' ? 'h-5 w-5' : size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'

  return (
    <div className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < Math.round(value)
        const star = (
          <Star
            className={cn(
              sizeClass,
              filled ? 'fill-accent text-accent' : 'fill-transparent text-line',
            )}
          />
        )
        if (!interactive) return <span key={index}>{star}</span>
        return (
          <button
            key={index}
            type="button"
            aria-label={`${index + 1} stars`}
            onClick={() => onChange?.(index + 1)}
            className="rounded p-0.5"
          >
            {star}
          </button>
        )
      })}
    </div>
  )
}

function ReviewAvatar({ author, avatar }: { author: string; avatar?: string }) {
  const [failed, setFailed] = useState(false)
  const initials = author
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (!avatar || failed) {
    return (
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-semibold text-brand-dark">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={avatar}
      alt={author}
      className="h-12 w-12 shrink-0 rounded-full object-cover"
      onError={() => setFailed(true)}
    />
  )
}

function ReviewItem({ review }: { review: Review }) {
  return (
    <article className="border-b border-line pb-6 last:border-0">
      <div className="flex items-start gap-3">
        <ReviewAvatar author={review.author} avatar={review.avatar} />
        <div className="min-w-0 flex-1 text-left">
          <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-1">
            <p className="font-semibold text-ink">{review.author}</p>
            <Stars value={review.rating} size="sm" />
            <span className="text-sm text-muted">{review.date}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">{review.comment}</p>
        </div>
      </div>
    </article>
  )
}

export function ReviewsList({ reviews, averageRating, reviewCount }: ReviewsListProps) {
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [remember, setRemember] = useState(true)

  const breakdown = useMemo(() => {
    const counts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter((review) => review.rating === star).length,
    }))
    const total = Math.max(reviews.length, 1)
    return counts.map((row) => ({
      ...row,
      percent: Math.round((row.count / total) * 100),
    }))
  }, [reviews])

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-start">
        <div className="rounded-2xl bg-[#fff4e8] px-6 py-8 text-left">
          <p className="font-display text-5xl font-bold text-accent">
            {formatRating(averageRating)}
          </p>
          <div className="mt-3 flex justify-start">
            <Stars value={averageRating} size="lg" />
          </div>
          <p className="mt-2 text-sm text-muted">
            {reviewCount} rating{reviewCount === 1 ? '' : 's'}
          </p>
        </div>

        <div className="space-y-3">
          {breakdown.map((row) => (
            <div key={row.star} className="grid grid-cols-[64px_1fr_40px] items-center gap-3 text-sm">
              <span className="text-left text-muted">{row.star} Star</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-mist">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${row.percent}%` }}
                />
              </div>
              <span className="text-right text-muted">{row.percent}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </div>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <h3 className="font-display text-xl font-bold text-ink">Add a review</h3>
        <div>
          <p className="mb-2 text-sm font-medium text-ink">Your Rating for this listing</p>
          <Stars value={rating} interactive onChange={setRating} size="lg" />
        </div>
        <label className="block space-y-1.5">
          <span className="text-sm font-medium text-ink">Your Comment</span>
          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Comment"
            rows={5}
            className="w-full rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Your Name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <Input
            label="Your Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <label className="flex items-start gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={remember}
            onChange={(event) => setRemember(event.target.checked)}
            className="mt-0.5 accent-[var(--color-brand)]"
          />
          Save my name, email, and website in this browser for the next time I comment.
        </label>
        <Button type="submit">Submit Review</Button>
      </form>
    </div>
  )
}
