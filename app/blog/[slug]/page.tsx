import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getPostBySlug,
  getAllPosts,
  getRelatedPosts,
  formatPostDate,
  type Block,
  type BlogPost,
} from '@/lib/blog/posts'
import { Clock, ArrowLeft, ArrowRight, Info, Lightbulb, AlertTriangle } from 'lucide-react'

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | MortgageInsightHub`,
    description: post.description,
    alternates: { canonical: `https://mortgageinsighthub.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://mortgageinsighthub.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
    },
  }
}

// ─── Block renderer ───────────────────────────────────────────────────────────

function renderBlock(block: Block, idx: number) {
  switch (block.t) {
    case 'h2':
      return (
        <h2
          key={idx}
          id={block.v.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
          className="text-xl font-bold text-foreground mt-10 mb-4 scroll-mt-24"
        >
          {block.v}
        </h2>
      )
    case 'h3':
      return (
        <h3 key={idx} className="text-base font-semibold text-foreground mt-6 mb-2">
          {block.v}
        </h3>
      )
    case 'p':
      return (
        <p key={idx} className="text-secondary leading-relaxed mb-4">
          {block.v}
        </p>
      )
    case 'ul':
      return (
        <ul key={idx} className="space-y-2 mb-5 ml-2">
          {block.v.map((item, i) => (
            <li key={i} className="flex gap-2 text-secondary leading-relaxed">
              <span className="text-primary mt-1 flex-shrink-0">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol key={idx} className="space-y-2 mb-5 ml-2">
          {block.v.map((item, i) => (
            <li key={i} className="flex gap-3 text-secondary leading-relaxed">
              <span className="text-primary font-semibold flex-shrink-0 w-5 text-right">{i + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )
    case 'tip':
      return (
        <div key={idx} className="flex gap-3 bg-green-50 border border-green-200 rounded-xl p-5 mb-5">
          <Lightbulb className="w-5 h-5 text-accent-green flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-green-800 mb-1">{block.title}</p>
            <p className="text-sm text-green-700 leading-relaxed">{block.v}</p>
          </div>
        </div>
      )
    case 'warn':
      return (
        <div key={idx} className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-5 mb-5">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-amber-800 mb-1">{block.title}</p>
            <p className="text-sm text-amber-700 leading-relaxed">{block.v}</p>
          </div>
        </div>
      )
    case 'formula':
      return (
        <div key={idx} className="bg-muted border border-border rounded-xl p-5 mb-5">
          <p className="font-mono text-base font-semibold text-foreground mb-2">{block.v}</p>
          {block.desc && (
            <p className="text-xs text-secondary leading-relaxed">{block.desc}</p>
          )}
        </div>
      )
    case 'table':
      return (
        <div key={idx} className="overflow-x-auto mb-6 rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                {block.headers.map((h) => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {block.rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-muted/40 transition-colors">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-secondary">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    default:
      return null
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const related = getRelatedPosts(post)
  const h2Headings = post.content
    .filter((b): b is Extract<Block, { t: 'h2' }> => b.t === 'h2')
    .map((b) => ({ text: b.v, id: b.v.toLowerCase().replace(/[^a-z0-9]+/g, '-') }))

  return (
    <div className="max-w-site mx-auto px-6 py-10 md:py-14">

      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All articles
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 items-start">

        {/* ── Main article ── */}
        <article>
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
              {post.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-secondary">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {post.readTime} min read
            </span>
            <time dateTime={post.date} className="text-xs text-secondary">
              {formatPostDate(post.date)}
            </time>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 text-balance leading-snug">
            {post.title}
          </h1>
          <p className="text-lg text-secondary mb-8 leading-relaxed border-b border-border pb-8">
            {post.description}
          </p>

          {/* Content blocks */}
          <div className="prose-article">
            {post.content.map((block, idx) => renderBlock(block, idx))}
          </div>

          {/* Related calculator CTA */}
          {post.relatedCalculator && (
            <div className="mt-10 p-6 bg-primary/5 border border-primary/20 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-3 items-start">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-foreground text-sm">Try it with your numbers</p>
                  <p className="text-xs text-secondary mt-0.5">Free — no signup required</p>
                </div>
              </div>
              <Link
                href={post.relatedCalculator.href}
                className="flex-shrink-0 px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-[#1e429f] transition-colors flex items-center gap-2"
              >
                {post.relatedCalculator.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          {/* Disclaimer */}
          <p className="mt-8 text-xs text-secondary/70 leading-relaxed border-t border-border pt-6">
            <strong>Disclaimer:</strong> All figures in this article are illustrative estimates.
            Actual mortgage rates, payments, and terms vary based on your credit score, lender,
            location, and market conditions. MortgageInsightHub is not a lender or financial
            advisor. Consult a licensed mortgage professional before making financial decisions.
          </p>
        </article>

        {/* ── Sticky sidebar ── */}
        <aside className="lg:sticky lg:top-20 space-y-5">

          {/* Table of contents */}
          {h2Headings.length > 0 && (
            <div className="bg-white border border-border rounded-xl p-5">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">
                In This Article
              </p>
              <nav aria-label="Article table of contents">
                <ul className="space-y-2">
                  {h2Headings.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-sm text-secondary hover:text-primary transition-colors leading-snug block"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}

          {/* Related articles */}
          {related.length > 0 && (
            <div className="bg-white border border-border rounded-xl p-5">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">
                Related Articles
              </p>
              <ul className="space-y-3">
                {related.map((rp) => (
                  <li key={rp.slug}>
                    <Link
                      href={`/blog/${rp.slug}`}
                      className="text-sm text-foreground hover:text-primary transition-colors leading-snug font-medium flex items-start gap-1.5 group"
                    >
                      <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-secondary group-hover:text-primary transition-colors" />
                      {rp.title}
                    </Link>
                    <p className="text-xs text-secondary mt-0.5 ml-5">{rp.readTime} min read</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Calculator quick links */}
          <div className="bg-muted/60 border border-border rounded-xl p-5">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-3">
              Free Calculators
            </p>
            <ul className="space-y-2">
              {[
                { href: '/mortgage-calculator', label: 'Mortgage Calculator' },
                { href: '/affordability-calculator', label: 'Affordability Calculator' },
                { href: '/biweekly-mortgage-calculator', label: 'Biweekly Calculator' },
                { href: '/mortgage-refinance-calculator', label: 'Refinance Calculator' },
                { href: '/car-loan-calculator', label: 'Car Loan Calculator' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
