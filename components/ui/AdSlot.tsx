'use client'

import { useEffect, useRef } from 'react'

// Publisher ID — already added to layout.tsx head
const PUBLISHER_ID = 'ca-pub-8870870806520160'

// ─── FILL THESE IN from AdSense dashboard → Ads → By ad unit → Display ads ───
// Create one ad unit per format, copy the data-ad-slot number here.
const SLOT_IDS: Record<string, string> = {
  leaderboard:    'XXXXXXXXXX', // 728×90  — leaderboard
  'mobile-banner':'XXXXXXXXXX', // 320×50  — mobile banner
  rectangle:      'XXXXXXXXXX', // 336×280 — rectangle
  responsive:     'XXXXXXXXXX', // responsive
  footer:         'XXXXXXXXXX', // 728×90  — footer
}
// ──────────────────────────────────────────────────────────────────────────────

interface AdSlotProps {
  slot: keyof typeof SLOT_IDS
  className?: string
}

const SLOT_DIMENSIONS: Record<string, { width: number; height: number }> = {
  leaderboard:    { width: 728, height: 90 },
  'mobile-banner':{ width: 320, height: 50 },
  rectangle:      { width: 336, height: 280 },
  responsive:     { width: 0,   height: 90 },
  footer:         { width: 728, height: 90 },
}

// Are the real slot IDs filled in yet?
const ADSENSE_READY = Object.values(SLOT_IDS).every((id) => id !== 'XXXXXXXXXX')

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  const insRef = useRef<HTMLModElement>(null)
  const dims = SLOT_DIMENSIONS[slot]
  const slotId = SLOT_IDS[slot]
  const isResponsive = dims.width === 0

  useEffect(() => {
    if (!ADSENSE_READY) return
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    } catch {
      // adsbygoogle not loaded yet — safe to ignore
    }
  }, [])

  // Show placeholder until AdSense is approved + slot IDs are filled in
  if (!ADSENSE_READY) {
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
        ref={insRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          width: isResponsive ? '100%' : dims.width,
          height: dims.height,
        }}
        data-ad-client={PUBLISHER_ID}
        data-ad-slot={slotId}
        {...(isResponsive && {
          'data-ad-format': 'auto',
          'data-full-width-responsive': 'true',
        })}
      />
    </div>
  )
}
