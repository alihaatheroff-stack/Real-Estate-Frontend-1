import { Link, useParams } from 'react-router-dom'
import { Section } from '@/components/layout/Section'
import { CrowdfundingProfileView } from '@/features/crowdfunding/components/CrowdfundingProfileView'
import { getCrowdfundingProfile } from '@/features/crowdfunding/data/crowdfundingProfiles'
import { PATHS } from '@/app/router/paths'

export function CrowdfundingProfilePage() {
  const { id = '' } = useParams()
  const profile = getCrowdfundingProfile(id)

  if (!profile) {
    return (
      <Section containerClassName="max-w-none pl-5 pr-3 sm:pl-8 sm:pr-5 lg:pl-12 lg:pr-6">
        <h1 className="font-display text-2xl font-bold">Crowdfund profile not found</h1>
        <Link to={PATHS.crowdfunding} className="mt-4 inline-block text-brand hover:underline">
          Back to crowdfunding
        </Link>
      </Section>
    )
  }

  return <CrowdfundingProfileView profile={profile} />
}
