import type { Metadata } from 'next'
import Link from 'next/link'
import { MortgageCalculator } from '@/components/calculators/MortgageCalculator'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { AdSlot } from '@/components/ui/AdSlot'
import { MORTGAGE_RATE_TABLE } from '@/lib/rates/usRates'

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Monthly Payment Calculator 2026 | Free',
  description:
    'Free mortgage calculator for US, Canada and UK. Calculate monthly payments instantly. Full amortization schedule, biweekly comparison, PMI calculator. Updated 2026 rates.',
  alternates: { canonical: 'https://mortgageinsighthub.com' },
}

const FAQ_ITEMS = [
  {
    question: 'How is a monthly mortgage payment calculated?',
    answer:
      'Your monthly principal and interest (P&I) payment is calculated using the amortization formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate (annual rate ÷ 12), and n is the total number of monthly payments. Your full PITI payment also includes property taxes, homeowners insurance, PMI (if applicable), and HOA fees.',
  },
  {
    question: 'What is included in a mortgage payment?',
    answer:
      'A full mortgage payment (PITI) includes: Principal — the portion that reduces your loan balance; Interest — the cost of borrowing; Taxes — your property tax divided into 12 monthly installments; and Insurance — your homeowners insurance premium. If your down payment is less than 20%, you\'ll also pay Private Mortgage Insurance (PMI), typically 0.5%–1% of the loan annually.',
  },
  {
    question: 'How much house can I afford on $80,000 salary?',
    answer:
      'On an $80,000 annual salary (~$6,667/month gross), most lenders allow up to 28% for housing costs ($1,867/month) and 36–43% total debt. With 20% down and a 7% rate, you could afford approximately $275,000–$310,000, depending on your existing debts and local property taxes. Use our Affordability Calculator for a personalized estimate.',
  },
  {
    question: 'What credit score do I need for a mortgage?',
    answer:
      'Conventional loans typically require a minimum 620 credit score, though 740+ gets you the best rates. FHA loans accept scores as low as 580 (with 3.5% down) or 500 (with 10% down). VA loans have no official minimum but most lenders prefer 620+. A higher score can save tens of thousands of dollars over the life of the loan.',
  },
  {
    question: 'Is it better to pay biweekly or monthly?',
    answer:
      'Biweekly payments save significant interest and pay off your loan faster. By paying half your monthly amount every two weeks, you make 26 half-payments per year — equivalent to 13 monthly payments instead of 12. On a $300,000, 30-year loan at 7%, this saves approximately $58,000 in interest and pays off the loan 4–5 years early.',
  },
  {
    question: 'When can I remove PMI?',
    answer:
      'You can request PMI cancellation once your loan balance reaches 80% of the original home value (20% equity). By law, lenders must automatically cancel PMI when your balance reaches 78% LTV. You can reach 20% equity faster by making extra payments, or if your home appreciates significantly — in which case you can request an appraisal to prove the new value.',
  },
  {
    question: 'What is a good mortgage rate in 2026?',
    answer:
      'In 2026, a 30-year fixed rate below 7% is considered competitive for borrowers with good credit (720+). The national average hovers around 6.9–7.1% for 30-year fixed, and 6.3–6.5% for 15-year fixed. Rates vary based on your credit score, down payment, loan type, and lender. Shopping multiple lenders can save 0.25–0.5% — worth tens of thousands over the loan.',
  },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'Mortgage Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description: 'Free online mortgage calculator with amortization schedule, PMI calculation, and PITI breakdown.',
      url: 'https://mortgageinsighthub.com',
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-site mx-auto px-6 py-8">
        {/* H1 hero */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Mortgage Calculator
          </h1>
          <p className="text-lg text-secondary">
            Calculate your monthly mortgage payment instantly
          </p>
        </div>

        {/* Calculator */}
        <MortgageCalculator />

        {/* Content sections */}
        <div className="mt-16 space-y-12">
          {/* Worked example */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              How much is my mortgage payment?
            </h2>
            <div className="bg-white rounded-xl border border-border p-6 text-sm text-secondary leading-relaxed space-y-3">
              <p>
                <strong className="text-foreground">Example:</strong> A $400,000 home with 20% down ($80,000), 30-year term, 7.00% rate:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Loan amount: $320,000</li>
                <li>Monthly P&amp;I: <strong className="text-primary text-base">$2,129</strong></li>
                <li>Monthly property tax ($4,800/yr): $400</li>
                <li>Monthly insurance ($1,200/yr): $100</li>
                <li><strong className="text-foreground">Full PITI: $2,629/month</strong></li>
                <li>Total interest over 30 years: $446,440</li>
              </ul>
            </div>
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />

          {/* What's included */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              What is included in a mortgage payment?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { letter: 'P', title: 'Principal', desc: 'The portion that reduces your loan balance each month.' },
                { letter: 'I', title: 'Interest', desc: 'The lender\'s cost for the loan, front-loaded in amortization.' },
                { letter: 'T', title: 'Taxes', desc: 'Annual property taxes divided into 12 monthly installments.' },
                { letter: 'I', title: 'Insurance', desc: 'Homeowners insurance + PMI if down payment is below 20%.' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl border border-border p-5">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold mb-3">
                    {item.letter}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 2026 rates table */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              2026 Mortgage Rates by Loan Type
            </h2>
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm" aria-label="2026 mortgage rates">
                <thead>
                  <tr className="bg-muted border-b border-border">
                    <th className="text-left px-4 py-3 font-medium text-secondary">Loan Product</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">Interest Rate</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">APR</th>
                    <th className="text-right px-4 py-3 font-medium text-secondary">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {MORTGAGE_RATE_TABLE.map((row, i) => (
                    <tr key={row.product} className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.product}</td>
                      <td className="px-4 py-3 text-right text-primary font-semibold">{row.rate}%</td>
                      <td className="px-4 py-3 text-right text-secondary">{row.apr}%</td>
                      <td className="px-4 py-3 text-right text-secondary">{row.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-secondary mt-2">Rates as of 2026. Actual rates vary by lender and credit profile.</p>
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />

          {/* How to lower */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              How to Lower Your Mortgage Payment
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { tip: '1. Increase your down payment', desc: 'Putting 20%+ down eliminates PMI (saves $100–$300/month) and reduces your loan amount.' },
                { tip: '2. Improve your credit score', desc: 'Going from 680 to 760 can lower your rate by 0.5%, saving $80–$120/month on a $300k loan.' },
                { tip: '3. Choose a longer term', desc: 'A 30-year vs. 15-year term has lower monthly payments, though you\'ll pay more total interest.' },
                { tip: '4. Shop multiple lenders', desc: 'Rate variation between lenders can be 0.25–0.75%. On a $400k loan, that\'s $50–$150/month.' },
                { tip: '5. Buy in a lower tax area', desc: 'Property taxes vary widely by county. Moving just a few miles can save hundreds per month.' },
              ].map((item) => (
                <div key={item.tip} className="bg-white rounded-xl border border-border p-4">
                  <p className="font-semibold text-foreground text-sm mb-1">{item.tip}</p>
                  <p className="text-sm text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Mortgage Calculator FAQ
            </h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </section>

          <AdSlot slot="responsive" className="w-full mx-auto" />

          {/* Other calculators */}
          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
              Other Calculators
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { href: '/car-loan-calculator', title: '🚗 Car Loan Calculator', desc: 'Calculate monthly auto loan payments with term comparison.' },
                { href: '/reverse-mortgage-calculator', title: '🏠 Reverse Mortgage Calculator', desc: 'Find out how much you could receive from a HECM reverse mortgage.' },
                { href: '/affordability-calculator', title: '💰 Affordability Calculator', desc: 'Find your maximum home price based on income and debts.' },
                { href: '/biweekly-mortgage-calculator', title: '📅 Biweekly Calculator', desc: 'See how biweekly payments save interest and shorten your loan.' },
                { href: '/mortgage-calculator-canada', title: '🇨🇦 Canada Calculator', desc: 'Canadian mortgage calculator with CMHC insurance and stress test.' },
                { href: '/mortgage-calculator-uk', title: '🇬🇧 UK Calculator', desc: 'UK mortgage calculator with stamp duty and repayment vs. interest-only.' },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="bg-white rounded-xl border border-border p-5 hover:border-primary/50 hover:shadow-sm transition-all group"
                >
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">{c.title}</p>
                  <p className="text-sm text-secondary">{c.desc}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
