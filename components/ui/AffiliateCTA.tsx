import { ExternalLink } from 'lucide-react'

interface AffiliateCTAProps {
  type: 'mortgage' | 'car' | 'reverse' | 'canada' | 'uk'
}

interface CTAItem {
  label: string
  sub: string
  href: string
  emoji: string
}

const CTA_MAP: Record<AffiliateCTAProps['type'], CTAItem[]> = {
  mortgage: [
    {
      label: 'Compare Today\'s Rates',
      sub: 'See rates from 50+ lenders',
      href: '#affiliate-lendingtree',
      emoji: '🏦',
    },
    {
      label: 'Get Pre-Approved Fast',
      sub: '3-minute online application',
      href: '#affiliate-rocket',
      emoji: '⚡',
    },
    {
      label: 'First-Time Buyer? FHA Rates',
      sub: 'Low down payment options',
      href: '#affiliate-credible',
      emoji: '🏠',
    },
  ],
  car: [
    {
      label: 'Compare Auto Loan Rates',
      sub: 'Find the best APR for your car',
      href: '#affiliate-lendingtree-auto',
      emoji: '🚗',
    },
    {
      label: 'Refinance Your Car Loan',
      sub: 'Lower your monthly payment',
      href: '#affiliate-autopay',
      emoji: '💰',
    },
  ],
  reverse: [
    {
      label: 'HUD-Approved Counselor',
      sub: 'Free, confidential counseling',
      href: '#affiliate-nrmla',
      emoji: '🤝',
    },
    {
      label: 'Get a Free Quote',
      sub: 'No obligation estimate',
      href: '#affiliate-aag',
      emoji: '📋',
    },
  ],
  canada: [
    {
      label: 'Compare Canadian Rates',
      sub: 'Best rates by province',
      href: '#affiliate-ratehub-ca',
      emoji: '🇨🇦',
    },
  ],
  uk: [
    {
      label: 'Compare UK Mortgage Rates',
      sub: 'Find the best deal for you',
      href: '#affiliate-moneysupermarket-uk',
      emoji: '🇬🇧',
    },
  ],
}

export function AffiliateCTA({ type }: AffiliateCTAProps) {
  const ctas = CTA_MAP[type]

  return (
    <div className="affiliate-cta">
      <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-3">
        Ready to apply?
      </p>
      <div className={`grid gap-2 ${ctas.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {ctas.map((cta) => (
          <a
            key={cta.href}
            href={cta.href}
            className="flex items-start gap-2 p-3 rounded-lg border border-border bg-muted hover:bg-white hover:border-primary/50 hover:shadow-sm transition-all group"
            rel="noopener noreferrer sponsored"
          >
            <span className="text-xl leading-none mt-0.5 flex-shrink-0">{cta.emoji}</span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                {cta.label}
              </p>
              <p className="text-xs text-secondary mt-0.5">{cta.sub}</p>
            </div>
            <ExternalLink className="w-3 h-3 text-secondary flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
      <p className="text-xs text-secondary mt-2 opacity-60">
        Sponsored links. We may earn a commission.
      </p>
    </div>
  )
}
