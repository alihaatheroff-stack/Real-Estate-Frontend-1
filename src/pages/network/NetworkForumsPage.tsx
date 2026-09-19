import { Link, Navigate, useParams } from 'react-router-dom'
import { PATHS, networkForumPath, networkProfilePath } from '@/app/router/paths'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NETWORK_FORUMS, getForum } from '@/features/network/data/community'
import { getMember } from '@/features/network/data/members'

export function NetworkForumsPage() {
  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <NetworkCard>
          <h1 className="font-display text-3xl font-semibold">Forums</h1>
          <p className="mt-1 text-sm text-muted">
            Threaded discussions on strategy, markets, and execution — not scattered group chaos.
          </p>
        </NetworkCard>
        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          {NETWORK_FORUMS.map((thread, index) => {
            const author = getMember(thread.authorId)
            return (
              <Link
                key={thread.id}
                to={networkForumPath(thread.id)}
                className="flex gap-4 border-b border-line px-4 py-4 last:border-0 hover:bg-mist/60"
              >
                <span className="hidden w-8 pt-1 text-sm font-semibold text-muted sm:block">{index + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-brand">{thread.category}</p>
                  <h2 className="mt-1 font-semibold leading-snug text-ink">{thread.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-muted">{thread.excerpt}</p>
                  <p className="mt-2 text-xs text-muted">
                    {author?.name} · {thread.replies} replies · {thread.views.toLocaleString()} views · {thread.lastPost}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </NetworkPageFrame>
  )
}

export function NetworkForumThreadPage() {
  const { forumId } = useParams()
  const thread = getForum(forumId ?? '')
  const author = thread ? getMember(thread.authorId) : undefined

  if (!thread || !author) return <Navigate to={PATHS.networkForums} replace />

  return (
    <NetworkPageFrame hideRight>
      <NetworkCard>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand">{thread.category}</p>
        <h1 className="mt-2 font-display text-3xl font-semibold leading-tight">{thread.title}</h1>
        <Link to={networkProfilePath(author.id)} className="mt-4 flex items-center gap-3">
          <MemberAvatar name={author.name} src={author.avatar} />
          <span>
            <span className="block text-sm font-semibold">{author.name}</span>
            <span className="text-xs text-muted">
              {thread.replies} replies · {thread.lastPost}
            </span>
          </span>
        </Link>
        <p className="mt-5 text-[15px] leading-relaxed text-ink">{thread.body}</p>
        <p className="mt-6 text-sm text-muted">
          More topics live inside this thread as the conversation branches — the way a professional forum should.
        </p>
      </NetworkCard>
    </NetworkPageFrame>
  )
}
