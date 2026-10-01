import { PATHS } from '@/app/router/paths'

export type RegisterPolicyId =
  | 'tos'
  | 'privacy'
  | 'community'
  | 'cookie'
  | 'data-broker'
  | 'fair-housing'
  | 'dmca'
  | 'aup'

export type RegisterPolicyAgreement = {
  id: RegisterPolicyId
  label: string
  href: string
}

/** Policies required at registration (same set as the compliance matrix). */
export const REGISTER_POLICY_AGREEMENTS: RegisterPolicyAgreement[] = [
  { id: 'tos', label: 'Terms of Service', href: PATHS.termsOfService },
  { id: 'privacy', label: 'Privacy Policy', href: PATHS.privacyPolicy },
  { id: 'community', label: 'Community Guidelines', href: PATHS.communityGuidelines },
  { id: 'cookie', label: 'Cookie Policy', href: PATHS.cookiePolicy },
  {
    id: 'data-broker',
    label: 'Data Broker Registration Statement',
    href: PATHS.dataBrokerStatement,
  },
  {
    id: 'fair-housing',
    label: 'Fair Housing Statement',
    href: PATHS.fairHousingStatement,
  },
  { id: 'dmca', label: 'DMCA / Copyright Policy', href: PATHS.dmcaCopyrightPolicy },
  { id: 'aup', label: 'Acceptable Use Policy', href: PATHS.acceptableUsePolicy },
]

export type AcceptedPolicies = Record<RegisterPolicyId, boolean>

export function createEmptyAcceptedPolicies(): AcceptedPolicies {
  return {
    tos: false,
    privacy: false,
    community: false,
    cookie: false,
    'data-broker': false,
    'fair-housing': false,
    dmca: false,
    aup: false,
  }
}

export function allPoliciesAccepted(accepted: AcceptedPolicies): boolean {
  return REGISTER_POLICY_AGREEMENTS.every((doc) => accepted[doc.id])
}
