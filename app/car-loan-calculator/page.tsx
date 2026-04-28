import type { Metadata } from 'next'
import { CarLoanCalculator } from '@/components/calculators/CarLoanCalculator'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { AdSlot } from '@/components/ui/AdSlot'
import { CAR_LOAN_RATE_TABLE } from '@/lib/rates/usRates'

export const metadata: Metadata = {
  title: 'Car Loan Calculator — Monthly Car Payment Calculator 2026',
  description:
    'Calculate your monthly car payment instantly. Compare 48, 60, 72, and 84-month auto loan terms. See how credit score affects your rate. Free 2026 car loan calculator.',
  alternates: { canonical: 'https://mortgageinsighthub.com/car-loan-calculator' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Car Loan Calculator', item: 'https://mortgageinsighthub.com/car-loan-calculator' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Car Loan Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free car loan calculator with term comparison, credit score rate table, and new vs used rates.',
    },
  ],
}

const FAQ_ITEMS = [
  {
    question: 'How does a car loan calculator work?',
    answer: 'A car loan calculator uses the standard amortization formula to determine your monthly payment based on the vehicle price, down payment, trade-in value, sales tax, loan term, and interest rate (APR). The formula is M = P[r(1+r)^n]/[(1+r)^n-1], where P is the loan amount, r is the monthly rate, and n is the number of months.',
  },
  {
    question: 'What is a good car loan interest rate in 2026?',
    answer: 'In 2026, a good new car loan rate is 5.5–6.5% APR for borrowers with excellent credit (720+ score). Average rates are around 7.5–8.5%. Used car loans typically run 1–3% higher than new. Rates vary significantly by credit score — excellent credit borrowers can pay less than half the interest of poor-credit borrowers over a 60-month loan.',
  },
  {
    question: 'Is a 72-month car loan a bad idea?',
    answer: 'A 72-month (6-year) car loan means lower monthly payments but significantly more total interest paid — often $2,000–$5,000 more than a 48-month loan. You\'re also at risk of being "underwater" (owing more than the car is worth) for most of the loan due to rapid vehicle depreciation. Financial experts generally recommend keeping car loans at 48–60 months maximum.',
  },
  {
    question: 'Should I finance or pay cash for a car?',
    answer: 'If you can get a low APR (under 3–4%), financing can make sense — especially if you can invest the cash at higher returns. At rates above 6–7%, paying cash or making a large down payment usually saves more money. Always negotiate the vehicle price separately from the financing to avoid confusion about the "best deal."',
  },
]

export default function CarLoanCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Car Loan Calculator</h1>
          <p className="text-lg text-secondary">Calculate your monthly car payment with term comparison</p>
        </div>

        <CarLoanCalculator />

        <div className="mt-16 space-y-12">
          {/* How much is my car payment */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">How much is my car payment?</h2>
            <div className="bg-white rounded-xl border border-border p-6 text-sm text-secondary space-y-3">
              <p><strong className="text-foreground">Example:</strong> $35,000 vehicle, $5,000 down, 60-month term at 6.5% APR:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loan amount: $30,000</li>
                <li>Monthly payment: <strong className="text-primary text-base">$587</strong></li>
                <li>Total interest: $5,220</li>
                <li>Total cost of car: $35,220</li>
              </ul>
              <p>Extending to 72 months would reduce the payment to $507/month but add $1,500 in total interest.</p>
            </div>
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />

          {/* Rate table by credit score */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Average Car Loan Rates 2026 by Credit Score
            </h2>
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm" aria-label="Car loan rates by credit score 2026">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-medium text-secondary">Credit Score</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">New Car Rate</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">Used Car Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {CAR_LOAN_RATE_TABLE.map((row, i) => (
                    <tr key={row.creditScore} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.creditScore}</td>
                      <td className="px-4 py-3 text-right text-primary font-semibold">{row.newCar}</td>
                      <td className="px-4 py-3 text-right text-secondary">{row.usedCar}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-secondary mt-2">Source: Experian State of the Automotive Finance Market, 2026 averages.</p>
          </section>

          {/* New vs Used */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">New vs. Used Car Loan Interest Rates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-3">🚗 New Car Loans</h3>
                <ul className="text-sm text-secondary space-y-1.5">
                  <li>✓ Lower interest rates (typically 1–3% less)</li>
                  <li>✓ Manufacturer incentives &amp; 0% APR deals</li>
                  <li>✓ Longer loan terms available (up to 84 months)</li>
                  <li>✗ Higher purchase price</li>
                  <li>✗ Rapid initial depreciation (15–25% first year)</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-semibold text-foreground mb-3">🚙 Used Car Loans</h3>
                <ul className="text-sm text-secondary space-y-1.5">
                  <li>✓ Lower purchase price</li>
                  <li>✓ Slower depreciation curve</li>
                  <li>✓ Lower insurance premiums</li>
                  <li>✗ Higher interest rates</li>
                  <li>✗ Shorter loan terms typically offered</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 72 month section */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Is a 72-Month Car Loan a Bad Idea?</h2>
            <div className="bg-white rounded-xl border border-border p-6 text-sm text-secondary space-y-3">
              <p>
                A 72-month loan on a $35,000 car at 6.5% APR costs <strong className="text-accent-red">$7,230 in total interest</strong>{' '}
                vs. $4,800 for a 60-month loan — that&apos;s <strong className="text-accent-red">$2,430 extra</strong> for a payment that&apos;s only
                about $80/month less.
              </p>
              <p>
                Worse, cars depreciate 15–20% the first year. With 72 months of slow principal paydown,
                you&apos;re likely &quot;underwater&quot; (owing more than the car is worth) for the first 3+ years.
              </p>
              <p className="font-medium text-foreground">
                Recommendation: Keep your loan at 48–60 months. If the payment isn&apos;t affordable,
                consider a less expensive vehicle.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Car Loan Calculator FAQ</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />
        </div>
      </div>
    </>
  )
}
