import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/app/layouts/RootLayout'
import { MarketingLayout } from '@/app/layouts/MarketingLayout'
import { MarketplaceLayout } from '@/app/layouts/MarketplaceLayout'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { NetworkLayout } from '@/app/layouts/NetworkLayout'
import { PATHS } from '@/app/router/paths'
import { LandingPage } from '@/pages/landing/LandingPage'
import { CrowdfundingExplorePage } from '@/pages/crowdfunding/CrowdfundingExplorePage'
import { LcreCrowdfundingPage } from '@/pages/crowdfunding/LcreCrowdfundingPage'
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
import { NetworkEducationPage, NetworkDashboardPage } from '@/pages/network/NetworkSectionPages'
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
import { SignInPage } from '@/pages/auth/SignInPage'
import { RegisterPspPage } from '@/pages/auth/RegisterPspPage'
import { NotFoundPage } from '@/pages/errors/NotFoundPage'
import { PlaceholderPage } from '@/pages/errors/PlaceholderPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MarketingLayout />,
        children: [
          { path: PATHS.home, element: <LandingPage /> },
          {
            path: PATHS.crowdfunding,
            element: <CrowdfundingExplorePage />,
          },
          {
            path: PATHS.lcreCrowdfunding,
            element: <LcreCrowdfundingPage />,
          },
          {
            path: PATHS.network,
            element: <NetworkLearnMorePage />,
          },
          {
            path: PATHS.about,
            element: (
              <PlaceholderPage title="About" description="Vision, mission, and story — coming soon." />
            ),
          },
          {
            path: PATHS.contact,
            element: (
              <PlaceholderPage title="Contact" description="Contact form and support — coming soon." />
            ),
          },
          {
            path: PATHS.advertise,
            element: (
              <PlaceholderPage
                title="Advertise"
                description="Advertiser targeting and placements — coming soon."
              />
            ),
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
          { path: PATHS.networkDashboard, element: <NetworkDashboardPage /> },
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
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: PATHS.signIn, element: <SignInPage /> },
          { path: PATHS.registerPsp, element: <RegisterPspPage /> },
          {
            path: PATHS.registerCustomer,
            element: (
              <PlaceholderPage
                title="Customer registration"
                description="Customer signup is marked Coming Soon in the product brief."
              />
            ),
          },
        ],
      },
      { path: PATHS.referrals, element: <Navigate to={PATHS.home} replace /> },
      { path: PATHS.dashboard, element: <Navigate to={PATHS.home} replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
