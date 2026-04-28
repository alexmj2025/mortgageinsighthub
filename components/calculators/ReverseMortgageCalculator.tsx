'use client'

import { useState, useMemo } from 'react'
// useState kept for age, homeValue, mortgageBalance, closingCosts
import { calculateReverseMortgage, HECM_LIMIT_2024 } from '@/lib/calculations/reverseMortgage'
import { CurrencyInput } from '@/components/ui/CurrencyInput'
import { AffiliateCTA } from '@/components/ui/AffiliateCTA'
import { AdSlot } from '@/components/ui/AdSlot'
import { formatCurrency } from '@/lib/utils'
import { AlertTriangle, Info } from 'lucide-react'

export function ReverseMortgageCalculator() {
  const [age, setAge] = useState(70)
  const [homeValue, setHomeValue] = useState(450000)
  const [mortgageBalance, setMortgageBalance] = useState(50000)
  const [closingCosts, setClosingCosts] = useState(6000)
  const fmt = (n: number) => formatCurrency(n, 'USD')

  const errors = useMemo<Record<string, string>>(() => {
    const e: Record<string, string> = {}
    if (age < 62) e.age = 'Must be 62 or older to qualify'
    if (homeValue <= 0) e.homeValue = 'Home value must be greater than 0'
    return e
  }, [age, homeValue])

  const result = useMemo(() => {
    if (Object.keys(errors).length > 0) return null
    try {
      return calculateReverseMortgage({ age, homeValue, currentMortgageBalance: mortgageBalance, closingCosts })
    } catch { return null }
  }, [age, homeValue, mortgageBalance, closingCosts, errors])

  return (
    <div>
      {/* HUD Counselor Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6 flex gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <p className="text-sm font-semibold text-amber-800 mb-1">Important: Consult a HUD-Approved Counselor</p>
          <p className="text-sm text-amber-700">
            Before proceeding with a reverse mortgage, federal law requires you to meet with a
            HUD-approved housing counselor. This calculator provides estimates only. Call{' '}
            <strong>1-800-569-4287</strong> to find a counselor near you.
          </p>
        </div>
      </div>

      <div className="hidden lg:flex justify-center mb-4 no-print">
        <AdSlot slot="leaderboard" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-6 items-start">
        {/* Inputs */}
        <div className="space-y-5 bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground">Your Information</h2>

          <div className="space-y-1">
            <label htmlFor="borrower-age" className="block text-sm font-medium text-foreground">
              Borrower Age (youngest borrower)
            </label>
            <div className="relative">
              <input
                id="borrower-age"
                type="number"
                inputMode="numeric"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value) || 62)}
                min={62}
                max={99}
                step={1}
                aria-describedby={errors.age ? 'age-error' : undefined}
                aria-invalid={!!errors.age}
                className={`w-full pl-3 pr-12 py-2.5 rounded-md border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary ${errors.age ? 'border-accent-red' : 'border-border'}`}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary text-sm pointer-events-none">years</span>
            </div>
            {errors.age && <p id="age-error" className="text-xs text-accent-red" role="alert">{errors.age}</p>}
            {age < 62 && (
              <p className="text-xs text-accent-red" role="alert">You must be at least 62 years old to qualify for a HECM reverse mortgage.</p>
            )}
          </div>

          <CurrencyInput
            id="home-value"
            label="Estimated Home Value"
            value={homeValue}
            onChange={setHomeValue}
            currency="$"
            error={errors.homeValue}
            hint={`FHA HECM limit 2024: ${fmt(HECM_LIMIT_2024)}`}
          />

          <CurrencyInput
            id="mortgage-balance"
            label="Current Mortgage Balance"
            value={mortgageBalance}
            onChange={setMortgageBalance}
            currency="$"
            hint="Must be paid off from reverse mortgage proceeds"
          />

          <CurrencyInput
            id="closing-costs"
            label="Estimated Closing Costs"
            value={closingCosts}
            onChange={setClosingCosts}
            currency="$"
            hint="Typically $5,000–$10,000 for HECM"
          />

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-2">
            <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700">
              The Principal Limit Factor (PLF) is determined by your age and the expected interest rate.
              Older borrowers receive a higher percentage of their home&apos;s value.
            </p>
          </div>
        </div>

        {/* Result */}
        <div className="lg:sticky lg:top-20 space-y-4">
          {result && result.eligible ? (
            <div className="bg-white rounded-xl border border-border shadow-md" aria-live="polite" aria-atomic="true">
              <div className="p-6 pb-4 border-b border-border text-center">
                <p className="text-sm font-medium text-secondary mb-1">Available Proceeds</p>
                <p className="hero-number">{fmt(result.availableProceeds)}</p>
                <p className="text-xs text-secondary mt-1">After paying off existing mortgage &amp; costs</p>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-xs font-medium text-secondary uppercase tracking-wide mb-3">Payout Options</p>
                  <div className="space-y-3">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Lump Sum</p>
                          <p className="text-xs text-secondary">Up to 60% in first year</p>
                        </div>
                        <p className="text-xl font-bold text-primary">{fmt(result.lumpSum)}</p>
                      </div>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Monthly Tenure</p>
                          <p className="text-xs text-secondary">Fixed monthly payments for life</p>
                        </div>
                        <p className="text-xl font-bold text-primary">{fmt(result.monthlyTenure)}/mo</p>
                      </div>
                    </div>
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-semibold text-foreground">Line of Credit</p>
                          <p className="text-xs text-secondary">Draw as needed, grows over time</p>
                        </div>
                        <p className="text-xl font-bold text-primary">{fmt(result.lineOfCredit)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <dl className="space-y-1.5 text-sm border-t border-border pt-4">
                  <div className="flex justify-between"><dt className="text-secondary">Home Value</dt><dd className="font-medium">{fmt(homeValue)}</dd></div>
                  <div className="flex justify-between"><dt className="text-secondary">Max Claim Amount</dt><dd className="font-medium">{fmt(result.maxClaimAmount)}</dd></div>
                  <div className="flex justify-between"><dt className="text-secondary">Principal Limit Factor</dt><dd className="font-medium">{(result.plf * 100).toFixed(1)}%</dd></div>
                  <div className="flex justify-between"><dt className="text-secondary">Principal Limit</dt><dd className="font-medium">{fmt(result.principalLimit)}</dd></div>
                  <div className="flex justify-between"><dt className="text-secondary">Existing Mortgage</dt><dd className="font-medium text-accent-red">−{fmt(mortgageBalance)}</dd></div>
                  <div className="flex justify-between"><dt className="text-secondary">Closing Costs</dt><dd className="font-medium text-accent-red">−{fmt(closingCosts)}</dd></div>
                </dl>

                <AffiliateCTA type="reverse" />
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-border p-8 text-center text-secondary space-y-3">
              {age < 62 ? (
                <>
                  <p className="text-4xl">🚫</p>
                  <p className="font-medium text-accent-red">Age Requirement Not Met</p>
                  <p className="text-sm">You must be at least 62 years old to qualify for a HECM reverse mortgage.</p>
                </>
              ) : (
                <>
                  <p className="text-4xl">🏠</p>
                  <p className="font-medium">Enter your details to calculate reverse mortgage proceeds</p>
                </>
              )}
            </div>
          )}

          <div className="flex justify-center no-print">
            <AdSlot slot="rectangle" />
          </div>
        </div>
      </div>
    </div>
  )
}
