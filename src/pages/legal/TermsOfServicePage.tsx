import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import {
  BulletList,
  PolicyDocLayout,
  PolicySection,
  SubHeading,
} from '@/pages/legal/components/PolicyPrimitives'

export function TermsOfServicePage() {
  return (
    <PolicyDocLayout
      title="Terms of Service"
      footerNote="These Terms of Service were last reviewed on [DATE] and are effective as of [DATE]."
    >
      <div className="rounded-lg border border-ink/15 bg-mist/50 px-4 py-3 text-sm text-ink/80 sm:text-base">
        <p className="font-medium text-ink">Disclaimer</p>
        <p className="mt-1">
          This is a structural framework, not final legal language. It must be reviewed by a
          California-licensed attorney familiar with CCPA/CPRA, DRE regulations, RESPA, and
          securities law before publication.
        </p>
      </div>

      <PolicySection id="general" title="SECTION 1: GENERAL PROVISIONS">
        <SubHeading>1.1 Acceptance of Terms</SubHeading>
        <p>
          By accessing or using the Life Coordination Real Estate Network (&quot;LCRE,&quot;
          &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) platform, including the Hiring,
          Referrals, Crowdfunding, and Networking modules (collectively, the &quot;Services&quot;),
          you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, do
          not use the Services.
        </p>

        <SubHeading>1.2 Eligibility</SubHeading>
        <p>
          You must be at least 18 years old to use the Services. By using the Services, you represent
          that you meet this requirement and that you have the legal capacity to enter into binding
          contracts.
        </p>

        <SubHeading>1.3 Platform Role</SubHeading>
        <p>
          LCRE is a technology platform that facilitates connections between users. LCRE is not:
        </p>
        <BulletList
          items={[
            'A real estate broker or agent',
            'A mortgage lender or broker',
            'A title company or escrow agent',
            'A contractor or service provider',
            'An investment adviser or broker-dealer',
          ]}
        />
        <p>
          LCRE does not provide professional services and does not guarantee the quality, legality, or
          suitability of any services obtained through the platform.
        </p>

        <SubHeading>1.4 Governing Law</SubHeading>
        <p>
          These Terms shall be governed by the laws of the State of California, without regard to
          conflict of law principles. Any dispute arising from these Terms shall be resolved in the
          courts of California.
        </p>

        <SubHeading>1.5 Dispute Resolution</SubHeading>
        <p>
          <span className="font-medium text-ink">Binding Arbitration:</span> Any dispute arising from
          or relating to these Terms or the Services shall be resolved through binding arbitration in
          California, in accordance with the rules of the American Arbitration Association.
        </p>
        <p>
          <span className="font-medium text-ink">Class Action Waiver:</span> You agree to resolve
          disputes on an individual basis and waive any right to participate in a class action, class
          arbitration, or representative proceeding.
        </p>
        <p>
          <span className="font-medium text-ink">Jury Trial Waiver:</span> You waive any right to a
          jury trial.
        </p>

        <SubHeading>1.6 Limitation of Liability</SubHeading>
        <p>
          To the maximum extent permitted by law, LCRE&apos;s total liability for any claim arising
          from or relating to these Terms or the Services shall not exceed $100 or the amount you paid
          to LCRE for the specific service giving rise to the claim, whichever is less.
        </p>
        <p>
          LCRE shall not be liable for any indirect, incidental, special, consequential, or punitive
          damages, including lost profits, lost data, or business interruption.
        </p>

        <SubHeading>1.7 Indemnification</SubHeading>
        <p>
          You agree to indemnify, defend, and hold harmless LCRE and its officers, directors,
          employees, agents, and affiliates from any claims, damages, losses, or expenses (including
          attorneys&apos; fees) arising from:
        </p>
        <BulletList
          items={[
            'Your use of the Services',
            'Your violation of these Terms',
            'Your violation of any law or third-party rights',
            'Any dispute between you and another user',
          ]}
        />

        <SubHeading>1.8 Modifications to Terms</SubHeading>
        <p>
          LCRE reserves the right to modify these Terms at any time. Material changes will be
          communicated via platform notification or email at least 30 days before taking effect.
          Continued use of the Services after changes constitutes acceptance.
        </p>
      </PolicySection>

      <PolicySection id="hiring" title="SECTION 2: HIRING MODULE TERMS">
        <SubHeading>2.1 Independent Contractor Relationship</SubHeading>
        <p>
          All Property Service Providers (&quot;PSPs&quot;) listed on LCRE are independent
          contractors. Nothing in these Terms creates an employment, agency, partnership, or joint
          venture relationship between LCRE and any PSP.
        </p>

        <SubHeading>2.2 Verification Disclaimer</SubHeading>
        <p>
          LCRE may conduct limited screening of PSPs (license confirmation, business registration
          checks, limited criminal database checks). This screening is not ongoing, does not guarantee
          accuracy, and is not updated in real-time.
        </p>
        <p>
          Users must independently verify all PSP qualifications. LCRE&apos;s verification badge
          indicates only that limited screening has been completed and does not constitute a guarantee
          or endorsement of PSP qualifications, skills, or service quality.
        </p>

        <SubHeading>2.3 No Guarantee of Service</SubHeading>
        <p>LCRE does not guarantee:</p>
        <BulletList
          items={[
            'Service quality, safety, or legality',
            'That services will meet user expectations',
            'Uninterrupted or error-free service',
          ]}
        />
        <p>All services are provided &quot;as is&quot; and &quot;as available.&quot;</p>

        <SubHeading>2.4 Non-Circumvention</SubHeading>
        <p>
          Users agree that for 12 months after meeting a PSP through LCRE, they will not directly
          hire, solicit, or engage that PSP to circumvent platform fees.
        </p>

        <SubHeading>2.5 Payment and Fees</SubHeading>
        <p>
          LCRE charges a platform service fee for transactions facilitated through the Hiring module.
          PSPs receive the net amount (gross work amount minus LCRE fees and applicable deductions).
          Payment terms are specified at the time of order.
        </p>

        <SubHeading>2.6 Fair Housing Compliance</SubHeading>
        <p>
          All PSPs and users must comply with all applicable fair housing laws, including the federal
          Fair Housing Act and California FEHA. LCRE reserves the right to remove, suspend, or
          terminate users who violate this clause.
        </p>

        <SubHeading>2.7 DRE Advertising Requirements</SubHeading>
        <p>PSP advertisements on the platform must include:</p>
        <BulletList
          items={[
            'Licensee name',
            'DRE license identification number',
            "Responsible broker's identity",
          ]}
        />
        <p>
          Mortgage loan originators must also disclose their NMLS unique identifier.
        </p>
      </PolicySection>

      <PolicySection id="referrals" title="SECTION 3: REFERRALS MODULE TERMS">
        <SubHeading>3.1 Nature of Relationship</SubHeading>
        <p>
          Referrers and recipients are both independent contractors, not employees of LCRE. The
          referral agreement is a direct agreement between the referrer and recipient, and LCRE is not
          a party to that agreement.
        </p>

        <SubHeading>3.2 Definition of Referral</SubHeading>
        <p>A &quot;qualified referral&quot; requires:</p>
        <BulletList
          items={[
            'The referrer introduces a client to the recipient',
            'The referral is documented through the platform',
            'The referral meets any additional criteria specified by the parties',
          ]}
        />
        <p>
          A referral is &quot;successful&quot; when the client completes a transaction or signs an
          agreement with the recipient, as defined by the parties.
        </p>

        <SubHeading>3.3 Referral Fee Restrictions</SubHeading>
        <p>
          <span className="font-medium text-ink">Critical Compliance Requirement:</span> Referral fee
          arrangements apply only between licensed real estate brokers/agents where permitted by law.
        </p>
        <p>
          No referral fees may be paid or received for mortgage-related business. RESPA prohibits
          referral fees for settlement services involving federally related mortgage loans.
        </p>
        <p>
          <span className="font-medium text-ink">California Requirement:</span> Under Business and
          Professions Code § 10137, a licensed broker may pay a commission to a broker of another
          state, but payment must go through brokers, not directly to salespersons. The
          &quot;finder&apos;s fee&quot; exception is extremely narrow—if the finder does anything
          beyond mere introduction, the payment may be construed as payment for licensed activity.
        </p>
        <p>
          Users are responsible for confirming their referral arrangements comply with RESPA,
          California law, and applicable state law.
        </p>

        <SubHeading>3.4 Referral Process and Tracking</SubHeading>
        <p>
          Referrals are submitted through tools within the LCRE platform. LCRE records referral
          activity for reputation display (such as &quot;Reliable Referrer&quot; badges) but does not
          process referral fee payments.
        </p>

        <SubHeading>3.5 Confidentiality</SubHeading>
        <p>
          Both parties agree to protect the non-public personal information of referred clients.
          Confidential information does not include: publicly available information, information
          lawfully obtained from third parties without confidentiality restrictions, or independently
          developed information.
        </p>

        <SubHeading>3.6 Non-Exclusivity</SubHeading>
        <p>
          Referral relationships are non-exclusive. Referrers are free to establish referral
          relationships with other entities.
        </p>

        <SubHeading>3.7 Platform Disclaimer</SubHeading>
        <p>
          LCRE does not participate in referral fee negotiation, payment, or enforcement. All referral
          fee arrangements are independent agreements between users, and LCRE assumes no liability.
        </p>

        <SubHeading>3.8 Referral Fee Amount Restrictions</SubHeading>
        <p>
          Referral fees must not be tied to &quot;business growth volume&quot; or &quot;percentage of
          transaction value.&quot; Regulation X explicitly states that the value of a referral (i.e.,
          the value of any additional business obtained thereby) is not to be taken into account in
          determining whether the payment exceeds the reasonable value of such goods, facilities or
          services.
        </p>

        <SubHeading>3.9 Training Exchange</SubHeading>
        <p>Training exchanges must be:</p>
        <BulletList
          items={[
            'Documented in writing',
            'Contract-signed by both parties',
            'Recorded if specified',
            'Scope-limited to the agreed training',
          ]}
        />
      </PolicySection>

      <PolicySection id="crowdfunding" title="SECTION 4: CROWDFUNDING MODULE TERMS">
        <SubHeading>4.1 Securities Compliance</SubHeading>
        <p>
          All investment activity is contingent on SEC approval. LCREC is not currently offering or
          selling securities. Legal fund donations are not investments and do not purchase securities,
          equity, or future returns.
        </p>

        <SubHeading>4.2 Legal Fund Terms</SubHeading>
        <BulletList
          items={[
            'Donations are non-refundable',
            'Donations are for legal preparation only',
            'Donations do not constitute securities purchases',
            'Payments processed through Stripe and Square',
            'LCREC does not guarantee SEC approval or future offerings',
          ]}
        />

        <SubHeading>4.3 Reg A+ Tier 2 Investment Restrictions</SubHeading>
        <p>
          Tier 2 allows raising from accredited and non-accredited investors, but non-accredited
          investors are subject to restrictions:
        </p>
        <BulletList
          items={[
            'Accredited investors: No investment limit',
            'Non-accredited natural persons: 10% of annual income or net worth, whichever is greater',
            'Non-accredited entities: 10% of annual revenue or net assets, whichever is greater',
          ]}
        />

        <SubHeading>4.4 Ongoing Reporting Obligations</SubHeading>
        <p>Tier 2 issuers must comply with:</p>
        <BulletList
          items={[
            'Annual Report (Form 1-K): Filed within 120 days after fiscal year end, including audited financial statements',
            'Semi-Annual Report (Form 1-SA): Filed within 90 days after semi-annual period end, including unaudited financial statements',
            'Current Event Report (Form 1-U): Filed within 4 business days after a material event',
          ]}
        />

        <SubHeading>4.5 Transfer Restrictions</SubHeading>
        <p>
          Reg A+ securities are subject to lock-up restrictions. Securities may not be transferred for
          1 year after issuance, except to the company, accredited investors, in an IPO, or to family
          members.
        </p>

        <SubHeading>4.6 Investment Risk Disclosure</SubHeading>
        <p>
          Investors may lose their entire investment. Reg A+ securities may be illiquid. Information
          disclosure may be limited. The company may issue additional securities causing dilution.
        </p>

        <SubHeading>4.7 Escrow</SubHeading>
        <p>
          Funds raised are held by a third-party escrow agent. If the minimum raise amount is not met,
          all funds will be returned and the offering will fail.
        </p>

        <SubHeading>4.8 Interest List</SubHeading>
        <p>
          &quot;Joining the interest list&quot; is not an investment commitment. Participants are not
          obligated to invest after SEC qualification. The company is not obligated to pursue SEC
          qualification or complete an offering.
        </p>
      </PolicySection>

      <PolicySection id="networking" title="SECTION 5: NETWORKING MODULE TERMS">
        <SubHeading>5.1 User-Generated Content</SubHeading>
        <p>
          LCRE is not the publisher or speaker of content. Users are solely responsible for the
          content they post.
        </p>

        <SubHeading>5.2 Content Restrictions</SubHeading>
        <p>Users may not post:</p>
        <BulletList
          items={[
            'Illegal content',
            'Harassment, threats, or hate speech',
            'False or misleading information',
            'Content infringing intellectual property',
            'Spam or unauthorized commercial promotion',
          ]}
        />

        <SubHeading>5.3 Content Moderation</SubHeading>
        <p>
          LCRE reserves the right to review, remove, or restrict any content, but is not obligated to
          monitor all content. Moderation is conducted through a combination of automated systems and
          human review.
        </p>

        <SubHeading>5.4 Content License</SubHeading>
        <p>
          By posting content, users grant LCRE a non-exclusive, royalty-free, worldwide license to
          use, display, and distribute that content for platform operations.
        </p>

        <SubHeading>5.5 Advertising Disclosure</SubHeading>
        <p>
          All advertisements must be clearly labeled as &quot;Advertisement&quot; or &quot;Sponsored
          Content.&quot; LCRE does not non-neutrally present information or make recommendations based
          on advertiser payment.
        </p>

        <SubHeading>5.6 Groups and Forums</SubHeading>
        <p>
          Group and forum creators and moderators are responsible for enforcing rules within their
          communities, but must comply with LCRE&apos;s Community Guidelines and applicable law.
        </p>

        <SubHeading>5.7 Reputation System</SubHeading>
        <p>
          Reputation badges are based on verifiable activity within the platform, not on payment.
          LCRE reserves the right to adjust or remove badges based on user behavior.
        </p>

        <SubHeading>5.8 Platform Rights</SubHeading>
        <p>
          LCRE reserves the right to suspend or terminate any user account at any time, without prior
          notice, at its sole discretion.
        </p>
      </PolicySection>

      <PolicySection id="cross-module" title="SECTION 6: CROSS-MODULE PROVISIONS">
        <SubHeading>6.1 Independent Contractor Status</SubHeading>
        <p>
          Users, PSPs, referrers, and recipients are all independent contractors, not employees,
          partners, or agents of LCRE. This relationship does not transform into employment due to
          long-term cooperation or regular payments.
        </p>

        <SubHeading>6.2 Privacy</SubHeading>
        <p>
          Your use of the Services is subject to our{' '}
          <Link to={PATHS.privacyPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          , which describes how we collect, use, and share personal information.
        </p>

        <SubHeading>6.3 Acceptable Use</SubHeading>
        <p>
          Your use of the Services is subject to our{' '}
          <Link to={PATHS.acceptableUsePolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Acceptable Use Policy
          </Link>
          , which describes prohibited activities and enforcement actions.
        </p>

        <SubHeading>6.4 Intellectual Property</SubHeading>
        <p>
          All LCRE content, trademarks, and technology are owned by LCRE or its licensors. You may not
          use LCRE&apos;s name, logo, or branding without permission.
        </p>

        <SubHeading>6.5 Termination</SubHeading>
        <p>
          LCRE may terminate or suspend your account at any time for violations of these Terms, the
          Acceptable Use Policy, or applicable law. Upon termination, your right to use the Services
          ceases immediately.
        </p>

        <SubHeading>6.6 No Waiver</SubHeading>
        <p>
          LCRE&apos;s failure to enforce any provision of these Terms does not waive our right to
          enforce it later.
        </p>

        <SubHeading>6.7 Severability</SubHeading>
        <p>
          If any provision of these Terms is found unenforceable, the remaining provisions remain in
          full force and effect.
        </p>

        <SubHeading>6.8 Entire Agreement</SubHeading>
        <p>
          These Terms, together with the Privacy Policy, Acceptable Use Policy, and other referenced
          policies, constitute the entire agreement between you and LCRE.
        </p>
      </PolicySection>

      <PolicySection id="california" title="SECTION 7: CALIFORNIA-SPECIFIC PROVISIONS">
        <SubHeading>7.1 CCPA/CPRA Rights</SubHeading>
        <p>California residents have rights under the CCPA/CPRA, including:</p>
        <BulletList
          items={[
            'Right to know what personal information is collected',
            'Right to delete personal information',
            'Right to correct inaccurate information',
            'Right to opt out of sale or sharing',
            'Right to limit use of sensitive personal information',
          ]}
        />
        <p>
          For more information, see our{' '}
          <Link to={PATHS.privacyPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <SubHeading>7.2 DRE Compliance</SubHeading>
        <p>
          Licensed real estate professionals using the platform must comply with all California DRE
          regulations, including advertising and disclosure requirements.
        </p>

        <SubHeading>7.3 Fair Housing</SubHeading>
        <p>
          All users must comply with the California Fair Employment and Housing Act (FEHA) and the
          federal Fair Housing Act. See our{' '}
          <Link to={PATHS.fairHousingStatement} className="font-medium text-brand underline-offset-2 hover:underline">
            Fair Housing Statement
          </Link>
          .
        </p>

        <SubHeading>7.4 Data Broker Registration</SubHeading>
        <p>
          If LCRE determines it is a data broker under California law, it will register with the CPPA
          and comply with the Delete Act&apos;s DROP portal requirements. See our{' '}
          <Link to={PATHS.dataBrokerStatement} className="font-medium text-brand underline-offset-2 hover:underline">
            Data Broker Registration Statement
          </Link>
          .
        </p>
      </PolicySection>

      <PolicySection id="contact" title="SECTION 8: CONTACT">
        <div className="space-y-1">
          <p className="font-medium text-ink">Life Coordination Real Estate Network</p>
          <p>PO BOX 591, FIREBAUGH CA 93622, NORTH AMERICA</p>
          <p>myteamleadgenerator@gmail.com</p>
          <p>[Phone Number]</p>
        </div>
      </PolicySection>
    </PolicyDocLayout>
  )
}
