import { Link, useParams } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { EmployerDetailView, getEmployerById } from '@/features/referrals'
import { PATHS } from '@/app/router/paths'

export function EmployerDetailPage() {
  const { id = '' } = useParams()
  const employer = getEmployerById(id)

  if (!employer) {
    return (
      <Section containerClassName="max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6">
        <h1 className="font-display text-2xl font-bold">Employer not found</h1>
        <Link
          to={PATHS.employerResults}
          className="mt-4 inline-block text-brand hover:underline"
        >
          Back to employers
        </Link>
      </Section>
    )
  }

  return <EmployerDetailView employer={employer} />
}
