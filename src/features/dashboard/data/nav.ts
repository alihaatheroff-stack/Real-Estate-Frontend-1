import {
  BadgeCheck,
  Ban,
  BellRing,
  BriefcaseBusiness,
  CircleDollarSign,
  ClipboardList,
  FilePlus2,
  FileText,
  Heart,
  Info,
  LayoutDashboard,
  Layers,
  Megaphone,
  MessageSquare,
  PackagePlus,
  Receipt,
  Send,
  ThumbsUp,
  Video,
  Wallet,
  XCircle,
} from 'lucide-react'
import { PATHS } from '@/app/router/paths'
import type { LucideIcon } from 'lucide-react'

export type DashboardNavItem = {
  id: string
  label: string
  href: string
  icon: LucideIcon
  /** When true, item lives outside the dashboard shell. */
  external?: boolean
  section?: string
}

/** Left-rail menu — combined from platform dashboard tabs. */
export const DASHBOARD_NAV: DashboardNavItem[] = [
  { id: 'overview', label: 'Dashboard', href: PATHS.dashboard, icon: LayoutDashboard },
  { id: 'fee-structure', label: 'Fee Structure', href: PATHS.dashboardFeeStructure, icon: CircleDollarSign },
  { id: 'services', label: 'My Services', href: PATHS.dashboardServices, icon: FileText },
  { id: 'favorites', label: 'Favorite', href: PATHS.dashboardFavorites, icon: Heart },
  {
    id: 'messages',
    label: 'Messages',
    href: PATHS.networkMessages,
    icon: MessageSquare,
    external: true,
  },
  { id: 'about', label: 'About', href: PATHS.dashboardAbout, icon: Info },
  { id: 'statements', label: 'Statements', href: PATHS.dashboardStatements, icon: Receipt },
  { id: 'payouts', label: 'Payouts', href: PATHS.dashboardPayouts, icon: Wallet },
  { id: 'proposals', label: 'Proposals', href: PATHS.dashboardProposals, icon: ClipboardList },
  { id: 'advertisement', label: 'Advertisement', href: PATHS.dashboardAdvertisement, icon: Megaphone },
  { id: 'alerts', label: 'Jobs Alerts', href: PATHS.dashboardAlerts, icon: BellRing },
  { id: 'jobs', label: 'Jobs Applied', href: PATHS.dashboardJobs, icon: BriefcaseBusiness },
  { id: 'meetings', label: 'Meetings', href: PATHS.dashboardMeetings, icon: Video },
  {
    id: 'submission-service',
    label: 'Submission Service',
    href: PATHS.dashboardSubmissionService,
    icon: Send,
  },
  {
    id: 'service-addon',
    label: 'Service Add-on',
    href: PATHS.dashboardServiceAddon,
    icon: PackagePlus,
  },
  {
    id: 'all-posts',
    label: "All Posts",
    href: PATHS.dashboardAllPosts,
    icon: Layers,
    section: 'Applications',
  },
  {
    id: 'accepted-hired',
    label: 'Application Accepted and Hired',
    href: PATHS.dashboardAcceptedHired,
    icon: ThumbsUp,
    section: 'Applications',
  },
  {
    id: 'applications-received',
    label: 'Applications Received',
    href: PATHS.dashboardApplicationsReceived,
    icon: FilePlus2,
    section: 'Applications',
  },
  {
    id: 'application-rejected',
    label: 'Application Rejected',
    href: PATHS.dashboardApplicationRejected,
    icon: XCircle,
    section: 'Applications',
  },
  {
    id: 'application-non-complete',
    label: 'Application Non-Complete',
    href: PATHS.dashboardApplicationNonComplete,
    icon: Ban,
    section: 'Applications',
  },
  {
    id: 'referrals-sent',
    label: 'Referrals Sent',
    href: PATHS.dashboardReferralsSent,
    icon: Send,
    section: 'Applications',
  },
]

export const DASHBOARD_STATS = [
  { id: 'posted', label: 'Posted Services', value: '4', icon: FileText },
  { id: 'completed', label: 'Completed Services', value: '12', icon: BadgeCheck },
  { id: 'queue', label: 'In Queue Services', value: '7', icon: ClipboardList },
  { id: 'reviews', label: 'Reviews', value: '9', icon: MessageSquare },
] as const

export const DASHBOARD_NOTIFICATIONS = [
  {
    id: 'n1',
    text: 'Your referral proposal on Commercial Lease Review was viewed by an employer.',
    time: '2 hours ago',
  },
  {
    id: 'n2',
    text: 'Job alert: New PSP openings near Fresno 93728 match your profile.',
    time: '1 day ago',
  },
  {
    id: 'n3',
    text: 'Order #4821 is in progress — GPS route tracking is available.',
    time: '2 days ago',
  },
  {
    id: 'n4',
    text: 'Crowdfunding update: a Priority Index venue you follow posted progress.',
    time: '3 days ago',
  },
] as const

export const DASHBOARD_PAGE_VIEWS = [
  { label: 'Mon', value: 0.4 },
  { label: 'Tue', value: 1.2 },
  { label: 'Wed', value: 0.8 },
  { label: 'Thu', value: 1.9 },
  { label: 'Fri', value: 1.1 },
  { label: 'Sat', value: 0.6 },
  { label: 'Sun', value: 1.5 },
] as const
