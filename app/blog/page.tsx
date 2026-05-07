import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts, formatPostDate } from '@/lib/blog/posts'
import { Clock, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Mortgage & Home Loan Guides — MortgageInsightHub Blog',
  description:
    'Free guides on mortgage payments, PMI, biweekly savings, affordability, and home buying. Written in plain language with real numbers and worked examples.',
  alternates: { canonical: 'https://mortgageinsighthub.com/blog' },
  openGraph: {
    title: 'Mortgage & Home Loan Guides',
    description: 'Practical mortgage guides with real numbers — no fluff.',
    url: 'https://mortgageinsighthub.com/blog',
  },
}

const CATEGORY_COLORS: Record<string, string> = {
  'Mortgage Basics':    'bg-blue-100 text-blue-700',
  'Payment Strategies': 'bg-green-100 text-green-700',
  'Buying Tips':        'bg-purple-100 text-purple-700',
  'Loan Types':         'bg-orange-100 text-orange-700',
}

export default function BlogIndexPage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <div className="max-w-site mx-auto px-6 py-12 md:py-16">

      {/* Header */}
      <div className="max-w-2xl mb-12">
        <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">Blog</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Mortgage &amp; Home Loan Guides
        </h1>
        <p className="text-lg text-secondary leading-relaxed">
          Practical guides written in plain language — real formulas, real numbers, and worked
          examples so you understand exactly what you&apos;re signing up for.
        </p>
      </div>

      {/* Featured article */}
      <div className="mb-10">
        <Link
          href={`/blog/${featured.slug}`}
          className="group block bg-white border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all"
        >
          {/* Coloured top bar */}
          <div className="h-2 bg-gradient-to-r from-primary to-blue-400" />
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[featured.category] ?? 'bg-muted text-secondary'}`}>
                {featured.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-secondary">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {featured.readTime} min read
              </span>
              <span className="text-xs text-secondary">{formatPostDate(featured.date)}</span>
            </div>
            <h2 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-3 text-balance">
              {featured.title}
            </h2>
            <p className="text-secondary leading-relaxed mb-5">{featured.description}</p>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </Link>
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rest.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col bg-white border border-border rounded-xl overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div className="h-1.5 bg-gradient-to-r from-primary/60 to-primary/20" />
            <div className="p-6 flex flex-col flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-muted text-secondary'}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-secondary">
                  <Clock className="w-3 h-3" aria-hidden="true" />
                  {post.readTime} min
                </span>
              </div>
              <h2 className="text-base font-bold text-foreground group-hover:text-primary transition-colors mb-2 leading-snug flex-1">
                {post.title}
              </h2>
              <p className="text-sm text-secondary line-clamp-2 mb-4">{post.description}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-secondary">{formatPostDate(post.date)}</span>
                <span className="text-xs font-semibold text-primary flex items-center gap-1">
                  Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-12 bg-muted/60 border border-border rounded-xl p-8 text-center">
        <h2 className="text-lg font-semibold text-foreground mb-2">Ready to Run the Numbers?</h2>
        <p className="text-secondary text-sm mb-5">
          Use our free calculators to apply what you&apos;ve read with your actual loan details.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/mortgage-calculator" className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-[#1e429f] transition-colors">
            Mortgage Calculator
          </Link>
          <Link href="/affordability-calculator" className="px-4 py-2 bg-white border border-border text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors">
            Affordability Calculator
          </Link>
          <Link href="/biweekly-mortgage-calculator" className="px-4 py-2 bg-white border border-border text-sm font-medium text-foreground rounded-lg hover:bg-muted transition-colors">
            Biweekly Calculator
          </Link>
        </div>
      </div>
    </div>
  )
}
