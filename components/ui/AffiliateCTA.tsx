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
      label: 'Get Pre-Approved — Free',
      sub: '3-minute online application',
      href: '#affiliate-rocket',
      emoji: '⚡',
    },
    {
      label: 'Compare Rates from 50+ Lenders',
      sub: 'Find the lowest rate for your situation',
      href: '#affiliate-lendingtree',
      emoji: '🏦',
    },
    {
      label: 'First-Time Buyer? FHA Options',
      sub: 'Low down payment, flexible credit',
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

  /* ── Mortgage: prominent two-button layout ── */
  if (type === 'mortgage') {
    const [primary, secondary, tertiary] = ctas
    return (
      <div className="space-y-2.5">
        <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">
          Ready to take the next step?
        </p>

        {/* Primary CTA — solid blue */}
        <a
          href={primary.href}
          className="flex items-center justify-between w-full px-4 py-3 bg-primary hover:bg-[#1e429f] text-white font-semibold text-sm rounded-lg transition-colors shadow-sm group"
          rel="noopener noreferrer sponsored"
        >
          <span className="flex items-center gap-2">
            <span className="text-base">{primary.emoji}</span>
            <span>{primary.label}</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 flex-shrink-0" />
        </a>

        {/* Secondary CTA — outlined */}
        <a
          href={secondary.href}
          className="flex items-center justify-between w-full px-4 py-3 bg-white hover:bg-muted border border-border hover:border-primary/40 text-foreground font-medium text-sm rounded-lg transition-colors group"
          rel="noopener noreferrer sponsored"
        >
          <span className="flex items-center gap-2">
            <span className="text-base">{secondary.emoji}</span>
            <span className="group-hover:text-primary transition-colors">{secondary.label}</span>
          </span>
          <ExternalLink className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
        </a>

        {/* Confidence note */}
        <p className="text-xs text-center text-secondary py-0.5">
          ★ Rates as low as <strong>6.25%</strong> today · No hard credit pull
        </p>

        {/* Tertiary — text link */}
        {tertiary && (
          <a
            href={tertiary.href}
            className="flex items-center gap-2 w-full px-2 py-1.5 text-xs text-secondary hover:text-primary rounded transition-colors"
            rel="noopener noreferrer sponsored"
          >
            <span>{tertiary.emoji}</span>
            <span>{tertiary.label} — {tertiary.sub}</span>
            <ExternalLink className="w-3 h-3 ml-auto flex-shrink-0 opacity-50" />
          </a>
        )}

        <p className="text-[10px] text-secondary/50 text-center pt-0.5">
          Sponsored links. We may earn a commission at no cost to you.
        </p>
      </div>
    )
  }

  /* ── All other types: compact card grid ── */
  return (
    <div className="affiliate-cta">
      <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-3">
        Ready to apply?
      </p>
      <div
        className={`grid gap-2 ${
          ctas.length >= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'
        }`}
      >
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
