// US mortgage and loan rate defaults — update these periodically
// Last updated: 2026

export const US_RATES = {
  mortgage: {
    rate30yr: 6.95,
    rate15yr: 6.30,
    rate5ARM: 6.45,
    rateFHA: 6.75,
    rateVA: 6.50,
    rateJumbo: 7.10,
  },
  defaultMortgage: {
    homePrice: 400000,
    downPaymentPercent: 20,
    loanTerm: 30,
    rate: 7.0,
    annualPropertyTax: 4800,
    annualInsurance: 1200,
    monthlyHOA: 0,
  },
  carLoan: {
    rateExcellent: 5.59,    // 720+ credit
    rateGood: 7.65,         // 660–719
    rateFair: 11.45,        // 620–659
    ratePoor: 16.12,        // below 620
    rateUsedExcellent: 7.69,
    rateUsedGood: 10.30,
    rateUsedFair: 14.80,
    rateUsedPoor: 20.40,
  },
  pmiRate: 0.005,           // 0.5% annually
}

export const MORTGAGE_RATE_TABLE = [
  { product: '30-Year Fixed', rate: 6.95, apr: 7.12, points: 0.6 },
  { product: '15-Year Fixed', rate: 6.30, apr: 6.52, points: 0.5 },
  { product: '5/1 ARM', rate: 6.45, apr: 7.85, points: 0.4 },
  { product: 'FHA 30-Year', rate: 6.75, apr: 7.61, points: 0.8 },
  { product: 'VA 30-Year', rate: 6.50, apr: 6.72, points: 0.3 },
  { product: 'Jumbo 30-Year', rate: 7.10, apr: 7.25, points: 0.7 },
]

export const CAR_LOAN_RATE_TABLE = [
  { creditScore: 'Exceptional (720+)', newCar: '5.59%', usedCar: '7.69%' },
  { creditScore: 'Good (660–719)', newCar: '7.65%', usedCar: '10.30%' },
  { creditScore: 'Fair (620–659)', newCar: '11.45%', usedCar: '14.80%' },
  { creditScore: 'Poor (580–619)', newCar: '16.12%', usedCar: '20.40%' },
  { creditScore: 'Very Poor (<580)', newCar: '22.50%', usedCar: '26.90%' },
]
