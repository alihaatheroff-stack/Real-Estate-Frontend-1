import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Pin, Trash2, UserRound, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { NOTE_TAG_OPTIONS, formatNoteTimestamp, noteDisplayTitle } from '@/features/network/data/notes'
import { NETWORK_MEMBERS, getMember } from '@/features/network/data/members'
import { networkProfilePath } from '@/app/router/paths'
import type { NetworkNote } from '@/features/network/data/types'
import type { NoteDraftInput } from '@/features/network/model/socialContext'
import { cn } from '@/shared/lib/cn'

export function NoteEditor({
  note,
  onChange,
  onTogglePin,
  onDelete,
  onBack,
}: {
  note: NetworkNote
  onChange: (input: NoteDraftInput) => void
  onTogglePin: () => void
  onDelete: () => void
  onBack?: () => void
}) {
  const [title, setTitle] = useState(note.title)
  const [body, setBody] = useState(note.body)
  const [confirmDelete, setConfirmDelete] = useState(false)

  useEffect(() => {
    setTitle(note.title)
    setBody(note.body)
    setConfirmDelete(false)
  }, [note.id, note.title, note.body])

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if (title === note.title && body === note.body) return
      onChange({ title, body })
    }, 350)
    return () => window.clearTimeout(handle)
  }, [title, body, note.id, note.title, note.body, onChange])

  const related = note.relatedMemberId ? getMember(note.relatedMemberId) : undefined

  function toggleTag(tag: string) {
    const next = note.tags.includes(tag)
      ? note.tags.filter((item) => item !== tag)
      : [...note.tags, tag]
    onChange({ tags: next })
  }

  function setRelatedMember(memberId: string) {
    onChange({ relatedMemberId: memberId || null })
  }

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-line px-4 py-3">
        <div className="flex min-w-0 items-center gap-2">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="rounded-lg px-2 py-1.5 text-sm font-semibold text-brand hover:bg-brand-light md:hidden"
            >
              Notes
            </button>
          ) : null}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{noteDisplayTitle(note)}</p>
            <p className="text-xs text-muted">Updated {formatNoteTimestamp(note.updatedAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onTogglePin}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold transition',
              note.pinned
                ? 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                : 'bg-mist text-muted hover:bg-line/70 hover:text-ink',
            )}
          >
            <Pin className={cn('h-4 w-4', note.pinned && 'fill-current')} />
            {note.pinned ? 'Pinned' : 'Pin'}
          </button>
          {confirmDelete ? (
            <div className="flex items-center gap-1">
              <Button size="sm" variant="secondary" onClick={onDelete}>
                Delete
              </Button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="rounded-lg px-2 py-1.5 text-sm font-semibold text-muted hover:bg-mist"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-rose-700 hover:bg-rose-50"
              aria-label="Delete note"
            >
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Delete</span>
            </button>
          )}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Note title"
          className="w-full bg-transparent font-display text-2xl font-semibold text-ink outline-none placeholder:text-muted/50 sm:text-3xl"
        />

        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Write the follow-up, quote, checklist, or intro draft…"
          className="mt-4 min-h-[280px] w-full resize-none bg-transparent text-[15px] leading-relaxed text-ink outline-none placeholder:text-muted/60"
        />

        <div className="mt-6 space-y-4 border-t border-line pt-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Tags</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {NOTE_TAG_OPTIONS.map((tag) => {
                const active = note.tags.includes(tag)
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={cn(
                      'rounded-lg px-2.5 py-1.5 text-xs font-semibold transition',
                      active
                        ? 'bg-brand-light text-brand-dark'
                        : 'bg-mist text-muted hover:bg-line/70 hover:text-ink',
                    )}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted">Related member</p>
            {related ? (
              <div className="mt-2 flex items-center justify-between gap-3 rounded-xl border border-line bg-mist/40 px-3 py-2.5">
                <Link
                  to={networkProfilePath(related.id)}
                  className="flex min-w-0 items-center gap-2.5 hover:opacity-90"
                >
                  <MemberAvatar name={related.name} src={related.avatar} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink">{related.name}</p>
                    <p className="truncate text-xs text-muted">
                      {related.title} · {related.company}
                    </p>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setRelatedMember('')}
                  className="rounded-full p-1.5 text-muted hover:bg-white hover:text-ink"
                  aria-label="Remove related member"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <label className="mt-2 flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
                <UserRound className="h-4 w-4 shrink-0 text-muted" />
                <select
                  value=""
                  onChange={(event) => setRelatedMember(event.target.value)}
                  className="h-9 w-full bg-transparent text-sm text-ink outline-none"
                >
                  <option value="">Link a network member…</option>
                  {NETWORK_MEMBERS.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name} — {member.title}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
