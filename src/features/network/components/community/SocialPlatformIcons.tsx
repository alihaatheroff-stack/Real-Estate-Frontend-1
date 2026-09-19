import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type IconProps = {
  className?: string
}

function BrandIcon({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn('size-4 fill-current', className)}
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  )
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <BrandIcon label="Instagram" className={className}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C8.74 0 8.333.015 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.74 0 12s.014 3.668.072 4.948c.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.74 24 12 24s3.668-.014 4.948-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 2.16c3.203 0 3.585.016 4.85.071 3.269.148 4.771 1.691 4.919 4.919.055 1.265.073 1.645.073 4.849s-.016 3.585-.071 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.055-1.646.072-4.85.072s-3.585-.016-4.849-.071c-3.26-.149-4.771-1.699-4.919-4.92-.055-1.265-.072-1.644-.072-4.849s.016-3.585.071-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.055 1.646-.072 4.849-.072ZM12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"
      />
    </BrandIcon>
  )
}

export function XTwitterIcon({ className }: IconProps) {
  return (
    <BrandIcon label="X" className={className}>
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22h-6.59l-5.16-6.74L5.2 22H1.93l8.02-9.17L1.5 2h6.76l4.66 6.17L18.244 2Zm-1.16 18.06h1.8L7.01 3.86H5.08l12.004 16.2Z" />
    </BrandIcon>
  )
}

export function LinkedInIcon({ className }: IconProps) {
  return (
    <BrandIcon label="LinkedIn" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125ZM7.119 20.452H3.555V9h3.564v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003Z" />
    </BrandIcon>
  )
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <BrandIcon label="Facebook" className={className}>
      <path d="M24 12.073C24 5.446 18.627.073 12 .073S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z" />
    </BrandIcon>
  )
}

export const COMMUNITY_SOCIALS = [
  { label: 'Instagram', Icon: InstagramIcon },
  { label: 'X', Icon: XTwitterIcon },
  { label: 'LinkedIn', Icon: LinkedInIcon },
  { label: 'Facebook', Icon: FacebookIcon },
] as const
