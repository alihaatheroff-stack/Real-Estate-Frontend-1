/** Dummy records for each dashboard left-menu section — RE Network / PSP context */

export type StatusTone = 'success' | 'warn' | 'muted' | 'danger' | 'info'

export type DashboardListItem = {
  id: string
  title: string
  subtitle?: string
  meta?: string
  status?: string
  tone?: StatusTone
  amount?: string
}

export const DUMMY_FEE_STRUCTURE: DashboardListItem[] = [
  {
    id: 'fee-1',
    title: 'Referral intro fee',
    subtitle: 'Paid when a warm intro closes with a hiring broker',
    meta: 'Per successful referral',
    amount: '8%',
    status: 'Platform default',
    tone: 'info',
  },
  {
    id: 'fee-2',
    title: 'Service listing commission',
    subtitle: 'Taken from completed PSP service orders',
    meta: 'Per completed order',
    amount: '12%',
    status: 'Active',
    tone: 'success',
  },
  {
    id: 'fee-3',
    title: 'Crowdfunding campaign boost',
    subtitle: 'Priority Index spotlight placement fee',
    meta: 'Weekly boost',
    amount: '$49',
    status: 'Optional',
    tone: 'muted',
  },
  {
    id: 'fee-4',
    title: 'Advertise — feed placement',
    subtitle: 'Network + Referral feed ads',
    meta: 'CPM estimate',
    amount: '$4.20',
    status: 'Active',
    tone: 'success',
  },
]

export const DUMMY_SERVICES: DashboardListItem[] = [
  {
    id: 'svc-1',
    title: 'Commercial lease review package',
    subtitle: 'Fresno / Clovis · 3–5 business days turnaround',
    meta: '12 orders · 4.9★',
    status: 'Active',
    tone: 'success',
    amount: '$350',
  },
  {
    id: 'svc-2',
    title: 'Buyer-agent warm intro',
    subtitle: 'Central Valley investor buyers · referral packet included',
    meta: '8 orders · 5.0★',
    status: 'Active',
    tone: 'success',
    amount: '$175',
  },
  {
    id: 'svc-3',
    title: 'DSCR loan consultant matching',
    subtitle: 'Match sponsors to local loan consultants',
    meta: '5 orders · 4.7★',
    status: 'Paused',
    tone: 'warn',
    amount: '$225',
  },
  {
    id: 'svc-4',
    title: 'Rent-roll underwriting desk',
    subtitle: 'Multifamily rent roll + NOI checklist',
    meta: 'Draft listing',
    status: 'Draft',
    tone: 'muted',
    amount: '$199',
  },
]

export const DUMMY_FAVORITES: DashboardListItem[] = [
  {
    id: 'fav-1',
    title: 'Valley Crest Realty — Employer',
    subtitle: 'Hiring commercial lease agents · Fresno HQ',
    meta: 'Employer',
    status: 'Saved',
    tone: 'info',
  },
  {
    id: 'fav-2',
    title: 'Maria Santos — PSP',
    subtitle: 'Title & escrow referee · Clovis',
    meta: 'Provider',
    status: 'Saved',
    tone: 'info',
  },
  {
    id: 'fav-3',
    title: '1031 exchange coordinator package',
    subtitle: 'Service listing · Referral marketplace',
    meta: 'Service',
    status: 'Saved',
    tone: 'info',
  },
  {
    id: 'fav-4',
    title: 'LCRE Crowdfunding — Riverfront venue',
    subtitle: 'Priority Index campaign you follow',
    meta: 'Crowdfund',
    status: 'Saved',
    tone: 'info',
  },
]

export const DUMMY_ABOUT = {
  name: 'Rigoberto Peraza',
  role: 'Property Service Provider (PSP)',
  location: 'Fresno, CA · ZIP 93728',
  licensed: 'CA DRE #01844291',
  bio: 'Commercial lease reviews, buyer-agent intros, and DSCR matching across the Central Valley. I package clean referral packets so brokers and sponsors can move fast.',
  specialties: ['Commercial lease', 'Buyer intros', 'DSCR matching', 'Rent-roll desk'],
  responseTime: 'Usually replies in under 2 hours',
  memberSince: 'Joined RE Network · Jan 2025',
}

export const DUMMY_STATEMENTS: DashboardListItem[] = [
  {
    id: 'st-1',
    title: 'March 2026 earnings statement',
    subtitle: 'Referral intros + completed service orders',
    meta: 'Invoice #ST-2403',
    amount: '$1,240.00',
    status: 'Paid',
    tone: 'success',
  },
  {
    id: 'st-2',
    title: 'February 2026 earnings statement',
    subtitle: 'Lease review packages · 4 closings',
    meta: 'Invoice #ST-2402',
    amount: '$980.00',
    status: 'Paid',
    tone: 'success',
  },
  {
    id: 'st-3',
    title: 'Advertise spend — Network feed',
    subtitle: 'Deal desk community promo impressions',
    meta: 'Ad invoice #AD-118',
    amount: '-$86.40',
    status: 'Charged',
    tone: 'muted',
  },
  {
    id: 'st-4',
    title: 'Platform fee summary',
    subtitle: '12% service commission · March period',
    meta: 'Fee memo',
    amount: '-$148.80',
    status: 'Settled',
    tone: 'info',
  },
]

export const DUMMY_PAYOUTS: DashboardListItem[] = [
  {
    id: 'po-1',
    title: 'Bank deposit · ****4218',
    subtitle: 'Chase Business Checking',
    meta: 'Mar 18, 2026',
    amount: '$620.00',
    status: 'Completed',
    tone: 'success',
  },
  {
    id: 'po-2',
    title: 'Bank deposit · ****4218',
    subtitle: 'Referral intro payouts batch',
    meta: 'Mar 4, 2026',
    amount: '$410.00',
    status: 'Completed',
    tone: 'success',
  },
  {
    id: 'po-3',
    title: 'Pending payout',
    subtitle: 'Clears after order confirmation window',
    meta: 'Est. Mar 25, 2026',
    amount: '$191.00',
    status: 'Pending',
    tone: 'warn',
  },
]

export const DUMMY_PROPOSALS: DashboardListItem[] = [
  {
    id: 'pr-1',
    title: 'Lease review for downtown medical suite',
    subtitle: 'Brief from Valley Crest Realty · 4,200 SF',
    meta: 'Sent 2 days ago',
    status: 'Under review',
    tone: 'info',
    amount: '$350',
  },
  {
    id: 'pr-2',
    title: 'Buyer intro — multifamily near 93728',
    subtitle: 'Investor sponsor seeking local buyer agent',
    meta: 'Sent 5 days ago',
    status: 'Shortlisted',
    tone: 'success',
    amount: '$175',
  },
  {
    id: 'pr-3',
    title: 'DSCR match for Clovis fourplex',
    subtitle: 'Employer project · underwriting desk assist',
    meta: 'Sent 1 week ago',
    status: 'Awaiting reply',
    tone: 'warn',
    amount: '$225',
  },
]

export const DUMMY_JOB_ALERTS: DashboardListItem[] = [
  {
    id: 'ja-1',
    title: 'Commercial lease agents · Fresno metro',
    subtitle: 'ZIP 93710–93728 · Full-time + contract',
    meta: '3 new matches this week',
    status: 'On',
    tone: 'success',
  },
  {
    id: 'ja-2',
    title: 'Loan consultant partners · Central Valley',
    subtitle: 'DSCR / investor lending focus',
    meta: '1 new match',
    status: 'On',
    tone: 'success',
  },
  {
    id: 'ja-3',
    title: 'Title & escrow PSP openings',
    subtitle: 'Clovis + Madera · part-time OK',
    meta: 'Quiet this week',
    status: 'Paused',
    tone: 'muted',
  },
]

export const DUMMY_JOBS_APPLIED: DashboardListItem[] = [
  {
    id: 'job-1',
    title: 'Senior commercial lease associate',
    subtitle: 'Valley Crest Realty · Fresno',
    meta: 'Applied Mar 14',
    status: 'Interview',
    tone: 'info',
  },
  {
    id: 'job-2',
    title: 'Contract underwriting desk (PSP)',
    subtitle: 'Riverbend Capital · Remote + onsite',
    meta: 'Applied Mar 10',
    status: 'In review',
    tone: 'warn',
  },
  {
    id: 'job-3',
    title: 'Buyer-agent pod lead',
    subtitle: 'Central Valley Homes · Clovis',
    meta: 'Applied Feb 28',
    status: 'Submitted',
    tone: 'muted',
  },
]

export const DUMMY_MEETINGS: DashboardListItem[] = [
  {
    id: 'mt-1',
    title: 'Intro call — Valley Crest hiring manager',
    subtitle: 'Video · Commercial lease role',
    meta: 'Tomorrow · 10:00 AM',
    status: 'Upcoming',
    tone: 'info',
  },
  {
    id: 'mt-2',
    title: 'Referral packet walkthrough',
    subtitle: 'With Maria Santos · Title referee',
    meta: 'Thu · 2:30 PM',
    status: 'Upcoming',
    tone: 'info',
  },
  {
    id: 'mt-3',
    title: 'Crowdfund campaign Q&A',
    subtitle: 'LCRE Riverfront venue sponsors',
    meta: 'Completed · Mar 16',
    status: 'Done',
    tone: 'success',
  },
]

export const DUMMY_SUBMISSIONS: DashboardListItem[] = [
  {
    id: 'sub-1',
    title: 'Lease package — Medical suite downtown',
    subtitle: 'Rent roll + LOI + insurance certs',
    meta: 'Submitted Mar 19',
    status: 'In review',
    tone: 'info',
  },
  {
    id: 'sub-2',
    title: 'Referral packet — Buyer intro #4821',
    subtitle: 'Sponsor brief + agent resume',
    meta: 'Submitted Mar 17',
    status: 'Accepted',
    tone: 'success',
  },
  {
    id: 'sub-3',
    title: 'DSCR checklist — Clovis fourplex',
    subtitle: 'Awaiting bank statements upload',
    meta: 'Started Mar 20',
    status: 'Needs docs',
    tone: 'warn',
  },
]

export const DUMMY_SERVICE_ADDONS: DashboardListItem[] = [
  {
    id: 'ao-1',
    title: 'Rush turnaround (48 hours)',
    subtitle: 'Attach to lease review packages',
    meta: 'Add-on',
    amount: '+$75',
    status: 'Enabled',
    tone: 'success',
  },
  {
    id: 'ao-2',
    title: 'GPS order tracking',
    subtitle: 'Live route updates for field referrals',
    meta: 'Add-on',
    amount: '+$25',
    status: 'Enabled',
    tone: 'success',
  },
  {
    id: 'ao-3',
    title: 'Notary coordination',
    subtitle: 'Same-day mobile notary handoff',
    meta: 'Add-on',
    amount: '+$60',
    status: 'Optional',
    tone: 'muted',
  },
]

export const DUMMY_ALL_POSTS: DashboardListItem[] = [
  {
    id: 'post-1',
    title: 'Commercial lease brief — medical suite',
    subtitle: 'Posted to Referral marketplace',
    meta: 'Mar 19 · Application',
    status: 'Open',
    tone: 'info',
  },
  {
    id: 'post-2',
    title: 'Buyer intro request · 93728 multifamily',
    subtitle: 'Investor sponsor brief',
    meta: 'Mar 15 · Application',
    status: 'Matched',
    tone: 'success',
  },
  {
    id: 'post-3',
    title: 'Job post response — lease associate',
    subtitle: 'Valley Crest Realty opening',
    meta: 'Mar 14 · Job',
    status: 'Interview',
    tone: 'info',
  },
  {
    id: 'post-4',
    title: 'Service listing — rent-roll desk',
    subtitle: 'My Services draft published',
    meta: 'Mar 12 · Service',
    status: 'Draft',
    tone: 'muted',
  },
]

export const DUMMY_ACCEPTED_HIRED: DashboardListItem[] = [
  {
    id: 'ah-1',
    title: 'Buyer intro — Valley investor pod',
    subtitle: 'Hired by Central Valley Homes',
    meta: 'Started Mar 8',
    status: 'Hired',
    tone: 'success',
    amount: '$175',
  },
  {
    id: 'ah-2',
    title: 'Lease review — industrial warehouse',
    subtitle: 'Accepted by Riverbend Capital',
    meta: 'Started Feb 22',
    status: 'In progress',
    tone: 'info',
    amount: '$350',
  },
]

export const DUMMY_APPLICATIONS_RECEIVED: DashboardListItem[] = [
  {
    id: 'ar-1',
    title: 'Jordan Lee applied to lease review package',
    subtitle: 'Broker · 6 yrs commercial experience',
    meta: '2 hours ago',
    status: 'New',
    tone: 'info',
  },
  {
    id: 'ar-2',
    title: 'Aisha Khan applied to buyer-agent intro',
    subtitle: 'Investor-focused agent · Clovis',
    meta: 'Yesterday',
    status: 'Shortlist',
    tone: 'success',
  },
  {
    id: 'ar-3',
    title: 'Chris Nguyen · DSCR matching inquiry',
    subtitle: 'Loan consultant partner request',
    meta: '3 days ago',
    status: 'New',
    tone: 'info',
  },
]

export const DUMMY_APPLICATION_REJECTED: DashboardListItem[] = [
  {
    id: 'rj-1',
    title: 'Weekend rush lease review',
    subtitle: 'Outside service area · Madera remote only',
    meta: 'Declined Mar 11',
    status: 'Rejected',
    tone: 'danger',
  },
  {
    id: 'rj-2',
    title: 'Out-of-scope title search request',
    subtitle: 'Not offered on current PSP profile',
    meta: 'Declined Mar 5',
    status: 'Rejected',
    tone: 'danger',
  },
]

export const DUMMY_APPLICATION_NON_COMPLETE: DashboardListItem[] = [
  {
    id: 'nc-1',
    title: 'Lease package — missing insurance cert',
    subtitle: 'Applicant: Valley Crest associate',
    meta: '60% complete',
    status: 'Incomplete',
    tone: 'warn',
  },
  {
    id: 'nc-2',
    title: 'Buyer intro form — no budget range',
    subtitle: 'Sponsor left ZIP blank',
    meta: '40% complete',
    status: 'Incomplete',
    tone: 'warn',
  },
]

export const DUMMY_REFERRALS_SENT: DashboardListItem[] = [
  {
    id: 'rs-1',
    title: 'Warm intro → Maria Santos (Title)',
    subtitle: 'For downtown medical suite closing',
    meta: 'Sent Mar 18',
    status: 'Accepted',
    tone: 'success',
  },
  {
    id: 'rs-2',
    title: 'Loan consultant match → Riverbend',
    subtitle: 'DSCR fourplex sponsor',
    meta: 'Sent Mar 16',
    status: 'Pending',
    tone: 'warn',
  },
  {
    id: 'rs-3',
    title: 'Buyer agent intro → Central Valley Homes',
    subtitle: 'Investor seeking 93728 inventory',
    meta: 'Sent Mar 12',
    status: 'Viewed',
    tone: 'info',
  },
]
