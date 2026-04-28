import type { Metadata } from 'next'
import { AffordabilityCalculator } from '@/components/calculators/AffordabilityCalculator'
import { AdSlot } from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Affordability Calculator — How Much House Can I Afford? 2026',
  description: 'Free home affordability calculator. Find your maximum home price based on income, debts, and down payment. Updated 2026 DTI guidelines.',
  alternates: { canonical: 'https://mortgageinsighthub.com/affordability-calculator' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Affordability Calculator', item: 'https://mortgageinsighthub.com/affordability-calculator' },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      name: 'Home Affordability Calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ],
}

export default function AffordabilityCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Affordability Calculator</h1>
          <p className="text-lg text-secondary">Find out how much house you can afford based on your income</p>
        </div>

        <AffordabilityCalculator />

        <div className="mt-12 space-y-6">
          <section className="bg-white rounded-xl border border-border p-6">
            <h2 className="text-xl font-semibold mb-3">How Lenders Calculate Affordability</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-medium text-foreground">Front-End Ratio (28% rule)</p>
                <p className="text-secondary">Your monthly housing costs (PITI) should not exceed 28% of your gross monthly income. Example: $6,000/month income × 28% = $1,680 max PITI.</p>
              </div>
              <div className="space-y-2">
                <p className="font-medium text-foreground">Back-End Ratio (36–43% rule)</p>
                <p className="text-secondary">All monthly debt payments (housing + car + student loans + credit cards) should not exceed 36–43% of gross income. FHA allows up to 57%.</p>
              </div>
            </div>
          </section>
          <AdSlot slot="responsive" className="w-full mx-auto" />
        </div>
      </div>
    </>
  )
}
