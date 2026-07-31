import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles'

const BASE = 'https://shahsolutions.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/services`,  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/blog`,      lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/about`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE}/contact`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/book`,      lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const articlePages: MetadataRoute.Sitemap = getAllArticles().map(a => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(`${a.date}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticPages, ...articlePages]
}
