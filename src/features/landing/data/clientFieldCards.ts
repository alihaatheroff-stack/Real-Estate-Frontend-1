export type ClientFieldCard = {
  id: string
  title: string
  subtitle: string
  image: string
}

/** Eight property fields shown before the Client Hire section. */
export const CLIENT_FIELD_CARDS: ClientFieldCard[] = [
  {
    id: 'commercial',
    title: 'Commercial',
    subtitle: 'Offices, retail & towers',
    image: '/images/fields/commercial-photo.webp',
  },
  {
    id: 'agricultural',
    title: 'Agriculture',
    subtitle: 'Farms & rural land',
    image: '/images/fields/agriculture.webp',
  },
  {
    id: 'industrial',
    title: 'Industrial',
    subtitle: 'Warehouses & plants',
    image: '/images/fields/industrial-photo.webp',
  },
  {
    id: 'multi-unit',
    title: 'Multi Unit',
    subtitle: 'Apartments & complexes',
    image: '/images/fields/multi-unit-photo.webp',
  },
  {
    id: 'residential',
    title: 'Residential',
    subtitle: 'Homes & estates',
    image: '/images/fields/residential-photo.webp',
  },
  {
    id: 'mixed-use',
    title: 'Mix Use',
    subtitle: 'Live–work destinations',
    image: '/images/fields/mixed-use-street.webp',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    subtitle: 'Hotels & leisure',
    image: '/images/fields/hospitality.webp',
  },
  {
    id: 'land',
    title: 'Land',
    subtitle: 'Plots & development',
    image: '/images/fields/land.webp',
  },
]
