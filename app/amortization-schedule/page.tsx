import type { Metadata } from 'next'
import { MortgageCalculator } from '@/components/calculators/MortgageCalculator'
import { AdSlot } from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Amortization Schedule Calculator — Full Payment Table 2026',
  description: 'Generate a full month-by-month amortization schedule with CSV export. See principal, interest, and balance for every payment. Free online calculator.',
  alternates: { canonical: 'https://mortgageinsighthub.com/amortization-schedule' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mortgageinsighthub.com' },
        { '@type': 'ListItem', position: 2, name: 'Amortization Schedule', item: 'https://mortgageinsighthub.com/amortization-schedule' },
      ],
    },
  ],
}

export default function AmortizationSchedulePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Amortization Schedule</h1>
          <p className="text-lg text-secondary">Generate a full month-by-month amortization table with CSV export</p>
        </div>

        <MortgageCalculator />

        <div className="mt-12">
          <AdSlot slot="responsive" className="w-full mx-auto" />
        </div>
      </div>
    </>
  )
}
