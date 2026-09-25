import { Link } from 'react-router-dom'
import { networkProfilePath } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type MemberAvatarProps = {
  name: string
  src?: string
  memberId?: string
  size?: AvatarSize
  online?: boolean
  ring?: boolean
  framed?: boolean
  className?: string
}

const sizes: Record<AvatarSize, string> = {
  xs: 'size-7',
  sm: 'size-9',
  md: 'size-10',
  lg: 'size-16',
  xl: 'size-44',
}

const dots: Record<AvatarSize, string> = {
  xs: 'size-2',
  sm: 'size-2.5',
  md: 'size-3',
  lg: 'size-3.5',
  xl: 'size-5',
}

export function MemberAvatar({
  name,
  src,
  memberId,
  size = 'md',
  online,
  ring,
  framed,
  className,
}: MemberAvatarProps) {
  const avatar = (
    <span
      className={cn(
        'relative block shrink-0 overflow-hidden rounded-full bg-mist',
        sizes[size],
        ring && 'ring-2 ring-brand ring-offset-2 ring-offset-white',
        className,
      )}
    >
      {src ? (
        <img
          src={src}
          alt=""
          className="absolute inset-0 size-full max-w-none object-cover object-[center_18%]"
        />
      ) : null}
      {online ? (
        <span
          className={cn(
            'absolute right-0.5 bottom-0.5 rounded-full border-2 border-white bg-emerald-500',
            dots[size],
          )}
        />
      ) : null}
    </span>
  )

  const framedAvatar = framed ? (
    <span className="inline-grid place-items-center rounded-full bg-white p-[3px] shadow-[0_2px_8px_rgba(15,31,26,0.16)] ring-1 ring-black/5">
      {avatar}
    </span>
  ) : (
    avatar
  )

  if (!memberId) {
    return (
      <span className="inline-block shrink-0 leading-none">
        {framedAvatar}
        <span className="sr-only">{name}</span>
      </span>
    )
  }

  return (
    <Link
      to={networkProfilePath(memberId)}
      className="inline-block shrink-0 rounded-full leading-none"
      title={name}
    >
      {framedAvatar}
      <span className="sr-only">{name}</span>
    </Link>
  )
}
