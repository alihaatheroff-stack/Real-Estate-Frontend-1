import { BadgeCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { networkProfilePath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

export function VerifiedName({
  name,
  memberId,
  verified,
  className,
}: {
  name: string
  memberId: string
  verified?: boolean
  className?: string
}) {
  return (
    <Link
      to={networkProfilePath(memberId)}
      className={cn(
        'inline-flex max-w-full items-center gap-1 font-semibold text-ink hover:underline',
        className,
      )}
    >
      <span className="truncate">{name}</span>
      {verified ? (
        <BadgeCheck className="h-4 w-4 shrink-0 fill-brand text-white" strokeWidth={1.75} />
      ) : null}
    </Link>
  )
}
