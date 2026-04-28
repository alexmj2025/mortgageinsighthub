export interface AmortizationRow {
  month: number
  date: Date
  payment: number
  principal: number
  interest: number
  balance: number
  cumulativeInterest: number
  cumulativePrincipal: number
}

export interface AmortizationSchedule {
  rows: AmortizationRow[]
  yearlyRows: YearlyAmortizationRow[]
  totalInterest: number
  totalPrincipal: number
  payoffDate: Date
  crossoverMonth: number
}

export interface YearlyAmortizationRow {
  year: number
  principal: number
  interest: number
  balance: number
  cumulativeInterest: number
}

export function generateAmortizationSchedule(
  loanAmount: number,
  annualRate: number,
  loanTermYears: number,
  startDate: Date = new Date(),
  extraMonthlyPayment = 0
): AmortizationSchedule {
  const monthlyRate = annualRate / 100 / 12
  const n = loanTermYears * 12

  let monthlyPayment: number
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / n
  } else {
    monthlyPayment =
      loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, n)) /
      (Math.pow(1 + monthlyRate, n) - 1)
  }

  const rows: AmortizationRow[] = []
  let balance = loanAmount
  let cumulativeInterest = 0
  let cumulativePrincipal = 0
  let crossoverMonth = 0

  for (let month = 1; month <= n && balance > 0; month++) {
    const interestPayment = balance * monthlyRate
    const basePayment = Math.min(monthlyPayment + extraMonthlyPayment, balance + interestPayment)
    const principalPayment = basePayment - interestPayment

    balance = Math.max(0, balance - principalPayment)
    cumulativeInterest += interestPayment
    cumulativePrincipal += principalPayment

    const date = new Date(startDate)
    date.setMonth(date.getMonth() + month)

    rows.push({
      month,
      date,
      payment: basePayment,
      principal: principalPayment,
      interest: interestPayment,
      balance,
      cumulativeInterest,
      cumulativePrincipal,
    })

    // Find crossover: when cumulative principal paid > cumulative interest paid
    if (crossoverMonth === 0 && cumulativePrincipal > cumulativeInterest) {
      crossoverMonth = month
    }

    if (balance <= 0.01) break
  }

  const yearlyRows: YearlyAmortizationRow[] = []
  let yearlyPrincipal = 0
  let yearlyInterest = 0

  rows.forEach((row, index) => {
    yearlyPrincipal += row.principal
    yearlyInterest += row.interest

    if ((index + 1) % 12 === 0 || index === rows.length - 1) {
      const year = Math.ceil((index + 1) / 12)
      yearlyRows.push({
        year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: row.balance,
        cumulativeInterest: row.cumulativeInterest,
      })
      yearlyPrincipal = 0
      yearlyInterest = 0
    }
  })

  const lastRow = rows[rows.length - 1]

  return {
    rows,
    yearlyRows,
    totalInterest: lastRow?.cumulativeInterest ?? 0,
    totalPrincipal: lastRow?.cumulativePrincipal ?? 0,
    payoffDate: lastRow?.date ?? startDate,
    crossoverMonth,
  }
}

export function calculateBiweeklyMortgage(
  loanAmount: number,
  annualRate: number,
  loanTermYears: number
): {
  biweeklyPayment: number
  totalInterest: number
  monthsToPayoff: number
  monthlyEquivalent: number
  interestSavedVsMonthly: number
  yearsSavedVsMonthly: number
} {
  const biweeklyRate = annualRate / 100 / 26
  const biweeklyPayments = loanTermYears * 26

  let biweeklyPayment: number
  if (biweeklyRate === 0) {
    biweeklyPayment = loanAmount / biweeklyPayments
  } else {
    biweeklyPayment =
      loanAmount *
      (biweeklyRate * Math.pow(1 + biweeklyRate, biweeklyPayments)) /
      (Math.pow(1 + biweeklyRate, biweeklyPayments) - 1)
  }

  // Simulate biweekly payoff
  let balance = loanAmount
  let totalInterest = 0
  let payments = 0

  while (balance > 0 && payments < biweeklyPayments * 2) {
    const interestPayment = balance * biweeklyRate
    const payment = Math.min(biweeklyPayment, balance + interestPayment)
    const principalPayment = payment - interestPayment
    balance -= principalPayment
    totalInterest += interestPayment
    payments++
    if (balance <= 0.01) break
  }

  const monthsToPayoff = Math.ceil(payments / 2)

  // Monthly comparison
  const monthlyRate = annualRate / 100 / 12
  const n = loanTermYears * 12
  const monthlyPayment =
    loanAmount *
    (monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)
  const monthlyTotalInterest = monthlyPayment * n - loanAmount

  return {
    biweeklyPayment,
    totalInterest,
    monthsToPayoff,
    monthlyEquivalent: monthlyPayment,
    interestSavedVsMonthly: monthlyTotalInterest - totalInterest,
    yearsSavedVsMonthly: (n - monthsToPayoff) / 12,
  }
}

export function calculateRefinance(
  currentBalance: number,
  currentRate: number,
  currentMonthlyPayment: number,
  remainingMonths: number,
  newRate: number,
  newTermYears: number,
  closingCosts: number
): {
  newMonthlyPayment: number
  monthlySavings: number
  breakEvenMonths: number
  totalInterestCurrent: number
  totalInterestNew: number
  netSavings: number
} {
  const monthlyRate = newRate / 100 / 12
  const newN = newTermYears * 12

  const newMonthlyPayment =
    currentBalance *
    (monthlyRate * Math.pow(1 + monthlyRate, newN)) /
    (Math.pow(1 + monthlyRate, newN) - 1)

  const monthlySavings = currentMonthlyPayment - newMonthlyPayment
  const breakEvenMonths = closingCosts / Math.max(monthlySavings, 0.01)

  const totalInterestCurrent = currentMonthlyPayment * remainingMonths - currentBalance
  const totalInterestNew = newMonthlyPayment * newN - currentBalance

  return {
    newMonthlyPayment,
    monthlySavings,
    breakEvenMonths: Math.ceil(breakEvenMonths),
    totalInterestCurrent,
    totalInterestNew,
    netSavings: totalInterestCurrent - totalInterestNew - closingCosts,
  }
}
