'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home } from 'lucide-react'

const navLinks = [
  { href: '/mortgage-calculator', label: 'Mortgage' },
  { href: '/car-loan-calculator', label: 'Car Loan' },
  { href: '/reverse-mortgage-calculator', label: 'Reverse Mortgage' },
  { href: '/mortgage-calculator-canada', label: 'Canada' },
  { href: '/mortgage-calculator-uk', label: 'UK' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-site mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-primary"
          aria-label="MortgageInsightHub home"
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          <span>MortgageInsightHub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-secondary hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2 rounded-md text-secondary hover:text-primary"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav
          id="mobile-menu"
          className="lg:hidden border-t border-border bg-white"
          aria-label="Mobile navigation"
        >
          <div className="max-w-site mx-auto px-6 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-secondary hover:text-primary py-2 border-b border-border last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
