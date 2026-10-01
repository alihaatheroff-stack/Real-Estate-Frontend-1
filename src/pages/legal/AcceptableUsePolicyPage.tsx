import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import {
  BulletList,
  PolicyDocLayout,
  PolicySection,
  PolicyTable,
  SubHeading,
} from '@/pages/legal/components/PolicyPrimitives'

const ENFORCEMENT_ROWS: string[][] = [
  ['Minor', 'Warning + content removal'],
  ['Moderate', 'Temporary suspension (7–30 days)'],
  ['Severe', 'Permanent ban'],
  ['Illegal', 'Report to law enforcement'],
]

export function AcceptableUsePolicyPage() {
  return (
    <PolicyDocLayout
      title="Acceptable Use Policy"
      footerNote="This Acceptable Use Policy was last reviewed on [DATE] and is effective as of [DATE]."
    >
      <PolicySection id="introduction" title="1. Introduction">
        <p>
          This Acceptable Use Policy (&quot;AUP&quot;) describes the rules for using LCRE&apos;s
          platform, including the Hiring, Referrals, Crowdfunding, and Networking modules
          (collectively, the &quot;Services&quot;).
        </p>
        <p>
          This AUP supplements our{' '}
          <Link to={PATHS.termsOfService} className="font-medium text-brand underline-offset-2 hover:underline">
            Terms of Service
          </Link>
          ,{' '}
          <Link to={PATHS.privacyPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          ,{' '}
          <Link to={PATHS.communityGuidelines} className="font-medium text-brand underline-offset-2 hover:underline">
            Community Guidelines
          </Link>
          , and{' '}
          <Link to={PATHS.dmcaCopyrightPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            DMCA / Copyright Policy
          </Link>
          . By using the Services, you agree to comply with this AUP.
        </p>
        <p>If you do not agree with this AUP, do not use the Services.</p>
      </PolicySection>

      <PolicySection id="principles" title="2. General Principles">
        <p>All users of LCRE must:</p>
        <BulletList
          items={[
            'Comply with the law — Federal, state, and local laws apply to your use of the Services.',
            'Respect others — Treat all users with professionalism and courtesy.',
            'Be honest — Provide accurate information about yourself, your credentials, and your intentions.',
            'Protect the platform — Do not attempt to disrupt, damage, or gain unauthorized access to the Services.',
            'Protect others — Do not harm, harass, or defraud other users.',
          ]}
        />
      </PolicySection>

      <PolicySection id="prohibited" title="3. Prohibited Activities">
        <p>The following activities are strictly prohibited on LCRE:</p>

        <SubHeading>A. Illegal Activity</SubHeading>
        <BulletList
          items={[
            'Using the Services for any unlawful purpose',
            'Violating any applicable law, regulation, or court order',
            'Facilitating or promoting illegal activity',
            'Violating fair housing, lending, or securities laws',
          ]}
        />

        <SubHeading>B. Unauthorized Access and Security Violations</SubHeading>
        <BulletList
          items={[
            'Attempting to access accounts, systems, or data without authorization',
            'Circumventing security features, authentication, or access controls',
            'Introducing viruses, malware, ransomware, or other harmful code',
            'Conducting denial-of-service attacks',
            'Using automated tools (bots, scrapers) to access the Services without permission',
            'Reverse engineering, decompiling, or disassembling any part of the Services',
          ]}
        />

        <SubHeading>C. Fraud and Misrepresentation</SubHeading>
        <BulletList
          items={[
            'Impersonating another person, entity, or LCRE representative',
            'Falsifying your identity, credentials, licenses, or affiliations',
            'Posting fake reviews, testimonials, or referrals',
            'Creating multiple accounts to evade enforcement',
            'Making false or misleading claims about services, deals, or investments',
            'Promoting Ponzi schemes, pyramid schemes, or fraudulent investment opportunities',
            'Committing wire fraud, securities fraud, or real estate fraud',
          ]}
        />

        <SubHeading>D. Harassment and Abuse</SubHeading>
        <BulletList
          items={[
            'Harassing, threatening, or intimidating other users',
            'Engaging in hate speech or discriminatory conduct',
            'Stalking or doxxing (publishing private information without consent)',
            'Sending unsolicited sexual content or advances',
            'Retaliating against users who report violations',
          ]}
        />

        <SubHeading>E. Spam and Unauthorized Promotion</SubHeading>
        <BulletList
          items={[
            'Sending unsolicited commercial messages (spam)',
            'Posting repetitive or irrelevant content',
            'Mass-messaging users without consent',
            'Posting affiliate links without disclosure',
            'Advertising outside designated advertising areas',
            'Using the Services to harvest contact information for third-party marketing',
          ]}
        />

        <SubHeading>F. Intellectual Property Violations</SubHeading>
        <BulletList
          items={[
            'Uploading content you do not have the right to share',
            'Infringing copyrights, trademarks, patents, or trade secrets',
            'Removing or altering copyright notices or watermarks',
            "Using LCRE's name, logo, or branding without permission",
          ]}
        />

        <SubHeading>G. Data and Privacy Violations</SubHeading>
        <BulletList
          items={[
            'Collecting personal information about other users without consent',
            'Using personal information for purposes not authorized by the user',
            'Violating CCPA/CPRA or other privacy laws',
            'Sharing confidential information obtained through the Services',
          ]}
        />

        <SubHeading>H. Platform Interference</SubHeading>
        <BulletList
          items={[
            'Overloading servers or infrastructure',
            "Interfering with other users' access to the Services",
            'Manipulating search results, rankings, or reputation systems',
            'Creating fake activity to artificially inflate reputation or engagement',
            'Exploiting bugs or vulnerabilities without reporting them to LCRE',
          ]}
        />

        <SubHeading>I. Financial and Transaction Violations</SubHeading>
        <BulletList
          items={[
            'Circumventing platform fees (non-circumvention)',
            'Processing payments outside the platform to avoid fees',
            'Engaging in money laundering or terrorist financing',
            'Using stolen payment methods',
            'Manipulating escrow or payment systems',
          ]}
        />

        <SubHeading>J. Real Estate and Licensing Violations</SubHeading>
        <BulletList
          items={[
            'Performing licensed real estate activity without a license',
            'Paying or receiving referral fees in violation of RESPA or California law',
            'Steering clients based on protected characteristics',
            'Discriminating in the provision of real estate services',
            'Advertising services requiring a license without proper disclosures',
          ]}
        />

        <SubHeading>K. Crowdfunding Violations</SubHeading>
        <BulletList
          items={[
            'Offering or selling securities without SEC qualification',
            'Making false or misleading statements about investments',
            "Soliciting investments outside the platform's approved channels",
            'Violating Reg A+ Tier 2 investment limits',
            'Failing to disclose conflicts of interest',
          ]}
        />

        <SubHeading>L. Networking Violations</SubHeading>
        <BulletList
          items={[
            'Posting prohibited content (see Community Guidelines)',
            'Creating groups or forums that violate LCRE policies',
            'Misusing the Deal Vault (posting fake deals, misleading terms)',
            'Manipulating reputation badges or endorsements',
          ]}
        />
      </PolicySection>

      <PolicySection id="responsibilities" title="4. User Responsibilities">
        <p>By using the Services, you agree to:</p>

        <SubHeading>A. Provide Accurate Information</SubHeading>
        <BulletList
          items={[
            'Keep your profile information current and accurate',
            'Notify LCRE of any changes to your license, insurance, or credentials',
            'Promptly update payment information',
          ]}
        />

        <SubHeading>B. Maintain Account Security</SubHeading>
        <BulletList
          items={[
            'Keep your login credentials confidential',
            'Notify LCRE immediately of any unauthorized access',
            'Not share your account with others',
            'Not create multiple accounts without authorization',
          ]}
        />

        <SubHeading>C. Comply with Laws</SubHeading>
        <BulletList
          items={[
            'Comply with all applicable federal, state, and local laws',
            'Comply with fair housing, lending, and securities laws',
            'Comply with DRE regulations if you are a licensed professional',
            'Comply with RESPA and California referral fee rules',
          ]}
        />

        <SubHeading>D. Respect Other Users</SubHeading>
        <BulletList
          items={[
            'Communicate professionally',
            'Honor commitments made through the platform',
            'Resolve disputes in good faith',
            'Report violations you witness',
          ]}
        />

        <SubHeading>E. Protect the Platform</SubHeading>
        <BulletList
          items={[
            'Report security vulnerabilities responsibly',
            'Do not exploit bugs or weaknesses',
            'Do not use the Services to harm others',
          ]}
        />
      </PolicySection>

      <PolicySection id="enforcement" title="5. Enforcement">
        <SubHeading>A. Investigation</SubHeading>
        <p>
          LCRE reserves the right to investigate suspected violations of this AUP. Investigations may
          include:
        </p>
        <BulletList
          items={[
            'Reviewing account activity and content',
            'Contacting users for information',
            'Consulting with legal counsel',
            'Cooperating with law enforcement',
          ]}
        />

        <SubHeading>B. Enforcement Actions</SubHeading>
        <p>Violations of this AUP may result in:</p>
        <PolicyTable headers={['Severity', 'Action']} rows={ENFORCEMENT_ROWS} />

        <SubHeading>C. Escalation</SubHeading>
        <p>
          Repeat violations will result in escalating enforcement. LCRE may skip levels for severe
          violations.
        </p>

        <SubHeading>D. Account Termination</SubHeading>
        <p>
          LCRE may terminate your account at any time, with or without notice, for violations of this
          AUP or any other LCRE policy.
        </p>

        <SubHeading>E. No Refunds</SubHeading>
        <p>
          If your account is terminated for AUP violations, you are not entitled to a refund of any
          fees paid.
        </p>
      </PolicySection>

      <PolicySection id="reporting" title="6. Reporting Violations">
        <p>If you become aware of a violation of this AUP:</p>
        <BulletList
          items={[
            "Report it using the platform's report feature",
            'Provide details about the violation',
            'Include evidence if available (screenshots, links, etc.)',
            'Submit the report',
          ]}
        />
        <p>
          LCRE will review reports and take appropriate action. False reports may result in
          enforcement action against the reporting user.
        </p>
        <p>For urgent security issues: Contact myteamleadgenerator@gmail.com immediately.</p>
      </PolicySection>

      <PolicySection id="appeals" title="7. Appeals">
        <p>If your account was suspended or terminated for an AUP violation, you may appeal:</p>
        <BulletList
          items={[
            'Submit an appeal via [link to appeal form]',
            'Include your username and explanation',
            'Appeals are reviewed within 7 business days',
            'Appeals are reviewed by a different moderator than the one who made the original decision.',
          ]}
        />
      </PolicySection>

      <PolicySection id="law-enforcement" title="8. Cooperation with Law Enforcement">
        <p>
          LCRE cooperates with law enforcement investigations. We may disclose user information in
          response to:
        </p>
        <BulletList
          items={['Valid subpoenas', 'Court orders', 'Search warrants', 'Other legal process']}
        />
        <p>We may also report suspected illegal activity to appropriate authorities.</p>
      </PolicySection>

      <PolicySection id="no-waiver" title="9. No Waiver">
        <p>
          LCRE&apos;s failure to enforce any provision of this AUP does not waive our right to enforce
          it later. We may enforce this AUP selectively or not at all, without liability.
        </p>
      </PolicySection>

      <PolicySection id="changes" title="10. Changes to This AUP">
        <p>We may update this AUP from time to time. Material changes will be communicated via:</p>
        <BulletList
          items={[
            'Platform notification',
            'Email (if opted in)',
            'Updated "Last Updated" date',
          ]}
        />
        <p>Continued use of the Services after changes constitutes acceptance.</p>
      </PolicySection>

      <PolicySection id="contact" title="11. Contact">
        <p>For questions about this AUP:</p>
        <div className="space-y-1">
          <p className="font-medium text-ink">Life Coordination Real Estate Network</p>
          <p>PO BOX 591, FIREBAUGH CA 93622, NORTH AMERICA</p>
          <p>myteamleadgenerator@gmail.com</p>
          <p>[Phone Number]</p>
        </div>
      </PolicySection>

      <PolicySection id="module-addenda" title="Module-Specific Addenda">
        <SubHeading>Hiring Module</SubHeading>
        <BulletList
          items={[
            'PSPs must maintain current licenses, insurance, and bonding.',
            'PSPs must comply with DRE advertising and disclosure requirements.',
            'GPS tracking may only be used during active orders with user consent.',
            'Non-circumvention: Users may not hire PSPs off-platform to avoid fees for 12 months.',
          ]}
        />

        <SubHeading>Referrals Module</SubHeading>
        <BulletList
          items={[
            'Referral fees may only be exchanged between licensed entities where permitted by law.',
            'No referral fees for mortgage-related business.',
            'Training exchanges must be documented and contract-signed.',
            'Referral activity is logged for reputation purposes.',
          ]}
        />

        <SubHeading>Crowdfunding Module</SubHeading>
        <BulletList
          items={[
            'No securities may be offered or sold without SEC qualification.',
            'Legal fund donations are non-refundable and not investments.',
            'Interest list participation does not constitute investment commitment.',
            'Investors must comply with Reg A+ Tier 2 investment limits.',
          ]}
        />

        <SubHeading>Networking Module</SubHeading>
        <BulletList
          items={[
            'All content must comply with Community Guidelines.',
            'Fair Housing laws apply to all discussions and advertisements.',
            'Deal Vault postings must be accurate and lawful.',
            'Reputation badges may not be manipulated.',
          ]}
        />
      </PolicySection>
    </PolicyDocLayout>
  )
}
