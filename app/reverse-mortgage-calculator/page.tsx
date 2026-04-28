import type { Metadata } from 'next'
import { ReverseMortgageCalculator } from '@/components/calculators/ReverseMortgageCalculator'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { AdSlot } from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Reverse Mortgage Calculator — HECM Calculator 2026',
  description:
    'Free reverse mortgage calculator. Find out how much you can receive from a HECM reverse mortgage. Includes lump sum, monthly tenure, and line of credit estimates.',
  alternates: { canonical: 'https://mortgageinsighthub.com/reverse-mortgage-calculator' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Reverse Mortgage Calculator', item: 'https://mortgageinsighthub.com/reverse-mortgage-calculator' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Reverse Mortgage Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
}

const FAQ_ITEMS = [
  {
    question: 'What is a reverse mortgage and how does it work?',
    answer: 'A reverse mortgage (HECM — Home Equity Conversion Mortgage) allows homeowners 62+ to convert home equity into cash without selling or making monthly payments. Instead of paying the bank, the bank pays you. The loan balance grows over time and is repaid when you sell, move out, or pass away. You must continue to pay property taxes, insurance, and maintain the home.',
  },
  {
    question: 'Who qualifies for a reverse mortgage?',
    answer: 'To qualify for a HECM: you must be 62 or older (youngest borrower if married), own your home outright or have significant equity, live in the home as your primary residence, complete HUD-approved counseling, and be current on property taxes and insurance. The home must meet FHA standards. Second homes and investment properties do not qualify.',
  },
  {
    question: 'What is a HECM vs. a proprietary reverse mortgage?',
    answer: 'A HECM (Home Equity Conversion Mortgage) is FHA-insured and federally regulated with a 2024 loan limit of $1,149,825. Proprietary reverse mortgages are private products for higher-value homes (often called "jumbo reverse mortgages") with no FHA limit. HECMs have stronger consumer protections; proprietary products may offer larger loan amounts for qualifying high-value homes.',
  },
  {
    question: 'Can I lose my home with a reverse mortgage?',
    answer: 'Yes, but only under specific conditions: failing to pay property taxes or insurance, not maintaining the home, or not living in the home as your primary residence for more than 12 consecutive months. As long as you meet these requirements, you cannot be forced out of your home. Heirs have 6–12 months to repay or sell the home after you pass away.',
  },
]

export default function ReverseMortgageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Reverse Mortgage Calculator</h1>
          <p className="text-lg text-secondary">Estimate your HECM reverse mortgage proceeds</p>
        </div>

        <ReverseMortgageCalculator />

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">How Does a Reverse Mortgage Work?</h2>
            <div className="bg-white rounded-xl border border-border p-6 text-sm text-secondary space-y-3 leading-relaxed">
              <p>A reverse mortgage lets homeowners 62+ tap their home equity without selling or making monthly mortgage payments. The loan is repaid when you move, sell, or pass away.</p>
              <p><strong className="text-foreground">Key facts:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li>No monthly mortgage payments required</li>
                <li>You retain title to your home</li>
                <li>Loan balance grows over time as interest accrues</li>
                <li>You must continue paying property taxes and insurance</li>
                <li>FHA HECM limit (2024): $1,149,825</li>
                <li>HUD counseling is required before closing</li>
              </ul>
            </div>
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Reverse Mortgage Eligibility Requirements</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { req: 'Age 62 or older', detail: 'Both borrowers on title must be 62+.' },
                { req: 'Primary residence', detail: 'Must be your primary home. No investment properties.' },
                { req: 'Significant equity', detail: 'Typically 50%+ equity, depending on age.' },
                { req: 'HUD counseling', detail: 'Must complete approved counseling session first.' },
                { req: 'Current on obligations', detail: 'No delinquent federal debt (taxes, student loans).' },
                { req: 'Property condition', detail: 'Home must meet FHA minimum property standards.' },
              ].map((r) => (
                <div key={r.req} className="bg-white rounded-xl border border-border p-4 flex gap-3">
                  <span className="text-accent-green text-lg">✓</span>
                  <div>
                    <p className="font-medium text-foreground text-sm">{r.req}</p>
                    <p className="text-xs text-secondary mt-0.5">{r.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">HECM vs. Proprietary Reverse Mortgage</h2>
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-medium text-secondary">Feature</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">HECM</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">Proprietary</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['FHA Insured', 'Yes', 'No'],
                    ['Loan Limit', '$1,149,825', 'No limit'],
                    ['Min Age', '62', '55–62 (varies)'],
                    ['Counseling Required', 'Yes', 'Varies'],
                    ['Consumer Protections', 'Strong', 'Varies by lender'],
                    ['Best For', 'Most homeowners', 'High-value homes'],
                  ].map(([feat, hecm, prop], i) => (
                    <tr key={feat} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}>
                      <td className="px-4 py-3 font-medium text-foreground">{feat}</td>
                      <td className="px-4 py-3 text-right text-primary">{hecm}</td>
                      <td className="px-4 py-3 text-right text-secondary">{prop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Reverse Mortgage FAQ</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />
        </div>
      </div>
    </>
  )
}
