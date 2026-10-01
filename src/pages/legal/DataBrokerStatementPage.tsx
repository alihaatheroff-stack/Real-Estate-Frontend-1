import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import {
  BulletList,
  PolicyDocLayout,
  PolicySection,
  PolicyTable,
  SubHeading,
} from '@/pages/legal/components/PolicyPrimitives'

const DISCLOSURE_ROWS: string[][] = [
  [
    'Identifiers',
    'Names, DOB, ZIP, email, phone, government IDs, account credentials',
  ],
  [
    'Sensitive Data',
    'Citizenship/immigration status, union membership, sexual orientation, gender identity',
  ],
  ['Biometric Data', 'Fingerprints, facial recognition, voice prints'],
  ['Device Data', 'Mobile ad ID, Connected TV ID, VIN'],
  ['Precise Geolocation', 'Whether collected'],
  ["Minors' Data", 'Whether collected'],
  ['Reproductive Health Data', 'Whether collected'],
]

export function DataBrokerStatementPage() {
  return (
    <PolicyDocLayout
      title="Data Broker Registration Statement"
      footerNote="This Data Broker Registration Statement was last reviewed on [DATE] and is effective as of [DATE]."
    >
      <PolicySection id="introduction" title="1. Introduction">
        <p>
          This Data Broker Registration Statement describes LCRE&apos;s status and obligations under
          California law, including the California Delete Act (SB 362) and the California Consumer
          Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA).
        </p>
        <p>
          This Statement should be read together with our{' '}
          <Link to={PATHS.privacyPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          ,{' '}
          <Link to={PATHS.cookiePolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Cookie Policy
          </Link>
          , and{' '}
          <Link to={PATHS.termsOfService} className="font-medium text-brand underline-offset-2 hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </PolicySection>

      <PolicySection id="definition" title="2. What Is a Data Broker Under California Law?">
        <p>
          California defines a &quot;data broker&quot; as a business that knowingly collects and sells
          to third parties the personal information of a consumer with whom the business does not have
          a direct relationship.
        </p>
        <p>Key elements:</p>
        <BulletList
          items={[
            '"Sells" includes disclosing personal information for monetary or other valuable consideration',
            '"Direct relationship" means the consumer intentionally interacted with your business',
            '"Personal information" is defined broadly under CCPA (identifiers, commercial data, internet activity, geolocation, etc.)',
          ]}
        />
        <p>
          Critical point: The California Privacy Protection Agency (CalPrivacy) evaluates data broker
          status at the data level, not the entity level. A company can have direct relationships with
          some consumers and still be a data broker if it sells personal information acquired from
          third-party sources.
        </p>
      </PolicySection>

      <PolicySection id="are-we" title="3. Are We a Data Broker?">
        <SubHeading>A. Our Assessment</SubHeading>
        <p>LCRE operates four modules: Hiring, Referrals, Crowdfunding, and Networking.</p>

        <p className="font-medium text-ink">Hiring Module:</p>
        <BulletList
          items={[
            'We collect PSP and customer information when they register directly on our platform',
            'Direct relationship: YES — users intentionally interact with LCRE',
            'If we only sell information from users who registered directly with us, we are not a data broker for that data',
          ]}
        />

        <p className="font-medium text-ink">Referrals Module:</p>
        <BulletList
          items={[
            'We log referral activity (referrer, recipient, client information)',
            'Direct relationship: PARTIALLY — referrers and recipients are direct users, but the referred client may not have a direct relationship with LCRE',
            'Risk: If we sell or disclose referred client information to third parties without the client having a direct relationship with us, that data may trigger data broker status',
          ]}
        />

        <p className="font-medium text-ink">Crowdfunding Module:</p>
        <BulletList
          items={[
            'We collect interest list and donation information directly from users',
            'Direct relationship: YES',
          ]}
        />

        <p className="font-medium text-ink">Advertising:</p>
        <BulletList
          items={[
            'If we sell or share advertising data with third parties for cross-context behavioral advertising, and that data includes information collected indirectly, we may be a data broker',
          ]}
        />

        <SubHeading>B. Our Current Position</SubHeading>
        <p>
          As of 10/1/2026, LCRE [IS / IS NOT] a registered data broker in California.
        </p>
        <p>
          If we determine that any module involves selling or sharing personal information from
          consumers with whom we do not have a direct relationship, we will register with the
          California Privacy Protection Agency (CPPA).
        </p>
      </PolicySection>

      <PolicySection id="registration" title="4. If We Are a Data Broker: Registration Requirements">
        <SubHeading>A. Annual Registration</SubHeading>
        <p>
          Data brokers must register annually with the California Privacy Protection Agency (CPPA).
        </p>
        <BulletList
          items={[
            'Registration deadline: January 31 for the prior year\'s activities.',
            'Registration fee: [$400 / as specified by CPPA]',
          ]}
        />

        <SubHeading>B. Required Disclosures</SubHeading>
        <p>
          Under SB 361 (Defending Californians&apos; Data Act), effective January 1, 2026, registered
          data brokers must disclose:
        </p>
        <PolicyTable headers={['Category', 'Required Disclosure']} rows={DISCLOSURE_ROWS} />

        <SubHeading>C. Recipient Disclosures</SubHeading>
        <p>
          Data brokers must also disclose whether, in the past year, they sold or shared personal
          information with:
        </p>
        <BulletList
          items={[
            'Developers of AI systems (including GenAI)',
            'Foreign actors (governments or companies in China, North Korea, Russia, Iran)',
            'Government entities (federal, state, law enforcement — unless pursuant to subpoena)',
          ]}
        />
        <p>
          Penalty for inaccurate disclosure: CalPrivacy has already fined companies for incorrectly
          reporting foreign actor disclosures.
        </p>
      </PolicySection>

      <PolicySection id="drop" title="5. DROP (Delete Request and Opt-Out Platform) Obligations">
        <SubHeading>A. What Is DROP?</SubHeading>
        <p>
          California&apos;s Delete Request and Opt-Out Platform (DROP) is a centralized system that
          lets California residents submit a single deletion request that cascades to all registered
          data brokers.
        </p>
        <BulletList
          items={[
            'Launched: January 1, 2026 (consumers can submit requests)',
            'Broker processing deadline: August 1, 2026',
          ]}
        />

        <SubHeading>B. Our Obligations (If Registered)</SubHeading>
        <p>If LCRE is a registered data broker, we must:</p>
        <BulletList
          items={[
            'Access DROP at least once every 45 calendar days',
            'Download consumer deletion request lists',
            'Match hashed identifiers against our records',
            'Delete matched personal information within 45 days',
            'Report status back to DROP',
            'Repeat this cycle indefinitely',
          ]}
        />

        <SubHeading>C. What Must Be Deleted</SubHeading>
        <p>
          For each matched identifier, we must completely and permanently erase all personal
          information, including inferences, associated with that identifier.
        </p>
        <p>
          Exceptions: CCPA exemptions apply (security, legal obligations, completing transactions).
        </p>

        <SubHeading>D. Penalties</SubHeading>
        <BulletList
          items={[
            'Failure to register: $200 per day',
            'Failure to process deletion requests: Up to $200 per request, per day',
            'Potential exposure: A single missed deletion cycle could theoretically exceed $1.5 billion in penalties',
          ]}
        />
      </PolicySection>

      <PolicySection id="technical" title="6. How DROP Works Technically">
        <SubHeading>A. Consumer Request Process</SubHeading>
        <BulletList
          items={[
            'Consumer submits request via DROP',
            'Identity verified via California Identity Gateway',
            'DROP generates hashed identifiers (name, DOB, phone/email)',
            'Deletion lists published for data brokers',
          ]}
        />

        <SubHeading>B. Broker Matching Process</SubHeading>
        <BulletList
          items={[
            'Download deletion list (hashed identifiers)',
            'Standardize and hash our own identifiers using DROP-specified algorithm',
            'Match hashed values',
            'Delete matched records',
            'Report status back to DROP',
          ]}
        />

        <SubHeading>C. Matching Example</SubHeading>
        <BulletList
          items={[
            'DROP hash for "John" → "abcd"',
            'DROP hash for "Smith" → "1234"',
            'Concatenated identifier: "abcd1234"',
            'We hash our own records and match against this value',
          ]}
        />
      </PolicySection>

      <PolicySection id="commitment" title="7. Our Commitment">
        <SubHeading>A. Compliance</SubHeading>
        <p>
          LCRE is committed to full compliance with California&apos;s data broker laws. If we
          determine that any module involves data broker activity, we will:
        </p>
        <BulletList
          items={[
            'Register with CPPA by the annual deadline',
            'Disclose all required categories of information',
            'Comply with DROP processing requirements',
            'Maintain records demonstrating compliance',
          ]}
        />

        <SubHeading>B. Transparency</SubHeading>
        <p>
          We will publish this Statement on our website and update it annually or as required by law.
        </p>

        <SubHeading>C. User Rights</SubHeading>
        <p>California residents have the right to:</p>
        <BulletList
          items={[
            'Know what personal information we collect',
            'Request deletion of their personal information',
            'Opt out of the sale or sharing of their personal information',
            'Use DROP to submit deletion requests to all registered data brokers',
          ]}
        />
        <p>
          For more information, see our{' '}
          <Link to={PATHS.privacyPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </PolicySection>

      <PolicySection id="module" title="8. Module-Specific Data Broker Considerations">
        <SubHeading>Hiring Module</SubHeading>
        <BulletList
          items={[
            'PSP data collected directly → not data broker activity',
            'Customer data collected directly → not data broker activity',
            'If we sell customer data to PSPs (beyond providing the service), may trigger data broker status',
          ]}
        />

        <SubHeading>Referrals Module</SubHeading>
        <BulletList
          items={[
            'Referrer/recipient data collected directly → not data broker activity',
            'Referred client data collected indirectly (from referrer) → may trigger data broker status if sold or disclosed',
            'Action: Confirm whether referred client data is sold or shared with third parties',
          ]}
        />

        <SubHeading>Crowdfunding Module</SubHeading>
        <BulletList
          items={[
            'Interest list data collected directly → not data broker activity',
            'Donation data collected directly → not data broker activity',
          ]}
        />

        <SubHeading>Advertising Module</SubHeading>
        <BulletList
          items={[
            'If we share data with advertisers for cross-context behavioral advertising, and that data includes indirect data → may trigger data broker status',
            'Action: Confirm whether advertising data sharing includes indirect data',
          ]}
        />
      </PolicySection>

      <PolicySection id="contact" title="9. Contact">
        <p>For questions about this Statement:</p>
        <div className="space-y-1">
          <p className="font-medium text-ink">Life Coordination Real Estate Network</p>
          <p>PO BOX 591, FIREBAUGH CA 93622, NORTH AMERICA</p>
          <p>myteamleadgenerator@gmail.com</p>
          <p>[Phone Number]</p>
        </div>
        <p className="font-medium text-ink">For California residents:</p>
        <BulletList
          items={[
            'California Privacy Protection Agency (CPPA): privacy.ca.gov',
            'DROP platform: privacy.ca.gov/drop/',
          ]}
        />
      </PolicySection>

      <PolicySection id="changes" title="10. Changes to This Statement">
        <p>
          We may update this Statement as our data practices change or as laws evolve. Material
          changes will be communicated via:
        </p>
        <BulletList
          items={[
            'Platform notification',
            'Email (if opted in)',
            'Updated "Last Updated" date',
          ]}
        />
      </PolicySection>
    </PolicyDocLayout>
  )
}
