'use client'

import { useState, useMemo } from 'react'
import {
  calculateCarLoan,
  calculateCarLoanComparisons,
  calculateRateImpact,
} from '@/lib/calculations/carLoan'
import { generateAmortizationSchedule } from '@/lib/calculations/amortization'
import { US_RATES, CAR_LOAN_RATE_TABLE } from '@/lib/rates/usRates'
import { CurrencyInput, RateInput, TermButtons } from '@/components/ui/CurrencyInput'
import { AffiliateCTA } from '@/components/ui/AffiliateCTA'
import { AdSlot } from '@/components/ui/AdSlot'
import { ShareResult } from '@/components/ui/ShareResult'
import { AmortizationTable } from '@/components/ui/AmortizationTable'
import { formatCurrency, formatDate } from '@/lib/utils'

export function CarLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState(35000)
  const [downPayment, setDownPayment] = useState(5000)
  const [tradeIn, setTradeIn] = useState(0)
  const [salesTax, setSalesTax] = useState(0)
  const [loanTerm, setLoanTerm] = useState(60)
  const [annualRate, setAnnualRate] = useState(US_RATES.carLoan.rateExcellent)
  const [fees, setFees] = useState(0)
  const fmt = (n: number) => formatCurrency(n, 'USD')

  const errors = useMemo<Record<string, string>>(() => {
    const e: Record<string, string> = {}
    if (vehiclePrice <= 0) e.vehiclePrice = 'Vehicle price must be greater than 0'
    if (downPayment < 0) e.downPayment = 'Down payment cannot be negative'
    if (annualRate <= 0) e.rate = 'Rate must be greater than 0'
    return e
  }, [vehiclePrice, downPayment, annualRate])

  const isValid = Object.keys(errors).length === 0

  const result = useMemo(() => {
    if (!isValid) return null
    try {
      return calculateCarLoan({ vehiclePrice, downPayment, tradeIn, salesTaxPercent: salesTax, loanTermMonths: loanTerm, annualRate, fees })
    } catch { return null }
  }, [vehiclePrice, downPayment, tradeIn, salesTax, loanTerm, annualRate, fees, isValid])

  const comparisons = useMemo(() => {
    if (!isValid) return []
    return calculateCarLoanComparisons({ vehiclePrice, downPayment, tradeIn, salesTaxPercent: salesTax, annualRate, fees })
  }, [vehiclePrice, downPayment, tradeIn, salesTax, annualRate, fees, isValid])

  const rateImpact = useMemo(() => {
    return calculateRateImpact({ vehiclePrice, downPayment, tradeIn, salesTaxPercent: salesTax, loanTermMonths: loanTerm, fees })
  }, [vehiclePrice, downPayment, tradeIn, salesTax, loanTerm, fees])

  const schedule = useMemo(() => {
    if (!result) return null
    return generateAmortizationSchedule(result.totalLoan, annualRate, loanTerm / 12)
  }, [result, annualRate, loanTerm])

  const payoffDate = useMemo(() => {
    const d = new Date()
    d.setMonth(d.getMonth() + loanTerm)
    return d
  }, [loanTerm])

  return (
    <div>
      <div className="hidden lg:flex justify-center mb-4 no-print">
        <AdSlot slot="leaderboard" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-6 items-start">
        {/* Inputs */}
        <div className="space-y-5 bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground">Vehicle &amp; Loan Details</h2>

          <CurrencyInput
            id="vehicle-price"
            label="Vehicle Price"
            value={vehiclePrice}
            onChange={setVehiclePrice}
            currency="$"
            error={errors.vehiclePrice}
          />

          <CurrencyInput
            id="down-payment-car"
            label="Down Payment"
            value={downPayment}
            onChange={setDownPayment}
            currency="$"
            error={errors.downPayment}
            showPercentToggle
            percentValue={parseFloat(((downPayment / vehiclePrice) * 100).toFixed(1))}
            onPercentChange={(pct) => setDownPayment((vehiclePrice * pct) / 100)}
            baseValue={vehiclePrice}
          />

          <CurrencyInput
            id="trade-in"
            label="Trade-In Value"
            value={tradeIn}
            onChange={setTradeIn}
            currency="$"
          />

          <div className="space-y-1">
            <label htmlFor="sales-tax" className="block text-sm font-medium text-foreground">
              Sales Tax (%)
            </label>
            <div className="relative">
              <input
                id="sales-tax"
                type="number"
                inputMode="decimal"
                value={salesTax}
                onChange={(e) => setSalesTax(parseFloat(e.target.value) || 0)}
                min={0}
                max={15}
                step={0.1}
                className="w-full pl-3 pr-8 py-2.5 rounded-md border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary text-sm pointer-events-none">%</span>
            </div>
          </div>

          <RateInput
            id="car-rate"
            label="Annual Interest Rate (APR)"
            value={annualRate}
            onChange={setAnnualRate}
            error={errors.rate}
          />

          <TermButtons
            id="car-term"
            label="Loan Term"
            value={loanTerm}
            options={[24, 36, 48, 60, 72, 84]}
            onChange={setLoanTerm}
            suffix="mo"
          />

          <CurrencyInput
            id="car-fees"
            label="Other Fees (documentation, dealer, etc.)"
            value={fees}
            onChange={setFees}
            currency="$"
          />

          <div className="lg:hidden flex justify-center no-print">
            <AdSlot slot="mobile-banner" />
          </div>
        </div>

        {/* Result */}
        <div className="lg:sticky lg:top-20 space-y-4">
          {result ? (
            <div className="bg-white rounded-xl border border-border shadow-md" aria-live="polite" aria-atomic="true">
              {/* Hero */}
              <div className="p-6 pb-4 border-b border-border text-center">
                <p className="text-sm font-medium text-secondary mb-1">Monthly Car Payment</p>
                <p className="hero-number">{fmt(result.monthlyPayment)}</p>
                <p className="text-xs text-secondary mt-1">for {loanTerm} months</p>
              </div>

              {/* 4 cards */}
              <div className="grid grid-cols-2 gap-px bg-border">
                {[
                  { label: 'Total Loan Amount', value: fmt(result.totalLoan), sub: 'After down payment' },
                  { label: 'Total Interest', value: fmt(result.totalInterest), sub: 'Over loan lifetime', cls: 'text-accent-red' },
                  { label: 'Total Cost', value: fmt(result.totalCost), sub: 'Vehicle total cost' },
                  { label: 'Payoff Date', value: formatDate(payoffDate), sub: `${loanTerm} months from now` },
                ].map((c) => (
                  <div key={c.label} className="bg-white p-4">
                    <p className="text-xs text-secondary mb-1">{c.label}</p>
                    <p className={`text-lg font-bold ${c.cls ?? 'text-foreground'}`}>{c.value}</p>
                    <p className="text-xs text-secondary mt-0.5">{c.sub}</p>
                  </div>
                ))}
              </div>

              <div className="p-6 space-y-3">
                <dl className="space-y-1.5 text-sm">
                  <div className="flex justify-between"><dt className="text-secondary">Vehicle Price</dt><dd className="font-medium">{fmt(vehiclePrice)}</dd></div>
                  <div className="flex justify-between"><dt className="text-secondary">Down Payment</dt><dd className="font-medium">{fmt(downPayment)}</dd></div>
                  {tradeIn > 0 && <div className="flex justify-between"><dt className="text-secondary">Trade-In</dt><dd className="font-medium text-accent-green">−{fmt(tradeIn)}</dd></div>}
                  {salesTax > 0 && <div className="flex justify-between"><dt className="text-secondary">Sales Tax ({salesTax}%)</dt><dd className="font-medium">{fmt(vehiclePrice * salesTax / 100)}</dd></div>}
                  <div className="flex justify-between"><dt className="text-secondary">APR</dt><dd className="font-medium">{annualRate.toFixed(2)}%</dd></div>
                </dl>
                <ShareResult monthlyPayment={result.monthlyPayment} homePrice={vehiclePrice} />
                <AffiliateCTA type="car" />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 text-center text-secondary">
              <p className="text-4xl mb-3">🚗</p>
              <p className="font-medium">Enter vehicle details to calculate your payment</p>
            </div>
          )}
          <div className="flex justify-center no-print">
            <AdSlot slot="rectangle" />
          </div>
        </div>
      </div>

      {/* Term comparison table */}
      {comparisons.length > 0 && (
        <div className="mt-8 bg-white rounded-xl border border-border p-6">
          <h3 className="text-base font-semibold text-foreground mb-4">Loan Term Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" aria-label="Loan term comparison">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 px-3 text-secondary font-medium">Term</th>
                  <th className="text-right py-2.5 px-3 text-secondary font-medium">Monthly Payment</th>
                  <th className="text-right py-2.5 px-3 text-secondary font-medium">Total Interest</th>
                  <th className="text-right py-2.5 px-3 text-secondary font-medium">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c) => (
                  <tr
                    key={c.term}
                    className={`border-b border-border last:border-0 ${c.term === loanTerm ? 'bg-blue-50' : ''}`}
                  >
                    <td className="py-2.5 px-3 font-medium">
                      {c.term} mo{c.term === loanTerm && <span className="ml-2 text-xs bg-primary text-white px-1.5 py-0.5 rounded">Selected</span>}
                    </td>
                    <td className="py-2.5 px-3 text-right font-semibold text-foreground">{fmt(c.monthlyPayment)}</td>
                    <td className="py-2.5 px-3 text-right text-accent-red">{fmt(c.totalInterest)}</td>
                    <td className="py-2.5 px-3 text-right">{fmt(c.totalCost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rate impact table */}
      <div className="mt-6 bg-white rounded-xl border border-border p-6">
        <h3 className="text-base font-semibold text-foreground mb-1">Good Rate vs. High Rate Impact</h3>
        <p className="text-sm text-secondary mb-4">On a {fmt(vehiclePrice)} vehicle, {loanTerm}-month loan</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="font-semibold text-accent-green mb-2">Good Rate (5.9%)</p>
            <p className="text-foreground font-bold text-xl">{fmt(rateImpact.goodRate.monthlyPayment)}/mo</p>
            <p className="text-secondary mt-1">Total interest: {fmt(rateImpact.goodRate.totalInterest)}</p>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-semibold text-accent-red mb-2">High Rate (14.9%)</p>
            <p className="text-foreground font-bold text-xl">{fmt(rateImpact.highRate.monthlyPayment)}/mo</p>
            <p className="text-secondary mt-1">Total interest: {fmt(rateImpact.highRate.totalInterest)}</p>
          </div>
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="font-semibold text-yellow-700 mb-2">Difference</p>
            <p className="text-foreground font-bold text-xl">{fmt(rateImpact.difference)}</p>
            <p className="text-secondary mt-1">Extra interest paid with high rate</p>
          </div>
        </div>
      </div>

      {/* Amortization table */}
      {schedule && (
        <div className="mt-6 bg-white rounded-xl border border-border p-6 print-section">
          <AmortizationTable rows={schedule.rows} />
        </div>
      )}

      {/* Responsive ad */}
      <div className="mt-6 flex justify-center no-print">
        <AdSlot slot="responsive" className="w-full" />
      </div>
    </div>
  )
}
