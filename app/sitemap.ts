import type { MetadataRoute } from 'next'

const BASE_URL = 'https://mortgageinsighthub.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/mortgage-calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/car-loan-calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/auto-loan-calculator`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.90 },
    { url: `${BASE_URL}/reverse-mortgage-calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/mortgage-calculator-canada`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/mortgage-calculator-uk`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE_URL}/biweekly-mortgage-calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/affordability-calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE_URL}/mortgage-refinance-calculator`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.80 },
    { url: `${BASE_URL}/amortization-schedule`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.80 },
    { url: `${BASE_URL}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE_URL}/how-it-works`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.30 },
  ]
}
