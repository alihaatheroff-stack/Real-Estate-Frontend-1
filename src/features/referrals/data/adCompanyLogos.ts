/** PSP / commercial partner logos for sponsored result cards (Canva export). */
export type AdCompanyLogo = {
  id: number
  src: string
  companyName: string
  companyTagline: string
}

export const AD_COMPANY_LOGOS: AdCompanyLogo[] = [
  {
    id: 1,
    src: '/images/logos/1.svg',
    companyName: 'Navitas Capital',
    companyTagline: 'Commercial Real Estate',
  },
  {
    id: 2,
    // Tight crop (viewBox) — Canva export had large square padding.
    src: '/images/logos/2.svg?v=2',
    companyName: 'Summit Partners',
    companyTagline: 'Investment & Advisory',
  },
  {
    id: 3,
    src: '/images/logos/3.svg',
    companyName: 'Harbor Realty Group',
    companyTagline: 'Brokerage & Consulting',
  },
  {
    id: 4,
    src: '/images/logos/4.svg',
    companyName: 'Pacific Crest CRE',
    companyTagline: 'Acquisitions & Leasing',
  },
  {
    id: 5,
    src: '/images/logos/5.svg',
    companyName: 'Fields Capital',
    companyTagline: 'Development Partners',
  },
  {
    id: 6,
    src: '/images/logos/6.svg',
    companyName: 'Northgate Advisors',
    companyTagline: 'Asset Management',
  },
  {
    id: 7,
    src: '/images/logos/7.svg',
    companyName: 'Keystone Properties',
    companyTagline: 'Commercial Services',
  },
  {
    id: 8,
    src: '/images/logos/8.svg',
    companyName: 'Aether Realty',
    companyTagline: 'Tenant Representation',
  },
  {
    id: 9,
    src: '/images/logos/9.svg',
    companyName: 'Granite Peak CRE',
    companyTagline: 'Investment Sales',
  },
  {
    id: 10,
    src: '/images/logos/10.svg?v=2',
    companyName: 'Blue Ridge Partners',
    companyTagline: 'Lending & Closing',
  },
  {
    id: 11,
    src: '/images/logos/11.svg?v=2',
    companyName: 'Cedar Lane Group',
    companyTagline: 'Property Solutions',
  },
  {
    id: 12,
    src: '/images/logos/12.svg?v=2',
    companyName: 'Meridian Estates',
    companyTagline: 'Portfolio Services',
  },
  {
    id: 13,
    src: '/images/logos/13.svg',
    companyName: 'Oakridge Capital',
    companyTagline: 'Equity & Debt',
  },
  {
    id: 14,
    src: '/images/logos/14.svg',
    companyName: 'Westline Realty',
    companyTagline: 'Market Advisors',
  },
  // NOTE: 15.svg is the LCRE platform / favicon mark — never use as a company logo.
  {
    id: 16,
    src: '/images/logos/16.svg?v=2',
    companyName: 'Horizon Partners',
    companyTagline: 'Growth & Acquisitions',
  },
]

export function adLogoByIndex(index: number): AdCompanyLogo {
  return AD_COMPANY_LOGOS[index % AD_COMPANY_LOGOS.length]!
}
