import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/app/layouts/RootLayout'
import { MarketingLayout } from '@/app/layouts/MarketingLayout'
import { MarketplaceLayout } from '@/app/layouts/MarketplaceLayout'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { NetworkLayout } from '@/app/layouts/NetworkLayout'
import { PATHS } from '@/app/router/paths'
import { LandingPage } from '@/pages/landing/LandingPage'
import { MemberHomePage } from '@/pages/landing/MemberHomePage'
import { CrowdfundingExplorePage } from '@/pages/crowdfunding/CrowdfundingExplorePage'
import { CrowdfundingLandingPage } from '@/pages/crowdfunding/CrowdfundingLandingPage'
import { CrowdfundingProfilePage } from '@/pages/crowdfunding/CrowdfundingProfilePage'
import { LcreCrowdfundingPage } from '@/pages/crowdfunding/LcreCrowdfundingPage'
import {
  CrowdfundingArticleDetailPage,
  CrowdfundingArticlesPage,
  CrowdfundingForumThreadPage,
  CrowdfundingForumsPage,
  ReferralsArticleDetailPage,
  ReferralsArticlesPage,
  ReferralsForumThreadPage,
  ReferralsForumsPage,
} from '@/pages/shared/ModuleArticlesForumsPages'
import {
  NetworkLearnMorePage,
  NetworkFeedPage,
  NetworkExplorePage,
  NetworkProfilePage,
  NetworkFriendsPage,
  NetworkMessagesPage,
  NetworkGroupsPage,
  NetworkGroupDetailPage,
  NetworkForumsPage,
  NetworkForumThreadPage,
  NetworkArticlesPage,
  NetworkArticleDetailPage,
  NetworkWatchPage,
  NetworkMarketplacePage,
  NetworkEventsPage,
  NetworkPhotosPage,
  NetworkSavedPage,
  NetworkNotificationsPage,
  NetworkSearchPage,
  NetworkSettingsPage,
} from '@/pages/network'
import { NetworkEducationPage } from '@/pages/network/NetworkSectionPages'
import { NetworkNotesPage } from '@/pages/network/NetworkNotesPage'
import { ResultsPage } from '@/pages/referrals/ResultsPage'
import { ProfileResultsPage } from '@/pages/referrals/ProfileResultsPage'
import { EmployerResultsPage } from '@/pages/referrals/EmployerResultsPage'
import { EmployerDetailPage } from '@/pages/referrals/EmployerDetailPage'
import { EmployerProjectsPage } from '@/pages/referrals/EmployerProjectsPage'
import { EmployerJobsPage } from '@/pages/referrals/EmployerJobsPage'
import { EmployerEmployeesPage } from '@/pages/referrals/EmployerEmployeesPage'
import { ServiceDetailPage } from '@/pages/referrals/ServiceDetailPage'
import { ProviderProfilePage } from '@/pages/referrals/ProviderProfilePage'
import { ProviderServicesPage } from '@/pages/referrals/ProviderServicesPage'
import { PostOfferPage } from '@/pages/referrals/PostOfferPage'
import { ReferralsLandingPage } from '@/pages/referrals/ReferralsLandingPage'
import { SignInPage } from '@/pages/auth/SignInPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { RegisterPspPage } from '@/pages/auth/RegisterPspPage'
import { RegisterCustomerPage } from '@/pages/auth/RegisterCustomerPage'
import { NotFoundPage } from '@/pages/errors/NotFoundPage'
import { PlaceholderPage } from '@/pages/errors/PlaceholderPage'
import { AboutPage } from '@/pages/about/AboutPage'
import { AdvertisePage } from '@/pages/advertise/AdvertisePage'
import { NewsPage } from '@/pages/news/NewsPage'
import { GlossaryPage } from '@/pages/glossary/GlossaryPage'
import { HirePage } from '@/pages/hire/HirePage'
import { PrivacyPolicyPage } from '@/pages/legal/PrivacyPolicyPage'
import { CompliancePage } from '@/pages/legal/CompliancePage'
import { AcceptableUsePolicyPage } from '@/pages/legal/AcceptableUsePolicyPage'
import { CommunityGuidelinesPage } from '@/pages/legal/CommunityGuidelinesPage'
import { CookiePolicyPage } from '@/pages/legal/CookiePolicyPage'
import { DataBrokerStatementPage } from '@/pages/legal/DataBrokerStatementPage'
import { DmcaCopyrightPolicyPage } from '@/pages/legal/DmcaCopyrightPolicyPage'
import { FairHousingStatementPage } from '@/pages/legal/FairHousingStatementPage'
import { TermsOfServicePage } from '@/pages/legal/TermsOfServicePage'
import { DashboardLayout } from '@/app/layouts/DashboardLayout'
import {
  DashboardAboutPage,
  DashboardAcceptedHiredPage,
  DashboardAdvertisementPage,
  DashboardAlertsPage,
  DashboardAllPostsPage,
  DashboardApplicationNonCompletePage,
  DashboardApplicationRejectedPage,
  DashboardApplicationsReceivedPage,
  DashboardFavoritesPage,
  DashboardFeeStructurePage,
  DashboardJobsPage,
  DashboardMeetingsPage,
  DashboardPage,
  DashboardPayoutsPage,
  DashboardProposalsPage,
  DashboardReferralsSentPage,
  DashboardServiceAddonPage,
  DashboardServicesPage,
  DashboardSettingsPage,
  DashboardStatementsPage,
  DashboardSubmissionServicePage,
} from '@/pages/dashboard/DashboardPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MarketingLayout />,
        children: [
          { path: PATHS.home, element: <LandingPage /> },
          { path: PATHS.memberHome, element: <MemberHomePage /> },
          {
            path: PATHS.crowdfunding,
            element: <CrowdfundingLandingPage />,
          },
          {
            path: PATHS.crowdfundingExplore,
            element: <CrowdfundingExplorePage />,
          },
          {
            path: PATHS.lcreCrowdfunding,
            element: <LcreCrowdfundingPage />,
          },
          {
            path: PATHS.crowdfundingProfile,
            element: <CrowdfundingProfilePage />,
          },
          { path: PATHS.crowdfundingArticles, element: <CrowdfundingArticlesPage /> },
          { path: PATHS.crowdfundingArticle, element: <CrowdfundingArticleDetailPage /> },
          { path: PATHS.crowdfundingForums, element: <CrowdfundingForumsPage /> },
          { path: PATHS.crowdfundingForum, element: <CrowdfundingForumThreadPage /> },
          {
            path: PATHS.network,
            element: <NetworkLearnMorePage />,
          },
          {
            path: PATHS.monetization,
            element: <AboutPage />,
          },
          {
            path: PATHS.about,
            element: <Navigate to={PATHS.monetization} replace />,
          },
          {
            path: PATHS.contact,
            element: (
              <PlaceholderPage title="Contact" description="Contact form and support — coming soon." />
            ),
          },
          {
            path: PATHS.advertise,
            element: <AdvertisePage />,
          },
          {
            path: PATHS.news,
            element: <NewsPage />,
          },
          {
            path: PATHS.glossary,
            element: <GlossaryPage />,
          },
          {
            path: PATHS.compliance,
            element: <CompliancePage />,
          },
          {
            path: PATHS.acceptableUsePolicy,
            element: <AcceptableUsePolicyPage />,
          },
          {
            path: PATHS.communityGuidelines,
            element: <CommunityGuidelinesPage />,
          },
          {
            path: PATHS.cookiePolicy,
            element: <CookiePolicyPage />,
          },
          {
            path: PATHS.dataBrokerStatement,
            element: <DataBrokerStatementPage />,
          },
          {
            path: PATHS.dmcaCopyrightPolicy,
            element: <DmcaCopyrightPolicyPage />,
          },
          {
            path: PATHS.fairHousingStatement,
            element: <FairHousingStatementPage />,
          },
          {
            path: PATHS.privacyPolicy,
            element: <PrivacyPolicyPage />,
          },
          {
            path: '/privacy-policy',
            element: <Navigate to={PATHS.privacyPolicy} replace />,
          },
          {
            path: PATHS.termsOfService,
            element: <TermsOfServicePage />,
          },
          {
            path: PATHS.hire,
            element: <HirePage />,
          },
          {
            path: PATHS.referrals,
            element: <ReferralsLandingPage />,
          },
          {
            path: PATHS.shop,
            element: (
              <PlaceholderPage title="Shop" description="Commerce is complementary and not in this delivery." />
            ),
          },
        ],
      },
      {
        element: <NetworkLayout />,
        children: [
          { path: PATHS.networkFeed, element: <NetworkFeedPage /> },
          { path: PATHS.networkExplore, element: <NetworkExplorePage /> },
          { path: PATHS.networkProfile, element: <NetworkProfilePage /> },
          { path: PATHS.networkFriends, element: <NetworkFriendsPage /> },
          { path: PATHS.networkMessages, element: <NetworkMessagesPage /> },
          { path: PATHS.networkGroups, element: <NetworkGroupsPage /> },
          { path: PATHS.networkGroup, element: <NetworkGroupDetailPage /> },
          { path: PATHS.networkForums, element: <NetworkForumsPage /> },
          { path: PATHS.networkForum, element: <NetworkForumThreadPage /> },
          { path: PATHS.networkArticles, element: <NetworkArticlesPage /> },
          { path: PATHS.networkArticle, element: <NetworkArticleDetailPage /> },
          { path: PATHS.networkWatch, element: <NetworkWatchPage /> },
          { path: PATHS.networkMarketplace, element: <NetworkMarketplacePage /> },
          { path: PATHS.networkEvents, element: <NetworkEventsPage /> },
          { path: PATHS.networkPhotos, element: <NetworkPhotosPage /> },
          { path: PATHS.networkSaved, element: <NetworkSavedPage /> },
          { path: PATHS.networkNotes, element: <NetworkNotesPage /> },
          { path: PATHS.networkEducation, element: <NetworkEducationPage /> },
          { path: PATHS.networkDashboard, element: <Navigate to={PATHS.dashboard} replace /> },
          { path: PATHS.networkNotifications, element: <NetworkNotificationsPage /> },
          { path: PATHS.networkSearch, element: <NetworkSearchPage /> },
          { path: PATHS.networkSettings, element: <NetworkSettingsPage /> },
        ],
      },
      {
        element: <MarketplaceLayout />,
        children: [
          { path: PATHS.results, element: <ResultsPage /> },
          { path: PATHS.profileResults, element: <ProfileResultsPage /> },
          { path: PATHS.employerResults, element: <EmployerResultsPage /> },
          { path: PATHS.employerProjects, element: <EmployerProjectsPage /> },
          { path: PATHS.employerJobs, element: <EmployerJobsPage /> },
          { path: PATHS.employerEmployees, element: <EmployerEmployeesPage /> },
          { path: PATHS.employerDetail, element: <EmployerDetailPage /> },
          { path: PATHS.serviceDetail, element: <ServiceDetailPage /> },
          { path: PATHS.providerServices, element: <ProviderServicesPage /> },
          { path: PATHS.providerProfile, element: <ProviderProfilePage /> },
          { path: PATHS.postOffer, element: <PostOfferPage /> },
          { path: PATHS.referralsArticles, element: <ReferralsArticlesPage /> },
          { path: PATHS.referralsArticle, element: <ReferralsArticleDetailPage /> },
          { path: PATHS.referralsForums, element: <ReferralsForumsPage /> },
          { path: PATHS.referralsForum, element: <ReferralsForumThreadPage /> },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: PATHS.signIn, element: <SignInPage /> },
          { path: PATHS.forgotPassword, element: <ForgotPasswordPage /> },
          { path: PATHS.register, element: <RegisterPage /> },
          { path: PATHS.registerPsp, element: <RegisterPspPage /> },
          { path: PATHS.registerCustomer, element: <RegisterCustomerPage /> },
        ],
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: PATHS.dashboard, element: <DashboardPage /> },
          { path: PATHS.dashboardFeeStructure, element: <DashboardFeeStructurePage /> },
          { path: PATHS.dashboardServices, element: <DashboardServicesPage /> },
          { path: PATHS.dashboardFavorites, element: <DashboardFavoritesPage /> },
          { path: PATHS.dashboardAbout, element: <DashboardAboutPage /> },
          { path: PATHS.dashboardStatements, element: <DashboardStatementsPage /> },
          { path: PATHS.dashboardPayouts, element: <DashboardPayoutsPage /> },
          { path: PATHS.dashboardProposals, element: <DashboardProposalsPage /> },
          { path: PATHS.dashboardAdvertisement, element: <DashboardAdvertisementPage /> },
          { path: PATHS.dashboardAlerts, element: <DashboardAlertsPage /> },
          { path: PATHS.dashboardJobs, element: <DashboardJobsPage /> },
          { path: PATHS.dashboardMeetings, element: <DashboardMeetingsPage /> },
          { path: PATHS.dashboardSubmissionService, element: <DashboardSubmissionServicePage /> },
          { path: PATHS.dashboardServiceAddon, element: <DashboardServiceAddonPage /> },
          { path: PATHS.dashboardAllPosts, element: <DashboardAllPostsPage /> },
          { path: PATHS.dashboardAcceptedHired, element: <DashboardAcceptedHiredPage /> },
          { path: PATHS.dashboardApplicationsReceived, element: <DashboardApplicationsReceivedPage /> },
          { path: PATHS.dashboardApplicationRejected, element: <DashboardApplicationRejectedPage /> },
          { path: PATHS.dashboardApplicationNonComplete, element: <DashboardApplicationNonCompletePage /> },
          { path: PATHS.dashboardReferralsSent, element: <DashboardReferralsSentPage /> },
          { path: PATHS.dashboardSettings, element: <DashboardSettingsPage /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
