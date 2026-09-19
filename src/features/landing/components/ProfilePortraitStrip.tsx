import { Link } from 'react-router-dom'
import { providerPath } from '@/app/router/paths'
import type { Provider } from '@/entities/provider/types'
import { cn } from '@/shared/lib/cn'

type ProfilePortraitStripProps = {
  providers: Provider[]
  className?: string
}

/** Bordered portrait tiles matching the logged-in Referrals mockup. */
export function ProfilePortraitStrip({ providers, className }: ProfilePortraitStripProps) {
  if (providers.length === 0) return null

  return (
    <div className={cn('flex gap-3 overflow-x-auto pb-1 sm:gap-4', className)}>
      {providers.map((provider) => (
        <Link
          key={provider.id}
          to={providerPath(provider.id)}
          className="group relative aspect-[4/5] w-[min(42vw,9.5rem)] shrink-0 overflow-hidden border-2 border-black bg-white sm:w-[10.5rem]"
        >
          <img
            src={provider.image}
            alt={provider.name}
            className="h-full w-full object-cover object-[center_20%] transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-2 pb-2 pt-8 text-[0.7rem] font-semibold text-white opacity-0 transition group-hover:opacity-100">
            {provider.name}
          </span>
        </Link>
      ))}
    </div>
  )
}
