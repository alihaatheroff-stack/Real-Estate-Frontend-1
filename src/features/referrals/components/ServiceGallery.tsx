import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

type ServiceGalleryProps = {
  images: string[]
  title: string
}

export function ServiceGallery({ images, title }: ServiceGalleryProps) {
  const [active, setActive] = useState(0)
  const [failed, setFailed] = useState<Record<number, boolean>>({})
  const fallback =
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80'

  if (images.length === 0) return null

  const current = failed[active] ? fallback : images[active]

  function go(delta: number) {
    setActive((index) => (index + delta + images.length) % images.length)
  }

  return (
    <div className="space-y-2.5">
      <div className="relative overflow-hidden rounded-xl bg-ink sm:rounded-2xl">
        <img
          src={current}
          alt={`${title} — image ${active + 1}`}
          className="aspect-[16/10] w-full object-cover"
          onError={() => setFailed((prev) => ({ ...prev, [active]: true }))}
        />
        {images.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-soft transition hover:bg-white sm:left-4 sm:h-12 sm:w-12"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-soft transition hover:bg-white sm:right-4 sm:h-12 sm:w-12"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </>
        ) : null}
      </div>

      {images.length > 1 ? (
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                'overflow-hidden rounded-lg border-2 transition sm:rounded-xl',
                active === index ? 'border-brand' : 'border-transparent opacity-80 hover:opacity-100',
              )}
            >
              <img
                src={failed[index] ? fallback : src}
                alt=""
                className="aspect-[4/3] w-full object-cover"
                onError={() => setFailed((prev) => ({ ...prev, [index]: true }))}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
