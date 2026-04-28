import type { Metadata } from 'next'
import { MortgageCalculator } from '@/components/calculators/MortgageCalculator'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { AdSlot } from '@/components/ui/AdSlot'
import { CMHC_RATE_TABLE, CANADA_PROVINCE_RATES } from '@/lib/rates/canadaRates'

export const metadata: Metadata = {
  title: 'Mortgage Calculator Canada — Canadian Mortgage Calculator 2026',
  description:
    'Free Canadian mortgage calculator with CMHC insurance, stress test, and 25-year amortization. Calculate your monthly mortgage payment in CAD.',
  alternates: { canonical: 'https://mortgageinsighthub.com/mortgage-calculator-canada' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator Canada', item: 'https://mortgageinsighthub.com/mortgage-calculator-canada' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Canadian Mortgage Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
    },
  ],
}

const FAQ_ITEMS = [
  {
    question: 'How do Canadian mortgages differ from US mortgages?',
    answer: 'Key differences: Canadian mortgages have shorter terms (typically 5 years) requiring renewal, while US mortgages are typically fixed for 15 or 30 years. Canada has a maximum 25-year amortization for insured mortgages (30 years uninsured). CMHC insurance is required for down payments under 20%. The federal stress test requires qualifying at a higher rate than your contract rate.',
  },
  {
    question: 'What is the CMHC stress test 2026?',
    answer: 'The Canadian mortgage stress test requires you to qualify at the higher of: your contract interest rate + 2%, or 5.25% (the regulatory floor). So if your mortgage rate is 5.5%, you must prove you can afford payments at 7.5%. This applies to all federally regulated lenders, including major banks, for both insured and uninsured mortgages.',
  },
  {
    question: 'How much is CMHC mortgage insurance in Canada?',
    answer: 'CMHC insurance (mandatory when down payment is under 20%) is: 4.00% of the mortgage for 5–9.99% down; 3.10% for 10–14.99% down; 2.80% for 15–19.99% down. The premium is added to your mortgage balance. On a $475,000 mortgage with 5% down, CMHC adds $19,000 to your loan.',
  },
  {
    question: 'What is the minimum down payment in Canada?',
    answer: 'Minimum down payment in Canada: 5% for homes up to $500,000; 5% on the first $500,000 + 10% on the portion above $500,000 (for homes $500k–$999,999); 20% for homes $1,000,000+. First-time buyers may access the First Home Savings Account (FHSA) and Home Buyers\' Plan for additional funds.',
  },
]

export default function MortgageCalculatorCanadaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Mortgage Calculator Canada</h1>
          <p className="text-lg text-secondary">Canadian mortgage calculator with CMHC insurance and stress test</p>
        </div>

        <MortgageCalculator
          currency="CAD"
          currencySymbol="CAD$"
          defaultHomePrice={600000}
          defaultDownPct={10}
          defaultRate={5.5}
          defaultTerm={25}
          termOptions={[15, 20, 25, 30]}
        />

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">How Canadian Mortgages Work</h2>
            <div className="bg-white rounded-xl border border-border p-6 text-sm text-secondary space-y-3 leading-relaxed">
              <p>Canadian mortgages differ significantly from US mortgages in structure:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-foreground">Term vs. Amortization:</strong> The amortization period is how long to pay off the loan (typically 25 years). The term is the period your rate is locked in (typically 5 years). At the end of each term, you renew at current rates.</li>
                <li><strong className="text-foreground">CMHC Insurance:</strong> Required if your down payment is under 20% of the purchase price.</li>
                <li><strong className="text-foreground">Stress Test:</strong> All borrowers must qualify at contract rate + 2% to ensure affordability if rates rise.</li>
                <li><strong className="text-foreground">Prepayment Privileges:</strong> Most lenders allow 10–20% annual lump-sum prepayments without penalty.</li>
              </ul>
            </div>
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">CMHC Mortgage Insurance Rates</h2>
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-medium text-secondary">Down Payment</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">CMHC Premium</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {CMHC_RATE_TABLE.map((row, i) => (
                    <tr key={row.downPayment} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.downPayment}</td>
                      <td className={`px-4 py-3 text-right font-semibold ${row.premium === '0%' ? 'text-accent-green' : 'text-accent-red'}`}>{row.premium}</td>
                      <td className="px-4 py-3 text-right text-secondary">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-secondary mt-2">CMHC premium is added to your mortgage balance, not paid upfront.</p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Canada Mortgage Stress Test 2026</h2>
            <div className="bg-white rounded-xl border border-border p-6 text-sm text-secondary space-y-3">
              <p>The stress test requires you to qualify at the <strong className="text-foreground">higher of</strong>:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-800 mb-1">Option A</p>
                  <p className="text-blue-700">Your contract rate + 2%</p>
                  <p className="text-xs text-blue-600 mt-1">If rate is 5.5%, qualify at 7.5%</p>
                </div>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="font-semibold text-blue-800 mb-1">Option B</p>
                  <p className="text-blue-700">Floor rate: 5.25%</p>
                  <p className="text-xs text-blue-600 mt-1">Minimum qualifying rate</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Mortgage Rates by Province</h2>
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-medium text-secondary">Province</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">Avg. Rate</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">Avg. Home Price</th>
                  </tr>
                </thead>
                <tbody>
                  {CANADA_PROVINCE_RATES.map((row, i) => (
                    <tr key={row.province} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.province}</td>
                      <td className="px-4 py-3 text-right text-primary font-semibold">{row.avgRate}%</td>
                      <td className="px-4 py-3 text-right text-secondary">CAD ${row.avgHomePrice.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Canadian Mortgage FAQ</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />
        </div>
      </div>
    </>
  )
}
