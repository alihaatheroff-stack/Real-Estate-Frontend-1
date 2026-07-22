import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import {
  LEFT_ADS,
  RIGHT_STACK_ADS,
  type HeroAd,
} from '@/features/landing/data/heroAds'
import { cn } from '@/shared/lib/cn'

function AdCard({
  ad,
  tall = false,
  className,
}: {
  ad: HeroAd
  tall?: boolean
  className?: string
}) {
  return (
    <Link
      to={ad.href}
      className={cn(
        'group relative block min-h-0 overflow-hidden border border-white/15 bg-ink/40 shadow-soft backdrop-blur-sm transition',
        'hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        tall ? 'aspect-[3/4]' : 'aspect-square',
        className,
      )}
    >
      <img
        src={ad.image}
        alt={ad.title}
        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2">
        <p className="text-[10px] font-semibold leading-tight tracking-wide text-paper sm:text-xs">
          {ad.title}
        </p>
        {ad.subtitle ? (
          <p className="mt-0.5 text-[9px] leading-tight text-paper/70 sm:text-[10px]">
            {ad.subtitle}
          </p>
        ) : null}
      </div>
    </Link>
  )
}

function AdvertiseLink({ className }: { className?: string }) {
  return (
    <Link
      to={PATHS.advertise}
      className={cn(
        'block border-t border-line/60 bg-paper/95 px-2 py-2 text-center text-[10px] font-semibold tracking-wide text-ink transition hover:bg-accent hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50',
        className,
      )}
    >
      Advertise here
    </Link>
  )
}

export function HeroAdRails() {
  return (
    <>
      {/* Left rail — flush to edge */}
      <aside className="absolute inset-y-0 left-0 z-[6] hidden w-[clamp(7.5rem,11vw,11rem)] flex-col gap-1.5 p-0 lg:flex">
        <div className="flex min-h-0 flex-1 flex-col gap-1.5">
          {LEFT_ADS.map((ad) => (
            <AdCard key={ad.id} ad={ad} tall className="min-h-0 flex-1 rounded-none aspect-auto" />
          ))}
        </div>
        <AdvertiseLink className="shrink-0" />
      </aside>

      {/* Right rail — two tall ads only (Wix template) */}
      <aside className="absolute inset-y-0 right-0 z-[6] hidden w-[clamp(7.5rem,11vw,11rem)] flex-col gap-1.5 xl:flex">
        <div className="flex min-h-0 flex-1 flex-col gap-1.5">
          {RIGHT_STACK_ADS.map((ad) => (
            <AdCard key={ad.id} ad={ad} tall className="min-h-0 flex-1 rounded-none aspect-auto" />
          ))}
        </div>
        <AdvertiseLink className="shrink-0" />
      </aside>

      {/* Mobile / tablet compact ad strip */}
      <div className="absolute right-0 top-0 z-[6] flex max-w-[48%] gap-1 overflow-hidden xl:hidden">
        {LEFT_ADS.slice(0, 1).map((ad) => (
          <Link
            key={ad.id}
            to={ad.href}
            className="relative h-16 w-20 shrink-0 overflow-hidden border border-white/20 transition hover:border-accent/50"
          >
            <img src={ad.image} alt={ad.title} className="h-full w-full object-cover" />
            <span className="absolute inset-x-0 bottom-0 bg-ink/75 px-1 py-0.5 text-[9px] font-semibold text-paper">
              {ad.title}
            </span>
          </Link>
        ))}
      </div>
    </>
  )
}
