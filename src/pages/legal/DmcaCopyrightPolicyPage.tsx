import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import {
  BulletList,
  PolicyDocLayout,
  PolicySection,
  PolicyTable,
  SubHeading,
} from '@/pages/legal/components/PolicyPrimitives'

const NOTICE_ELEMENTS: string[][] = [
  ['1', 'Signature', 'Physical or electronic signature of the copyright owner or authorized representative'],
  [
    '2',
    'Identification of the copyrighted work',
    'Description of the work you claim has been infringed (title, registration number if available, or link to original)',
  ],
  [
    '3',
    'Identification of infringing material',
    'Exact URL(s) or precise location(s) of the allegedly infringing content — vague descriptions are insufficient',
  ],
  ['4', 'Contact information', 'Your full name, mailing address, telephone number, and email address'],
  [
    '5',
    'Good faith belief statement',
    'Statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law',
  ],
  [
    '6',
    'Accuracy and authorization statement',
    'Statement, under penalty of perjury, that the information is accurate and you are authorized to act on behalf of the copyright owner',
  ],
]

const COUNTER_ELEMENTS: string[][] = [
  ['1', 'Signature', 'Your physical or electronic signature'],
  [
    '2',
    'Identification of removed material',
    'Description of the content that was removed, and the location (URL) where it appeared before removal',
  ],
  [
    '3',
    'Good faith belief statement',
    'Statement under penalty of perjury that you have a good faith belief the material was removed as a result of mistake or misidentification',
  ],
  ['4', 'Contact information', 'Your name, address, telephone number, and email address'],
  [
    '5',
    'Consent to jurisdiction',
    'Statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located (or, if outside the U.S., any judicial district where LCRE may be found), and that you will accept service of process from the party who filed the original notice',
  ],
]

const STRIKE_ROWS: string[][] = [
  ['First', 'Content removed + warning notification'],
  ['Second', 'Content removed + 7-day suspension'],
  ['Third', 'Content removed + 30-day suspension'],
  ['Fourth', 'Permanent account termination'],
]

const NON_DMCA_ROWS: string[][] = [
  ['Trademark infringement', 'Unauthorized use of brand names, logos, or trade dress'],
  ['Right of publicity', "Unauthorized commercial use of a person's name, image, or likeness"],
  ['Defamation', 'False statements that harm reputation'],
  ['Privacy violations', 'Publication of private information without consent'],
  ['Contract disputes', 'Breach of platform Terms of Service'],
]

export function DmcaCopyrightPolicyPage() {
  return (
    <PolicyDocLayout
      title="DMCA / Copyright Policy"
      contactLines={[
        'Life Coordination Real Estate Network ("LCRE," "we," "us," or "our")',
        'PO BOX 591, FIREBAUGH CA 93622, NORTH AMERICA',
        'myteamleadgenerator@gmail.com',
        '[DMCA Agent Phone]',
      ]}
      footerNote="This DMCA / Copyright Policy was last reviewed on [DATE] and is effective as of [DATE]."
    >
      <PolicySection id="introduction" title="1. Introduction">
        <p>
          LCRE respects the intellectual property rights of others and expects our users to do the
          same. This DMCA / Copyright Policy explains how LCRE handles claims of copyright
          infringement in accordance with the Digital Millennium Copyright Act (DMCA), 17 U.S.C. §
          512.
        </p>
        <p>This Policy applies to all user-generated content on the platform, including but not limited to:</p>
        <BulletList
          items={[
            'Networking module — posts, comments, articles, forum threads, group content',
            'Referrals module — profile descriptions, training materials, uploaded documents',
            'Hiring module — PSP profile content, portfolio images, service descriptions',
            'Crowdfunding module — project descriptions, images, updates',
          ]}
        />
        <p>
          This Policy should be read together with our{' '}
          <Link to={PATHS.termsOfService} className="font-medium text-brand underline-offset-2 hover:underline">
            Terms of Service
          </Link>
          ,{' '}
          <Link to={PATHS.privacyPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          , and{' '}
          <Link to={PATHS.communityGuidelines} className="font-medium text-brand underline-offset-2 hover:underline">
            Community Guidelines
          </Link>
          .
        </p>
      </PolicySection>

      <PolicySection id="agent" title="2. Designated DMCA Agent">
        <p>
          To qualify for safe harbor protection under the DMCA, LCRE has designated an agent to
          receive notifications of claimed copyright infringement. The agent&apos;s contact
          information is registered with the U.S. Copyright Office and published below.
        </p>
        <SubHeading>Designated DMCA Agent:</SubHeading>
        <div className="space-y-1">
          <p>[Agent Name / Title]</p>
          <p>[Agent Organization]</p>
          <p>[Physical Street Address — P.O. Box not permitted without Copyright Office waiver]</p>
          <p>[City, State, ZIP]</p>
          <p>myteamleadgenerator@gmail.com</p>
          <p>[Phone Number]</p>
        </div>
        <p>
          Important: The DMCA agent registration must be renewed with the U.S. Copyright Office every
          three years. LCRE will maintain current registration and update the Copyright Office
          promptly if agent information changes.
        </p>
      </PolicySection>

      <PolicySection id="takedown" title="3. Filing a DMCA Takedown Notice">
        <p>
          If you believe that content on LCRE infringes your copyright, you may submit a written
          notification to our Designated DMCA Agent. To be effective, your notice must be a written
          communication and must include all six of the following elements:
        </p>
        <PolicyTable headers={['#', 'Requirement', 'Details']} rows={NOTICE_ELEMENTS} />

        <SubHeading>Where to Send</SubHeading>
        <p>Send your DMCA takedown notice to:</p>
        <BulletList
          items={[
            'Email: myteamleadgenerator@gmail.com',
            'Mail: PO BOX 591, FIREBAUGH CA 93622, NORTH AMERICA',
          ]}
        />

        <SubHeading>What Happens Next</SubHeading>
        <BulletList
          items={[
            'Review: LCRE will review your notice for completeness and validity.',
            'Acknowledgment: If valid, LCRE will act expeditiously to remove or disable access to the identified content.',
            'Notification: LCRE will notify the user who posted the content that it has been removed, and provide them a copy of your notice.',
            'Counter-Notice: The user may submit a counter-notice (see Section 4).',
          ]}
        />
        <p>
          Note: Incomplete notices may be returned for correction. Knowingly filing a false DMCA
          notice can result in liability for damages, including costs and attorneys&apos; fees, under
          17 U.S.C. § 512(f).
        </p>
      </PolicySection>

      <PolicySection id="counter-notice" title="4. Filing a DMCA Counter-Notice">
        <p>
          If your content was removed due to a DMCA takedown notice and you believe the removal was a
          mistake or misidentification, you may submit a counter-notice to our Designated DMCA Agent.
        </p>
        <p>Your counter-notice must include all of the following:</p>
        <PolicyTable headers={['#', 'Requirement', 'Details']} rows={COUNTER_ELEMENTS} />

        <SubHeading>What Happens Next</SubHeading>
        <BulletList
          items={[
            'Forwarding: LCRE will forward your counter-notice to the original complaining party.',
            'Restoration: If the original complaining party does not file a court action seeking a restraining order against you within 10 business days, LCRE may restore the removed content.',
            'No Guarantee: Restoration is not automatic. LCRE reserves the right to keep content removed if the matter is in litigation or if other legal concerns exist.',
          ]}
        />
        <p>
          Warning: Knowingly making a material misrepresentation in a counter-notice may result in
          liability for damages, including costs and attorneys&apos; fees, under 17 U.S.C. § 512(f).
        </p>
      </PolicySection>

      <PolicySection id="repeat-infringer" title="5. Repeat Infringer Policy">
        <p>
          The DMCA requires service providers to &quot;adopt and reasonably implement&quot; a policy
          for terminating users who are repeat infringers. LCRE takes this obligation seriously.
        </p>

        <SubHeading>What Constitutes a Repeat Infringer</SubHeading>
        <p>
          A &quot;repeat infringer&quot; is a user account for which LCRE has received multiple valid
          DMCA takedown notices related to content posted by that user.
        </p>
        <p>
          LCRE tracks DMCA notices at the user account level. Each valid notice that identifies
          content posted by a specific user is recorded against that account.
        </p>

        <SubHeading>Enforcement Actions</SubHeading>
        <PolicyTable headers={['Strike Count', 'Action']} rows={STRIKE_ROWS} />
        <p>
          Note: LCRE reserves the right to escalate enforcement for egregious or willful infringement,
          including immediate termination for severe violations.
        </p>

        <SubHeading>What Does Not Count as a Strike</SubHeading>
        <BulletList
          items={[
            'Notices that are invalid under the six-element test',
            'Notices that identify content posted by a different user',
            'Content removed for non-copyright reasons (e.g., Community Guidelines violations)',
            'Content restored after a successful counter-notice',
          ]}
        />

        <SubHeading>Documentation</SubHeading>
        <p>
          LCRE maintains records of all DMCA notices received, actions taken, and users terminated
          under this policy. These records are retained for at least three years and may be used to
          demonstrate reasonable implementation of this policy in legal proceedings.
        </p>
      </PolicySection>

      <PolicySection id="not-covered" title="6. What the DMCA Does Not Cover">
        <p>
          The DMCA safe harbor applies only to copyright infringement. It does not protect against:
        </p>
        <PolicyTable headers={['Claim Type', 'Description']} rows={NON_DMCA_ROWS} />
        <p>
          LCRE&apos;s{' '}
          <Link to={PATHS.communityGuidelines} className="font-medium text-brand underline-offset-2 hover:underline">
            Community Guidelines
          </Link>{' '}
          and{' '}
          <Link to={PATHS.termsOfService} className="font-medium text-brand underline-offset-2 hover:underline">
            Terms of Service
          </Link>{' '}
          govern these other types of content issues. LCRE may remove content or suspend users for
          violations of those policies, even if no DMCA notice is involved.
        </p>
      </PolicySection>

      <PolicySection id="section-230" title="7. Section 230 and Platform Moderation">
        <p>
          LCRE is an interactive computer service under Section 230 of the Communications Decency Act
          (CDA 230). Section 230 protects platforms from liability for content posted by users. It
          does not cover intellectual property claims, which are addressed by the DMCA.
        </p>
        <p>What this means:</p>
        <BulletList
          items={[
            'LCRE can moderate content without becoming the "publisher" of user content',
            'LCRE can remove content for any reason (including copyright concerns) without losing Section 230 protection',
            'Section 230 and DMCA safe harbor work together: Section 230 covers defamation and similar claims; DMCA covers copyright',
          ]}
        />
        <p>
          LCRE will not remove content solely because a user demands it, unless the demand complies
          with this DMCA Policy or another applicable policy.
        </p>
      </PolicySection>

      <PolicySection id="user-responsibilities" title="8. User Responsibilities">
        <p>By using LCRE, you agree to:</p>
        <BulletList
          items={[
            'Only upload content you have the right to share — Do not upload copyrighted material without authorization.',
            'Respect intellectual property — Do not reproduce, distribute, or display copyrighted works without permission.',
            'Respond to notices — If your content is removed, review the notice and either comply or file a counter-notice if you believe removal was in error.',
            'Do not abuse the DMCA process — Knowingly filing false notices or counter-notices may result in liability and account termination.',
          ]}
        />
      </PolicySection>

      <PolicySection id="international" title="9. International Copyright Complaints">
        <p>
          The DMCA applies to U.S. copyright law. If you believe content on LCRE infringes your
          copyright under the laws of another country, you may still submit a notice. LCRE will review
          such notices and take appropriate action, but the formal DMCA safe harbor and counter-notice
          procedures described above apply specifically to U.S. copyright claims.
        </p>
      </PolicySection>

      <PolicySection id="privacy" title="10. Privacy Considerations">
        <p>
          DMCA notices and counter-notices may contain personal information (names, addresses, contact
          details). LCRE will handle this information in accordance with our{' '}
          <Link to={PATHS.privacyPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy Policy
          </Link>{' '}
          and applicable California privacy laws.
        </p>
        <BulletList
          items={[
            'DMCA notices and counter-notices are not published publicly on the platform.',
            'Personal information in DMCA notices may be shared with the affected user (as required by the DMCA).',
            'LCRE may redact personal information when forwarding notices, to the extent permitted by law.',
          ]}
        />
      </PolicySection>

      <PolicySection id="changes" title="11. Changes to This Policy">
        <p>
          LCRE may update this DMCA / Copyright Policy from time to time. Material changes will be
          communicated via:
        </p>
        <BulletList
          items={[
            'Platform notification',
            'Email (if opted in)',
            'Updated "Last Updated" date',
          ]}
        />
        <p>Continued use of the Services after changes constitutes acceptance.</p>
      </PolicySection>

      <PolicySection id="contact" title="12. Contact">
        <p>For questions about this DMCA / Copyright Policy:</p>
        <div className="space-y-1">
          <p className="font-medium text-ink">Life Coordination Real Estate Network</p>
          <p>PO BOX 591, FIREBAUGH CA 93622, NORTH AMERICA</p>
          <p>myteamleadgenerator@gmail.com</p>
          <p>[DMCA Agent Phone]</p>
        </div>
        <p>U.S. Copyright Office DMCA Agent Directory: [Link to LCRE&apos;s registration]</p>
      </PolicySection>

      <PolicySection id="module-addenda" title="Module-Specific Addenda">
        <SubHeading>Networking Module</SubHeading>
        <BulletList
          items={[
            'Posts, comments, articles, and forum content are subject to this Policy.',
            'Images uploaded to posts must be owned by the user or used with permission.',
            'Group moderators may report copyright violations to LCRE.',
          ]}
        />
        <SubHeading>Referrals Module</SubHeading>
        <BulletList
          items={[
            'Training materials, contracts, and uploaded documents are subject to this Policy.',
            'Referral fee agreements shared on-platform must not infringe third-party copyright.',
          ]}
        />
        <SubHeading>Hiring Module</SubHeading>
        <BulletList
          items={[
            'PSP portfolio images and service descriptions are subject to this Policy.',
            'Licensed real estate photographs (MLS images, professional photography) must be used with permission.',
          ]}
        />
        <SubHeading>Crowdfunding Module</SubHeading>
        <BulletList
          items={[
            'Project images, renderings, and promotional materials are subject to this Policy.',
            'SEC-filed documents are public record and not subject to copyright claims by LCRE.',
          ]}
        />
      </PolicySection>
    </PolicyDocLayout>
  )
}
