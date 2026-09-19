import { getProviderById } from '@/features/referrals/api/repository'
import type { Provider } from '@/entities/provider/types'

export type LandingModule = 'referrals' | 'crowdfunding' | 'network'

type ModuleTopProvidersConfig = {
  eyebrow: string
  title: string
  description: string
  /** Curated, non-overlapping provider IDs per module. */
  providerIds: string[]
}

export const MODULE_TOP_PROVIDERS: Record<LandingModule, ModuleTopProvidersConfig> = {
  referrals: {
    eyebrow: 'Top rated',
    title: 'Highest Rated PSPs',
    description:
      'Connect with verified professionals trusted by clients for quality work and strong results.',
    // Distinct from crowdfunding + network sets
    providerIds: ['p3', 'p1', 'p5', 'p2'],
  },
  crowdfunding: {
    eyebrow: 'Participants',
    title: 'Most Active Participants.',
    description: '',
    providerIds: ['p6', 'p12', 'p9', 'p10', 'p11', 'p4'],
  },
  network: {
    eyebrow: 'Contributors',
    title: 'Active Contributors',
    description:
      'Connectors and community leads who turn professional graph intros into real deal outcomes.',
    providerIds: ['p13', 'p14', 'p15', 'p16', 'p7', 'p8'],
  },
}

export function getModuleTopProviders(module: LandingModule): Provider[] {
  return MODULE_TOP_PROVIDERS[module].providerIds
    .map((id) => getProviderById(id))
    .filter((provider): provider is Provider => provider != null)
}
