import { Link, useParams } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { ServiceDetailView, getServiceById } from '@/features/referrals'
import { PATHS } from '@/app/router/paths'

export function ServiceDetailPage() {
  const { id = '' } = useParams()
  const service = getServiceById(id)

  if (!service) {
    return (
      <Section containerClassName="max-w-none px-5 sm:px-8 lg:px-10">
        <h1 className="font-display text-2xl font-bold">Service not found</h1>
        <Link to={PATHS.results} className="mt-4 inline-block text-brand hover:underline">
          Back to results
        </Link>
      </Section>
    )
  }

  return <ServiceDetailView service={service} />
}
