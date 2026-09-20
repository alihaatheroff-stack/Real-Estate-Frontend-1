import { Link } from 'react-router-dom'
import { Megaphone } from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

export function AdvertiseMenu({ className }: { className?: string }) {
  return (
    <Link
      to={PATHS.advertise}
      className={cn(
        'inline-flex items-center justify-center rounded-lg p-2 text-ink transition hover:bg-mist',
        className,
      )}
      aria-label="Advertise"
    >
      <Megaphone className="h-[1.35rem] w-[1.35rem] stroke-[1.5]" aria-hidden />
    </Link>
  )
}
