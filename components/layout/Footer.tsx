import Link from 'next/link'

const calculatorLinks = [
  { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
  { href: '/car-loan-calculator', label: 'Car Loan Calculator' },
  { href: '/auto-loan-calculator', label: 'Auto Loan Calculator' },
  { href: '/reverse-mortgage-calculator', label: 'Reverse Mortgage Calculator' },
  { href: '/mortgage-calculator-canada', label: 'Canada Mortgage Calculator' },
  { href: '/mortgage-calculator-uk', label: 'UK Mortgage Calculator' },
  { href: '/biweekly-mortgage-calculator', label: 'Biweekly Mortgage Calculator' },
  { href: '/affordability-calculator', label: 'Affordability Calculator' },
  { href: '/mortgage-refinance-calculator', label: 'Refinance Calculator' },
  { href: '/amortization-schedule', label: 'Amortization Schedule' },
]

const infoLinks = [
  { href: '/faq', label: 'FAQ' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/privacy', label: 'Privacy Policy' },
]

export function Footer() {
  return (
    <footer className="bg-white border-t border-border mt-16">
      <div className="max-w-site mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Calculator links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Calculators
            </h3>
            <ul className="space-y-2">
              {calculatorLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer + info links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">
              Information
            </h3>
            <ul className="space-y-2 mb-6">
              {infoLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="bg-muted rounded-lg p-4">
              <p className="text-xs text-secondary leading-relaxed">
                <strong className="text-foreground">Disclaimer:</strong> Results are estimates
                for educational purposes only. Consult a licensed mortgage professional for
                personalized advice. Rates shown are averages and may not reflect your
                specific situation. MortgageInsightHub is not a lender or financial advisor.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-secondary">
            © {new Date().getFullYear()} MortgageInsightHub.com — Free Mortgage &amp; Loan Calculators
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-secondary hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/how-it-works" className="text-xs text-secondary hover:text-primary">
              How It Works
            </Link>
            <Link href="/faq" className="text-xs text-secondary hover:text-primary">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
