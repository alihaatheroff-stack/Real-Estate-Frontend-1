import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 're-auth-session'
const CHANGE_EVENT = 're-auth-change'

function readAuthenticated(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function emitChange() {
  window.dispatchEvent(new Event(CHANGE_EVENT))
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange)
  window.addEventListener('storage', onStoreChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange)
    window.removeEventListener('storage', onStoreChange)
  }
}

export function setAuthenticated(value: boolean) {
  try {
    if (value) localStorage.setItem(STORAGE_KEY, '1')
    else localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage failures in private / restricted contexts.
  }
  emitChange()
}

export function signOut() {
  setAuthenticated(false)
}

export function useIsAuthenticated() {
  return useSyncExternalStore(subscribe, readAuthenticated, () => false)
}
