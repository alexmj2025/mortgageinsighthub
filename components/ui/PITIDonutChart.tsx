'use client'

import { Suspense, lazy } from 'react'
import { formatCurrency } from '@/lib/utils'

// Lazy-load recharts (same pattern as AmortizationChart) to avoid SSR issues
const RechartsLoader = lazy(() =>
  import('recharts').then((mod) => ({ default: mod.ResponsiveContainer }))
)

export interface PITIDonutChartProps {
  monthlyPI: number        // combined principal + interest for first month
  loanAmount: number       // used to split first-month P vs I
  annualRate: number       // used to split first-month P vs I
  monthlyTax: number
  monthlyInsurance: number
  monthlyPMI: number
  monthlyHOA: number
  currency?: 'USD' | 'CAD' | 'GBP'
}

const SEGMENT_META = [
  { key: 'principal',  label: 'Principal',      color: '#1a56db' },
  { key: 'interest',   label: 'Interest',        color: '#f97316' },
  { key: 'tax',        label: 'Property Tax',    color: '#16a34a' },
  { key: 'insurance',  label: 'Home Insurance',  color: '#8b5cf6' },
  { key: 'pmi',        label: 'PMI',             color: '#ef4444' },
  { key: 'hoa',        label: 'HOA',             color: '#14b8a6' },
] as const

function ChartSkeleton() {
  return (
    <div className="w-full h-[180px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
      <span className="text-secondary text-sm">Loading chart…</span>
    </div>
  )
}

function DonutInner({
  monthlyPI,
  loanAmount,
  annualRate,
  monthlyTax,
  monthlyInsurance,
  monthlyPMI,
  monthlyHOA,
  currency = 'USD',
}: PITIDonutChartProps) {
  const fmt = (n: number) => formatCurrency(n, currency)

  // eslint-disable-next-line
  const { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } = require('recharts')

  // Split first-month payment into principal vs interest
  const monthlyRate = annualRate / 100 / 12
  const firstMonthInterest = loanAmount * monthlyRate
  const firstMonthPrincipal = Math.max(0, monthlyPI - firstMonthInterest)

  const rawSegments: Array<{ key: string; label: string; value: number; color: string }> = [
    { key: 'principal',  label: 'Principal',     value: firstMonthPrincipal, color: '#1a56db' },
    { key: 'interest',   label: 'Interest',       value: firstMonthInterest,  color: '#f97316' },
    { key: 'tax',        label: 'Property Tax',   value: monthlyTax,          color: '#16a34a' },
    { key: 'insurance',  label: 'Home Insurance', value: monthlyInsurance,    color: '#8b5cf6' },
    { key: 'pmi',        label: 'PMI',            value: monthlyPMI,          color: '#ef4444' },
    { key: 'hoa',        label: 'HOA',            value: monthlyHOA,          color: '#14b8a6' },
  ]

  const segments = rawSegments.filter((s) => s.value > 0.5) // filter negligible
  const total = segments.reduce((sum, s) => sum + s.value, 0)

  // Custom tooltip rendered inside recharts
  // eslint-disable-next-line
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number }> }) => {
    if (!active || !payload?.length) return null
    const entry = payload[0]
    return (
      <div className="bg-white border border-border rounded-lg shadow-lg px-3 py-2 text-sm">
        <p className="font-semibold text-foreground">{entry.name}</p>
        <p className="text-secondary">{fmt(entry.value)}<span className="text-xs">/mo</span></p>
        <p className="text-xs text-secondary mt-0.5">{((entry.value / total) * 100).toFixed(1)}% of payment</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-5">

      {/* ── Donut with centered total label ── */}
      <div className="relative w-[160px] h-[160px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={segments}
              dataKey="value"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              paddingAngle={segments.length > 1 ? 2 : 0}
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {segments.map((seg) => (
                <Cell key={seg.key} fill={seg.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label — absolutely positioned over the SVG */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-[17px] font-bold text-foreground leading-tight">
            {fmt(Math.round(total))}
          </span>
          <span className="text-[11px] text-secondary leading-tight">/month</span>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="flex-1 w-full space-y-2 min-w-0">
        {segments.map((seg) => {
          const pct = ((seg.value / total) * 100).toFixed(0)
          return (
            <div key={seg.key} className="flex items-center gap-2 text-sm">
              <span
                className="w-2.5 h-2.5 rounded-[3px] flex-shrink-0"
                style={{ backgroundColor: seg.color }}
                aria-hidden="true"
              />
              <span className="text-secondary flex-1 min-w-0 truncate text-xs sm:text-sm">
                {seg.label}
              </span>
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                {fmt(Math.round(seg.value))}
              </span>
              <span className="text-xs text-secondary w-7 text-right">{pct}%</span>
            </div>
          )
        })}

        {/* Divider + total row */}
        <div className="flex items-center gap-2 text-sm pt-1.5 border-t border-border">
          <span className="w-2.5 flex-shrink-0" />
          <span className="text-secondary flex-1 text-xs sm:text-sm font-medium">Total / month</span>
          <span className="font-bold text-foreground text-xs sm:text-sm">{fmt(Math.round(total))}</span>
          <span className="w-7" />
        </div>
      </div>
    </div>
  )
}

export function PITIDonutChart(props: PITIDonutChartProps) {
  return (
    <Suspense fallback={<ChartSkeleton />}>
      {/* Renders ResponsiveContainer to trigger recharts bundle load */}
      <RechartsLoader>
        <span className="hidden" />
      </RechartsLoader>
      <DonutInner {...props} />
    </Suspense>
  )
}
