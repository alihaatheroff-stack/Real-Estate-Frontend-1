import { PATHS } from '@/app/router/paths'
import type { FormOfPaymentMethodType } from '@/features/auth/model/registerPsp'

export const REGISTER_PAYMENT_TERMS_OPTIONS = [
  'Before Service',
  'Half now, half after service',
  'After service',
] as const

export const REGISTER_CASH_SUBOPTIONS = [
  'P2P (Person-to-Person)',
  'Money Order',
  'Check',
] as const

export const REGISTER_CARD_PAYMENT_TYPES = [
  'Direct Deposit',
  'Stripe',
  'PayPal',
  'Square',
  'Zelle',
  'Venmo',
  'CashApp',
  'Other',
] as const satisfies readonly FormOfPaymentMethodType[]

export const REGISTER_CREDIT_FINANCIERS = [
  'Lender',
  'In House Financing',
  'LCRE Financing',
] as const

/** Shown after LCRE Financing is selected. */
export const REGISTER_LCRE_FINANCING_CATEGORIES = [
  {
    label: 'Slice® by FNBO',
    href: 'https://www.fnbo.com/pos-lending/slice',
  },
  {
    label: 'Wisetack',
    href: 'https://www.wisetack.com',
  },
] as const

export const REGISTER_PAYMENT_PACKET_OPTIONS = [
  'Weekly',
  'Bi-Weekly',
  'Monthly',
  'Yearly',
] as const

export const REGISTER_TIER_OPTIONS = [
  'Basic Tier',
  'Standard Tier',
  'Advanced Tier',
  'Lux Tier',
] as const

export const LCRE_FINANCING_BANNER = {
  title: 'LCRE Financing',
  body: 'Explore LCRE crowdfunding and financing options for your project.',
  href: PATHS.lcreCrowdfunding,
} as const

export type RegisterPaymentMethodRoot =
  | 'Cash'
  | 'Card'
  | 'Credit'
  | 'Payment Packet'
  | 'Tier'

export function isCardPaymentType(
  value: string,
): value is FormOfPaymentMethodType {
  return (REGISTER_CARD_PAYMENT_TYPES as readonly string[]).includes(value)
}
