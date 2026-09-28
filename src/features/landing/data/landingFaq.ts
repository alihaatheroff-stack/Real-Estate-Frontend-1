export type LandingFaqItem = {
  question: string
  answer: string
}

export const LANDING_FAQS: readonly LandingFaqItem[] = [
  {
    question: 'What payment methods are supported?',
    answer:
      'We accept major credit cards and ACH transfers. Invoices are issued after you select a package and confirm scope with the provider.',
  },
  {
    question: 'Can I cancel at any time?',
    answer:
      'You may cancel before work begins for a full refund. After the provider starts, cancellation terms follow the package you selected.',
  },
  {
    question: 'How do I get a receipt for my purchase?',
    answer:
      'A receipt is emailed automatically after payment. You can also download invoices from your dashboard once booking is confirmed.',
  },
  {
    question: 'How do I get access after purchase?',
    answer:
      'After payment clears, the provider receives your booking details and will contact you within the stated response window to begin delivery.',
  },
]
