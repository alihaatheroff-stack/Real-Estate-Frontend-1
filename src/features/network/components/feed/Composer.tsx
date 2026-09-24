import { useEffect, useRef, useState, type ChangeEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Globe2,
  ImageIcon,
  Lock,
  Smile,
  UserRound,
  Users,
  Video,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { NetworkCard } from '@/features/network/components/shared/NetworkCard'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { getCurrentMember, STOCK } from '@/features/network/data/members'
import { useNetworkSocial } from '@/features/network/model/useNetworkSocial'
import type { PostAudience } from '@/features/network/data/types'
import { cn } from '@/shared/lib/cn'

const AUDIENCE_OPTIONS: { id: PostAudience; label: string; hint: string; icon: typeof Globe2 }[] = [
  { id: 'Unanimous', label: 'Anonymous', hint: 'Visible, your name stays off', icon: Lock },
  { id: 'Public', label: 'Public', hint: 'Anyone on RE Network', icon: Globe2 },
  { id: 'Friends', label: 'Friends', hint: 'Your connections only', icon: Users },
]

const QUICK_PHOTOS = [STOCK.house1, STOCK.tower, STOCK.build, STOCK.interior, STOCK.meeting]

export function Composer() {
  const me = getCurrentMember()
  const { addPost } = useNetworkSocial()
  const [searchParams, setSearchParams] = useSearchParams()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [audience, setAudience] = useState<PostAudience | undefined>()
  const [image, setImage] = useState<string | undefined>()
  const [feeling, setFeeling] = useState<number | undefined>()
  const [location, setLocation] = useState('')
  const photoInputRef = useRef<HTMLInputElement>(null)

  const canPost = text.trim().length > 0 && audience !== undefined
  const selectedAudience = AUDIENCE_OPTIONS.find((option) => option.id === audience)

  function openComposer(focus?: 'photo' | 'anonymous') {
    if (focus === 'anonymous') setAudience('Unanimous')
    setOpen(true)
    if (focus === 'photo') {
      window.setTimeout(() => photoInputRef.current?.click(), 0)
    }
  }

  function closeComposer() {
    setOpen(false)
    if (searchParams.get('compose') === '1') {
      const next = new URLSearchParams(searchParams)
      next.delete('compose')
      setSearchParams(next, { replace: true })
    }
  }

  function onPhotoFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') setImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  function publish() {
    if (!audience || !text.trim()) return
    const trimmedLocation = location.trim()
    addPost({
      text: text.trim(),
      audience,
      image,
      feeling: feeling === undefined ? undefined : `${feeling}/10`,
      location: trimmedLocation || undefined,
    })
    setText('')
    setImage(undefined)
    setFeeling(undefined)
    setLocation('')
    setAudience(undefined)
    closeComposer()
    document.querySelector<HTMLElement>('.network-shell main')?.scrollTo({ top: 0, left: 0 })
  }

  useEffect(() => {
    if (searchParams.get('compose') === '1') setOpen(true)
  }, [searchParams])

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') closeComposer()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, searchParams])

  return (
    <>
      <NetworkCard className="p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <MemberAvatar name={me.name} src={me.avatar} memberId={me.id} />
          <button
            type="button"
            onClick={() => openComposer()}
            className="h-11 min-w-0 flex-1 rounded-full bg-[#F0F2F5] px-4 text-left text-[15px] text-muted transition hover:bg-[#E4E6E9]"
          >
            Update LCRE with what’s happening?
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center">
            <ComposerAction
              icon={<Lock className="h-5 w-5 text-slate-500" />}
              label="Anonymous"
              onClick={() => openComposer('anonymous')}
            />
            <ComposerAction
              icon={<Video className="h-5 w-5 text-slate-500" />}
              label="Live"
              onClick={() => openComposer()}
            />
            <ComposerAction
              icon={<ImageIcon className="h-5 w-5 text-slate-500" />}
              label="Photo"
              onClick={() => openComposer('photo')}
            />
            <ComposerAction
              icon={<Smile className="h-5 w-5 text-slate-500" />}
              label="Update"
              onClick={() => openComposer()}
            />
          </div>
          <Button size="sm" className="h-10 shrink-0 rounded-lg px-6" onClick={() => openComposer()}>
            Post
          </Button>
        </div>
      </NetworkCard>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/40 px-3 py-6 backdrop-blur-[2px] sm:items-center">
          <div className="flex max-h-[calc(100dvh-3rem)] w-full max-w-[920px] flex-col overflow-hidden rounded-xl bg-white shadow-panel">
            <div className="relative px-4 py-3 text-center">
              <h2 className="font-display text-xl font-semibold text-ink">Create Post</h2>
              <div className="mx-auto mt-3 h-px w-[70%] bg-line" aria-hidden />
              <button
                type="button"
                onClick={closeComposer}
                className="absolute left-3 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-mist text-black hover:bg-line"
                aria-label="Close composer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-3">
              <div className="flex items-center gap-3">
                <MemberAvatar name={me.name} src={me.avatar} />
                <div>
                  <p className="text-sm font-semibold text-ink">
                    {audience === 'Unanimous' ? 'Anonymous' : me.name}
                  </p>
                  {selectedAudience ? (
                    <AudienceBadge option={selectedAudience} />
                  ) : (
                    <p className="mt-1 text-xs text-muted">Choose who can see this</p>
                  )}
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                {AUDIENCE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() =>
                      setAudience((current) => (current === option.id ? undefined : option.id))
                    }
                    className={cn(
                      'min-w-0 flex-1 rounded-lg px-3 py-2 text-left transition',
                      audience === option.id ? 'bg-brand-light text-brand-dark' : 'bg-mist text-muted hover:bg-line/70',
                    )}
                  >
                    <span className="block whitespace-nowrap text-sm font-semibold">{option.label}</span>
                    <span className="block whitespace-nowrap text-xs font-normal">{option.hint}</span>
                  </button>
                ))}
              </div>

              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={5}
                placeholder={
                  audience === 'Unanimous'
                    ? 'Share the intel. Your name stays off this post.'
                    : `What’s on your mind, ${me.firstName}?`
                }
                className="mt-3 w-full resize-none bg-transparent text-[17px] leading-relaxed text-ink outline-none placeholder:text-muted/70"
              />

              <div className="mt-3 space-y-3">
                <FeelingBar value={feeling} onChange={setFeeling} />
                <label className="block">
                  <span className="text-xs font-semibold text-ink">Where is this?</span>
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    placeholder="City or neighborhood"
                    className="mt-1.5 h-10 w-full rounded-lg border border-line bg-white px-3 text-sm text-ink outline-none placeholder:text-muted focus:border-brand focus:ring-2 focus:ring-brand/20"
                  />
                </label>
              </div>

              <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="sr-only"
                onChange={onPhotoFile}
              />

              {image ? (
                <div className="relative mt-3 overflow-hidden rounded-xl border border-line">
                  <img src={image} alt="" className="h-40 w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImage(undefined)}
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-1 shadow"
                    aria-label="Remove photo"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : null}
              <div className="mt-2 flex gap-2 overflow-x-auto network-hide-scroll pb-1">
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="flex h-16 w-20 shrink-0 flex-col items-center justify-center rounded-lg border border-dashed border-brand/40 bg-brand/5 text-[10px] font-semibold text-brand"
                >
                  <ImageIcon className="mb-1 h-4 w-4" />
                  Upload
                </button>
                {QUICK_PHOTOS.map((src) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setImage(src)}
                    className={cn(
                      'h-16 w-20 shrink-0 overflow-hidden rounded-lg border hover:ring-2 hover:ring-brand',
                      image === src ? 'border-brand ring-2 ring-brand' : 'border-line',
                    )}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="shrink-0 border-t border-line px-4 py-3">
              <div className="mb-3 flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink">
                <span>Add to your post</span>
                <span className="flex items-center gap-1 text-muted">
                  <button
                    type="button"
                    aria-label="Add a photo"
                    onClick={() => photoInputRef.current?.click()}
                    className="rounded-full p-1 hover:bg-mist"
                  >
                    <ImageIcon className="h-5 w-5 text-emerald-600" />
                  </button>
                  <button
                    type="button"
                    aria-label="Post anonymously"
                    onClick={() => setAudience('Unanimous')}
                    className={cn('rounded-full p-1 hover:bg-mist', audience === 'Unanimous' && 'bg-brand-light')}
                  >
                    <UserRound className="h-5 w-5 text-brand" />
                  </button>
                  <button
                    type="button"
                    aria-label="Feeling scale"
                    className={cn('rounded-full p-1 hover:bg-mist', feeling !== undefined && 'bg-brand-light')}
                  >
                    <Smile className="h-5 w-5 text-amber-500" />
                  </button>
                </span>
              </div>
              <p className="mb-3 text-center text-sm font-medium normal-case text-red-600">
                You&apos;ll be notified about each reaction, comment, about your post.
              </p>
              <Button className="w-full rounded-lg" disabled={!canPost} onClick={publish}>
                Ok; Post!
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

function feelingScoreFromPointer(clientX: number, rect: DOMRect) {
  if (rect.width === 0) return 1
  const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
  return Math.min(10, Math.floor(ratio * 10) + 1)
}

function FeelingBar({
  value,
  onChange,
}: {
  value: number | undefined
  onChange: (value: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const percent = value === undefined ? 0 : ((value - 1) / 9) * 100

  function choose(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    onChange(feelingScoreFromPointer(event.clientX, rect))
  }

  return (
    <fieldset>
      <legend className="text-xs font-semibold text-ink">How are you feeling?</legend>
      <div className="mt-2 flex items-center gap-2">
        <span className="shrink-0 text-[11px] font-semibold text-muted">1 (Low)</span>
        <div className="relative min-w-0 flex-1">
          <div className="pointer-events-none absolute inset-x-0 top-4 bottom-4">
            {Array.from({ length: 10 }, (_, index) => (
              <span
                key={index}
                aria-hidden
                className="absolute top-0 bottom-0 w-px -translate-x-1/2 bg-ink/35"
                style={{ left: `${(index / 9) * 100}%` }}
              />
            ))}
          </div>
          <FeelingNumbers value={value} onChange={onChange} className="relative" />
          <div
            ref={trackRef}
            role="slider"
            tabIndex={0}
            aria-label="How are you feeling, from 1 low to 10 good"
            aria-valuemin={1}
            aria-valuemax={10}
            aria-valuenow={value}
            aria-valuetext={value === undefined ? 'Not selected' : `${value} of 10`}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId)
              choose(event)
            }}
            onPointerMove={(event) => {
              if (!event.currentTarget.hasPointerCapture(event.pointerId)) return
              choose(event)
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
                event.preventDefault()
                onChange(Math.min(10, (value ?? 0) + 1))
              }
              if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
                event.preventDefault()
                onChange(Math.max(1, (value ?? 2) - 1))
              }
            }}
            className="relative h-8 cursor-pointer touch-none"
          >
            <div className="absolute top-1/2 h-1.5 w-full -translate-y-1/2 rounded-full bg-line" />
            <div
              className="absolute top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-brand"
              style={{ width: `${percent}%` }}
            />
            {value !== undefined ? (
              <span
                className="absolute top-1/2 z-[1] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand shadow-sm"
                style={{ left: `${percent}%` }}
              />
            ) : null}
          </div>
          <FeelingNumbers value={value} onChange={onChange} className="relative" />
        </div>
        <span className="shrink-0 text-[11px] font-semibold text-muted">10 (Good)</span>
      </div>
    </fieldset>
  )
}

function FeelingNumbers({
  value,
  onChange,
  className,
}: {
  value: number | undefined
  onChange: (value: number) => void
  className?: string
}) {
  return (
    <div className={cn('relative h-4', className)}>
      {Array.from({ length: 10 }, (_, index) => index + 1).map((score) => (
        <button
          key={score}
          type="button"
          onClick={() => onChange(score)}
          className={cn(
            'absolute top-0 -translate-x-1/2 text-[11px] tabular-nums leading-none',
            value === score ? 'font-semibold text-brand' : 'text-muted hover:text-ink',
          )}
          style={{ left: `${((score - 1) / 9) * 100}%` }}
        >
          {score}
        </button>
      ))}
    </div>
  )
}

function AudienceBadge({ option }: { option: (typeof AUDIENCE_OPTIONS)[number] }) {
  const Icon = option.icon
  return (
    <div className="mt-1 inline-flex items-center gap-1 rounded-md bg-mist px-2 py-0.5 text-xs font-semibold text-ink">
      <Icon className="h-3.5 w-3.5" />
      {option.label}
    </div>
  )
}

function ComposerAction({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-sm font-medium text-slate-500 transition hover:bg-mist sm:px-3"
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}
