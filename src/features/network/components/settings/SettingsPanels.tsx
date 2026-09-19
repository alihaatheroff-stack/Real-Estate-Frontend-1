import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Camera, Search, X } from 'lucide-react'
import { networkProfilePath } from '@/app/router/paths'
import { Button } from '@/components/ui/Button'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import {
  SettingsField,
  SettingsPanelHeader,
  SettingsPasteDropdown,
  SettingsSelectRow,
  SettingsToggle,
  settingsInputClass,
} from '@/features/network/components/settings/settingsUi'
import {
  FRIEND_REQUEST_OPTIONS,
  INITIAL_BLOCKED_IDS,
  SETTINGS_LANGUAGES,
  VISIBILITY_OPTIONS,
} from '@/features/network/data/settings'
import { NETWORK_MEMBERS, getCurrentMember, getMember } from '@/features/network/data/members'
import { cn } from '@/shared/lib/cn'
import { readFileAsDataUrl } from '@/shared/lib/fileDataUrl'

function useSaveFlash() {
  const [saved, setSaved] = useState(false)
  const timeoutRef = useRef(0)

  useEffect(() => () => window.clearTimeout(timeoutRef.current), [])

  return {
    saved,
    save() {
      setSaved(true)
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = window.setTimeout(() => setSaved(false), 1800)
    },
  }
}

function SaveButton({ saved, onSave }: { saved: boolean; onSave: () => void }) {
  return (
    <Button className="mt-6 rounded-lg" onClick={onSave}>
      {saved ? 'Saved' : 'Save changes'}
    </Button>
  )
}

export function EditProfilePanel() {
  const me = getCurrentMember()
  const { saved, save } = useSaveFlash()
  const [avatar, setAvatar] = useState(me.avatar)
  const [firstName, setFirstName] = useState(me.firstName)
  const [lastName, setLastName] = useState(me.name.replace(me.firstName, '').trim())
  const [title, setTitle] = useState(me.title)
  const [company, setCompany] = useState(me.company)
  const [city, setCity] = useState(me.city)
  const [state, setState] = useState(me.state)
  const [handle, setHandle] = useState(me.handle)
  const [bio, setBio] = useState(me.bio)
  const [buyBox, setBuyBox] = useState(me.buyBox)

  return (
    <div>
      <SettingsPanelHeader
        title="Edit Profile"
        description="Update how other members see you across RE Network."
      />
      <div className="flex items-center gap-4">
        <MemberAvatar name={`${firstName} ${lastName}`} src={avatar} size="lg" />
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-line bg-mist px-3 py-2 text-sm font-semibold hover:bg-white">
          <Camera className="size-4" />
          Change photo
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0]
              event.target.value = ''
              if (!file) return
              void readFileAsDataUrl(file).then(setAvatar)
            }}
          />
        </label>
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <SettingsField label="First name">
          <input value={firstName} onChange={(event) => setFirstName(event.target.value)} className={settingsInputClass} />
        </SettingsField>
        <SettingsField label="Last name">
          <input value={lastName} onChange={(event) => setLastName(event.target.value)} className={settingsInputClass} />
        </SettingsField>
        <SettingsField label="Title">
          <input value={title} onChange={(event) => setTitle(event.target.value)} className={settingsInputClass} />
        </SettingsField>
        <SettingsField label="Company">
          <input value={company} onChange={(event) => setCompany(event.target.value)} className={settingsInputClass} />
        </SettingsField>
        <SettingsField label="City">
          <input value={city} onChange={(event) => setCity(event.target.value)} className={settingsInputClass} />
        </SettingsField>
        <SettingsField label="State">
          <input value={state} onChange={(event) => setState(event.target.value)} className={settingsInputClass} />
        </SettingsField>
        <SettingsField label="Username">
          <input value={handle} onChange={(event) => setHandle(event.target.value)} className={settingsInputClass} />
        </SettingsField>
      </div>
      <div className="mt-4 space-y-4">
        <SettingsField label="Intro">
          <textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </SettingsField>
        <SettingsField label="Buy box">
          <textarea
            value={buyBox}
            onChange={(event) => setBuyBox(event.target.value)}
            rows={3}
            className="mt-1 w-full rounded-xl border border-line px-3 py-2 font-normal outline-none focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </SettingsField>
      </div>
      <SaveButton saved={saved} onSave={save} />
    </div>
  )
}

export function LanguagePanel() {
  const me = getCurrentMember()
  const { saved, save } = useSaveFlash()
  const languageOptions = SETTINGS_LANGUAGES.map((item) => ({ value: item.value, label: item.label }))
  const [appLanguage, setAppLanguage] = useState<string>(
    SETTINGS_LANGUAGES.find((item) => item.label === me.languages[0])?.value ?? 'en',
  )
  const [spoken, setSpoken] = useState<string[]>(() =>
    me.languages.flatMap((name) => {
      const match = SETTINGS_LANGUAGES.find((item) => item.label === name)
      return match ? [match.value] : []
    }),
  )

  const availableToAdd = languageOptions.filter((item) => !spoken.includes(item.value))

  function addLanguage(value: string) {
    setSpoken((current) => (current.includes(value) ? current : [...current, value]))
  }

  function removeLanguage(value: string) {
    setSpoken((current) => (current.length <= 1 ? current : current.filter((item) => item !== value)))
  }

  return (
    <div>
      <SettingsPanelHeader
        title="Language"
        description="Set the app language and add every language you speak on your profile."
      />
      <SettingsSelectRow
        label="App language"
        hint="Menus, buttons, and system text."
        value={appLanguage}
        options={languageOptions}
        onChange={(value) => setAppLanguage(value)}
        groupByLetter
      />

      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[15px] font-semibold">Languages you speak</p>
            <p className="mt-1 text-sm text-muted">Add more than one. These show on your profile.</p>
          </div>
          {availableToAdd.length > 0 ? (
            <SettingsPasteDropdown
              label="Add language"
              options={availableToAdd}
              onChange={addLanguage}
              placeholder="Add language"
              groupByLetter
            />
          ) : null}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {spoken.map((value) => {
            const label = SETTINGS_LANGUAGES.find((item) => item.value === value)?.label ?? value
            return (
              <span
                key={value}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-mist px-3 py-1.5 text-sm font-semibold"
              >
                {label}
                <button
                  type="button"
                  onClick={() => removeLanguage(value)}
                  disabled={spoken.length <= 1}
                  className="grid size-5 place-items-center rounded-full text-muted hover:bg-white hover:text-ink disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={`Remove ${label}`}
                >
                  <X className="size-3.5" strokeWidth={2.4} />
                </button>
              </span>
            )
          })}
        </div>
        {availableToAdd.length === 0 ? (
          <p className="mt-3 text-sm text-muted">All available languages are already added.</p>
        ) : null}
      </div>
      <SaveButton saved={saved} onSave={save} />
    </div>
  )
}

export function BlockingPanel() {
  const me = getCurrentMember()
  const [blockedIds, setBlockedIds] = useState<string[]>([...INITIAL_BLOCKED_IDS])
  const [query, setQuery] = useState('')

  const blocked = blockedIds
    .map((id) => getMember(id))
    .filter((member): member is NonNullable<typeof member> => member != null)

  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return []
    return NETWORK_MEMBERS.filter((member) => {
      if (member.id === me.id || blockedIds.includes(member.id)) return false
      return `${member.name} ${member.title} ${member.company}`.toLowerCase().includes(needle)
    }).slice(0, 6)
  }, [query, me.id, blockedIds])

  return (
    <div>
      <SettingsPanelHeader
        title="Blocking"
        description="Blocked people can’t see your profile, posts, or send you messages."
      />
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search members to block"
          className="h-11 w-full rounded-full bg-[#F0F2F5] pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-brand/25"
        />
      </div>
      {matches.length > 0 ? (
        <ul className="mt-3 divide-y divide-black/[0.04] overflow-hidden rounded-2xl ring-1 ring-black/[0.04]">
          {matches.map((member) => (
            <li key={member.id} className="flex items-center gap-3 px-3 py-2.5">
              <MemberAvatar name={member.name} src={member.avatar} size="sm" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold">{member.name}</span>
                <span className="block truncate text-xs text-muted">{member.title}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  setBlockedIds((ids) => [...ids, member.id])
                  setQuery('')
                }}
                className="h-9 rounded-full bg-brand px-3 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Block
              </button>
            </li>
          ))}
        </ul>
      ) : null}

      <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-muted">
        Blocked · {blocked.length}
      </h3>
      {blocked.length === 0 ? (
        <p className="mt-3 text-sm text-muted">You’re not blocking anyone.</p>
      ) : (
        <ul className="mt-3 divide-y divide-black/[0.04]">
          {blocked.map((member) => (
            <li key={member.id} className="flex items-center gap-3 py-3">
              <MemberAvatar name={member.name} src={member.avatar} memberId={member.id} size="md" />
              <span className="min-w-0 flex-1">
                <Link to={networkProfilePath(member.id)} className="block truncate font-semibold hover:underline">
                  {member.name}
                </Link>
                <span className="block truncate text-sm text-muted">
                  {member.title} · {member.company}
                </span>
              </span>
              <button
                type="button"
                onClick={() => setBlockedIds((ids) => ids.filter((id) => id !== member.id))}
                className="h-9 rounded-full border border-line px-3 text-sm font-semibold hover:bg-mist"
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function NotificationSettingsPanel() {
  const { saved, save } = useSaveFlash()
  const [likes, setLikes] = useState(true)
  const [comments, setComments] = useState(true)
  const [requests, setRequests] = useState(true)
  const [messages, setMessages] = useState(true)
  const [events, setEvents] = useState(true)
  const [groups, setGroups] = useState(true)
  const [email, setEmail] = useState(true)

  return (
    <div>
      <SettingsPanelHeader
        title="Notification"
        description="Choose what you hear about on RE Network and by email."
      />
      <div className="divide-y divide-black/[0.05]">
        <SettingsToggle label="Likes" hint="When someone likes your post or comment." on={likes} onChange={setLikes} />
        <SettingsToggle label="Comments" hint="Replies on your posts and mentions." on={comments} onChange={setComments} />
        <SettingsToggle
          label="Friend requests"
          hint="New requests and accepted connections."
          on={requests}
          onChange={setRequests}
        />
        <SettingsToggle label="Messages" hint="Unread chats and group mentions." on={messages} onChange={setMessages} />
        <SettingsToggle label="Events" hint="Invites and reminders for investor meetups." on={events} onChange={setEvents} />
        <SettingsToggle label="Groups" hint="Adds, posts, and role changes in your groups." on={groups} onChange={setGroups} />
        <SettingsToggle label="Email alerts" hint="Off-market posts and weekly digest." on={email} onChange={setEmail} />
      </div>
      <SaveButton saved={saved} onSave={save} />
    </div>
  )
}

export function PasswordSecurityPanel() {
  const { saved, save } = useSaveFlash()
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loginAlerts, setLoginAlerts] = useState(true)
  const [twoFactor, setTwoFactor] = useState(false)

  return (
    <div>
      <SettingsPanelHeader
        title="Password & Security"
        description="Keep your RE Network account locked down."
      />
      <div className="space-y-3">
        <SettingsField label="Current password">
          <input
            type="password"
            value={current}
            onChange={(event) => setCurrent(event.target.value)}
            className={settingsInputClass}
            autoComplete="current-password"
          />
        </SettingsField>
        <SettingsField label="New password">
          <input
            type="password"
            value={next}
            onChange={(event) => setNext(event.target.value)}
            className={settingsInputClass}
            autoComplete="new-password"
          />
        </SettingsField>
        <SettingsField label="Confirm new password">
          <input
            type="password"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            className={cn(settingsInputClass, confirm && confirm !== next && 'border-danger')}
            autoComplete="new-password"
          />
        </SettingsField>
      </div>
      <div className="mt-4 divide-y divide-black/[0.05] border-t border-black/[0.05]">
        <SettingsToggle
          label="Login alerts"
          hint="Email me when a new device signs in."
          on={loginAlerts}
          onChange={setLoginAlerts}
        />
        <SettingsToggle
          label="Two-factor authentication"
          hint="Ask for a code after password on unrecognized devices."
          on={twoFactor}
          onChange={setTwoFactor}
        />
      </div>
      <SaveButton saved={saved} onSave={save} />
    </div>
  )
}

export function ViewingSharingPanel() {
  const { saved, save } = useSaveFlash()
  const [profile, setProfile] = useState('everyone')
  const [posts, setPosts] = useState('friends')
  const [friends, setFriends] = useState('friends')
  const [requests, setRequests] = useState('everyone')
  const [emailLookup, setEmailLookup] = useState('friends')
  const [searchEngines, setSearchEngines] = useState(false)

  const visibility = VISIBILITY_OPTIONS.map((item) => ({ value: item.value, label: item.label }))

  return (
    <div>
      <SettingsPanelHeader
        title="Viewing & Sharing"
        description="Control who can see your profile, posts, and how people find you."
      />
      <SettingsSelectRow
        label="Who can see your profile"
        hint="Name, photo, title, and intro."
        value={profile}
        options={visibility}
        onChange={setProfile}
      />
      <SettingsSelectRow
        label="Who can see your posts"
        hint="Default audience for new posts on your feed."
        value={posts}
        options={visibility}
        onChange={setPosts}
      />
      <SettingsSelectRow
        label="Who can see your friends list"
        hint="Followers and following on your profile."
        value={friends}
        options={visibility}
        onChange={setFriends}
      />
      <SettingsSelectRow
        label="Who can send you friend requests"
        value={requests}
        options={FRIEND_REQUEST_OPTIONS.map((item) => ({ value: item.value, label: item.label }))}
        onChange={setRequests}
      />
      <SettingsSelectRow
        label="Who can look you up using email"
        value={emailLookup}
        options={visibility}
        onChange={setEmailLookup}
      />
      <SettingsToggle
        label="Search engine linking"
        hint="Allow search engines outside RE Network to link to your profile."
        on={searchEngines}
        onChange={setSearchEngines}
      />
      <SaveButton saved={saved} onSave={save} />
    </div>
  )
}
