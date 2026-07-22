import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'
import { Container } from '@/components/layout/Container'

type SectionProps = {
  children: ReactNode
  className?: string
  id?: string
  containerClassName?: string
}

export function Section({
  children,
  className,
  id,
  containerClassName,
}: SectionProps) {
  return (
    <section id={id} className={cn('py-14 sm:py-20', className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}
