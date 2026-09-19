import { Link, useParams } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { EmployerJobsView } from '@/features/referrals/components/EmployerJobsView'
import { getEmployerById } from '@/features/referrals'
import { PATHS } from '@/app/router/paths'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'

export function EmployerJobsPage() {
  const { id = '' } = useParams()
  const employer = getEmployerById(id)

  if (!employer) {
    return (
      <Section containerClassName={MARKETPLACE_PAGE_PAD}>
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

  return <EmployerJobsView employer={employer} />
}
