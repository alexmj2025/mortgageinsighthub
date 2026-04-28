'use client'

import { useState } from 'react'
import { Share2, Check, Download } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

interface ShareResultProps {
  monthlyPayment: number
  homePrice: number
  currency?: 'USD' | 'CAD' | 'GBP'
}

export function ShareResult({ monthlyPayment, homePrice, currency = 'USD' }: ShareResultProps) {
  const [copied, setCopied] = useState(false)

  const domain = 'mortgageinsighthub.com'
  const fmt = (n: number) => formatCurrency(n, currency)

  function handleShare() {
    const text = `My monthly mortgage payment on a ${fmt(homePrice)} home is ${fmt(monthlyPayment)}.\nCalculate yours free at ${domain} #mortgage #realestate`

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {
      // Fallback for older browsers
      const el = document.createElement('textarea')
      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  function handleDownload() {
    window.print()
  }

  return (
    <div className="share-button flex gap-2">
      <button
        onClick={handleShare}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-secondary border border-border rounded-md hover:border-primary/50 hover:text-primary transition-colors"
        aria-label="Copy result to share"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4 text-accent-green" />
            <span className="text-accent-green">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-4 h-4" />
            Share result
          </>
        )}
      </button>

      <button
        onClick={handleDownload}
        className="export-button flex items-center gap-2 px-3 py-2 text-sm font-medium text-secondary border border-border rounded-md hover:border-primary/50 hover:text-primary transition-colors"
        aria-label="Download result as PDF"
      >
        <Download className="w-4 h-4" />
        Download PDF
      </button>
    </div>
  )
}
