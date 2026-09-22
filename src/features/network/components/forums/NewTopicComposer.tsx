import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { NetworkForumThread } from '@/features/network/data/types'
import { CURRENT_MEMBER_ID } from '@/features/network/data/members'
import {
  forumComposeFiltersComplete,
  type ForumFiltersState,
} from '@/features/network/data/forumFilters'
import { cn } from '@/shared/lib/cn'

const FORUM_TAG_OPTIONS = [
  'Commercial',
  'Real Estate',
  'Agent',
  'Markets',
  'Lending',
  'Execution',
  'Trust',
  'Crowdfunding',
  'Product',
] as const

type NewTopicComposerProps = {
  filters: ForumFiltersState
  onCancel: () => void
  onCreate: (thread: NetworkForumThread) => void
}

export function NewTopicComposer({ filters, onCancel, onCreate }: NewTopicComposerProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [customTag, setCustomTag] = useState('')

  const filtersComplete = forumComposeFiltersComplete(filters)
  const canPost = Boolean(title.trim() && body.trim() && filtersComplete)
  const customTags = tags.filter(
    (tag) => !(FORUM_TAG_OPTIONS as readonly string[]).includes(tag),
  )

  function toggleTag(tag: string) {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    )
  }

  function addCustomTag() {
    const next = customTag.trim()
    if (!next) return
    setTags((prev) => (prev.includes(next) ? prev : [...prev, next]))
    setCustomTag('')
  }

  function submit() {
    const trimmedTitle = title.trim()
    const trimmedBody = body.trim()
    if (!trimmedTitle || !trimmedBody || !filtersComplete) return

    const now = Date.now()
    const id = `f-local-${now}`
    onCreate({
      id,
      title: trimmedTitle,
      category: tags[0] ?? 'Discussion',
      replies: 0,
      views: 1,
      lastPost: 'Just now',
      lastPostAt: now,
      authorId: CURRENT_MEMBER_ID,
      likes: 0,
      excerpt: trimmedBody.slice(0, 140),
      body: trimmedBody,
      filters: {
        psp: filters.psp[0],
        role: filters.psp[0],
        field: filters.field[0],
        subField: filters.subField[0],
        priceDemography: filters.priceBand[0],
        representation: filters.representation[0],
        condition: filters.condition[0],
        deedLienNote: filters.deedLienNote[0],
        ownership: filters.ownership[0],
        tools: filters.tools[0],
        language: filters.language[0],
        motives: filters.motive[0],
      },
    })
  }

  return (
    <div className="flex h-full min-h-[160vh] flex-col px-4 py-4 sm:px-5 sm:py-5">
      {/* ~20% — tags / header */}
      <section className="flex shrink-0 flex-col">
        <p className="text-xs font-semibold text-ink">Tags</p>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {FORUM_TAG_OPTIONS.map((tag) => {
            const active = tags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={cn(
                  'rounded-lg border px-3 py-1.5 text-xs font-semibold transition',
                  active
                    ? 'border-brand bg-brand text-white'
                    : 'border-line bg-white text-ink hover:border-brand/40 hover:bg-mist/60',
                )}
              >
                {tag}
              </button>
            )
          })}
          {customTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className="rounded-lg border border-brand bg-brand px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-brand/90"
              title="Remove tag"
            >
              {tag} ×
            </button>
          ))}
        </div>

        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                addCustomTag()
              }
            }}
            placeholder="Add your own tag…"
            className="h-9 min-w-0 flex-1 rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-muted focus:ring-1 focus:ring-brand/30"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!customTag.trim()}
            onClick={addCustomTag}
          >
            Add
          </Button>
        </div>
      </section>

      <div className="mt-3 shrink-0">
        <Input
          label="Title"
          name="forum-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What should members discuss?"
        />
      </div>

      {/* Expanded body — majority of the compose panel */}
      <section className="mt-3 flex min-h-0 flex-1 flex-col">
        <label className="shrink-0 text-xs font-semibold text-ink">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share context, numbers, or the decision you need help with…"
          className="mt-1 min-h-[min(150vh,93rem)] w-full flex-1 resize-y rounded-lg border border-line bg-white px-3 py-3 text-sm leading-relaxed text-ink outline-none placeholder:text-muted focus:ring-1 focus:ring-brand/30"
        />
      </section>

      <div className="mt-4 flex shrink-0 flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" size="sm" disabled={!canPost} onClick={submit}>
          Post topic
        </Button>
      </div>
    </div>
  )
}
