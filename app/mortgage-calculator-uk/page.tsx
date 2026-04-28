import type { Metadata } from 'next'
import { MortgageCalculator } from '@/components/calculators/MortgageCalculator'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { AdSlot } from '@/components/ui/AdSlot'
import { UK_LTV_RATES, calculateStampDuty } from '@/lib/rates/ukRates'

export const metadata: Metadata = {
  title: 'Mortgage Calculator UK — Monthly Repayment Calculator 2026',
  description:
    'Free UK mortgage calculator with stamp duty calculator, repayment vs interest-only comparison, and 2026 mortgage rates by LTV. Calculate your monthly repayment in GBP.',
  alternates: { canonical: 'https://mortgageinsighthub.com/mortgage-calculator-uk' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator UK', item: 'https://mortgageinsighthub.com/mortgage-calculator-uk' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'UK Mortgage Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
    },
  ],
}

const FAQ_ITEMS = [
  {
    question: 'How do UK mortgages work?',
    answer: 'UK mortgages have a term (typically 25 years) with an initial deal period (2 or 5 years fixed, or tracker). After the deal ends, you move to the lender\'s Standard Variable Rate (SVR), usually much higher — which is why most borrowers remortgage at the end of each deal. You can choose repayment (capital + interest) or interest-only (interest only, must have repayment plan).',
  },
  {
    question: 'What is stamp duty in the UK (2026)?',
    answer: 'Stamp Duty Land Tax (SDLT) for standard buyers: 0% on the first £250,000; 5% on £250,001–£925,000; 10% on £925,001–£1.5m; 12% above £1.5m. First-time buyers pay 0% up to £425,000 and 5% on £425,001–£625,000. No relief above £625,000. Additional properties (buy-to-let) have a 3% surcharge on all bands.',
  },
  {
    question: 'What is a good UK mortgage rate in 2026?',
    answer: 'In 2026, competitive UK mortgage rates for a 5-year fix at 75% LTV are approximately 4.05–4.65%. At 60% LTV (large deposit), rates start from 3.99–4.19%. Tracker rates follow the Bank of England base rate + a margin. The SVR (Standard Variable Rate) is typically 7.5–8.5% — always remortgage before your deal ends to avoid this.',
  },
  {
    question: 'What is the difference between repayment and interest-only UK mortgages?',
    answer: 'With a repayment mortgage, each payment reduces your balance AND pays interest — you own the property outright at the end. With interest-only, your monthly payment is lower but your balance never decreases; you need a separate investment (ISA, pension, etc.) to repay the capital at the end of the term. Most residential buyers now use repayment; interest-only is mainly for landlords.',
  },
]

// Example stamp duty calculations for display
const stampDutyExample = calculateStampDuty(350000, false)
const stampDutyFTB = calculateStampDuty(350000, true)

export default function MortgageCalculatorUKPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Mortgage Calculator UK</h1>
          <p className="text-lg text-secondary">UK mortgage calculator with stamp duty and repayment vs interest-only</p>
        </div>

        <MortgageCalculator
          currency="GBP"
          currencySymbol="£"
          defaultHomePrice={300000}
          defaultDownPct={20}
          defaultRate={4.5}
          defaultTerm={25}
          termOptions={[10, 15, 20, 25, 30]}
        />

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">How UK Mortgages Work</h2>
            <div className="bg-white rounded-xl border border-border p-6 text-sm text-secondary space-y-3 leading-relaxed">
              <p>UK mortgages have two key time periods: the <strong className="text-foreground">mortgage term</strong> (usually 25 years, the full repayment period) and the <strong className="text-foreground">deal period</strong> (2–10 years at a fixed or tracker rate).</p>
              <p>After your deal ends, you revert to the lender&apos;s SVR (often 7–8%). Always remortgage to a new deal to avoid paying over the odds.</p>
            </div>
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />

          {/* Stamp duty */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Stamp Duty Calculator 2026</h2>
            <p className="text-secondary text-sm mb-4">Example: £350,000 property</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="px-4 py-3 bg-muted border-b border-border">
                  <p className="font-semibold text-sm">Standard Buyer — £{stampDutyExample.totalDuty.toLocaleString()} SDLT</p>
                </div>
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-border bg-muted/50"><th className="text-left px-4 py-2.5 text-secondary font-medium">Band</th><th className="text-right px-4 py-2.5 text-secondary font-medium">Rate</th><th className="text-right px-4 py-2.5 text-secondary font-medium">Tax</th></tr></thead>
                  <tbody>
                    {stampDutyExample.breakdown.map((b, i) => (
                      <tr key={i} className="border-b border-border last:border-0">
                        <td className="px-4 py-2.5 text-xs text-secondary">{b.band}</td>
                        <td className="px-4 py-2.5 text-right">{b.rate}</td>
                        <td className="px-4 py-2.5 text-right font-medium">£{b.tax.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50 font-semibold">
                      <td className="px-4 py-2.5 text-sm" colSpan={2}>Total SDLT</td>
                      <td className="px-4 py-2.5 text-right text-primary">£{stampDutyExample.totalDuty.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-white rounded-xl border border-green-200 overflow-hidden">
                <div className="px-4 py-3 bg-green-50 border-b border-green-200">
                  <p className="font-semibold text-sm text-accent-green">First-Time Buyer — £{stampDutyFTB.totalDuty.toLocaleString()} SDLT</p>
                </div>
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-green-100 bg-green-50/50"><th className="text-left px-4 py-2.5 text-secondary font-medium">Band</th><th className="text-right px-4 py-2.5 text-secondary font-medium">Rate</th><th className="text-right px-4 py-2.5 text-secondary font-medium">Tax</th></tr></thead>
                  <tbody>
                    {stampDutyFTB.breakdown.map((b, i) => (
                      <tr key={i} className="border-b border-green-50 last:border-0">
                        <td className="px-4 py-2.5 text-xs text-secondary">{b.band}</td>
                        <td className="px-4 py-2.5 text-right">{b.rate}</td>
                        <td className="px-4 py-2.5 text-right font-medium text-accent-green">£{b.tax.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr className="bg-green-50/80 font-semibold">
                      <td className="px-4 py-2.5 text-sm" colSpan={2}>Total SDLT</td>
                      <td className="px-4 py-2.5 text-right text-accent-green">£{stampDutyFTB.totalDuty.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* UK rates by LTV */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">UK Mortgage Rates 2026 by LTV</h2>
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-medium text-secondary">LTV</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">2-Year Fix</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">5-Year Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {UK_LTV_RATES.map((row, i) => (
                    <tr key={row.ltv} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.ltv}</td>
                      <td className="px-4 py-3 text-right text-primary font-semibold">{row.fixedRate2yr}</td>
                      <td className="px-4 py-3 text-right text-secondary">{row.fixedRate5yr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">First-Time Buyer Schemes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { name: 'Help to Buy (Closed 2023)', desc: 'The equity loan scheme closed March 2023. Existing holders retain their loans until sold/repaid.', status: 'Closed' },
                { name: 'Lifetime ISA (LISA)', desc: 'Save up to £4,000/year, government adds 25% (up to £1,000/year). Use towards your first home up to £450,000.', status: 'Open' },
                { name: 'Shared Ownership', desc: 'Buy a 25–75% share of a property and pay subsidised rent on the remainder. Increase share over time ("staircasing").', status: 'Open' },
                { name: '95% Mortgage Guarantee', desc: 'Government backstop allowing lenders to offer 95% LTV mortgages. Check current availability with lenders.', status: 'Check' },
              ].map((scheme) => (
                <div key={scheme.name} className="bg-white rounded-xl border border-border p-4">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-semibold text-foreground text-sm">{scheme.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${scheme.status === 'Open' ? 'bg-green-100 text-accent-green' : scheme.status === 'Closed' ? 'bg-red-100 text-accent-red' : 'bg-yellow-100 text-yellow-700'}`}>
                      {scheme.status}
                    </span>
                  </div>
                  <p className="text-xs text-secondary">{scheme.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">UK Mortgage FAQ</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />
        </div>
      </div>
    </>
  )
}
