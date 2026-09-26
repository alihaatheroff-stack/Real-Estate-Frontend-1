import type { ChatCallLog } from '@/features/network/data/types'

export function formatCallDuration(totalSeconds: number) {
  const safe = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safe / 3600)
  const minutes = Math.floor((safe % 3600) / 60)
  const seconds = safe % 60
  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function callLogLabel(call: ChatCallLog) {
  const kind = call.mode === 'video' ? 'Video call' : 'Voice call'
  if (call.outcome === 'cancelled') return `Cancelled ${kind.toLowerCase()}`
  return `${kind} · ${formatCallDuration(call.durationSec)}`
}
