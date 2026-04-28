import type { Metadata } from 'next'
import { AdSlot } from '@/components/ui/AdSlot'

export const metadata: Metadata = {
  title: 'Mortgage & Loan Calculator FAQ — 20+ Questions Answered 2026',
  description: 'Answers to the most common mortgage and loan calculator questions. How payments are calculated, PMI, biweekly, car loans, reverse mortgages, Canada, UK, and more.',
  alternates: { canonical: 'https://mortgageinsighthub.com/faq' },
}

const FAQ_SECTIONS = [
  {
    heading: 'Mortgage Basics',
    questions: [
      {
        q: 'How is a monthly mortgage payment calculated?',
        a: 'Monthly P&I is calculated using the amortization formula: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P = loan amount, r = monthly interest rate (annual rate ÷ 12), n = total months. A $320,000 loan at 7% for 30 years gives: r = 0.07/12 = 0.005833, n = 360. M = 320,000 × (0.005833 × 1.005833^360) / (1.005833^360 − 1) = $2,129/month.',
      },
      {
        q: 'What is the difference between principal and interest?',
        a: 'Principal is the original loan amount. Interest is the fee charged by the lender, calculated monthly on your outstanding balance. In the early years of a mortgage, most of your payment is interest. Over time, as your balance decreases, more goes toward principal. This gradual shift is called amortization — by year 15 of a 30-year loan, roughly half your payment goes to principal.',
      },
      {
        q: 'What does PITI stand for?',
        a: 'PITI = Principal + Interest + Taxes + Insurance. It represents your total monthly housing cost. Principal and interest are determined by your loan terms. Taxes are your annual property taxes divided by 12. Insurance includes both homeowners insurance (required by lender) and PMI (required if your down payment is under 20%). PITI is the number lenders use when evaluating your debt-to-income ratio.',
      },
      {
        q: 'What is PMI and when can I remove it?',
        a: 'PMI (Private Mortgage Insurance) is required when your down payment is less than 20% of the home price. It typically costs 0.5%–1% of the loan amount annually. You can request removal once your loan balance reaches 80% of the original purchase price. Under the Homeowners Protection Act, lenders must automatically cancel PMI when your balance reaches 78% LTV. With extra payments or home appreciation, you may reach this milestone sooner.',
      },
      {
        q: 'What is LTV (loan-to-value)?',
        a: 'LTV is your mortgage balance divided by your home\'s value, expressed as a percentage. A $320,000 loan on a $400,000 home = 80% LTV. LTV affects your interest rate (lower LTV = better rate), PMI requirement (>80% LTV triggers PMI), and refinance eligibility. Lenders consider 80% LTV or below to be "conventional" — you own at least 20% of your home outright.',
      },
    ],
  },
  {
    heading: 'Payment Strategies',
    questions: [
      {
        q: 'Is it better to pay biweekly or monthly?',
        a: 'Biweekly payments save significant money. By paying half your monthly amount every two weeks, you make 26 payments per year — equivalent to 13 monthly payments. The extra payment accelerates principal paydown. On a $300,000 loan at 7% for 30 years: monthly = $350,000 total interest; biweekly saves approximately $58,000 in interest and pays off the loan 4–5 years early. Many banks offer biweekly programs — but watch for setup fees.',
      },
      {
        q: 'How does an extra payment reduce my mortgage?',
        a: 'Any extra payment goes directly to principal, which reduces your balance and all future interest calculations. On a $320,000 loan at 7%, an extra $200/month saves approximately $47,000 in interest and pays off the loan 4 years early. The earlier in your loan you make extra payments, the greater the compounding benefit. Even one extra payment per year at year 1 saves more than two extra payments at year 20.',
      },
    ],
  },
  {
    heading: 'Affordability & Qualification',
    questions: [
      {
        q: 'How much house can I afford on $80,000 salary?',
        a: 'On an $80,000 annual salary, most lenders apply the 28/36 rule. With 28% front-end ratio: $80,000 ÷ 12 × 28% = $1,867/month for housing. At 7% and 30 years, that supports a loan of approximately $280,000. With 20% down, your price range is ~$350,000. This assumes minimal other debts. Add a co-borrower\'s income to increase your limit. Use our Affordability Calculator for a personalized estimate.',
      },
      {
        q: 'What credit score do I need for a mortgage in 2026?',
        a: 'Conventional loans require 620+ (740+ for best rates). FHA loans accept 580+ with 3.5% down, or 500–579 with 10% down. VA loans have no official minimum but lenders typically require 620+. USDA loans require 640+. Your score affects your rate significantly: the difference between a 680 and 760 score on a $350,000 loan can cost an extra $50,000–$70,000 in total interest over 30 years.',
      },
      {
        q: 'What is a good interest rate for a mortgage in 2026?',
        a: 'In 2026, a 30-year fixed rate below 7% is considered competitive. The national average for 30-year fixed is approximately 6.9–7.1%. For 15-year fixed, a rate under 6.5% is good. Borrowers with 760+ credit scores, 20%+ down payments, and low DTI ratios typically get the best rates. Rate shopping is critical — getting quotes from 3+ lenders can save 0.25%–0.5%, worth $50–$150/month on a $300k loan.',
      },
    ],
  },
  {
    heading: 'Car Loans',
    questions: [
      {
        q: 'How does a car loan calculator work?',
        a: 'A car loan calculator uses the standard amortization formula with your vehicle price, down payment, trade-in value, sales tax, loan term, and APR. The formula is M = P[r(1+r)^n]/[(1+r)^n-1]. After calculating your monthly payment, it shows total interest paid and total cost. Our calculator also compares 48, 60, 72, and 84-month terms side by side so you can see the cost of longer terms.',
      },
      {
        q: 'What is a good car loan interest rate in 2026?',
        a: 'In 2026, a good new car loan rate for excellent credit (720+ score) is 5.5%–6.5% APR. Average rates are 7.5%–8.5% for good credit. Used car loans run 1–3% higher. Dealership financing is often more expensive than pre-arranged bank or credit union financing. Always get pre-approved before visiting a dealer — it gives you negotiating leverage and avoids dealer rate markup.',
      },
      {
        q: 'Is a 72-month car loan a bad idea?',
        a: 'Generally yes. A 72-month loan on a $35,000 car at 6.5% APR costs $7,230 in total interest vs. $4,800 for a 60-month loan — $2,430 extra for only an ~$80/month payment reduction. You\'re also likely "underwater" (owing more than the car is worth) for the first 3+ years due to rapid depreciation. Financial experts recommend keeping auto loans at 48–60 months maximum.',
      },
    ],
  },
  {
    heading: 'Reverse Mortgage',
    questions: [
      {
        q: 'What is a reverse mortgage and how does it work?',
        a: 'A HECM reverse mortgage lets homeowners 62+ convert home equity to cash without monthly payments. The bank pays you — as a lump sum, monthly payments, or line of credit. The loan balance grows over time and is repaid when you sell, move, or pass away. You must remain in the home as your primary residence and stay current on property taxes and insurance. HUD counseling is federally required before closing.',
      },
      {
        q: 'Who qualifies for a reverse mortgage?',
        a: 'To qualify for a HECM: youngest borrower must be 62+; the home must be your primary residence; you must have substantial equity (typically 50%+); complete HUD-approved counseling; have no delinquent federal debts; and the property must meet FHA minimum standards. Single-family homes, FHA-approved condos, and 1–4 unit properties (owner-occupied) qualify. Investment properties do not.',
      },
    ],
  },
  {
    heading: 'International Mortgages',
    questions: [
      {
        q: 'How does a Canadian mortgage differ from a US mortgage?',
        a: 'Key differences: Canadian mortgages have 5-year terms (renewable) vs. US 30-year fixed rates. Canada has a 25-year maximum amortization for insured mortgages. CMHC insurance is required for down payments under 20% (4% of mortgage for 5% down). The federal stress test requires qualifying at contract rate + 2%. Canadian mortgage interest is not tax deductible (unlike the US). Most Canadian mortgages are closed (prepayment penalties apply).',
      },
      {
        q: 'What is the CMHC stress test in Canada?',
        a: 'The stress test requires borrowers to prove they can afford payments at the higher of: their actual mortgage rate + 2%, or 5.25% (the regulatory floor). This applies to all federally regulated lenders for both insured (under 20% down) and uninsured (20%+ down) mortgages. If your rate is 5.5%, you qualify at 7.5%. This reduces the maximum mortgage you can get by approximately 20% compared to qualifying at your actual rate.',
      },
      {
        q: 'What is stamp duty in the UK?',
        a: 'Stamp Duty Land Tax (SDLT) is paid when buying property in England and Northern Ireland. Standard rates (2026): 0% on first £250,000; 5% on £250,001–£925,000; 10% on £925,001–£1.5 million; 12% above £1.5 million. First-time buyers pay 0% up to £425,000 and 5% on £425,001–£625,000. No relief above £625,000. Add 3% surcharge for second homes or buy-to-let. Scotland has Land and Buildings Transaction Tax (LBTT); Wales has Land Transaction Tax (LTT).',
      },
      {
        q: 'How do UK mortgage rates differ from US rates?',
        a: 'UK and US mortgage markets differ significantly. US borrowers can lock in a 30-year fixed rate. UK borrowers typically fix for 2 or 5 years, then remortgage. UK rates in 2026 range from ~4% (60% LTV, 5-year fix) to ~5.5–6% (95% LTV). The Bank of England base rate directly influences UK tracker mortgages. US rates follow the 10-year Treasury yield. UK rates are generally lower than US rates at equivalent LTV, but lack the US 30-year certainty.',
      },
    ],
  },
  {
    heading: 'Amortization',
    questions: [
      {
        q: 'What is an amortization schedule?',
        a: 'An amortization schedule is a complete table of all loan payments broken down by principal, interest, and remaining balance for each month. It shows how your loan is paid off over time. In early payments, most goes to interest; over time, more goes to principal. The schedule is useful for: seeing your exact balance at any point, calculating the impact of extra payments, understanding your equity buildup, and tax planning (mortgage interest deduction).',
      },
    ],
  },
]

const allQAs = FAQ_SECTIONS.flatMap((s) => s.questions)

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: allQAs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-site mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">Mortgage &amp; Loan Calculator FAQ</h1>
          <p className="text-lg text-secondary">Answers to the most common questions about mortgages, car loans, and more</p>
        </div>

        <div className="space-y-10">
          {FAQ_SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">{section.heading}</h2>
              <div className="space-y-6">
                {section.questions.map((item) => (
                  <div key={item.q} className="bg-white rounded-xl border border-border p-5">
                    <h3 className="text-sm font-semibold text-foreground mb-2">{item.q}</h3>
                    <p className="text-sm text-secondary leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10">
          <AdSlot slot="responsive" className="w-full" />
        </div>

        {/* Email capture */}
        <div className="mt-10 bg-white rounded-xl border border-border p-6 text-center">
          <h2 className="text-xl font-semibold mb-2">Get Weekly Mortgage Rate Alerts</h2>
          <p className="text-secondary text-sm mb-4">Stay updated when rates change. Free, unsubscribe anytime.</p>
          <form
            action="/api/subscribe"
            method="POST"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="flex-1 px-4 py-2.5 rounded-md border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              aria-label="Email address for rate alerts"
            />
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-white rounded-md text-sm font-medium hover:bg-primary-dark transition-colors"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs text-secondary mt-3">
            We respect your privacy. No spam. Unsubscribe at any time.
            See our <a href="/privacy" className="underline hover:text-primary">Privacy Policy</a>.
          </p>
        </div>

        <AdSlot slot="responsive" className="w-full mt-6" />
      </div>
    </>
  )
}
