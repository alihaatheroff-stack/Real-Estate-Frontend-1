import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import { NetworkRightRail } from '@/features/network/components/shell/NetworkRightRail'

export function NetworkPageFrame({
  children,
  right,
  hideRight,
  className,
}: {
  children: ReactNode
  right?: ReactNode
  hideRight?: boolean
  className?: string
}) {
  const showRight = !hideRight

  return (
    <div className={cn('w-full px-3 py-4 sm:px-4 lg:px-5', className)}>
      {showRight ? (
        <div className="grid w-full gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0">{children}</div>
          <aside className="hidden min-w-0 xl:block">{right ?? <NetworkRightRail />}</aside>
        </div>
      ) : (
        <div className="min-w-0 w-full">{children}</div>
      )}
    </div>
  )
}
