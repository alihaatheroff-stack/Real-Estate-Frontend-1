/** Advertise targeting filters — left vertical dropdown options */

export const ADVERTISE_MODULES = [
  'Referral',
  'Crowdfunding',
  'Network',
  'Shop',
  'Home / Landing',
] as const

export const AGE_REQUIREMENT_OPTIONS = [
  '18–24',
  '25–34',
  '35–44',
  '45–54',
  '55–64',
  '65+',
  'No Age Requirement',
] as const

export const ADVERTISE_TIME_OPTIONS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const

export const ADVERTISE_OTHER_WEBSITES_OPTIONS = [
  'Yes — Future',
  'No',
  'Interested — Learn More',
] as const

export const LC_ECOSYSTEM_AD_OPTIONS = [
  'Yes — Inside Features & Platforms',
  'No',
  'Learn More (Revie AdServer)',
] as const

export const GEOGRAPHICS_STYLE_OPTIONS = [
  'Zillow Style of Advertising',
  'Map Overlay',
  'Search Results Placement',
  'Listing Detail Placement',
] as const

export const BANNER_SIZE_OPTIONS = [
  'Leaderboard',
  'Medium Rectangle',
  'Skyscraper',
  'Mobile Banner',
  'Square',
  'Video',
  'Custom',
  'Hover Changes Dimension by Banner Type',
] as const

/** Nested under Video — stored as `Video > Clip` / `Video > Video`. */
export const BANNER_VIDEO_NESTED_OPTIONS = ['Clip', 'Video'] as const

export type BannerSizeLeaf =
  | Exclude<(typeof BANNER_SIZE_OPTIONS)[number], 'Video'>
  | `Video > ${(typeof BANNER_VIDEO_NESTED_OPTIONS)[number]}`

export const VIDEO_LENGTH_OPTIONS = [
  '15 seconds',
  '30 seconds',
  '60 seconds',
  '90 seconds',
  'Custom Length',
] as const

export const CROWDFUND_AD_OPTIONS = [
  'Priority Index Placements',
  'LCRE Crowdfunding',
  'Explore Feed Ads',
  'Campaign Spotlight',
] as const

export const NETWORK_AD_OPTIONS = [
  'Feed Ads',
  'Marketplace Ads',
  'Events Placements',
  'Profile / Sidebar Ads',
  'Watch / Media Ads',
] as const
