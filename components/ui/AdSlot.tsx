'use client'

import { useEffect } from 'react'

const PUBLISHER_ID = 'ca-pub-8870870806520160'

// Add slot IDs here as you create them in AdSense → Ads → By ad unit → Display ads
const SLOT_IDS: Record<string, string> = {
  leaderboard:     '4012551750', // 728×90  ✓
  'mobile-banner': '2874729905', // 320×50  ✓
  rectangle:       'XXXXXXXXXX', // 336×280 — create in AdSense
  responsive:      'XXXXXXXXXX', // auto    — create in AdSense
  footer:          'XXXXXXXXXX', // 728×90  — create in AdSense
}

interface AdSlotProps {
  slot: keyof typeof SLOT_IDS
  className?: string
}

const SLOT_DIMENSIONS: Record<string, { width: number; height: number }> = {
  leaderboard:     { width: 728, height: 90 },
  'mobile-banner': { width: 320, height: 50 },
  rectangle:       { width: 336, height: 280 },
  responsive:      { width: 0,   height: 90 },
  footer:          { width: 728, height: 90 },
}

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  const dims = SLOT_DIMENSIONS[slot]
  const slotId = SLOT_IDS[slot]
  const isReady = slotId !== 'XXXXXXXXXX'
  const isResponsive = dims.width === 0

  useEffect(() => {
    if (!isReady) return
    try {
      // eslint-disable-next-line
      ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
      // eslint-disable-next-line
      ;(window as any).adsbygoogle.push({})
    } catch {
      // safe to ignore
    }
  }, [isReady])

  if (!isReady) {
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
        <span className="opacity-40">
          Ad — {isResponsive ? 'responsive' : `${dims.width}×${dims.height}`}
        </span>
      </div>
    )
  }

  return (
    <div
      className={`ad-slot ${className}`}
      style={{
        minWidth: dims.width > 0 ? dims.width : '100%',
        minHeight: dims.height,
        width: dims.width > 0 ? dims.width : '100%',
        maxWidth: '100%',
        display: 'block',
      }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
