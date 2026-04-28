export interface CarLoanInputs {
  vehiclePrice: number
  downPayment: number
  tradeIn: number
  salesTaxPercent: number
  loanTermMonths: number
  annualRate: number
  fees?: number
}

export interface CarLoanResult {
  monthlyPayment: number
  totalLoan: number
  totalInterest: number
  totalCost: number
  apr: number
}

export interface CarLoanComparison {
  term: number
  monthlyPayment: number
  totalInterest: number
  totalCost: number
}

export function calculateCarLoan(inputs: CarLoanInputs): CarLoanResult {
  const {
    vehiclePrice,
    downPayment,
    tradeIn,
    salesTaxPercent,
    loanTermMonths,
    annualRate,
    fees = 0,
  } = inputs

  const taxAmount = vehiclePrice * (salesTaxPercent / 100)
  const totalLoan = vehiclePrice - downPayment - tradeIn + taxAmount + fees

  const monthlyRate = annualRate / 100 / 12

  let monthlyPayment: number
  if (monthlyRate === 0) {
    monthlyPayment = totalLoan / loanTermMonths
  } else {
    monthlyPayment =
      totalLoan *
      (monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) /
      (Math.pow(1 + monthlyRate, loanTermMonths) - 1)
  }

  const totalPayment = monthlyPayment * loanTermMonths
  const totalInterest = totalPayment - totalLoan

  return {
    monthlyPayment,
    totalLoan,
    totalInterest,
    totalCost: vehiclePrice + totalInterest - tradeIn,
    apr: annualRate,
  }
}

export function calculateCarLoanComparisons(
  baseInputs: Omit<CarLoanInputs, 'loanTermMonths'>
): CarLoanComparison[] {
  const terms = [48, 60, 72, 84]
  return terms.map((term) => {
    const result = calculateCarLoan({ ...baseInputs, loanTermMonths: term })
    return {
      term,
      monthlyPayment: result.monthlyPayment,
      totalInterest: result.totalInterest,
      totalCost: result.totalCost,
    }
  })
}

export function calculateRateImpact(
  baseInputs: Omit<CarLoanInputs, 'annualRate'>
): { goodRate: CarLoanResult; highRate: CarLoanResult; difference: number } {
  const goodRate = calculateCarLoan({ ...baseInputs, annualRate: 5.9 })
  const highRate = calculateCarLoan({ ...baseInputs, annualRate: 14.9 })
  return {
    goodRate,
    highRate,
    difference: highRate.totalInterest - goodRate.totalInterest,
  }
}
