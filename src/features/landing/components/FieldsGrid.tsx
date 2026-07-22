import { Link } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { SectionHeading } from '@/components/layout/SectionHeading'
import { PROPERTY_FIELDS } from '@/features/search'
import { PATHS } from '@/app/router/paths'

export function FieldsGrid() {
  return (
    <Section containerClassName="max-w-none">
      <SectionHeading
        eyebrow="Fields"
        title="Explore by property type"
        description="One field grid for referrals — and later crowdfunding and network touchpoints."
        className="w-full [&>div]:max-w-none"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        {PROPERTY_FIELDS.map((field) => (
          <Link
            key={field.id}
            to={`${PATHS.results}?field=${field.id}`}
            className="group relative aspect-[16/10] overflow-hidden rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            <img
              src={field.image}
              alt={field.title}
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent transition duration-500 group-hover:from-ink/90" />
            <p className="absolute bottom-4 left-4 font-display text-xl font-semibold tracking-tight text-paper transition duration-300 group-hover:translate-y-[-2px] sm:text-2xl">
              {field.title}
            </p>
          </Link>
        ))}
      </div>
    </Section>
  )
}
