import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import { NetworkRightRail } from '@/features/network/components/shell/NetworkRightRail'

function RailStack({
  children,
  align,
}: {
  children: ReactNode
  align: 'left' | 'right'
}) {
  return (
    <div
      className={cn(
        'network-shell-scroll flex h-full flex-col gap-4 overflow-x-hidden overflow-y-auto overscroll-contain [&>*]:shrink-0',
        align === 'right' ? 'pl-2 pr-2' : 'pr-2',
      )}
    >
      {children}
    </div>
  )
}

export function NetworkPageFrame({
  children,
  left,
  right,
  hideRight,
  fill = false,
  className,
}: {
  children: ReactNode
  left?: ReactNode
  right?: ReactNode
  hideRight?: boolean
  /** Fill the network main area so side columns can share one ending edge. */
  fill?: boolean
  className?: string
}) {
  const showRight = !hideRight
  const showLeft = Boolean(left)

  return (
    <div
      className={cn(
        'w-full py-4',
        fill && 'xl:flex xl:h-full xl:min-h-0 xl:flex-col xl:overflow-hidden',
        showLeft && showRight ? 'px-3 sm:px-4 lg:pr-0' : 'px-3 sm:px-4 lg:px-5',
        className,
      )}
    >
      {showLeft || showRight ? (
        <div
          className={cn(
            'grid w-full items-start gap-5',
            showLeft && showRight
              ? 'lg:grid-cols-[minmax(0,1fr)_minmax(240px,270px)] xl:grid-cols-[minmax(230px,260px)_minmax(0,1fr)_minmax(240px,270px)]'
              : showRight
                ? 'xl:grid-cols-[minmax(0,1fr)_260px]'
                : 'xl:grid-cols-[260px_minmax(0,1fr)]',
          )}
        >
          {showLeft ? (
            <aside className="sticky top-4 hidden h-[calc(100dvh-6.25rem)] min-w-0 xl:block">
              <RailStack align="left">{left}</RailStack>
            </aside>
          ) : null}
          <div className="min-w-0">{children}</div>
          {showRight ? (
            <aside
              className={cn(
                'sticky top-4 h-[calc(100dvh-6.25rem)] min-w-0',
                showLeft ? 'hidden lg:block' : 'hidden xl:block',
              )}
            >
              <RailStack align="right">{right ?? <NetworkRightRail />}</RailStack>
            </aside>
          ) : null}
        </div>
      ) : (
        <div className={cn('min-w-0 w-full', fill && 'xl:flex xl:min-h-0 xl:flex-1 xl:flex-col')}>
          {children}
        </div>
      )}
    </div>
  )
}
