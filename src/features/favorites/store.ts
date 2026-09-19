import { useMemo, useSyncExternalStore } from 'react'
import { useIsAuthenticated } from '@/features/auth/session'

const STORAGE_KEY = 're-favorite-folders'
const CHANGE_EVENT = 're-favorites-change'

export type FavoriteModule = 'crowdfunding' | 'referral' | 'network'

export type FavoriteFolder = {
  id: string
  name: string
  createdAt: number
}

export type FavoriteItem = {
  id: string
  itemId: string
  module: FavoriteModule
  folderId: string
  title: string
  subtitle: string
  image: string
  savedAt: number
}

export type FavoritesState = {
  folders: FavoriteFolder[]
  items: FavoriteItem[]
}

const EMPTY_STATE: FavoritesState = { folders: [], items: [] }

let cachedRaw: string | null = null
let cachedState: FavoritesState = EMPTY_STATE

function emitChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function readState(): FavoritesState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === cachedRaw) return cachedState
    cachedRaw = raw
    if (!raw) {
      cachedState = EMPTY_STATE
      return cachedState
    }
    const parsed = JSON.parse(raw) as Partial<FavoritesState>
    cachedState = {
      folders: Array.isArray(parsed.folders) ? parsed.folders : [],
      items: Array.isArray(parsed.items) ? parsed.items : [],
    }
    return cachedState
  } catch {
    return EMPTY_STATE
  }
}

function writeState(next: FavoritesState) {
  cachedState = next
  cachedRaw = JSON.stringify(next)
  try {
    localStorage.setItem(STORAGE_KEY, cachedRaw)
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  emitChange()
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

function itemKey(module: FavoriteModule, itemId: string) {
  return `${module}:${itemId}`
}

export function createFavoriteFolder(name: string): FavoriteFolder {
  const folder: FavoriteFolder = {
    id: `folder-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim(),
    createdAt: Date.now(),
  }
  const state = readState()
  writeState({ ...state, folders: [...state.folders, folder] })
  return folder
}

export function saveFavoriteItem(input: {
  itemId: string
  module: FavoriteModule
  folderId: string
  title: string
  subtitle: string
  image: string
}) {
  const state = readState()
  const id = itemKey(input.module, input.itemId)
  const nextItem: FavoriteItem = {
    id,
    itemId: input.itemId,
    module: input.module,
    folderId: input.folderId,
    title: input.title,
    subtitle: input.subtitle,
    image: input.image,
    savedAt: Date.now(),
  }
  writeState({
    ...state,
    items: [...state.items.filter((item) => item.id !== id), nextItem],
  })
}

export function removeFavoriteItem(module: FavoriteModule, itemId: string) {
  const id = itemKey(module, itemId)
  const state = readState()
  writeState({
    ...state,
    items: state.items.filter((item) => item.id !== id),
  })
}

export function formatFavoriteTimeAgo(timestamp: number) {
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000))
  if (seconds < 45) return 'Just now'
  if (seconds < 3600) return `${Math.max(1, Math.round(seconds / 60))}m`
  if (seconds < 86400) return `${Math.max(1, Math.round(seconds / 3600))}h`
  return `${Math.max(1, Math.round(seconds / 86400))}d`
}

export function useFavorites() {
  const isAuthenticated = useIsAuthenticated()
  const state = useSyncExternalStore(subscribe, readState, () => EMPTY_STATE)
  const visible = isAuthenticated ? state : EMPTY_STATE

  return useMemo(() => {
    const folderNameById = new Map(visible.folders.map((folder) => [folder.id, folder.name]))

    function isSaved(module: FavoriteModule, itemId: string) {
      const id = itemKey(module, itemId)
      return visible.items.some((item) => item.id === id)
    }

    return {
      folders: visible.folders,
      items: visible.items,
      folderNameById,
      isSaved,
    }
  }, [visible])
}
