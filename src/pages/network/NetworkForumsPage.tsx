import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Eye,
  MessageSquare,
  Pin,
  Search,
  ThumbsUp,
  Trophy,
} from 'lucide-react'
import { PATHS, networkForumPath, networkProfilePath } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import {
  ForumFilterPanel,
  type ForumFiltersState,
} from '@/features/network/components/forums/ForumFilterPanel'
import { NewTopicDialog } from '@/features/network/components/forums/NewTopicDialog'
import {
  EMPTY_FORUM_FILTERS,
  filterForumThreads,
  forumFiltersActive,
} from '@/features/network/data/forumFilters'
import {
  NETWORK_FORUMS,
  getForum,
  getForumReplies,
  sortForumThreads,
  type ForumSortId,
} from '@/features/network/data/forums'
import { CURRENT_MEMBER_ID, getMember } from '@/features/network/data/members'
import type { NetworkForumReply, NetworkForumThread } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

const LOCAL_THREADS_KEY = 're-network-forum-local-threads'
const LOCAL_REPLIES_KEY = 're-network-forum-local-replies'

const SORT_TABS: { id: ForumSortId; label: string }[] = [
  { id: 'latest', label: 'Latest' },
  { id: 'most-comments', label: "Most Comment's" },
  { id: 'most-recommended', label: 'Most Recommended' },
  { id: 'other-suggestive', label: 'Other Suggestive' },
  { id: 'winners', label: "Winner's" },
]

function readLocalThreads(): NetworkForumThread[] {
  try {
    const raw = sessionStorage.getItem(LOCAL_THREADS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as NetworkForumThread[]
  } catch {
    return []
  }
}

function writeLocalThreads(threads: NetworkForumThread[]) {
  sessionStorage.setItem(LOCAL_THREADS_KEY, JSON.stringify(threads))
}

function readLocalReplies(threadId: string): NetworkForumReply[] {
  try {
    const raw = sessionStorage.getItem(LOCAL_REPLIES_KEY)
    if (!raw) return []
    const all = JSON.parse(raw) as NetworkForumReply[]
    return all.filter((reply) => reply.threadId === threadId)
  } catch {
    return []
  }
}

function appendLocalReply(reply: NetworkForumReply) {
  try {
    const raw = sessionStorage.getItem(LOCAL_REPLIES_KEY)
    const all = raw ? (JSON.parse(raw) as NetworkForumReply[]) : []
    all.push(reply)
    sessionStorage.setItem(LOCAL_REPLIES_KEY, JSON.stringify(all))
  } catch {
    /* ignore */
  }
}

function resolveThread(id: string): NetworkForumThread | undefined {
  return getForum(id) ?? readLocalThreads().find((thread) => thread.id === id)
}

export function NetworkForumsPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<ForumFiltersState>(EMPTY_FORUM_FILTERS)
  const [sort, setSort] = useState<ForumSortId>('latest')
  const [query, setQuery] = useState('')
  const [localThreads, setLocalThreads] = useState<NetworkForumThread[]>(() => readLocalThreads())
  const [composeOpen, setComposeOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)

  const threads = useMemo(
    () => [...localThreads, ...NETWORK_FORUMS],
    [localThreads],
  )

  const filtered = useMemo(() => {
    let list = filterForumThreads(threads, filters)
    const needle = query.trim().toLowerCase()
    if (needle) {
      list = list.filter(
        (thread) =>
          thread.title.toLowerCase().includes(needle) ||
          thread.excerpt.toLowerCase().includes(needle) ||
          thread.category.toLowerCase().includes(needle) ||
          thread.filters?.subField?.toLowerCase().includes(needle),
      )
    }
    return sortForumThreads(list, sort)
  }, [threads, filters, query, sort])

  const filtering = forumFiltersActive(filters) || Boolean(query.trim())

  return (
    <NetworkPageFrame
      hideRight
      left={
        <ForumFilterPanel
          filters={filters}
          onChange={setFilters}
          onSuggest={(nextSort) => setSort(nextSort)}
        />
      }
    >
      <div className="space-y-4">
        <NetworkCard>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-display text-3xl font-semibold">Forums</h1>
              <p className="mt-1 text-sm text-muted">
                Threaded discussions on strategy, markets, and execution — not scattered group chaos.
              </p>
            </div>
            <Button type="button" size="sm" onClick={() => setComposeOpen(true)}>
              New topic
            </Button>
          </div>

          <div className="relative mt-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topics, niches, or keywords…"
              className="h-10 w-full rounded-lg border border-line bg-white pl-9 pr-3 text-sm outline-none placeholder:text-muted focus:ring-1 focus:ring-brand/30"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {SORT_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSort(tab.id)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs font-semibold transition',
                  sort === tab.id
                    ? 'bg-brand text-white'
                    : 'bg-mist text-ink hover:bg-mist/80',
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </NetworkCard>

        <div className="xl:hidden">
          <ForumFilterPanel
            filters={filters}
            onChange={setFilters}
            onSuggest={(nextSort) => setSort(nextSort)}
          />
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <p className="text-xs font-semibold text-muted">
              {filtered.length} topic{filtered.length === 1 ? '' : 's'}
              {filtering ? ' matching' : ''}
            </p>
            {filtering ? (
              <button
                type="button"
                className="text-xs font-semibold text-brand hover:underline"
                onClick={() => {
                  setFilters(EMPTY_FORUM_FILTERS)
                  setQuery('')
                }}
              >
                Reset search & filters
              </button>
            ) : null}
          </div>

          {filtered.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-muted">
              No threads match. Clear filters or start a new topic.
            </p>
          ) : (
            filtered.map((thread) => {
              const author = getMember(thread.authorId)
              return (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => navigate(networkForumPath(thread.id))}
                  className="flex w-full gap-3 border-b border-line px-4 py-4 text-left last:border-0 hover:bg-mist/60"
                >
                  <MemberAvatar
                    name={author?.name ?? 'Member'}
                    src={author?.avatar ?? ''}
                    size="sm"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {thread.pinned ? (
                        <span className="inline-flex items-center gap-0.5 rounded bg-mist px-1.5 py-0.5 text-[10px] font-bold uppercase text-ink">
                          <Pin className="h-3 w-3" /> Pinned
                        </span>
                      ) : null}
                      {thread.winner ? (
                        <span className="inline-flex items-center gap-0.5 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand">
                          <Trophy className="h-3 w-3" /> Winner
                        </span>
                      ) : null}
                      {thread.recommended ? (
                        <span className="rounded bg-mist px-1.5 py-0.5 text-[10px] font-bold uppercase text-muted">
                          Recommended
                        </span>
                      ) : null}
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-brand">
                        {thread.category}
                      </span>
                    </div>
                    <h2 className="mt-1 font-semibold leading-snug text-ink">{thread.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{thread.excerpt}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                      <span>{author?.name ?? 'Member'}</span>
                      <span className="inline-flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {thread.replies}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {thread.views.toLocaleString()}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {thread.likes ?? 0}
                      </span>
                      <span>{thread.lastPost}</span>
                    </div>
                    {thread.filters?.subField ? (
                      <p className="mt-1.5 text-[11px] text-muted">{thread.filters.subField}</p>
                    ) : null}
                  </div>
                </button>
              )
            })
          )}
        </div>

        <NetworkCard>
          <h2 className="font-display text-xl font-semibold">
            Community; Comment, Testimonial
          </h2>
          <p className="mt-1 text-sm text-muted">
            What would you want to see more of, less of:
          </p>
          <textarea
            value={feedback}
            onChange={(event) => {
              setFeedback(event.target.value)
              setFeedbackSent(false)
            }}
            rows={3}
            placeholder="Share what belongs in this commercial agents forum…"
            className="mt-3 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:ring-1 focus:ring-brand/30"
          />
          <div className="mt-3 flex items-center gap-3">
            <Button
              type="button"
              size="sm"
              onClick={() => {
                if (!feedback.trim()) return
                setFeedback('')
                setFeedbackSent(true)
              }}
            >
              Submit Review
            </Button>
            {feedbackSent ? (
              <p className="text-xs font-medium text-brand">Thanks — review noted for this forum.</p>
            ) : null}
          </div>
        </NetworkCard>
      </div>

      <NewTopicDialog
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        onCreate={(thread) => {
          const next = [thread, ...readLocalThreads()]
          writeLocalThreads(next)
          setLocalThreads(next)
          navigate(networkForumPath(thread.id))
        }}
      />
    </NetworkPageFrame>
  )
}

export function NetworkForumThreadPage() {
  const { forumId } = useParams()
  const [thread, setThread] = useState<NetworkForumThread | undefined>(() =>
    forumId ? resolveThread(forumId) : undefined,
  )
  const [replies, setReplies] = useState<NetworkForumReply[]>(() => {
    if (!forumId) return []
    return [...getForumReplies(forumId), ...readLocalReplies(forumId)].sort(
      (a, b) => a.createdAtMs - b.createdAtMs,
    )
  })
  const [draft, setDraft] = useState('')
  const [likedThread, setLikedThread] = useState(false)
  const [likedReplies, setLikedReplies] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!forumId) return
    const found = resolveThread(forumId)
    if (found) {
      setThread({ ...found, views: found.views + 1 })
      setReplies(
        [...getForumReplies(forumId), ...readLocalReplies(forumId)].sort(
          (a, b) => a.createdAtMs - b.createdAtMs,
        ),
      )
    } else {
      setThread(undefined)
    }
  }, [forumId])

  const author = thread ? getMember(thread.authorId) : undefined

  if (!thread || !author) {
    return <Navigate to={PATHS.networkForums} replace />
  }

  const facets = thread.filters
  const topLevel = replies.filter((reply) => !reply.parentId)
  const childrenOf = (parentId: string) =>
    replies.filter((reply) => reply.parentId === parentId)

  function postReply() {
    const text = draft.trim()
    if (!text || !thread) return
    const now = Date.now()
    const reply: NetworkForumReply = {
      id: `r-local-${now}`,
      threadId: thread.id,
      authorId: CURRENT_MEMBER_ID,
      body: text,
      createdAt: 'Just now',
      createdAtMs: now,
      likes: 0,
    }
    appendLocalReply(reply)
    setReplies((current) => [...current, reply])
    setThread((current) =>
      current
        ? {
            ...current,
            replies: current.replies + 1,
            lastPost: 'Just now',
            lastPostAt: now,
          }
        : current,
    )
    setDraft('')
  }

  function toggleReplyLike(id: string) {
    setLikedReplies((current) => {
      const next = !current[id]
      setReplies((list) =>
        list.map((item) =>
          item.id === id
            ? { ...item, likes: Math.max(0, item.likes + (next ? 1 : -1)) }
            : item,
        ),
      )
      return { ...current, [id]: next }
    })
  }

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link
            to={PATHS.networkForums}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Forums
          </Link>
        </div>

        <NetworkCard>
          <div className="flex flex-wrap items-center gap-1.5">
            {thread.pinned ? (
              <span className="inline-flex items-center gap-0.5 rounded bg-mist px-1.5 py-0.5 text-[10px] font-bold uppercase text-ink">
                <Pin className="h-3 w-3" /> Pinned
              </span>
            ) : null}
            {thread.winner ? (
              <span className="inline-flex items-center gap-0.5 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-brand">
                <Trophy className="h-3 w-3" /> Winner
              </span>
            ) : null}
            <p className="text-xs font-semibold uppercase tracking-wide text-brand">
              {thread.category}
            </p>
          </div>
          <h1 className="mt-2 font-display text-3xl font-semibold leading-tight">{thread.title}</h1>
          {facets ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {[
                facets.community,
                facets.role,
                facets.field,
                facets.subField,
                facets.priceDemography,
                facets.representation,
                facets.condition,
                facets.deedLienNote,
                facets.ownership,
                facets.tools,
                facets.language,
                facets.motives,
              ]
                .filter(Boolean)
                .map((label) => (
                  <li
                    key={label}
                    className="rounded-md bg-mist px-2 py-0.5 text-[11px] font-semibold text-ink"
                  >
                    {label}
                  </li>
                ))}
            </ul>
          ) : null}

          <Link to={networkProfilePath(author.id)} className="mt-4 flex items-center gap-3">
            <MemberAvatar name={author.name} src={author.avatar} />
            <span>
              <span className="block text-sm font-semibold">{author.name}</span>
              <span className="text-xs text-muted">
                {thread.replies} replies · {thread.views.toLocaleString()} views · {thread.lastPost}
              </span>
            </span>
          </Link>

          <p className="mt-5 text-[15px] leading-relaxed text-ink">{thread.body}</p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setLikedThread((prev) => {
                  const next = !prev
                  setThread((current) =>
                    current
                      ? {
                          ...current,
                          likes: Math.max(0, (current.likes ?? 0) + (next ? 1 : -1)),
                        }
                      : current,
                  )
                  return next
                })
              }}
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition',
                likedThread
                  ? 'border-brand bg-brand/10 text-brand'
                  : 'border-line text-ink hover:border-brand/40',
              )}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
              {thread.likes ?? 0}
            </button>
          </div>
        </NetworkCard>

        <NetworkCard>
          <h2 className="font-semibold text-ink">Replies ({replies.length})</h2>

          <div className="mt-4 space-y-4">
            {topLevel.length === 0 ? (
              <p className="text-sm text-muted">No replies yet — start the conversation.</p>
            ) : (
              topLevel.map((reply) => {
                const replyAuthor = getMember(reply.authorId)
                const nested = childrenOf(reply.id)
                return (
                  <div key={reply.id} className="border-b border-line pb-4 last:border-0 last:pb-0">
                    <div className="flex gap-3">
                      <MemberAvatar
                        name={replyAuthor?.name ?? 'Member'}
                        src={replyAuthor?.avatar ?? ''}
                        size="sm"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-baseline gap-2">
                          <Link
                            to={networkProfilePath(reply.authorId)}
                            className="text-sm font-semibold text-ink hover:underline"
                          >
                            {replyAuthor?.name ?? 'Member'}
                          </Link>
                          <span className="text-xs text-muted">{reply.createdAt}</span>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-ink">{reply.body}</p>
                        <button
                          type="button"
                          onClick={() => toggleReplyLike(reply.id)}
                          className={cn(
                            'mt-2 inline-flex items-center gap-1 text-xs font-semibold',
                            likedReplies[reply.id] ? 'text-brand' : 'text-muted hover:text-ink',
                          )}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          {reply.likes}
                        </button>

                        {nested.map((child) => {
                          const childAuthor = getMember(child.authorId)
                          return (
                            <div
                              key={child.id}
                              className="mt-3 ml-2 border-l-2 border-line pl-3 sm:ml-4"
                            >
                              <div className="flex gap-2">
                                <MemberAvatar
                                  name={childAuthor?.name ?? 'Member'}
                                  src={childAuthor?.avatar ?? ''}
                                  size="sm"
                                />
                                <div>
                                  <div className="flex flex-wrap items-baseline gap-2">
                                    <span className="text-sm font-semibold">
                                      {childAuthor?.name ?? 'Member'}
                                    </span>
                                    <span className="text-xs text-muted">{child.createdAt}</span>
                                  </div>
                                  <p className="mt-1 text-sm text-ink">{child.body}</p>
                                  <button
                                    type="button"
                                    onClick={() => toggleReplyLike(child.id)}
                                    className={cn(
                                      'mt-1.5 inline-flex items-center gap-1 text-xs font-semibold',
                                      likedReplies[child.id]
                                        ? 'text-brand'
                                        : 'text-muted hover:text-ink',
                                    )}
                                  >
                                    <ThumbsUp className="h-3 w-3" />
                                    {child.likes}
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="mt-5 border-t border-line pt-4">
            <p className="text-sm font-semibold text-ink">Write a reply</p>
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={4}
              placeholder="Add your take, a number, or a follow-up question…"
              className="mt-2 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:ring-1 focus:ring-brand/30"
            />
            <div className="mt-2 flex justify-end">
              <Button type="button" size="sm" disabled={!draft.trim()} onClick={postReply}>
                Post reply
              </Button>
            </div>
          </div>
        </NetworkCard>
      </div>
    </NetworkPageFrame>
  )
}
