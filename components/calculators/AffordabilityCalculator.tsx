'use client'

import { useState, useMemo } from 'react'
import { calculateAffordability } from '@/lib/calculations/affordability'
import { CurrencyInput, RateInput, TermButtons } from '@/components/ui/CurrencyInput'
import { AdSlot } from '@/components/ui/AdSlot'
import { AffiliateCTA } from '@/components/ui/AffiliateCTA'
import { formatCurrency } from '@/lib/utils'
import { CheckCircle, AlertCircle } from 'lucide-react'

export function AffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState(100000)
  const [monthlyDebts, setMonthlyDebts] = useState(500)
  const [downPayment, setDownPayment] = useState(60000)
  const [annualRate, setAnnualRate] = useState(7.0)
  const [loanTerm, setLoanTerm] = useState(30)
  const [annualTax, setAnnualTax] = useState(4800)
  const [annualInsurance, setAnnualInsurance] = useState(1200)
  const [monthlyHOA, setMonthlyHOA] = useState(0)

  const fmt = (n: number) => formatCurrency(n, 'USD')

  const result = useMemo(() => {
    if (annualIncome <= 0) return null
    return calculateAffordability({
      annualIncome,
      monthlyDebts,
      downPayment,
      annualRate,
      loanTermYears: loanTerm,
      annualPropertyTax: annualTax,
      annualInsurance,
      monthlyHOA,
    })
  }, [annualIncome, monthlyDebts, downPayment, annualRate, loanTerm, annualTax, annualInsurance, monthlyHOA])

  return (
    <div>
      <div className="hidden lg:flex justify-center mb-4 no-print">
        <AdSlot slot="leaderboard" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-6 items-start">
        <div className="space-y-5 bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold">Your Financial Information</h2>

          <CurrencyInput
            id="annual-income"
            label="Annual Gross Income"
            value={annualIncome}
            onChange={setAnnualIncome}
            currency="$"
            hint="Before taxes — include all income sources"
          />

          <CurrencyInput
            id="monthly-debts"
            label="Monthly Debt Payments"
            value={monthlyDebts}
            onChange={setMonthlyDebts}
            currency="$"
            hint="Car loans, student loans, credit cards (min payments)"
          />

          <CurrencyInput
            id="down-payment-afford"
            label="Down Payment Available"
            value={downPayment}
            onChange={setDownPayment}
            currency="$"
          />

          <RateInput
            id="rate-afford"
            label="Expected Interest Rate"
            value={annualRate}
            onChange={setAnnualRate}
          />

          <TermButtons
            id="term-afford"
            label="Loan Term"
            value={loanTerm}
            options={[15, 20, 30]}
            onChange={setLoanTerm}
          />

          <div className="border-t border-border pt-4 space-y-4">
            <p className="text-sm font-medium text-secondary">Optional — improves accuracy</p>
            <CurrencyInput id="tax-afford" label="Annual Property Tax" value={annualTax} onChange={setAnnualTax} currency="$" />
            <CurrencyInput id="ins-afford" label="Annual Insurance" value={annualInsurance} onChange={setAnnualInsurance} currency="$" />
            <CurrencyInput id="hoa-afford" label="Monthly HOA" value={monthlyHOA} onChange={setMonthlyHOA} currency="$" />
          </div>
        </div>

        <div className="lg:sticky lg:top-20 space-y-4">
          {result ? (
            <div className="bg-white rounded-xl border border-border shadow-md" aria-live="polite" aria-atomic="true">
              <div className="p-6 pb-4 border-b border-border text-center">
                <p className="text-sm font-medium text-secondary mb-1">You Can Afford Up To</p>
                <p className="hero-number">{fmt(result.maxHomePrice)}</p>
                <p className="text-xs text-secondary mt-1">based on your income and debts</p>
              </div>

              <div className="grid grid-cols-2 gap-px bg-border">
                <div className="bg-white p-4">
                  <p className="text-xs text-secondary mb-1">Max Monthly Payment</p>
                  <p className="text-lg font-bold">{fmt(result.maxMonthlyPayment)}</p>
                  <p className="text-xs text-secondary">PITI total</p>
                </div>
                <div className="bg-white p-4">
                  <p className="text-xs text-secondary mb-1">Monthly Income</p>
                  <p className="text-lg font-bold">{fmt(result.monthlyIncome)}</p>
                  <p className="text-xs text-secondary">Gross monthly</p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* DTI gauges */}
                <div>
                  <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-3">Debt-to-Income Ratios</p>
                  <div className="space-y-3">
                    <DTIBar label="Front-End (Housing)" value={result.frontEndRatio} limit={28} />
                    <DTIBar label="Back-End (All Debts)" value={result.backEndRatio} limit={43} />
                  </div>
                </div>

                <div className={`p-4 rounded-lg border flex gap-2 ${result.isApprovalLikely ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  {result.isApprovalLikely
                    ? <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                    : <AlertCircle className="w-4 h-4 text-accent-red flex-shrink-0 mt-0.5" />
                  }
                  <p className={`text-sm ${result.isApprovalLikely ? 'text-green-700' : 'text-red-700'}`}>
                    {result.approvalMessage}
                  </p>
                </div>

                <dl className="space-y-1.5 text-sm border-t border-border pt-4">
                  <div className="flex justify-between"><dt className="text-secondary">Max Loan Amount</dt><dd className="font-medium">{fmt(result.maxLoanAmount)}</dd></div>
                  <div className="flex justify-between"><dt className="text-secondary">Down Payment</dt><dd className="font-medium">{fmt(downPayment)}</dd></div>
                  <div className="flex justify-between"><dt className="text-secondary">P&I Payment</dt><dd className="font-medium">{fmt(result.monthlyPaymentBreakdown.pi)}</dd></div>
                  {result.monthlyPaymentBreakdown.tax > 0 && <div className="flex justify-between"><dt className="text-secondary">Monthly Tax</dt><dd className="font-medium">{fmt(result.monthlyPaymentBreakdown.tax)}</dd></div>}
                  {result.monthlyPaymentBreakdown.pmi > 0 && <div className="flex justify-between"><dt className="text-secondary">PMI</dt><dd className="font-medium text-accent-red">{fmt(result.monthlyPaymentBreakdown.pmi)}</dd></div>}
                </dl>

                <AffiliateCTA type="mortgage" />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 text-center text-secondary">
              <p className="text-4xl mb-3">💰</p>
              <p className="font-medium">Enter your income to find out how much house you can afford</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function DTIBar({ label, value, limit }: { label: string; value: number; limit: number }) {
  const pct = Math.min(value, 100)
  const isOver = value > limit
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className="text-secondary">{label}</span>
        <span className={`font-medium ${isOver ? 'text-accent-red' : 'text-accent-green'}`}>
          {value.toFixed(1)}% <span className="text-secondary font-normal">(limit: {limit}%)</span>
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${isOver ? 'bg-accent-red' : 'bg-accent-green'}`}
          style={{ width: `${Math.min(pct, 100)}%` }}
        />
      </div>
    </div>
  )
}
