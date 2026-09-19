import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { cn } from '@/shared/lib/cn'

type SectionCtasProps = {
  exploreTo: string
  label: string
  className?: string
  id?: string
}

export function SectionCtas({ exploreTo, label, className, id }: SectionCtasProps) {
  return (
    <div id={id} className={cn('mt-10 flex flex-wrap items-center gap-3 scroll-mt-24', className)}>
      <Link to={exploreTo}>
        <Button size="lg">{label}</Button>
      </Link>
    </div>
  )
}
