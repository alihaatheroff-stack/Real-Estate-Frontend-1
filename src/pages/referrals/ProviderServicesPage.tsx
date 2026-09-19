import { Link, useParams } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { ProviderServicesView } from '@/features/referrals/components/ProviderServicesView'
import { getProviderById } from '@/features/referrals'
import { PATHS } from '@/app/router/paths'
import { MARKETPLACE_PAGE_PAD } from '@/features/referrals/lib/marketplaceLayout'

export function ProviderServicesPage() {
  const { id = '' } = useParams()
  const provider = getProviderById(id)

  if (!provider) {
    return (
      <Section containerClassName={MARKETPLACE_PAGE_PAD}>
        <h1 className="font-display text-2xl font-bold">Provider not found</h1>
        <Link to={PATHS.home} className="mt-4 inline-block text-brand hover:underline">
          Back to home
        </Link>
      </Section>
    )
  }

  return <ProviderServicesView provider={provider} />
}
