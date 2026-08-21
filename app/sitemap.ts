import type { MetadataRoute } from 'next'
import { getAllArticles, CATEGORY_SLUGS } from '@/lib/blog'
import { serviceCategories } from '@/lib/servicesData'
import { industries } from '@/lib/industriesData'
import { locationPages } from '@/lib/locationsData'
import { SITE_URL as BASE } from '@/lib/site'

export const dynamic = 'force-static'

// Real per-page "last substantively edited" dates (from `git log -1 --format=%as`),
// not build time — bump the relevant entry when a page's content actually changes.
const PAGE_DATES = {
  home: '2026-08-20',
  services: '2026-08-20',
  industries: '2026-08-20',
  locations: '2026-08-20',
  blog: '2026-08-20',
  about: '2026-07-31',
  portfolio: '2026-06-29',
  contact: '2026-08-20',
  book: '2026-08-20',
  privacyPolicy: '2026-08-21',
  terms: '2026-08-21',
} as const

export default function sitemap(): MetadataRoute.Sitemap {
  const d = (iso: string) => new Date(`${iso}T00:00:00Z`)

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: d(PAGE_DATES.home),       changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,    lastModified: d(PAGE_DATES.services),   changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/industries`,  lastModified: d(PAGE_DATES.industries), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/locations`,   lastModified: d(PAGE_DATES.locations),  changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blog`,        lastModified: d(PAGE_DATES.blog),       changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,       lastModified: d(PAGE_DATES.about),      changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/portfolio`,   lastModified: d(PAGE_DATES.portfolio),  changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/contact`,     lastModified: d(PAGE_DATES.contact),    changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/book`,        lastModified: d(PAGE_DATES.book),       changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/privacy-policy`, lastModified: d(PAGE_DATES.privacyPolicy), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`,          lastModified: d(PAGE_DATES.terms),         changeFrequency: 'yearly', priority: 0.3 },
  ]

  const servicePages: MetadataRoute.Sitemap = serviceCategories.map(s => ({
    url: `${BASE}/services/${s.slug}`,
    lastModified: d(PAGE_DATES.services),
    changeFrequency: 'monthly',
    priority: 0.85,
  }))

  const industryPages: MetadataRoute.Sitemap = industries.map(i => ({
    url: `${BASE}/industries/${i.slug}`,
    lastModified: d(PAGE_DATES.industries),
    changeFrequency: 'monthly',
    priority: 0.75,
  }))

  const localPages: MetadataRoute.Sitemap = locationPages.map(l => ({
    url: `${BASE}/locations/${l.slug}`,
    lastModified: d(PAGE_DATES.locations),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const categoryPages: MetadataRoute.Sitemap = Object.values(CATEGORY_SLUGS).map(slug => ({
    url: `${BASE}/blog/category/${slug}`,
    lastModified: d(PAGE_DATES.blog),
    changeFrequency: 'weekly',
    priority: 0.65,
  }))

  const articlePages: MetadataRoute.Sitemap = getAllArticles().map(a => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(`${a.date}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...servicePages, ...industryPages, ...localPages, ...categoryPages, ...articlePages]
}
