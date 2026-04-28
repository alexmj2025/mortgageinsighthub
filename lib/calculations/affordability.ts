export interface AffordabilityInputs {
  annualIncome: number
  monthlyDebts: number
  downPayment: number
  annualRate: number
  loanTermYears: number
  annualPropertyTax?: number
  annualInsurance?: number
  monthlyHOA?: number
  frontEndRatioLimit?: number
  backEndRatioLimit?: number
}

export interface AffordabilityResult {
  maxHomePrice: number
  maxLoanAmount: number
  maxMonthlyPayment: number
  monthlyIncome: number
  frontEndRatio: number
  backEndRatio: number
  debtToIncome: number
  isApprovalLikely: boolean
  approvalMessage: string
  monthlyPaymentBreakdown: {
    pi: number
    tax: number
    insurance: number
    hoa: number
    pmi: number
    total: number
  }
}

export function calculateAffordability(inputs: AffordabilityInputs): AffordabilityResult {
  const {
    annualIncome,
    monthlyDebts,
    downPayment,
    annualRate,
    loanTermYears,
    annualPropertyTax = 0,
    annualInsurance = 0,
    monthlyHOA = 0,
    frontEndRatioLimit = 0.28,
    backEndRatioLimit = 0.36,
  } = inputs

  const monthlyIncome = annualIncome / 12
  const monthlyRate = annualRate / 100 / 12
  const n = loanTermYears * 12

  const monthlyTax = annualPropertyTax / 12
  const monthlyIns = annualInsurance / 12

  // Front-end: max PITI = 28% of gross monthly income
  const maxPITI = monthlyIncome * frontEndRatioLimit
  const maxPI_frontend = maxPITI - monthlyTax - monthlyIns - monthlyHOA

  // Back-end: max total debts = 36% of gross monthly income
  const maxTotalDebt = monthlyIncome * backEndRatioLimit
  const maxPI_backend = maxTotalDebt - monthlyDebts - monthlyTax - monthlyIns - monthlyHOA

  const maxPI = Math.min(maxPI_frontend, maxPI_backend)

  // Solve for loan amount: P = PMT * ((1+r)^n - 1) / (r * (1+r)^n)
  let maxLoanAmount: number
  if (monthlyRate === 0) {
    maxLoanAmount = maxPI * n
  } else {
    maxLoanAmount =
      maxPI * (Math.pow(1 + monthlyRate, n) - 1) /
      (monthlyRate * Math.pow(1 + monthlyRate, n))
  }

  // Adjust for PMI if LTV > 80%
  const maxHomePrice = maxLoanAmount + downPayment
  const ltv = (maxLoanAmount / maxHomePrice) * 100
  if (ltv > 80) {
    const pmiMonthly = (maxLoanAmount * 0.005) / 12
    const adjustedMaxPI = maxPI - pmiMonthly
    if (monthlyRate === 0) {
      maxLoanAmount = adjustedMaxPI * n
    } else {
      maxLoanAmount =
        adjustedMaxPI * (Math.pow(1 + monthlyRate, n) - 1) /
        (monthlyRate * Math.pow(1 + monthlyRate, n))
    }
  }

  const finalMaxHomePrice = Math.max(0, maxLoanAmount + downPayment)
  const pmi = ltv > 80 ? (maxLoanAmount * 0.005) / 12 : 0

  const actualMonthlyPI = maxPI
  const totalMonthlyPayment = actualMonthlyPI + monthlyTax + monthlyIns + monthlyHOA + pmi

  const frontEndRatio = (totalMonthlyPayment / monthlyIncome) * 100
  const backEndRatio = ((totalMonthlyPayment + monthlyDebts) / monthlyIncome) * 100
  const debtToIncome = ((monthlyDebts + totalMonthlyPayment) / monthlyIncome) * 100

  const isApprovalLikely = frontEndRatio <= 28 && backEndRatio <= 43
  const approvalMessage = isApprovalLikely
    ? 'Your debt-to-income ratios are within conventional lending guidelines.'
    : backEndRatio > 43
    ? 'Your back-end DTI is above 43%. Consider reducing debts or a larger down payment.'
    : 'Your front-end ratio is above 28%. Consider a lower-priced home or larger down payment.'

  return {
    maxHomePrice: finalMaxHomePrice,
    maxLoanAmount,
    maxMonthlyPayment: totalMonthlyPayment,
    monthlyIncome,
    frontEndRatio,
    backEndRatio,
    debtToIncome,
    isApprovalLikely,
    approvalMessage,
    monthlyPaymentBreakdown: {
      pi: actualMonthlyPI,
      tax: monthlyTax,
      insurance: monthlyIns,
      hoa: monthlyHOA,
      pmi,
      total: totalMonthlyPayment,
    },
  }
}
