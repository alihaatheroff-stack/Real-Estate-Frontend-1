export const PATHS = {
  home: '/',
  referrals: '/referrals',
  results: '/referrals/results',
  profileResults: '/referrals/profile-results',
  employerResults: '/referrals/employer-results',
  employerProjects: '/referrals/employers/:id/projects',
  employerJobs: '/referrals/employers/:id/jobs',
  employerEmployees: '/referrals/employers/:id/employees',
  employerDetail: '/referrals/employers/:id',
  serviceDetail: '/referrals/services/:id',
  providerProfile: '/referrals/providers/:id',
  providerServices: '/referrals/providers/:id/services',
  postOffer: '/referrals/post',
  referralsArticles: '/referrals/articles',
  referralsArticle: '/referrals/articles/:articleId',
  referralsForums: '/referrals/forums',
  referralsForum: '/referrals/forums/:forumId',
  crowdfunding: '/crowdfunding',
  lcreCrowdfunding: '/crowdfunding/lcre',
  crowdfundingArticles: '/crowdfunding/articles',
  crowdfundingArticle: '/crowdfunding/articles/:articleId',
  crowdfundingForums: '/crowdfunding/forums',
  crowdfundingForum: '/crowdfunding/forums/:forumId',
  network: '/network',
  networkFeed: '/network/feed',
  networkExplore: '/network/explore',
  networkProfile: '/network/profile/:memberId',
  networkFriends: '/network/friends',
  networkMessages: '/network/messages',
  networkGroups: '/network/groups',
  networkGroup: '/network/groups/:groupId',
  networkForums: '/network/forums',
  networkForum: '/network/forums/:forumId',
  networkArticles: '/network/articles',
  networkArticle: '/network/articles/:articleId',
  networkWatch: '/network/watch',
  networkMarketplace: '/network/marketplace',
  networkEvents: '/network/events',
  networkPhotos: '/network/photos',
  networkSaved: '/network/saved',
  networkNotes: '/network/notes',
  networkEducation: '/network/education',
  networkDashboard: '/network/dashboard',
  networkNotifications: '/network/notifications',
  networkSearch: '/network/search',
  networkSettings: '/network/settings',
  shop: '/shop',
  signIn: '/auth/sign-in',
  registerPsp: '/auth/register/psp',
  registerCustomer: '/auth/register/customer',
  dashboard: '/dashboard',
  dashboardServices: '/dashboard/services',
  dashboardFeeStructure: '/dashboard/fee-structure',
  dashboardAbout: '/dashboard/about',
  dashboardPayouts: '/dashboard/payouts',
  dashboardProposals: '/dashboard/proposals',
  dashboardAdvertisement: '/dashboard/advertisement',
  dashboardJobs: '/dashboard/jobs',
  dashboardAlerts: '/dashboard/alerts',
  dashboardFavorites: '/dashboard/favorites',
  dashboardMeetings: '/dashboard/meetings',
  dashboardSubmissionService: '/dashboard/submission-service',
  dashboardServiceAddon: '/dashboard/service-addon',
  dashboardAllPosts: '/dashboard/all-posts',
  dashboardAcceptedHired: '/dashboard/accepted-hired',
  dashboardApplicationsReceived: '/dashboard/applications-received',
  dashboardApplicationRejected: '/dashboard/application-rejected',
  dashboardApplicationNonComplete: '/dashboard/application-non-complete',
  dashboardReferralsSent: '/dashboard/referrals-sent',
  dashboardStatements: '/dashboard/statements',
  dashboardOrders: '/dashboard/orders',
  dashboardBriefs: '/dashboard/briefs',
  dashboardSettings: '/dashboard/settings',
  glossary: '/glossary',
  about: '/about',
  monetization: '/monetization',
  contact: '/contact',
  advertise: '/advertise',
  news: '/news',
} as const

export function servicePath(id: string) {
  return `/referrals/services/${id}`
}

export function providerPath(id: string) {
  return `/referrals/providers/${id}`
}

export function providerServicesPath(id: string) {
  return `/referrals/providers/${id}/services`
}

export function employerPath(id: string) {
  return `/referrals/employers/${id}`
}

export function employerProjectsPath(id: string) {
  return `/referrals/employers/${id}/projects`
}

export function employerJobsPath(id: string) {
  return `/referrals/employers/${id}/jobs`
}

export function employerEmployeesPath(id: string) {
  return `/referrals/employers/${id}/employees`
}

export function networkProfilePath(memberId: string) {
  return `/network/profile/${memberId}`
}

export function networkGroupPath(groupId: string) {
  return `/network/groups/${groupId}`
}

export function networkForumPath(forumId: string) {
  return `/network/forums/${forumId}`
}

export function networkArticlePath(articleId: string) {
  return `/network/articles/${articleId}`
}

export function referralsArticlePath(articleId: string) {
  return `/referrals/articles/${articleId}`
}

export function referralsForumPath(forumId: string) {
  return `/referrals/forums/${forumId}`
}

export function crowdfundingArticlePath(articleId: string) {
  return `/crowdfunding/articles/${articleId}`
}

export function crowdfundingForumPath(forumId: string) {
  return `/crowdfunding/forums/${forumId}`
}

export function networkSettingsPath(tab?: string) {
  return tab ? `/network/settings?tab=${tab}` : '/network/settings'
}

export function networkMessagesPath(chatId?: string) {
  return chatId ? `${PATHS.networkMessages}?chat=${encodeURIComponent(chatId)}` : PATHS.networkMessages
}
