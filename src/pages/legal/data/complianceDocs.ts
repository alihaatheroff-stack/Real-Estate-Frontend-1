import { PATHS } from '@/app/router/paths'

export type ComplianceDoc = {
  id: string
  label: string
  href: string
}

/** Alphabetical list shown on the Compliance hub (matches product mock). */
export const COMPLIANCE_DOCS: ComplianceDoc[] = [
  { id: 'aup', label: 'ACCEPTABLE USE POLICY', href: PATHS.acceptableUsePolicy },
  { id: 'community', label: 'COMMUNITY GUIDELINES', href: PATHS.communityGuidelines },
  { id: 'cookie', label: 'COOKIE POLICY', href: PATHS.cookiePolicy },
  {
    id: 'data-broker',
    label: 'DATA BROKER REGISTRATION STATEMENT',
    href: PATHS.dataBrokerStatement,
  },
  { id: 'dmca', label: 'DMCA / COPYRIGHT POLICY', href: PATHS.dmcaCopyrightPolicy },
  { id: 'fair-housing', label: 'FAIR HOUSING STATEMENT', href: PATHS.fairHousingStatement },
  { id: 'privacy', label: 'PRIVACY POLICY', href: PATHS.privacyPolicy },
  { id: 'tos', label: 'TERMS OF SERVICE', href: PATHS.termsOfService },
]
