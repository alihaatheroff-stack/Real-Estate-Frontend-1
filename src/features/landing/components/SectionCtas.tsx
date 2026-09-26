import { Link } from 'react-router-dom'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
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
    <ScrollReveal id={id} className={cn('mt-10 scroll-mt-24', className)}>
      <div className="flex flex-wrap items-center gap-3">
        <Link to={exploreTo}>
          <Button size="lg">{label}</Button>
        </Link>
      </div>
    </ScrollReveal>
  )
}
