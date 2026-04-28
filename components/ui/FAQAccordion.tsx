'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  items: FAQItem[]
  className?: string
}

export function FAQAccordion({ items, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((item, index) => (
        <div key={index} className="border border-border rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full flex items-center justify-between px-5 py-4 text-left text-sm font-medium text-foreground hover:bg-muted transition-colors"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            aria-expanded={openIndex === index}
            aria-controls={`faq-answer-${index}`}
            id={`faq-question-${index}`}
          >
            <span>{item.question}</span>
            <ChevronDown
              className={cn(
                'w-4 h-4 text-secondary flex-shrink-0 ml-4 transition-transform duration-200',
                openIndex === index && 'rotate-180'
              )}
              aria-hidden="true"
            />
          </button>

          <div
            id={`faq-answer-${index}`}
            role="region"
            aria-labelledby={`faq-question-${index}`}
            hidden={openIndex !== index}
          >
            <div className="px-5 pb-4 pt-1 text-sm text-secondary leading-relaxed border-t border-border">
              {item.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
