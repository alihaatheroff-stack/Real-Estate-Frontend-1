import type { FilterTreeNode } from '@/features/search/data/landingFilterOptions'
import {
  CHARGE_TREE,
  CLIENT_EXPERIENCE_TREE,
  CLIENT_MOTIVE_OPTIONS,
  CREDIT_CHECK_TREE,
  DTI_OPTIONS,
  EXECUTIVE_CLIENT_EXPERIENCE_TREE,
  EXECUTIVE_FORM_OF_PAYMENT_TREE,
  EXECUTIVE_REPRESENTATION_TOP_TREE,
  FIELD_TREE,
  FIND_FILTER_OPTIONS,
  FORM_OF_PAYMENT_TREE,
  GOV_AGENCIES_OPTIONS,
  INCOME_OPTIONS,
  INSTITUTION_OPTIONS,
  LANGUAGE_BY_LETTER,
  LENGTH_TO_CLOSE_OPTIONS,
  LOAN_EXPERIENCE_TREE,
  LOAN_RATE_TYPE_OPTIONS,
  LOAN_TYPES_OPTIONS,
  LTV_OPTIONS,
  MORTGAGE_FIELD_TREE,
  MORTGAGE_GOV_AGENCIES_OPTIONS,
  MORTGAGE_PROPERTY_CONDITION_OPTIONS,
  MORTGAGE_SALE_TYPE_TREE,
  MORTGAGE_TITLE_OPTIONS,
  MORTGAGE_VACANCY_OPTIONS,
  PERCENTAGE_SHARE_FILTER_OPTIONS,
  PREPAYMENT_PENALTY_OPTIONS,
  PRICE_DEMOGRAPHY_OPTIONS,
  PROOF_OPTIONS,
  PROPERTY_CONDITION_OPTIONS,
  PR_SQ_FT_OPTIONS,
  PSP_BY_LETTER,
  PSP_NESTED_TREES,
  PURCHASE_EXPERIENCE_TREE,
  REFERENCES_OPTIONS,
  REPRESENTATION_TOP_TREE,
  ROLE_FILTER_OPTIONS,
  SALE_TYPE_TREE,
  TAG_SKILL_TREE,
  TIME_DURATION_OPTIONS,
  TITLE_OPTIONS,
  TRADES_CLIENT_EXPERIENCE_TREE,
  VACANCY_OPTIONS,
  WHICH_SERVICE_TREE,
  WILLING_TO_TRAIN_EXECUTIVE_OPTIONS,
  WILLING_TO_TRAIN_RE_OPTIONS,
  WILLING_TO_TRAIN_TRADES_OPTIONS,
  YOUR_EXPERIENCE_OPTIONS,
} from '@/features/search/data/landingFilterOptions'

const EXPERIENCE_LEVEL_OPTIONS = [
  '1 — Low experience',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10 — High experience',
] as const

export type GlossarySnippet = {
  id: string
  question: string
  answer: string
}

export type GlossaryEntry = GlossarySnippet & {
  /** Name used for A–Z order: the category or the option. */
  term: string
  letter: string
}

type CategorySource = {
  key: string
  label: string
  answer: string
  aliases?: string[]
  options?: readonly string[]
  trees?: FilterTreeNode[][]
  letters?: Array<Record<string, string[]>>
  nested?: Array<Record<string, FilterTreeNode[]>>
}

export function cleanLabel(label: string) {
  return label.replace(/:\s*$/, '').replace(/\s+/g, ' ').trim()
}

export function normKey(label: string) {
  return cleanLabel(label)
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

function slugify(value: string) {
  const slug = value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return slug.slice(0, 96) || 'entry'
}

function indexLetter(term: string) {
  const ch = term.trim().charAt(0).toUpperCase()
  return /[A-Z]/.test(ch) ? ch : '#'
}

function collectNodeLabels(nodes: FilterTreeNode[] | undefined, into: string[]) {
  if (!nodes) return
  for (const node of nodes) {
    const label = node.label?.trim()
    if (label) into.push(label)
    if (node.children?.length) collectNodeLabels(node.children, into)
  }
}

function isCatchAll(option: string) {
  const key = normKey(option)
  return key === 'all of the above' || key === 'any of the above' || key === 'all recorded'
}

function optionAnswer(categoryKey: string, categoryLabel: string, option: string) {
  const name = cleanLabel(option)
  if (isCatchAll(name)) {
    return `“${name}” keeps ${categoryLabel} from rejecting a match over one unchecked choice. We include it so you can stay open to every answer in the list.`
  }
  if (normKey(name) === 'doesn t matter') {
    return `“Doesn't Matter” means ${categoryLabel} should not decide who is matched. We include it so you can leave this detail open without being filtered out.`
  }

  switch (categoryKey) {
    case 'role':
      return `We ask “${name}” so the search knows which side of the marketplace you are on and only uses matches that fit that side.`
    case 'search-by':
      return `We ask “${name}” so results open as that kind of listing, instead of mixing services, people, and offices together.`
    case 'psp':
      return `We list “${name}” so you can limit the search to this kind of property service provider. The introduction then goes to people who actually do that work.`
    case 'fields':
    case 'mortgage-fields':
      return `We list “${name}” so the referral stays inside this field of work, instead of matching you with a specialty you did not ask for.`
    case 'institution':
      return `We ask “${name}” so the loan match follows where the financing actually sits, and you are not paired with the other kind of institution.`
    case 'purchase-experience':
      return `We ask “${name}” so the lender match reflects this purchase background, not a different kind of buyer.`
    case 'loan-experience':
      return `We ask “${name}” so the originator fits how familiar the borrower already is with this kind of financing.`
    case 'which-service':
      return `We ask “${name}” so the search returns this mortgage service, not every related loan role.`
    case 'property-condition':
      return `We ask “${name}” so people who take this condition of property are matched, and other conditions are left out.`
    case 'vacancy':
      return `We ask “${name}” so the referral accounts for who is in the property before someone is introduced.`
    case 'title':
    case 'legal-title':
      return `We ask “${name}” so the people on the deal match this way of holding title, which changes who can sign and who is paid.`
    case 'sale-type':
      return `We ask “${name}” so this kind of sale is matched on purpose, and a different closing path is not treated as the same job.`
    case 'gov-agencies':
      return `We ask “${name}” so the match includes people who already work files involving this agency.`
    case 'charge':
      return `We ask “${name}” so the points charged on the loan are clear before a mortgage referral is made.`
    case 'income':
      return `We ask “${name}” so the loan product fits how the borrower documents income.`
    case 'dti':
      return `We ask “${name}” so financing is matched to what the borrower already owes, instead of a debt load they cannot carry.`
    case 'ltv':
      return `We ask “${name}” so the loan size is matched to the property value you are willing to finance.`
    case 'loan-types':
      return `We ask “${name}” so this loan product is searched on its own, and other products are not treated as the same.`
    case 'rate-type':
      return `We ask “${name}” so the match follows how the payment is allowed to change over the life of the loan.`
    case 'prepayment':
      return `We ask “${name}” so a borrower is not referred into a prepayment penalty they would not accept.`
    case 'time-duration':
      return `We ask “${name}” so the loan term matches how long the borrower plans to pay the money back.`
    case 'length-to-close':
      return `We ask “${name}” so timing is part of the match, and a loan that cannot close in that window is not introduced.`
    case 'credit-check':
      return `We ask “${name}” so the borrower and the lender agree on the credit review before the file starts.`
    case 'price-demography':
      return `We ask “${name}” so the referral stays inside this price level of the market.`
    case 'representation':
      return `We ask “${name}” so you are introduced for this side and structure of the deal, not a different transaction.`
    case 'client-experience':
      return `We ask “${name}” so the client on the referral has this background, instead of being treated like every other client.`
    case 'experience-level':
      return `We ask “${name}” so the experience on the referral fits how demanding the work is.`
    case 'your-experience':
      return `We ask “${name}” so the other side can see this level of seasoning before they accept the introduction.`
    case 'motive':
      return `We ask “${name}” so time is spent on clients with this motive, not on every person browsing.`
    case 'languages':
      return `We list “${name}” so both sides of the referral can speak it while the work is discussed. A match that cannot talk through the job is not a useful introduction.`
    case 'percentage':
      return `We ask “${name}” so both sides see the referral share before anyone is introduced.`
    case 'willing-to-train':
      return `We ask “${name}” so both sides know whether teaching the referred person is part of this introduction.`
    case 'payment':
      return `We ask “${name}” so how the work is paid is settled before the job starts.`
    case 'references':
      return `We ask “${name}” so the network knows whether you want to send a referral, receive one, or bring someone onboard.`
    case 'tag-skill':
      return `We list “${name}” so search can surface this extra skill, which a job title alone does not show.`
    case 'price-per-sq-ft':
      return `We ask “${name}” so a trades quote stays inside this price-per-square-foot band.`
    case 'proof':
      return `We ask “${name}” so a trades referral starts from someone who can show they have the right to hire the work.`
    default:
      return `We ask “${name}” under ${categoryLabel} so matching, verification, and search use the same detail on both sides of the referral.`
  }
}

const CATEGORIES: CategorySource[] = [
  {
    key: 'role',
    label: 'Role',
    aliases: ['Role'],
    options: ROLE_FILTER_OPTIONS,
    answer:
      'We ask your role so we know how you take part: looking for help or offering it, and whether you are found as a profile or an office.',
  },
  {
    key: 'search-by',
    label: 'Search By',
    aliases: ['Search By'],
    options: FIND_FILTER_OPTIONS,
    answer:
      'We ask what you want to find — a service, a profile, or an office — so results open on the right kind of listing.',
  },
  {
    key: 'psp',
    label: "A-Z Psp's",
    aliases: ["A-Z Psp's"],
    letters: [PSP_BY_LETTER],
    nested: [PSP_NESTED_TREES],
    answer:
      'We ask which property service provider you need so matching stays inside that profession, instead of mixing agents, trades, lenders, and other work.',
  },
  {
    key: 'fields',
    label: 'Fields',
    aliases: ['Fields'],
    trees: [FIELD_TREE],
    answer:
      'We ask the field of work so a referral stays inside the property type or specialty you actually handle.',
  },
  {
    key: 'mortgage-fields',
    label: "Field's",
    aliases: ["Field's"],
    trees: [MORTGAGE_FIELD_TREE],
    answer:
      'We ask the loan field so a mortgage referral stays inside the property and product specialty you finance.',
  },
  {
    key: 'institution',
    label: 'Institution',
    options: INSTITUTION_OPTIONS,
    answer:
      'We ask whether the loan sits with a bank or a brokerage so the match follows how that institution actually lends.',
  },
  {
    key: 'purchase-experience',
    label: 'Purchase Experience',
    trees: [PURCHASE_EXPERIENCE_TREE],
    answer:
      'We ask about purchase experience so a loan match reflects whether this buyer is new to purchasing or already knows the process.',
  },
  {
    key: 'loan-experience',
    label: 'Loan Experience',
    trees: [LOAN_EXPERIENCE_TREE],
    answer:
      'We ask about loan experience so the originator fits how familiar the borrower is with financing.',
  },
  {
    key: 'which-service',
    label: 'Which Service',
    aliases: ['Which Serveice', 'Which Service'],
    trees: [WHICH_SERVICE_TREE],
    answer:
      'We ask which mortgage service you need so the search returns that work, not every lender role.',
  },
  {
    key: 'representation',
    label: "Representation's",
    aliases: ["Representation's"],
    trees: [REPRESENTATION_TOP_TREE, EXECUTIVE_REPRESENTATION_TOP_TREE],
    answer:
      'We ask what side of the deal you represent so buyers, sellers, lessors, and consultants are introduced to people who handle that side.',
  },
  {
    key: 'client-experience',
    label: 'Client experience',
    aliases: [
      'Client Experience',
      'Client experience',
      'Client experience to find you',
    ],
    trees: [
      CLIENT_EXPERIENCE_TREE,
      EXECUTIVE_CLIENT_EXPERIENCE_TREE,
      TRADES_CLIENT_EXPERIENCE_TREE,
    ],
    answer:
      'We ask what kind of client to match so a first-time client is not treated the same as an investor or a repeat client.',
  },
  {
    key: 'experience-level',
    label: 'Experience Level',
    options: EXPERIENCE_LEVEL_OPTIONS,
    answer:
      'We ask for a level from 1 to 10 so the experience on the referral fits how demanding the work is.',
  },
  {
    key: 'property-condition',
    label: 'Property condition',
    aliases: [
      'Property Condition',
      'Property condition',
      "Property condition's you want to be found",
    ],
    options: [...PROPERTY_CONDITION_OPTIONS, ...MORTGAGE_PROPERTY_CONDITION_OPTIONS],
    answer:
      'We ask the condition of the property so people who take on that kind of building are matched, and other conditions are left out.',
  },
  {
    key: 'vacancy',
    label: 'Vacancy',
    aliases: [
      'Vacancy',
      "Vacancy: Restriction's",
      "Vacancy: check which of the following vacancie's you want to be found",
    ],
    options: [...VACANCY_OPTIONS, ...MORTGAGE_VACANCY_OPTIONS],
    answer:
      'We ask who occupies the property so the referral accounts for an owner, a tenant, a vacant building, or an unsure situation.',
  },
  {
    key: 'title',
    label: 'Title',
    aliases: ['Title'],
    options: [...TITLE_OPTIONS, ...MORTGAGE_TITLE_OPTIONS],
    answer:
      'We ask how title is held so the people on the deal match the ownership structure.',
  },
  {
    key: 'legal-title',
    label: 'Legal Title',
    options: TITLE_OPTIONS,
    answer:
      'We ask for the legal title on trades work so ownership or tenancy can be confirmed before someone is hired.',
  },
  {
    key: 'sale-type',
    label: 'Sale type',
    aliases: ['Sale Type', 'Sale type'],
    trees: [SALE_TYPE_TREE, MORTGAGE_SALE_TYPE_TREE],
    answer:
      'We ask the kind of sale so a standard closing is not mixed with a short sale, auction, lien, or government sale.',
  },
  {
    key: 'gov-agencies',
    label: 'Gov Agencies',
    options: [...GOV_AGENCIES_OPTIONS, ...MORTGAGE_GOV_AGENCIES_OPTIONS],
    answer:
      'We ask which government agency is involved so matches include people who already work those files.',
  },
  {
    key: 'charge',
    label: 'Charge',
    trees: [CHARGE_TREE],
    answer:
      'We ask how points are charged, on the front or the back, so the fee is clear before a mortgage referral is made.',
  },
  {
    key: 'income',
    label: 'Income',
    options: INCOME_OPTIONS,
    answer:
      'We ask whether income is stated or not so the loan product fits how the borrower documents earnings.',
  },
  {
    key: 'dti',
    label: "Debt To Income Ratio's (DTI)",
    options: DTI_OPTIONS,
    answer:
      'We ask the debt-to-income range so a borrower is matched with financing that fits what they already owe.',
  },
  {
    key: 'ltv',
    label: "Loan To Value Ratio's (LTV)",
    options: LTV_OPTIONS,
    answer:
      'We ask the loan-to-value range so the loan size fits the property value.',
  },
  {
    key: 'loan-types',
    label: "Type's Of Loan's",
    options: LOAN_TYPES_OPTIONS,
    answer:
      'We ask the loan type so conventional, jumbo, investor, and other products are not treated as the same search.',
  },
  {
    key: 'rate-type',
    label: 'Type: Fixed, ARM',
    options: LOAN_RATE_TYPE_OPTIONS,
    answer:
      'We ask whether the rate should be fixed or adjustable so the match follows how the payment can change.',
  },
  {
    key: 'prepayment',
    label: 'Prepayment Penalty',
    options: PREPAYMENT_PENALTY_OPTIONS,
    answer:
      'We ask if a prepayment penalty is acceptable so nobody is referred into a loan they would not take.',
  },
  {
    key: 'time-duration',
    label: 'Time Duration: To Pay Back',
    options: TIME_DURATION_OPTIONS,
    answer:
      'We ask how long the loan should run so the term matches how the borrower plans to pay it back.',
  },
  {
    key: 'length-to-close',
    label: 'Length Of Time To Close',
    options: LENGTH_TO_CLOSE_OPTIONS,
    answer:
      'We ask how fast the loan must close so timing is part of the match, not a surprise later.',
  },
  {
    key: 'credit-check',
    label: 'Credit Check',
    trees: [CREDIT_CHECK_TREE],
    answer:
      'We ask what kind of credit check is expected so the borrower and the lender agree on that step up front.',
  },
  {
    key: 'price-demography',
    label: 'Price Demography',
    aliases: ['Price demography', 'Price Demography'],
    options: PRICE_DEMOGRAPHY_OPTIONS,
    answer:
      'We ask the price level — luxury, mid, or economic — so the referral stays inside the market you work.',
  },
  {
    key: 'your-experience',
    label: 'Your Experience',
    aliases: ['Your experience', 'Your Experience'],
    options: YOUR_EXPERIENCE_OPTIONS,
    answer:
      'We ask how seasoned you are so the other side can see expert, mature, seasonal, or new before they accept.',
  },
  {
    key: 'motive',
    label: 'Motive',
    aliases: [
      'Motive',
      "Motive's",
      'Motive: motive type of client you to be found',
    ],
    options: CLIENT_MOTIVE_OPTIONS,
    answer:
      'We ask the client’s motive so time is spent on people who are ready, not only on people who are browsing.',
  },
  {
    key: 'languages',
    label: 'Languages Spoken',
    aliases: ['Languages spoken', 'Languages Spoken'],
    letters: [LANGUAGE_BY_LETTER],
    answer:
      'We ask which languages are spoken so both sides can talk through the work. A referral fails when the two sides cannot communicate.',
  },
  {
    key: 'percentage',
    label: 'Percentage share',
    aliases: [
      'Percentage',
      'Percentage Share',
      "Percentage amount's you give for refferal's you receive",
    ],
    options: PERCENTAGE_SHARE_FILTER_OPTIONS,
    answer:
      'We ask what share of a referral fee you give or expect so that number is agreed before anyone is introduced.',
  },
  {
    key: 'willing-to-train',
    label: 'Are you willing to train your referreed party',
    options: [
      ...WILLING_TO_TRAIN_RE_OPTIONS,
      ...WILLING_TO_TRAIN_EXECUTIVE_OPTIONS,
      ...WILLING_TO_TRAIN_TRADES_OPTIONS,
    ],
    answer:
      'We ask whether you will train the person you refer so both sides know if teaching is part of the introduction.',
  },
  {
    key: 'payment',
    label: 'Form Of Payment',
    aliases: ['Form of payment', 'Form Of Payment'],
    trees: [FORM_OF_PAYMENT_TREE, EXECUTIVE_FORM_OF_PAYMENT_TREE],
    answer:
      'We ask how payment is made so cash, card, and financing are settled before the work starts.',
  },
  {
    key: 'references',
    label: "Refference's",
    options: REFERENCES_OPTIONS,
    answer:
      'We ask whether you send referrals, receive them, or bring someone onboard so the network knows how you want to participate.',
  },
  {
    key: 'tag-skill',
    label: 'Tag; Skill',
    aliases: [
      'Tag; Skill',
      'Tag; skill: (optional)',
      'Tag; skill: (extra cirriculum you want to be found)',
    ],
    trees: [TAG_SKILL_TREE],
    answer:
      'We ask for extra skills so search can surface specialties that a job title alone does not show.',
  },
  {
    key: 'price-per-sq-ft',
    label: 'Pr. Sq. Ft.',
    options: PR_SQ_FT_OPTIONS,
    answer:
      'We ask the price per square foot so trades quotes stay inside the budget band for the job.',
  },
  {
    key: 'proof',
    label: 'Proof',
    options: PROOF_OPTIONS,
    answer:
      'We ask whether you can show ownership or tenancy so a trades referral starts from a person who has the right to hire the work.',
  },
  {
    key: 'az-psp',
    label: 'A-Z Psp',
    aliases: ['A-Z Psp'],
    answer:
      'We ask which property service provider you are so clients searching that profession can find your profile.',
  },
  {
    key: 'field-specialty',
    label: 'Field Specialty',
    answer:
      'We ask your field specialty so you are shown for the property types you actually handle.',
  },
  {
    key: 'condition-specialty',
    label: 'Property Condition Specialty',
    answer:
      'We ask which property conditions you take so you are not matched to buildings you do not work on.',
  },
  {
    key: 'vacancy-specialty',
    label: 'Vacancy Specialty',
    answer:
      'We ask which occupancy situations you handle so the referral fits the property you will walk into.',
  },
  {
    key: 'title-experiences',
    label: 'Title Experiences',
    answer:
      'We ask which ways of holding title you have handled so the deal structure matches your experience.',
  },
  {
    key: 'sale-type-experience',
    label: 'Sale Type Experience',
    answer:
      'We ask which kinds of sales you have closed so a short sale is not sent to someone who only does standard closings.',
  },
  {
    key: 'experience',
    label: 'Experience',
    answer:
      'We ask the client experience you work with so a first-time client is paired with someone who takes that work.',
  },
  {
    key: 'recipient-experience',
    label: 'Recipient Experience',
    answer:
      'We ask how seasoned you are so the other side can see that before they accept your profile.',
  },
  {
    key: 'motive-experience',
    label: 'Motive Experience',
    answer:
      'We ask which client motives you take so your time goes to the clients you are willing to work with.',
  },
  {
    key: 'language-experience',
    label: 'Language Experience',
    answer:
      'We ask which languages you can work in so a client is not introduced to someone they cannot talk with.',
  },
  {
    key: 'english-level',
    label: 'English Level',
    answer:
      'We ask your English level so both sides know how comfortably the work can be discussed in English.',
  },
  {
    key: 'referral-share',
    label: 'Referral Share',
    answer:
      'We ask what share of a referral fee you give so that number is set before anyone is introduced.',
  },
  {
    key: 'willing-to-train-short',
    label: 'Willing to train',
    answer:
      'We ask whether you will train the person you refer so both sides know if teaching is part of the introduction.',
  },
  {
    key: 'education-archive',
    label: 'EDUCATION + ARCHIVE + video playlists based on search',
    answer:
      'We ask which lessons you want so the archive and playlists match the work you searched for.',
  },
  {
    key: 'ar-tools',
    label: 'AR MEASUREMENT TOOLS',
    answer:
      'We ask which measuring tools you use so a job can include doors, windows, or land area when that is needed.',
  },
  {
    key: 'payment-methods',
    label: 'Payment Methods',
    answer:
      'We ask how you accept payment so cash and credit are clear before the job starts.',
  },
  {
    key: 'payment-packet',
    label: 'Payment Packet',
    answer:
      'We ask how often you are paid so the billing cycle is agreed before work begins.',
  },
  {
    key: 'tier-selection',
    label: 'Tier Selection',
    answer:
      'We ask which membership tier you want so the tools and the price match the plan you chose.',
  },
  {
    key: 'payment-terms',
    label: 'Payment Terms',
    answer:
      'We ask when payment is due so both sides know if it is before the work, after, or on another schedule.',
  },
  {
    key: 'mile-radius',
    label: 'Mile Radius',
    answer:
      'We ask how far you will travel so search only shows you to people inside that distance.',
  },
  {
    key: 'email',
    label: 'Email',
    aliases: ['Email'],
    answer:
      'We ask for an email so you can sign in and so people can reach you about a referral.',
  },
  {
    key: 'password',
    label: 'Password',
    answer: 'We ask for a password so only you can open this account.',
  },
  {
    key: 'confirm-password',
    label: 'Confirm password',
    aliases: ['Confirm password'],
    answer:
      'We ask you to type the password again so a typo does not lock you out of the account.',
  },
  {
    key: 'business-name',
    label: 'Business name',
    answer:
      'We ask the business name so the profile and payouts use the name clients will see.',
  },
  {
    key: 'address',
    label: 'Address',
    aliases: ['Issuer Address'],
    answer:
      'We ask for the address so the business or the document can be verified in the right place.',
  },
  {
    key: 'city',
    label: 'City / CDP',
    answer: 'We ask the city so the profile is placed in the correct community.',
  },
  {
    key: 'county',
    label: 'County',
    answer: 'We ask the county so local search and records match where you work.',
  },
  {
    key: 'region',
    label: 'Region',
    answer: 'We ask the region so matches stay inside the area you serve.',
  },
  {
    key: 'state',
    label: 'State',
    answer: 'We ask the state so licensing and search follow the state you work in.',
  },
  {
    key: 'zipcode',
    label: 'Zipcode',
    aliases: ['Zip Code'],
    answer: 'We ask the zip code so nearby clients can find you.',
  },
  {
    key: 'country',
    label: 'Country',
    answer: 'We ask the country so the address and the rules that apply to you are correct.',
  },
  {
    key: 'phone',
    label: 'Phone',
    aliases: ['Contact number', 'Issuer phone number', 'Emergency contact no'],
    answer: 'We ask for a phone number so someone can reach you when email is not enough.',
  },
  {
    key: 'website',
    label: 'Website',
    answer: 'We ask for a website so clients can check the business before they accept.',
  },
  {
    key: 'business-hours',
    label: 'Business hours',
    answer: 'We ask when the business is open so people contact you during hours you actually answer.',
  },
  {
    key: 'best-times',
    label: 'Best times to reach you',
    answer: 'We ask the best times to call so a referral does not come when you cannot pick up.',
  },
  {
    key: 'payment-type',
    label: 'Payment type',
    answer: 'We ask the payment type so payouts are sent the way you can actually receive them.',
  },
  {
    key: 'routing-number',
    label: 'Routing Number',
    answer: 'We ask for the routing number so a bank deposit reaches the right bank.',
  },
  {
    key: 'account-number',
    label: 'Account Number',
    answer: 'We ask for the account number so the payout is deposited into your account.',
  },
  {
    key: 'zelle-email',
    label: 'Zelle Email',
    answer: 'We ask for the Zelle email so that payout is sent to the right Zelle account.',
  },
  {
    key: 'zelle-phone',
    label: 'Zelle Phone',
    answer: 'We ask for the Zelle phone so that payout is sent to the right Zelle account.',
  },
  {
    key: 'same-as-business',
    label: 'Same as Business information',
    answer:
      'We ask if this matches the business information so you do not have to type the same address twice.',
  },
  {
    key: 'name',
    label: 'Name',
    aliases: ['Name as shown on ID', 'Name issued to', 'Name to contact in emergency'],
    answer: 'We ask for this name so the account, the document, or the payout is tied to the right person.',
  },
  {
    key: 'url',
    label: 'URL',
    answer: 'We ask for the payment URL so the payout link goes to the account you control.',
  },
  {
    key: 'license-name',
    label: 'License name',
    answer: 'We ask the license name so the extra credential is labeled correctly on your profile.',
  },
  {
    key: 'issued-by',
    label: 'Issued by',
    answer: 'We ask who issued the document so the credential can be checked.',
  },
  {
    key: 'id-no',
    label: 'ID no',
    aliases: ['ID#', 'License / Credential #'],
    answer: 'We ask for the ID or license number so the document can be matched to you.',
  },
  {
    key: 'issue-date',
    label: 'Issue date',
    answer: 'We ask the issue date so we know when the document became valid.',
  },
  {
    key: 'expiry-date',
    label: 'Expiry date',
    aliases: ['Expiration Date'],
    answer: 'We ask the expiry date so an expired credential is not treated as current.',
  },
  {
    key: 'date-of-birth',
    label: 'Date of birth',
    answer: 'We ask the date of birth so the identification can be matched to the right person.',
  },
  {
    key: 'allergy',
    label: 'Any allergy',
    aliases: ['Which allergy'],
    answer: 'We ask about allergies so a visit or a job does not put you around something that harms you.',
  },
  {
    key: 'medical-condition',
    label: 'Any other medical condition',
    answer: 'We ask about other medical conditions so the people working with you can account for them.',
  },
  {
    key: 'associates',
    label: 'Number of associates',
    answer: 'We ask how many associates you are adding so the membership total matches the seats you need.',
  },
  {
    key: 'card-number',
    label: 'Card#',
    answer: 'We ask for the card number so the membership can be paid.',
  },
  {
    key: 'security-code',
    label: 'Security Code',
    answer: 'We ask for the security code so the card charge can be confirmed as yours.',
  },
  {
    key: 'membership-total',
    label: 'Total',
    answer: 'We show the total so you can see what the membership costs before you pay.',
  },
]

type Built = {
  entries: GlossaryEntry[]
  categoryByKey: Map<string, GlossarySnippet>
  aliasToKey: Map<string, string>
  optionByKey: Map<string, GlossarySnippet>
}

function buildGlossary(): Built {
  const entries: GlossaryEntry[] = []
  const categoryByKey = new Map<string, GlossarySnippet>()
  const aliasToKey = new Map<string, string>()
  const optionByKey = new Map<string, GlossarySnippet>()
  const usedIds = new Set<string>()

  function takeId(base: string) {
    let id = base
    let n = 2
    while (usedIds.has(id)) id = `${base}-${n++}`
    usedIds.add(id)
    return id
  }

  for (const category of CATEGORIES) {
    aliasToKey.set(normKey(category.label), category.key)
    for (const alias of category.aliases ?? []) {
      aliasToKey.set(normKey(alias), category.key)
    }

    const categoryQuestion = `Why do we ask “${category.label}”?`
    const categorySnippet: GlossarySnippet = {
      id: takeId(`q-${slugify(category.key)}`),
      question: categoryQuestion,
      answer: category.answer,
    }
    categoryByKey.set(category.key, categorySnippet)
    entries.push({
      ...categorySnippet,
      term: category.label,
      letter: indexLetter(category.label),
    })

    const rawOptions: string[] = []
    if (category.options) rawOptions.push(...category.options)
    for (const tree of category.trees ?? []) collectNodeLabels(tree, rawOptions)
    for (const letters of category.letters ?? []) {
      for (const labels of Object.values(letters)) rawOptions.push(...labels)
    }
    for (const nested of category.nested ?? []) {
      for (const tree of Object.values(nested)) collectNodeLabels(tree, rawOptions)
    }

    const seen = new Set<string>()
    for (const option of rawOptions) {
      const optionNorm = normKey(option)
      if (!optionNorm || seen.has(optionNorm)) continue
      seen.add(optionNorm)
      const name = cleanLabel(option)
      const snippet: GlossarySnippet = {
        id: takeId(`q-${slugify(category.key)}-${slugify(optionNorm)}`),
        question: `Why is “${name}” an option under ${category.label}?`,
        answer: optionAnswer(category.key, category.label, option),
      }
      optionByKey.set(`${category.key}::${optionNorm}`, snippet)
      entries.push({
        ...snippet,
        term: name,
        letter: indexLetter(name),
      })
    }
  }

  entries.sort(
    (a, b) =>
      a.term.localeCompare(b.term, undefined, { sensitivity: 'base', numeric: true }) ||
      a.question.localeCompare(b.question, undefined, { sensitivity: 'base' }),
  )

  return { entries, categoryByKey, aliasToKey, optionByKey }
}

const GLOSSARY = buildGlossary()

export function glossaryEntries() {
  return GLOSSARY.entries
}

function fallbackAnswer(label: string) {
  const name = cleanLabel(label) || 'this'
  return `We ask “${name}” so matching, verification, and search can use the right details.`
}

function rememberCategory(label: string, question: string, answer: string): GlossarySnippet {
  const name = cleanLabel(label) || 'this'
  const id = `q-field-${slugify(normKey(name))}`
  const already = GLOSSARY.entries.find((entry) => entry.id === id)
  if (already) return { id: already.id, question, answer: already.answer }
  GLOSSARY.entries.push({
    id,
    question,
    answer,
    term: name,
    letter: indexLetter(name),
  })
  GLOSSARY.entries.sort(
    (a, b) =>
      a.term.localeCompare(b.term, undefined, { sensitivity: 'base', numeric: true }) ||
      a.question.localeCompare(b.question, undefined, { sensitivity: 'base' }),
  )
  return { id, question, answer }
}

export function glossaryForCategory(label: string): GlossarySnippet {
  const key = GLOSSARY.aliasToKey.get(normKey(label))
  const found = key ? GLOSSARY.categoryByKey.get(key) : undefined
  const question = `Why do we ask “${cleanLabel(label) || 'this'}”?`
  if (!found) return rememberCategory(label, question, fallbackAnswer(label))
  return { id: found.id, question, answer: found.answer }
}

export function glossaryForOption(categoryLabel: string, option: string): GlossarySnippet {
  const categoryKey = GLOSSARY.aliasToKey.get(normKey(categoryLabel))
  const category = categoryKey ? GLOSSARY.categoryByKey.get(categoryKey) : undefined
  const question = `Why is “${cleanLabel(option)}” an option under ${cleanLabel(categoryLabel) || 'this'}?`
  if (!categoryKey) {
    return { id: '', question, answer: optionAnswer('', cleanLabel(categoryLabel), option) }
  }
  const found = GLOSSARY.optionByKey.get(`${categoryKey}::${normKey(option)}`)
  if (!found) {
    return {
      id: category?.id ?? '',
      question,
      answer: optionAnswer(categoryKey, cleanLabel(categoryLabel), option),
    }
  }
  return { id: found.id, question, answer: found.answer }
}
