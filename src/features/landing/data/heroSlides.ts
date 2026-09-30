import { PATHS } from '@/app/router/paths'

export type HeroSlide = {
  id: string
  src: string
  alt: string
  href: string
  caption: string
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: '1',
    src: '/images/hero/commercial-office-exterior.png',
    alt: 'Modern two-story commercial office building with tan facade under clear blue sky',
    href: `${PATHS.results}?field=commercial`,
    caption: 'Commercial',
  },
  {
    id: '2',
    src: '/images/hero/residential-brick-home.jpg',
    alt: 'Two-story red brick residential home with a white convertible in the driveway',
    href: `${PATHS.results}?field=residential`,
    caption: 'Residential',
  },
  {
    id: '3',
    src: '/images/hero/modern-townhouses-street.jpg',
    alt: 'Row of modern two-story townhouses along a residential street at golden hour',
    href: `${PATHS.results}?field=multi-unit`,
    caption: 'Multi-Unit',
  },
  {
    id: '4',
    src: '/images/hero/retail-commercial-center.jpg',
    alt: 'Contemporary commercial retail center with arched breezeway on a sunny day',
    href: `${PATHS.results}?field=mixed-use`,
    caption: 'Mixed-Use',
  },
  {
    id: '5',
    src: '/images/hero/industrial-warehouse-loading.jpg',
    alt: 'White delivery trucks at loading docks of a modern industrial warehouse',
    href: `${PATHS.results}?field=industrial`,
    caption: 'Industrial',
  },
  {
    id: '6',
    src: '/images/hero/agricultural-farmland-hills.jpg',
    alt: 'Rolling farmland hills with crop rows and a village skyline under blue sky',
    href: `${PATHS.results}?field=agricultural`,
    caption: 'Agricultural',
  },
  {
    id: '7',
    src: '/images/hero/modern-retail-storefront.jpg',
    alt: 'Modern retail storefront with blue and yellow facade under a clear sky',
    href: `${PATHS.results}?field=mixed-use`,
    caption: 'Retail',
  },
  {
    id: '8',
    src: '/images/hero/industrial-refinery-facility.jpg',
    alt: 'Industrial refinery complex with storage tanks and piping under a clear blue sky',
    href: `${PATHS.results}?field=industrial`,
    caption: 'Industrial',
  },
  {
    id: '9',
    src: '/images/hero/corporate-skyscrapers-fog.jpg',
    alt: 'Low-angle view of modern glass skyscrapers rising into fog',
    href: `${PATHS.results}?field=commercial`,
    caption: 'Commercial',
  },
  {
    id: '10',
    src: '/images/hero/agricultural-dairy-farm.jpg',
    alt: 'Farmer feeding Holstein cows inside a modern dairy barn',
    href: `${PATHS.results}?field=agricultural`,
    caption: 'Agricultural',
  },
]
