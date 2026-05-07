import type { Metadata } from 'next'
import { Mail, MessageSquare, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us — MortgageInsightHub',
  description:
    'Get in touch with the MortgageInsightHub team. We welcome questions, feedback, and bug reports about our free mortgage calculators.',
  alternates: { canonical: 'https://mortgageinsighthub.com/contact' },
}

export default function ContactPage() {
  return (
    <div className="max-w-site mx-auto px-6 py-12 md:py-16">

      {/* Header */}
      <div className="max-w-xl mb-10">
        <p className="text-sm font-medium text-primary uppercase tracking-wide mb-3">Contact</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
          Get in touch
        </h1>
        <p className="text-lg text-secondary leading-relaxed">
          Have a question about one of our calculators? Found a bug? Want to suggest a new
          feature? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-start">

        {/* Contact form */}
        <div className="bg-white border border-border rounded-xl p-8">
          <h2 className="text-lg font-semibold text-foreground mb-6">Send Us a Message</h2>
          <form
            action="mailto:info@mortgageinsighthub.com"
            method="get"
            encType="text/plain"
            className="space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="block text-sm font-medium text-foreground">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 rounded-md border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="block text-sm font-medium text-foreground">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 rounded-md border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-subject" className="block text-sm font-medium text-foreground">
                Subject
              </label>
              <select
                id="contact-subject"
                name="subject"
                className="w-full px-3 py-2.5 rounded-md border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
              >
                <option value="">Select a topic…</option>
                <option value="Calculator question">Calculator question</option>
                <option value="Bug report">Bug report</option>
                <option value="Feature request">Feature request</option>
                <option value="Partnership inquiry">Partnership inquiry</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="contact-message" className="block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="contact-message"
                name="body"
                rows={5}
                placeholder="Describe your question or feedback…"
                className="w-full px-3 py-2.5 rounded-md border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-y"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-primary hover:bg-[#1e429f] text-white text-sm font-semibold rounded-lg transition-colors"
            >
              Send Message
            </button>
          </form>

          <p className="text-xs text-secondary mt-4 opacity-70">
            This will open your email client with a pre-filled message to{' '}
            <strong>info@mortgageinsighthub.com</strong>
          </p>
        </div>

        {/* Sidebar info */}
        <div className="space-y-5">
          <div className="bg-white border border-border rounded-xl p-6 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Email Us</p>
              <a
                href="mailto:info@mortgageinsighthub.com"
                className="text-sm text-primary hover:underline break-all"
              >
                info@mortgageinsighthub.com
              </a>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">Response Time</p>
              <p className="text-sm text-secondary">We typically reply within 1–2 business days.</p>
            </div>
          </div>

          <div className="bg-white border border-border rounded-xl p-6 flex gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-foreground text-sm mb-1">What to Include</p>
              <ul className="text-sm text-secondary space-y-1 mt-1">
                <li>• Which calculator you were using</li>
                <li>• The values you entered</li>
                <li>• What you expected vs. what you saw</li>
              </ul>
            </div>
          </div>

          {/* Disclaimer note */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <p className="text-xs text-amber-800 leading-relaxed">
              <strong>Please note:</strong> We are not a lender or financial advisor and cannot
              provide personalised mortgage advice. For loan applications and rate quotes, please
              contact a licensed mortgage professional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
