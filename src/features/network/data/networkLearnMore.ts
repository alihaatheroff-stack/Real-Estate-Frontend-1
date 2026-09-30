export type NetworkLearnMoreItem = {
  label: string
  children?: string[]
}

export const NETWORK_LEARN_MORE = {
  heading: '🌐 4.Network',
  intro: 'Anonymously Post and Comment Through:',
  items: [
    {
      label: 'Network into masterminds, think tanks, and micro-communities',
    },
    {
      label: 'Real Estate Education,',
    },
    {
      label: 'Stay signed in Exchange Conversations in:',
    },
    {
      label: 'Newsfeed:',
      children: [
        'Open Your network feed',
        'Jump into the live feed: posts, conversations, and deal-oriented updates from RE Network members—similar in spirit to the social layers you know, built for real estate outcomes.',
        "Stay current with posts and activity from tradesmen. investor's, professional's, customer's, across the network.",
      ],
    },
    {
      label: 'Articles & blogs',
      children: [
        'Long-form insights, case studies, and market takes from people in the field.',
      ],
    },
    {
      label: "Forum's.",
      children: [
        'Threaded discussions on strategy, markets, and execution—not scattered group chaos.',
        "Think of topic's where other's could discuss of those topics and more topic's within those topic's",
      ],
    },
    {
      label: "Group's",
      children: [
        'Could be easily found; filter by latest joined, earliest joined put in name to be found easier.',
        'Find your tribe by strategy, geography, or role and go deep with the right peers.',
      ],
    },
  ] satisfies NetworkLearnMoreItem[],
} as const
