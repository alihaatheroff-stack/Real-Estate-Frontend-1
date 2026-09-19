import { Link, useParams } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { EmployerEmployeesView } from '@/features/referrals/components/EmployerEmployeesView'
import { getEmployerById } from '@/features/referrals'
import { PATHS } from '@/app/router/paths'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'

export function EmployerEmployeesPage() {
  const { id = '' } = useParams()
  const employer = getEmployerById(id)

  if (!employer) {
    return (
      <Section className="py-16" containerClassName={MARKETPLACE_PAGE_PAD}>
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

  return <EmployerEmployeesView employer={employer} />
}
