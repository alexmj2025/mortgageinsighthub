// UK mortgage rate defaults — update periodically
// Last updated: 2026

export const UK_RATES = {
  mortgage: {
    rate2yrFixed: 4.85,
    rate5yrFixed: 4.65,
    rate10yrFixed: 4.75,
    rateTrackerBBR: 5.20,
    rateSVR: 7.99,
  },
  defaultMortgage: {
    homePrice: 300000,
    downPaymentPercent: 20,
    loanTerm: 25,
    rate: 4.5,
    annualInsurance: 400,
  },
}

export const UK_LTV_RATES = [
  { ltv: '60%', fixedRate2yr: '4.19%', fixedRate5yr: '4.05%' },
  { ltv: '75%', fixedRate2yr: '4.45%', fixedRate5yr: '4.29%' },
  { ltv: '80%', fixedRate2yr: '4.75%', fixedRate5yr: '4.55%' },
  { ltv: '85%', fixedRate2yr: '5.10%', fixedRate5yr: '4.89%' },
  { ltv: '90%', fixedRate2yr: '5.45%', fixedRate5yr: '5.19%' },
  { ltv: '95%', fixedRate2yr: '5.85%', fixedRate5yr: '5.55%' },
]

export function calculateStampDuty(
  propertyPrice: number,
  isFirstTimeBuyer: boolean
): { totalDuty: number; breakdown: Array<{ band: string; rate: string; tax: number }> } {
  if (isFirstTimeBuyer) {
    // First-time buyer relief
    if (propertyPrice <= 425000) {
      return { totalDuty: 0, breakdown: [{ band: '£0 – £425,000', rate: '0%', tax: 0 }] }
    }
    if (propertyPrice <= 625000) {
      const tax = (propertyPrice - 425000) * 0.05
      return {
        totalDuty: tax,
        breakdown: [
          { band: '£0 – £425,000', rate: '0%', tax: 0 },
          { band: `£425,001 – £${propertyPrice.toLocaleString()}`, rate: '5%', tax },
        ],
      }
    }
    // Above £625k — no first-time buyer relief, standard rates apply
  }

  // Standard stamp duty rates
  const bands = [
    { max: 250000, rate: 0 },
    { max: 925000, rate: 0.05 },
    { max: 1500000, rate: 0.10 },
    { max: Infinity, rate: 0.12 },
  ]

  let totalDuty = 0
  let remaining = propertyPrice
  let prevMax = 0
  const breakdown: Array<{ band: string; rate: string; tax: number }> = []

  for (const band of bands) {
    if (remaining <= 0) break
    const taxable = Math.min(remaining, band.max - prevMax)
    const tax = taxable * band.rate
    totalDuty += tax

    if (taxable > 0) {
      const bandMax = Math.min(propertyPrice, band.max)
      breakdown.push({
        band: `£${(prevMax + 1).toLocaleString()} – £${bandMax === Infinity ? '∞' : bandMax.toLocaleString()}`,
        rate: `${band.rate * 100}%`,
        tax,
      })
    }

    remaining -= taxable
    prevMax = band.max
  }

  return { totalDuty, breakdown }
}
