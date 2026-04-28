# MortgageInsightHub.com

Production-ready mortgage and loan calculator website built with Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, and Recharts.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
npm run build    # production build
npm run start    # serve production build locally
npm run type-check  # TypeScript check (zero errors required)
```

Deploy to Vercel: connect your repo at vercel.com — zero config required.

---

## How to Update Interest Rate Defaults

Edit `/lib/rates/usRates.ts` to update US mortgage and car loan default rates:

```ts
// /lib/rates/usRates.ts
export const US_RATES = {
  mortgage: {
    rate30yr: 6.95,   // ← update this
    rate15yr: 6.30,   // ← update this
    ...
  },
  defaultMortgage: {
    rate: 7.0,        // ← default shown in calculator
  }
}
```

Similarly update `/lib/rates/canadaRates.ts` and `/lib/rates/ukRates.ts`.

---

## How to Swap Affiliate Links

All affiliate CTAs are in `/components/ui/AffiliateCTA.tsx`.

```ts
// /components/ui/AffiliateCTA.tsx
const CTA_MAP = {
  mortgage: [
    {
      label: 'Compare Today\'s Rates',
      href: '#affiliate-lendingtree',  // ← replace with real URL
    },
    ...
  ]
}
```

Replace `#affiliate-[name]` placeholders with your actual affiliate URLs.
Add `target="_blank"` if linking to external sites (already has `rel="noopener noreferrer sponsored"`).

---

## How to Add Your AdSense Publisher ID

1. Open `/components/ui/AdSlot.tsx`
2. Find the commented `<ins>` block:
```tsx
{/*
<ins
  className="adsbygoogle"
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // ← your publisher ID
  data-ad-slot="XXXXXXXXXX"                  // ← your ad slot ID
  ...
/>
*/}
```
3. Uncomment the `<ins>` block and remove the placeholder `<span>`
4. Replace `ca-pub-XXXXXXXXXXXXXXXX` with your publisher ID
5. Add AdSense script to `/app/layout.tsx` head (after approval)

---

## How to Connect ConvertKit Email API

1. Set environment variables in `.env.local`:
```
CONVERTKIT_API_KEY=your_api_key
CONVERTKIT_FORM_ID=your_form_id
```

2. Open `/app/api/subscribe/route.ts` and uncomment the ConvertKit block:
```ts
const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID
await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ api_key: CONVERTKIT_API_KEY, email }),
})
```

For Mailchimp, uncomment the Mailchimp block instead and set `MAILCHIMP_API_KEY` + `MAILCHIMP_LIST_ID`.

---

## How to Add a New Calculator Page

1. **Create the calculation logic** in `/lib/calculations/yourCalc.ts`
2. **Create the calculator component** in `/components/calculators/YourCalculator.tsx`
   - Use `CurrencyInput`, `RateInput`, `TermButtons` from `/components/ui/CurrencyInput.tsx`
   - Use `ResultCard` pattern for results
   - Wrap in `aria-live="polite"` for accessibility
3. **Create the page** at `/app/your-calculator/page.tsx`:
```tsx
import type { Metadata } from 'next'
import { YourCalculator } from '@/components/calculators/YourCalculator'

export const metadata: Metadata = {
  title: 'Your Calculator — Description 2026',
  description: 'Your SEO description here.',
  alternates: { canonical: 'https://mortgageinsighthub.com/your-calculator' },
}

export default function YourCalculatorPage() {
  return (
    <div className="max-w-site mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold mb-6">Your Calculator</h1>
      <YourCalculator />
    </div>
  )
}
```
4. **Add to sitemap** in `/app/sitemap.ts`
5. **Add navigation link** in `/components/layout/Header.tsx`
6. **Add internal link** in homepage `/app/page.tsx` "Other Calculators" section

---

## Project Structure

```
mortgageinsighthub/
├── app/
│   ├── layout.tsx                     # Root layout, Inter font, GA4
│   ├── page.tsx                       # Homepage with mortgage calculator
│   ├── sitemap.ts                     # Auto-generated sitemap
│   ├── robots.ts                      # Robots.txt
│   ├── globals.css                    # Tailwind + custom properties
│   ├── mortgage-calculator/page.tsx
│   ├── car-loan-calculator/page.tsx   # Priority — trending +250%
│   ├── auto-loan-calculator/page.tsx  # Redirects to car-loan-calculator
│   ├── reverse-mortgage-calculator/page.tsx
│   ├── mortgage-calculator-canada/page.tsx
│   ├── mortgage-calculator-uk/page.tsx
│   ├── biweekly-mortgage-calculator/page.tsx
│   ├── mortgage-refinance-calculator/page.tsx
│   ├── affordability-calculator/page.tsx
│   ├── amortization-schedule/page.tsx
│   ├── faq/page.tsx                   # 20+ Q&A with FAQPage schema
│   ├── how-it-works/page.tsx          # E-E-A-T trust page
│   ├── privacy/page.tsx               # Required for AdSense
│   └── api/subscribe/route.ts         # Email capture stub
├── components/
│   ├── calculators/
│   │   ├── MortgageCalculator.tsx
│   │   ├── CarLoanCalculator.tsx
│   │   ├── ReverseMortgageCalculator.tsx
│   │   ├── BiweeklyCalculator.tsx
│   │   ├── AffordabilityCalculator.tsx
│   │   └── RefinanceCalculator.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── ResultCard.tsx
│       ├── AmortizationChart.tsx      # Recharts, lazy-loaded
│       ├── AmortizationTable.tsx      # CSV export
│       ├── MarketSelector.tsx         # US / Canada / UK toggle
│       ├── CurrencyInput.tsx          # Input, RateInput, TermButtons
│       ├── AffiliateCTA.tsx           # Context-aware affiliate links
│       ├── ShareResult.tsx            # Copy to clipboard + print PDF
│       ├── FAQAccordion.tsx
│       └── AdSlot.tsx                 # Pre-sized slots prevent CLS
├── lib/
│   ├── utils.ts
│   ├── calculations/
│   │   ├── mortgage.ts                # PITI, PMI, Canada CMHC
│   │   ├── carLoan.ts                 # Term comparison, rate impact
│   │   ├── reverseMortgage.ts         # HECM, PLF table
│   │   ├── affordability.ts           # DTI ratios, max home price
│   │   └── amortization.ts            # Schedule, biweekly, refinance
│   └── rates/
│       ├── usRates.ts                 # US defaults — update regularly
│       ├── canadaRates.ts             # CAD defaults, CMHC table
│       └── ukRates.ts                 # GBP defaults, stamp duty
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Calculation Test Results

All 5 tests pass (verified against formula):

| Test | Expected | Formula |
|------|----------|---------|
| US 30yr $320k @ 7% | $2,129/mo | ✓ |
| US 15yr $300k @ 6.5% | $2,614/mo | ✓ |
| Car loan $30k @ 6.5% 60mo | ~$587/mo | ✓ |
| Canada $494k @ 5.5% 25yr | ~$3,030 CAD | ✓ |
| UK £280k @ 4.5% 25yr | £1,556/mo | ✓ |
