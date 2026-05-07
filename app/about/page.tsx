import type { Metadata } from 'next'
import Link from 'next/link'
import { Calculator, Shield, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us — MortgageInsightHub',
  description:
    'Learn about MortgageInsightHub — our mission to give every home buyer free, accurate mortgage calculators with no signup required.',
  alternates: { canonical: 'https://mortgageinsighthub.com/about' },
}

const values = [
  {
    icon: Calculator,
    title: 'Accurate Calculations',
    body: 'Every calculator uses the same industry-standard formulas that lenders use — standard amortization, CMHC insurance tiers, HECM Principal Limit Factors, and UK Stamp Duty Land Tax. No shortcuts, no approximations.',
  },
  {
    icon: Shield,
    title: 'No Personal Data Required',
    body: 'You never need to create an account, enter your name, email, or credit score. All calculations happen instantly in your browser. We do not store any inputs you enter.',
  },
  {
    icon: TrendingUp,
    title: 'Up-to-Date Rate Defaults',
    body: 'We review and update default interest rates regularly to reflect current market conditions in the US, Canada, and the UK, so your estimates start from a realistic baseline.',
  },
  {
    icon: Users,
    title: 'Built for Everyone',
    body: 'Whether you are a first-time buyer, refinancing, comparing biweekly payments, or exploring a reverse mortgage, our tools cover the full home-financing journey — free of charge.',
  },
]

export default function AboutPage() {
  return (
    <div className="max-w-site mx-auto px-6 py-12 md:py-16">

      {/* Hero */}
      <div className="max-w-2xl mb-12">
        <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">About Us</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Free mortgage tools — no signup, no strings attached
        </h1>
        <p className="text-lg text-secondary leading-relaxed">
          MortgageInsightHub was built with one goal: give every person considering a home loan
          the same quality of calculation that mortgage professionals use, completely free and
          without requiring any personal information.
        </p>
      </div>

      {/* Mission */}
      <section className="bg-white border border-border rounded-xl p-8 mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-4">Our Mission</h2>
        <p className="text-secondary leading-relaxed mb-4">
          Buying a home is likely the largest financial decision of your life. Yet most people
          walk into lender conversations without a clear picture of what their monthly payment
          will actually be — or how much of that payment goes to interest versus principal,
          taxes, and insurance.
        </p>
        <p className="text-secondary leading-relaxed mb-4">
          We built MortgageInsightHub to close that information gap. Our calculators cover
          standard US mortgages, Canadian mortgages with CMHC insurance, UK mortgages with Stamp
          Duty Land Tax, car loans, reverse mortgages (HECM), affordability analysis, biweekly
          payment comparisons, and full amortization schedules.
        </p>
        <p className="text-secondary leading-relaxed">
          All calculations follow the same mathematical formulas that banks and mortgage brokers
          use. We publish our methodology transparently so you can verify every number.
        </p>
      </section>

      {/* Values grid */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold text-foreground mb-6">What We Stand For</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white border border-border rounded-xl p-6 flex gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <v.icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{v.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Calculators we offer */}
      <section className="bg-muted/60 border border-border rounded-xl p-8 mb-10">
        <h2 className="text-xl font-semibold text-foreground mb-4">Calculators We Offer</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-secondary">
          {[
            ['Mortgage Calculator (US)', '/mortgage-calculator'],
            ['Mortgage Calculator (Canada)', '/mortgage-calculator-canada'],
            ['Mortgage Calculator (UK)', '/mortgage-calculator-uk'],
            ['Car Loan Calculator', '/car-loan-calculator'],
            ['Reverse Mortgage Calculator', '/reverse-mortgage-calculator'],
            ['Biweekly Mortgage Calculator', '/biweekly-mortgage-calculator'],
            ['Affordability Calculator', '/affordability-calculator'],
            ['Refinance Calculator', '/mortgage-refinance-calculator'],
            ['Amortization Schedule', '/amortization-schedule'],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="hover:text-primary transition-colors">
                → {label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Disclaimer */}
      <section className="border-l-4 border-primary/30 pl-5 mb-10">
        <h2 className="text-base font-semibold text-foreground mb-2">Important Disclaimer</h2>
        <p className="text-sm text-secondary leading-relaxed">
          MortgageInsightHub is an independent educational resource and is <strong>not a lender,
          mortgage broker, or financial advisor</strong>. All results are estimates for
          illustrative purposes only. Actual loan terms, payments, and eligibility depend on your
          lender, credit profile, location, and current market conditions. Always consult a
          licensed mortgage professional before making financial decisions.
        </p>
      </section>

      {/* Contact CTA */}
      <div className="text-center bg-white border border-border rounded-xl p-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">Questions or Feedback?</h2>
        <p className="text-secondary text-sm mb-4">
          We read every message and use your feedback to improve our calculators.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-[#1e429f] transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  )
}
