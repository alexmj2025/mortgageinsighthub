import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | MortgageInsightHub',
  description: 'Privacy policy for MortgageInsightHub.com. Learn how we collect, use, and protect your data. GDPR, CCPA, and PIPEDA compliant.',
  alternates: { canonical: 'https://mortgageinsighthub.com/privacy' },
}

const LAST_UPDATED = 'January 15, 2026'
const CONTACT_EMAIL = 'privacy@mortgageinsighthub.com'

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-secondary text-sm">Last updated: {LAST_UPDATED}</p>
      </div>

      <div className="space-y-6 text-sm text-secondary leading-relaxed">
        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Overview</h2>
          <p>
            MortgageInsightHub.com (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
            This policy explains what data we collect, how we use it, and your rights.
            Our calculators perform all computations in your browser — we do not store your
            financial inputs on our servers.
          </p>
        </section>

        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Data We Collect</h2>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-foreground">Calculator Inputs</p>
              <p>All mortgage and loan calculations happen entirely in your browser (client-side JavaScript). No financial inputs (loan amounts, income, rates, etc.) are transmitted to or stored on our servers.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Analytics (Google Analytics 4)</p>
              <p>We use Google Analytics 4 with IP anonymization enabled. This collects: page views, session duration, device type, browser, country/region (not city-level), and referral source. No personally identifiable information is collected via analytics. You can opt out via <a href="https://tools.google.com/dlpage/gaoptout" className="underline hover:text-primary" rel="noopener noreferrer">Google&apos;s opt-out browser add-on</a>.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Advertising (Google AdSense)</p>
              <p>We display advertisements through Google AdSense. Google may use cookies to serve ads based on your prior visits to our site and other sites. You can opt out of personalized advertising at <a href="https://www.google.com/settings/ads" className="underline hover:text-primary" rel="noopener noreferrer">google.com/settings/ads</a>.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Email Subscriptions (Optional)</p>
              <p>If you subscribe to rate alerts, we collect your email address. This is stored securely via our email service provider. You can unsubscribe at any time via the link in each email. We do not sell or share your email address.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Cookies</h2>
          <p className="mb-3">We use the following types of cookies:</p>
          <ul className="space-y-2">
            {[
              { type: 'Essential', desc: 'Required for basic site functionality. Cannot be disabled.', canOpt: false },
              { type: 'Analytics', desc: 'Google Analytics 4 — helps us understand site usage to improve the service.', canOpt: true },
              { type: 'Advertising', desc: 'Google AdSense — used to serve relevant advertisements.', canOpt: true },
            ].map((c) => (
              <li key={c.type} className="flex items-start gap-3">
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 ${c.canOpt ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-accent-green'}`}>
                  {c.canOpt ? 'Optional' : 'Required'}
                </span>
                <div>
                  <p className="font-medium text-foreground">{c.type}</p>
                  <p className="text-xs">{c.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">No Sale of Personal Data</h2>
          <p>We do not sell, rent, or trade your personal information to third parties. The only data shared with third parties is aggregate, anonymized analytics data and advertising identifiers (subject to your cookie preferences).</p>
        </section>

        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Your Rights</h2>
          <div className="space-y-3">
            <div>
              <p className="font-medium text-foreground">GDPR (EU/UK)</p>
              <p>If you are in the European Economic Area or United Kingdom, you have the right to: access your personal data; rectify inaccurate data; erase your data (&quot;right to be forgotten&quot;); restrict processing; data portability; and object to processing. Contact us to exercise these rights.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">CCPA (California)</p>
              <p>California residents have the right to: know what personal information is collected; know whether personal information is sold; opt out of the sale of personal information (we do not sell personal information); and non-discrimination for exercising your rights.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">PIPEDA (Canada)</p>
              <p>Canadian users have the right to access personal information we hold about you, challenge its accuracy, and request deletion. We comply with Canada&apos;s Personal Information Protection and Electronic Documents Act.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Data Retention</h2>
          <p>Analytics data is retained for 14 months per Google Analytics default settings. Email subscription data is retained until you unsubscribe. We do not retain financial calculator inputs (they are never transmitted to us).</p>
        </section>

        <section className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">Contact Us</h2>
          <p>
            For privacy questions, data requests, or to exercise your rights, contact us at:{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline hover:text-primary font-medium">
              {CONTACT_EMAIL}
            </a>
          </p>
          <p className="mt-2">We will respond to data requests within 30 days.</p>
        </section>
      </div>
    </div>
  )
}
