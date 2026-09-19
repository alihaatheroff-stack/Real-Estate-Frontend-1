import { Pin, Search } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import {
  formatNoteTimestamp,
  noteDisplayTitle,
  notePreview,
} from '@/features/network/data/notes'
import type { NetworkNote } from '@/features/network/data/types'

export type NotesFilter = 'all' | 'pinned'

export function NotesList({
  notes,
  activeId,
  filter,
  query,
  counts,
  onFilter,
  onQuery,
  onOpen,
  onCreate,
}: {
  notes: NetworkNote[]
  activeId: string
  filter: NotesFilter
  query: string
  counts: { all: number; pinned: number }
  onFilter: (filter: NotesFilter) => void
  onQuery: (query: string) => void
  onOpen: (id: string) => void
  onCreate: () => void
}) {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 space-y-3 border-b border-line px-4 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold text-ink">Notes</h1>
            <p className="mt-0.5 text-sm text-muted">Private deal notes and follow-ups.</p>
          </div>
          <button
            type="button"
            onClick={onCreate}
            className="shrink-0 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
          >
            New note
          </button>
        </div>

        <label className="relative block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            id="network-notes-search"
            value={query}
            onChange={(event) => onQuery(event.target.value)}
            placeholder="Search notes"
            className="h-10 w-full rounded-xl border border-line bg-mist/50 pl-9 pr-3 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-brand focus:bg-white focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <div className="flex gap-1 rounded-xl bg-mist p-1">
          {(
            [
              { id: 'all', label: 'All', count: counts.all },
              { id: 'pinned', label: 'Pinned', count: counts.pinned },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => onFilter(tab.id)}
              className={cn(
                'flex-1 rounded-lg px-3 py-1.5 text-sm font-semibold transition',
                filter === tab.id ? 'bg-white text-ink shadow-sm' : 'text-muted hover:text-ink',
              )}
            >
              {tab.label}
              <span className="ml-1 text-xs font-medium text-muted">{tab.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="px-4 py-10 text-center">
            <p className="text-sm font-semibold text-ink">No notes yet</p>
            <p className="mt-1 text-sm text-muted">
              {query.trim()
                ? 'Try a different search, or clear the filter.'
                : 'Capture a follow-up, DSCR quote, or deal checklist.'}
            </p>
            {!query.trim() ? (
              <button
                type="button"
                onClick={onCreate}
                className="mt-4 rounded-lg bg-brand px-3 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Create your first note
              </button>
            ) : null}
          </div>
        ) : (
          <ul className="divide-y divide-line/80">
            {notes.map((note) => {
              const active = note.id === activeId
              return (
                <li key={note.id}>
                  <button
                    type="button"
                    onClick={() => onOpen(note.id)}
                    className={cn(
                      'flex w-full flex-col gap-1 px-4 py-3 text-left transition',
                      active ? 'bg-brand-light/60' : 'hover:bg-mist/80',
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 truncate text-sm font-semibold text-ink">
                        {noteDisplayTitle(note)}
                      </p>
                      <span className="shrink-0 text-[11px] text-muted">
                        {formatNoteTimestamp(note.updatedAt)}
                      </span>
                    </div>
                    <p className="line-clamp-2 text-xs leading-relaxed text-muted">
                      {notePreview(note)}
                    </p>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5">
                      {note.pinned ? (
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-800">
                          <Pin className="h-3 w-3 fill-current" />
                          Pinned
                        </span>
                      ) : null}
                      {note.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-mist px-1.5 py-0.5 text-[10px] font-medium text-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
