import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works — Calculator Methodology & Formulas | MortgageInsightHub',
  description: 'Learn exactly how our mortgage and loan calculators work. See the formulas used, data sources, PMI calculation, CMHC insurance, and UK stamp duty methodology.',
  alternates: { canonical: 'https://mortgageinsighthub.com/how-it-works' },
}

const LAST_UPDATED = '2026-01-15'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How Mortgage Payments Are Calculated',
  description: 'Step-by-step explanation of mortgage payment calculation using the standard amortization formula.',
  step: [
    { '@type': 'HowToStep', name: 'Determine loan amount', text: 'Subtract down payment from home price to get the principal loan amount.' },
    { '@type': 'HowToStep', name: 'Calculate monthly rate', text: 'Divide the annual interest rate by 12 to get the monthly rate (e.g., 7% ÷ 12 = 0.5833%).' },
    { '@type': 'HowToStep', name: 'Apply amortization formula', text: 'M = P × [r(1+r)^n] / [(1+r)^n - 1] where P = loan amount, r = monthly rate, n = total months.' },
    { '@type': 'HowToStep', name: 'Add PITI components', text: 'Add monthly property tax (annual ÷ 12), insurance (annual ÷ 12), and PMI if applicable.' },
  ],
}

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
    { '@type': 'ListItem', position: 2, name: 'How It Works', item: 'https://mortgageinsighthub.com/how-it-works' },
  ],
}

export default function HowItWorksPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">How It Works</h1>
          <p className="text-secondary text-sm">Last updated: {LAST_UPDATED} — builds Google E-E-A-T trust signal</p>
        </div>

        <div className="space-y-8 text-sm text-secondary leading-relaxed">
          <section className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Mortgage Payment Formula</h2>
            <p className="mb-3">Our mortgage calculator uses the standard amortization formula recognized by all lenders:</p>
            <div className="bg-muted rounded-lg p-4 font-mono text-xs text-foreground mb-3">
              <p>monthlyRate = annualRate / 100 / 12</p>
              <p>n = loanTermYears × 12</p>
              <p>monthlyPayment = loanAmount ×</p>
              <p>{'  '}(monthlyRate × (1 + monthlyRate)^n) /</p>
              <p>{'  '}((1 + monthlyRate)^n - 1)</p>
            </div>
            <p>This formula calculates constant monthly payments where each payment covers the month&apos;s interest on the remaining balance, with the rest applied to principal.</p>
          </section>

          <section className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">PMI Calculation</h2>
            <p className="mb-3">PMI (Private Mortgage Insurance) is automatically calculated when your LTV exceeds 80%:</p>
            <ul className="list-disc pl-5 space-y-1 mb-3">
              <li>PMI Rate: 0.5% of loan amount annually (conservative estimate)</li>
              <li>Monthly PMI = loanAmount × 0.005 / 12</li>
              <li>PMI removal: when balance drops to 80% of original home value</li>
            </ul>
            <p>Actual PMI rates vary from 0.2% to 2%+ depending on credit score, LTV, and insurer. Our calculator uses 0.5% as a representative middle estimate.</p>
          </section>

          <section className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Biweekly Payment Formula</h2>
            <p className="mb-3">Biweekly payments use a separate formula — not simply half of the monthly payment:</p>
            <div className="bg-muted rounded-lg p-4 font-mono text-xs text-foreground mb-3">
              <p>biweeklyRate = annualRate / 100 / 26</p>
              <p>biweeklyPayments = loanTermYears × 26</p>
              <p>biweeklyPayment = loanAmount ×</p>
              <p>{'  '}(biweeklyRate × (1 + biweeklyRate)^n) /</p>
              <p>{'  '}((1 + biweeklyRate)^n - 1)</p>
            </div>
            <p>There are 26 biweekly periods per year (52 weeks ÷ 2), so the rate is annual rate ÷ 26.</p>
          </section>

          <section className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Canadian CMHC Insurance</h2>
            <p className="mb-3">CMHC mortgage insurance premiums are added to the loan balance when the down payment is under 20%:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>5.00–9.99% down: 4.00% of mortgage amount</li>
              <li>10.00–14.99% down: 3.10% of mortgage amount</li>
              <li>15.00–19.99% down: 2.80% of mortgage amount</li>
              <li>20%+ down: No CMHC required</li>
            </ul>
            <p className="mt-3">The CMHC premium is added to the mortgage and amortized over the loan term, not paid upfront (though provincial tax is due at closing).</p>
          </section>

          <section className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">UK Stamp Duty Calculation</h2>
            <p className="mb-3">Stamp Duty Land Tax (SDLT) is calculated using marginal rates on each portion of the purchase price:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>£0 – £250,000: 0%</li>
              <li>£250,001 – £925,000: 5%</li>
              <li>£925,001 – £1,500,000: 10%</li>
              <li>Above £1,500,000: 12%</li>
            </ul>
            <p className="mt-3">First-time buyer relief applies: 0% up to £425,000, 5% on £425,001–£625,000. No relief above £625,000.</p>
          </section>

          <section className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Rate Data Sources</h2>
            <p className="mb-2">Our default interest rates are sourced from:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>US: Freddie Mac Primary Mortgage Market Survey, updated weekly</li>
              <li>Canada: Bank of Canada posted rates and major bank averages</li>
              <li>UK: Bank of England Mortgage Lenders and Brokers Survey</li>
              <li>Car loans: Experian State of the Automotive Finance Market report</li>
            </ul>
            <p className="mt-3">To update the default rates used in calculations, edit the files in <code className="bg-muted px-1 py-0.5 rounded text-xs">/lib/rates/</code>.</p>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-amber-800 mb-3">Disclaimer</h2>
            <p className="text-amber-700">
              All calculations are estimates for educational purposes only. Actual loan terms, rates, taxes, and insurance premiums will vary based on your specific circumstances, lender, and location. Results should not be considered financial advice. Always consult a licensed mortgage professional, financial advisor, or HUD-approved counselor before making financial decisions.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
