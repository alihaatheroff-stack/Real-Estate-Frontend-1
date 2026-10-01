import { Link } from 'react-router-dom'
import { PATHS } from '@/app/router/paths'
import {
  BulletList,
  PolicyDocLayout,
  PolicySection,
  PolicyTable,
  SubHeading,
} from '@/pages/legal/components/PolicyPrimitives'

const COOKIE_ROWS: string[][] = [
  ['Essential', 'Authentication, security, load balancing', 'Yes — required for the Services'],
  ['Preferences', 'Language, saved filters, UI settings', 'Yes — can be cleared in browser'],
  ['Analytics', 'Usage metrics, performance monitoring', 'You may opt out where provided'],
  ['Advertising', 'Contextual ad measurement (non-personalized where possible)', 'Opt out via settings / GPC'],
]

export function CookiePolicyPage() {
  return (
    <PolicyDocLayout
      title="Cookie Policy"
      footerNote="This Cookie Policy was last reviewed on [DATE] and is effective as of [DATE]."
    >
      <PolicySection id="introduction" title="1. Introduction">
        <p>
          This Cookie Policy explains how Life Coordination Real Estate Network (&quot;LCRE,&quot;
          &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) uses cookies and similar technologies on
          our platform, including the Hiring, Referrals, Crowdfunding, and Networking modules
          (collectively, the &quot;Services&quot;).
        </p>
        <p>
          This Policy should be read together with our{' '}
          <Link to={PATHS.privacyPolicy} className="font-medium text-brand underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </PolicySection>

      <PolicySection id="what-are-cookies" title="2. What Are Cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website. Similar
          technologies include pixels, local storage, and session storage. We use these technologies
          to operate the Services, remember preferences, measure performance, and support security.
        </p>
      </PolicySection>

      <PolicySection id="types" title="3. Types of Cookies We Use">
        <PolicyTable
          headers={['Category', 'Purpose', 'Control']}
          rows={COOKIE_ROWS}
        />

        <SubHeading>A. Essential Cookies</SubHeading>
        <p>
          Required for core functionality such as signing in, maintaining session state, protecting
          against fraud, and routing traffic. The Services may not function properly without these
          cookies.
        </p>

        <SubHeading>B. Preference Cookies</SubHeading>
        <p>
          Remember choices you make (for example, filter preferences or display settings) so we can
          provide a more consistent experience across visits.
        </p>

        <SubHeading>C. Analytics Cookies</SubHeading>
        <p>
          Help us understand how users navigate the Services, which features are used, and where
          errors occur. Analytics data is used to improve performance and product design.
        </p>

        <SubHeading>D. Advertising Cookies</SubHeading>
        <p>
          May be used to measure ad impressions and clicks and to support contextual advertising. We
          do not sell personal information as defined by CCPA/CPRA. Where we &quot;share&quot;
          information for cross-context behavioral advertising, you may opt out as described in our
          Privacy Policy.
        </p>
      </PolicySection>

      <PolicySection id="third-parties" title="4. Third-Party Technologies">
        <p>Some cookies may be set by third parties that help us operate the Services, including:</p>
        <BulletList
          items={[
            'Payment processors (Stripe, Square)',
            'Analytics providers',
            'Cloud hosting and infrastructure providers',
            'Email and SMS communication providers',
            'Advertising / ad-serving partners (contextual signals)',
          ]}
        />
        <p>
          These providers process information under their own policies and our contracts with them.
        </p>
      </PolicySection>

      <PolicySection id="choices" title="5. Your Choices">
        <BulletList
          items={[
            'Browser controls: Most browsers let you block or delete cookies. Blocking essential cookies may break sign-in and other core features.',
            'Global Privacy Control (GPC): We will honor opt-out preference signals where required by law.',
            'Do Not Sell or Share: Where applicable, use the link described in our Privacy Policy.',
            'ADMT personalization: You may opt out of certain automated personalization as described in the Privacy Policy.',
          ]}
        />
      </PolicySection>

      <PolicySection id="retention" title="6. Retention">
        <p>
          Session cookies typically expire when you close your browser. Persistent cookies remain for
          a defined period or until you delete them. Analytics data is generally retained for up to
          26 months unless a longer period is required for security or legal compliance.
        </p>
      </PolicySection>

      <PolicySection id="changes" title="7. Changes">
        <p>
          We may update this Cookie Policy from time to time. Material changes will be reflected by an
          updated &quot;Last Updated&quot; date and, where appropriate, platform notification or
          email.
        </p>
      </PolicySection>

      <PolicySection id="contact" title="8. Contact">
        <p>For questions about this Cookie Policy:</p>
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
