import type { NetworkNote } from '@/features/network/data/types'

export const NOTE_TAG_OPTIONS = [
  'Follow-up',
  'Deal',
  'Capital',
  'Ops',
  'Intro',
  'Due diligence',
] as const

export type NoteTagOption = (typeof NOTE_TAG_OPTIONS)[number]

export const NETWORK_NOTES: NetworkNote[] = [
  {
    id: 'note-maya-walkthrough',
    title: 'Maya — Friday walkthrough',
    body: 'Call Maya before Friday walkthrough — rent roll still pending.\n\nAsk for T12 + unit mix PDF. Confirm whether Tower District unit 2B renews at market or under current lease.',
    tags: ['Follow-up', 'Deal'],
    pinned: true,
    relatedMemberId: 'maya',
    updatedAt: '2026-09-16T18:40:00.000Z',
    createdAt: '2026-09-14T15:10:00.000Z',
  },
  {
    id: 'note-jordan-dscr',
    title: 'Jordan DSCR quote',
    body: 'DSCR quote from Jordan: lock window closes Thursday noon.\n\nRate floated at 6.85% / 1.25 DSCR. Need borrower entity docs + insurance binder by Wednesday EOD.',
    tags: ['Capital', 'Follow-up'],
    pinned: true,
    relatedMemberId: 'jordan',
    updatedAt: '2026-09-16T14:05:00.000Z',
    createdAt: '2026-09-15T11:20:00.000Z',
  },
  {
    id: 'note-noah-gc',
    title: 'Noah — Tower punch list',
    body: 'GC availability for Tower District punch list — Noah confirmed.\n\nCrew can start Monday if access codes are sent tonight. Hold $4.2k contingency for paint and lobby lighting.',
    tags: ['Ops'],
    pinned: false,
    relatedMemberId: 'noah',
    updatedAt: '2026-09-15T20:12:00.000Z',
    createdAt: '2026-09-15T09:00:00.000Z',
  },
  {
    id: 'note-intro-elena',
    title: 'Warm intro: Elena ↔ David',
    body: 'Elena asked for an inspection partner who can turn drone roofs in 24h. David is the fit — draft intro mentioning Clovis overflow and investor punch lists.',
    tags: ['Intro'],
    pinned: false,
    relatedMemberId: 'elena',
    updatedAt: '2026-09-14T16:30:00.000Z',
    createdAt: '2026-09-14T16:30:00.000Z',
  },
  {
    id: 'note-dd-checklist',
    title: 'Multi-unit DD checklist',
    body: 'Standard checklist for 8–24 unit deals:\n• Rent roll + leases\n• Trailing 12 / P&L\n• CapEx history (roof, HVAC, plumbing)\n• Utility averages by unit type\n• Estoppel template ready before LOI',
    tags: ['Due diligence', 'Deal'],
    pinned: false,
    updatedAt: '2026-09-12T10:00:00.000Z',
    createdAt: '2026-09-08T13:45:00.000Z',
  },
]

export function formatNoteTimestamp(iso: string, now = Date.now()) {
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return ''
  const diffMs = Math.max(0, now - then)
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function notePreview(note: NetworkNote, max = 96) {
  const source = note.body.trim() || note.title.trim() || 'Empty note'
  const compact = source.replace(/\s+/g, ' ')
  return compact.length > max ? `${compact.slice(0, max - 1)}…` : compact
}

export function noteDisplayTitle(note: NetworkNote) {
  const titled = note.title.trim()
  if (titled) return titled
  const firstLine = note.body.trim().split('\n').find((line) => line.trim())
  return firstLine?.trim() || 'Untitled note'
}

export function matchesNoteQuery(note: NetworkNote, query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return (
    note.title.toLowerCase().includes(q) ||
    note.body.toLowerCase().includes(q) ||
    note.tags.some((tag) => tag.toLowerCase().includes(q))
  )
}
