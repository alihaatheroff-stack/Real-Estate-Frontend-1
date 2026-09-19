export type LearnMoreTab = 'how-it-works' | 'user-journey' | 'benefits'

export type GuestItemIcon = 'RefreshCw' | 'GraduationCap' | 'Presentation' | 'HandCoins' | 'Satellite'

export const LEARN_MORE_TABS: { id: LearnMoreTab; label: string }[] = [
  { id: 'how-it-works', label: 'How it works' },
  { id: 'user-journey', label: 'User journey' },
  { id: 'benefits', label: 'Benefits' },
]

export const GUEST_ITEMS: { icon: GuestItemIcon; title: string; text: string }[] = [
  {
    icon: 'RefreshCw',
    title: 'Refer',
    text: 'Send or receive trusted introductions with clear percentage share.',
  },
  {
    icon: 'GraduationCap',
    title: 'Learn',
    text: 'Optional mentorship and deal shadowing baked into eligible services.',
  },
  {
    icon: 'Presentation',
    title: 'Teach',
    text: 'Share your expertise through mentorship and guide others on live deals.',
  },
  {
    icon: 'HandCoins',
    title: 'Earn',
    text: 'Structured splits for senders, recipients, and platform fees.',
  },
  {
    icon: 'Satellite',
    title: 'GPS',
    text: 'GPS-aware workflows and credential checks designed for real property work.',
  },
]

export const REFERRAL_BENEFITS = [
  {
    title: 'New persons (new agents)',
    items: [
      'Steady deal flow as a recipient: Access qualified, pre-warmed clients without costly prospecting.',
      'Boost income & portfolio: Increase closings and diversify your client base.',
      'Build reputation & trust: Being the go-to expert grows your brand within the network.',
      'Expand market reach: Enter new niches or territories through referrals.',
      'Work efficiently: Focus on closing deals instead of chasing leads.',
      'Learn & grow (as a sender or participant): Gain insights into new markets, niches, and deal types by collaborating with specialists.',
      'Engage in mutual sending: Receive leads and confidently send clients you can’t best serve.',
      'Overall network benefits: Continuous learning & collaboration; collective strength through shared knowledge and client satisfaction.',
    ],
  },
  {
    title: 'Seasonal persons (agents with seasonal/busy or fluctuating workloads)',
    items: [
      'Balance your workload (as a sender): Free up time and avoid burnout by referring when overwhelmed.',
      'Earn without overhead: Make referral fees even when you’re too busy or it’s outside your expertise.',
      'Protect your reputation: Keep clients happy by connecting them with the best-fit agent.',
      'Steady deal flow and boost income (as a recipient during slower periods): Access pre-warmed clients and increase closings.',
      'Work efficiently: Focus on closing instead of chasing leads.',
      'Network advantages: Balanced sending & receiving so everyone grows; all leads flow through the network so no client is avoided.',
    ],
  },
  {
    title: 'Experienced persons (established agents)',
    items: [
      'Earn without overhead and protect your reputation (as a sender): Refer out of your expertise or when busy while still earning fees and keeping clients happy.',
      'Build strong alliances: Create reciprocal referral relationships and joint ventures.',
      'Expand your influence: Get introduced to new clients and markets through your network.',
      'Be part of a dynamic flow: Send and receive quality leads continually (not just offloading unwanted clients).',
      'Grow your team (as a recipient): Potential to recruit and mentor other agents who send you leads.',
      'Build reputation & trust further as the go-to expert.',
      'Network advantages: Collective strength, continuous learning & collaboration, and sustainable growth by both giving and getting referrals.',
    ],
  },
] as const

export const USER_JOURNEY_STEPS = [
  {
    title: 'Register & Set Up',
    text: 'Create your account, complete your profile, and verify your identity.',
  },
  {
    title: 'Explore & Select',
    text: 'Browse services, professional profiles, and agencies. Review ratings, past work, and specializations to find the right match.',
  },
  {
    title: 'Referral & Collaboration',
    text: 'Send or receive referrals. Discuss expectations, agree on referral splitting, and formalize the collaboration through a clear agreement.',
  },
  {
    title: 'Learning & Teaching',
    text: 'Access training resources or share knowledge with other professionals in the network.',
  },
  {
    title: 'Place or Accept an Order',
    text: 'Once aligned, proceed with the service order.',
  },
  {
    title: 'Secure Payment & Protection',
    items: [
      'Review and agree to the Terms of Service',
      'Understand all legal disclosures',
      'Confirm details before payment',
      'Complete payment securely',
      'Funds are held in escrow until the work is completed',
    ],
  },
  {
    title: 'Track Progress',
    text: 'Monitor the order (including GPS route tracking where applicable) through your dashboard.',
  },
  {
    title: 'Review & Rate',
    text: 'After completion, leave a verified review to help the community.',
  },
  {
    title: 'Manage Everything from Your Dashboard',
    text: 'Access your activity, earnings, referrals, settings, and more in one place.',
  },
  {
    title: 'Grow Further',
    text: 'Advertise your services, post new offerings, explore benefits, and stay connected through Q&A, About, and Contact sections.',
  },
] as const

export const HOW_IT_WORKS_STEPS = [
  {
    title: '1. Join the Network',
    text: 'Sign up and get verified. Whether you’re looking for professionals or offering services, your journey begins with a trusted profile.',
  },
  {
    title: '2. Find the Right Match',
    text: 'Browse pre-vetted real estate professionals — agents, investors, lenders, contractors, property managers, and more. Filter by specialization, performance metrics, and verified reviews.',
  },
  {
    title: '3. Refer or Get Referred',
    items: [
      'Send leads to trusted experts when a client needs specialized help.',
      'Receive qualified, pre-warmed leads from other professionals in the network.',
    ],
  },
  {
    title: '4. Collaborate with Clarity',
    text: 'Set clear expectations, agree on referral terms, and formalize the partnership so everyone is aligned from the start.',
  },
  {
    title: '5. Learn While You Earn',
    text: 'Access training and knowledge-sharing opportunities every time you refer or collaborate — turning every referral into a growth opportunity.',
  },
  {
    title: '6. Order & Pay Securely',
    text: 'Place the service order with full transparency. Payments are protected through escrow, and our “We have your back” system ensures safety for both sides.',
  },
  {
    title: '7. Track, Complete & Review',
    text: 'Monitor progress in real time, complete the transaction, and leave a verified review that strengthens the entire network.',
  },
  {
    title: '8. Grow Together',
    text: 'Earn commissions, expand your professional circle, and build long-term reciprocal relationships — all within one trusted ecosystem.',
  },
] as const
