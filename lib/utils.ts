import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(
  value: number,
  currency: 'USD' | 'CAD' | 'GBP' = 'USD',
  compact = false
): string {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }
  if (compact && value >= 1000) {
    options.notation = 'compact'
  }
  return new Intl.NumberFormat('en-US', options).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value))
}

export function parseFormattedNumber(value: string): number {
  return parseFloat(value.replace(/[^0-9.-]/g, '')) || 0
}

export function formatPercent(value: number, decimals = 2): string {
  return `${value.toFixed(decimals)}%`
}

export function addMonths(date: Date, months: number): Date {
  const result = new Date(date)
  result.setMonth(result.getMonth() + months)
  return result
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function debounce<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  CAD: 'CAD$',
  GBP: '£',
}
