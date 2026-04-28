'use client'

import { Suspense, lazy, useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import type { YearlyAmortizationRow } from '@/lib/calculations/amortization'

const RechartsComponents = lazy(() =>
  import('recharts').then((mod) => ({
    default: mod.ResponsiveContainer,
  }))
)

interface AmortizationChartProps {
  yearlyRows: YearlyAmortizationRow[]
  loanAmount: number
  crossoverMonth: number
  currency?: 'USD' | 'CAD' | 'GBP'
}

function ChartSkeleton() {
  return (
    <div className="w-full h-[280px] bg-muted animate-pulse rounded-lg flex items-center justify-center">
      <span className="text-secondary text-sm">Loading chart…</span>
    </div>
  )
}

function ChartInner({
  yearlyRows,
  loanAmount,
  currency = 'USD',
}: {
  yearlyRows: YearlyAmortizationRow[]
  loanAmount: number
  crossoverMonth: number
  currency: 'USD' | 'CAD' | 'GBP'
}) {
  const fmt = (n: number) => formatCurrency(n, currency, true)

  const {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ReferenceLine,
  } = require('recharts')

  const crossoverYear = yearlyRows.findIndex((r) => r.cumulativeInterest >= loanAmount - r.balance)

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={yearlyRows} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis
          dataKey="year"
          tick={{ fontSize: 12, fill: '#475569' }}
          label={{ value: 'Year', position: 'insideBottom', offset: -4, fill: '#475569', fontSize: 12 }}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#475569' }}
          tickFormatter={(v: number) => fmt(v)}
          width={70}
        />
        <Tooltip
          formatter={(value: number, name: string) => [fmt(value), name]}
          labelFormatter={(label: number) => `Year ${label}`}
          contentStyle={{ fontSize: 13, borderRadius: 8, border: '1px solid #e2e8f0' }}
        />
        <Legend wrapperStyle={{ fontSize: 13 }} />
        <Line
          type="monotone"
          dataKey="balance"
          name="Principal Balance"
          stroke="#1a56db"
          strokeWidth={2}
          dot={false}
        />
        <Line
          type="monotone"
          dataKey="cumulativeInterest"
          name="Cumulative Interest"
          stroke="#dc2626"
          strokeWidth={2}
          dot={false}
        />
        {crossoverYear > 0 && (
          <ReferenceLine
            x={crossoverYear + 1}
            stroke="#16a34a"
            strokeDasharray="4 4"
            label={{ value: 'Crossover', position: 'top', fill: '#16a34a', fontSize: 11 }}
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  )
}

export function AmortizationChart({
  yearlyRows,
  loanAmount,
  crossoverMonth,
  currency = 'USD',
}: AmortizationChartProps) {
  const [view, setView] = useState<'yearly' | 'monthly'>('yearly')

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-foreground">Balance vs. Interest Over Time</p>
        <div className="flex rounded border border-border overflow-hidden text-xs">
          <button
            onClick={() => setView('yearly')}
            className={`px-3 py-1.5 transition-colors ${view === 'yearly' ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-muted'}`}
          >
            Yearly
          </button>
          <button
            onClick={() => setView('monthly')}
            className={`px-3 py-1.5 border-l border-border transition-colors ${view === 'monthly' ? 'bg-primary text-white' : 'bg-white text-secondary hover:bg-muted'}`}
          >
            Monthly
          </button>
        </div>
      </div>

      <Suspense fallback={<ChartSkeleton />}>
        <RechartsComponents>
          {/* This wrapper triggers the lazy import */}
          <span className="hidden" />
        </RechartsComponents>
        <ChartInner
          yearlyRows={yearlyRows}
          loanAmount={loanAmount}
          crossoverMonth={crossoverMonth}
          currency={currency}
        />
      </Suspense>

      <div className="flex gap-4 text-xs text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-primary rounded inline-block" />
          Principal Balance
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-accent-red rounded inline-block" />
          Cumulative Interest
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-accent-green rounded inline-block border-dashed" />
          Crossover Point
        </span>
      </div>
    </div>
  )
}
