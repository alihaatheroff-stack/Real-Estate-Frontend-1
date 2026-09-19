import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Folder, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import {
  createFavoriteFolder,
  saveFavoriteItem,
  useFavorites,
  type FavoriteModule,
} from '@/features/favorites/store'
import { cn } from '@/shared/lib/cn'

export type SaveFavoriteDraft = {
  itemId: string
  module: FavoriteModule
  title: string
  subtitle: string
  image: string
}

export function SaveToFolderDialog({
  open,
  draft,
  onClose,
}: {
  open: boolean
  draft: SaveFavoriteDraft | null
  onClose: () => void
}) {
  const { folders } = useFavorites()
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    if (!open) return
    setSelectedFolderId(null)
    setNewName('')
  }, [open, draft?.itemId])

  useEffect(() => {
    if (!open) return
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open || !draft) return null

  const trimmedName = newName.trim()
  const canSave = Boolean(selectedFolderId) || trimmedName.length > 0

  function save() {
    if (!draft || !canSave) return
    const folderId = trimmedName
      ? createFavoriteFolder(trimmedName).id
      : (selectedFolderId as string)
    saveFavoriteItem({
      itemId: draft.itemId,
      module: draft.module,
      folderId,
      title: draft.title,
      subtitle: draft.subtitle,
      image: draft.image,
    })
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[2000] flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="Close save dialog"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="save-folder-title"
        className="relative flex min-h-[28rem] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:min-h-[30rem] sm:rounded-2xl"
      >
        <header className="flex items-start gap-3 border-b border-line px-4 py-4">
          <img
            src={draft.image}
            alt=""
            className="h-12 w-12 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0 flex-1">
            <p id="save-folder-title" className="text-sm font-semibold text-ink">
              Save to a folder
            </p>
            <p className="mt-0.5 truncate text-xs text-muted">{draft.title}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-mist hover:text-ink"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex flex-1 flex-col space-y-5 px-4 py-5">
          {folders.length > 0 ? (
            <div className="min-h-0 flex-1">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
                Existing folders
              </p>
              <div className="grid grid-cols-2 gap-3">
                {folders.map((folder) => {
                  const selected = selectedFolderId === folder.id && trimmedName.length === 0
                  return (
                    <button
                      key={folder.id}
                      type="button"
                      onClick={() => {
                        setSelectedFolderId(folder.id)
                        setNewName('')
                      }}
                      className={cn(
                        'flex min-h-[6.5rem] w-full flex-col items-center justify-center gap-2 rounded-xl border px-3 py-4 text-center transition',
                        selected
                          ? 'border-brand bg-brand-light/70 ring-2 ring-brand/20'
                          : 'border-line/70 bg-mist/30 hover:border-brand/35 hover:bg-mist/70',
                      )}
                    >
                      <Folder
                        className="h-12 w-12 text-[#f5c542]"
                        fill="#f5c542"
                        strokeWidth={1.2}
                        aria-hidden
                      />
                      <span className="line-clamp-2 w-full text-sm font-semibold leading-snug text-ink">
                        {folder.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          <div className="mt-auto">
            <Input
              label="Name the folder"
              placeholder="e.g. Mexico venues"
              value={newName}
              onChange={(event) => {
                setNewName(event.target.value)
                setSelectedFolderId(null)
              }}
              autoFocus={folders.length === 0}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-line px-4 py-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button size="sm" disabled={!canSave} onClick={save}>
            Save
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
