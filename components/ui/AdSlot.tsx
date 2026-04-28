'use client'

// Replace data-ad-client with your AdSense publisher ID when approved
// Slot dimensions are pre-set to prevent CLS

interface AdSlotProps {
  slot: 'leaderboard' | 'mobile-banner' | 'rectangle' | 'responsive' | 'footer'
  className?: string
}

const SLOT_DIMENSIONS: Record<AdSlotProps['slot'], { width: number; height: number }> = {
  leaderboard: { width: 728, height: 90 },
  'mobile-banner': { width: 320, height: 50 },
  rectangle: { width: 336, height: 280 },
  responsive: { width: 0, height: 90 },
  footer: { width: 728, height: 90 },
}

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  const dims = SLOT_DIMENSIONS[slot]

  return (
    <div
      className={`ad-slot flex items-center justify-center bg-muted border border-dashed border-border rounded text-xs text-secondary ${className}`}
      style={{
        minWidth: dims.width > 0 ? dims.width : '100%',
        minHeight: dims.height,
        width: dims.width > 0 ? dims.width : '100%',
        maxWidth: '100%',
      }}
      aria-hidden="true"
    >
      {/* AdSense ad unit — replace publisher ID and slot ID below */}
      {/*
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: dims.width || '100%', height: dims.height }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot="XXXXXXXXXX"
        data-ad-format={dims.width === 0 ? 'auto' : undefined}
        data-full-width-responsive={dims.width === 0 ? 'true' : undefined}
      />
      */}
      <span className="opacity-50">Ad — {dims.width > 0 ? `${dims.width}×${dims.height}` : 'responsive'}</span>
    </div>
  )
}
