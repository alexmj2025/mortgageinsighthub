import type { Metadata } from 'next'
import { RefinanceCalculator } from '@/components/calculators/RefinanceCalculator'
import { AdSlot } from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Mortgage Refinance Calculator — Should I Refinance? 2026',
  description: 'Free mortgage refinance calculator. Compare your current loan to a new rate, calculate break-even point, and see total interest savings.',
  alternates: { canonical: 'https://mortgageinsighthub.com/mortgage-refinance-calculator' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Mortgage Refinance Calculator', item: 'https://mortgageinsighthub.com/mortgage-refinance-calculator' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Mortgage Refinance Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
}

export default function MortgageRefinanceCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Mortgage Refinance Calculator</h1>
          <p className="text-lg text-secondary">Calculate your savings and break-even point for refinancing</p>
        </div>

        <RefinanceCalculator />

        <div className="mt-12 space-y-6">
          <section className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">When Should You Refinance?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-secondary">
              {[
                { when: 'Rates drop 0.75%+', detail: 'The traditional rule of thumb. Check your specific break-even period.' },
                { when: 'You plan to stay 3+ years', detail: 'Short-term stays rarely allow enough time to recoup closing costs.' },
                { when: 'Switching loan types', detail: 'ARM to fixed for payment stability, or to remove FHA MIP.' },
                { when: 'Cash-out refinance', detail: 'Access equity for home improvements or debt consolidation (check rates).' },
              ].map((item) => (
                <div key={item.when} className="flex gap-3">
                  <span className="text-accent-green">✓</span>
                  <div>
                    <p className="font-medium text-foreground">{item.when}</p>
                    <p className="text-xs mt-0.5">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <AdSlot slot="responsive" className="w-full mx-auto" />
        </div>
      </div>
    </>
  )
}
