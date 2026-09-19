import { useMemo, useState } from 'react'
import { ArrowLeft, Check, Search, UsersRound, X } from 'lucide-react'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { CURRENT_MEMBER_ID, NETWORK_MEMBERS } from '@/features/network/data/members'
import { cn } from '@/shared/lib/cn'

type Step = 'members' | 'details'

export function NewGroupDialog({
  open,
  onClose,
  onCreate,
}: {
  open: boolean
  onClose: () => void
  onCreate: (input: { name: string; memberIds: string[] }) => void
}) {
  const [step, setStep] = useState<Step>('members')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])
  const [groupName, setGroupName] = useState('')

  const contacts = useMemo(
    () => NETWORK_MEMBERS.filter((member) => member.id !== CURRENT_MEMBER_ID),
    [],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return contacts
    return contacts.filter(
      (member) =>
        member.name.toLowerCase().includes(q) ||
        member.title.toLowerCase().includes(q) ||
        member.company.toLowerCase().includes(q),
    )
  }, [contacts, query])

  const selectedMembers = useMemo(
    () => selected.map((id) => contacts.find((member) => member.id === id)).filter(Boolean),
    [contacts, selected],
  )

  function reset() {
    setStep('members')
    setQuery('')
    setSelected([])
    setGroupName('')
  }

  function close() {
    reset()
    onClose()
  }

  function toggleMember(id: string) {
    setSelected((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function create() {
    if (selected.length < 1) return
    onCreate({ name: groupName.trim() || 'New group', memberIds: selected })
    reset()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
      <button
        type="button"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        aria-label="Close new group"
        onClick={close}
      />

      <div className="relative flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-[28px] bg-white shadow-2xl sm:max-h-[min(720px,90vh)] sm:rounded-[28px]">
        <header className="flex shrink-0 items-center gap-2 border-b border-black/[0.04] px-3 py-3">
          <button
            type="button"
            onClick={() => (step === 'details' ? setStep('members') : close())}
            className="grid size-10 place-items-center rounded-full text-muted transition hover:bg-mist"
            aria-label={step === 'details' ? 'Back' : 'Close'}
          >
            {step === 'details' ? <ArrowLeft className="size-5" /> : <X className="size-5" />}
          </button>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-ink">{step === 'members' ? 'Add members' : 'New group'}</p>
            <p className="text-xs text-muted">
              {step === 'members'
                ? selected.length
                  ? `${selected.length} selected`
                  : 'Select at least 1 contact'
                : 'Name your group'}
            </p>
          </div>
        </header>

        {step === 'members' ? (
          <>
            {selectedMembers.length > 0 ? (
              <div className="flex shrink-0 gap-3 overflow-x-auto border-b border-black/[0.04] px-4 py-3 network-hide-scroll">
                {selectedMembers.map((member) =>
                  member ? (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => toggleMember(member.id)}
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
                  ) : null,
                )}
              </div>
            ) : null}

            <div className="shrink-0 px-4 pt-3 pb-2">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search contacts"
                  className="h-11 w-full rounded-full bg-[#F3F6F4] pl-10 pr-4 text-sm text-ink outline-none ring-1 ring-transparent transition placeholder:text-muted focus:bg-white focus:ring-brand/30"
                />
              </div>
            </div>

            <ul className="min-h-0 flex-1 overflow-y-auto px-2 pb-4 network-hide-scroll">
              {filtered.map((member) => {
                const isSelected = selected.includes(member.id)
                return (
                  <li key={member.id}>
                    <button
                      type="button"
                      onClick={() => toggleMember(member.id)}
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
                          isSelected
                            ? 'border-brand bg-brand text-white'
                            : 'border-black/15 bg-white text-transparent',
                        )}
                      >
                        <Check className="size-3.5" strokeWidth={3} />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>

            <div className="shrink-0 border-t border-black/[0.04] p-4">
              <button
                type="button"
                disabled={selected.length < 1}
                onClick={() => setStep('details')}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white transition enabled:hover:bg-brand/90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 network-hide-scroll">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-brand-light text-brand">
                <UsersRound className="size-9" strokeWidth={1.6} />
              </div>
              <label className="mt-6 block">
                <span className="mb-2 block text-sm font-medium text-ink">Group name</span>
                <input
                  value={groupName}
                  onChange={(event) => setGroupName(event.target.value)}
                  placeholder="e.g. Deal room – Visalia"
                  autoFocus
                  maxLength={60}
                  className="h-12 w-full rounded-2xl bg-[#F3F6F4] px-4 text-sm text-ink outline-none ring-1 ring-transparent transition placeholder:text-muted focus:bg-white focus:ring-brand/30"
                />
              </label>
              <p className="mt-5 text-xs font-semibold tracking-wide text-muted uppercase">
                Participants · {selectedMembers.length}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedMembers.map((member) =>
                  member ? (
                    <span
                      key={member.id}
                      className="inline-flex items-center gap-2 rounded-full bg-[#F3F6F4] py-1 pr-3 pl-1 text-sm text-ink"
                    >
                      <MemberAvatar name={member.name} src={member.avatar} size="xs" />
                      {member.firstName}
                    </span>
                  ) : null,
                )}
              </div>
            </div>

            <div className="shrink-0 border-t border-black/[0.04] p-4">
              <button
                type="button"
                onClick={create}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white transition hover:bg-brand/90"
              >
                Create group
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
