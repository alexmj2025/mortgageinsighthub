'use client'

import { useState, useMemo } from 'react'
import { calculateRefinance } from '@/lib/calculations/amortization'
import { CurrencyInput, RateInput, TermButtons } from '@/components/ui/CurrencyInput'
import { AdSlot } from '@/components/ui/AdSlot'
import { AffiliateCTA } from '@/components/ui/AffiliateCTA'
import { formatCurrency } from '@/lib/utils'
import { TrendingDown, TrendingUp } from 'lucide-react'

export function RefinanceCalculator() {
  const [currentBalance, setCurrentBalance] = useState(250000)
  const [currentRate, setCurrentRate] = useState(7.5)
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState(1748)
  const [remainingYears, setRemainingYears] = useState(25)
  const [newRate, setNewRate] = useState(6.5)
  const [newTerm, setNewTerm] = useState(30)
  const [closingCosts, setClosingCosts] = useState(4000)

  const fmt = (n: number) => formatCurrency(n, 'USD')

  const result = useMemo(() => {
    if (currentBalance <= 0 || newRate <= 0) return null
    return calculateRefinance(
      currentBalance,
      currentRate,
      currentMonthlyPayment,
      remainingYears * 12,
      newRate,
      newTerm,
      closingCosts
    )
  }, [currentBalance, currentRate, currentMonthlyPayment, remainingYears, newRate, newTerm, closingCosts])

  return (
    <div>
      <div className="hidden lg:flex justify-center mb-4 no-print">
        <AdSlot slot="leaderboard" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current loan */}
        <div className="space-y-5 bg-white rounded-xl border border-border p-6">
          <h2 className="text-base font-semibold text-foreground">Current Loan</h2>

          <CurrencyInput id="current-balance" label="Remaining Balance" value={currentBalance} onChange={setCurrentBalance} currency="$" />
          <RateInput id="current-rate" label="Current Rate" value={currentRate} onChange={setCurrentRate} />
          <CurrencyInput id="current-payment" label="Current Monthly Payment" value={currentMonthlyPayment} onChange={setCurrentMonthlyPayment} currency="$" />
          <TermButtons id="remaining-years" label="Years Remaining" value={remainingYears} options={[5, 10, 15, 20, 25, 30]} onChange={setRemainingYears} />
        </div>

        {/* New loan */}
        <div className="space-y-5 bg-white rounded-xl border border-border p-6">
          <h2 className="text-base font-semibold text-foreground">New Loan (Refinance)</h2>

          <RateInput id="new-rate" label="New Interest Rate" value={newRate} onChange={setNewRate} />
          <TermButtons id="new-term" label="New Loan Term" value={newTerm} options={[10, 15, 20, 30]} onChange={setNewTerm} />
          <CurrencyInput id="closing-costs-refi" label="Closing Costs" value={closingCosts} onChange={setClosingCosts} currency="$" hint="Typically 2–5% of loan amount" />
        </div>
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly savings */}
          <div className="bg-white rounded-xl border border-border p-6 space-y-4" aria-live="polite">
            <h3 className="font-semibold text-foreground">Refinance Result</h3>

            <div className="text-center py-4 border-b border-border">
              <p className="text-sm text-secondary mb-1">New Monthly Payment</p>
              <p className="hero-number">{fmt(result.newMonthlyPayment)}</p>
              {result.monthlySavings > 0 ? (
                <div className="flex items-center justify-center gap-1 mt-2 text-accent-green text-sm font-medium">
                  <TrendingDown className="w-4 h-4" />
                  Save {fmt(result.monthlySavings)}/month
                </div>
              ) : (
                <div className="flex items-center justify-center gap-1 mt-2 text-accent-red text-sm font-medium">
                  <TrendingUp className="w-4 h-4" />
                  Pay {fmt(Math.abs(result.monthlySavings))} more/month
                </div>
              )}
            </div>

            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-secondary">Break-Even Point</dt><dd className="font-medium">{result.breakEvenMonths} months ({(result.breakEvenMonths / 12).toFixed(1)} years)</dd></div>
              <div className="flex justify-between"><dt className="text-secondary">Closing Costs</dt><dd className="font-medium text-accent-red">{fmt(closingCosts)}</dd></div>
              <div className="flex justify-between"><dt className="text-secondary">Total Interest (Current)</dt><dd className="font-medium text-accent-red">{fmt(result.totalInterestCurrent)}</dd></div>
              <div className="flex justify-between"><dt className="text-secondary">Total Interest (New)</dt><dd className="font-medium text-accent-red">{fmt(result.totalInterestNew)}</dd></div>
              <div className="flex justify-between border-t border-border pt-2">
                <dt className="font-medium">Net Savings</dt>
                <dd className={`font-bold ${result.netSavings > 0 ? 'text-accent-green' : 'text-accent-red'}`}>
                  {result.netSavings > 0 ? '+' : ''}{fmt(result.netSavings)}
                </dd>
              </div>
            </dl>

            {result.breakEvenMonths > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-700">
                You&apos;ll break even on closing costs after <strong>{result.breakEvenMonths} months</strong>.
                Only refinance if you plan to stay in the home longer than that.
              </div>
            )}
          </div>

          <div>
            <AffiliateCTA type="mortgage" />
          </div>
        </div>
      )}
    </div>
  )
}
