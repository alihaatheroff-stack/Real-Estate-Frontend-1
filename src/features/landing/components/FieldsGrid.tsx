import { Link } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { ScrollReveal } from '@/components/motion/ScrollReveal'
import { PROPERTY_FIELDS } from '@/features/search'
import { PATHS } from '@/app/router/paths'
import { cn } from '@/shared/lib/cn'

type FieldsGridProps = {
  /** Render without outer Section — for nesting under Referrals. */
  embedded?: boolean
  className?: string
}

export function FieldsGrid({ embedded = false, className }: FieldsGridProps) {
  const content = (
    <div className={cn(embedded && 'mt-2', className)}>
      <ScrollReveal>
        <SectionHeading
          title="Explore all Real Fields"
          size={embedded ? 'subsection' : 'section'}
          className="w-full [&>div]:max-w-none"
        />
      </ScrollReveal>
      <ScrollReveal delay={90}>
        <div className="flex gap-4 overflow-x-auto pb-1 lg:gap-5">
        {PROPERTY_FIELDS.map((field) => (
          <Link
            key={field.id}
            to={`${PATHS.results}?field=${field.id}`}
            className="group relative aspect-[16/10] w-[min(72vw,18rem)] shrink-0 overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:w-[min(40vw,16rem)] lg:w-auto lg:min-w-0 lg:flex-1"
          >
            <img
              src={field.image}
              alt={field.title}
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition duration-500 group-hover:from-ink/90" />
            <p className="absolute bottom-4 left-4 font-display text-lg font-semibold tracking-tight text-paper transition duration-300 group-hover:translate-y-[-2px] sm:text-xl">
              {field.title}
            </p>
          </Link>
        ))}
        </div>
      </ScrollReveal>
    </div>
  )

  if (embedded) return content

  return <Section containerClassName="max-w-none">{content}</Section>
}
