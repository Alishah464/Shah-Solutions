import { chromium } from '@playwright/test'

/** `next dev` compiles each route on first request, which can take 20-30s
 * for a route hit cold. Pre-warm every route once before the suite runs so
 * individual tests aren't racing dev-server compilation. Irrelevant in
 * production, where the static export pre-renders everything at build time. */
const routes = [
  '/', '/about', '/services', '/services/seo', '/services/geo', '/services/web-development',
  '/services/mobile-app-development', '/services/ai-development', '/services/ai-chatbots',
  '/services/digital-marketing', '/services/cloud-solutions', '/services/trading-bots',
  '/industries', '/industries/ecommerce', '/industries/saas', '/industries/real-estate',
  '/industries/healthcare', '/industries/education',
  '/locations', '/locations/seo-company-pakistan',
  '/portfolio', '/blog', '/contact', '/book', '/privacy-policy', '/terms',
]

export default async function globalSetup() {
  const browser = await chromium.launch()
  const page = await browser.newPage()
  for (const route of routes) {
    try {
      await page.goto(`http://localhost:3000${route}`, { timeout: 60_000, waitUntil: 'domcontentloaded' })
    } catch {
      // Best-effort warm-up — a route that fails to warm here will just
      // pay the cold-compile cost inside its own test instead.
    }
  }
  await browser.close()
}
