/**
 * Landing content access boundary.
 * Prefer these re-exports over reaching into `data/` from unrelated features.
 */
export {
  NEWS_TABS,
  MEMBER_ACTIVITY_TABS,
  NETWORK_MEMBER_HUBS,
  NETWORK_HOT_TOPICS,
  type NewsTab,
  type NewsTabId,
  type NewsBullet,
  type MemberActivityTabId,
} from '@/features/landing/data/loggedInLanding'
export { HERO_SLIDES, type HeroSlide } from '@/features/landing/data/heroSlides'
export { LEFT_ADS, RIGHT_STACK_ADS, type HeroAd } from '@/features/landing/data/heroAds'
export {
  MODULE_TOP_PROVIDERS,
  getModuleTopProviders,
  type LandingModule,
} from '@/features/landing/data/topProvidersByModule'
export { AWARD_WINNERS, type AwardWinner } from '@/features/landing/data/awardWinners'
export {
  MEMBERSHIP_ACTIONS,
  type MembershipActionIcon,
} from '@/features/landing/data/membershipActions'
export {
  GUEST_ITEMS,
  HOW_IT_WORKS_STEPS,
  LEARN_MORE_TABS,
  REFERRAL_BENEFITS,
  USER_JOURNEY_STEPS,
  type LearnMoreTab,
  type GuestItemIcon,
} from '@/features/landing/data/referralsLearnMore'
export {
  LOGGED_IN_REFERRAL_STRIPS,
  getLoggedInReferralProviders,
  getLoggedInReferralServices,
  type LoggedInReferralStrip,
} from '@/features/landing/data/loggedInReferralProfiles'
