import { useCallback, useEffect, useState, useSyncExternalStore } from 'react'
import { CURRENT_MEMBER_ID } from '@/features/network/data/members'

type NicknameMap = Record<string, string>

const STORAGE_PREFIX = 're-network-nicknames'

function storageKey(ownerId = CURRENT_MEMBER_ID) {
  return `${STORAGE_PREFIX}:${ownerId}`
}

function readNicknames(ownerId = CURRENT_MEMBER_ID): NicknameMap {
  try {
    const raw = localStorage.getItem(storageKey(ownerId))
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (!parsed || typeof parsed !== 'object') return {}
    const next: NicknameMap = {}
    for (const [memberId, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value === 'string' && value.trim()) next[memberId] = value.trim()
    }
    return next
  } catch {
    return {}
  }
}

function writeNicknames(map: NicknameMap, ownerId = CURRENT_MEMBER_ID) {
  localStorage.setItem(storageKey(ownerId), JSON.stringify(map))
  window.dispatchEvent(new CustomEvent('re-network-nicknames-changed'))
}

let cached = readNicknames()
const listeners = new Set<() => void>()

function emit() {
  cached = readNicknames()
  listeners.forEach((listener) => listener())
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key?.startsWith(STORAGE_PREFIX)) emit()
  })
  window.addEventListener('re-network-nicknames-changed', () => emit())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return cached
}

export function getMemberNickname(memberId: string | undefined | null) {
  if (!memberId) return undefined
  const value = cached[memberId]
  return value?.trim() || undefined
}

export function setMemberNickname(memberId: string, nickname: string) {
  const next = { ...readNicknames() }
  const trimmed = nickname.trim()
  if (trimmed) next[memberId] = trimmed
  else delete next[memberId]
  writeNicknames(next)
  emit()
}

export function clearMemberNickname(memberId: string) {
  setMemberNickname(memberId, '')
}

/** Private-to-you nicknames for contacts (local only). */
export function useNicknames() {
  const map = useSyncExternalStore(subscribe, getSnapshot, () => ({} as NicknameMap))

  const getNickname = useCallback(
    (memberId: string | undefined | null) => {
      if (!memberId) return undefined
      return map[memberId]?.trim() || undefined
    },
    [map],
  )

  const setNickname = useCallback((memberId: string, nickname: string) => {
    setMemberNickname(memberId, nickname)
  }, [])

  const clearNickname = useCallback((memberId: string) => {
    clearMemberNickname(memberId)
  }, [])

  return { nicknames: map, getNickname, setNickname, clearNickname }
}

/** Remount helpers when nicknames change outside React trees that don't subscribe. */
export function useNicknameVersion() {
  const [version, setVersion] = useState(0)
  useEffect(() => {
    function bump() {
      setVersion((value) => value + 1)
    }
    window.addEventListener('re-network-nicknames-changed', bump)
    return () => window.removeEventListener('re-network-nicknames-changed', bump)
  }, [])
  return version
}
