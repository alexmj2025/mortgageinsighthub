import type { Metadata } from 'next'
import { BiweeklyCalculator } from '@/components/calculators/BiweeklyCalculator'
import { AdSlot } from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Biweekly Mortgage Calculator — Save Interest & Pay Off Faster 2026',
  description: 'Calculate how biweekly mortgage payments save you thousands in interest and pay off your loan years earlier. Free biweekly vs monthly comparison.',
  alternates: { canonical: 'https://mortgageinsighthub.com/biweekly-mortgage-calculator' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Biweekly Mortgage Calculator', item: 'https://mortgageinsighthub.com/biweekly-mortgage-calculator' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Biweekly Mortgage Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
}

export default function BiweeklyMortgageCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Biweekly Mortgage Calculator</h1>
          <p className="text-lg text-secondary">See how biweekly payments save interest and shorten your loan</p>
        </div>

        <BiweeklyCalculator />

        <div className="mt-12 space-y-8">
          <section className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">Why Biweekly Payments Work</h2>
            <p className="text-sm text-secondary leading-relaxed">
              Paying biweekly means you make 26 half-payments per year — equivalent to 13 full monthly payments instead of 12.
              That extra payment goes entirely toward principal, dramatically reducing interest and shortening your loan term.
              On a $300,000 loan at 7% for 30 years, switching to biweekly payments saves approximately $58,000 in interest
              and pays off the loan 4–5 years early.
            </p>
          </section>
          <AdSlot slot="responsive" className="w-full mx-auto" />
        </div>
      </div>
    </>
  )
}
