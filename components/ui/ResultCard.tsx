'use client'

import { formatCurrency, formatDate } from '@/lib/utils'
import { ShieldCheck, Zap, BadgeCheck } from 'lucide-react'
import { ShareResult } from './ShareResult'
import { AffiliateCTA } from './AffiliateCTA'
import { PITIDonutChart } from './PITIDonutChart'

interface ResultCardProps {
  monthlyPI: number
  monthlyPITI: number
  monthlyPMI: number
  monthlyTax: number
  monthlyInsurance: number
  monthlyHOA: number
  totalInterest: number
  loanAmount: number
  homePrice: number
  downPayment: number
  annualRate: number
  payoffDate: Date
  ltv: number
  currency?: 'USD' | 'CAD' | 'GBP'
  extraMonthlyPayment?: number
  extraInterestSaved?: number
  extraMonthsSaved?: number
  extraPayoffDate?: Date
  calculatorType?: 'mortgage' | 'car' | 'reverse' | 'canada' | 'uk'
}

export function ResultCard({
  monthlyPI,
  monthlyPITI,
  monthlyPMI,
  monthlyTax,
  monthlyInsurance,
  monthlyHOA,
  totalInterest,
  loanAmount,
  homePrice,
  downPayment,
  annualRate,
  payoffDate,
  ltv,
  currency = 'USD',
  extraMonthlyPayment = 0,
  extraInterestSaved,
  extraMonthsSaved,
  extraPayoffDate,
  calculatorType = 'mortgage',
}: ResultCardProps) {
  const fmt = (n: number) => formatCurrency(n, currency)
  const downPct = ((downPayment / homePrice) * 100).toFixed(1)

  const hasTaxAndIns = monthlyTax > 0 || monthlyInsurance > 0
  const displayPayment = hasTaxAndIns ? monthlyPITI : monthlyPI
  const paymentLabel = hasTaxAndIns ? 'Monthly PITI Payment' : 'Monthly Payment (P&I)'
  const paymentSub = hasTaxAndIns
    ? 'Principal, interest, taxes & insurance'
    : 'Principal & interest only'

  const yearsRemaining = Math.round(
    (payoffDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 365)
  )

  return (
    <div
      className="bg-white rounded-xl border border-border shadow-md print-section"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Mortgage calculation result"
    >

      {/* ── 1. Hero payment number ── */}
      <div className="p-6 pb-5 text-center">
        <p className="text-sm font-medium text-secondary mb-1">{paymentLabel}</p>
        <p className="hero-number">{fmt(displayPayment)}</p>
        <p className="text-xs text-secondary mt-1">{paymentSub}</p>
      </div>

      {/* ── 2. Trust strip ── */}
      <div className="flex justify-center flex-wrap gap-x-5 gap-y-1.5 px-4 py-2.5 bg-muted/60 border-y border-border">
        <span className="flex items-center gap-1.5 text-xs text-secondary">
          <ShieldCheck className="w-3.5 h-3.5 text-accent-green flex-shrink-0" aria-hidden="true" />
          No signup required
        </span>
        <span className="flex items-center gap-1.5 text-xs text-secondary">
          <Zap className="w-3.5 h-3.5 text-primary flex-shrink-0" aria-hidden="true" />
          Instant calculation
        </span>
        <span className="flex items-center gap-1.5 text-xs text-secondary">
          <BadgeCheck className="w-3.5 h-3.5 text-accent-green flex-shrink-0" aria-hidden="true" />
          Free forever
        </span>
      </div>

      {/* ── 3. PITI Donut Chart ── */}
      <div className="p-6 pb-5 border-b border-border">
        <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-4">
          Monthly Payment Breakdown
        </p>
        <PITIDonutChart
          monthlyPI={monthlyPI}
          loanAmount={loanAmount}
          annualRate={annualRate}
          monthlyTax={monthlyTax}
          monthlyInsurance={monthlyInsurance}
          monthlyPMI={monthlyPMI}
          monthlyHOA={monthlyHOA}
          currency={currency}
        />
        <p className="text-[10px] text-secondary/60 mt-3 text-center">
          First-month breakdown · hover segments for details
        </p>
      </div>

      {/* ── 4. Four summary cards ── */}
      <div className="grid grid-cols-2 gap-px bg-border">
        <SummaryCard
          label="Monthly P&I"
          value={fmt(monthlyPI)}
          sub="Principal & interest"
        />
        <SummaryCard
          label="Total Interest"
          value={fmt(totalInterest)}
          sub="Over loan lifetime"
          valueClassName="text-accent-red"
        />
        <SummaryCard
          label="Loan Amount"
          value={fmt(loanAmount)}
          sub={`${downPct}% down`}
        />
        <SummaryCard
          label="Payoff Date"
          value={formatDate(payoffDate)}
          sub={`${yearsRemaining} yr${yearsRemaining !== 1 ? 's' : ''} remaining`}
        />
      </div>

      {/* ── 5. Loan summary ── */}
      <div className="px-6 py-5 border-b border-border">
        <p className="text-xs font-medium text-secondary mb-3 uppercase tracking-wide">
          Loan Summary
        </p>
        <dl className="space-y-1.5 text-sm">
          <SummaryRow label="Home Price"                 value={fmt(homePrice)} />
          <SummaryRow label={`Down Payment (${downPct}%)`} value={fmt(downPayment)} />
          <SummaryRow label="Loan Amount"                value={fmt(loanAmount)} />
          <SummaryRow label="Interest Rate"              value={`${annualRate.toFixed(2)}%`} />
          {monthlyPMI > 0 && (
            <SummaryRow
              label="LTV (PMI applies)"
              value={`${ltv.toFixed(1)}%`}
              className="text-accent-red"
            />
          )}
          {monthlyTax > 0 && (
            <SummaryRow label="Monthly Tax"      value={fmt(monthlyTax)} />
          )}
          {monthlyInsurance > 0 && (
            <SummaryRow label="Monthly Insurance" value={fmt(monthlyInsurance)} />
          )}
          {monthlyHOA > 0 && (
            <SummaryRow label="Monthly HOA"       value={fmt(monthlyHOA)} />
          )}
        </dl>
      </div>

      {/* ── 6. Extra payment impact ── */}
      {extraMonthlyPayment > 0 &&
        extraInterestSaved !== undefined &&
        extraMonthsSaved !== undefined &&
        extraPayoffDate && (
          <div className="mx-6 my-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-semibold text-accent-green mb-2">
              💡 With extra {fmt(extraMonthlyPayment)}/mo
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-secondary">Interest Saved</p>
                <p className="font-semibold text-accent-green">{fmt(extraInterestSaved)}</p>
              </div>
              <div>
                <p className="text-xs text-secondary">Pays Off</p>
                <p className="font-semibold text-accent-green">
                  {Math.floor(extraMonthsSaved / 12)}yr {extraMonthsSaved % 12}mo early
                </p>
              </div>
            </div>
            <p className="text-xs text-secondary mt-2">
              New payoff date: {formatDate(extraPayoffDate)}
            </p>
          </div>
        )}

      {/* ── 7. Share result ── */}
      <div className="px-6 pb-4">
        <ShareResult
          monthlyPayment={displayPayment}
          homePrice={homePrice}
          currency={currency}
        />
      </div>

      {/* ── 8. Affiliate CTA ── */}
      <div className="px-6 pb-6 border-t border-border pt-4">
        <AffiliateCTA type={calculatorType} />
      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SummaryCard({
  label,
  value,
  sub,
  valueClassName,
}: {
  label: string
  value: string
  sub: string
  valueClassName?: string
}) {
  return (
    <div className="bg-white p-4">
      <p className="text-xs text-secondary mb-1">{label}</p>
      <p className={`text-lg font-bold text-foreground ${valueClassName ?? ''}`}>{value}</p>
      <p className="text-xs text-secondary mt-0.5">{sub}</p>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  className,
}: {
  label: string
  value: string
  className?: string
}) {
  return (
    <div className="flex justify-between">
      <dt className="text-secondary">{label}</dt>
      <dd className={`font-medium text-foreground ${className ?? ''}`}>{value}</dd>
    </div>
  )
}
