import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://mortgageinsighthub.com'),
  title: {
    default: 'Mortgage Calculator — Monthly Payment Calculator 2026 | Free',
    template: '%s | MortgageInsightHub',
  },
  description:
    'Free mortgage calculator for US, Canada and UK. Calculate monthly payments instantly. Full amortization schedule, biweekly comparison, PMI calculator. Updated 2026 rates.',
  keywords: [
    'mortgage calculator',
    'monthly payment calculator',
    'car loan calculator',
    'reverse mortgage calculator',
    'mortgage calculator Canada',
    'mortgage calculator UK',
    'amortization schedule',
    'PITI calculator',
    'PMI calculator',
  ],
  authors: [{ name: 'MortgageInsightHub' }],
  creator: 'MortgageInsightHub',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mortgageinsighthub.com',
    siteName: 'MortgageInsightHub',
    title: 'Free Mortgage Calculator 2026 — US, Canada & UK',
    description:
      'Calculate your monthly mortgage payment instantly. Free amortization schedule, PMI calculator, biweekly comparison. Updated 2026 rates.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'MortgageInsightHub — Free Mortgage Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Mortgage Calculator 2026',
    description: 'Calculate monthly payments for US, Canada & UK mortgages instantly.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://mortgageinsighthub.com',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="canonical" href="https://mortgageinsighthub.com" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        {/* GA4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-WRWFJ263L2"
        />
        <script
          id="ga4-init"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-WRWFJ263L2');
            `,
          }}
        />
      </body>
    </html>
  )
}
