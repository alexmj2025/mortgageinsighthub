// HECM (Home Equity Conversion Mortgage) Calculator
// Based on HUD Principal Limit Factors

export const HECM_LIMIT_2024 = 1149825

// Principal Limit Factor table (age × expected rate approximation)
// PLF values based on HUD table for ~6% expected rate
const PLF_TABLE: Record<number, number> = {
  62: 0.400, 63: 0.408, 64: 0.416, 65: 0.424, 66: 0.433,
  67: 0.441, 68: 0.449, 69: 0.457, 70: 0.490, 71: 0.474,
  72: 0.482, 73: 0.490, 74: 0.498, 75: 0.506, 76: 0.514,
  77: 0.522, 78: 0.531, 79: 0.539, 80: 0.585, 81: 0.556,
  82: 0.565, 83: 0.574, 84: 0.583, 85: 0.592, 86: 0.600,
  87: 0.609, 88: 0.617, 89: 0.625, 90: 0.632,
}

export function getPLF(age: number): number {
  if (age < 62) return 0
  if (age > 90) return PLF_TABLE[90]
  return PLF_TABLE[Math.floor(age)] ?? 0.400
}

export interface ReverseMortgageInputs {
  age: number
  homeValue: number
  currentMortgageBalance: number
  expectedRate?: number
  closingCosts?: number
}

export interface ReverseMortgageResult {
  eligible: boolean
  eligibilityMessage: string
  maxClaimAmount: number
  principalLimit: number
  availableProceeds: number
  lumpSum: number
  monthlyTenure: number
  lineOfCredit: number
  plf: number
}

export function calculateReverseMortgage(
  inputs: ReverseMortgageInputs
): ReverseMortgageResult {
  const {
    age,
    homeValue,
    currentMortgageBalance,
    closingCosts = 6000,
  } = inputs

  if (age < 62) {
    return {
      eligible: false,
      eligibilityMessage: 'You must be at least 62 years old to qualify for a HECM reverse mortgage.',
      maxClaimAmount: 0,
      principalLimit: 0,
      availableProceeds: 0,
      lumpSum: 0,
      monthlyTenure: 0,
      lineOfCredit: 0,
      plf: 0,
    }
  }

  const plf = getPLF(age)
  const maxClaimAmount = Math.min(homeValue, HECM_LIMIT_2024)
  const principalLimit = maxClaimAmount * plf

  const totalCosts = currentMortgageBalance + closingCosts
  const availableProceeds = Math.max(0, principalLimit - totalCosts)

  // Lump sum = up to 60% of principal limit in first year (HECM rule)
  const lumpSum = Math.min(availableProceeds, principalLimit * 0.6)

  // Monthly tenure (life expectancy factor: roughly 10yr = 120 months for age 75+)
  const lifeExpectancyMonths = Math.max(120, (90 - age) * 12)
  const monthlyTenure = availableProceeds / lifeExpectancyMonths

  // Line of credit = full available proceeds
  const lineOfCredit = availableProceeds

  return {
    eligible: true,
    eligibilityMessage: 'Based on your inputs, you may qualify for a HECM reverse mortgage.',
    maxClaimAmount,
    principalLimit,
    availableProceeds,
    lumpSum,
    monthlyTenure,
    lineOfCredit,
    plf,
  }
}
