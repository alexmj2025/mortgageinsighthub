import type { Metadata } from 'next'
import { MortgageCalculator } from '@/components/calculators/MortgageCalculator'
import { FAQAccordion } from '@/components/ui/FAQAccordion'
import { AdSlot } from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Mortgage Calculator — Monthly Payment Calculator 2026',
  description:
    'Calculate your monthly mortgage payment with full amortization schedule, PMI, property taxes, and insurance. Updated 2026 rates. Free and instant.',
  alternates: { canonical: 'https://mortgageinsighthub.com/mortgage-calculator' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Calculator', item: 'https://mortgageinsighthub.com/mortgage-calculator' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Mortgage Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
}

const FAQ_ITEMS = [
  {
    question: 'How accurate is this mortgage calculator?',
    answer: 'Our calculator uses the standard amortization formula used by all lenders: M = P[r(1+r)^n]/[(1+r)^n-1]. Results are accurate to within cents of actual lender calculations. Note that actual loan quotes may include origination fees and other costs not reflected here.',
  },
  {
    question: 'What is the difference between principal and interest?',
    answer: 'Principal is the original loan amount you borrowed, and each payment you make reduces this balance. Interest is the fee you pay the lender for borrowing the money, calculated monthly on your remaining balance. Early in your loan, most of your payment goes toward interest. Over time, more goes toward principal — this is called amortization.',
  },
  {
    question: 'What is LTV and why does it matter?',
    answer: 'LTV (Loan-to-Value) is your loan amount divided by your home\'s value. A 90% LTV means you put 10% down. LTV affects your interest rate — lower LTV typically means better rates. It also determines PMI: if LTV exceeds 80% (less than 20% down), you\'ll pay PMI until the balance drops to 80% of the original value.',
  },
]

export default function MortgageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Mortgage Calculator</h1>
          <p className="text-lg text-secondary">Calculate your monthly mortgage payment with PITI breakdown</p>
        </div>

        <MortgageCalculator />

        <div className="mt-12 space-y-8">
          <AdSlot slot="responsive" className="w-full mx-auto" />
          <section>
            <h2 className="text-2xl font-semibold mb-4">Mortgage Calculator FAQ</h2>
            <FAQAccordion items={FAQ_ITEMS} />
          </section>
          <AdSlot slot="responsive" className="w-full mx-auto" />
        </div>
      </div>
    </>
  )
}
