'use client'

import { useState, useMemo } from 'react'
import { calculateMortgage } from '@/lib/calculations/mortgage'
import { generateAmortizationSchedule } from '@/lib/calculations/amortization'
import { US_RATES } from '@/lib/rates/usRates'
import { ResultCard } from '@/components/ui/ResultCard'
import { AmortizationChart } from '@/components/ui/AmortizationChart'
import { AmortizationTable } from '@/components/ui/AmortizationTable'
import { CurrencyInput, RateInput, TermButtons } from '@/components/ui/CurrencyInput'
import { AdSlot } from '@/components/ui/AdSlot'

interface MortgageCalculatorProps {
  currency?: 'USD' | 'CAD' | 'GBP'
  currencySymbol?: string
  defaultHomePrice?: number
  defaultDownPct?: number
  defaultRate?: number
  defaultTerm?: number
  termOptions?: number[]
}

export function MortgageCalculator({
  currency = 'USD',
  currencySymbol = '$',
  defaultHomePrice = 400000,
  defaultDownPct = 20,
  defaultRate = 7.0,
  defaultTerm = 30,
  termOptions = [10, 15, 20, 30],
}: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(defaultHomePrice)
  const [downPayment, setDownPayment] = useState((defaultHomePrice * defaultDownPct) / 100)
  const [downPct, setDownPct] = useState(defaultDownPct)
  const [annualRate, setAnnualRate] = useState(defaultRate)
  const [loanTerm, setLoanTerm] = useState(defaultTerm)
  const [annualTax, setAnnualTax] = useState(US_RATES.defaultMortgage.annualPropertyTax)
  const [annualInsurance, setAnnualInsurance] = useState(US_RATES.defaultMortgage.annualInsurance)
  const [monthlyHOA, setMonthlyHOA] = useState(0)
  const [extraPayment, setExtraPayment] = useState(0)

  // Keep % and $ in sync
  function handleHomePriceChange(val: number) {
    setHomePrice(val)
    setDownPayment(Math.round((val * downPct) / 100))
  }

  function handleDownPaymentChange(val: number) {
    setDownPayment(val)
    if (homePrice > 0) setDownPct(parseFloat(((val / homePrice) * 100).toFixed(2)))
  }

  function handleDownPctChange(pct: number) {
    setDownPct(pct)
    setDownPayment(Math.round((homePrice * pct) / 100))
  }

  // Derive errors — pure, no side effects
  const errors = useMemo<Record<string, string>>(() => {
    const e: Record<string, string> = {}
    if (homePrice <= 0) e.homePrice = 'Home price must be greater than 0'
    if (downPayment < 0) e.downPayment = 'Down payment cannot be negative'
    if (downPayment >= homePrice && homePrice > 0) e.downPayment = 'Down payment must be less than home price'
    if (annualRate <= 0 || annualRate > 20) e.rate = 'Rate must be between 0.5% and 20%'
    return e
  }, [homePrice, downPayment, annualRate])

  const isValid = Object.keys(errors).length === 0

  const result = useMemo(() => {
    if (!isValid) return null
    try {
      return calculateMortgage({
        homePrice,
        downPayment,
        annualRate,
        loanTermYears: loanTerm,
        annualPropertyTax: annualTax,
        annualInsurance,
        monthlyHOA,
        extraMonthlyPayment: extraPayment,
      })
    } catch {
      return null
    }
  }, [homePrice, downPayment, annualRate, loanTerm, annualTax, annualInsurance, monthlyHOA, extraPayment, isValid])

  const schedule = useMemo(() => {
    if (!result) return null
    return generateAmortizationSchedule(
      result.loanAmount,
      annualRate,
      loanTerm,
      new Date(),
      extraPayment
    )
  }, [result, annualRate, loanTerm, extraPayment])

  return (
    <div>
      {/* Leaderboard ad — desktop */}
      <div className="hidden lg:flex justify-center mb-4 no-print">
        <AdSlot slot="leaderboard" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-6 items-start">
        {/* ── Input panel ── */}
        <div className="space-y-5 bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground">Loan Details</h2>

          <CurrencyInput
            id="home-price"
            label="Home Price"
            value={homePrice}
            onChange={handleHomePriceChange}
            currency={currencySymbol}
            error={errors.homePrice}
          />

          <CurrencyInput
            id="down-payment"
            label="Down Payment"
            value={downPayment}
            onChange={handleDownPaymentChange}
            currency={currencySymbol}
            error={errors.downPayment}
            showPercentToggle
            percentValue={parseFloat(downPct.toFixed(1))}
            onPercentChange={handleDownPctChange}
            baseValue={homePrice}
          />

          <RateInput
            id="interest-rate"
            label="Interest Rate (Annual)"
            value={annualRate}
            onChange={setAnnualRate}
            error={errors.rate}
          />

          <TermButtons
            id="loan-term"
            label="Loan Term"
            value={loanTerm}
            options={termOptions}
            onChange={setLoanTerm}
          />

          {/* Mobile ad */}
          <div className="lg:hidden flex justify-center no-print">
            <AdSlot slot="mobile-banner" />
          </div>

          {/* Optional PITI fields */}
          <div className="border-t border-border pt-5 space-y-4">
            <p className="text-sm font-medium text-secondary">Optional — for full PITI estimate</p>

            <CurrencyInput
              id="annual-tax"
              label="Annual Property Tax"
              value={annualTax}
              onChange={setAnnualTax}
              currency={currencySymbol}
              hint="Estimated annual property taxes"
            />

            <CurrencyInput
              id="annual-insurance"
              label="Annual Homeowners Insurance"
              value={annualInsurance}
              onChange={setAnnualInsurance}
              currency={currencySymbol}
            />

            <CurrencyInput
              id="monthly-hoa"
              label="Monthly HOA Fee"
              value={monthlyHOA}
              onChange={setMonthlyHOA}
              currency={currencySymbol}
            />

            <CurrencyInput
              id="extra-payment"
              label="Extra Monthly Payment"
              value={extraPayment}
              onChange={setExtraPayment}
              currency={currencySymbol}
              hint="Shows how extra payments reduce your loan"
            />
          </div>
        </div>

        {/* ── Result panel ── */}
        <div className="lg:sticky lg:top-20">
          {result ? (
            <ResultCard
              monthlyPI={result.monthlyPI}
              monthlyPITI={result.monthlyPITI}
              monthlyPMI={result.monthlyPMI}
              monthlyTax={result.monthlyTax}
              monthlyInsurance={result.monthlyInsurance}
              monthlyHOA={result.monthlyHOA}
              totalInterest={result.totalInterest}
              loanAmount={result.loanAmount}
              homePrice={homePrice}
              downPayment={downPayment}
              annualRate={annualRate}
              payoffDate={result.payoffDate}
              ltv={result.ltv}
              currency={currency}
              extraMonthlyPayment={extraPayment}
              extraInterestSaved={result.extraPaymentInterestSaved}
              extraMonthsSaved={result.extraPaymentMonthsSaved}
              extraPayoffDate={result.extraPaymentPayoffDate}
              calculatorType="mortgage"
            />
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 text-center text-secondary space-y-2">
              <p className="text-4xl">🏠</p>
              <p className="font-medium text-foreground">Enter your loan details</p>
              <p className="text-sm">Your monthly payment will appear here</p>
              {Object.values(errors).map((e) => (
                <p key={e} className="text-sm text-accent-red">{e}</p>
              ))}
            </div>
          )}

          {/* Rectangle ad below result */}
          <div className="flex justify-center mt-4 no-print">
            <AdSlot slot="rectangle" />
          </div>
        </div>
      </div>

      {/* ── Amortization section ── */}
      {result && schedule && (
        <div className="mt-8 space-y-6 bg-white rounded-xl border border-border p-6 print-section">
          <AmortizationChart
            yearlyRows={schedule.yearlyRows}
            loanAmount={result.loanAmount}
            crossoverMonth={schedule.crossoverMonth}
            currency={currency}
          />
          <div className="border-t border-border pt-6">
            <AmortizationTable rows={schedule.rows} currency={currency} />
          </div>
        </div>
      )}
    </div>
  )
}
