import { PATHS } from '@/app/router/paths'

export type DemographySlide = {
  id: string
  title: string
  image: string
  href?: string
}

export type DemographyRow = {
  id: string
  title: string
  description?: string
  slides: readonly DemographySlide[]
}

function fieldHref(fieldId: string) {
  return `${PATHS.results}?field=${fieldId}`
}

/** Deep-link Hire demography services into the service results page. */
function serviceHref(query: string) {
  return `${PATHS.results}?q=${encodeURIComponent(query)}`
}

/** Property-field images for the Fields slider. */
export const DEMOGRAPHY_FIELDS: readonly DemographySlide[] = [
  {
    id: 'commercial',
    title: 'Commercial',
    image: '/images/fields/commercial-photo.webp',
    href: fieldHref('commercial'),
  },
  {
    id: 'multi-unit',
    title: 'Multi-Unit',
    image: '/images/fields/multi-unit-photo.webp',
    href: fieldHref('multi-unit'),
  },
  {
    id: 'industrial',
    title: 'Industrial',
    image: '/images/fields/industrial-photo.webp',
    href: fieldHref('industrial'),
  },
  {
    id: 'agricultural',
    title: 'Agricultural',
    image: '/images/fields/agriculture.webp',
    href: fieldHref('agricultural'),
  },
  {
    id: 'residential',
    title: 'Residential',
    image: '/images/fields/residential-photo.webp',
    href: fieldHref('residential'),
  },
  {
    id: 'mixed-use',
    title: 'Mixed-Use',
    image: '/images/fields/mixed-use-street.webp',
    href: fieldHref('mixed-use'),
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    image: '/images/fields/hospitality.webp',
    href: fieldHref('hospitality'),
  },
  {
    id: 'land',
    title: 'Land',
    image: '/images/fields/land.webp',
    href: fieldHref('land'),
  },
]

/** Trades / jobs images for the From Tradesmen slider. */
export const DEMOGRAPHY_TRADESMEN: readonly DemographySlide[] = [
  {
    id: 'lawn-sod',
    title: 'Lawn & sod',
    image: '/images/services/lawn-sod-install.png',
    href: serviceHref('lawn sod'),
  },
  {
    id: 'irrigation',
    title: 'Irrigation',
    image: '/images/services/irrigation-sprinkler.png',
    href: serviceHref('irrigation'),
  },
  {
    id: 'pavers',
    title: 'Pavers & hardscape',
    image: '/images/services/paver-hardscape.png',
    href: serviceHref('paver'),
  },
  {
    id: 'asphalt',
    title: 'Asphalt paving',
    image: '/images/services/asphalt-paving.png',
    href: serviceHref('asphalt'),
  },
  {
    id: 'solar',
    title: 'Solar install',
    image: '/images/services/solar-panel-install.png',
    href: serviceHref('solar'),
  },
  {
    id: 'roofing',
    title: 'Roof framing',
    image: '/images/services/roof-framing.png',
    href: serviceHref('roof framing'),
  },
  {
    id: 'roof-repair',
    title: 'Roofing repair',
    image: '/images/services/roofing-repair.png',
    href: serviceHref('roofing repair'),
  },
  {
    id: 'construction',
    title: 'Construction',
    image: '/images/services/construction-crew.png',
    href: serviceHref('construction'),
  },
  {
    id: 'pool',
    title: 'Pool construction',
    image: '/images/services/pool-construction.png',
    href: serviceHref('pool'),
  },
  {
    id: 'pressure-wash',
    title: 'Pressure washing',
    image: '/images/services/pressure-washing.png',
    href: serviceHref('pressure wash'),
  },
]

/** Professional-services images for the Too Professionals slider. */
export const DEMOGRAPHY_PROFESSIONALS: readonly DemographySlide[] = [
  {
    id: 'notary',
    title: 'Notary',
    image: '/images/1.png',
    href: serviceHref('notary'),
  },
  {
    id: 'real-estate-agent',
    title: 'Real estate agent',
    image: '/images/2.png',
    href: serviceHref('real estate agent'),
  },
  {
    id: 'consultants',
    title: 'Consultants',
    image: '/images/3.png',
    href: serviceHref('consultant'),
  },
  {
    id: 'listing-agent',
    title: 'Listing agent',
    image: '/images/4.png',
    href: serviceHref('listing agent'),
  },
  {
    id: 'loan',
    title: 'Loan',
    image: '/images/5.png',
    href: serviceHref('loan'),
  },
  {
    id: 'payday-advance',
    title: 'Payday advance',
    image: '/images/6.png',
    href: serviceHref('payday advance'),
  },
  {
    id: 'mortgage',
    title: 'Mortgage',
    image: '/images/7.png',
    href: serviceHref('mortgage'),
  },
  {
    id: 'appraisal',
    title: 'Appraisal',
    image: '/images/8.png',
    href: serviceHref('appraisal'),
  },
  {
    id: 'escrow',
    title: 'Escrow',
    image: '/images/9.png',
    href: serviceHref('escrow'),
  },
  {
    id: 'advisors',
    title: 'Advisors',
    image: '/images/10.png',
    href: serviceHref('advisor'),
  },
  {
    id: 'credit-repair',
    title: 'Credit repair',
    image: '/images/11.png',
    href: serviceHref('credit repair'),
  },
]

/** Three demography rows shown under Hire / Client role. */
export const DEMOGRAPHY_ROWS: readonly DemographyRow[] = [
  {
    id: 'fields',
    title: 'Fields',
    description:
      'Commercial, Multi-Unit, Industrial, Agricultural, Residential, Mixed-Use',
    slides: DEMOGRAPHY_FIELDS,
  },
  {
    id: 'tradesmen',
    title: 'From Tradesmen',
    description: 'Hands-on trades and property services you can hire with confidence.',
    slides: DEMOGRAPHY_TRADESMEN,
  },
  {
    id: 'professionals',
    title: 'Too Professionals',
    description: 'Licensed pros for notary, lending, escrow, appraisal, and more.',
    slides: DEMOGRAPHY_PROFESSIONALS,
  },
]

/** @deprecated Prefer DEMOGRAPHY_FIELDS — kept for any external imports. */
export type ClientFieldCard = {
  id: string
  title: string
  subtitle: string
  image: string
}

export const CLIENT_FIELD_CARDS: ClientFieldCard[] = DEMOGRAPHY_FIELDS.map(
  (slide) => ({
    id: slide.id,
    title: slide.title,
    subtitle: 'Property field',
    image: slide.image,
  }),
)
