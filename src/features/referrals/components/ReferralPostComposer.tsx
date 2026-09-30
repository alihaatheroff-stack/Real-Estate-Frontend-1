import { useEffect, useId, useRef, useState, type ChangeEvent } from 'react'
import { createPortal } from 'react-dom'
import { ImagePlus, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MemberAvatar } from '@/features/network/components/shared/MemberAvatar'
import { getCurrentMember } from '@/features/network/data/members'
import { cn } from '@/shared/lib/cn'
import { saveReferralPost } from '@/features/referrals/model/referralPosts'

const MAX_IMAGES = 5

type ReferralPostComposerProps = {
  open: boolean
  onClose: () => void
}

export function ReferralPostComposer({ open, onClose }: ReferralPostComposerProps) {
  const me = getCurrentMember()
  const titleId = useId()
  const photoInputRef = useRef<HTMLInputElement>(null)
  const [text, setText] = useState('')
  const [images, setImages] = useState<string[]>([])

  const canPost = text.trim().length > 0 || images.length > 0
  const slotsLeft = MAX_IMAGES - images.length

  function reset() {
    setText('')
    setImages([])
  }

  function handleClose() {
    reset()
    onClose()
  }

  function onPhotoFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ''
    if (files.length === 0 || slotsLeft <= 0) return

    const accepted = files
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, slotsLeft)

    accepted.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (typeof reader.result !== 'string') return
        setImages((current) =>
          current.length >= MAX_IMAGES ? current : [...current, reader.result as string],
        )
      }
      reader.readAsDataURL(file)
    })
  }

  function removeImage(index: number) {
    setImages((current) => current.filter((_, i) => i !== index))
  }

  function publish() {
    if (!canPost) return
    saveReferralPost({
      text: text.trim(),
      images,
      authorId: me.id,
      authorName: me.name,
    })
    handleClose()
  }

  useEffect(() => {
    if (!open) return
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[220] flex items-start justify-center overflow-y-auto bg-ink/40 px-3 py-6 backdrop-blur-[2px] sm:items-center">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="flex max-h-[calc(100dvh-3rem)] w-full max-w-[560px] flex-col overflow-hidden rounded-xl bg-white shadow-panel"
      >
        <div className="relative border-b border-line px-4 py-3 text-center">
          <h2 id={titleId} className="font-display text-xl font-semibold text-ink">
            Create Referral post
          </h2>
          <p className="mt-1 text-xs text-muted">Share an update with your referral circle.</p>
          <button
            type="button"
            onClick={handleClose}
            className="absolute left-3 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-black bg-mist text-black hover:bg-line"
            aria-label="Close composer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <MemberAvatar name={me.name} src={me.avatar} />
            <div>
              <p className="text-sm font-semibold text-ink">{me.name}</p>
              <p className="text-xs text-muted">Posting in Referral</p>
            </div>
          </div>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={5}
            autoFocus
            placeholder={`What’s happening in your referral network, ${me.firstName}?`}
            className="mt-4 w-full resize-none bg-transparent text-[17px] leading-relaxed text-ink outline-none placeholder:text-muted/70"
          />

          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={onPhotoFiles}
          />

          {images.length > 0 ? (
            <div
              className={cn(
                'mt-3 grid gap-2',
                images.length === 1 && 'grid-cols-1',
                images.length === 2 && 'grid-cols-2',
                images.length >= 3 && 'grid-cols-2 sm:grid-cols-3',
              )}
            >
              {images.map((src, index) => (
                <div
                  key={`${src.slice(0, 32)}-${index}`}
                  className="relative overflow-hidden rounded-xl border border-line"
                >
                  <img src={src} alt="" className="aspect-[4/3] h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute right-2 top-2 rounded-full bg-white/90 p-1 shadow"
                    aria-label={`Remove photo ${index + 1}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-4 rounded-xl border border-line px-3 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-ink">Add photos</p>
                <p className="mt-0.5 text-xs text-muted">
                  Up to {MAX_IMAGES} images · {images.length}/{MAX_IMAGES} added
                </p>
              </div>
              <button
                type="button"
                disabled={slotsLeft <= 0}
                onClick={() => photoInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-mist px-3 py-2 text-sm font-semibold text-ink transition hover:bg-line disabled:pointer-events-none disabled:opacity-50"
              >
                <ImagePlus className="h-4 w-4 text-emerald-600" />
                Upload
              </button>
            </div>

            {slotsLeft > 0 ? (
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="mt-3 flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-brand/35 bg-brand/5 px-4 py-6 text-sm font-semibold text-brand transition hover:bg-brand/10"
              >
                <ImagePlus className="h-6 w-6" />
                Choose {slotsLeft === MAX_IMAGES ? '4–5 photos' : `up to ${slotsLeft} more`}
              </button>
            ) : null}
          </div>
        </div>

        <div className="shrink-0 border-t border-line px-4 py-3">
          <Button className="w-full rounded-lg" disabled={!canPost} onClick={publish}>
            Post to Referral
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
