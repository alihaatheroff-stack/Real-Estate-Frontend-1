import { useEffect, useMemo, useState, type ReactNode } from 'react'
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
  { id: 'Public', label: 'Public', hint: 'Anyone on RE Network', icon: Globe2 },
  { id: 'Friends', label: 'Friends', hint: 'Your connections only', icon: Users },
  { id: 'Unanimous', label: 'Unanimous', hint: 'Visible, author unnamed', icon: Lock },
]

const QUICK_PHOTOS = [STOCK.house1, STOCK.tower, STOCK.build, STOCK.interior, STOCK.meeting]

export function Composer() {
  const me = getCurrentMember()
  const { addPost } = useNetworkSocial()
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [audience, setAudience] = useState<PostAudience>('Public')
  const [image, setImage] = useState<string | undefined>()

  const canPost = text.trim().length > 0

  function publish() {
    if (!canPost) return
    addPost({ text: text.trim(), audience, image })
    setText('')
    setImage(undefined)
    setAudience('Public')
    setOpen(false)
  }

  const AudienceIcon = useMemo(
    () => AUDIENCE_OPTIONS.find((option) => option.id === audience)?.icon ?? Globe2,
    [audience],
  )

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <NetworkCard className="p-3 sm:p-4">
        <div className="flex items-center gap-3">
          <MemberAvatar name={me.name} src={me.avatar} memberId={me.id} />
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                publish()
              }
            }}
            placeholder="What’s happening?"
            className="h-11 min-w-0 flex-1 rounded-full bg-[#F0F2F5] px-4 text-[15px] text-ink outline-none placeholder:text-muted focus:ring-2 focus:ring-brand/20"
          />
        </div>
        {image ? (
          <div className="relative mt-3 overflow-hidden rounded-xl border border-line">
            <img src={image} alt="" className="h-28 w-full object-cover" />
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
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center">
            <ComposerAction
              icon={<Video className="h-5 w-5 text-slate-500" />}
              label="Live"
              onClick={() => setOpen(true)}
            />
            <ComposerAction
              icon={<ImageIcon className="h-5 w-5 text-slate-500" />}
              label="Photo"
              onClick={() => setOpen(true)}
            />
            <ComposerAction
              icon={<Smile className="h-5 w-5 text-slate-500" />}
              label="Feeling"
              onClick={() => setOpen(true)}
            />
          </div>
          <Button
            size="sm"
            className="h-10 shrink-0 rounded-lg px-6"
            disabled={!canPost}
            onClick={publish}
          >
            Post
          </Button>
        </div>
      </NetworkCard>

      {open ? (
        <div className="fixed inset-0 z-[80] flex items-start justify-center bg-ink/40 px-3 py-10 backdrop-blur-[2px] sm:items-center">
          <div className="flex w-full max-w-[500px] flex-col overflow-hidden rounded-xl bg-white shadow-panel">
            <div className="relative border-b border-line px-4 py-3 text-center">
              <h2 className="font-display text-xl font-semibold text-ink">Create post</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-3 top-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-mist text-muted hover:bg-line"
                aria-label="Close composer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <MemberAvatar name={me.name} src={me.avatar} />
                <div>
                  <p className="text-sm font-semibold text-ink">{me.name}</p>
                  <div className="mt-1 inline-flex items-center gap-1 rounded-md bg-mist px-2 py-0.5 text-xs font-semibold text-ink">
                    <AudienceIcon className="h-3.5 w-3.5" />
                    {audience}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex gap-1">
                {AUDIENCE_OPTIONS.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setAudience(option.id)}
                    className={cn(
                      'flex-1 rounded-lg px-2 py-1.5 text-left text-[11px] leading-tight transition',
                      audience === option.id ? 'bg-brand-light text-brand-dark' : 'bg-mist text-muted hover:bg-line/70',
                    )}
                  >
                    <span className="block font-semibold">{option.label}</span>
                    <span className="text-[10px] font-normal">{option.hint}</span>
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

              {image ? (
                <div className="relative mt-2 overflow-hidden rounded-xl border border-line">
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
              ) : (
                <div className="mt-1 flex gap-2 overflow-x-auto network-hide-scroll pb-1">
                  {QUICK_PHOTOS.map((src) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setImage(src)}
                      className="h-16 w-20 shrink-0 overflow-hidden rounded-lg border border-line hover:ring-2 hover:ring-brand"
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t border-line px-4 py-3">
              <div className="mb-3 flex items-center justify-between rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink">
                <span>Add to your post</span>
                <span className="flex items-center gap-2 text-muted">
                  <ImageIcon className="h-5 w-5 text-emerald-600" />
                  <UserRound className="h-5 w-5 text-brand" />
                  <Smile className="h-5 w-5 text-amber-500" />
                </span>
              </div>
              <Button className="w-full rounded-lg" disabled={!canPost} onClick={publish}>
                Post
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
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
