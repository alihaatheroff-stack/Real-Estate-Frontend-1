import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  Camera,
  Check,
  Pencil,
  Search,
  Trash2,
  UserPlus,
  X,
} from 'lucide-react'
import { ConversationAvatar } from '@/features/network/components/messages/ConversationAvatar'
import { getChatIdentity } from '@/features/network/components/messages/chatIdentity'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { CURRENT_MEMBER_ID, NETWORK_MEMBERS, STOCK, getMember } from '@/features/network/data/members'
import type { NetworkChat, NetworkMember } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'
import { readFileAsDataUrl } from '@/shared/lib/fileDataUrl'

const GROUP_PHOTO_PRESETS = [
  STOCK.tower,
  STOCK.meeting,
  STOCK.house1,
  STOCK.build,
  STOCK.interior,
  STOCK.office,
] as const

type View = 'info' | 'add'

export function GroupInfoDialog({
  open,
  chat,
  onClose,
  onSave,
}: {
  open: boolean
  chat: NetworkChat | null
  onClose: () => void
  onSave: (input: {
    name: string
    avatar?: string | null
    addMemberIds?: string[]
  }) => void
}) {
  const identity = chat ? getChatIdentity(chat) : null
  const [view, setView] = useState<View>('info')
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState<string | undefined>()
  const [pendingAdds, setPendingAdds] = useState<string[]>([])
  const [addQuery, setAddQuery] = useState('')
  const [editingName, setEditingName] = useState(false)
  const [pickingPhoto, setPickingPhoto] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const nameRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open || !chat) return
    setName(chat.groupName ?? '')
    setAvatar(chat.groupAvatar)
    setPendingAdds([])
    setAddQuery('')
    setView('info')
    setEditingName(false)
    setPickingPhoto(false)
  }, [open, chat])

  useEffect(() => {
    if (editingName) nameRef.current?.focus()
  }, [editingName])

  const existingIds = useMemo(() => new Set(chat?.groupMemberIds ?? []), [chat])

  const members = useMemo(() => {
    const current = (chat?.groupMemberIds ?? [])
      .map((id) => getMember(id))
      .filter((member): member is NetworkMember => member != null)
    const extras = pendingAdds
      .map((id) => getMember(id))
      .filter((member): member is NetworkMember => member != null)
    return [...current, ...extras]
  }, [chat, pendingAdds])

  const candidates = useMemo(() => {
    return NETWORK_MEMBERS.filter(
      (member) => member.id !== CURRENT_MEMBER_ID && !existingIds.has(member.id),
    )
  }, [existingIds])

  const filteredCandidates = useMemo(() => {
    const q = addQuery.trim().toLowerCase()
    if (!q) return candidates
    return candidates.filter(
      (member) =>
        member.name.toLowerCase().includes(q) ||
        member.title.toLowerCase().includes(q) ||
        member.company.toLowerCase().includes(q),
    )
  }, [addQuery, candidates])

  if (!open || !chat || !identity) return null
  const currentChat = chat

  const dirty =
    name.trim() !== (currentChat.groupName ?? '').trim() ||
    avatar !== currentChat.groupAvatar ||
    pendingAdds.length > 0

  function handleFile(file?: File | null) {
    if (!file || !file.type.startsWith('image/')) return
    void readFileAsDataUrl(file).then((url) => {
      setAvatar(url)
      setPickingPhoto(false)
    })
  }

  function togglePending(id: string) {
    setPendingAdds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function save() {
    const nextName = name.trim() || currentChat.groupName || 'Group'
    onSave({
      name: nextName,
      avatar: avatar ?? null,
      addMemberIds: pendingAdds.length ? pendingAdds : undefined,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="Close group info"
        onClick={onClose}
      />

      <div className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:max-h-[min(760px,90vh)] sm:rounded-[28px]">
        <header className="flex shrink-0 items-center justify-between gap-2 border-b border-black/[0.04] px-3 py-3">
          <button
            type="button"
            onClick={() => (view === 'add' ? setView('info') : onClose())}
            className="grid size-10 place-items-center rounded-full text-muted transition hover:bg-mist"
            aria-label={view === 'add' ? 'Back' : 'Close'}
          >
            {view === 'add' ? <ArrowLeft className="size-5" /> : <X className="size-5" />}
          </button>
          <div className="min-w-0 text-center">
            <p className="font-semibold text-ink">{view === 'add' ? 'Add members' : 'Group info'}</p>
            {view === 'add' ? (
              <p className="text-xs text-muted">
                {pendingAdds.length ? `${pendingAdds.length} selected` : 'Choose people to add'}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            disabled={!dirty && !editingName}
            onClick={save}
            className="grid size-10 place-items-center rounded-full text-brand transition enabled:hover:bg-brand-light disabled:opacity-30"
            aria-label="Save"
          >
            <Check className="size-5" strokeWidth={2.4} />
          </button>
        </header>

        {view === 'add' ? (
          <>
            <div className="shrink-0 px-4 pt-3 pb-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  value={addQuery}
                  onChange={(event) => setAddQuery(event.target.value)}
                  placeholder="Search contacts"
                  className="h-11 w-full rounded-full bg-[#F3F6F4] pl-10 pr-4 text-sm text-ink outline-none ring-1 ring-transparent transition placeholder:text-muted focus:bg-white focus:ring-brand/30"
                />
              </div>
            </div>

            {pendingAdds.length > 0 ? (
              <div className="flex shrink-0 gap-3 overflow-x-auto border-b border-black/[0.04] px-4 py-3 network-hide-scroll">
                {pendingAdds.map((id) => {
                  const member = getMember(id)
                  if (!member) return null
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => togglePending(id)}
                      className="flex w-14 shrink-0 flex-col items-center gap-1"
                    >
                      <span className="relative">
                        <MemberAvatar name={member.name} src={member.avatar} size="md" />
                        <span className="absolute -right-0.5 -bottom-0.5 grid size-5 place-items-center rounded-full bg-brand text-white ring-2 ring-white">
                          <X className="size-3" strokeWidth={2.5} />
                        </span>
                      </span>
                      <span className="w-full truncate text-center text-[11px] text-ink">
                        {member.firstName}
                      </span>
                    </button>
                  )
                })}
              </div>
            ) : null}

            <ul className="min-h-0 flex-1 overflow-y-auto px-2 pb-4 network-hide-scroll">
              {filteredCandidates.length === 0 ? (
                <p className="px-3 py-10 text-center text-sm text-muted">
                  {candidates.length === 0
                    ? 'Everyone available is already in this group.'
                    : 'No contacts match that search.'}
                </p>
              ) : (
                filteredCandidates.map((member) => {
                  const selected = pendingAdds.includes(member.id)
                  return (
                    <li key={member.id}>
                      <button
                        type="button"
                        onClick={() => togglePending(member.id)}
                        className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition hover:bg-mist/80"
                      >
                        <MemberAvatar
                          name={member.name}
                          src={member.avatar}
                          size="md"
                          online={member.online}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-semibold text-ink">
                            {member.name}
                          </span>
                          <span className="block truncate text-sm text-muted">{member.title}</span>
                        </span>
                        <span
                          className={cn(
                            'grid size-6 shrink-0 place-items-center rounded-full border-2 transition',
                            selected
                              ? 'border-brand bg-brand text-white'
                              : 'border-black/15 bg-white text-transparent',
                          )}
                        >
                          <Check className="size-3.5" strokeWidth={3} />
                        </span>
                      </button>
                    </li>
                  )
                })
              )}
            </ul>

            <div className="shrink-0 border-t border-black/[0.04] p-4">
              <button
                type="button"
                disabled={pendingAdds.length === 0}
                onClick={() => setView('info')}
                className="flex h-12 w-full items-center justify-center rounded-full bg-brand text-sm font-semibold text-white transition enabled:hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Add {pendingAdds.length || ''} {pendingAdds.length === 1 ? 'member' : 'members'}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto network-hide-scroll">
              <div className="flex flex-col items-center bg-[#F7FAF8] px-5 pt-8 pb-6">
                <div className="relative">
                  <ConversationAvatar
                    avatars={identity.avatars}
                    title={name || identity.title}
                    isGroup
                    groupAvatar={avatar}
                    size="lg"
                  />
                  <button
                    type="button"
                    onClick={() => setPickingPhoto((openPicker) => !openPicker)}
                    className="absolute right-1 bottom-1 grid size-10 place-items-center rounded-full bg-brand text-white shadow-md ring-4 ring-[#F7FAF8] transition hover:bg-brand/90"
                    aria-label="Change group photo"
                  >
                    <Camera className="size-[18px]" strokeWidth={2} />
                  </button>
                </div>

                {pickingPhoto ? (
                  <div className="mt-5 w-full rounded-[22px] bg-white p-3 ring-1 ring-black/[0.04]">
                    <p className="px-1 text-xs font-semibold tracking-wide text-muted uppercase">
                      Group photo
                    </p>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {GROUP_PHOTO_PRESETS.map((src) => (
                        <button
                          key={src}
                          type="button"
                          onClick={() => {
                            setAvatar(src)
                            setPickingPhoto(false)
                          }}
                          className={cn(
                            'aspect-square overflow-hidden rounded-2xl ring-2 transition',
                            avatar === src ? 'ring-brand' : 'ring-transparent hover:ring-brand/30',
                          )}
                        >
                          <img src={src} alt="" className="size-full object-cover" />
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-brand-light text-sm font-semibold text-brand transition hover:bg-brand/15"
                      >
                        <Camera className="size-4" />
                        Upload
                      </button>
                      {avatar ? (
                        <button
                          type="button"
                          onClick={() => {
                            setAvatar(undefined)
                            setPickingPhoto(false)
                          }}
                          className="inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 className="size-4" />
                          Remove
                        </button>
                      ) : null}
                    </div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        handleFile(event.target.files?.[0])
                        event.target.value = ''
                      }}
                    />
                  </div>
                ) : null}

                <div className="mt-5 flex w-full max-w-sm items-center justify-center gap-2">
                  {editingName ? (
                    <input
                      ref={nameRef}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter') setEditingName(false)
                        if (event.key === 'Escape') {
                          setName(currentChat.groupName ?? '')
                          setEditingName(false)
                        }
                      }}
                      maxLength={60}
                      className="h-11 w-full rounded-2xl bg-white px-4 text-center text-lg font-semibold text-ink outline-none ring-1 ring-brand/30"
                      placeholder="Group name"
                    />
                  ) : (
                    <>
                      <h2 className="truncate text-center text-xl font-semibold text-ink">
                        {name.trim() || 'Group'}
                      </h2>
                      <button
                        type="button"
                        onClick={() => setEditingName(true)}
                        className="grid size-9 shrink-0 place-items-center rounded-full text-brand transition hover:bg-white"
                        aria-label="Edit group name"
                      >
                        <Pencil className="size-4" strokeWidth={2} />
                      </button>
                    </>
                  )}
                </div>
                <p className="mt-1.5 text-sm text-muted">Group · {members.length} members</p>
              </div>

              <div className="px-4 py-4">
                <button
                  type="button"
                  onClick={() => setView('add')}
                  className="mb-3 flex w-full items-center gap-3 rounded-2xl px-2 py-2.5 text-left transition hover:bg-mist/80"
                >
                  <span className="grid size-10 place-items-center rounded-full bg-brand-light text-brand">
                    <UserPlus className="size-5" strokeWidth={1.85} />
                  </span>
                  <span className="text-[15px] font-semibold text-brand">Add members</span>
                </button>

                <p className="px-1 text-xs font-semibold tracking-wide text-muted uppercase">
                  Members · {members.length}
                </p>
                <ul className="mt-2 space-y-1">
                  {members.map((member) => {
                    const isPending = pendingAdds.includes(member.id)
                    return (
                      <li
                        key={member.id}
                        className="flex items-center gap-3 rounded-2xl px-2 py-2.5"
                      >
                        <MemberAvatar
                          name={member.name}
                          src={member.avatar}
                          size="md"
                          online={member.online}
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[15px] font-semibold text-ink">
                            {member.name}
                          </span>
                          <span className="block truncate text-sm text-muted">
                            {isPending ? 'Will be added' : member.title}
                          </span>
                        </span>
                        {isPending ? (
                          <button
                            type="button"
                            onClick={() => togglePending(member.id)}
                            className="rounded-full px-2.5 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                          >
                            Undo
                          </button>
                        ) : null}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>

            <div className="shrink-0 border-t border-black/[0.04] p-4">
              <button
                type="button"
                onClick={save}
                className="flex h-12 w-full items-center justify-center rounded-full bg-brand text-sm font-semibold text-white transition hover:bg-brand/90"
              >
                Save changes
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
