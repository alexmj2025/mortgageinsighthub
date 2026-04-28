export interface MortgageInputs {
  homePrice: number
  downPayment: number
  annualRate: number
  loanTermYears: number
  annualPropertyTax?: number
  annualInsurance?: number
  monthlyHOA?: number
  extraMonthlyPayment?: number
  startDate?: Date
}

export interface MortgageResult {
  monthlyPI: number
  monthlyPMI: number
  monthlyTax: number
  monthlyInsurance: number
  monthlyHOA: number
  monthlyPITI: number
  loanAmount: number
  totalInterest: number
  totalPayment: number
  payoffDate: Date
  ltv: number
  pmiRemovalMonth: number | null
  // With extra payment
  extraPaymentMonthlyPI?: number
  extraPaymentTotalInterest?: number
  extraPaymentPayoffDate?: Date
  extraPaymentInterestSaved?: number
  extraPaymentMonthsSaved?: number
}

export function calculateMortgage(inputs: MortgageInputs): MortgageResult {
  const {
    homePrice,
    downPayment,
    annualRate,
    loanTermYears,
    annualPropertyTax = 0,
    annualInsurance = 0,
    monthlyHOA = 0,
    extraMonthlyPayment = 0,
    startDate = new Date(),
  } = inputs

  const loanAmount = homePrice - downPayment
  const ltv = (loanAmount / homePrice) * 100

  const monthlyRate = annualRate / 100 / 12
  const n = loanTermYears * 12

  let monthlyPI: number
  if (monthlyRate === 0) {
    monthlyPI = loanAmount / n
  } else {
    monthlyPI =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1)
  }

  const monthlyPMI = ltv > 80 ? (loanAmount * 0.005) / 12 : 0
  const monthlyTax = annualPropertyTax / 12
  const monthlyIns = annualInsurance / 12
  const monthlyPITI = monthlyPI + monthlyPMI + monthlyTax + monthlyIns + monthlyHOA

  // Calculate amortization to find total interest and PMI removal month
  let balance = loanAmount
  let totalInterest = 0
  let pmiRemovalMonth: number | null = null
  const pmiThreshold = homePrice * 0.8

  for (let month = 1; month <= n; month++) {
    const interestPayment = balance * monthlyRate
    const principalPayment = monthlyPI - interestPayment
    balance -= principalPayment
    totalInterest += interestPayment

    if (pmiRemovalMonth === null && ltv > 80 && balance <= pmiThreshold) {
      pmiRemovalMonth = month
    }
  }

  const payoffDate = new Date(startDate)
  payoffDate.setMonth(payoffDate.getMonth() + n)

  // Calculate with extra payment
  let extraResult: Partial<MortgageResult> = {}
  if (extraMonthlyPayment > 0) {
    let bal = loanAmount
    let extraTotalInterest = 0
    let extraMonths = 0

    while (bal > 0 && extraMonths < n * 2) {
      const interestPayment = bal * monthlyRate
      const payment = Math.min(monthlyPI + extraMonthlyPayment, bal + interestPayment)
      const principalPayment = payment - interestPayment
      bal -= principalPayment
      extraTotalInterest += interestPayment
      extraMonths++
      if (bal <= 0) break
    }

    const extraPayoffDate = new Date(startDate)
    extraPayoffDate.setMonth(extraPayoffDate.getMonth() + extraMonths)

    extraResult = {
      extraPaymentTotalInterest: extraTotalInterest,
      extraPaymentPayoffDate: extraPayoffDate,
      extraPaymentInterestSaved: totalInterest - extraTotalInterest,
      extraPaymentMonthsSaved: n - extraMonths,
    }
  }

  return {
    monthlyPI,
    monthlyPMI,
    monthlyTax,
    monthlyInsurance: monthlyIns,
    monthlyHOA,
    monthlyPITI,
    loanAmount,
    totalInterest,
    totalPayment: loanAmount + totalInterest,
    payoffDate,
    ltv,
    pmiRemovalMonth,
    ...extraResult,
  }
}

export function calculateCanadaMortgage(inputs: MortgageInputs & {
  downPaymentPercent: number
}): MortgageResult & { cmhcPremium: number; cmhcRate: number } {
  const { homePrice, downPayment, downPaymentPercent } = inputs

  // CMHC insurance rates
  let cmhcRate = 0
  if (downPaymentPercent >= 5 && downPaymentPercent < 10) {
    cmhcRate = 0.04
  } else if (downPaymentPercent >= 10 && downPaymentPercent < 15) {
    cmhcRate = 0.031
  } else if (downPaymentPercent >= 15 && downPaymentPercent < 20) {
    cmhcRate = 0.028
  }

  const baseLoan = homePrice - downPayment
  const cmhcPremium = baseLoan * cmhcRate
  const totalLoan = baseLoan + cmhcPremium

  const result = calculateMortgage({ ...inputs, homePrice: homePrice + cmhcPremium, downPayment })
  const baseResult = calculateMortgage({ ...inputs, homePrice: totalLoan + downPayment, downPayment })

  return {
    ...baseResult,
    loanAmount: totalLoan,
    cmhcPremium,
    cmhcRate,
  }
}
