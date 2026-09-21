import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import { DashboardOverview } from '@/features/dashboard/components/DashboardOverview'
import { DashboardAdvertisementsView } from '@/features/dashboard/components/DashboardAdvertisementsView'
import { DashboardDataList } from '@/features/dashboard/components/DashboardDataList'
import { DashboardSectionPage } from '@/features/dashboard/components/DashboardSectionPage'
import {
  DUMMY_ABOUT,
  DUMMY_ACCEPTED_HIRED,
  DUMMY_APPLICATION_NON_COMPLETE,
  DUMMY_APPLICATION_REJECTED,
  DUMMY_APPLICATIONS_RECEIVED,
  DUMMY_ALL_POSTS,
  DUMMY_FAVORITES,
  DUMMY_FEE_STRUCTURE,
  DUMMY_JOB_ALERTS,
  DUMMY_JOBS_APPLIED,
  DUMMY_MEETINGS,
  DUMMY_PAYOUTS,
  DUMMY_PROPOSALS,
  DUMMY_REFERRALS_SENT,
  DUMMY_SERVICE_ADDONS,
  DUMMY_SERVICES,
  DUMMY_STATEMENTS,
  DUMMY_SUBMISSIONS,
} from '@/features/dashboard/data/sectionDummyData'

export function DashboardPage() {
  return <DashboardOverview />
}

export function DashboardServicesPage() {
  return (
    <DashboardSectionPage
      title="My Services"
      description="Services you offer as a PSP — listings, packages, and referral products."
    >
      <DashboardDataList items={DUMMY_SERVICES} />
      <Link to={PATHS.results} className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
        Browse service marketplace →
      </Link>
    </DashboardSectionPage>
  )
}

export function DashboardFeeStructurePage() {
  return (
    <DashboardSectionPage
      title="Fee Structure"
      description="Platform fees, referral splits, and service commission rules."
    >
      <DashboardDataList items={DUMMY_FEE_STRUCTURE} />
    </DashboardSectionPage>
  )
}

export function DashboardFavoritesPage() {
  return (
    <DashboardSectionPage
      title="Favorite"
      description="Saved providers, services, and employers from across the platform."
    >
      <DashboardDataList items={DUMMY_FAVORITES} />
    </DashboardSectionPage>
  )
}

export function DashboardAboutPage() {
  return (
    <DashboardSectionPage
      title="About"
      description="About your PSP profile, bio, and how clients discover you."
    >
      <div className="space-y-4 text-sm">
        <div>
          <p className="text-lg font-semibold text-ink">{DUMMY_ABOUT.name}</p>
          <p className="text-muted">{DUMMY_ABOUT.role}</p>
          <p className="mt-1 text-muted">{DUMMY_ABOUT.location}</p>
          <p className="text-muted">{DUMMY_ABOUT.licensed}</p>
        </div>
        <p className="leading-relaxed text-ink">{DUMMY_ABOUT.bio}</p>
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted">Specialties</p>
          <div className="flex flex-wrap gap-2">
            {DUMMY_ABOUT.specialties.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-brand/10 px-3 py-1 text-xs font-semibold text-brand"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <p className="text-muted">{DUMMY_ABOUT.responseTime}</p>
        <p className="text-xs text-muted">{DUMMY_ABOUT.memberSince}</p>
      </div>
    </DashboardSectionPage>
  )
}

export function DashboardStatementsPage() {
  return (
    <DashboardSectionPage
      title="Statements"
      description="Earnings, invoices, and statement history for your RE Network activity."
    >
      <p className="mb-4 text-sm text-muted">Available balance · $191.00</p>
      <DashboardDataList items={DUMMY_STATEMENTS} />
    </DashboardSectionPage>
  )
}

export function DashboardPayoutsPage() {
  return (
    <DashboardSectionPage
      title="Payouts"
      description="Payout methods, pending transfers, and deposit history."
    >
      <DashboardDataList items={DUMMY_PAYOUTS} />
    </DashboardSectionPage>
  )
}

export function DashboardProposalsPage() {
  return (
    <DashboardSectionPage
      title="Proposals"
      description="Proposals you’ve sent on briefs and employer openings."
    >
      <DashboardDataList items={DUMMY_PROPOSALS} />
      <Link to={PATHS.postOffer} className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
        Post a project brief →
      </Link>
    </DashboardSectionPage>
  )
}

export function DashboardAlertsPage() {
  return (
    <DashboardSectionPage
      title="Jobs Alerts"
      description="Saved searches and alerts for new PSP and employer opportunities."
    >
      <DashboardDataList items={DUMMY_JOB_ALERTS} />
    </DashboardSectionPage>
  )
}

export function DashboardJobsPage() {
  return (
    <DashboardSectionPage
      title="Jobs Applied"
      description="Employer roles and projects you’ve applied to across RE Network."
    >
      <DashboardDataList items={DUMMY_JOBS_APPLIED} />
      <Link
        to={PATHS.employerResults}
        className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
      >
        Explore employer openings →
      </Link>
    </DashboardSectionPage>
  )
}

export function DashboardMeetingsPage() {
  return (
    <DashboardSectionPage
      title="Meetings"
      description="Upcoming calls and scheduled intros with clients and employers."
    >
      <DashboardDataList items={DUMMY_MEETINGS} />
    </DashboardSectionPage>
  )
}

export function DashboardSubmissionServicePage() {
  return (
    <DashboardSectionPage
      title="Submission Service"
      description="Submit packages, docs, and referral packets for review."
    >
      <DashboardDataList items={DUMMY_SUBMISSIONS} />
    </DashboardSectionPage>
  )
}

export function DashboardServiceAddonPage() {
  return (
    <DashboardSectionPage
      title="Service Add-on"
      description="Optional add-ons you can attach to listed services."
    >
      <DashboardDataList items={DUMMY_SERVICE_ADDONS} />
    </DashboardSectionPage>
  )
}

export function DashboardAllPostsPage() {
  return (
    <DashboardSectionPage
      title="All Posts"
      description="Every application and post across your dashboard activity."
    >
      <DashboardDataList items={DUMMY_ALL_POSTS} />
    </DashboardSectionPage>
  )
}

export function DashboardAcceptedHiredPage() {
  return (
    <DashboardSectionPage
      title="Application Accepted and Hired"
      description="Applications that were accepted and moved to hired status."
    >
      <DashboardDataList items={DUMMY_ACCEPTED_HIRED} />
    </DashboardSectionPage>
  )
}

export function DashboardApplicationsReceivedPage() {
  return (
    <DashboardSectionPage
      title="Applications Received"
      description="Incoming applications on your posted services and jobs."
    >
      <DashboardDataList items={DUMMY_APPLICATIONS_RECEIVED} />
    </DashboardSectionPage>
  )
}

export function DashboardApplicationRejectedPage() {
  return (
    <DashboardSectionPage
      title="Application Rejected"
      description="Applications that were declined."
    >
      <DashboardDataList items={DUMMY_APPLICATION_REJECTED} />
    </DashboardSectionPage>
  )
}

export function DashboardApplicationNonCompletePage() {
  return (
    <DashboardSectionPage
      title="Application Non-Complete"
      description="Applications started but not finished."
    >
      <DashboardDataList items={DUMMY_APPLICATION_NON_COMPLETE} />
    </DashboardSectionPage>
  )
}

export function DashboardReferralsSentPage() {
  return (
    <DashboardSectionPage
      title="Referrals Sent"
      description="Referral packets and intros you’ve sent through RE Network."
    >
      <DashboardDataList items={DUMMY_REFERRALS_SENT} />
    </DashboardSectionPage>
  )
}

export function DashboardAdvertisementPage() {
  return <DashboardAdvertisementsView />
}
