import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import {
  BulletList,
  PolicyDocLayout,
  PolicySection,
  PolicyTable,
  SubHeading,
} from '@/pages/legal/components/PolicyPrimitives'

const EXAMPLE_ROWS: string[][] = [
  ['Refusing Service', '"I don\'t rent to families with children."'],
  ['Steering', '"You probably wouldn\'t be comfortable in that neighborhood."'],
  ['Discriminatory Advertising', '"English-speakers only."'],
  ['Source of Income', '"No Section 8."'],
  [
    'Criminal History',
    'Automatic rejection based on any criminal record, without individualized assessment.',
  ],
  ['Harassment', 'Unwanted sexual advances or creating a hostile environment.'],
  ['Retaliation', 'Evicting a tenant for filing a fair housing complaint.'],
]

const AGENCY_ROWS: string[][] = [
  ['California Civil Rights Department (CRD)', 'calcivilrights.ca.gov'],
  ['U.S. Department of Housing and Urban Development (HUD)', 'hud.gov/fairhousing'],
  ['Local Fair Housing Council', 'Find your local office at [link]'],
]

export function FairHousingStatementPage() {
  return (
    <PolicyDocLayout
      title="Fair Housing Statement"
      footerNote="This Fair Housing Statement was last reviewed on [DATE] and is effective as of [DATE]."
    >
      <PolicySection id="commitment" title="1. Our Commitment to Equal Housing Opportunity">
        <p>
          LCRE is committed to equal housing opportunity for all. We believe that every person
          deserves fair and equal access to housing, real estate services, and related opportunities,
          regardless of race, color, religion, sex, sexual orientation, gender identity, national
          origin, familial status, disability, source of income, immigration status, marital status,
          military or veteran status, primary language, or any other protected characteristic.
        </p>
        <p>
          This commitment is not just a legal obligation—it is a core value of our faith-aligned
          platform. We expect all users of LCRE—including property service providers (PSPs), real
          estate agents, brokers, lenders, property managers, contractors, and consumers—to share this
          commitment and to comply with all applicable fair housing laws.
        </p>
      </PolicySection>

      <PolicySection id="laws" title="2. Applicable Fair Housing Laws">
        <p>
          LCRE operates in California and is subject to both federal and state fair housing laws.
          These laws apply to all aspects of our platform, including:
        </p>
        <BulletList
          items={[
            'The Hiring module (PSP listings, search results, and transactions)',
            'The Referrals module (referral activity and training exchanges)',
            'The Crowdfunding module (investment opportunities and community voting)',
            'The Networking module (feed, groups, forums, and articles)',
          ]}
        />

        <SubHeading>A. Federal Fair Housing Act</SubHeading>
        <p>
          The federal Fair Housing Act prohibits discrimination in the sale, rental, and financing of
          housing based on:
        </p>
        <BulletList
          items={[
            'Race',
            'Color',
            'National origin',
            'Religion',
            'Sex',
            'Familial status (presence of children under 18, pregnancy, or securing custody)',
            'Disability (physical or mental)',
          ]}
        />
        <p>
          The Fair Housing Act applies to most housing, including apartments, houses, and
          condominiums. It covers landlords, property managers, real estate agents, brokers, lenders,
          and homeowners insurance companies.
        </p>

        <SubHeading>B. California Fair Employment and Housing Act (FEHA)</SubHeading>
        <p>
          California&apos;s FEHA provides broader protections than federal law. FEHA prohibits
          discrimination based on:
        </p>
        <BulletList
          items={[
            'Race (including hair texture and protective hairstyles, effective 1/1/2020)',
            'Color',
            'Religion',
            'Sex',
            'Sexual orientation',
            'Gender identity and expression',
            'National origin',
            'Ancestry',
            'Familial status (children under 18, pregnant, or becoming a legal custodian)',
            'Disability (mental and/or physical)',
            'Marital status',
            'Source of income (including Section 8 vouchers)',
            'Military or veteran status',
            'Immigration status (under Unruh Civil Rights Act)',
            'Primary language (under Unruh Civil Rights Act)',
          ]}
        />
        <p>
          Key differences from federal law: FEHA includes protections for source of income, marital
          status, sexual orientation, gender identity, and military/veteran status. California
          regulations are generally more protective than federal law.
        </p>
      </PolicySection>

      <PolicySection id="prohibited" title="3. Prohibited Conduct on LCRE">
        <p>
          All users of LCRE are prohibited from engaging in the following conduct, whether on the
          platform or in connection with transactions facilitated through the platform:
        </p>

        <SubHeading>A. Refusing to Provide Services</SubHeading>
        <p>
          No user may refuse to negotiate, sell, rent, or provide services based on any protected
          characteristic.
        </p>

        <SubHeading>B. Steering and Channeling</SubHeading>
        <p>
          No user may &quot;steer&quot; or &quot;channel&quot; a prospective buyer or tenant to or
          away from a particular area based on protected status or because of the racial, religious,
          or ethnic composition of the neighborhood.
        </p>

        <SubHeading>C. Discriminatory Advertising</SubHeading>
        <p>
          No user may make any statement or advertisement that indicates any preference, limitation,
          or discrimination based on protected characteristics. Examples include:
        </p>
        <BulletList items={['"No children"', '"English-speakers only"', '"No Section 8"']} />

        <SubHeading>D. Discriminatory Screening</SubHeading>
        <p>No user may:</p>
        <BulletList
          items={[
            'Use different qualification criteria or procedures based on protected characteristics',
            'Apply different income standards based on protected characteristics',
            'Impose different terms, conditions, or privileges',
          ]}
        />

        <SubHeading>E. Criminal History Discrimination</SubHeading>
        <p>
          California law prohibits blanket bans on renting to people with criminal histories. Any
          consideration of a conviction must be:
        </p>
        <BulletList
          items={[
            'Individualized',
            'Based on the nature and severity of the offense',
            'Based on the amount of time that has passed',
            'Directly related to tenancy',
          ]}
        />
        <p>
          Important: Automatically denying an applicant based on criminal history, without
          individualized assessment, may violate FEHA.
        </p>

        <SubHeading>F. Source of Income Discrimination</SubHeading>
        <p>
          California law prohibits discrimination based on source of income, including Section 8
          vouchers. Housing providers cannot:
        </p>
        <BulletList
          items={[
            'Refuse to accept Section 8 vouchers',
            'Use different income standards for voucher holders',
            'Advertise "No Section 8"',
          ]}
        />

        <SubHeading>G. Harassment</SubHeading>
        <p>
          No user may engage in quid pro quo harassment (conditioning housing or services on
          submission to unwanted requests) or hostile environment harassment (conduct that creates an
          intimidating, hostile, or offensive environment).
        </p>

        <SubHeading>H. Retaliation</SubHeading>
        <p>
          No user may retaliate against any person for asserting their fair housing rights, filing a
          complaint, or assisting in an investigation.
        </p>
      </PolicySection>

      <PolicySection id="by-module" title="4. Fair Housing Obligations by Module">
        <SubHeading>A. Hiring Module (PSP Marketplace)</SubHeading>
        <p>All PSPs listed on LCRE must:</p>
        <BulletList
          items={[
            'Apply the same objective selection criteria to all clients and prospects',
            "Provide complete and objective information based on the client's selection criteria",
            'Provide the same professional courtesy to all clients and prospects',
            'Not inquire about protected characteristics (such as asking if applicants are married or have children)',
          ]}
        />
        <p>
          Verification badges: LCRE&apos;s verification process does not replace a PSP&apos;s
          independent obligation to comply with fair housing laws.
        </p>

        <SubHeading>B. Referrals Module</SubHeading>
        <p>Referral exchanges must not be used to:</p>
        <BulletList
          items={[
            'Steer clients to or away from providers based on protected characteristics',
            'Deny opportunities based on protected characteristics',
            'Create discriminatory outcomes',
          ]}
        />
        <p>
          Referral relationships should be based on professional competence and service quality, not
          on protected characteristics.
        </p>

        <SubHeading>C. Crowdfunding Module</SubHeading>
        <p>Crowdfunding projects must:</p>
        <BulletList
          items={[
            'Be available to all qualified investors regardless of protected characteristics',
            'Not restrict participation based on protected characteristics',
            'Not discriminate in project selection, voting, or benefit distribution',
          ]}
        />

        <SubHeading>D. Networking Module</SubHeading>
        <p>
          All community content must comply with fair housing laws. Prohibited content includes:
        </p>
        <BulletList
          items={[
            'Discriminatory statements about neighborhoods, tenants, buyers, or sellers',
            'Steering language based on protected class',
            'Advertisements that indicate preferences or limitations',
          ]}
        />
        <p>
          See our{' '}
          <Link to={PATHS.communityGuidelines} className="font-medium text-brand underline-offset-2 hover:underline">
            Community Guidelines
          </Link>{' '}
          for more information.
        </p>
      </PolicySection>

      <PolicySection id="examples" title="5. Examples of Prohibited Conduct">
        <p>
          The following are examples of conduct that may violate fair housing laws and LCRE&apos;s
          policies:
        </p>
        <PolicyTable headers={['Category', 'Example']} rows={EXAMPLE_ROWS} />
      </PolicySection>

      <PolicySection id="reporting" title="6. Reporting Fair Housing Violations">
        <SubHeading>On the Platform</SubHeading>
        <p>If you witness or experience fair housing discrimination on LCRE:</p>
        <BulletList
          items={[
            'Report the content or user using the platform\'s report feature',
            'Select "Fair Housing Violation" as the reason',
            'Provide details about the conduct',
          ]}
        />
        <p>
          LCRE will review reports and take appropriate action, up to and including removal from the
          platform, suspension, or termination.
        </p>

        <SubHeading>External Reporting</SubHeading>
        <p>You may also report fair housing violations to:</p>
        <PolicyTable headers={['Agency', 'Contact']} rows={AGENCY_ROWS} />
      </PolicySection>

      <PolicySection id="enforcement" title="7. Enforcement">
        <p>LCRE takes fair housing violations seriously. Enforcement actions may include:</p>
        <BulletList
          items={[
            'Content removal',
            'Warning',
            'Temporary suspension (7–30 days)',
            'Permanent ban',
            'Reporting to appropriate authorities',
          ]}
        />
        <p>Repeated violations will result in escalating enforcement.</p>
      </PolicySection>

      <PolicySection id="positive" title="8. Positive Practices">
        <p>LCRE encourages all users to adopt the following positive practices:</p>
        <BulletList
          items={[
            'Apply consistent, objective criteria to all clients and prospects',
            'Provide complete and objective information to all clients',
            'Use objective selection processes that do not seek protected characteristic information',
            'Educate yourself on fair housing laws and best practices',
            'Report violations when you see them',
          ]}
        />
      </PolicySection>

      <PolicySection id="resources" title="9. Fair Housing Resources">
        <BulletList
          items={[
            'California Civil Rights Department: calcivilrights.ca.gov/housing/',
            'HUD Fair Housing: hud.gov/program_offices/fair_housing_equal_opp',
            'DRE Complaint Process: dre.ca.gov/Consumers/FileComplaint.html',
            'Local Fair Housing Councils: Available at [link to local resources]',
          ]}
        />
      </PolicySection>

      <PolicySection id="changes" title="10. Changes to This Statement">
        <p>
          We may update this Fair Housing Statement from time to time. Material changes will be
          communicated via:
        </p>
        <BulletList
          items={[
            'Platform notification',
            'Email (if opted in)',
            'Updated "Last Updated" date',
          ]}
        />
      </PolicySection>

      <PolicySection id="contact" title="11. Contact">
        <p>For questions about this Fair Housing Statement:</p>
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
