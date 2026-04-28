'use client'

import { useState, useMemo } from 'react'
import { calculateBiweeklyMortgage } from '@/lib/calculations/amortization'
import { CurrencyInput, RateInput, TermButtons } from '@/components/ui/CurrencyInput'
import { AdSlot } from '@/components/ui/AdSlot'
import { formatCurrency } from '@/lib/utils'

export function BiweeklyCalculator() {
  const [loanAmount, setLoanAmount] = useState(320000)
  const [annualRate, setAnnualRate] = useState(7.0)
  const [loanTerm, setLoanTerm] = useState(30)

  const fmt = (n: number) => formatCurrency(n, 'USD')

  const result = useMemo(() => {
    if (loanAmount <= 0 || annualRate <= 0) return null
    return calculateBiweeklyMortgage(loanAmount, annualRate, loanTerm)
  }, [loanAmount, annualRate, loanTerm])

  return (
    <div>
      <div className="hidden lg:flex justify-center mb-4 no-print">
        <AdSlot slot="leaderboard" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-6 items-start">
        <div className="space-y-5 bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold">Loan Details</h2>

          <CurrencyInput
            id="loan-amount-biweekly"
            label="Loan Amount"
            value={loanAmount}
            onChange={setLoanAmount}
            currency="$"
          />

          <RateInput
            id="rate-biweekly"
            label="Interest Rate (Annual)"
            value={annualRate}
            onChange={setAnnualRate}
          />

          <TermButtons
            id="term-biweekly"
            label="Loan Term"
            value={loanTerm}
            options={[10, 15, 20, 30]}
            onChange={setLoanTerm}
          />
        </div>

        <div className="lg:sticky lg:top-20">
          {result ? (
            <div className="bg-white rounded-xl border border-border shadow-md" aria-live="polite" aria-atomic="true">
              <div className="p-6 pb-4 border-b border-border text-center">
                <p className="text-sm font-medium text-secondary mb-1">Biweekly Payment</p>
                <p className="hero-number">{fmt(result.biweeklyPayment)}</p>
                <p className="text-xs text-secondary mt-1">every 2 weeks (26 payments/year)</p>
              </div>

              <div className="grid grid-cols-2 gap-px bg-border">
                {[
                  { label: 'Monthly Equivalent', value: fmt(result.monthlyEquivalent), sub: 'Standard monthly payment' },
                  { label: 'Biweekly Total Interest', value: fmt(result.totalInterest), sub: 'Total interest paid', cls: 'text-accent-red' },
                  { label: 'Interest Saved', value: fmt(result.interestSavedVsMonthly), sub: 'vs. monthly payments', cls: 'text-accent-green' },
                  { label: 'Years Saved', value: `${result.yearsSavedVsMonthly.toFixed(1)} yrs`, sub: 'Pays off earlier', cls: 'text-accent-green' },
                ].map((c) => (
                  <div key={c.label} className="bg-white p-4">
                    <p className="text-xs text-secondary mb-1">{c.label}</p>
                    <p className={`text-lg font-bold ${c.cls ?? 'text-foreground'}`}>{c.value}</p>
                    <p className="text-xs text-secondary mt-0.5">{c.sub}</p>
                  </div>
                ))}
              </div>

              <div className="p-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm font-semibold text-accent-green mb-1">Biweekly Advantage</p>
                  <p className="text-sm text-secondary">
                    By paying biweekly, you make the equivalent of one extra monthly payment per year.
                    This saves{' '}
                    <strong className="text-accent-green">{fmt(result.interestSavedVsMonthly)}</strong>{' '}
                    in interest and pays off your loan{' '}
                    <strong className="text-accent-green">{result.yearsSavedVsMonthly.toFixed(1)} years</strong>{' '}
                    earlier.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 text-center text-secondary">
              <p className="text-4xl mb-3">📅</p>
              <p className="font-medium">Enter loan details to compare payment schedules</p>
            </div>
          )}
        </div>
      </div>

      {result && (
        <div className="mt-8 bg-white rounded-xl border border-border p-6">
          <h3 className="text-base font-semibold mb-4">Monthly vs. Biweekly Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 px-3 font-medium text-secondary">Payment Type</th>
                  <th className="text-right py-2.5 px-3 font-medium text-secondary">Payment Amount</th>
                  <th className="text-right py-2.5 px-3 font-medium text-secondary">Payments/Year</th>
                  <th className="text-right py-2.5 px-3 font-medium text-secondary">Total Interest</th>
                  <th className="text-right py-2.5 px-3 font-medium text-secondary">Payoff</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2.5 px-3 font-medium">Monthly</td>
                  <td className="py-2.5 px-3 text-right">{fmt(result.monthlyEquivalent)}</td>
                  <td className="py-2.5 px-3 text-right">12</td>
                  <td className="py-2.5 px-3 text-right text-accent-red">{fmt(result.totalInterest + result.interestSavedVsMonthly)}</td>
                  <td className="py-2.5 px-3 text-right">{loanTerm} years</td>
                </tr>
                <tr className="bg-green-50">
                  <td className="py-2.5 px-3 font-medium text-accent-green">Biweekly ✓</td>
                  <td className="py-2.5 px-3 text-right">{fmt(result.biweeklyPayment)}</td>
                  <td className="py-2.5 px-3 text-right">26</td>
                  <td className="py-2.5 px-3 text-right text-accent-red">{fmt(result.totalInterest)}</td>
                  <td className="py-2.5 px-3 text-right text-accent-green">{(result.monthsToPayoff / 12).toFixed(1)} years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
