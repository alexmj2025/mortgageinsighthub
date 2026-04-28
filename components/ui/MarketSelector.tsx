'use client'

export type Market = 'us' | 'ca' | 'uk'

interface MarketSelectorProps {
  value: Market
  onChange: (market: Market) => void
}

const MARKETS = [
  { id: 'us' as Market, label: 'US', flag: '🇺🇸', currency: 'USD' },
  { id: 'ca' as Market, label: 'Canada', flag: '🇨🇦', currency: 'CAD' },
  { id: 'uk' as Market, label: 'UK', flag: '🇬🇧', currency: 'GBP' },
]

export function MarketSelector({ value, onChange }: MarketSelectorProps) {
  return (
    <div
      className="flex rounded-lg border border-border overflow-hidden w-fit"
      role="group"
      aria-label="Select market"
    >
      {MARKETS.map((market) => (
        <button
          key={market.id}
          type="button"
          onClick={() => onChange(market.id)}
          aria-pressed={value === market.id}
          className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium transition-colors border-r border-border last:border-r-0 ${
            value === market.id
              ? 'bg-primary text-white'
              : 'bg-white text-secondary hover:bg-muted hover:text-foreground'
          }`}
        >
          <span>{market.flag}</span>
          <span>{market.label}</span>
        </button>
      ))}
    </div>
  )
}

export function getCurrencyForMarket(market: Market): 'USD' | 'CAD' | 'GBP' {
  const map: Record<Market, 'USD' | 'CAD' | 'GBP'> = { us: 'USD', ca: 'CAD', uk: 'GBP' }
  return map[market]
}

export function getCurrencySymbol(market: Market): string {
  const map: Record<Market, string> = { us: '$', ca: 'CAD$', uk: '£' }
  return map[market]
}
