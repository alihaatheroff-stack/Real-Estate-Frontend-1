import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { NetworkForumThread } from '@/features/network/data/types'
import { CURRENT_MEMBER_ID } from '@/features/network/data/members'
import { cn } from '@/shared/lib/cn'

type NewTopicDialogProps = {
  open: boolean
  onClose: () => void
  onCreate: (thread: NetworkForumThread) => void
}

export function NewTopicDialog({ open, onClose, onCreate }: NewTopicDialogProps) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('Markets')

  if (!open) return null

  function submit() {
    const trimmedTitle = title.trim()
    const trimmedBody = body.trim()
    if (!trimmedTitle || !trimmedBody) return

    const now = Date.now()
    const id = `f-local-${now}`
    onCreate({
      id,
      title: trimmedTitle,
      category,
      replies: 0,
      views: 1,
      lastPost: 'Just now',
      lastPostAt: now,
      authorId: CURRENT_MEMBER_ID,
      likes: 0,
      excerpt: trimmedBody.slice(0, 140),
      body: trimmedBody,
      filters: {
        community: 'County',
        role: 'Agent',
        field: 'Commercial',
        language: 'English',
      },
    })
    setTitle('')
    setBody('')
    setCategory('Markets')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-lg rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl',
          'border border-line',
        )}
      >
        <h2 className="font-display text-xl font-semibold text-ink">Start a new topic</h2>
        <p className="mt-1 text-sm text-muted">
          Post to Commercial Real Estate Agents. Saved locally for this session.
        </p>

        <label className="mt-4 block text-xs font-semibold text-ink">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 h-9 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:ring-1 focus:ring-brand/30"
        >
          {['Markets', 'Lending', 'Execution', 'Trust', 'Crowdfunding', 'Product'].map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <div className="mt-3">
          <Input
            label="Title"
            name="forum-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What should members discuss?"
          />
        </div>

        <label className="mt-3 block text-xs font-semibold text-ink">Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          placeholder="Share context, numbers, or the decision you need help with…"
          className="mt-1 w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink outline-none placeholder:text-muted focus:ring-1 focus:ring-brand/30"
        />

        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            disabled={!title.trim() || !body.trim()}
            onClick={submit}
          >
            Post topic
          </Button>
        </div>
      </div>
    </div>
  )
}
