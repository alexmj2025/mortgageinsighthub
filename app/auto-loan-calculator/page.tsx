import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Auto Loan Calculator — Monthly Auto Payment Calculator 2026',
  description: 'Free auto loan calculator. Calculate monthly car payments, compare loan terms, and find the best rate.',
  alternates: { canonical: 'https://mortgageinsighthub.com/car-loan-calculator' },
}

export default function AutoLoanCalculatorPage() {
  // Canonical redirect to car-loan-calculator
  redirect('/car-loan-calculator')
}
