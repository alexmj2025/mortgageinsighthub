// Canada mortgage rate defaults — update periodically
// Last updated: 2026

export const CANADA_RATES = {
  mortgage: {
    rate5yrFixed: 5.49,
    rate3yrFixed: 5.29,
    rate1yrFixed: 5.79,
    rateVariable: 5.70,
    rateHELOC: 6.45,
  },
  defaultMortgage: {
    homePrice: 600000,
    downPaymentPercent: 10,
    loanTerm: 25,
    rate: 5.5,
    annualPropertyTax: 4200,
    annualInsurance: 1000,
  },
  cmhc: {
    tier1: { minDown: 5, maxDown: 9.99, rate: 0.04 },
    tier2: { minDown: 10, maxDown: 14.99, rate: 0.031 },
    tier3: { minDown: 15, maxDown: 19.99, rate: 0.028 },
  },
  stressTest: {
    qualifier: 'max(contractRate + 2%, 5.25%)',
    currentFloor: 5.25,
  },
}

export const CANADA_PROVINCE_RATES = [
  { province: 'British Columbia', avgRate: 5.49, avgHomePrice: 985000 },
  { province: 'Ontario', avgRate: 5.49, avgHomePrice: 875000 },
  { province: 'Alberta', avgRate: 5.45, avgHomePrice: 492000 },
  { province: 'Quebec', avgRate: 5.39, avgHomePrice: 498000 },
  { province: 'Nova Scotia', avgRate: 5.55, avgHomePrice: 385000 },
  { province: 'Manitoba', avgRate: 5.50, avgHomePrice: 362000 },
]

export const CMHC_RATE_TABLE = [
  { downPayment: '5% – 9.99%', premium: '4.00%', description: 'Minimum down payment' },
  { downPayment: '10% – 14.99%', premium: '3.10%', description: 'Standard insured' },
  { downPayment: '15% – 19.99%', premium: '2.80%', description: 'Lower-ratio insured' },
  { downPayment: '20%+', premium: '0%', description: 'Conventional (no CMHC)' },
]
