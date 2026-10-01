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

const SUMMARY_ROWS: string[][] = [
  ['Spam', 'Warning + removal', '7-day suspension', '30-day suspension'],
  ['Harassment', '7-day suspension', '30-day suspension', 'Permanent ban'],
  ['Hate speech', '30-day suspension', 'Permanent ban', '—'],
  [
    'Fair Housing violation',
    'Content removal + warning',
    '30-day suspension',
    'Permanent ban + report to authorities',
  ],
  ['Fraud', 'Permanent ban + report', '—', '—'],
  ['Copyright infringement', 'Content removal', '30-day suspension', 'Permanent ban'],
  ['Illegal content', 'Permanent ban + report', '—', '—'],
]

export function CommunityGuidelinesPage() {
  return (
    <PolicyDocLayout
      title="Community Guidelines"
      contactLines={['Life Coordination Real Estate Network ("LCRE," "we," "us," or "our")']}
      footerNote="These Community Guidelines were last reviewed on [DATE] and are effective as of [DATE]."
    >
      <PolicySection id="purpose" title="1. Purpose of These Guidelines">
        <p>
          LCRE&apos;s Networking module exists to connect real estate professionals, property service
          providers (PSPs), investors, and community members in meaningful, productive, and lawful
          conversations.
        </p>
        <p>These Community Guidelines explain:</p>
        <BulletList
          items={[
            'What is expected of you as a member',
            'What content is prohibited',
            'How moderation works',
            'What happens when rules are broken',
            'How to appeal moderation decisions',
          ]}
        />
        <p>
          These Guidelines supplement our Terms of Service and Privacy Policy. By using the Networking
          module, you agree to follow these Guidelines.
        </p>
      </PolicySection>

      <PolicySection id="values" title="2. Our Community Values">
        <p>
          LCRE is built on faith-aligned values, professional integrity, and respect for the law. We
          expect all members to:
        </p>
        <BulletList
          items={[
            'Be honest — Represent yourself, your credentials, and your intentions accurately.',
            'Be respectful — Disagree professionally. No personal attacks, harassment, or hate speech.',
            'Be lawful — Comply with all applicable federal, state, and local laws, including Fair Housing laws.',
            'Be transparent — Disclose conflicts of interest, affiliate relationships, and paid promotions.',
            'Be constructive — Contribute value. No spam, no scams, no misleading information.',
          ]}
        />
      </PolicySection>

      <PolicySection id="prohibited" title="3. Prohibited Content and Conduct">
        <p>The following are strictly prohibited on LCRE Networking:</p>

        <SubHeading>A. Illegal Content</SubHeading>
        <BulletList
          items={[
            'Content that violates any federal, state, or local law',
            'Content that facilitates or promotes illegal activity',
            'Content that infringes intellectual property rights',
          ]}
        />

        <SubHeading>B. Harassment and Hate Speech</SubHeading>
        <BulletList
          items={[
            'Harassment, intimidation, or threats against any person or group',
            'Hate speech based on race, ethnicity, religion, sex, gender identity, sexual orientation, national origin, disability, age, or any protected class',
            'Doxxing (publishing private information without consent)',
          ]}
        />

        <SubHeading>C. Fair Housing Violations</SubHeading>
        <BulletList
          items={[
            'Discriminatory statements about neighborhoods, tenants, buyers, or sellers based on protected class',
            'Steering language that directs users to or away from areas based on protected class',
            'Listing or advertising that excludes protected classes',
            'Any content that violates the Fair Housing Act or California FEHA',
          ]}
        />

        <SubHeading>D. Fraud and Misrepresentation</SubHeading>
        <BulletList
          items={[
            'False or misleading claims about credentials, licenses, or experience',
            'Fake reviews or testimonials',
            'Impersonation of another person or entity',
            'Ponzi schemes, pyramid schemes, or investment fraud',
            'Misleading investment or deal information',
          ]}
        />

        <SubHeading>E. Spam and Unauthorized Promotion</SubHeading>
        <BulletList
          items={[
            'Unsolicited commercial messages',
            'Repetitive posting of the same content',
            'Posting affiliate links without disclosure',
            'Mass-messaging users without consent',
            'Posting ads outside designated advertising areas',
          ]}
        />

        <SubHeading>F. Harmful or Dangerous Content</SubHeading>
        <BulletList
          items={[
            'Content that promotes violence or self-harm',
            'Content that shares private information without consent',
            'Content that distributes malware or phishing links',
            'Content that violates platform security',
          ]}
        />

        <SubHeading>G. Sexual Content</SubHeading>
        <BulletList
          items={[
            'Explicit sexual content',
            'Sexual content involving minors',
            'Non-consensual sexual content',
          ]}
        />

        <SubHeading>H. Misinformation</SubHeading>
        <BulletList
          items={[
            'False or misleading information about real estate, lending, or investment',
            'Misinformation about health, safety, or elections',
            'Conspiracy theories that could cause harm',
          ]}
        />
      </PolicySection>

      <PolicySection id="moderation" title="4. Content Moderation">
        <SubHeading>A. How We Moderate</SubHeading>
        <p>LCRE uses a combination of:</p>
        <BulletList
          items={[
            'Automated systems — AI and keyword filters to detect prohibited content',
            'Human review — Trained moderators review flagged content',
            'User reports — Members can report content that violates these Guidelines',
          ]}
        />

        <SubHeading>B. What We Moderate</SubHeading>
        <p>We review content that is:</p>
        <BulletList
          items={[
            'Reported by users',
            'Flagged by automated systems',
            'Selected for random review',
          ]}
        />

        <SubHeading>C. What We Do Not Do</SubHeading>
        <BulletList
          items={[
            'We do not pre-screen all content before it is posted',
            'We do not monitor private messages (except as required by law or for safety)',
            'We do not guarantee that all prohibited content will be removed',
          ]}
        />

        <SubHeading>D. Enforcement Actions</SubHeading>
        <p>When we find a violation, we may take the following actions:</p>
        <PolicyTable headers={['Severity', 'Action']} rows={ENFORCEMENT_ROWS} />

        <SubHeading>E. Repeat Offenders</SubHeading>
        <p>
          Repeat violations will result in escalating enforcement, up to and including permanent bans.
        </p>
      </PolicySection>

      <PolicySection id="reporting" title="5. Reporting Violations">
        <p>If you see content that violates these Guidelines:</p>
        <BulletList
          items={[
            'Use the "Report" button on the content',
            'Select a reason (harassment, spam, misinformation, etc.)',
            'Provide additional context if helpful',
            'Submit the report',
          ]}
        />
        <p>Our moderation team reviews reports within 24–72 hours.</p>
        <p>False reports may result in enforcement action against the reporting user.</p>
      </PolicySection>

      <PolicySection id="appeals" title="6. Appeals">
        <p>If your content was removed or your account was suspended, you may appeal:</p>
        <BulletList
          items={[
            'Submit an appeal via [link to appeal form]',
            'Include your username, the content in question, and your explanation',
            'Appeals are reviewed within 7 business days',
            'Appeals are reviewed by a different moderator than the one who made the original decision.',
          ]}
        />
      </PolicySection>

      <PolicySection id="advertising" title="7. Advertising and Promotions">
        <SubHeading>A. Disclosing Paid Promotions</SubHeading>
        <p>
          If you are paid to promote a product, service, or deal, you must disclose it clearly.
          Examples:
        </p>
        <BulletList
          items={[
            '"#ad," "#sponsored," "Paid partnership with [brand]"',
            '"I was compensated for this post"',
          ]}
        />

        <SubHeading>B. Advertiser Content</SubHeading>
        <p>
          Ads served by LCRE are clearly labeled &quot;Ad&quot; or &quot;Sponsored.&quot; Organic
          content must not be disguised as advertising.
        </p>

        <SubHeading>C. No Paid Ranking</SubHeading>
        <p>
          Ads do not influence the ranking of organic content. Sponsored content is visually
          separated.
        </p>

        <SubHeading>D. Advertising Restrictions</SubHeading>
        <p>
          Advertisers may not target users based on protected classes. Fair Housing laws apply to all
          advertising on the platform.
        </p>
      </PolicySection>

      <PolicySection id="groups" title="8. Groups and Forums">
        <SubHeading>A. Group Creation</SubHeading>
        <p>
          Users may create groups by strategy, geography, or role. Group creators must:
        </p>
        <BulletList
          items={[
            'Set clear group rules',
            'Moderate their group consistently',
            'Comply with LCRE Community Guidelines',
          ]}
        />

        <SubHeading>B. Group Moderation</SubHeading>
        <p>Group moderators are responsible for enforcing group rules. LCRE may intervene if:</p>
        <BulletList
          items={[
            'Group rules violate LCRE Guidelines',
            'Moderation is inconsistent or absent',
            'Reports of abuse are received',
          ]}
        />

        <SubHeading>C. Forum Rules</SubHeading>
        <BulletList
          items={[
            'Stay on topic',
            'No cross-posting the same content across multiple forums',
            'No self-promotion without disclosure',
            'No personal attacks on other members',
          ]}
        />
      </PolicySection>

      <PolicySection id="deal-vault" title="9. Deal Vault">
        <p>The Deal Vault is a members-only space for off-market deal leads.</p>

        <SubHeading>A. Posting Rules</SubHeading>
        <BulletList
          items={[
            'Only verified members may post',
            'Include accurate property details',
            'Disclose your role (agent, wholesaler, principal)',
            'No misleading pricing or terms',
            'No properties you do not have the right to market',
          ]}
        />

        <SubHeading>B. Prohibited</SubHeading>
        <BulletList
          items={[
            'Fake deals',
            'Deals requiring upfront fees without disclosure',
            'Deals that violate securities laws',
            'Deals targeting protected classes',
          ]}
        />
      </PolicySection>

      <PolicySection id="reputation" title="10. Reputation System">
        <SubHeading>A. How Reputation Works</SubHeading>
        <p>Reputation badges (&quot;Reliable Referrer,&quot; &quot;Fast Responder&quot;) are based on:</p>
        <BulletList
          items={[
            'Completed referrals',
            'Response times',
            'Peer endorsements',
            'Verified activity',
          ]}
        />

        <SubHeading>B. What Affects Reputation</SubHeading>
        <BulletList
          items={[
            'Successful transactions',
            'Positive feedback',
            'Verified credentials',
            'Consistent participation',
          ]}
        />

        <SubHeading>C. What Does Not Affect Reputation</SubHeading>
        <BulletList
          items={['Payment to the platform', 'Advertising spend', 'Number of followers']}
        />

        <SubHeading>D. Badge Removal</SubHeading>
        <p>Badges may be removed if:</p>
        <BulletList
          items={[
            'Underlying activity is found to be fraudulent',
            'User is suspended or banned',
            'Verification expires',
          ]}
        />
      </PolicySection>

      <PolicySection id="fair-housing" title="11. Fair Housing Statement">
        <p>LCRE is committed to equal housing opportunity. All users must comply with:</p>
        <BulletList
          items={[
            'Federal Fair Housing Act',
            'California Fair Employment and Housing Act (FEHA)',
            'All applicable state and local fair housing laws',
          ]}
        />
        <p>Prohibited conduct includes:</p>
        <BulletList
          items={[
            'Discriminatory statements about neighborhoods, tenants, or buyers',
            'Steering based on protected class',
            'Refusing service based on protected class',
            'Discriminatory advertising',
          ]}
        />
        <p>
          Violations will result in enforcement action and may be reported to the appropriate
          authorities. See our{' '}
          <Link to={PATHS.fairHousingStatement} className="font-medium text-brand underline-offset-2 hover:underline">
            Fair Housing Statement
          </Link>
          .
        </p>
      </PolicySection>

      <PolicySection id="ip" title="12. Intellectual Property">
        <SubHeading>A. Your Content</SubHeading>
        <p>
          You retain ownership of content you post. By posting, you grant LCRE a non-exclusive,
          royalty-free, worldwide license to use, display, and distribute your content for platform
          operations.
        </p>

        <SubHeading>B. Copyright Infringement</SubHeading>
        <p>
          If you believe your copyright has been infringed, follow our{' '}
          <Link to={PATHS.dmcaCopyrightPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            DMCA Policy
          </Link>
          .
        </p>

        <SubHeading>C. Repeat Infringers</SubHeading>
        <p>Accounts with repeated copyright violations will be terminated.</p>
      </PolicySection>

      <PolicySection id="privacy" title="13. Privacy">
        <p>
          Your use of Networking is subject to our{' '}
          <Link to={PATHS.privacyPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          . Key points:
        </p>
        <BulletList
          items={[
            'Your posts and comments are visible to other users',
            'Your profile information is visible according to your settings',
            'Private messages are not monitored except as required by law',
            'You may opt out of personalized feed ranking (ADMT)',
          ]}
        />
      </PolicySection>

      <PolicySection id="changes" title="14. Changes to These Guidelines">
        <p>We may update these Guidelines from time to time. Material changes will be communicated via:</p>
        <BulletList
          items={[
            'Platform notification',
            'Email (if you have opted in)',
            'Updated "Last Updated" date',
          ]}
        />
        <p>Continued use of Networking after changes constitutes acceptance.</p>
      </PolicySection>

      <PolicySection id="contact" title="15. Contact">
        <p>For questions or concerns about these Guidelines:</p>
        <div className="space-y-1">
          <p className="font-medium text-ink">Life Coordination Real Estate Network</p>
          <p>myteamleadgenerator@gmail.com</p>
          <p>myteamleadgenerator@gmail.com</p>
          <p>PO BOX 591, FIREBAUGH CA 93622, NORTH AMERICA</p>
        </div>
      </PolicySection>

      <PolicySection id="enforcement-summary" title="Summary of Enforcement Actions">
        <PolicyTable
          headers={['Violation', 'First Offense', 'Second Offense', 'Third Offense']}
          rows={SUMMARY_ROWS}
        />
      </PolicySection>
    </PolicyDocLayout>
  )
}
