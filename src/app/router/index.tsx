import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from '@/app/layouts/RootLayout'
import { MarketingLayout } from '@/app/layouts/MarketingLayout'
import { MarketplaceLayout } from '@/app/layouts/MarketplaceLayout'
import { AuthLayout } from '@/app/layouts/AuthLayout'
import { PATHS } from '@/app/router/paths'
import { LandingPage } from '@/pages/landing/LandingPage'
import { ReferralsHomePage } from '@/pages/referrals/ReferralsHomePage'
import { ResultsPage } from '@/pages/referrals/ResultsPage'
import { ProfileResultsPage } from '@/pages/referrals/ProfileResultsPage'
import { EmployerResultsPage } from '@/pages/referrals/EmployerResultsPage'
import { EmployerDetailPage } from '@/pages/referrals/EmployerDetailPage'
import { EmployerProjectsPage } from '@/pages/referrals/EmployerProjectsPage'
import { EmployerJobsPage } from '@/pages/referrals/EmployerJobsPage'
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
            element: (
              <PlaceholderPage
                title="Crowdfunding"
                description="Full crowdfunding experience is planned next. Landing includes a teaser only."
              />
            ),
          },
          {
            path: PATHS.networkFeed,
            element: (
              <PlaceholderPage
                title="Network feed"
                description="Deal-focused networking ships after referrals marketplace delivery."
              />
            ),
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
        element: <MarketplaceLayout />,
        children: [
          { path: PATHS.referrals, element: <ReferralsHomePage /> },
          { path: PATHS.results, element: <ResultsPage /> },
          { path: PATHS.profileResults, element: <ProfileResultsPage /> },
          { path: PATHS.employerResults, element: <EmployerResultsPage /> },
          { path: PATHS.employerProjects, element: <EmployerProjectsPage /> },
          { path: PATHS.employerJobs, element: <EmployerJobsPage /> },
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
      { path: PATHS.dashboard, element: <Navigate to={PATHS.referrals} replace /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
