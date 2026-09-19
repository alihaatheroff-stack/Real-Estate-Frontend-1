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
    src: '/images/stock/photo-1486406146926-c627a92ad1ab.jpg',
    alt: 'Glass commercial towers at dusk',
    href: `${PATHS.results}?field=commercial`,
    caption: 'Commercial referrals',
  },
  {
    id: '2',
    src: '/images/stock/photo-1600585154340-be6161a56a0c.jpg',
    alt: 'Modern residential home with pool',
    href: `${PATHS.results}?field=residential`,
    caption: 'Residential providers',
  },
  {
    id: '3',
    src: '/images/stock/photo-1564013799919-ab600027ffc6.jpg',
    alt: 'Luxury home exterior ready for listing',
    href: PATHS.results,
    caption: 'Property connections',
  },
  {
    id: '4',
    src: '/images/stock/photo-1586528116311-ad8dd3c8310d.jpg',
    alt: 'Industrial warehouse property',
    href: `${PATHS.results}?field=industrial`,
    caption: 'Industrial & trade',
  },
  {
    id: '5',
    src: '/images/stock/photo-1449844908441-8829872d2607.jpg',
    alt: 'Mixed-use street with shops and residences',
    href: `${PATHS.results}?field=mixed-use`,
    caption: 'Mixed-use deals',
  },
  {
    id: '6',
    src: '/images/stock/photo-1545324418-cc1a3fa10c00.jpg',
    alt: 'Multi-unit apartment building',
    href: `${PATHS.results}?field=multi-unit`,
    caption: 'Multi-unit specialists',
  },
  {
    id: '7',
    src: '/images/stock/photo-1600596542815-ffad4c1539a9.jpg',
    alt: 'Contemporary villa with warm lighting',
    href: PATHS.crowdfunding,
    caption: 'Crowdfunded builds',
  },
  {
    id: '8',
    src: '/images/stock/photo-1497366811353-6870744d04b2.jpg',
    alt: 'Modern office interior for service providers',
    href: PATHS.networkFeed,
    caption: 'Network & offices',
  },
]
