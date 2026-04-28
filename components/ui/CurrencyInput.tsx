'use client'

import { cn } from '@/lib/utils'

interface CurrencyInputProps {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  currency?: string
  min?: number
  max?: number
  error?: string
  hint?: string
  className?: string
  showPercentToggle?: boolean
  percentValue?: number
  onPercentChange?: (pct: number) => void
  baseValue?: number
}

export function CurrencyInput({
  id,
  label,
  value,
  onChange,
  currency = '$',
  min = 0,
  error,
  hint,
  className,
  showPercentToggle,
  percentValue,
  onPercentChange,
  baseValue,
}: CurrencyInputProps) {
  function formatDisplay(val: number): string {
    if (!val || isNaN(val)) return ''
    return val.toLocaleString('en-US', { maximumFractionDigits: 0 })
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9.]/g, '')
    const num = parseFloat(raw) || 0
    onChange(num)
  }

  function handlePercentInput(e: React.ChangeEvent<HTMLInputElement>) {
    const pct = parseFloat(e.target.value) || 0
    if (onPercentChange) onPercentChange(pct)
    if (baseValue) onChange((baseValue * pct) / 100)
  }

  const displayValue = formatDisplay(value)
  const borderClass = error
    ? 'border-accent-red focus-within:ring-accent-red/40 focus-within:border-accent-red'
    : 'border-border focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary hover:border-primary/50'

  return (
    <div className={cn('space-y-1', className)}>
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>

      <div className="flex gap-2 items-stretch">
        {/* Input with prefix badge */}
        <div className={cn('flex flex-1 rounded-md border bg-white transition-colors overflow-hidden', borderClass)}>
          {/* Currency prefix badge */}
          <span className="flex items-center px-3 bg-muted border-r border-border text-secondary text-sm font-medium whitespace-nowrap select-none flex-shrink-0">
            {currency}
          </span>
          <input
            id={id}
            type="text"
            inputMode="decimal"
            value={displayValue}
            onChange={handleInput}
            min={min}
            aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
            aria-invalid={!!error}
            className="flex-1 min-w-0 px-3 py-2.5 bg-transparent text-sm text-foreground focus:outline-none"
            placeholder="0"
          />
        </div>

        {/* Percentage toggle */}
        {showPercentToggle && onPercentChange !== undefined && baseValue && (
          <div className={cn('flex rounded-md border bg-white overflow-hidden w-24 transition-colors', borderClass)}>
            <input
              type="number"
              inputMode="decimal"
              value={percentValue ?? Number(((value / baseValue) * 100).toFixed(1))}
              onChange={handlePercentInput}
              min={0}
              max={100}
              step={0.5}
              className="flex-1 min-w-0 pl-3 pr-1 py-2.5 bg-transparent text-sm text-foreground focus:outline-none"
              aria-label={`${label} as percentage`}
            />
            <span className="flex items-center pr-2.5 text-secondary text-sm select-none">%</span>
          </div>
        )}
      </div>

      {error && (
        <p id={`${id}-error`} className="text-xs text-accent-red" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-secondary">
          {hint}
        </p>
      )}
    </div>
  )
}

interface RateInputProps {
  id: string
  label: string
  value: number
  onChange: (value: number) => void
  error?: string
  hint?: string
}

export function RateInput({ id, label, value, onChange, error, hint }: RateInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={id} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className={cn(
        'flex rounded-md border bg-white overflow-hidden transition-colors',
        error
          ? 'border-accent-red focus-within:ring-2 focus-within:ring-accent-red/40'
          : 'border-border focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary hover:border-primary/50'
      )}>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          min={0.5}
          max={20}
          step={0.05}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          aria-invalid={!!error}
          className="flex-1 min-w-0 pl-3 pr-1 py-2.5 bg-transparent text-sm text-foreground focus:outline-none"
        />
        <span className="flex items-center pr-3 text-secondary text-sm select-none">%</span>
      </div>
      {error && (
        <p id={`${id}-error`} className="text-xs text-accent-red" role="alert">
          {error}
        </p>
      )}
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-secondary">
          {hint}
        </p>
      )}
    </div>
  )
}

interface TermButtonsProps {
  id: string
  label: string
  value: number
  options: number[]
  onChange: (value: number) => void
  suffix?: string
}

export function TermButtons({ id, label, value, options, onChange, suffix = 'yr' }: TermButtonsProps) {
  return (
    <div className="space-y-1">
      <span id={`${id}-label`} className="block text-sm font-medium text-foreground">
        {label}
      </span>
      <div
        className="flex rounded-md border border-border overflow-hidden bg-white"
        role="group"
        aria-labelledby={`${id}-label`}
      >
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={cn(
              'flex-1 py-2.5 text-sm font-medium transition-colors border-r border-border last:border-r-0',
              value === opt
                ? 'bg-primary text-white'
                : 'bg-white text-secondary hover:bg-muted hover:text-foreground'
            )}
            aria-pressed={value === opt}
          >
            {opt}{suffix}
          </button>
        ))}
      </div>
    </div>
  )
}
