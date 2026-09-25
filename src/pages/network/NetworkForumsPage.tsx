import { useEffect, useMemo, useRef, useState, type ChangeEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Camera,
  Check,
  Crown,
  Eye,
  File,
  FileText,
  Image as ImageIcon,
  Link2,
  MessageSquare,
  Pin,
  Plus,
  Search,
  ThumbsUp,
  Trophy,
  Video,
  X,
} from 'lucide-react'
import { networkProfilePath } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NetworkPageFrame } from '@/features/network/components/shell/NetworkPageFrame'
import { NewTopicComposer } from '@/features/network/components/forums/NewTopicComposer'
import { ForumTaxonomyPanel } from '@/features/network/components/forums/ForumTaxonomyPanel'
import { useContentRoutes } from '@/features/network/model/contentRoutes'
import {
  NetworkVerticalFilterRail,
  NetworkVerticalFilterStack,
} from '@/features/network/components/filters/NetworkVerticalFilterRail'
import {
  DEFAULT_FORUM_FILTERS,
  EMPTY_FORUM_FILTERS,
  filterForumThreads,
  forumFiltersActive,
  type ForumFiltersState,
} from '@/features/network/data/forumFilters'
import {
  NETWORK_FORUMS,
  getForum,
  getForumReplies,
  sortForumThreads,
  type ForumSortId,
} from '@/features/network/data/forums'
import { CURRENT_MEMBER_ID, getMember } from '@/features/network/data/members'
import type {
  ChatAttachment,
  ForumReactionId,
  NetworkForumReply,
  NetworkForumThread,
} from '@/features/network/data/types'
import {
  applyReactionChange,
  ForumReactions,
  reactionTotal,
} from '@/features/network/components/forums/ForumReactions'
import { cn } from '@/shared/lib/cn'

const LOCAL_THREADS_KEY = 're-network-forum-local-threads'
const LOCAL_REPLIES_KEY = 're-network-forum-local-replies'

const SORT_TABS: { id: ForumSortId; label: string }[] = [
  { id: 'latest', label: 'Latest' },
  { id: 'most-comments', label: "Most Comment's" },
  { id: 'most-recommended', label: 'Most Recommended' },
  { id: 'other-suggestive', label: 'Fields' },
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
  const { forumPath, forumsTitle } = useContentRoutes()
  const [filters, setFilters] = useState<ForumFiltersState>(DEFAULT_FORUM_FILTERS)
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
  const fieldsBrowse = filters.subField.length > 0

  function clearFieldsFilter() {
    setFilters({ ...filters, subField: [] })
  }

  function renderThreadRow(thread: NetworkForumThread) {
    const author = getMember(thread.authorId)
    return (
      <button
        key={thread.id}
        type="button"
        onClick={() => navigate(forumPath(thread.id))}
        className="flex w-full gap-3 border-t border-line/60 px-4 py-4 text-left hover:bg-mist/60 sm:px-5"
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
            <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wide text-brand/80">
              {thread.filters.subField}
            </p>
          ) : null}
        </div>
      </button>
    )
  }

  return (
    <NetworkPageFrame hideRight fill>
      <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(15,31,26,0.04)] xl:flex xl:min-h-0 xl:flex-1 xl:flex-col">
        <div className="grid items-stretch xl:h-full xl:min-h-0 xl:flex-1 xl:grid-cols-[minmax(230px,21rem)_minmax(0,1fr)] xl:grid-rows-[minmax(0,1fr)]">
          <NetworkVerticalFilterRail filters={filters} onChange={setFilters} />

          <div className="flex min-w-0 flex-col xl:h-full xl:min-h-0 xl:overflow-hidden">
            <div className="flex shrink-0 flex-wrap items-start justify-between gap-3 px-4 pb-2 pt-4 sm:px-5 sm:pb-2.5">
              <h1 className="font-display text-3xl font-semibold">
                {forumsTitle}
              </h1>
              {composeOpen ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setComposeOpen(false)
                    setFilters(DEFAULT_FORUM_FILTERS)
                  }}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    setFilters(EMPTY_FORUM_FILTERS)
                    setComposeOpen(true)
                  }}
                >
                  New topic
                </Button>
              )}
            </div>

            <div className="xl:min-h-0 xl:flex-1 xl:overflow-y-auto">
            {composeOpen ? (
              <>
                <NetworkVerticalFilterStack
                  className="border-b border-t-0"
                  filters={filters}
                  onChange={setFilters}
                />
                <NewTopicComposer
                  filters={filters}
                  onCancel={() => {
                    setComposeOpen(false)
                    setFilters(DEFAULT_FORUM_FILTERS)
                  }}
                  onCreate={(thread) => {
                    const next = [thread, ...readLocalThreads()]
                    writeLocalThreads(next)
                    setLocalThreads(next)
                    setComposeOpen(false)
                    setFilters(DEFAULT_FORUM_FILTERS)
                    navigate(forumPath(thread.id))
                  }}
                />
              </>
            ) : (
              <>
                <div className="px-4 pb-2 pt-1 sm:px-5 sm:pb-2.5">
                  <div className="relative">
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
                </div>

                <NetworkVerticalFilterStack filters={filters} onChange={setFilters} />

                {fieldsBrowse ? (
                  <div className="min-h-[32rem] border-t border-line/60">
                    <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 sm:px-5">
                      <div className="min-w-0">
                        <button
                          type="button"
                          onClick={clearFieldsFilter}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                        >
                          <ArrowLeft className="h-3.5 w-3.5" />
                          Back to Fields
                        </button>
                        <h2 className="mt-1.5 font-display text-xl font-semibold text-ink">
                          {filters.subField[0]}
                        </h2>
                        <p className="mt-0.5 text-xs text-muted">
                          {filtered.length} forum{filtered.length === 1 ? '' : 's'} in this category
                        </p>
                      </div>
                      <button
                        type="button"
                        className="shrink-0 text-xs font-semibold text-brand hover:underline"
                        onClick={clearFieldsFilter}
                      >
                        Change category
                      </button>
                    </div>

                    {filtered.length === 0 ? (
                      <p className="px-4 py-16 text-center text-sm text-muted sm:px-5">
                        No forums yet for {filters.subField.join(', ')}. Try another
                        Fields category or start a new topic.
                      </p>
                    ) : (
                      filtered.map(renderThreadRow)
                    )}
                  </div>
                ) : (
                  <>
                    <ForumTaxonomyPanel filters={filters} onChange={setFilters} />

                    <div className="border-t border-line/60">
                      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 sm:px-5">
                        <p className="text-xs font-semibold text-muted">
                          {filtered.length} topic{filtered.length === 1 ? '' : 's'}
                          {filtering ? ' matching' : ''}
                        </p>
                        {filtering ? (
                          <button
                            type="button"
                            className="shrink-0 text-xs font-semibold text-brand hover:underline"
                            onClick={() => {
                              setFilters(DEFAULT_FORUM_FILTERS)
                              setQuery('')
                            }}
                          >
                            Reset search & filters
                          </button>
                        ) : null}
                      </div>

                      {filtered.length === 0 ? (
                        <p className="px-4 py-10 text-center text-sm text-muted sm:px-5">
                          No threads match. Clear filters or start a new topic.
                        </p>
                      ) : (
                        filtered.map(renderThreadRow)
                      )}
                    </div>
                  </>
                )}

                <div className="border-t border-line/60 px-4 py-4 sm:px-5">
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
                      <p className="text-xs font-medium text-brand">
                        Thanks — review noted for this forum.
                      </p>
                    ) : null}
                  </div>
                </div>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
    </NetworkPageFrame>
  )
}

export function NetworkForumThreadPage() {
  const { forumId } = useParams()
  const { forumsList } = useContentRoutes()
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
  const [pendingAttachments, setPendingAttachments] = useState<ChatAttachment[]>([])
  const [attachOpen, setAttachOpen] = useState(false)
  const [aiIntervention, setAiIntervention] = useState(false)
  const [threadReaction, setThreadReaction] = useState<ForumReactionId | null>(null)
  const [replyReactions, setReplyReactions] = useState<Record<string, ForumReactionId | null>>({})
  const [replyingTo, setReplyingTo] = useState<{
    parentId: string
    name: string
  } | null>(null)
  const [nestedDraft, setNestedDraft] = useState('')
  const composeRootRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const nestedInputRef = useRef<HTMLTextAreaElement>(null)

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

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!composeRootRef.current?.contains(event.target as Node)) setAttachOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setAttachOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const author = thread ? getMember(thread.authorId) : undefined

  if (!thread || !author) {
    return <Navigate to={forumsList} replace />
  }

  const facets = thread.filters
  const topLevel = replies.filter((reply) => !reply.parentId)
  const childrenOf = (parentId: string) =>
    replies.filter((reply) => reply.parentId === parentId)
  const canPostReply = Boolean(draft.trim() || pendingAttachments.length)

  function openAttachFiles(mode: 'pdf' | 'image' | 'file' | 'camera' | 'video') {
    setAttachOpen(false)
    const input = fileInputRef.current
    if (!input) return
    input.accept =
      mode === 'image' || mode === 'camera'
        ? 'image/*'
        : mode === 'video'
          ? 'video/*'
          : mode === 'pdf'
            ? '.pdf,application/pdf'
            : '.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.zip,.ppt,.pptx'
    input.multiple = mode !== 'camera'
    if (mode === 'camera') input.setAttribute('capture', 'environment')
    else input.removeAttribute('capture')
    input.click()
  }

  function attachUrlLink() {
    setAttachOpen(false)
    const raw = window.prompt('Paste a URL / link')
    if (!raw) return
    const url = raw.trim()
    if (!url) return
    const normalized = /^https?:\/\//i.test(url) ? url : `https://${url}`
    setPendingAttachments((current) => [
      ...current,
      {
        id: `url-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        name: normalized,
        kind: 'file',
        url: normalized,
        sizeLabel: 'Link',
      },
    ])
  }

  function onAttachFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0) return
    setPendingAttachments((current) => [...current, ...files.map(fileToAttachment)])
  }

  function removePendingAttachment(id: string) {
    setPendingAttachments((current) => {
      const target = current.find((item) => item.id === id)
      if (target?.url) URL.revokeObjectURL(target.url)
      return current.filter((item) => item.id !== id)
    })
  }

  function postReply(parentId?: string, textOverride?: string) {
    const text = (textOverride ?? draft).trim()
    const attachments = parentId ? [] : pendingAttachments
    if ((!text && attachments.length === 0) || !thread) return
    const now = Date.now()
    const reply: NetworkForumReply = {
      id: `r-local-${now}`,
      threadId: thread.id,
      authorId: CURRENT_MEMBER_ID,
      body: text,
      createdAt: 'Just now',
      createdAtMs: now,
      likes: 0,
      parentId,
      attachments: attachments.length ? attachments : undefined,
      reactions: {},
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
    if (parentId) {
      setNestedDraft('')
      setReplyingTo(null)
    } else {
      setDraft('')
      setPendingAttachments([])
      setAttachOpen(false)
    }
  }

  function startNestedReply(parentId: string, authorId: string) {
    const name = getMember(authorId)?.name ?? 'Member'
    setReplyingTo({ parentId, name })
    setNestedDraft(`@${name} `)
    window.setTimeout(() => nestedInputRef.current?.focus(), 0)
  }

  function reactToThread(next: ForumReactionId | null) {
    setThreadReaction((prev) => {
      setThread((current) => {
        if (!current) return current
        const base = seedReactions(current.reactions, current.likes ?? 0)
        const reactions = applyReactionChange(base, prev, next)
        return {
          ...current,
          reactions,
          likes: reactionTotal(reactions, 0),
        }
      })
      return next
    })
  }

  function reactToReply(id: string, next: ForumReactionId | null) {
    setReplyReactions((current) => {
      const prev = current[id] ?? null
      setReplies((list) =>
        list.map((item) => {
          if (item.id !== id) return item
          const base = seedReactions(item.reactions, item.likes)
          const reactions = applyReactionChange(base, prev, next)
          return {
            ...item,
            reactions,
            likes: reactionTotal(reactions, 0),
          }
        }),
      )
      return { ...current, [id]: next }
    })
  }

  return (
    <NetworkPageFrame hideRight>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link
            to={forumsList}
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
            <ForumReactions
              reactions={thread.reactions}
              likes={thread.likes}
              myReaction={threadReaction}
              onReact={reactToThread}
            />
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
                        {reply.body ? (
                          <p className="mt-1.5 text-sm leading-relaxed text-ink">{reply.body}</p>
                        ) : null}
                        {reply.attachments?.length ? (
                          <ForumReplyAttachmentList attachments={reply.attachments} />
                        ) : null}
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <ForumReactions
                            size="sm"
                            reactions={reply.reactions}
                            likes={reply.likes}
                            myReaction={replyReactions[reply.id] ?? null}
                            onReact={(next) => reactToReply(reply.id, next)}
                          />
                          <button
                            type="button"
                            onClick={() => startNestedReply(reply.id, reply.authorId)}
                            className="text-xs font-semibold text-muted hover:text-brand"
                          >
                            Reply
                          </button>
                        </div>

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
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-baseline gap-2">
                                    <Link
                                      to={networkProfilePath(child.authorId)}
                                      className="text-sm font-semibold text-ink hover:underline"
                                    >
                                      {childAuthor?.name ?? 'Member'}
                                    </Link>
                                    <span className="text-xs text-muted">{child.createdAt}</span>
                                  </div>
                                  {child.body ? (
                                    <p className="mt-1 text-sm text-ink">{child.body}</p>
                                  ) : null}
                                  {child.attachments?.length ? (
                                    <ForumReplyAttachmentList attachments={child.attachments} />
                                  ) : null}
                                  <div className="mt-1.5 flex flex-wrap items-center gap-3">
                                    <ForumReactions
                                      size="sm"
                                      reactions={child.reactions}
                                      likes={child.likes}
                                      myReaction={replyReactions[child.id] ?? null}
                                      onReact={(next) => reactToReply(child.id, next)}
                                    />
                                    <button
                                      type="button"
                                      onClick={() => startNestedReply(reply.id, child.authorId)}
                                      className="text-xs font-semibold text-muted hover:text-brand"
                                    >
                                      Reply
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}

                        {replyingTo?.parentId === reply.id ? (
                          <div className="mt-3 ml-2 rounded-lg border border-line bg-mist/40 p-3 sm:ml-4">
                            <p className="text-[11px] font-semibold text-muted">
                              Replying to {replyingTo.name}
                              <button
                                type="button"
                                className="ml-2 font-semibold text-brand hover:underline"
                                onClick={() => {
                                  setReplyingTo(null)
                                  setNestedDraft('')
                                }}
                              >
                                Cancel
                              </button>
                            </p>
                            <textarea
                              ref={nestedInputRef}
                              value={nestedDraft}
                              onChange={(e) => setNestedDraft(e.target.value)}
                              rows={3}
                              placeholder="Write a reply…"
                              className="mt-2 w-full resize-y rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:ring-1 focus:ring-brand/30"
                            />
                            <div className="mt-2 flex justify-end">
                              <Button
                                type="button"
                                size="sm"
                                disabled={!nestedDraft.trim()}
                                onClick={() => postReply(reply.id, nestedDraft)}
                              >
                                Post reply
                              </Button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          <div className="mt-5 border-t border-line pt-4">
            <div className="flex flex-col gap-1">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-muted">
                AI Intervention
                <Crown className="h-3 w-3 text-accent" aria-hidden />
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  role="switch"
                  aria-checked={aiIntervention}
                  aria-label="AI Intervention Powered by Deepseek (Premium)"
                  title="Premium feature"
                  onClick={() => setAiIntervention((prev) => !prev)}
                  className={cn(
                    'relative h-7 w-12 shrink-0 rounded-full transition-colors',
                    aiIntervention ? 'bg-ink' : 'bg-line',
                  )}
                >
                  <span
                    className={cn(
                      'absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-all',
                      aiIntervention ? 'left-[1.35rem]' : 'left-0.5',
                    )}
                  >
                    {aiIntervention ? (
                      <Check className="h-3 w-3 text-ink" strokeWidth={3} aria-hidden />
                    ) : null}
                  </span>
                </button>
                <span className="text-xs font-medium text-muted">Powered by v4-Flash Deepseek</span>
              </div>
            </div>
            <div
              ref={composeRootRef}
              className="relative mt-3 rounded-lg border border-line bg-white focus-within:ring-1 focus-within:ring-brand/30"
            >
              <input
                ref={fileInputRef}
                type="file"
                className="sr-only"
                onChange={onAttachFiles}
              />

              {pendingAttachments.length > 0 ? (
                <ul className="flex gap-2 overflow-x-auto border-b border-line px-3 pt-3 pb-2 network-hide-scroll">
                  {pendingAttachments.map((file) => (
                    <li
                      key={file.id}
                      className="relative flex min-w-0 shrink-0 items-center gap-2 rounded-2xl bg-[#F3F6F4] py-1.5 pr-8 pl-1.5 ring-1 ring-black/[0.04]"
                    >
                      {file.kind === 'image' && file.url ? (
                        <img src={file.url} alt="" className="size-10 rounded-xl object-cover" />
                      ) : (
                        <span className="grid size-10 place-items-center rounded-xl bg-white text-brand">
                          {file.kind === 'video' ? (
                            <Video className="size-4" />
                          ) : (
                            <FileText className="size-4" />
                          )}
                        </span>
                      )}
                      <span className="max-w-[120px]">
                        <span className="block truncate text-xs font-semibold text-ink">
                          {file.name}
                        </span>
                        <span className="block text-[11px] text-muted">{file.sizeLabel}</span>
                      </span>
                      <button
                        type="button"
                        className="absolute top-1 right-1 grid size-5 place-items-center rounded-full bg-white text-muted hover:text-ink"
                        aria-label={`Remove ${file.name}`}
                        onClick={() => removePendingAttachment(file.id)}
                      >
                        <X className="size-3" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}

              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={4}
                placeholder="Add your take, a number, or a follow-up question…"
                className="w-full resize-y rounded-lg border-0 bg-transparent px-3 pb-12 pt-2 text-sm text-ink outline-none placeholder:text-muted"
              />
              <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                <div className="relative">
                  {attachOpen ? (
                    <div className="absolute bottom-[calc(100%+6px)] left-0 z-20 min-w-[200px] overflow-hidden rounded-2xl bg-white py-2 shadow-[0_8px_28px_rgba(15,23,42,0.14)]">
                      <ForumAttachOption
                        icon={Link2}
                        label="Add URL / link"
                        onClick={attachUrlLink}
                      />
                      <ForumAttachOption
                        icon={FileText}
                        label="Upload PDF"
                        onClick={() => openAttachFiles('pdf')}
                      />
                      <ForumAttachOption
                        icon={ImageIcon}
                        label="Upload image"
                        onClick={() => openAttachFiles('image')}
                      />
                      <ForumAttachOption
                        icon={Video}
                        label="Upload video"
                        onClick={() => openAttachFiles('video')}
                      />
                      <ForumAttachOption
                        icon={Camera}
                        label="Take photo"
                        onClick={() => openAttachFiles('camera')}
                      />
                      <ForumAttachOption
                        icon={File}
                        label="Upload file"
                        onClick={() => openAttachFiles('file')}
                      />
                    </div>
                  ) : null}
                  <button
                    type="button"
                    className="grid size-9 shrink-0 place-items-center rounded-full border border-black bg-[#E5E7EB] text-[#111827] transition hover:bg-[#D1D5DB]"
                    aria-label="Attach file"
                    aria-expanded={attachOpen}
                    onClick={() => setAttachOpen((open) => !open)}
                  >
                    <Plus className="size-[18px]" strokeWidth={2} />
                  </button>
                </div>
                <Button type="button" size="sm" disabled={!canPostReply} onClick={() => postReply()}>
                  Post reply
                </Button>
              </div>
            </div>
          </div>
        </NetworkCard>
      </div>
    </NetworkPageFrame>
  )
}

function seedReactions(
  reactions: NetworkForumReply['reactions'] | NetworkForumThread['reactions'],
  likes: number,
) {
  if (reactions && Object.keys(reactions).length > 0) return { ...reactions }
  if (likes > 0) return { like: likes as number }
  return {}
}

function ForumReplyAttachmentList({ attachments }: { attachments: ChatAttachment[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-2">
      {attachments.map((file) => (
        <li key={file.id}>
          {file.kind === 'image' && file.url ? (
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="block overflow-hidden rounded-xl ring-1 ring-black/[0.06]"
            >
              <img src={file.url} alt={file.name} className="h-28 max-w-[220px] object-cover" />
            </a>
          ) : file.kind === 'video' && file.url ? (
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="flex max-w-[220px] items-center gap-2 rounded-xl bg-[#F3F6F4] px-3 py-2 ring-1 ring-black/[0.04]"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-white text-brand">
                <Video className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-semibold text-ink">{file.name}</span>
                <span className="block text-[11px] text-muted">{file.sizeLabel}</span>
              </span>
            </a>
          ) : (
            <a
              href={file.url}
              target="_blank"
              rel="noreferrer"
              className="flex max-w-[220px] items-center gap-2 rounded-xl bg-[#F3F6F4] px-3 py-2 ring-1 ring-black/[0.04]"
            >
              <span className="grid size-9 place-items-center rounded-lg bg-white text-brand">
                <FileText className="size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-xs font-semibold text-ink">{file.name}</span>
                <span className="block text-[11px] text-muted">{file.sizeLabel}</span>
              </span>
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}

function ForumAttachOption({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Link2
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3.5 px-4 py-3 text-left text-[15px] font-normal leading-none text-[#2D2D5F] transition hover:bg-[#F3F4F6]"
    >
      <Icon className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden />
      <span>{label}</span>
    </button>
  )
}

function fileToAttachment(file: File): ChatAttachment {
  const kind: ChatAttachment['kind'] = file.type.startsWith('image/')
    ? 'image'
    : file.type.startsWith('video/')
      ? 'video'
      : 'file'
  return {
    id: `${file.name}-${file.size}-${file.lastModified}-${Math.random().toString(36).slice(2, 7)}`,
    name: file.name,
    kind,
    url: URL.createObjectURL(file),
    sizeLabel: formatAttachmentSize(file.size),
  }
}

function formatAttachmentSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
