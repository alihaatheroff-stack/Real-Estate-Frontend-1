import { Link, useParams } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { ProviderProfileView, getProviderById } from '@/features/referrals'
import { PATHS } from '@/app/router/paths'

export function ProviderProfilePage() {
  const { id = '' } = useParams()
  const provider = getProviderById(id)

  if (!provider) {
    return (
      <Section containerClassName="max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6">
        <h1 className="font-display text-2xl font-bold">Provider not found</h1>
        <Link to={PATHS.home} className="mt-4 inline-block text-brand hover:underline">
          Back to home
        </Link>
      </Section>
    )
  }

  return <ProviderProfileView provider={provider} />
}
