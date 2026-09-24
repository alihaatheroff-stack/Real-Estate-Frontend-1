import { useId, useRef, type ChangeEvent } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { cn } from '@/shared/lib/cn'
import type { AdImage, AdvertisementDraft } from '@/features/advertise/types'
import { isAdVideo } from '@/features/advertise/types'

type CreateAdvertisementFormProps = {
  draft: AdvertisementDraft
  onChange: (next: AdvertisementDraft) => void
  /** When false, omit the outer card chrome (for nesting in a shared box). */
  framed?: boolean
  className?: string
}

function revokeImage(image: AdImage) {
  URL.revokeObjectURL(image.previewUrl)
}

export function CreateAdvertisementForm({
  draft,
  onChange,
  framed = true,
  className,
}: CreateAdvertisementFormProps) {
  const fileInputId = useId()
  const fileRef = useRef<HTMLInputElement>(null)

  function patch(partial: Partial<AdvertisementDraft>) {
    onChange({ ...draft, ...partial })
  }

  function onFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).filter(
      (file) => file.type.startsWith('image/') || file.type.startsWith('video/'),
    )
    event.target.value = ''
    if (!files.length) return

    const nextImages: AdImage[] = files.map((file) => ({
      id: `${Date.now()}-${file.name}-${Math.random().toString(36).slice(2, 8)}`,
      file,
      previewUrl: URL.createObjectURL(file),
    }))
    patch({ images: [...draft.images, ...nextImages] })
  }

  function removeImage(id: string) {
    const target = draft.images.find((image) => image.id === id)
    if (target) revokeImage(target)
    patch({ images: draft.images.filter((image) => image.id !== id) })
  }

  return (
    <section
      className={cn(
        'flex min-w-0 flex-col overflow-hidden',
        framed && 'rounded-2xl border border-line bg-white shadow-sm',
        className,
      )}
    >
      <div className={cn('px-4 py-3 sm:px-5', framed && 'border-b border-line')}>
        <p className="text-sm text-muted">
          Add a headline, images, and copy — then ask the AI assistant to review.
        </p>
      </div>

      <div className="flex flex-col gap-4 px-4 pb-5 pt-1 sm:px-5">
        <Input
          label="Headline"
          name="adTitle"
          value={draft.title}
          onChange={(event) => patch({ title: event.target.value })}
          placeholder="e.g. Find trusted agents in Fresno"
        />

        <label className="flex flex-col gap-1.5 text-sm">
          <span className="font-bold text-ink">Description</span>
          <textarea
            name="adDescription"
            rows={5}
            value={draft.description}
            onChange={(event) => patch({ description: event.target.value })}
            placeholder="Describe the offer, audience, and what viewers should do next…"
            className="rounded-xl border border-line bg-paper px-3 py-2.5 text-ink outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
          />
        </label>

        <Input
          label="CTA / destination URL (optional)"
          name="adCta"
          type="url"
          value={draft.cta}
          onChange={(event) => patch({ cta: event.target.value })}
          placeholder="https://example.com/landing"
        />

        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-ink">Images & Videos</span>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-sm font-medium text-brand transition hover:bg-brand/5"
            >
              <ImagePlus className="h-4 w-4" strokeWidth={1.75} />
              Add images & videos
            </button>
          </div>

          <input
            id={fileInputId}
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            multiple
            className="sr-only"
            onChange={onFiles}
          />

          {draft.images.length === 0 ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex min-h-[8rem] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-brand/25 bg-[linear-gradient(180deg,#f8faf9_0%,#eef2f0_100%)] px-4 py-6 text-sm text-muted transition hover:border-brand/50 hover:bg-brand/5"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                <ImagePlus className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <span className="font-medium text-ink-soft">Drop or choose photos & videos</span>
              <span className="text-xs text-muted">These appear instantly in the live preview</span>
            </button>
          ) : (
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {draft.images.map((image) => (
                <li
                  key={image.id}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-line bg-mist"
                >
                  {isAdVideo(image) ? (
                    <video
                      src={image.previewUrl}
                      className="h-full w-full object-cover"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={image.previewUrl}
                      alt={image.file.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute right-1.5 top-1.5 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink/75 text-white opacity-90 transition hover:bg-ink"
                    aria-label={`Remove ${image.file.name}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
