export type AboutNoteBlock = {
  heading: string
  lines: readonly string[]
  children?: readonly AboutNoteBlock[]
}

export const ABOUT_NOTES: readonly AboutNoteBlock[] = [
  {
    heading: "MONETIZATION'S:",
    lines: [
      "SUBSCRIPTION MAINTENANCE FEE'S",
      'AFTER DEAL CLOSES 25-30%',
      'ADVERTISING IN OUR PLATFORMS.',
      'SELLING TOOLS.',
      'OPERATOR IILABS',
      'VIRTUAL ASSISTANTS.',
    ],
  },
  {
    heading: 'Pages:',
    lines: [
      "Affiliate's",
      'Hearth',
      "Credit Check Approved By Most Brokerage's And Banks",
      'Batchleads, Propstream, Mojo Dialer, Redx, Mojo',
      'Background Check',
      "Perhapp's Google",
      "Perhap's Meta",
      '% Of Each Deal If Legal',
    ],
    children: [
      {
        heading: 'Referrals',
        lines: [
          'Service Results',
          'Service Description',
          'Profile Results',
          'Profile Description',
          'Office Results',
          'Office Description',


        ],
      },
      {
        heading: 'Crowdfunding',
        lines: ['Results'],
      },
      {
        heading: 'Network',
        lines: [

          'News Feed',
          'Articles',
          'Forums',
          'Groups',
          'Clips Videos',
        ],
      },
      {
        heading: 'Shop',
        lines: ['Shop'],
      },
      {
        heading: 'About',
        lines: ['Advertisement', 'About', 'Contact'],
      },
    ],
  },
  {
    heading: 'COMMUNITY:',
    lines: [],
    children: [
      {
        heading: 'SAAS:',
        lines: [
          "REFERRAL'S",
          "BANNER'S LANDING PAGE",
          'BETWEEN RESULTS',
          "BANNER'S LANDING PAGE",
          "MONTHLY BUT CHARGED QUARTERLY BUY'S TIME CASE DOING SOMETHING WRONG OR ANALYTIC'S FLUCTUATING",
          "FOR EACH POST'S",
          "OFFICE DISCOUNT'S",
        ],
      },
    ],
  },
  {
    heading: 'CROWDFUNDING:',
    lines: [
      "ADVERTISE OTHER DEAL'S OTHER CROWDFUNDING BUSINESS'ES",
      'RAISE DONATION MONEY',
    ],
  },
  {
    heading: 'NETWORKING:',
    lines: [
      'ADVERTISE',
      "SIDE'S END-TO-END",
      'IN SLIDE-SHOW HOW FACEBOOK HAS IT',
      'NEWSFEED',
      "GROUP'S BETWEEN POST'S",
      "FORUM'S",
      "ARTICLE'S BETWEEN :CONTENT",
      "VIDEO'S ONE AFTER ANOTHER",
      'GET ALL AT AH LOW RATE.',
      "DEMOGRAPHIC'S",
      "TIME DATE DIFFERENT RATE'S",
      "CERTAIN LOCATION'S",
      "SHOULD WE CHARGE DIFFERENYTLY FOR DIFFERENT PROFESSION'S, TRADE'S.",
      "BETWEEN REAL ESTATE POST'S",
    ],
  },
]
