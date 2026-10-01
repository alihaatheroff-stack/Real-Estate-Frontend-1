import {
  BulletList,
  PolicyDocLayout,
  PolicySection,
  PolicyTable,
  SubHeading,
} from '@/pages/legal/components/PolicyPrimitives'

const PURPOSE_ROWS: string[][] = [
  ['Create and manage your account', 'All'],
  ['Verify PSP credentials (license, insurance, bonding)', 'Hiring, Referrals'],
  ['Match users with PSPs based on criteria', 'Hiring, Referrals'],
  ['Facilitate referrals and track referral activity', 'Referrals'],
  ['Process payments and payouts', 'Hiring, Referrals, Crowdfunding'],
  ['Administer crowdfunding legal fund and interest list', 'Crowdfunding'],
  ['Enable community features (feed, groups, forums)', 'Networking'],
  ['Serve contextual advertising', 'All'],
  ['Communicate about updates, offers, and platform changes', 'All'],
  ['Detect and prevent fraud, abuse, and security incidents', 'All'],
  ['Comply with legal obligations', 'All'],
  ['Improve our Services through analytics and research', 'All'],
]

const RETENTION_ROWS: string[][] = [
  ['Account information', 'Duration of account + 3 years'],
  ['Transaction records', '7 years (tax/legal requirements)'],
  ['Verification records', 'Duration of verification + 3 years'],
  ['Referral activity', 'Duration of account + 3 years'],
  ['Crowdfunding records', '7 years (SEC compliance)'],
  ['Community content', 'Until deleted by user or platform'],
  ['Analytics data', '26 months'],
  ['ADMT risk assessments', '5 years'],
]

export function PrivacyPolicyPage() {
  return (
    <PolicyDocLayout
      title="Privacy Policy"
      footerNote="This Privacy Policy was last reviewed on [DATE] and is effective as of [DATE]."
    >
          <PolicySection id="introduction" title="1. Introduction">
            <p>
              This Privacy Policy describes how LCRE collects, uses, discloses, and protects your
              personal information when you use our platform, including our Hiring, Referrals,
              Crowdfunding, and Networking modules (collectively, the &quot;Services&quot;).
            </p>
            <p>
              This Policy is designed to comply with the California Consumer Privacy Act (CCPA), as
              amended by the California Privacy Rights Act (CPRA), and other applicable privacy laws.
            </p>
            <p>
              By using our Services, you acknowledge that you have read and understood this Privacy
              Policy.
            </p>
          </PolicySection>

          <PolicySection id="categories" title="2. Categories of Personal Information We Collect">
            <p>We collect the following categories of personal information:</p>

            <SubHeading>A. Identifiers</SubHeading>
            <BulletList
              items={[
                'Name, alias, username, email address, phone number',
                'Postal address, ZIP code, geographic location',
                'IP address, device identifiers, browser type',
              ]}
            />

            <SubHeading>B. Professional Information</SubHeading>
            <BulletList
              items={[
                'Real estate license number, broker affiliation, NMLS ID',
                'Service categories, specialties, credentials',
                'Business name, office address, service area',
                'Years of experience, references, certifications',
                'Insurance and bonding status (for PSPs)',
              ]}
            />

            <SubHeading>C. Commercial Information</SubHeading>
            <BulletList
              items={[
                'Transaction history, service orders, payment records',
                'Referral activity, commission shares, training records',
                'Crowdfunding donation history, interest list participation',
                'Platform engagement, favorites, playlists',
              ]}
            />

            <SubHeading>D. Internet and Network Activity</SubHeading>
            <BulletList
              items={[
                'Pages viewed, search queries, filters applied',
                'Interactions with content, posts, comments, messages',
                'Advertising interactions (impressions, clicks)',
              ]}
            />

            <SubHeading>E. Communications</SubHeading>
            <BulletList
              items={[
                'In-platform messages, forum posts, group activity',
                'Customer service inquiries, dispute records',
                'Feedback and reviews (public and private)',
              ]}
            />

            <SubHeading>F. Financial Information</SubHeading>
            <BulletList
              items={[
                'Payment method (processed by Stripe/Square; we do not store full card numbers)',
                'Billing address, transaction amounts',
                'For crowdfunding: investor accreditation status (if provided)',
              ]}
            />

            <SubHeading>G. Sensitive Personal Information</SubHeading>
            <BulletList
              items={[
                'Precise geolocation (if GPS tracking enabled)',
                'Account login credentials (username/password)',
                'Government-issued identification (for verification purposes, if required)',
                'Financial account information (for payouts, if applicable)',
              ]}
            />
            <p>
              We collect sensitive personal information only for purposes permitted by CCPA/CPRA,
              including performing services, ensuring security, and verifying credentials.
            </p>
          </PolicySection>

          <PolicySection id="sources" title="3. Sources of Personal Information">
            <p>We collect personal information from:</p>
            <BulletList
              items={[
                'Directly from you (registration, profile setup, forms, communications)',
                'Automatically (cookies, analytics, server logs)',
                'From third parties (verification APIs, payment processors, background check providers)',
                'From publicly available sources (state license databases, NMLS Consumer Access)',
              ]}
            />
          </PolicySection>

          <PolicySection id="purposes" title="4. Purposes for Collecting Personal Information">
            <p>We use personal information for the following business and commercial purposes:</p>
            <PolicyTable headers={['Purpose', 'Applicable Modules']} rows={PURPOSE_ROWS} />
          </PolicySection>

          <PolicySection id="admt" title="5. Automated Decision-Making Technology (ADMT) Notice">
            <p>We use Automated Decision-Making Technology (ADMT) in the following ways:</p>

            <SubHeading>
              A. Vector Search and RAG Matching (Hiring, Referrals, Networking)
            </SubHeading>
            <p>
              We use semantic search (pgvector + RAG) to match user queries with relevant PSPs, deals,
              posts, and profiles. The system analyzes the content of your search or post — not your
              personal characteristics — to return relevant results.
            </p>
            <p>What this means:</p>
            <BulletList
              items={[
                'Your search terms are embedded into vectors',
                'Relevant content is retrieved based on semantic similarity',
                'Ranking is based on relevance, not payment',
              ]}
            />

            <SubHeading>B. Reputation and Badge Systems (Hiring, Referrals)</SubHeading>
            <p>
              We use activity data (referrals completed, response times, reviews) to generate
              reputation badges (&quot;Reliable Referrer,&quot; &quot;Fast Responder&quot;). This
              affects how your profile appears to others.
            </p>

            <SubHeading>C. Feed Ranking (Networking)</SubHeading>
            <p>
              We use engagement signals (clicks, views, interactions) to rank content in your feed.
              This determines what you see first.
            </p>

            <SubHeading>D. ADMT Pre-Use Notice</SubHeading>
            <p>
              Before using ADMT for any significant decision (housing, lending, employment, or any
              decision with legal or similarly significant effects), we will provide a Pre-Use Notice
              describing:
            </p>
            <BulletList
              items={[
                'The logic involved',
                'The likely outcome',
                'Your right to opt out',
                'How to request human review',
              ]}
            />

            <SubHeading>E. ADMT Opt-Out</SubHeading>
            <p>
              You may opt out of ADMT-driven personalization by [contacting us / adjusting settings].
              Note that opting out may limit certain features (e.g., personalized feed, smart
              matching).
            </p>

            <SubHeading>F. ADMT Risk Assessment</SubHeading>
            <p>
              We conduct regular risk assessments for ADMT systems, as required by CCPA/CPRA
              regulations. These assessments evaluate potential harms and mitigation measures.
            </p>
          </PolicySection>

          <PolicySection id="disclosure" title="6. Disclosure of Personal Information">
            <p>We may disclose personal information to:</p>

            <SubHeading>A. Service Providers</SubHeading>
            <BulletList
              items={[
                'Payment processors (Stripe, Square)',
                'Verification APIs (NMLS, state license portals, Cobalt, RMIS)',
                'Cloud hosting and infrastructure providers',
                'Analytics providers',
                'Email and SMS communication providers',
              ]}
            />

            <SubHeading>B. Other Users</SubHeading>
            <BulletList
              items={[
                'PSP profiles: Your name, license number, service categories, service area, and reviews are visible to other users.',
                'Networking: Your posts, comments, and group activity are visible according to your privacy settings.',
                'Referrals: Referral activity (sent, received, completed) may be visible to referral partners.',
              ]}
            />

            <SubHeading>C. Advertising Partners</SubHeading>
            <BulletList
              items={[
                'We may share non-personal, aggregated data with advertisers for reporting purposes.',
                'We may share contextual signals (page topic, content category) with ad-serving partners.',
                'We do not sell personal information as defined by CCPA/CPRA.',
              ]}
            />

            <SubHeading>D. Legal and Regulatory</SubHeading>
            <BulletList
              items={[
                'Law enforcement, regulators, or courts when required by law',
                'To protect our rights, safety, or property',
                'In connection with a merger, acquisition, or sale of assets',
              ]}
            />
          </PolicySection>

          <PolicySection id="sale-sharing" title="7. Sale and Sharing of Personal Information">
            <p>
              We do not sell your personal information for monetary or other valuable consideration.
            </p>
            <p>
              We may &quot;share&quot; personal information for cross-context behavioral advertising
              as defined by CCPA/CPRA. If we do:
            </p>
            <BulletList
              items={[
                'We will provide a "Do Not Sell or Share My Personal Information" link in our header or footer.',
                'You may opt out of sharing by [link].',
                'We will honor opt-out preference signals (e.g., Global Privacy Control).',
              ]}
            />
            <p>
              Note: If we register as a data broker under California law (for lead-selling
              activities), we will provide a separate Data Broker Registration Statement and comply
              with the Delete Act&apos;s DROP portal requirements.
            </p>
          </PolicySection>

          <PolicySection id="california-rights" title="8. Your California Privacy Rights">
            <p>As a California resident, you have the following rights:</p>

            <SubHeading>A. Right to Know</SubHeading>
            <p>You may request disclosure of:</p>
            <BulletList
              items={[
                'Categories of personal information collected',
                'Categories of sources',
                'Business/commercial purposes',
                'Categories of third parties with whom we share',
                'Specific pieces of personal information collected about you',
              ]}
            />

            <SubHeading>B. Right to Delete</SubHeading>
            <p>
              You may request deletion of your personal information, subject to certain exceptions
              (legal obligations, security, completing transactions).
            </p>

            <SubHeading>C. Right to Correct</SubHeading>
            <p>You may request correction of inaccurate personal information.</p>

            <SubHeading>D. Right to Opt Out of Sale/Sharing</SubHeading>
            <p>
              You may opt out of the sale or sharing of your personal information for cross-context
              behavioral advertising.
            </p>

            <SubHeading>E. Right to Limit Use of Sensitive Personal Information</SubHeading>
            <p>
              You may limit our use of sensitive personal information to purposes necessary to
              perform the Services.
            </p>

            <SubHeading>F. Right to Non-Discrimination</SubHeading>
            <p>We will not discriminate against you for exercising your privacy rights.</p>

            <SubHeading>G. Right to Data Portability</SubHeading>
            <p>You may request a copy of your personal information in a portable format.</p>

            <SubHeading>H. Right to Opt Out of ADMT</SubHeading>
            <p>
              You may opt out of automated decision-making technology, as described in Section 5.
            </p>

            <SubHeading>How to Exercise Your Rights</SubHeading>
            <BulletList
              items={[
                'Online: [Link to privacy request form]',
                'Email: myteamleadgenerator@gmail.com',
                'Phone: [Phone Number]',
              ]}
            />
            <p>
              We will respond within 45 days of receiving a verifiable request. We may extend this by
              an additional 45 days if necessary, with notice.
            </p>
          </PolicySection>

          <PolicySection id="retention" title="9. Data Retention">
            <p>
              We retain personal information for as long as necessary to fulfill the purposes
              described in this Policy, unless a longer retention period is required or permitted by
              law.
            </p>
            <PolicyTable headers={['Data Category', 'Retention Period']} rows={RETENTION_ROWS} />
            <p>When retention periods expire, we delete or anonymize the data.</p>
          </PolicySection>

          <PolicySection id="security" title="10. Security">
            <p>
              We implement reasonable security procedures and practices to protect personal
              information from unauthorized access, destruction, use, modification, or disclosure.
              These include:
            </p>
            <BulletList
              items={[
                'Encryption of data in transit and at rest',
                'Access controls and authentication',
                'Regular security assessments',
                'Employee training on data protection',
                'Vendor security requirements',
              ]}
            />
            <p>
              No method of transmission or storage is 100% secure. We cannot guarantee absolute
              security.
            </p>
          </PolicySection>

          <PolicySection id="children" title="11. Children's Privacy">
            <p>
              Our Services are not intended for individuals under 18 years of age. We do not knowingly
              collect personal information from children under 18. If we learn we have collected such
              information, we will delete it promptly.
            </p>
          </PolicySection>

          <PolicySection id="international" title="12. International Users">
            <p>
              Our Services are intended for users in the United States. If you access from outside the
              U.S., you do so at your own risk and are responsible for compliance with local laws.
            </p>
          </PolicySection>

          <PolicySection id="changes" title="13. Changes to This Privacy Policy">
            <p>
              We may update this Privacy Policy from time to time. Material changes will be
              communicated via:
            </p>
            <BulletList
              items={[
                'Email notification (30 days advance notice)',
                'Platform banner or notification',
                'Updated "Last Updated" date',
              ]}
            />
            <p>Continued use of the Services after changes constitutes acceptance.</p>
          </PolicySection>

          <PolicySection id="contact" title="14. Contact Us">
            <p>For questions, requests, or complaints regarding this Privacy Policy:</p>
            <div className="space-y-1">
              <p className="font-medium text-ink">Life Coordination Real Estate Network</p>
              <p>PO BOX 591, FIREBAUGH CA 93622, NORTH AMERICA</p>
              <p>myteamleadgenerator@gmail.com</p>
              <p>[Phone Number]</p>
            </div>
            <p>
              For California residents with unresolved concerns, you may contact the California
              Privacy Protection Agency (CPPA) or the California Attorney General&apos;s Office.
            </p>
          </PolicySection>

          <PolicySection id="module-addenda" title="Module-Specific Privacy Addenda">
            <SubHeading>Hiring Module Addendum</SubHeading>
            <BulletList
              items={[
                'PSP license numbers are displayed publicly as required by DRE regulations.',
                'GPS tracking data is collected only during active orders, with user consent.',
                'Payment and escrow data is processed by third-party providers.',
              ]}
            />

            <SubHeading>Referrals Module Addendum</SubHeading>
            <BulletList
              items={[
                'Referral activity is logged for reputation purposes.',
                'Referral fee arrangements between licensed brokers are not processed by the platform.',
                'Client information shared during referrals is subject to confidentiality obligations.',
              ]}
            />

            <SubHeading>Crowdfunding Module Addendum</SubHeading>
            <BulletList
              items={[
                'Legal fund donations are processed by Stripe/Square.',
                'Interest list participation is voluntary and does not constitute investment.',
                'SEC-required records are retained for 7 years.',
              ]}
            />

            <SubHeading>Networking Module Addendum</SubHeading>
            <BulletList
              items={[
                'Community content is user-generated and subject to Community Guidelines.',
                'ADMT (feed ranking) is used to personalize content.',
                'Users may opt out of personalized feed ranking.',
              ]}
            />
          </PolicySection>
    </PolicyDocLayout>
  )
}
