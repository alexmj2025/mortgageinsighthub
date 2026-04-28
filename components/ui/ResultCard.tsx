'use client'

import { formatCurrency, formatDate } from '@/lib/utils'
import { ShareResult } from './ShareResult'
import { AffiliateCTA } from './AffiliateCTA'

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
  const principalRatio = loanAmount / (loanAmount + totalInterest)
  const interestRatio = 1 - principalRatio

  const hasTaxAndIns = monthlyTax > 0 || monthlyInsurance > 0

  return (
    <div
      className="bg-white rounded-xl border border-border shadow-md print-section"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Mortgage calculation result"
    >
      {/* Hero payment number */}
      <div className="p-6 pb-4 border-b border-border text-center">
        <p className="text-sm font-medium text-secondary mb-1">
          {hasTaxAndIns ? 'Monthly PITI Payment' : 'Monthly Payment'}
        </p>
        <p className="hero-number">
          {fmt(hasTaxAndIns ? monthlyPITI : monthlyPI)}
        </p>
        <p className="text-xs text-secondary mt-1">
          {hasTaxAndIns
            ? 'Includes principal, interest, taxes & insurance'
            : 'Principal & interest'}
        </p>
      </div>

      {/* 4 summary cards */}
      <div className="grid grid-cols-2 gap-px bg-border">
        <SummaryCard
          label="Monthly P&I"
          value={fmt(monthlyPI)}
          sub="Principal & interest only"
        />
        <SummaryCard
          label="Monthly PITI"
          value={fmt(monthlyPITI)}
          sub={monthlyPMI > 0 ? `Incl. ${fmt(monthlyPMI)} PMI` : 'Full monthly cost'}
        />
        <SummaryCard
          label="Total Interest"
          value={fmt(totalInterest)}
          sub="Over loan lifetime"
          valueClassName="text-accent-red"
        />
        <SummaryCard
          label="Payoff Date"
          value={formatDate(payoffDate)}
          sub={`${Math.round((payoffDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 365))} years remaining`}
        />
      </div>

      {/* Visual breakdown bar */}
      <div className="p-6 pb-4">
        <p className="text-xs font-medium text-secondary mb-2 uppercase tracking-wide">
          Payment Breakdown
        </p>
        <div className="flex rounded overflow-hidden h-6 mb-2" role="img" aria-label={`Principal ${(principalRatio * 100).toFixed(0)}%, Interest ${(interestRatio * 100).toFixed(0)}%`}>
          <div
            className="bg-primary flex items-center justify-center text-xs text-white font-medium"
            style={{ width: `${principalRatio * 100}%` }}
            title={`Principal: ${fmt(loanAmount)}`}
          >
            {(principalRatio * 100).toFixed(0)}%
          </div>
          <div
            className="bg-accent-red flex items-center justify-center text-xs text-white font-medium"
            style={{ width: `${interestRatio * 100}%` }}
            title={`Interest: ${fmt(totalInterest)}`}
          >
            {(interestRatio * 100).toFixed(0)}%
          </div>
        </div>
        <div className="flex justify-between text-xs text-secondary">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-primary inline-block" />
            Principal {fmt(loanAmount)}
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-accent-red inline-block" />
            Interest {fmt(totalInterest)}
          </span>
        </div>
      </div>

      {/* Loan summary */}
      <div className="px-6 pb-4">
        <p className="text-xs font-medium text-secondary mb-2 uppercase tracking-wide">
          Loan Summary
        </p>
        <dl className="space-y-1.5 text-sm">
          <SummaryRow label="Home Price" value={fmt(homePrice)} />
          <SummaryRow label={`Down Payment (${downPct}%)`} value={fmt(downPayment)} />
          <SummaryRow label="Loan Amount" value={fmt(loanAmount)} />
          <SummaryRow label="Interest Rate" value={`${annualRate.toFixed(2)}%`} />
          {monthlyPMI > 0 && (
            <SummaryRow label="LTV (PMI applies)" value={`${ltv.toFixed(1)}%`} className="text-accent-red" />
          )}
          {monthlyTax > 0 && (
            <SummaryRow label="Monthly Property Tax" value={fmt(monthlyTax)} />
          )}
          {monthlyInsurance > 0 && (
            <SummaryRow label="Monthly Insurance" value={fmt(monthlyInsurance)} />
          )}
          {monthlyHOA > 0 && (
            <SummaryRow label="Monthly HOA" value={fmt(monthlyHOA)} />
          )}
        </dl>
      </div>

      {/* Extra payment impact */}
      {extraMonthlyPayment > 0 && extraInterestSaved !== undefined && extraMonthsSaved !== undefined && extraPayoffDate && (
        <div className="mx-6 mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-semibold text-accent-green mb-2">
            With extra {fmt(extraMonthlyPayment)}/mo
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

      {/* Share result */}
      <div className="px-6 pb-4">
        <ShareResult
          monthlyPayment={hasTaxAndIns ? monthlyPITI : monthlyPI}
          homePrice={homePrice}
          currency={currency}
        />
      </div>

      {/* Affiliate CTAs */}
      <div className="px-6 pb-6">
        <AffiliateCTA type={calculatorType} />
      </div>
    </div>
  )
}

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
