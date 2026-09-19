import { useMemo, useState } from 'react'
import { NotebookPen } from 'lucide-react'
import { NoteEditor } from '@/features/network/components/notes/NoteEditor'
import { NotesList, type NotesFilter } from '@/features/network/components/notes/NotesList'
import { matchesNoteQuery } from '@/features/network/data/notes'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import { cn } from '@/shared/lib/cn'

export function NetworkNotesPage() {
  const { notes, addNote, updateNote, deleteNote, togglePinNote } = useNetworkSocial()
  const [activeId, setActiveId] = useState(notes[0]?.id ?? '')
  const [mobileEditor, setMobileEditor] = useState(false)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<NotesFilter>('all')

  const counts = useMemo(
    () => ({
      all: notes.length,
      pinned: notes.filter((note) => note.pinned).length,
    }),
    [notes],
  )

  const visibleNotes = useMemo(() => {
    return notes.filter((note) => {
      if (filter === 'pinned' && !note.pinned) return false
      return matchesNoteQuery(note, query)
    })
  }, [notes, filter, query])

  const active =
    notes.find((note) => note.id === activeId) ??
    visibleNotes[0] ??
    notes[0] ??
    null

  function openNote(id: string) {
    setActiveId(id)
    setMobileEditor(true)
  }

  function createNote() {
    const id = addNote({ title: '', body: '' })
    setFilter('all')
    setQuery('')
    openNote(id)
  }

  function handleDelete() {
    if (!active) return
    const index = notes.findIndex((note) => note.id === active.id)
    const fallback = notes[index + 1] ?? notes[index - 1]
    deleteNote(active.id)
    setActiveId(fallback?.id ?? '')
    setMobileEditor(false)
  }

  return (
    <div className="flex h-full min-h-0 w-full min-w-0 flex-1 overflow-hidden bg-[#F3F6F4] p-3 pb-20 lg:p-4">
      <div className="flex h-full min-h-0 w-full min-w-0 flex-1 overflow-hidden rounded-[28px] bg-white shadow-[0_12px_40px_rgba(15,31,26,0.06)] ring-1 ring-black/[0.04]">
        <aside
          className={cn(
            'flex h-full min-h-0 w-full shrink-0 flex-col border-line md:w-[320px] md:border-r',
            mobileEditor ? 'hidden md:flex' : 'flex',
          )}
        >
          <NotesList
            notes={visibleNotes}
            activeId={active?.id ?? ''}
            filter={filter}
            query={query}
            counts={counts}
            onFilter={setFilter}
            onQuery={setQuery}
            onOpen={openNote}
            onCreate={createNote}
          />
        </aside>

        <section
          className={cn(
            'h-full min-h-0 min-w-0 w-full flex-1 flex-col',
            mobileEditor ? 'flex' : 'hidden md:flex',
          )}
        >
          {active ? (
            <NoteEditor
              note={active}
              onChange={(input) => updateNote(active.id, input)}
              onTogglePin={() => togglePinNote(active.id)}
              onDelete={handleDelete}
              onBack={() => setMobileEditor(false)}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-mist text-brand">
                <NotebookPen className="h-7 w-7" />
              </div>
              <p className="mt-4 font-display text-xl font-semibold text-ink">No note selected</p>
              <p className="mt-1 max-w-sm text-sm text-muted">
                Create a private note for deal follow-ups, capital quotes, or warm intros.
              </p>
              <button
                type="button"
                onClick={createNote}
                className="mt-5 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                New note
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
