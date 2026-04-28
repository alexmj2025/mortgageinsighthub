'use client'

import { useState } from 'react'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { AmortizationRow } from '@/lib/calculations/amortization'
import { ChevronDown, Download } from 'lucide-react'

interface AmortizationTableProps {
  rows: AmortizationRow[]
  currency?: 'USD' | 'CAD' | 'GBP'
}

export function AmortizationTable({ rows, currency = 'USD' }: AmortizationTableProps) {
  const [showAll, setShowAll] = useState(false)
  const fmt = (n: number) => formatCurrency(n, currency)

  const displayRows = showAll ? rows : rows.slice(0, 12)

  function exportCSV() {
    const headers = ['Month', 'Date', 'Payment', 'Principal', 'Interest', 'Balance', 'Cumulative Interest']
    const csvRows = rows.map((r) => [
      r.month,
      formatDate(r.date),
      r.payment.toFixed(2),
      r.principal.toFixed(2),
      r.interest.toFixed(2),
      r.balance.toFixed(2),
      r.cumulativeInterest.toFixed(2),
    ])

    const csv = [headers, ...csvRows].map((row) => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'amortization-schedule.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Amortization Schedule</h3>
        <button
          onClick={exportCSV}
          className="export-button flex items-center gap-1.5 text-xs text-secondary hover:text-primary border border-border rounded px-2.5 py-1.5 transition-colors"
          aria-label="Export amortization schedule as CSV"
        >
          <Download className="w-3.5 h-3.5" />
          CSV Export
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-xs" aria-label="Monthly amortization schedule">
          <thead>
            <tr className="bg-muted border-b border-border">
              <th className="px-3 py-2.5 text-left font-medium text-secondary">Month</th>
              <th className="px-3 py-2.5 text-left font-medium text-secondary hidden sm:table-cell">Date</th>
              <th className="px-3 py-2.5 text-right font-medium text-secondary">Payment</th>
              <th className="px-3 py-2.5 text-right font-medium text-secondary">Principal</th>
              <th className="px-3 py-2.5 text-right font-medium text-secondary">Interest</th>
              <th className="px-3 py-2.5 text-right font-medium text-secondary">Balance</th>
            </tr>
          </thead>
          <tbody>
            {displayRows.map((row, i) => (
              <tr
                key={row.month}
                className={`border-b border-border last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-muted/30'}`}
              >
                <td className="px-3 py-2 text-secondary">{row.month}</td>
                <td className="px-3 py-2 text-secondary hidden sm:table-cell">
                  {row.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </td>
                <td className="px-3 py-2 text-right font-medium text-foreground">
                  {fmt(row.payment)}
                </td>
                <td className="px-3 py-2 text-right text-primary">{fmt(row.principal)}</td>
                <td className="px-3 py-2 text-right text-accent-red">{fmt(row.interest)}</td>
                <td className="px-3 py-2 text-right font-medium text-foreground">
                  {fmt(row.balance)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length > 12 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full flex items-center justify-center gap-2 text-sm text-secondary hover:text-primary border border-border rounded-md py-2.5 transition-colors"
          aria-expanded={showAll}
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
          {showAll ? 'Show less' : `Show all ${rows.length} months`}
        </button>
      )}
    </div>
  )
}
